import { useState } from 'react';

type StatusType = 'success' | 'error';
type Status = {
    show: boolean;
    type: StatusType;
    message: string;
};

const useClipboard = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<Status>({ show: false, type: 'success', message: '' });
    const copyToClipboard = async (text: string) => {
        try {
            setLoading(true);
            setStatus({ show: false, type: 'success', message: '' });
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                setStatus({ show: true, type: 'success', message: 'Text successfully copied !' });
            } else throw new Error('Your browser does not support clipboard!');
        } catch (err: unknown) {
            const error = err as Error;
            setStatus({
                show: true,
                type: 'error',
                message: error.message || 'Error happens when interacting with clipboard.'
            });
        } finally {
            setLoading(false);
        }
    };
    const readFromClipboard = async () => {
        try {
            setLoading(true);
            setStatus({ show: false, type: 'success', message: '' });
            if (navigator.clipboard) {
                const text = await navigator.clipboard.readText();
                setStatus({ show: true, type: 'success', message: 'Text successfully extracted from clipboard !' });
                return text;
            } else throw new Error('Your browser does not support clipboard!');
        } catch (err: unknown) {
            const error = err as Error;
            setStatus({
                show: true,
                type: 'error',
                message: error.message || 'Error happens when interacting with clipboard.'
            });
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        setLoading,
        status,
        setStatus,
        copyToClipboard,
        readFromClipboard
    };
};

export default useClipboard;

//* Example:
// const { loading, status, copyToClipboard, readFromClipboard } = useClipboard();
// <button onClick={async () => await copyToClipboard('hello')}>write</button>
// <button onClick={async () => {const r = await readFromClipboard()}}>read</button>
