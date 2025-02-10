import { env } from '@/configs/env';
import { createAuthClient } from 'better-auth/react'; // make sure to import from better-auth/react

export const authClient = createAuthClient({ baseURL: env.BASE_URL });
