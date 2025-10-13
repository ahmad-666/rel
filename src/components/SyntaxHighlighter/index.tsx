'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/Icon';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import useColor from '@/hooks/useColor';
import useClipboard from '@/hooks/useClipboard';
import CircularLoader from '@/components/loaders/Circular';
import { codeToHtml, type BundledLanguage as Lang, type BundledTheme as Theme } from 'shiki';

//* Types -----------------------------
type SyntaxHighlighterProps = {
    title?: string;
    code: string;
    lang: Lang;
    theme?: Theme;
    copyToClipboard?: boolean;
    copyToClipboardContent?: string;
    color?: string;
    className?: string;
    codeWrapperClassName?: string;
};

//* Component -------------------------
const SyntaxHighlighter = ({
    title,
    code,
    lang,
    theme = 'aurora-x',
    copyToClipboard = true,
    copyToClipboardContent, //manually set copy to clipboard content(default is editor code)
    color = 'surface-darken-4', //bg-color of editor
    className = '',
    codeWrapperClassName = ''
}: SyntaxHighlighterProps) => {
    const codeContainer = useRef<HTMLDivElement>(null!);
    //? we pass 'code' prop to 'codeToHtml()' and result will go to parsedCode  ... so 'code' prop and 'parsedCode' are not same thing.
    //? we can use ref or state version , here we use ref for better performance
    const parsedCode = useRef('');
    // const [parsedCode, setParsedCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeError, setCodeError] = useState('');
    const parsedColor = useColor(color);
    const {
        status: clipboardStatus,
        setStatus: setClipboardStatus,
        copyToClipboard: copyCodeToClipboard
    } = useClipboard();
    const copyHandler = async () => {
        await copyCodeToClipboard(copyToClipboardContent || code);
    };
    const loadCode = useCallback(async () => {
        try {
            setLoading(true);
            setCodeError('');
            const result = await codeToHtml(code, { lang, theme });
            parsedCode.current = result;
            codeContainer.current.innerHTML = parsedCode.current;
            //setParsedCode(result)
        } catch (err: unknown) {
            const error = err as Error;
            setCodeError(error.message || 'Error happens when loading code !');
        } finally {
            setLoading(false);
        }
    }, [lang, theme, code]);
    useEffect(() => {
        loadCode();
    }, [loadCode]);

    return (
        <div
            className={`max-w-full overflow-hidden ${className}`}
            style={{
                backgroundColor: parsedColor
            }}
        >
            <div>
                <div className='flex items-center justify-between gap-4'>
                    {!!title && <p className='text-label-md text-white'>{title}</p>}
                    <div className='flex shrink-0 items-center gap-2'>
                        <Alert
                            show={clipboardStatus.show && clipboardStatus.type === 'success'}
                            onChange={(newVal) => setClipboardStatus({ show: newVal, type: 'success', message: '' })}
                            size='sm'
                            timeout={3000}
                            className='shrink-0 !bg-transparent !p-0'
                        >
                            <span className='text-bod-md text-success'>Copied !</span>
                        </Alert>
                        {copyToClipboard && !loading && (
                            <Button
                                variant='text'
                                className='!p-0 hover:!bg-transparent'
                                press={false}
                                onClick={copyHandler}
                            >
                                <Icon icon='solar:clipboard-add-outline' color='white' size='md' />
                            </Button>
                        )}
                        {loading && <CircularLoader animate size={20} thickness={2} color='white' />}
                    </div>
                </div>
                <div
                    className={`scrollbar-thin scrollbar-thumb-neutral-light2 scrollbar-track-transparent mt-4 overflow-auto ${codeWrapperClassName}`}
                >
                    <div
                        ref={codeContainer}
                        className='shiki-container'
                        // dangerouslySetInnerHTML={{
                        //     __html: parsedCode
                        // }}
                    ></div>
                    <Alert
                        show={!!codeError}
                        onChange={(val) => setCodeError((old) => (val ? old : ''))}
                        size='sm'
                        color='error'
                        timeout={-1}
                        closable
                    >
                        <span className='text-body-md text-white'>{codeError}</span>
                    </Alert>
                </div>
            </div>
        </div>
    );
};

export default SyntaxHighlighter;
