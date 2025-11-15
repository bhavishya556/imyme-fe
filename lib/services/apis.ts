/**
 * @deprecated This file is deprecated. 
 * Please migrate to the new modular structure:
 * - Types: @/lib/types/api
 * - Constants: @/lib/constants/api-routes
 * - Actions: @/lib/actions/auth-action, @/lib/actions/web-action
 * - Client helpers: @/lib/actions/client-auth
 * 
 * This file is kept temporarily for backward compatibility.
 * It will be removed in a future version.
 */

// Re-export types for backward compatibility
export type {
    IOAuthTokenResponse,
    IUser,
    ApiResponse,
} from '@/lib/types/api';

// Re-export constants for backward compatibility
export { API_ROUTES as AUTH_APIS } from '@/lib/constants/api-routes';

// Keep BASE_BE_URL export for backward compatibility
export { BASE_BE_URL } from '@/lib/utils/fetch';
