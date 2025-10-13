import { type StateCreator } from 'zustand';
import { type UTM } from '@/types/UTM';

export type States = {
    utms: UTM;
};
export type Actions = {
    setUTMS: (utms: UTM) => void;
    updateUTMs: (utms: Partial<UTM>) => void;
    clearUTMs: () => void;
};
export type Slice = States & Actions;

const sliceName = 'utms';

const defaultUTMs: UTM = {};

const createUTMsSlice: StateCreator<Slice, [['zustand/devtools', unknown]], [], Slice> = (set, get) => ({
    //* States .........................
    utms: defaultUTMs,
    //* Setters,Mutations,Actions .........................
    setUTMS: (utms) => {
        set(
            {
                utms
            },
            undefined,
            `${sliceName}/setUTMS`
        );
    },
    updateUTMs: (utms) => {
        set(
            (state) => ({
                utms: {
                    ...state.utms,
                    ...utms
                }
            }),
            undefined,
            `${sliceName}/updateUTMs`
        );
    },
    clearUTMs: () => {
        set({ utms: defaultUTMs }, undefined, `${sliceName}/clearUTMs`);
    }
});

export default createUTMsSlice;
