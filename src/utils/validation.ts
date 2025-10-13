import { type PasswordCheck } from '@/types/Common';

//* Regex ----------------------------------------
//* Regex ----------------------------------------
export const emailRegex = new RegExp(/.{1,}@.{1,}\..{1,}/);
export const minLength8Regex = new RegExp(/.{8,}/);
export const oneNumberRegex = new RegExp(/\d+/);
export const oneUpperCaseRegex = new RegExp(/[A-Z]+/);
export const oneLowerCaseRegex = new RegExp(/[a-z]+/);
export const creditCardRegex = new RegExp(/^\d{4}-\d{4}-\d{4}-\d{2,4}$/); //credit card can be between 14,16 characters ... e.g 1234-1234-1234-1234
export const creditCardExpirationDateRegex = new RegExp(/^\d{2}\s\/\s\d{2}$/); //credit card can be between 14,16 characters ... e.g 1234-1234-1234-1234
//* Util Methods -----------------------------------
//* Util Methods -----------------------------------

type PasswordRules = {
    required?: boolean;
    minLength8?: boolean;
    oneNumber?: boolean;
    oneLowerCase?: boolean;
    oneUpperCase?: boolean;
};
export const getPasswordChecks = ({
    required,
    minLength8,
    oneNumber,
    oneLowerCase,
    oneUpperCase
}: PasswordRules): PasswordCheck[] => {
    const result: PasswordCheck[] = [];
    if (required) result.push({ label: 'Required', message: 'Field is required', validator: (val) => !!val });
    if (minLength8)
        result.push({
            label: '8 characters minimum',
            message: 'Should contains at least 8 characters',
            validator: (val) => val.length >= 8
        });
    if (oneNumber)
        result.push({
            label: 'One number',
            message: 'Should contains 1 number',
            validator: (val) => oneNumberRegex.test(val)
        });
    if (oneLowerCase)
        result.push({
            label: 'One lowercase character',
            message: 'Should contains 1 lower-case character',
            validator: (val) => oneLowerCaseRegex.test(val)
        });
    if (oneUpperCase)
        result.push({
            label: 'One uppercase character',
            message: 'Should contains 1 upper-case character',
            validator: (val) => oneUpperCaseRegex.test(val)
        });

    return result;
};
