import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  TrendingUp, 
  Settings, 
  Play, 
  Pause,
  BarChart3,
  Clock,
  Target,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

// Mock strategy data
const strategies = [
  {
    id: 1,
    name: "Scalper Pro",
    type: "Scalping",
    status: "active",
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY"],
    timeframes: ["M1", "M5"],
    winRate: 68.5,
    totalTrades: 1247,
    profit: 2847.50,
    maxDrawdown: 8.2
  },
  {
    id: 2,
    name: "Trend Follower",
    type: "Trend Following",
    status: "paused",
    pairs: ["EUR/USD", "GBP/JPY", "AUD/USD"],
    timeframes: ["H1", "H4"],
    winRate: 58.3,
    totalTrades: 432,
    profit: 1654.80,
    maxDrawdown: 12.5
  },
  {
    id: 3,
    name: "Range Master",
    type: "Range Trading",
    status: "active",
    pairs: ["USD/CHF", "EUR/GBP"],
    timeframes: ["M15", "M30"],
    winRate: 71.2,
    totalTrades: 892,
    profit: 3421.90,
    maxDrawdown: 6.8
  }
];

const Strategies = () => {
  const [activeStrategy, setActiveStrategy] = useState(strategies[0]);
  const [riskLevel, setRiskLevel] = useState([2]);
  const [lotSize, setLotSize] = useState([0.1]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success text-success-foreground">Activa</Badge>;
      case 'paused':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">Pausada</Badge>;
      case 'stopped':
        return <Badge variant="destructive">Detenida</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración de Estrategias</h1>
          <p className="text-muted-foreground">
            Gestiona y optimiza las estrategias de trading del bot
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configuración Avanzada
          </Button>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
            <TrendingUp className="w-4 h-4 mr-2" />
            Nueva Estrategia
          </Button>
        </div>
      </div>

      {/* Strategy Performance Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estrategias Activas</p>
              <p className="text-2xl font-bold text-success">
                {strategies.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Win Rate Promedio</p>
              <p className="text-2xl font-bold text-foreground">
                {(strategies.reduce((sum, s) => sum + s.winRate, 0) / strategies.length).toFixed(1)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profit Total</p>
              <p className="text-2xl font-bold text-success">
                ${strategies.reduce((sum, s) => sum + s.profit, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <p className="text-2xl font-bold text-warning">
                {Math.max(...strategies.map(s => s.maxDrawdown)).toFixed(1)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Strategy Configuration */}
      <Tabs defaultValue="strategies" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="strategies">Estrategias</TabsTrigger>
          <TabsTrigger value="otc">OTC Avanzado</TabsTrigger>
          <TabsTrigger value="timeframes">Timeframes</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Strategy List */}
            <div className="lg:col-span-2 space-y-4">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{strategy.name}</h3>
                        {getStatusBadge(strategy.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{strategy.type}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Pares: {strategy.pairs.join(", ")}
                        </span>
                        <span className="text-muted-foreground">
                          TF: {strategy.timeframes.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveStrategy(strategy)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant={strategy.status === 'active' ? 'destructive' : 'default'}
                        size="sm"
                        className={strategy.status !== 'active' ? 'bg-success hover:bg-success/90' : ''}
                      >
                        {strategy.status === 'active' ? 
                          <Pause className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                      </Button>
                    </div>
                  </div>

                  {/* Strategy Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="text-lg font-bold text-success">{strategy.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Trades</p>
                      <p className="text-lg font-bold text-foreground">{strategy.totalTrades}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profit</p>
                      <p className="text-lg font-bold text-success">${strategy.profit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Max DD</p>
                      <p className="text-lg font-bold text-warning">{strategy.maxDrawdown}%</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Strategy Configuration Panel */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configuración: {activeStrategy.name}</h3>
              
              <div className="space-y-6">
                {/* Risk Management */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Gestión de Riesgo</Label>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs">Riesgo por trade (%)</Label>
                        <span className="text-xs text-muted-foreground">{riskLevel[0]}%</span>
                      </div>
                      <Slider
                        value={riskLevel}
                        onValueChange={setRiskLevel}
                        max={5}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs">Tamaño de lote</Label>
                        <span className="text-xs text-muted-foreground">{lotSize[0]}</span>
                      </div>
                      <Slider
                        value={lotSize}
                        onValueChange={setLotSize}
                        max={2}
                        min={0.01}
                        step={0.01}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Trading Hours */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Horarios de Trading</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label className="text-xs">Inicio</Label>
                      <Input type="time" defaultValue="08:00" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Fin</Label>
                      <Input type="time" defaultValue="18:00" />
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Opciones Avanzadas</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Trading automático</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Stop Loss dinámico</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Take Profit múltiple</Label>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                  Guardar Configuración
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="otc" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración OTC Avanzada</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Instrumentos OTC</Label>
                  <div className="space-y-2">
                    {['EURUSD-OTC', 'GBPUSD-OTC', 'USDJPY-OTC', 'AUDUSD-OTC'].map((pair) => (
                      <div key={pair} className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm font-medium">{pair}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Configuración de Volatilidad</Label>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Filtro de volatilidad mínima (%)</Label>
                      <Input type="number" defaultValue="0.5" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Filtro de volatilidad máxima (%)</Label>
                      <Input type="number" defaultValue="3.0" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Periodo de análisis (minutos)</Label>
                      <Input type="number" defaultValue="15" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="timeframes" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración de Timeframes</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label className="text-sm font-medium mb-3 block">Timeframes Disponibles</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1', 'MN'].map((tf) => (
                    <div key={tf} className="flex items-center justify-center p-3 rounded-lg border cursor-pointer hover:bg-accent">
                      <span className="text-sm font-medium">{tf}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Configuración por Timeframe</Label>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Timeframe principal</Label>
                      <Input defaultValue="M5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Timeframe secundario</Label>
                      <Input defaultValue="M15" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Confirmación en timeframe superior</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración de Alertas</h3>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium">Trade Exitoso</p>
                        <p className="text-xs text-muted-foreground">Notificar cuando se cierre en profit</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-danger" />
                      <div>
                        <p className="font-medium">Trade en Pérdida</p>
                        <p className="text-xs text-muted-foreground">Notificar cuando se cierre en loss</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-warning" />
                      <div>
                        <p className="font-medium">Conexión Perdida</p>
                        <p className="text-xs text-muted-foreground">Notificar problemas de conexión</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Canales de Notificación</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Email</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Telegram</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Discord</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">SMS</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Email para alertas</Label>
                    <Input type="email" placeholder="usuario@ejemplo.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Chat ID Telegram</Label>
                    <Input placeholder="123456789" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                  Guardar Configuración
                </Button>
                <Button variant="outline">
                  Probar Alertas
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Strategies;