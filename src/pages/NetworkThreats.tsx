import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Network, Activity, Shield, AlertTriangle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";

const networkTrafficData = [
  { time: "00:00", inbound: 120, outbound: 80, threats: 2 },
  { time: "04:00", inbound: 150, outbound: 95, threats: 5 },
  { time: "08:00", inbound: 300, outbound: 200, threats: 8 },
  { time: "12:00", inbound: 250, outbound: 180, threats: 6 },
  { time: "16:00", inbound: 400, outbound: 280, threats: 12 },
  { time: "20:00", inbound: 200, outbound: 120, threats: 4 },
];

const protocolThreats = [
  { protocol: "HTTP", threats: 45, blocked: 40 },
  { protocol: "HTTPS", threats: 32, blocked: 30 },
  { protocol: "FTP", threats: 18, blocked: 15 },
  { protocol: "SSH", threats: 12, blocked: 10 },
  { protocol: "DNS", threats: 8, blocked: 7 },
];

const networkAlerts = [
  { id: 1, type: "DDoS Attack", source: "192.168.1.100", target: "Server-01", severity: "Critical", status: "Mitigated", time: "1 min ago" },
  { id: 2, type: "Port Scan", source: "10.0.0.50", target: "DMZ", severity: "High", status: "Monitoring", time: "3 min ago" },
  { id: 3, type: "Brute Force", source: "172.16.0.25", target: "SSH-Server", severity: "Medium", status: "Blocked", time: "7 min ago" },
  { id: 4, type: "Data Exfiltration", source: "192.168.1.75", target: "Database", severity: "High", status: "Investigating", time: "10 min ago" },
];

const chartConfig = {
  inbound: { label: "Inbound", color: "#3b82f6" },
  outbound: { label: "Outbound", color: "#10b981" },
  threats: { label: "Threats", color: "#ef4444" },
};

export default function NetworkThreats() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Network Threats</h1>
            <p className="text-muted-foreground">Monitor network traffic and infrastructure threats</p>
          </div>
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Network Monitoring</span>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-red-500/10 border-red-500/20 threat-glow-critical">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">19</div>
              <p className="text-xs text-muted-foreground">+2 from last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20 glow-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              <Network className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">814</div>
              <p className="text-xs text-muted-foreground">92% legitimate</p>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20 threat-glow-low">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">461 Mbps</div>
              <p className="text-xs text-muted-foreground">274↓ 187↑</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Firewall Blocks</CardTitle>
              <Shield className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">156</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Network Traffic */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Network Traffic & Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={networkTrafficData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="inbound" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="outbound" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Protocol Threats */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Threats by Protocol</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={protocolThreats}>
                    <XAxis dataKey="protocol" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="threats" fill="#ef4444" />
                    <Bar dataKey="blocked" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Network Activity Map */}
        <Card className="bg-card/50 border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Live Network Topology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-background/30 rounded-lg border border-border/30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-8 gap-4 p-8">
                  {/* Server nodes */}
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse border-2 border-blue-300"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-green-300"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-green-300"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-green-300"></div>
                  
                  {/* Router nodes */}
                  <div className="w-4 h-4 bg-purple-400 rounded-full border-2 border-purple-300"></div>
                  <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse border-2 border-purple-300"></div>
                  
                  {/* Threat nodes */}
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-ping border-2 border-red-300"></div>
                  <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse border-2 border-orange-300"></div>
                  
                  {/* Additional nodes */}
                  <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-cyan-300"></div>
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse border-2 border-cyan-300"></div>
                  <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-cyan-300"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse border-2 border-yellow-300"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-green-300"></div>
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-ping border-2 border-red-300"></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-blue-300"></div>
                  <div className="w-4 h-4 bg-purple-400 rounded-full border-2 border-purple-300"></div>
                </div>
              </div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="normalConnection" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="threatConnection" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="rgb(251, 146, 60)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#normalConnection)" strokeWidth="2" />
                <line x1="30%" y1="20%" x2="70%" y2="80%" stroke="url(#threatConnection)" strokeWidth="2" />
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="url(#normalConnection)" strokeWidth="2" />
                <line x1="25%" y1="60%" x2="75%" y2="40%" stroke="url(#threatConnection)" strokeWidth="2" />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Network Alerts Table */}
        <Card className="bg-card/50 border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Network Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {networkAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.type}</TableCell>
                    <TableCell className="font-mono text-sm">{alert.source}</TableCell>
                    <TableCell className="font-mono text-sm">{alert.target}</TableCell>
                    <TableCell>
                      <Badge variant={alert.severity === "Critical" ? "destructive" : alert.severity === "High" ? "destructive" : "secondary"}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={alert.status === "Mitigated" || alert.status === "Blocked" ? "default" : "outline"}>
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
