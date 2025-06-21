
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, CheckCircle, XCircle, User, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  type: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  time: string;
  source: string;
  affected: string;
}

interface AlertModalProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'respond';
}

export function AlertModal({ alert, isOpen, onClose, mode }: AlertModalProps) {
  const [response, setResponse] = useState("");
  const [responseAction, setResponseAction] = useState("");
  const { toast } = useToast();

  if (!alert) return null;

  const handleSubmitResponse = () => {
    toast({
      title: "Response Submitted",
      description: `Your response to "${alert.title}" has been recorded.`,
    });
    setResponse("");
    setResponseAction("");
    onClose();
  };

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
      default: return <AlertTriangle className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(alert.status)}
            {mode === 'view' ? 'Alert Details' : 'Respond to Alert'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Overview */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-card/30 rounded-lg border border-border/50">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{alert.title}</h3>
              <p className="text-muted-foreground">{alert.description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Severity:</span>
                <Badge variant={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <span className="text-sm">{alert.status}</span>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Detection Time</p>
                  <p className="text-sm text-muted-foreground">{alert.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Source</p>
                  <p className="text-sm text-muted-foreground">{alert.source}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Affected Systems</p>
                  <p className="text-sm text-muted-foreground">{alert.affected}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Alert Type</p>
                  <p className="text-sm text-muted-foreground">{alert.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Response Section (only for respond mode) */}
          {mode === 'respond' && (
            <div className="space-y-4 p-4 bg-card/30 rounded-lg border border-border/50">
              <h4 className="font-semibold">Response Actions</h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Response Type</label>
                <Select value={responseAction} onValueChange={setResponseAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select response action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investigate">Investigate Further</SelectItem>
                    <SelectItem value="quarantine">Quarantine Threat</SelectItem>
                    <SelectItem value="block">Block Source</SelectItem>
                    <SelectItem value="monitor">Continue Monitoring</SelectItem>
                    <SelectItem value="escalate">Escalate to Security Team</SelectItem>
                    <SelectItem value="resolve">Mark as Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Response Notes</label>
                <Textarea
                  placeholder="Describe the actions taken or investigation findings..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Timeline/History */}
          <div className="space-y-4">
            <h4 className="font-semibold">Alert Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-card/20 rounded-lg">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Alert Generated</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                  <p className="text-sm text-muted-foreground mt-1">Initial threat detection by {alert.source}</p>
                </div>
              </div>
              
              {alert.status !== "Active" && (
                <div className="flex items-start gap-3 p-3 bg-card/20 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Status Updated</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    <p className="text-sm text-muted-foreground mt-1">Alert status changed to {alert.status}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" onClick={onClose}>
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {mode === 'respond' && (
              <Button 
                onClick={handleSubmitResponse}
                disabled={!responseAction || !response}
              >
                Submit Response
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
