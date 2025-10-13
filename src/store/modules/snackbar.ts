import { type StateCreator } from 'zustand';
import { type Options } from '@/components/Snackbar';

export type States = {
    snackbar: Options;
};
export type Actions = {
    setSnackbar: (snackbar: Options) => void;
    clearSnackbar: () => void;
};
export type Slice = States & Actions;

const sliceName = 'snackbar';

const defaultSnackbar: Options = {
    type: 'error',
    show: false,
    duration: 3000,
    position: 'left-bottom',
    message: ''
};

const createSnackbarSlice: StateCreator<Slice, [['zustand/devtools', unknown]], [], Slice> = (set, get) => ({
    //* States .........................
    snackbar: defaultSnackbar,
    //* Setters,Mutations,Actions .........................
    setSnackbar: (snackbar) => {
        set(
            {
                snackbar
            },
            undefined,
            `${sliceName}/setSnackbar`
        );
    },
    clearSnackbar: () => {
        set({ snackbar: defaultSnackbar }, undefined, `${sliceName}/clearSnackbar`);
    }
});

export default createSnackbarSlice;
