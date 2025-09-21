import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MiniChart } from "@/components/charts/MiniChart";
import { SystemHealth } from "@/components/system/SystemHealth";
import { LazySection } from "@/components/lazy/LazySection";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users,
  Activity,
  Server,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  PieChart,
  Globe,
  Clock
} from "lucide-react";

// Trading Dashboard Main Page Component
const Dashboard = () => {
  // Mock data for charts - replace with real data from backend
  const balanceData = [5200, 5350, 5180, 5420, 5380, 5487, 5520];
  const pnlData = [120, 180, -45, 230, 156, 287, 345];
  const volumeData = [23, 45, 56, 78, 65, 89, 67];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Principal</h1>
          <p className="text-muted-foreground">
            Vista general del rendimiento del bot de trading
          </p>
        </div>
        
        {/* Bot Control Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="default" size="sm" className="bg-success hover:bg-success/90">
            <Play className="w-4 h-4 mr-2" />
            Iniciar Bot
          </Button>
          <Button variant="outline" size="sm">
            <Pause className="w-4 h-4 mr-2" />
            Pausar
          </Button>
        </div>
      </div>

      {/* Enhanced Status Cards with Mini Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Balance Total with Chart */}
        <Card className="p-6 shadow-trading border-0 bg-gradient-dashboard">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Balance Total</p>
              <p className="text-2xl font-bold text-success">$12,847.52</p>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-success" />
                +2.4% hoy
              </p>
            </div>
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
          </div>
          <MiniChart 
            data={balanceData} 
            title="Últimos 7 días" 
            type="area" 
            color="success"
            height={40}
          />
        </Card>

        {/* P&L Diario with Chart */}
        <Card className="p-6 shadow-trading border-0 bg-gradient-dashboard">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">P&L Diario</p>
              <p className="text-2xl font-bold text-success">+$287.45</p>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-success" />
                +1.8% desde ayer
              </p>
            </div>
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
          <MiniChart 
            data={pnlData} 
            title="P&L Semanal" 
            type="line" 
            color="success"
            height={40}
          />
        </Card>

        {/* Volumen de Trading */}
        <Card className="p-6 shadow-trading border-0 bg-gradient-dashboard">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Volumen Diario</p>
              <p className="text-2xl font-bold text-primary">$45,230</p>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <BarChart3 className="w-3 h-3 mr-1 text-primary" />
                67 operaciones
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
          </div>
          <MiniChart 
            data={volumeData} 
            title="Volumen por hora" 
            type="bar" 
            color="primary"
            height={40}
          />
        </Card>

        {/* Cuentas Activas */}
        <Card className="p-6 shadow-trading border-0 bg-gradient-dashboard">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cuentas Activas</p>
              <p className="text-2xl font-bold text-warning">8/30</p>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <Activity className="w-3 h-3 mr-1 text-warning" />
                27% capacidad
              </p>
            </div>
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-warning" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div className="bg-warning h-2 rounded-full" style={{width: "27%"}}></div>
            </div>
            <span className="text-xs text-muted-foreground">27%</span>
          </div>
        </Card>
      </div>

      {/* Enhanced Dashboard Sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Trades - Optimized */}
        <LazySection className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Operaciones Activas</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  5 activas
                </Badge>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualizar
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { pair: "EUR/USD", type: "BUY", size: "0.5", pnl: "+$23.45", status: "success", time: "14:23" },
                { pair: "GBP/JPY", type: "SELL", size: "0.3", pnl: "-$8.20", status: "danger", time: "14:18" },
                { pair: "AUD/CAD", type: "BUY", size: "0.8", pnl: "+$45.60", status: "success", time: "14:12" },
                { pair: "USD/CHF", type: "SELL", size: "0.4", pnl: "+$12.30", status: "success", time: "14:08" },
                { pair: "NZD/USD", type: "BUY", size: "0.6", pnl: "-$5.80", status: "danger", time: "14:05" },
              ].map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={trade.type === "BUY" ? "default" : "secondary"}
                      className={trade.type === "BUY" ? "bg-success text-success-foreground" : "bg-danger text-danger-foreground"}
                    >
                      {trade.type}
                    </Badge>
                    <div>
                      <p className="font-medium">{trade.pair}</p>
                      <p className="text-sm text-muted-foreground">
                        {trade.size} lots • {trade.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${trade.status === "success" ? "text-success" : "text-danger"}`}>
                      {trade.pnl}
                    </p>
                    {trade.status === "success" ? (
                      <TrendingUp className="w-3 h-3 text-success ml-auto" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-danger ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Total P&L: <span className="text-success font-medium">+$67.35</span>
              </div>
              <Button variant="outline" size="sm">
                Ver Todas las Operaciones
              </Button>
            </div>
          </Card>
        </LazySection>

        {/* System Health - Enhanced */}
        <LazySection>
          <SystemHealth />
        </LazySection>
      </div>

      {/* Additional Dashboard Widgets */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Market Overview */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Mercados</h3>
          </div>
          <div className="space-y-3">
            {[
              { pair: "EUR/USD", price: "1.0523", change: "+0.0012", percent: "+0.11%" },
              { pair: "GBP/USD", price: "1.2456", change: "-0.0023", percent: "-0.18%" },
              { pair: "USD/JPY", price: "149.85", change: "+1.25", percent: "+0.84%" },
              { pair: "AUD/USD", price: "0.6789", change: "+0.0045", percent: "+0.67%" },
            ].map((market, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{market.pair}</span>
                <div className="text-right">
                  <div className="font-mono text-sm">{market.price}</div>
                  <div className={`text-xs ${market.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                    {market.change} ({market.percent})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Signals */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold">Señales Recientes</h3>
          </div>
          <div className="space-y-3">
            {[
              { time: "14:23", signal: "BUY EUR/USD", strength: "Strong", executed: true },
              { time: "14:18", signal: "SELL GBP/JPY", strength: "Medium", executed: true },
              { time: "14:12", signal: "BUY AUD/CAD", strength: "Strong", executed: false },
              { time: "14:08", signal: "SELL USD/CHF", strength: "Weak", executed: false },
            ].map((signal, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{signal.time}</span>
                  <span className="font-medium">{signal.signal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      signal.strength === "Strong" ? "border-success text-success" :
                      signal.strength === "Medium" ? "border-warning text-warning" :
                      "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {signal.strength}
                  </Badge>
                  {signal.executed && (
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                      Ejecutada
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold">Rendimiento</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Win Rate</span>
                <span className="text-success font-medium">72%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{width: "72%"}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Profit Factor</span>
                <span className="text-success font-medium">1.84</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{width: "84%"}}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Ganancias</p>
                <p className="text-sm font-bold text-success">$2,347</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pérdidas</p>
                <p className="text-sm font-bold text-danger">-$1,275</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;