import { useMemo } from 'react';
import Image from 'next/image';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Icon from '@/components/Icon';
import { type User } from '@dashboard/types/Email-Lookup';

type Item = {
    title: string;
    content: string;
};
type Social = {
    route: string;
    icon: string;
    color?: string;
};
type Props = BoxProps &
    User & {
        companyName: string;
    };

export default function EmailLookupUser({
    firstName,
    lastName,
    fullName,
    isCEO,
    imgSrc,
    location,
    headline,
    job,
    companyName,
    skills,
    interests,
    certifications,
    socials,
    ...rest
}: Props) {
    const infoItems = useMemo<Item[]>(() => {
        const { country, state, city } = location;
        const { role, levels, categories } = job;
        const { linkedinUserName } = socials;
        const result: Item[] = [
            {
                title: 'Job Title',
                content: job.title
            },
            {
                title: 'Headline',
                content: headline
            },
            {
                title: 'LinkedIn Username',
                content: linkedinUserName
            },
            {
                title: 'Location',
                content: [city, state, country].filter((location) => !!location).join(', ')
            },
            {
                title: 'Job Title Level',
                content: levels
            },
            {
                title: 'Job Title Role',
                content: role
            },
            {
                title: 'Job Title Category',
                content: categories.join(', ')
            },
            {
                title: 'Interest',
                content: interests.join(', ')
            },
            {
                title: 'Skill',
                content: skills.join(', ')
            },
            {
                title: 'Certifications',
                content: certifications.join(', ')
            }
        ];
        return result.filter((item) => !!item.content);
    }, [headline, socials, location, job, interests, skills, certifications]);
    const socialItems = useMemo<Social[]>(() => {
        const { twitter, facebook, github, linkedinURL } = socials;
        const result: Social[] = [
            {
                route: twitter,
                icon: 'ph:x-logo-fill',
                color: 'neutral.dark4'
            },
            {
                route: facebook,
                icon: 'mdi:facebook',
                color: '#18acfe'
            },
            {
                route: github,
                icon: 'mdi:github',
                color: 'neutral.dark4'
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
                            alt={fullName}
                            width={150}
                            height={150}
                        />
                    </Box>
                    <Box>
                        <Stack alignItems='center' gap={2}>
                            <Typography
                                component='p'
                                variant='titleMd'
                                color='neutral.dark4'
                                textTransform='capitalize'
                            >
                                {fullName}
                            </Typography>
                            {isCEO && (
                                <Typography
                                    py={0.5}
                                    px={2}
                                    component='span'
                                    variant='labelMd'
                                    bgcolor='primary.light4'
                                    color='primary.dark4'
                                    border={1}
                                    borderColor='primary.light2'
                                    borderRadius={10}
                                >
                                    CEO
                                </Typography>
                            )}
                        </Stack>

                        <Typography mt={0.5} component='p' variant='bodySm' color='neutral.main'>
                            {!!job.role && (
                                <Typography
                                    component='span'
                                    variant='inherit'
                                    color='inherit'
                                    textTransform='capitalize'
                                >
                                    {job.role}
                                </Typography>
                            )}
                            {!!companyName && (
                                <>
                                    {' at '}
                                    <Typography
                                        component='span'
                                        variant='inherit'
                                        color='inherit'
                                        textTransform='capitalize'
                                    >
                                        {companyName}
                                    </Typography>
                                </>
                            )}
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
                    {infoItems.map((item) => (
                        <Grid
                            key={item.title}
                            component='li'
                            size={{
                                mobile: 12,
                                tablet: 6,
                                desktop: 4
                            }}
                        >
                            <Typography component='h5' variant='bodySm' color='neutral.main' textTransform='capitalize'>
                                {item.title}
                            </Typography>
                            <Box mt={0.5} typography='labelLg' lineHeight={1.5} color='neutral.dark4'>
                                {item.content}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
