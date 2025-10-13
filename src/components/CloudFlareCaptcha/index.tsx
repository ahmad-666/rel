'use client';

import Turnstile, { type TurnstileProps } from 'react-turnstile';
import envs from '@/configs/env';

type Props = Omit<TurnstileProps, 'sitekey'> & {
    hideMessage?: boolean;
    error?: boolean;
    helperText?: string;
};

const CloudFlareCaptcha = ({ hideMessage = false, error, helperText, className = '', ...rest }: Props) => {
    return (
        <div className={`${className}`}>
            <Turnstile
                id='cloudflare-captcha'
                sitekey={envs.cloudFlareCaptchaSiteKey}
                // refreshExpired="auto" //automatically reset captcha challenge once token expires
                theme='auto'
                appearance='always'
                size='flexible' //like google-captcha v2(with checkbox) ... width will be as same as parent width ... still has min-width:300px ... should also set fixedSize={true}
                // size='invisible' //like google-captcha v3(don't render anything) ... should also set fixedSize={false}
                // onVerify,onSuccess,onError,onTimeout,onExpire
                {...rest}
            />
            {!hideMessage && (
                <p className={`text-label-md mt-2 ${error ? 'text-error' : 'text-neutral-light2'}`}>{helperText}</p>
            )}
        </div>
    );
};

export default CloudFlareCaptcha;

//? Usage: validation with react-hook-form
// import { useTurnstile } from 'react-turnstile';
// const turnstile = useTurnstile();
// const { control,watch, setValue } = useForm<{captchaToken:string}>({defaultValues: {captchaToken: ''}});
// const captchaWatch = watch('captchaToken')
// const {mutateAsync} = useMutation({
//     mutationFn: async ({captchaToken}) => {await httpReq({captchaToken})},
//     onError: () => {
//         //? Captcha is one-time-used so if we use it then it became invalid , each time our http req failed we should try to generate new captcha
//         //? If we need to be sure captchaToken is generated before we use it --> we can create new boolean state + combine it with useEffect
//         turnstile?.reset(); //regenerate captcha token
//         setValue('captchaToken', '');
//     }
// })
// <Box mt={5} width={500}>
//     <Controller control={control} name='captchaToken' rules={{ required: 'Select checkbox' }}
//         render={({ field, fieldState }) => (
//             <CloudFlareCaptcha
//                 size="flexible" //or 'invisible' for something like google-captcha v3
//                 fixedSize
//                 onVerify={(captchaToken) => field.onChange(captchaToken)}
//                 error={!!fieldState.error}
//                 helperText={fieldState.error?.message}
//             />
//         )}
//     />
// </Box>
{
    /* <Button type="submit" disabled={!captchaWatch}>{captchaWatch?'Submit':'Loading Captcha...'}</Button> */
}
