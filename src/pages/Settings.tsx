import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Shield, Bell, Eye, Lock, Network, Globe, AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [settings, setSettings] = useState({
    realTimeAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    threatDetection: true,
    autoBlock: false,
    sensitivityLevel: [75],
    scanInterval: "5",
    maxLogRetention: "30",
    twoFactorAuth: false,
    sessionTimeout: "30",
    ipWhitelist: "",
    apiAccess: false
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your security settings have been updated successfully.",
    });
  };

  const handleReset = () => {
    setSettings({
      realTimeAlerts: true,
      emailNotifications: true,
      pushNotifications: false,
      threatDetection: true,
      autoBlock: false,
      sensitivityLevel: [75],
      scanInterval: "5",
      maxLogRetention: "30",
      twoFactorAuth: false,
      sessionTimeout: "30",
      ipWhitelist: "",
      apiAccess: false
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Security Settings</h1>
            <p className="text-muted-foreground">Configure your cybersecurity monitoring and alert preferences</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alert & Notification Settings */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Alert & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Real-time Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive instant notifications for threats</p>
                </div>
                <Switch 
                  checked={settings.realTimeAlerts}
                  onCheckedChange={(checked) => setSettings({...settings, realTimeAlerts: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send alerts to your email</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Alert Sensitivity Level</Label>
                <Slider
                  value={settings.sensitivityLevel}
                  onValueChange={(value) => setSettings({...settings, sensitivityLevel: value})}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Low</span>
                  <span>{settings.sensitivityLevel[0]}%</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Threat Detection Settings */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Threat Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active Threat Scanning</Label>
                  <p className="text-sm text-muted-foreground">Continuous monitoring for threats</p>
                </div>
                <Switch 
                  checked={settings.threatDetection}
                  onCheckedChange={(checked) => setSettings({...settings, threatDetection: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-block Threats</Label>
                  <p className="text-sm text-muted-foreground">Automatically block detected threats</p>
                </div>
                <Switch 
                  checked={settings.autoBlock}
                  onCheckedChange={(checked) => setSettings({...settings, autoBlock: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label>Scan Interval (minutes)</Label>
                <Select value={settings.scanInterval} onValueChange={(value) => setSettings({...settings, scanInterval: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Log Retention (days)</Label>
                <Select value={settings.maxLogRetention} onValueChange={(value) => setSettings({...settings, maxLogRetention: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Enable 2FA for enhanced security</p>
                </div>
                <Switch 
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Select value={settings.sessionTimeout} onValueChange={(value) => setSettings({...settings, sessionTimeout: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>IP Whitelist</Label>
                <Input
                  placeholder="192.168.1.0/24, 10.0.0.0/8"
                  value={settings.ipWhitelist}
                  onChange={(e) => setSettings({...settings, ipWhitelist: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Comma-separated list of allowed IP ranges</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Access</Label>
                  <p className="text-sm text-muted-foreground">Allow external API connections</p>
                </div>
                <Switch 
                  checked={settings.apiAccess}
                  onCheckedChange={(checked) => setSettings({...settings, apiAccess: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-card/50 border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Threat Engine</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Monitor</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Running</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Web Scanner</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Maintenance</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Update</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
