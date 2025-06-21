import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Globe, Shield, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";

const webThreatData = [
  { time: "00:00", threats: 12, blocked: 8 },
  { time: "04:00", threats: 18, blocked: 14 },
  { time: "08:00", threats: 25, blocked: 20 },
  { time: "12:00", threats: 22, blocked: 18 },
  { time: "16:00", threats: 30, blocked: 25 },
  { time: "20:00", threats: 15, blocked: 12 },
];

const threatTypes = [
  { name: "Malware", value: 35, color: "#ef4444" },
  { name: "Phishing", value: 28, color: "#f97316" },
  { name: "SQL Injection", value: 20, color: "#eab308" },
  { name: "XSS", value: 17, color: "#10b981" },
];

const recentThreats = [
  { id: 1, type: "Malware", url: "malicious-site.com", severity: "High", status: "Blocked", time: "2 min ago" },
  { id: 2, type: "Phishing", url: "fake-bank.net", severity: "Critical", status: "Blocked", time: "5 min ago" },
  { id: 3, type: "SQL Injection", url: "vulnerable-app.com", severity: "Medium", status: "Detected", time: "8 min ago" },
  { id: 4, type: "XSS", url: "forum-site.org", severity: "Low", status: "Monitored", time: "12 min ago" },
];

const chartConfig = {
  threats: { label: "Threats", color: "#ef4444" },
  blocked: { label: "Blocked", color: "#10b981" },
};

export default function WebThreats() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Web Threats</h1>
            <p className="text-muted-foreground">Monitor and analyze web-based security threats</p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Real-time Monitoring</span>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-red-500/10 border-red-500/20 threat-glow-critical">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">13</div>
              <p className="text-xs text-muted-foreground">+3 from last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20 glow-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Today</CardTitle>
              <Shield className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">247</div>
              <p className="text-xs text-muted-foreground">94% success rate</p>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20 threat-glow-low">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clean Requests</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8,429</div>
              <p className="text-xs text-muted-foreground">85% of total traffic</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scan Rate</CardTitle>
              <Globe className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1.2K/s</div>
              <p className="text-xs text-muted-foreground">URLs per second</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Threat Timeline */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Threat Timeline (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={webThreatData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="threats"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="blocked"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Threat Distribution */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Threat Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={threatTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {threatTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Threats Table */}
        <Card className="bg-card/50 border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentThreats.map((threat) => (
                  <TableRow key={threat.id}>
                    <TableCell className="font-medium">{threat.type}</TableCell>
                    <TableCell className="font-mono text-sm">{threat.url}</TableCell>
                    <TableCell>
                      <Badge variant={threat.severity === "Critical" ? "destructive" : threat.severity === "High" ? "destructive" : "secondary"}>
                        {threat.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={threat.status === "Blocked" ? "default" : "outline"}>
                        {threat.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{threat.time}</TableCell>
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
