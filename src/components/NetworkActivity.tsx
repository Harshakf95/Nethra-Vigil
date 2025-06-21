
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function NetworkActivity() {
  return (
    <Card className="bg-card/50 border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Network Activity Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-background/30 rounded-lg border border-border/30 overflow-hidden">
          {/* Simulated network visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-8 gap-4 p-8">
              {/* Server nodes */}
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              
              {/* Router nodes */}
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              
              {/* Threat nodes */}
              <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              
              {/* Client nodes */}
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
              
              {/* Additional nodes */}
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Connection lines simulation */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#connectionGradient)" strokeWidth="1" />
            <line x1="30%" y1="20%" x2="70%" y2="80%" stroke="url(#connectionGradient)" strokeWidth="1" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="1" />
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-muted-foreground">Server</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-muted-foreground">Client</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-muted-foreground">Threat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-muted-foreground">Router</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
