import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

type AddressFieldsState = {
  currentProvinceCode: string;
  setCurrentProvince: (code: string) => void;
  currentCityCode: string[];
  setCurrentCity: (code: string, type: string) => void;
};

type StepperState = {
  active: number;
  target: string[][];
  increaseStep: () => void;
  decreaseStep: () => void;
};

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
};

type UserTypeState = {
  userType: string;
  setUserType: (type: string) => void;
};

type RegisterTypeState = {
  isRegisterWithEmail: boolean;
  setIsRegisterWithEmail: () => void;
};

export const useAddressFieldStore = create<AddressFieldsState>((set) => ({
  currentProvinceCode: '',
  setCurrentProvince: (code) => set(() => ({ currentProvinceCode: code })),
  currentCityCode: [''],
  setCurrentCity: (code, type) =>
    set(() => ({ currentCityCode: [code, type] })),
}));

export const useStepperFormStore = create<StepperState>((set) => ({
  active: 0,
  target: [
    ['email', 'password', 'passwordConfirmation'],
    ['first_name', 'last_name', 'phone'],
    ['province', 'city', 'barangay', 'address'],
  ],
  increaseStep: () =>
    set((state) => ({
      active: state.active < 3 ? state.active + 1 : state.active,
    })),
  decreaseStep: () =>
    set((state) => ({
      active: state.active > 0 ? state.active - 1 : state.active,
    })),
}));

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => set(() => ({ isLoggedIn: status })),
}));

export const useUserTypeStore = create<UserTypeState>()(
  devtools(
    persist(
      (set) => ({
        userType: '',
        setUserType: (type: string) => set({ userType: type }),
      }),
      {
        name: 'user-type-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export const useRegisterTypeStore = create<RegisterTypeState>((set) => ({
  isRegisterWithEmail: false,
  setIsRegisterWithEmail: () =>
    set((state) => ({ isRegisterWithEmail: !state.isRegisterWithEmail })),
}));
