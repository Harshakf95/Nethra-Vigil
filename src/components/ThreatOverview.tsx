
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, TrendingUp } from "lucide-react";

const threatData = [
  {
    title: "Active Threats",
    value: "24",
    subtitle: "5 high, 5 medium, 22 low severity",
    icon: AlertTriangle,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    glowClass: "threat-glow-critical",
    borderColor: "border-red-500/20"
  },
  {
    title: "Blocked Threats",
    value: "6",
    subtitle: "Security measures stopped 19% of all threats",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    glowClass: "glow-effect",
    borderColor: "border-blue-500/20"
  },
  {
    title: "Threat Distribution",
    value: "13 / 19",
    subtitle: "Web vs Network threats detected in last 24 hours",
    icon: TrendingUp,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    glowClass: "threat-glow-low",
    borderColor: "border-green-500/20"
  }
];

export function ThreatOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {threatData.map((threat, index) => (
        <Card 
          key={index} 
          className={`${threat.bgColor} ${threat.glowClass} border ${threat.borderColor} transition-all duration-300 hover:scale-[1.02]`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {threat.title}
            </CardTitle>
            <threat.icon className={`h-5 w-5 ${threat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {threat.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {threat.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
