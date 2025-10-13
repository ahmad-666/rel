'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IntegrationCard, { type Variant } from '@dashboard/components/integrations/Card';
import { getLists } from '@dashboard/services/integrations';
import initialIntegrations from '@dashboard/data/integrations';
import { Status, Company, type Integration } from '@dashboard/types/Integration';

type Props = BoxProps & {
    variant: Variant;
    /** only for variant='crm' */
    bulkId?: number;
};

export default function IntegrationsList({ variant = 'connection', bulkId, ...rest }: Props) {
    const queryClient = useQueryClient();
    const { isFetching, data: integrations } = useQuery({
        initialData: initialIntegrations,
        queryKey: ['get-integrations-list'],
        queryFn: async () => {
            const lists = await getLists();
            const integrationsWithStatus = initialIntegrations.map((integration) => ({
                ...integration,
                status:
                    integration.company === Company.SALESFORCE
                        ? Status.COMING_SOON
                        : lists[integration.company]
                          ? Status.CONNECT
                          : Status.DISCONNECT
            }));
            return integrationsWithStatus;
        }
    });
    const onDisconnect = (company: Company) => {
        queryClient.setQueryData(['get-integrations-list'], (oldData: Integration[]) => {
            return oldData.map((integration) =>
                integration.company === company ? { ...integration, status: Status.DISCONNECT } : integration
            );
        });
    };

    return (
        <Box {...rest}>
            {variant === 'connection' && (
                <Box>
                    <Grid component='ul' container spacing={3}>
                        {isFetching
                            ? Array.from({ length: 3 }).map((_, i) => (
                                  <Grid key={i} component='li' size={{ mobile: 12, tablet: 6, laptop: 4, desktop: 3 }}>
                                      <Skeleton height={200} sx={{ transform: 'initial' }} />
                                  </Grid>
                              ))
                            : integrations.map((integration) => (
                                  <Grid
                                      key={integration.title}
                                      component='li'
                                      size={{ mobile: 12, tablet: 6, laptop: 4, desktop: 3 }}
                                  >
                                      <IntegrationCard
                                          variant='connection'
                                          {...integration}
                                          onDisconnect={() => onDisconnect(integration.company)}
                                          height={1}
                                      />
                                  </Grid>
                              ))}
                    </Grid>
                </Box>
            )}
            {variant === 'crm' && (
                <>
                    {isFetching ? (
                        <Stack p={2} justifyContent='center' alignItems='center'>
                            <CircularProgress variant='indeterminate' size={35} />
                        </Stack>
                    ) : (
                        <Stack
                            direction='column'
                            divider={<Divider sx={{ borderColor: 'neutral.light3' }} />}
                            spacing={3}
                        >
                            {integrations.map((integration) => (
                                <IntegrationCard
                                    key={integration.title}
                                    variant='crm'
                                    bulkId={bulkId}
                                    {...integration}
                                />
                            ))}
                        </Stack>
                    )}
                </>
            )}
        </Box>
    );
}

//? General flow of Integrations:
//* Zapier is different from Zoho,HubSpot,SalesForce and for zapier first we show some static page that has:
{
    /* <link rel='stylesheet' href='https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css' />
<script id='zapier-web-component' type='module' src='https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js'></script> */
}
// and then we use zapier web component: <zapier-zap-templates theme='light' ids={...} limit={5} use-this-zap='show' />
// Or we could simply create link to zapier e.g <Link target="_blank" href="https://zapier.com/apps/reverse-email-lookup/integrations">Zapier integration</Link>
//* Zoho,HubSpot,SalesForce need a url link that should contains queries like client_id,... and then we go to their sites and from there after we connect to their services we redirect to our own site
//* Check /src/features/dashboard/components/integrations/Card for see how we redirect for zoho,salesforce,hubspot
