import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import './App.css';
import FooterV2 from './components/FooterV2';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import OfflineDialog from './components/OfflineDialog';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import './i18n';
import { getTextDirection, isRTL } from './i18n';
import { routes } from './routes';
import { lightTheme } from './utils/theme';

const AppContent = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const hideNavigationRoutes = ['/signin', '/signup', '/admin'];

  const validRoutes = Object.values(routes)
    .filter((route) => route.path !== '*')
    .map((route) => route.path);

  const shouldHideNavigation =
    hideNavigationRoutes.some(
      (route) =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    ) ||
    !validRoutes.some((route) => {
      if (route.includes(':')) {
        const routePattern = route.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${routePattern}$`);
        return regex.test(location.pathname);
      }
      return (
        location.pathname === route || location.pathname.startsWith(route + '/')
      );
    });

  useEffect(() => {
    const direction = getTextDirection(i18n.language);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <>
      {!shouldHideNavigation && <Navigation />}

      <Routes>
        {Object.values(routes)
          .filter((route) => route.path !== '*' && route.path !== '/admin')
          .map((route) => {
            const needsProtection =
              route.requiresAuth ||
              (route.allowedRoles && route.allowedRoles.length > 0);

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  needsProtection ? (
                    <ProtectedRoute
                      requiresAuth={route.requiresAuth}
                      allowedRoles={route.allowedRoles}
                    >
                      <route.component />
                    </ProtectedRoute>
                  ) : (
                    <route.component />
                  )
                }
              />
            );
          })}
        <Route
          path='/admin/*'
          element={
            <ProtectedRoute
              requiresAuth={true}
              allowedRoles={routes.admin.allowedRoles}
            >
              <routes.admin.component />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<routes.notFound.component />} />
      </Routes>

      {!shouldHideNavigation && <FooterV2 />}

      <ScrollToTop />

      <Toaster position={isRTL(i18n.language) ? 'top-left' : 'top-right'} />

      <OfflineDialog />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <StyledThemeProvider theme={lightTheme}>
        <Router>
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <AppContent />
            </Suspense>
          </AuthProvider>
        </Router>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
