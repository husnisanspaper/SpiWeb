// store/userStore.ts

import {create} from 'zustand';
import { UserProfile } from '@auth0/nextjs-auth0/client';




interface UserState {
  userId: string | null;
  setUserId: (id: string | null) => void;
  userAuth: UserProfile | null; // Adjusted to UserProfile object type
  setUserAuth: (auth: UserProfile | null) => void; // Adjusted to accept UserProfile object type
  clearUserId: () => void; // New function to clear userId

}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  userAuth: null,
  setUserAuth: (auth) => set({ userAuth: auth }),
  clearUserId: () => set({ userId: null, userAuth:null }), // Implementation to clear userId

}));
