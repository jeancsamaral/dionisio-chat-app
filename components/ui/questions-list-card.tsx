import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestionsListCardProps {
    title: string;
    description: string;
    correct: number;
    incorrect: number;
    unanswered: number;
    icon: React.ReactNode;
    correctIcon: React.ReactNode;
    incorrectIcon: React.ReactNode;
    unansweredIcon: React.ReactNode;
}

const QuestionsListCard: React.FC<QuestionsListCardProps> = ({
    title,
    description,
    correct,
    incorrect,
    unanswered,
    icon,
    correctIcon,
    incorrectIcon,
    unansweredIcon
}) => {
    return (
        <Card className="bg-blue-900 bg-opacity-20 backdrop-blur-lg border border-blue-500 border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <p className="text-sm text-blue-300 mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {correctIcon}
                        <span className="ml-2">{correct}</span>
                    </div>
                    <div className="flex items-center">
                        {incorrectIcon}
                        <span className="ml-2">{incorrect}</span>
                    </div>
                    <div className="flex items-center">
                        {unansweredIcon}
                        <span className="ml-2">{unanswered}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuestionsListCard;
