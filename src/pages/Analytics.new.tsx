import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Activity, AlertCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";
import { threatApi, type ThreatData, type HourlyData, type RiskCategory, type PerformanceMetrics } from "@/lib/threatApi";

const chartConfig = {
  total: { label: "Total Threats", color: "#ef4444" },
  web: { label: "Web Threats", color: "#3b82f6" },
  network: { label: "Network Threats", color: "#10b981" },
};

export default function Analytics() {
  const [threatTrendData, setThreatTrendData] = useState<ThreatData[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [riskCategories, setRiskCategories] = useState<RiskCategory[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics[]>([]);
  const [loading, setLoading] = useState({
    trends: true,
    hourly: true,
    risks: true,
    metrics: true
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch threat trends
        const trendsResponse = await threatApi.getThreatTrends(7);
        if (trendsResponse.success && trendsResponse.data) {
          setThreatTrendData(trendsResponse.data);
        } else {
          throw new Error(trendsResponse.error || 'Failed to load threat trends');
        }
        setLoading(prev => ({ ...prev, trends: false }));

        // Fetch hourly data
        const hourlyResponse = await threatApi.getHourlyData();
        if (hourlyResponse.success && hourlyResponse.data) {
          setHourlyData(hourlyResponse.data);
        }
        setLoading(prev => ({ ...prev, hourly: false }));

        // Fetch risk distribution
        const risksResponse = await threatApi.getRiskDistribution();
        if (risksResponse.success && risksResponse.data) {
          setRiskCategories(risksResponse.data);
        }
        setLoading(prev => ({ ...prev, risks: false }));

        // Fetch performance metrics
        const metricsResponse = await threatApi.getPerformanceMetrics();
        if (metricsResponse.success && metricsResponse.data) {
          setPerformanceMetrics(metricsResponse.data);
        }
        setLoading(prev => ({ ...prev, metrics: false }));

      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data. Please try again later.');
        setLoading({
          trends: false,
          hourly: false,
          risks: false,
          metrics: false
        });
      }
    };

    fetchData();

    // Set up polling for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate loading state
  const isLoading = Object.values(loading).some(Boolean);

  // Render loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center space-y-4">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-foreground/70">Loading threat analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Render error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-destructive">Error Loading Analytics</h3>
              <p className="text-sm text-foreground/80">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
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
                  {metric.current.toFixed(metric.metric === 'System Uptime' ? 2 : 1)}{metric.unit || "%"}
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
          <Card className="bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">7-Day Threat Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={threatTrendData}>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                    />
                    <YAxis />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">
                                {new Date(payload[0].payload.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                              {payload.map((entry, i) => (
                                <div key={`item-${i}`} className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1">
                                    <div 
                                      className="w-2 h-2 rounded-full" 
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                      {chartConfig[entry.dataKey as keyof typeof chartConfig]?.label || entry.name}
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium">
                                    {entry.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
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
          <Card className="bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Risk Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {riskCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#020817" strokeWidth={1} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.name} Risk</p>
                              <p className="text-sm">
                                {data.value} threats ({Math.round((data.value / riskCategories.reduce((a, b) => a + b.value, 0)) * 100)}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Analysis */}
        <Card className="bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">24-Hour Incident Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(value) => `${value}:00`}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{label}:00 - {parseInt(label) + 4}:00</p>
                            {payload.map((entry, i) => (
                              <div key={`item-${i}`} className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1">
                                  <div 
                                    className="w-2 h-2 rounded-full" 
                                    style={{ backgroundColor: entry.color }}
                                  />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {entry.name}
                                  </span>
                                </div>
                                <span className="text-sm font-medium">
                                  {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="incidents" name="Incidents" fill="#ef4444" radius={[4, 4, 0, 0]}> 
                    {hourlyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill="#ef4444" 
                        fillOpacity={0.7}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {hourlyData.map((entry, index) => (
                      <Cell 
                        key={`cell-resolved-${index}`} 
                        fill="#10b981"
                        fillOpacity={0.7}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40 transition-colors">
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

          <Card className="bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-400" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Critical Alerts:</span>
                <Badge variant="destructive">5 New</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">High Priority:</span>
                <Badge variant="destructive">12 Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Requires Attention:</span>
                <Badge variant="outline">8 Items</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">System Status:</span>
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Operational</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Scan:</span>
                <Badge variant="outline">Just now</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Threats Blocked (24h):</span>
                <Badge variant="outline">1,284</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
