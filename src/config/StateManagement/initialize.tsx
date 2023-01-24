import { create } from 'zustand';
import { ProvinceForm } from '../Types/initialize';

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
