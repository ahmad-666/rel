'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Box, { type BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import dayjs from '@/libs/dayjs';
import { type CreditStatistics } from '@dashboard/types/Plan';

type Props = BoxProps & {
    items: CreditStatistics[];
};

export default function CreditUsageChart({ items = [], height = 300, ...rest }: Props) {
    const theme = useTheme();
    const coloring = {
        bar: theme.palette.primary.main,
        label: theme.palette.neutral.main,
        grid: theme.palette.neutral.light3
    };

    return (
        <Box {...rest}>
            <Box px={0} py={5} border={1} borderColor='neutral.light3' borderRadius={3}>
                <Box width={1} height={height}>
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={items} barCategoryGap={50} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                            <CartesianGrid
                                horizontal={true}
                                vertical={false}
                                strokeWidth={1}
                                strokeDasharray='0 0'
                                stroke={coloring.grid}
                            />
                            <XAxis
                                dataKey='date'
                                axisLine={false}
                                tickLine={false}
                                tickMargin={20}
                                tickFormatter={(value) => dayjs(value).format('MMM YYYY')}
                                tick={{
                                    fontFamily: 'var(--font-manrope)',
                                    fontSize: '.75rem',
                                    fontWeight: '600',
                                    fill: coloring.label
                                }}
                            />
                            <YAxis
                                dataKey='value'
                                domain={[0, 'dataMax + 10']} // set min,max
                                axisLine={false}
                                tickLine={false}
                                tickMargin={20}
                                tick={{
                                    fontFamily: 'var(--font-manrope)',
                                    fontSize: '.75rem',
                                    fontWeight: '600',
                                    fill: coloring.label
                                }}
                            />
                            <Tooltip
                                content={({ active, label, payload }) => {
                                    if (active && payload?.length) {
                                        return (
                                            <Box bgcolor='white' p={2} borderRadius={2} boxShadow={1}>
                                                <Typography
                                                    component='h6'
                                                    variant='bodySm'
                                                    fontWeight={600}
                                                    color='neutral.dark4'
                                                >
                                                    {label}:{' '}
                                                    <Typography component='span' variant='bodySm' color='neutral.main'>
                                                        {payload[0].value}
                                                    </Typography>
                                                </Typography>
                                            </Box>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey='value' barSize={25} fill={coloring.bar} radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    );
}
