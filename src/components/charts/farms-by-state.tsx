import { Text } from '@chakra-ui/react';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const FarmsByStateChart: React.FC = () => {
    return (
        <>
            <Text fontWeight={'bold'} as="h5">Fazendas por estado</Text>
            <PieChart width={300} height={300}>
                <Pie isAnimationActive={false} data={data} cx="50%" cy="50%" outerRadius={80} label dataKey={'value'}>
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </>
    );
}

export default FarmsByStateChart;
