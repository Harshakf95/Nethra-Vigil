import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Bell, CheckCircle, XCircle, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertModal } from "@/components/AlertModal";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialAlerts = [
  {
    id: 1,
    type: "Critical Threat",
    title: "DDoS Attack Detected",
    description: "Large-scale DDoS attack targeting server infrastructure",
    severity: "Critical",
    status: "Active",
    time: "2 minutes ago",
    source: "Network Monitor",
    affected: "Server-01, Server-02"
  },
  {
    id: 2,
    type: "Security Breach",
    title: "Unauthorized Access Attempt",
    description: "Multiple failed login attempts from suspicious IP",
    severity: "High",
    status: "Investigating",
    time: "5 minutes ago",
    source: "Authentication System",
    affected: "Admin Panel"
  },
  {
    id: 3,
    type: "Malware Detection",
    title: "Trojan Horse Identified",
    description: "Malicious file detected in network traffic",
    severity: "High",
    status: "Quarantined",
    time: "12 minutes ago",
    source: "Web Scanner",
    affected: "Workstation-15"
  },
  {
    id: 4,
    type: "Policy Violation",
    title: "Data Transfer Anomaly",
    description: "Unusual data transfer pattern detected",
    severity: "Medium",
    status: "Monitoring",
    time: "18 minutes ago",
    source: "Data Loss Prevention",
    affected: "Database Server"
  },
  {
    id: 5,
    type: "System Alert",
    title: "High CPU Usage",
    description: "CPU usage exceeded 90% threshold",
    severity: "Low",
    status: "Resolved",
    time: "25 minutes ago",
    source: "System Monitor",
    affected: "Web Server"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical": return "destructive";
    case "High": return "destructive";
    case "Medium": return "secondary";
    case "Low": return "outline";
    default: return "outline";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Active": return <AlertTriangle className="h-4 w-4 text-red-400" />;
    case "Investigating": return <Clock className="h-4 w-4 text-yellow-400" />;
    case "Resolved": return <CheckCircle className="h-4 w-4 text-green-400" />;
    case "Quarantined": return <XCircle className="h-4 w-4 text-orange-400" />;
    default: return <Bell className="h-4 w-4 text-blue-400" />;
  }
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [modalMode, setModalMode] = useState<'view' | 'respond'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate new alerts occasionally
      if (Math.random() < 0.1) {
        const newAlert = {
          id: Date.now(),
          type: "New Threat",
          title: "Suspicious Activity Detected",
          description: "Anomalous network behavior identified",
          severity: Math.random() > 0.5 ? "Medium" : "Low",
          status: "Active",
          time: "Just now",
          source: "AI Monitor",
          affected: "Network-Gateway"
        };
        setAlerts(prev => [newAlert, ...prev]);
        toast({
          title: "New Alert",
          description: newAlert.title,
          variant: "destructive",
        });
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  const handleMarkAllAsRead = () => {
    toast({
      title: "Alerts Marked as Read",
      description: "All alerts have been marked as read.",
    });
  };

  const handleViewAlert = (alert: any) => {
    setSelectedAlert(alert);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleRespondToAlert = (alert: any) => {
    setSelectedAlert(alert);
    setModalMode('respond');
    setIsModalOpen(true);
  };

  const criticalCount = alerts.filter(a => a.severity === "Critical").length;
  const highCount = alerts.filter(a => a.severity === "High").length;
  const mediumCount = alerts.filter(a => a.severity === "Medium").length;
  const resolvedCount = alerts.filter(a => a.status === "Resolved").length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Security Alerts</h1>
            <p className="text-muted-foreground">Monitor and manage security incidents and notifications</p>
            <p className="text-xs text-muted-foreground mt-1">Last updated: {lastUpdate.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Real-time Alerts</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              Mark All as Read
            </Button>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-red-500/10 border-red-500/20 threat-glow-critical">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{criticalCount}</div>
              <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/20 threat-glow-high">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{highCount}</div>
              <p className="text-xs text-muted-foreground">Active investigations</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/20 threat-glow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medium Priority</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mediumCount}</div>
              <p className="text-xs text-muted-foreground">Monitoring progress</p>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20 threat-glow-low">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{resolvedCount}</div>
              <p className="text-xs text-muted-foreground">Successfully handled</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Table */}
        <Card className="bg-card/50 border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Affected</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id} className={alert.severity === "Critical" ? "bg-red-500/5" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(alert.status)}
                        <span className="text-sm">{alert.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-muted-foreground">{alert.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{alert.source}</TableCell>
                    <TableCell className="text-sm font-mono">{alert.affected}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{alert.time}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewAlert(alert)}
                        >
                          View
                        </Button>
                        {alert.status === "Active" && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleRespondToAlert(alert)}
                          >
                            Respond
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AlertModal
          alert={selectedAlert}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
        />
      </div>
    </DashboardLayout>
  );
}
