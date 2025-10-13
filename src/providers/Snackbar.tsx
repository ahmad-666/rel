'use client';

import { createContext, type ReactNode } from 'react';
import Snackbar, { type Options } from '@/components/Snackbar';
import useStore from '@/store';

type Context = {
    snackbar: Options;
    setSnackbar: (snackbar: Options) => void;
    clearSnackbar: () => void;
};
type ProviderProps = { children: ReactNode };

export const SnackbarContext = createContext<Context>({
    snackbar: {
        type: 'error',
        show: false,
        duration: 3000,
        position: 'left-bottom',
        message: ''
    },
    setSnackbar: () => {},
    clearSnackbar: () => {}
});

const SnackbarProvider = ({ children }: ProviderProps) => {
    //? we don't create local useState and work with global snackbar state of zustand store for having sync states
    const snackbar = useStore((state) => state.snackbar);
    const setSnackbar = useStore((state) => state.setSnackbar);
    const clearSnackbar = useStore((state) => state.clearSnackbar);

    return (
        <SnackbarContext.Provider value={{ snackbar, setSnackbar, clearSnackbar }}>
            {children}
            <Snackbar
                type={snackbar.type}
                value={snackbar.show}
                onChange={(newVal) =>
                    setSnackbar({
                        ...snackbar,
                        show: newVal
                    })
                }
                duration={snackbar.duration || 3000}
                position={snackbar.position || 'left-bottom'}
                closable
                zIndex={5}
            >
                {snackbar.message}
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;

//? Usage: we can work with useSnackbar or useStore(store=>store.snackbar....)
// const { snackbar, setSnackbar, clearSnackbar } = useSnackbar(); //use useSnackbar hook to access to snackbar context which uses zustand store
// const snackbar = useStore((state) => state.snackbar); //directly work with zustand store ... we use this store in Snackbar context provider
// const setSnackbar = useStore((state) => state.setSnackbar); //directly work with zustand store ... we use this store in Snackbar context provider
// const clearSnackbar = useStore((state) => state.clearSnackbar);  //directly work with zustand store ... we use this store in Snackbar context provider
// <button onClick={() =>setSnackbar({type: 'success',show: true, message: 'msg'})}>change</button>
// <button onClick={() =>clearSnackbar()}>clear</button>
