import { useLocation } from 'react-router-dom';
import { MAIN_NAVIGATION, DASHBOARD_NAVIGATION } from '../constants';
import type { NavigationState } from '../types';

export function useNavigation(): NavigationState {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return {
    items: isDashboard ? DASHBOARD_NAVIGATION : MAIN_NAVIGATION,
    isActive,
    isDashboard
  };
}