import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedFilter } from "@/components/filters/AdvancedFilter";
import { usePerformance } from "@/hooks/use-performance";
import { 
  Plus, 
  Settings, 
  Wifi, 
  WifiOff, 
  TestTube,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Search
} from "lucide-react";

// Mock data for broker accounts
const mockAccounts = [
  {
    id: 1,
    broker: "MetaTrader 5",
    accountNumber: "12345678",
    accountType: "Real",
    balance: 5420.30,
    equity: 5487.65,
    margin: 234.50,
    freeMargin: 5253.15,
    connected: true,
    trading: true,
    status: "active"
  },
  {
    id: 2,
    broker: "Interactive Brokers",
    accountNumber: "DU98765432",
    accountType: "Demo",
    balance: 10000.00,
    equity: 10156.80,
    margin: 450.20,
    freeMargin: 9706.60,
    connected: true,
    trading: false,
    status: "connected"
  },
  {
    id: 3,
    broker: "OANDA",
    accountNumber: "001-004-1234567",
    accountType: "Real",
    balance: 2847.90,
    equity: 2834.15,
    margin: 180.75,
    freeMargin: 2653.40,
    connected: false,
    trading: false,
    status: "disconnected"
  },
  {
    id: 4,
    broker: "FXCM",
    accountNumber: "40123456",
    accountType: "Demo",
    balance: 50000.00,
    equity: 50234.70,
    margin: 1250.30,
    freeMargin: 48984.40,
    connected: true,
    trading: true,
    status: "active"
  }
];

const Accounts = () => {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Performance optimization hooks
  const { useAdvancedFilter, usePagination } = usePerformance();
  
  // Filter configuration for accounts
  const filterOptions = [
    { key: 'broker', label: 'Broker', type: 'select' as const, options: [
      { value: 'MetaTrader 5', label: 'MetaTrader 5' },
      { value: 'Interactive Brokers', label: 'Interactive Brokers' },
      { value: 'OANDA', label: 'OANDA' },
      { value: 'FXCM', label: 'FXCM' }
    ]},
    { key: 'accountType', label: 'Tipo', type: 'select' as const, options: [
      { value: 'Real', label: 'Real' },
      { value: 'Demo', label: 'Demo' }
    ]},
    { key: 'status', label: 'Estado', type: 'select' as const, options: [
      { value: 'active', label: 'Operando' },
      { value: 'connected', label: 'Conectado' },
      { value: 'disconnected', label: 'Desconectado' }
    ]},
    { key: 'balance', label: 'Balance', type: 'range' as const },
    { key: 'accountNumber', label: 'Número de Cuenta', type: 'text' as const }
  ];
  
  const { filteredData: filteredAccounts, filters, updateFilter, clearFilters } = useAdvancedFilter(accounts);
  const { paginatedData, currentPage, setCurrentPage, totalPages } = usePagination(filteredAccounts, 6);

  const toggleConnection = (accountId: number) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, connected: !account.connected, status: account.connected ? 'disconnected' : 'connected' }
        : account
    ));
  };

  const toggleTrading = (accountId: number) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, trading: !account.trading, status: account.trading ? 'connected' : 'active' }
        : account
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success text-success-foreground">Operando</Badge>;
      case 'connected':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">Conectado</Badge>;
      case 'disconnected':
        return <Badge variant="destructive" className="bg-danger text-danger-foreground">Desconectado</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const getStatusIcon = (status: string, connected: boolean) => {
    if (!connected) return <WifiOff className="w-4 h-4 text-danger" />;
    if (status === 'active') return <CheckCircle className="w-4 h-4 text-success" />;
    return <Clock className="w-4 h-4 text-warning" />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Cuentas</h1>
          <p className="text-muted-foreground">
            Administra hasta 30 cuentas de brokers simultáneamente
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Cuenta
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Cuentas</p>
              <p className="text-2xl font-bold text-foreground">{accounts.length}/30</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Conectadas</p>
              <p className="text-2xl font-bold text-success">
                {accounts.filter(acc => acc.connected).length}
              </p>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Operando</p>
              <p className="text-2xl font-bold text-success">
                {accounts.filter(acc => acc.trading).length}
              </p>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Balance Total</p>
              <p className="text-2xl font-bold text-foreground">
                ${accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accounts">Cuentas Activas</TabsTrigger>
          <TabsTrigger value="demo">Demo/Real</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          {/* Advanced Filters */}
          <AdvancedFilter
            filters={filterOptions}
            values={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
          />

          {/* Add Account Form */}
          {showAddForm && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Agregar Nueva Cuenta</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="broker">Broker</Label>
                  <Input id="broker" placeholder="Seleccionar broker..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">Número de Cuenta</Label>
                  <Input id="account" placeholder="Ingrese número..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="server">Servidor</Label>
                  <Input id="server" placeholder="URL del servidor..." />
                </div>
                <div className="flex items-end gap-2">
                  <Button variant="default" className="bg-success hover:bg-success/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Accounts Grid - Optimized with pagination */}
          <div className="grid gap-4 lg:grid-cols-2">
            {paginatedData.map((account) => (
              <Card key={account.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(account.status, account.connected)}
                    <div>
                      <h3 className="font-semibold text-lg">{account.broker}</h3>
                      <p className="text-sm text-muted-foreground">
                        Cuenta: {account.accountNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(account.status)}
                    <Badge variant={account.accountType === 'Real' ? 'default' : 'secondary'}>
                      {account.accountType}
                    </Badge>
                  </div>
                </div>

                {/* Account Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-xl font-bold text-foreground">
                      ${account.balance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Equity</p>
                    <p className="text-xl font-bold text-success">
                      ${account.equity.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Margin</p>
                    <p className="text-sm font-medium text-warning">
                      ${account.margin.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Free Margin</p>
                    <p className="text-sm font-medium text-success">
                      ${account.freeMargin.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={account.connected}
                        onCheckedChange={() => toggleConnection(account.id)}
                      />
                      <span className="text-sm">Conexión</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={account.trading}
                        onCheckedChange={() => toggleTrading(account.id)}
                        disabled={!account.connected}
                      />
                      <span className="text-sm">Trading</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demo" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración Demo/Real</h3>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {account.accountType === 'Demo' ? 
                        <TestTube className="w-5 h-5 text-warning" /> : 
                        <DollarSign className="w-5 h-5 text-success" />
                      }
                      <div>
                        <p className="font-medium">{account.broker}</p>
                        <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={account.accountType === 'Real' ? 'default' : 'secondary'}>
                      {account.accountType}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Cambiar Tipo
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración de Cuentas</h3>
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Límites de Operación</Label>
                <div className="grid gap-4 mt-2 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="maxAccounts">Máximo de cuentas simultáneas</Label>
                    <Input id="maxAccounts" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxRisk">Riesgo máximo por cuenta (%)</Label>
                    <Input id="maxRisk" type="number" defaultValue="2" />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Configuración de Conexión</Label>
                <div className="grid gap-4 mt-2 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout de conexión (segundos)</Label>
                    <Input id="timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retry">Reintentos automáticos</Label>
                    <Input id="retry" type="number" defaultValue="3" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                  Guardar Configuración
                </Button>
                <Button variant="outline">
                  Restaurar Valores por Defecto
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounts;