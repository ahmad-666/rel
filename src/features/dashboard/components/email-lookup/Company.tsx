import { useMemo } from 'react';
import Image from 'next/image';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Icon from '@/components/Icon';
import { type Company } from '@dashboard/types/Email-Lookup';

type Item = {
    title: string;
    content: string;
};
type Social = {
    route: string;
    icon: string;
    color?: string;
};
type Props = BoxProps & Company & {};

export default function EmailLookupCompany({
    name,
    industry,
    isInvestor,
    imgSrc,
    size,
    foundedYear,
    technologies,
    organizationType,
    productsServices,
    location,
    emailHostingName,
    emailIsAcceptAll,
    funding,
    socials,
    ...rest
}: Props) {
    const infoItems = useMemo<Item[]>(() => {
        const { country, state, city } = location;
        const { annualRevenue, lastRoundType, numberOfRounds, lastRoundAmount, lastRoundAmountCurrencyCode } = funding;
        const result: Item[] = [
            {
                title: 'Industry',
                content: industry
            },
            {
                title: 'Size',
                content: size
            },
            {
                title: 'Location',
                content: [city, state, country].filter((item) => !!item).join(', ')
            },
            {
                title: 'Founded Year',
                content: foundedYear
            },
            {
                title: 'Type',
                content: organizationType
            },
            {
                title: 'Technologies',
                content: technologies.join(', ')
            },
            {
                title: 'Product Services',
                content: productsServices.join(', ')
            },
            {
                title: 'Annual Revenue ',
                content: annualRevenue
            },
            {
                title: 'Last Funding Type ',
                content: lastRoundType
            },
            {
                title: 'Last Funding Amount',
                content: lastRoundAmount
            },
            {
                title: 'Last Funding Currency ',
                content: lastRoundAmountCurrencyCode
            },
            {
                title: 'Funding Rounds Count ',
                content: numberOfRounds
            },
            {
                title: 'Investor Company',
                content: isInvestor ? 'Yes' : 'No'
            },
            {
                title: 'Email Hosting Provider',
                content: emailHostingName
            },
            {
                title: 'Email Accepts All ',
                content: emailIsAcceptAll ? 'Yes' : 'No'
            }
        ];
        return result.filter((item) => !!item.content);
    }, [
        industry,
        organizationType,
        productsServices,
        isInvestor,
        size,
        foundedYear,
        location,
        technologies,
        emailHostingName,
        emailIsAcceptAll,
        funding
    ]);
    const socialItems = useMemo<Social[]>(() => {
        const { website, twitter, facebook, linkedinURL } = socials;
        const result: Social[] = [
            {
                route: website,
                icon: 'mdi:web',
                color: 'neutral.dark4'
            },
            {
                route: twitter,
                icon: 'streamline-logos:x-twitter-logo-block',
                color: 'neutral.dark4'
            },
            {
                route: facebook,
                icon: 'mdi:facebook',
                color: '#18acfe'
            },
            {
                route: linkedinURL,
                icon: 'mdi:linkedin',
                color: '#2182E4'
            }
        ];
        return result.filter((social) => !!social.route);
    }, [socials]);

    return (
        <Box overflow='hidden' p={5} border={1} borderColor='neutral.light2' borderRadius={4} {...rest}>
            <Stack
                direction={{ mobile: 'column', tablet: 'row' }}
                justifyContent={{ tablet: 'space-between' }}
                alignItems={{ mobile: 'flex-start', tablet: 'center' }}
                gap={4}
            >
                <Stack alignItems='center' gap={2}>
                    <Box
                        overflow='hidden'
                        borderRadius={3}
                        sx={{
                            '& img': {
                                width: 50,
                                objectFit: 'cover'
                            }
                        }}
                    >
                        <Image
                            src={imgSrc || '/imgs/avatars/defaults/fill-light.png'}
                            alt={name}
                            width={150}
                            height={150}
                        />
                    </Box>
                    <Box>
                        <Typography component='p' variant='titleMd' color='neutral.dark4' textTransform='capitalize'>
                            {name}
                        </Typography>
                    </Box>
                </Stack>
                <Stack component='ul' alignItems='center' gap={3} flexWrap='wrap'>
                    {socialItems.map((social) => (
                        <li key={social.route}>
                            <a target='_blank' href={social.route}>
                                <Icon icon={social.icon} color={social.color || 'neutral.dark4'} size='2sm' />
                            </a>
                        </li>
                    ))}
                </Stack>
            </Stack>
            <Divider sx={{ my: 5, borderColor: 'neutral.light2' }} />
            <Box>
                <Grid component='ul' container columns={12} spacing={7}>
                    {infoItems.map((info) => (
                        <Grid
                            key={info.title}
                            component='li'
                            size={{
                                mobile: 10,
                                tablet: 6,
                                desktop: 4
                            }}
                        >
                            <Typography component='h5' variant='bodySm' color='neutral.main' textTransform='capitalize'>
                                {info.title}
                            </Typography>
                            <Box mt={0.5} typography='labelLg' color='neutral.dark4'>
                                {info.content}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
