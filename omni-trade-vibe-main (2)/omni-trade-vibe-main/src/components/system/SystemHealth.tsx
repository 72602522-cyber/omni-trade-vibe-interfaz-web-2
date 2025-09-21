import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Clock,
  Activity,
  Server
} from "lucide-react";

interface SystemHealthProps {
  metrics?: {
    cpu: number;
    memory: number;
    disk: number;
    latency: number;
    uptime: string;
    connections: number;
    maxConnections: number;
  };
}

export function SystemHealth({ metrics }: SystemHealthProps) {
  // Datos mock para demo - reemplazar con datos reales del backend
  const defaultMetrics = {
    cpu: 34,
    memory: 68,
    disk: 45,
    latency: 15,
    uptime: "7d 14h 23m",
    connections: 8,
    maxConnections: 30
  };

  const data = metrics || defaultMetrics;

  const getHealthStatus = (value: number, thresholds = { good: 50, warning: 80 }) => {
    if (value <= thresholds.good) return { status: 'success', label: 'Óptimo' };
    if (value <= thresholds.warning) return { status: 'warning', label: 'Moderado' };
    return { status: 'danger', label: 'Alto' };
  };

  const cpuHealth = getHealthStatus(data.cpu);
  const memoryHealth = getHealthStatus(data.memory);
  const diskHealth = getHealthStatus(data.disk);
  const latencyHealth = getHealthStatus(data.latency, { good: 20, warning: 50 });

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Estado del Sistema</h3>
        <Badge variant="secondary" className="ml-auto bg-success/20 text-success">
          Online
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* CPU Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">CPU</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{data.cpu}%</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  cpuHealth.status === 'success' ? 'border-success text-success' :
                  cpuHealth.status === 'warning' ? 'border-warning text-warning' :
                  'border-danger text-danger'
                }`}
              >
                {cpuHealth.label}
              </Badge>
            </div>
          </div>
          <Progress 
            value={data.cpu} 
            className={`h-2 ${
              cpuHealth.status === 'success' ? '[&>div]:bg-success' :
              cpuHealth.status === 'warning' ? '[&>div]:bg-warning' :
              '[&>div]:bg-danger'
            }`}
          />
        </div>

        {/* Memory Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">RAM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{data.memory}%</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  memoryHealth.status === 'success' ? 'border-success text-success' :
                  memoryHealth.status === 'warning' ? 'border-warning text-warning' :
                  'border-danger text-danger'
                }`}
              >
                {memoryHealth.label}
              </Badge>
            </div>
          </div>
          <Progress 
            value={data.memory} 
            className={`h-2 ${
              memoryHealth.status === 'success' ? '[&>div]:bg-success' :
              memoryHealth.status === 'warning' ? '[&>div]:bg-warning' :
              '[&>div]:bg-danger'
            }`}
          />
        </div>

        {/* Disk Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Disco</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{data.disk}%</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  diskHealth.status === 'success' ? 'border-success text-success' :
                  diskHealth.status === 'warning' ? 'border-warning text-warning' :
                  'border-danger text-danger'
                }`}
              >
                {diskHealth.label}
              </Badge>
            </div>
          </div>
          <Progress 
            value={data.disk} 
            className={`h-2 ${
              diskHealth.status === 'success' ? '[&>div]:bg-success' :
              diskHealth.status === 'warning' ? '[&>div]:bg-warning' :
              '[&>div]:bg-danger'
            }`}
          />
        </div>

        {/* Network Latency */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Latencia</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{data.latency}ms</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  latencyHealth.status === 'success' ? 'border-success text-success' :
                  latencyHealth.status === 'warning' ? 'border-warning text-warning' :
                  'border-danger text-danger'
                }`}
              >
                {latencyHealth.label}
              </Badge>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Tiempo promedio de respuesta
          </div>
        </div>
      </div>

      {/* Additional System Info */}
      <div className="grid gap-4 mt-4 pt-4 border-t md:grid-cols-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-success" />
          <div>
            <p className="text-xs text-muted-foreground">Tiempo Online</p>
            <p className="text-sm font-medium">{data.uptime}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Conexiones</p>
            <p className="text-sm font-medium">
              {data.connections}/{data.maxConnections}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-warning" />
          <div>
            <p className="text-xs text-muted-foreground">Threads Activos</p>
            <p className="text-sm font-medium">12/24</p>
          </div>
        </div>
      </div>
    </Card>
  );
}