import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
    title: string;
    value: string;
    textColor: string;
}

export default function StatsCard({ title, value, textColor }: StatsCardProps) {
    return (
        <Card className="p-4">
            <CardContent className="space-y-2">
                <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
                <div className="text-sm text-muted-foreground">{title}</div>
            </CardContent>
        </Card>
    );
}
