import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Custom hook to monitor network connectivity status
 * @param {Object} options - Configuration options
 * @param {Function} options.onOnline - Callback when network comes online
 * @param {Function} options.onOffline - Callback when network goes offline
 * @param {number} options.checkInterval - Interval in ms to check connectivity (default: 5000)
 * @returns {Object} Network status object with isOnline, wasOffline, and lastStatusChange
 */
export const useNetworkStatus = (options = {}) => {
  const { onOnline, onOffline, checkInterval = 30000 } = options;

  const [isOnline, setIsOnline] = useState(() => {
    // Check if navigator.onLine is available
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      return navigator.onLine;
    }
    // Default to true if we can't determine
    return true;
  });

  const [wasOffline, setWasOffline] = useState(false);
  const [lastStatusChange, setLastStatusChange] = useState(null);

  // Initialize ref with current online status
  const getInitialOnlineStatus = () => {
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      return navigator.onLine;
    }
    return true;
  };

  const previousStatusRef = useRef(getInitialOnlineStatus());
  const checkIntervalRef = useRef(null);

  // Function to check connectivity status
  const checkConnectivity = useCallback(() => {
    if (typeof navigator === 'undefined' || !('onLine' in navigator)) {
      return;
    }

    const currentlyOnline = navigator.onLine;
    const wasOnline = previousStatusRef.current;

    console.log('[useNetworkStatus] Checking connectivity:', {
      currentlyOnline,
      wasOnline,
      stateIsOnline: isOnline,
    });

    // Only update if status changed
    if (currentlyOnline !== wasOnline) {
      const timestamp = new Date();
      console.log('[useNetworkStatus] Status changed:', {
        from: wasOnline ? 'online' : 'offline',
        to: currentlyOnline ? 'online' : 'offline',
      });
      setIsOnline(currentlyOnline);
      setLastStatusChange(timestamp);
      previousStatusRef.current = currentlyOnline;

      if (currentlyOnline) {
        setWasOffline(true);
        if (onOnline && typeof onOnline === 'function') {
          onOnline(timestamp);
        }
      } else {
        if (onOffline && typeof onOffline === 'function') {
          onOffline(timestamp);
        }
      }
    }
  }, [onOnline, onOffline, isOnline]);

  const handleOnline = useCallback(() => {
    const timestamp = new Date();
    if (!previousStatusRef.current) {
      setIsOnline(true);
      setLastStatusChange(timestamp);
      setWasOffline(true);
      previousStatusRef.current = true;

      if (onOnline && typeof onOnline === 'function') {
        onOnline(timestamp);
      }
    }
  }, [onOnline]);

  const handleOffline = useCallback(() => {
    const timestamp = new Date();
    if (previousStatusRef.current) {
      setIsOnline(false);
      setLastStatusChange(timestamp);
      previousStatusRef.current = false;

      if (onOffline && typeof onOffline === 'function') {
        onOffline(timestamp);
      }
    }
  }, [onOffline]);

  useEffect(() => {
    // Initial connectivity check
    checkConnectivity();

    // Add event listeners for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set up periodic connectivity checks
    if (checkInterval > 0) {
      checkIntervalRef.current = setInterval(() => {
        checkConnectivity();
      }, checkInterval);
    }

    // Cleanup event listeners and interval on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [handleOnline, handleOffline, checkConnectivity, checkInterval]);

  // Reset wasOffline flag when back online (optional utility)
  const resetOfflineFlag = useCallback(() => {
    setWasOffline(false);
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline,
    lastStatusChange,
    resetOfflineFlag,
  };
};
