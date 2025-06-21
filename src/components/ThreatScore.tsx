
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

export function ThreatScore() {
  return (
    <Card className="bg-card/50 border border-border/50 threat-glow-low">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Threat Score
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="relative">
          <div className="text-6xl font-bold text-green-400">12</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-green-400/20"></div>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
          Low Threat Level
        </Badge>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>AI-powered risk assessment based on:</p>
          <ul className="text-xs space-y-1">
            <li>• Active threat patterns</li>
            <li>• Network anomalies</li>
            <li>• Historical data analysis</li>
            <li>• Real-time intelligence feeds</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
