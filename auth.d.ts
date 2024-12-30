import {  DefaultSession, DefaultUsser } from '@auth/core/types';


declare module '@auth/core/types'{

    interface User extends DefaultUsser {
        role?: string;
    }

    interface Session extends DefaultSession {
        user: User;
    }

}