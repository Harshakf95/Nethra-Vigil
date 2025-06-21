import { DashboardLayout } from "@/components/DashboardLayout";
import { ThreatOverview } from "@/components/ThreatOverview";
import { ThreatSeverityBreakdown } from "@/components/ThreatSeverityBreakdown";
import { SystemMetrics } from "@/components/SystemMetrics";
import { ThreatScore } from "@/components/ThreatScore";
import { NetworkActivity } from "@/components/NetworkActivity";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Threat Overview Cards */}
        <ThreatOverview />
        
        {/* Threat Severity Breakdown */}
        <ThreatSeverityBreakdown />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* System Metrics */}
          <div className="xl:col-span-2">
            <SystemMetrics />
          </div>
          
          {/* Threat Score */}
          <div className="xl:col-span-1">
            <ThreatScore />
          </div>
        </div>
        
        {/* Network Activity Map */}
        <NetworkActivity />
      </div>
    </DashboardLayout>
  );
};

export default Index;
