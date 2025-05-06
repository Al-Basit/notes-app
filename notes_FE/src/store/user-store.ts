import { create } from "zustand";

export type State = {
  currency: string;
};

export type Actions = {
  setCurrency: (currency:string) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  currency: "PKR", // Stores the user object
  setCurrency: (currency) => set({ currency: currency }), // Function to set user data
}));
