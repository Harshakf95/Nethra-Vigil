
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const severityData = [
  { level: "High Severity", count: 5, total: 32, color: "bg-red-500", percentage: 15.6 },
  { level: "Medium Severity", count: 5, total: 32, color: "bg-orange-500", percentage: 15.6 },
  { level: "Low Severity", count: 22, total: 32, color: "bg-green-500", percentage: 68.8 }
];

export function ThreatSeverityBreakdown() {
  return (
    <Card className="bg-card/50 border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Threat Severity Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {severityData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{item.level}</span>
              <span className="text-sm font-medium text-foreground">{item.count} threats</span>
            </div>
            <div className="relative">
              <Progress 
                value={item.percentage} 
                className="h-2 bg-muted/30"
              />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
