'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import useStore from '@/store';
import useSnackbar from '@/hooks/useSnackbar';
import envs from '@/configs/env';
import { disconnectFrom, pushToCRM } from '@dashboard/services/integrations';
import { Status, Company, type Integration } from '@dashboard/types/Integration';

export type Variant = 'crm' | 'connection';
type Props = BoxProps &
    Integration & {
        variant: Variant;
        /** only for variant='crm' */
        bulkId?: number;
        onDisconnect?: () => void;
    };

export default function IntegrationCard({
    variant = 'connection',
    type,
    company,
    status,
    title,
    description,
    fillImgSrc,
    transparentImgSrc,
    bulkId,
    onDisconnect,
    ...rest
}: Props) {
    const isFreePlan = useStore((store) => store.isFreePlan());
    const { setSnackbar } = useSnackbar();
    const redirectURL = `${envs.frontUrl}/dashboard/integrations/${company}/success_connection`; //because set this redirectURL inside url query then it should not contains any url query itself and we send data via url params
    const integrationLink = (() => {
        let link = '';
        switch (company) {
            case Company.ZAPIER:
                link = 'https://zapier.com/apps/reverse-email-lookup/integrations';
                break;
            case Company.ZOHO:
                link = `https://accounts.zoho.com/oauth/v2/auth?client_id=${envs.zohoClientId}&redirect_uri=${redirectURL}&response_type=code&scope=ZohoCRM.modules.ALL&prompt=consent&access_type=offline`;
                break;
            case Company.HUBSPOT:
                link = `https://app.hubspot.com/oauth/authorize?client_id=${envs.hubspotClientId}&redirect_uri=${redirectURL}&scope=timeline%20oauth%20files%20crm.lists.read%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.objects.companies.write%20crm.schemas.contacts.read%20crm.lists.write%20crm.objects.companies.read%20crm.objects.deals.read%20crm.objects.deals.write%20crm.schemas.companies.read%20crm.schemas.companies.write%20crm.schemas.contacts.write%20crm.schemas.deals.read%20crm.schemas.deals.write%20crm.objects.owners.read`; //! NOT use '+' or ',' for separate scopes and only use '%20'                break;
            // case Company.SALESFORCE:
            //     link = `https://login.salesforce.com/services/oauth2/authorize?client_id=${envs.salesForceClientId}&redirect_uri=${redirectURL}&response_type=code`;
            //     break;
        }
        return link;
    })();
    const { isPending: disconnectLoading, mutateAsync: disconnectMutation } = useMutation({
        mutationFn: async () => {
            await disconnectFrom({ company });
        },
        onSuccess: () => {
            onDisconnect?.();
        }
    });
    const { isPending: pushLoading, mutateAsync: pushMutation } = useMutation({
        mutationFn: async () => {
            await pushToCRM({ bulk_id: bulkId!, company });
        },
        onSuccess: () => {
            setSnackbar({ type: 'success', show: true, message: 'Bulk pushed to CRM successfully' });
        }
    });

    return (
        <>
            {variant === 'connection' && (
                <Box p={5} border={1} borderColor='neutral.light3' borderRadius={4} {...rest}>
                    <Stack height={1} direction='column' justifyContent='space-between' alignItems='start' gap={8}>
                        <Box>
                            <Stack justifyContent='space-between' alignItems='center' gap={5}>
                                <Image
                                    src={fillImgSrc}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    style={{ width: '40px', borderRadius: '8px' }}
                                />
                                {status === Status.CONNECT && (
                                    <Typography
                                        component='span'
                                        variant='labelMd'
                                        py={0.5}
                                        px={1.5}
                                        sx={{
                                            py: 1,
                                            px: 2,
                                            bgcolor: 'success.light5',
                                            color: 'success.dark4',
                                            border: 1,
                                            borderColor: 'success.light4',
                                            borderRadius: 10
                                        }}
                                    >
                                        Connected
                                    </Typography>
                                )}
                            </Stack>
                            <Typography mt={5} component='h5' variant='labelLg' color='neutral.dark4'>
                                {title}
                            </Typography>
                            {!!description && (
                                <Typography mt={3} component='p' variant='bodySm' color='neutral'>
                                    {description}
                                </Typography>
                            )}
                        </Box>
                        <Button
                            size='small'
                            disabled={status === Status.COMING_SOON}
                            loading={disconnectLoading}
                            variant={isFreePlan || status === Status.DISCONNECT ? 'contained' : 'outlined'}
                            color={isFreePlan ? 'primary' : 'neutral'}
                            outlineColor={!isFreePlan ? 'neutral.light2' : undefined}
                            textColor={
                                status === Status.COMING_SOON || status === Status.CONNECT ? 'neutral.dark4' : undefined
                            }
                            bgColor={status === Status.DISCONNECT ? 'neutral.dark4' : undefined}
                            target={isFreePlan ? '_self' : status === Status.DISCONNECT ? '_blank' : undefined}
                            href={
                                isFreePlan
                                    ? '/dashboard/plans'
                                    : status === Status.DISCONNECT
                                      ? integrationLink
                                      : undefined
                            }
                            onClick={async () => {
                                if (status === Status.CONNECT) await disconnectMutation();
                            }}
                            sx={{
                                px: isFreePlan ? 5 : 8
                            }}
                        >
                            {status === Status.COMING_SOON
                                ? 'Coming Soon'
                                : isFreePlan
                                  ? 'Upgrade Your Plan'
                                  : status === Status.CONNECT
                                    ? 'Disconnect'
                                    : 'Connect'}
                        </Button>
                    </Stack>
                </Box>
            )}
            {variant === 'crm' && (
                <Box {...rest}>
                    <Stack justifyContent='space-between' alignItems='center' gap={2}>
                        <Stack alignItems='center' gap={1}>
                            <Image
                                src={transparentImgSrc}
                                alt={title}
                                width={40}
                                height={40}
                                className='shrink-0'
                                style={{ width: '25px' }}
                            />
                            <Typography component='p' variant='labelMd' color='neutral.dark4'>
                                {title}
                            </Typography>
                        </Stack>
                        <Button
                            size='small'
                            disabled={status === Status.COMING_SOON}
                            loading={pushLoading}
                            variant={isFreePlan || status === Status.CONNECT ? 'contained' : 'outlined'}
                            color='neutral'
                            bgColor={isFreePlan || status === Status.CONNECT ? 'neutral.dark4' : undefined}
                            outlineColor='neutral.light2'
                            textColor={isFreePlan || status === Status.CONNECT ? 'white' : 'neutral.dark4'}
                            target={isFreePlan ? '_self' : status === Status.DISCONNECT ? '_blank' : undefined}
                            href={
                                isFreePlan
                                    ? '/dashboard/plans'
                                    : status === Status.DISCONNECT
                                      ? integrationLink
                                      : undefined
                            }
                            onClick={async () => {
                                if (!isFreePlan && status === Status.CONNECT) await pushMutation();
                            }}
                        >
                            {status === Status.COMING_SOON
                                ? 'Coming Soon'
                                : isFreePlan
                                  ? 'Upgrade Your Plan'
                                  : status === Status.CONNECT
                                    ? 'Push'
                                    : 'Connect'}
                        </Button>
                    </Stack>
                </Box>
            )}
        </>
    );
}
