import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Eye,
  DollarSign,
  Percent,
  Target,
  AlertTriangle
} from "lucide-react";

// Mock data for reports
const performanceData = {
  totalTrades: 1247,
  winningTrades: 854,
  losingTrades: 393,
  winRate: 68.5,
  totalProfit: 12847.52,
  totalLoss: -4234.18,
  netProfit: 8613.34,
  maxDrawdown: 12.4,
  profitFactor: 3.04,
  averageWin: 15.04,
  averageLoss: -10.77,
  largestWin: 245.80,
  largestLoss: -89.50
};

const recentTrades = [
  { id: 1, pair: "EUR/USD", type: "BUY", entry: 1.0854, exit: 1.0872, profit: 45.60, date: "2024-01-15 14:23", status: "win" },
  { id: 2, pair: "GBP/JPY", type: "SELL", entry: 186.42, exit: 186.58, profit: -32.80, date: "2024-01-15 14:18", status: "loss" },
  { id: 3, pair: "USD/CHF", type: "BUY", entry: 0.8934, exit: 0.8951, profit: 23.40, date: "2024-01-15 14:12", status: "win" },
  { id: 4, pair: "AUD/USD", type: "SELL", entry: 0.6742, exit: 0.6731, profit: 67.80, date: "2024-01-15 14:05", status: "win" },
  { id: 5, pair: "NZD/CAD", type: "BUY", entry: 0.8456, exit: 0.8448, profit: -18.90, date: "2024-01-15 13:58", status: "loss" }
];

const Reports = () => {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-01-15");
  const [selectedPair, setSelectedPair] = useState("all");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes y Análisis</h1>
          <p className="text-muted-foreground">
            Análisis detallado del rendimiento del bot de trading
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Fecha Inicio</Label>
              <Input 
                id="dateFrom" 
                type="date" 
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">Fecha Fin</Label>
              <Input 
                id="dateTo" 
                type="date" 
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pair">Par de Divisas</Label>
              <select 
                id="pair" 
                className="w-full p-2 border rounded-md bg-background"
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
              >
                <option value="all">Todos los pares</option>
                <option value="EURUSD">EUR/USD</option>
                <option value="GBPJPY">GBP/JPY</option>
                <option value="USDCHF">USD/CHF</option>
                <option value="AUDUSD">AUD/USD</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="strategy">Estrategia</Label>
              <select id="strategy" className="w-full p-2 border rounded-md bg-background">
                <option value="all">Todas las estrategias</option>
                <option value="scalper">Scalper Pro</option>
                <option value="trend">Trend Follower</option>
                <option value="range">Range Master</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                <Eye className="w-4 h-4 mr-2" />
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profit Neto</p>
              <p className="text-2xl font-bold text-success">${performanceData.netProfit.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total trades: {performanceData.totalTrades}</p>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold text-foreground">{performanceData.winRate}%</p>
              <p className="text-xs text-muted-foreground">{performanceData.winningTrades}/{performanceData.totalTrades} trades</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profit Factor</p>
              <p className="text-2xl font-bold text-success">{performanceData.profitFactor}</p>
              <p className="text-xs text-muted-foreground">Ganancia/Pérdida ratio</p>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <p className="text-2xl font-bold text-warning">{performanceData.maxDrawdown}%</p>
              <p className="text-xs text-muted-foreground">Pérdida máxima</p>
            </div>
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Reports Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="trades">Historial</TabsTrigger>
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Performance Chart Placeholder */}
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Curva de Equity</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Diario</Button>
                  <Button variant="outline" size="sm">Semanal</Button>
                  <Button variant="default" size="sm">Mensual</Button>
                </div>
              </div>
              
              {/* Placeholder for chart */}
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Gráfico de rendimiento</p>
                  <p className="text-xs text-muted-foreground">Integración con librerías de gráficos pendiente</p>
                </div>
              </div>
            </Card>

            {/* Statistics Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Estadísticas Detalladas</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trades ganadores:</span>
                    <span className="font-medium text-success">{performanceData.winningTrades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trades perdedores:</span>
                    <span className="font-medium text-danger">{performanceData.losingTrades}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{width: `${performanceData.winRate}%`}}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ganancia promedio:</span>
                    <span className="font-medium text-success">${performanceData.averageWin}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pérdida promedio:</span>
                    <span className="font-medium text-danger">${performanceData.averageLoss}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mayor ganancia:</span>
                    <span className="font-medium text-success">${performanceData.largestWin}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mayor pérdida:</span>
                    <span className="font-medium text-danger">${performanceData.largestLoss}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Profit total:</span>
                    <span className="font-medium text-success">${performanceData.totalProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pérdida total:</span>
                    <span className="font-medium text-danger">${performanceData.totalLoss.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-1 border-t">
                    <span>Profit neto:</span>
                    <span className="text-success">${performanceData.netProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Historial de Trades</h3>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {recentTrades.length} trades recientes
              </Badge>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Par</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Entrada</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Salida</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">P&L</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Fecha</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((trade) => (
                    <tr key={trade.id} className="border-b hover:bg-muted/30">
                      <td className="p-2 font-medium">{trade.pair}</td>
                      <td className="p-2">
                        <Badge 
                          variant={trade.type === "BUY" ? "default" : "secondary"}
                          className={trade.type === "BUY" ? "bg-success text-success-foreground" : "bg-danger text-danger-foreground"}
                        >
                          {trade.type}
                        </Badge>
                      </td>
                      <td className="p-2 text-sm">{trade.entry}</td>
                      <td className="p-2 text-sm">{trade.exit}</td>
                      <td className="p-2">
                        <span className={`font-medium ${trade.profit > 0 ? 'text-success' : 'text-danger'}`}>
                          ${trade.profit > 0 ? '+' : ''}{trade.profit}
                        </span>
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">{trade.date}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          {trade.status === 'win' ? 
                            <TrendingUp className="w-4 h-4 text-success" /> : 
                            <TrendingDown className="w-4 h-4 text-danger" />
                          }
                          <span className={`text-xs ${trade.status === 'win' ? 'text-success' : 'text-danger'}`}>
                            {trade.status === 'win' ? 'Win' : 'Loss'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Análisis por Pares</h3>
              <div className="space-y-3">
                {[
                  { pair: "EUR/USD", trades: 342, winRate: 72.1, profit: 2847.50 },
                  { pair: "GBP/JPY", trades: 287, winRate: 65.2, profit: 1932.80 },
                  { pair: "USD/CHF", trades: 234, winRate: 68.8, profit: 1654.20 },
                  { pair: "AUD/USD", trades: 198, winRate: 71.2, profit: 1423.60 }
                ].map((item) => (
                  <div key={item.pair} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{item.pair}</p>
                      <p className="text-xs text-muted-foreground">{item.trades} trades</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.winRate}% WR</p>
                      <p className="text-xs text-success">${item.profit.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">performance por Horarios</h3>
              <div className="space-y-3">
                {[
                  { time: "08:00-12:00", trades: 156, winRate: 74.4, profit: 1247.30 },
                  { time: "12:00-16:00", trades: 198, winRate: 68.7, profit: 1654.80 },
                  { time: "16:00-20:00", trades: 234, winRate: 71.2, profit: 1932.50 },
                  { time: "20:00-00:00", trades: 89, winRate: 62.9, profit: 634.70 }
                ].map((item) => (
                  <div key={item.time} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{item.time}</p>
                      <p className="text-xs text-muted-foreground">{item.trades} trades</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.winRate}% WR</p>
                      <p className="text-xs text-success">${item.profit.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Logs del Sistema</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Filtrar por fecha
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar logs
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[
                { time: "2024-01-15 14:23:45", level: "INFO", message: "Trade ejecutado exitosamente: EUR/USD BUY 0.5 lots", type: "info" },
                { time: "2024-01-15 14:23:12", level: "INFO", message: "Señal detectada: EUR/USD - Condiciones favorables para BUY", type: "info" },
                { time: "2024-01-15 14:22:58", level: "WARN", message: "Latencia alta detectada en broker MT5: 45ms", type: "warning" },
                { time: "2024-01-15 14:22:45", level: "INFO", message: "Conexión restablecida con broker OANDA", type: "info" },
                { time: "2024-01-15 14:22:30", level: "ERROR", message: "Error de conexión temporal con broker OANDA", type: "error" },
                { time: "2024-01-15 14:22:15", level: "INFO", message: "Stop Loss alcanzado: GBP/JPY SELL - Pérdida: -32.80", type: "info" },
                { time: "2024-01-15 14:21:58", level: "INFO", message: "Take Profit alcanzado: USD/CHF BUY - Ganancia: +23.40", type: "success" },
                { time: "2024-01-15 14:21:42", level: "INFO", message: "Sistema iniciado - Todas las estrategias activas", type: "info" }
              ].map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    log.type === 'error' ? 'bg-danger' :
                    log.type === 'warning' ? 'bg-warning' :
                    log.type === 'success' ? 'bg-success' : 'bg-primary'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          log.level === 'ERROR' ? 'border-danger text-danger' :
                          log.level === 'WARN' ? 'border-warning text-warning' :
                          'border-primary text-primary'
                        }`}
                      >
                        {log.level}
                      </Badge>
                    </div>
                    <p className="text-sm">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;