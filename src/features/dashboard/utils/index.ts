import { Status as PlanStatus, Type as PlanType, Duration as PlanDuration } from '@dashboard/types/Plan';
import { Status as BulkStatus } from '@dashboard/types/Bulk';
import palette from '@/themes/mui/palette';

//* Plans -------------------------------------
type ParsedPlanStatus = {
    text: string;
    lightenColor: string;
    darkenColor: string;
};
export const parsePlanStatus = (status: PlanStatus) => {
    const result: ParsedPlanStatus = { text: '', lightenColor: '', darkenColor: '' };
    switch (status) {
        case PlanStatus.ACTIVE:
            result.text = 'Active';
            result.lightenColor = palette.success.light5!;
            result.darkenColor = palette.success.dark4!;
            break;
        case PlanStatus.DEACTIVATE:
            result.text = 'Deactivated';
            result.lightenColor = palette.error.light5!;
            result.darkenColor = palette.error.dark4!;
            break;
        case PlanStatus.CANCEL:
            result.text = 'Cancel';
            result.lightenColor = palette.error.light5!;
            result.darkenColor = palette.error.dark4!;
            break;
        default:
            result.text = 'Unknown';
            result.lightenColor = palette.neutral.light5!;
            result.darkenColor = palette.neutral.dark4!;
            break;
    }

    return result;
};
type ParsedPlanIcon = {
    icon: string;
    color: string;
};
export const getPlanIcon = (type: PlanType) => {
    let result: ParsedPlanIcon;
    switch (type) {
        case PlanType.STARTER:
            result = {
                icon: 'ph:flag-duotone',
                color: 'info.main'
            };
            break;
        case PlanType.GROWTH:
            result = {
                icon: 'ph:leaf-duotone',
                color: 'success.main'
            };
            break;
        case PlanType.SCALE:
            result = {
                icon: 'ph:target-duotone',
                color: 'pastelPink.main'
            };
            break;
        default:
            result = {
                icon: 'ph:hand-heart-duotone',
                color: 'neutral.dark4'
            };
    }
    return result;
};
type ParsedPlanDuration = {
    text: string;
};
export const parsePlanDuration = (duration: PlanDuration): ParsedPlanDuration => {
    let result: ParsedPlanDuration;
    switch (duration) {
        case PlanDuration.MONTHLY:
            result = {
                text: 'monthly'
            };
            break;
        case PlanDuration.YEARLY:
            result = {
                text: 'yearly'
            };
            break;
        default:
            result = {
                text: ''
            };
    }
    return result;
};
//* Bulks -------------------------------------
type ParsedBulkStatus = {
    text: string;
    color: string;
    icon: string;
    emoji: string;
};
export const parseBulkStatus = (status: BulkStatus): ParsedBulkStatus => {
    let result: ParsedBulkStatus;
    switch (status) {
        case BulkStatus.PROCESSING:
            result = {
                text: 'Processing...',
                color: palette.warning.main,
                icon: 'ph:arrows-clockwise',
                emoji: '🔄'
            };
            break;
        case BulkStatus.COMPLETED:
            result = {
                text: 'Ready',
                color: palette.success.main,
                icon: 'ph:check-circle-fill',
                emoji: '✅'
            };
            break;
        case BulkStatus.DOWNLOADED:
            result = {
                text: 'Downloaded',
                color: palette.neutral.dark4!,
                icon: 'ph:download-simple',
                emoji: '⚫️'
            };
            break;
        case BulkStatus.FAILED:
            result = {
                text: 'Failed',
                color: palette.error.main,
                icon: 'ph:x-circle-fill',
                emoji: '❌'
            };
            break;
        default:
            result = {
                text: 'Unknown',
                color: palette.neutral.light2!,
                icon: 'ph:file-text-fill',
                emoji: '📂'
            };
            break;
    }
    return result;
};
//* Payments -------------------------------------
export const getCreditCardImage = (card: string) => {
    let src = '';
    if (card.includes('visa')) src = '/imgs/payments/visa.png';
    else if (card.includes('master')) src = '/imgs/payments/mastercard.png';
    return src;
};
