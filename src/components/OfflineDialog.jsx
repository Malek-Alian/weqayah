import { useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

function OfflineDialog() {
  const { t } = useTranslation();
  const { isOffline, isOnline } = useNetworkStatus();

  useEffect(() => {
    console.log('Network status changed:', {
      isOffline,
      isOnline,
      navigatorOnLine: navigator.onLine,
    });
  }, [isOffline, isOnline]);

  return (
    <Dialog
      open={isOffline}
      onOpenChange={() => {
        // Prevent closing when offline - dialog must remain open
        // The dialog will automatically close when isOffline becomes false
      }}
      modal={true}
    >
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(e) => {
          // Prevent closing with Escape key when offline
          e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          // Prevent closing by clicking outside when offline
          e.preventDefault();
        }}
        className='sm:max-w-md'
      >
        <DialogHeader>
          <DialogTitle>{t('network.offline')}</DialogTitle>
          <DialogDescription>
            {t('network.offlineDescription')}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default OfflineDialog;
