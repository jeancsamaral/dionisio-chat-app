import React from 'react';
import { Card } from "@/components/ui/card";
import { Pie, PieChart, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';

interface OlimpiadCardQuestionsProps {
    title: string;
    subtitle: string;
    className?: string;
    data: [
        { name: 'Acertos', value: number, color: 'hsl(var(--chart-2))' },
        { name: 'Erros', value: number, color: 'hsl(var(--chart-3))' },
        { name: 'Sem Fazer', value: number, color: 'hsl(var(--chart-1))' },
    ];
}

const OlimpiadCardQuestions: React.FC<OlimpiadCardQuestionsProps> = ({ title, subtitle, data }) => {
    // Create a dynamic chartConfig based on the data
    const chartConfig: ChartConfig = data.reduce((config, item) => {
        config[item.name.toLowerCase()] = {
            label: item.name,
            color: item.color,
        };
        return config;
    }, {} as ChartConfig);

    return (
        <Card className="flex items-center justify-around p-4">
            <div>
                <div className="text-lg font-bold">{title}</div>
                <div className="text-sm text-muted-foreground">{subtitle}</div>
            </div>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square w-full max-w-[200px] max-h-[250px] flex justify-center items-center m-0"
            >
                <PieChart width={110} height={110}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={45}
                        outerRadius={70}
                        strokeWidth={5}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
        </Card>
    );
}

export default OlimpiadCardQuestions;
