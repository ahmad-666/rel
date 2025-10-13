import { useContext } from 'react';
import { SnackbarContext } from '@/providers/Snackbar';

const useSnackbar = () => {
    const { snackbar, setSnackbar, clearSnackbar } = useContext(SnackbarContext);
    return { snackbar, setSnackbar, clearSnackbar };
};

export default useSnackbar;
