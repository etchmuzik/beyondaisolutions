import { INTEGRATIONS } from '../constants';
import type { Integration } from '../types';

export function useIntegrations() {
  // This hook can be expanded to fetch integrations from an API
  // or handle loading/error states if needed
  return {
    integrations: INTEGRATIONS,
    isLoading: false,
    error: null
  };
}