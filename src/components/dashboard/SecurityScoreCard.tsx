
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SecurityScoreCardProps {
  score: number;
  className?: string;
}

const SecurityScoreCard: React.FC<SecurityScoreCardProps> = ({ score, className }) => {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getProgressColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className={cn("cyber-card h-full border-opacity-20", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Security Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className={cn("text-5xl font-bold mb-6", getScoreColor())}>{score}</div>
          <div className="w-full">
            <Progress 
              value={score} 
              className={cn("h-2 w-full mb-6")}
              style={{ 
                '--progress-background': getProgressColor() 
              } as React.CSSProperties} 
            />
          </div>
          <div className="grid grid-cols-4 w-full text-xs text-center mt-2">
            <div className="text-red-500">Critical</div>
            <div className="text-orange-500">Warning</div>
            <div className="text-yellow-500">Fair</div>
            <div className="text-green-500">Good</div>
          </div>
        </div>
        <div className="mt-6 text-sm">
          <h3 className="font-medium mb-2">Security Recommendations:</h3>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside">
            <li>Monitor suspicious transaction patterns</li>
            <li>Review contract interactions with flagged addresses</li>
            <li>Enable additional wallet security features</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityScoreCard;
