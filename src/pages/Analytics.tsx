import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";

const threatTrendData = [
  { date: "2024-01-01", total: 45, web: 28, network: 17 },
  { date: "2024-01-02", total: 52, web: 32, network: 20 },
  { date: "2024-01-03", total: 38, web: 24, network: 14 },
  { date: "2024-01-04", total: 65, web: 40, network: 25 },
  { date: "2024-01-05", total: 48, web: 30, network: 18 },
  { date: "2024-01-06", total: 71, web: 45, network: 26 },
  { date: "2024-01-07", total: 43, web: 26, network: 17 },
];

const hourlyData = [
  { hour: "00", incidents: 8, resolved: 7 },
  { hour: "04", incidents: 12, resolved: 10 },
  { hour: "08", incidents: 25, resolved: 22 },
  { hour: "12", incidents: 18, resolved: 15 },
  { hour: "16", incidents: 32, resolved: 28 },
  { hour: "20", incidents: 15, resolved: 13 },
];

const riskCategories = [
  { name: "Critical", value: 15, color: "#ef4444" },
  { name: "High", value: 28, color: "#f97316" },
  { name: "Medium", value: 35, color: "#eab308" },
  { name: "Low", value: 22, color: "#10b981" },
];

const performanceMetrics = [
  { metric: "Detection Rate", current: 94.2, previous: 91.8, trend: "up" },
  { metric: "Response Time", current: 2.3, previous: 2.8, trend: "down", unit: "min" },
  { metric: "False Positives", current: 3.1, previous: 4.2, trend: "down", unit: "%" },
  { metric: "System Uptime", current: 99.97, previous: 99.94, trend: "up", unit: "%" },
];

const chartConfig = {
  total: { label: "Total Threats", color: "#ef4444" },
  web: { label: "Web Threats", color: "#3b82f6" },
  network: { label: "Network Threats", color: "#10b981" },
};

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Comprehensive threat intelligence and performance analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Advanced Analytics</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="bg-card/50 border border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metric.current}{metric.unit || "%"}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className={metric.trend === "up" ? "text-green-400" : "text-red-400"}>
                    {metric.trend === "up" ? "+" : "-"}
                    {Math.abs(metric.current - metric.previous).toFixed(1)}
                    {metric.unit || "%"}
                  </span>
                  <span className="text-muted-foreground">from last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Threat Trends */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">7-Day Threat Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={threatTrendData}>
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="web"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="network"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Risk Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {riskCategories.map((entry, index) => (
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

        {/* Hourly Analysis */}
        <Card className="bg-card/50 border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">24-Hour Incident Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
                  <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-500/10 border-blue-500/20 glow-effect">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Threat Intelligence Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Most Active Hour:</span>
                <Badge variant="outline">16:00 - 17:00</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peak Threat Day:</span>
                <Badge variant="outline">Saturday</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Common Attack Vector:</span>
                <Badge variant="destructive">Web Applications</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20 threat-glow-low">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Security Improvements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Detection Accuracy:</span>
                <Badge variant="default">+2.4%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Response Time:</span>
                <Badge variant="default">-18%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">False Positives:</span>
                <Badge variant="default">-26%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                Predictive Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Risk Forecast:</span>
                <Badge variant="outline">Moderate</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Next Peak:</span>
                <Badge variant="outline">Tomorrow 4PM</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Trend:</span>
                <Badge variant="default">Improving</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
