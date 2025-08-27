 //authStore.ts
 // autenticação e autorização com zustand

import { use } from 'react';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface User {
    id: string;
    email: string

}

interface Authstate {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

// hook personalizado para autenticação

export const useAuthStore = create<Authstate>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setToken: (token: string) => set({ token, isAuthenticated: true }),
            setUser: (user: User) => set({ user }),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
            // nome do armazenamento persistente
        }
    )
)