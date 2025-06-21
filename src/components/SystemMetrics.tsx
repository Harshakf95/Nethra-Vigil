
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Download, Upload, Users, FileCheck, ShieldX, AlertCircle } from "lucide-react";

const systemData = [
  {
    title: "CPU Usage",
    value: "29%",
    icon: Cpu,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Memory Usage", 
    value: "69%",
    icon: HardDrive,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10"
  },
  {
    title: "Network In",
    value: "274 Mbps",
    icon: Download,
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Network Out",
    value: "187 Mbps", 
    icon: Upload,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10"
  },
  {
    title: "Active Connections",
    value: "814",
    icon: Users,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10"
  },
  {
    title: "Total Requests",
    value: "10,754",
    icon: FileCheck,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  {
    title: "Blocked Requests",
    value: "390",
    icon: ShieldX,
    color: "text-red-400",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Threats Detected",
    value: "7 today",
    icon: AlertCircle,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10"
  }
];

export function SystemMetrics() {
  return (
    <Card className="bg-card/50 border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          System Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {systemData.map((metric, index) => (
            <div 
              key={index}
              className={`${metric.bgColor} p-4 rounded-lg border border-border/30 hover:bg-accent/20 transition-colors`}
            >
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
              <div className="text-xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {metric.title}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
