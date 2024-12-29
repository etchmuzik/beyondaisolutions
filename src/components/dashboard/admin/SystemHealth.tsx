import { Server, Database, Globe, Shield } from 'lucide-react';
import { useSystemHealth } from '../../../hooks/useSystemHealth';

export function SystemHealth() {
  const { metrics } = useSystemHealth();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">System Health</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="text-foreground font-medium">Server Status</p>
              <p className="text-sm text-foreground/70">Response Time: {metrics.responseTime}ms</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
            Operational
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-primary" />
            <div>
              <p className="text-foreground font-medium">Database Health</p>
              <p className="text-sm text-foreground/70">Query Time: {metrics.queryTime}ms</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
            Healthy
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <p className="text-foreground font-medium">API Status</p>
              <p className="text-sm text-foreground/70">Uptime: {metrics.uptime}%</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
            Available
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="text-foreground font-medium">Security Status</p>
              <p className="text-sm text-foreground/70">Last Scan: {metrics.lastSecurityScan}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
            Secure
          </span>
        </div>
      </div>
    </div>
  );
}