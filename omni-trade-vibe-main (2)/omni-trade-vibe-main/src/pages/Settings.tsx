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
  Settings as SettingsIcon, 
  Server, 
  Bell,
  Shield,
  Database,
  Wifi,
  Clock,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Settings = () => {
  const [refreshInterval, setRefreshInterval] = useState([5]);
  const [maxLatency, setMaxLatency] = useState([100]);
  const [slippageTolerance, setSlippageTolerance] = useState([2]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Ajustes avanzados y configuración general del bot
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restaurar
          </Button>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Guardar Todo
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estado del Sistema</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="default" className="bg-success text-success-foreground">Operativo</Badge>
              </div>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Latencia Promedio</p>
              <p className="text-xl font-bold text-foreground">23ms</p>
            </div>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Uso de CPU</p>
              <p className="text-xl font-bold text-foreground">34%</p>
            </div>
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-dashboard">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Memoria RAM</p>
              <p className="text-xl font-bold text-foreground">2.1GB</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configuración General</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="botName">Nombre del Bot</Label>
                  <Input id="botName" defaultValue="Omni Trade Dash Pro" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <select id="timezone" className="w-full p-2 border rounded-md bg-background">
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern (EST)</option>
                    <option value="CST">Central (CST)</option>
                    <option value="PST">Pacific (PST)</option>
                    <option value="GMT">GMT</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select id="language" className="w-full p-2 border rounded-md bg-background">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda Base</Label>
                  <select id="currency" className="w-full p-2 border rounded-md bg-background">
                    <option value="USD">USD - Dólar Americano</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - Libra Esterlina</option>
                    <option value="JPY">JPY - Yen Japonés</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Inicio automático</Label>
                    <p className="text-xs text-muted-foreground">Iniciar bot al arrancar el sistema</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Modo oscuro</Label>
                    <p className="text-xs text-muted-foreground">Tema visual de la interfaz</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configuración de Trading</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxConcurrent">Máximo trades simultáneos</Label>
                  <Input id="maxConcurrent" type="number" defaultValue="10" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="globalRisk">Riesgo global máximo (%)</Label>
                  <Input id="globalRisk" type="number" defaultValue="5" step="0.1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyStop">Stop de emergencia (%)</Label>
                  <Input id="emergencyStop" type="number" defaultValue="15" />
                  <p className="text-xs text-muted-foreground">Detener bot si pérdida excede este porcentaje</p>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Trading en noticias</Label>
                    <p className="text-xs text-muted-foreground">Permitir trades durante eventos de alto impacto</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Trading los viernes</Label>
                    <p className="text-xs text-muted-foreground">Operar durante el cierre semanal</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Confirmación manual</Label>
                    <p className="text-xs text-muted-foreground">Requiere confirmación para cada trade</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Optimización de Rendimiento</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Intervalo de actualización (segundos)</Label>
                    <span className="text-sm text-muted-foreground">{refreshInterval[0]}s</span>
                  </div>
                  <Slider
                    value={refreshInterval}
                    onValueChange={setRefreshInterval}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Frecuencia de actualización de datos en tiempo real
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Latencia máxima tolerada (ms)</Label>
                    <span className="text-sm text-muted-foreground">{maxLatency[0]}ms</span>
                  </div>
                  <Slider
                    value={maxLatency}
                    onValueChange={setMaxLatency}
                    max={500}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Latencia máxima antes de mostrar alertas
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Tolerancia al slippage (%)</Label>
                    <span className="text-sm text-muted-foreground">{slippageTolerance[0]}%</span>
                  </div>
                  <Slider
                    value={slippageTolerance}
                    onValueChange={setSlippageTolerance}
                    max={10}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Diferencia máxima aceptable en precios de ejecución
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-sm font-medium">Optimización CPU</Label>
                      <p className="text-xs text-muted-foreground">Reducir uso de procesador</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-sm font-medium">Cache inteligente</Label>
                      <p className="text-xs text-muted-foreground">Optimizar uso de memoria</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-sm font-medium">Compresión de datos</Label>
                      <p className="text-xs text-muted-foreground">Reducir ancho de banda</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configuración de Red</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proxyUrl">Servidor Proxy (opcional)</Label>
                  <Input id="proxyUrl" placeholder="http://proxy.ejemplo.com:8080" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="connectionTimeout">Timeout de conexión (segundos)</Label>
                  <Input id="connectionTimeout" type="number" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retryAttempts">Intentos de reconexión</Label>
                  <Input id="retryAttempts" type="number" defaultValue="3" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retryDelay">Delay entre intentos (segundos)</Label>
                  <Input id="retryDelay" type="number" defaultValue="5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Reconexión automática</Label>
                    <p className="text-xs text-muted-foreground">Reconectar automáticamente si se pierde conexión</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Keep-alive</Label>
                    <p className="text-xs text-muted-foreground">Mantener conexiones activas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sistema de Notificaciones</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Tipos de Notificaciones</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-medium">Trades exitosos</p>
                          <p className="text-xs text-muted-foreground">Notificar cuando se cierre en profit</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-danger" />
                        <div>
                          <p className="font-medium">Trades con pérdida</p>
                          <p className="text-xs text-muted-foreground">Notificar cuando se cierre en loss</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Server className="w-5 h-5 text-warning" />
                        <div>
                          <p className="font-medium">Problemas de conexión</p>
                          <p className="text-xs text-muted-foreground">Alertas de conectividad</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Límites de riesgo</p>
                          <p className="text-xs text-muted-foreground">Cuando se alcancen límites</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Canales de Notificación</Label>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between p-3 rounded-lg border mb-2">
                        <span className="font-medium">Email</span>
                        <Switch defaultChecked />
                      </div>
                      <Input placeholder="tu@email.com" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between p-3 rounded-lg border mb-2">
                        <span className="font-medium">Telegram</span>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Input placeholder="Bot Token" />
                        <Input placeholder="Chat ID" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between p-3 rounded-lg border mb-2">
                        <span className="font-medium">Discord</span>
                        <Switch />
                      </div>
                      <Input placeholder="Webhook URL" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between p-3 rounded-lg border mb-2">
                        <span className="font-medium">SMS</span>
                        <Switch />
                      </div>
                      <Input placeholder="Número de teléfono" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Probar Notificaciones
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configuración de Seguridad</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Clave API Principal</Label>
                  <Input id="apiKey" type="password" defaultValue="••••••••••••••••" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="encryptionLevel">Nivel de encriptación</Label>
                  <select id="encryptionLevel" className="w-full p-2 border rounded-md bg-background">
                    <option value="aes256">AES-256 (Recomendado)</option>
                    <option value="aes128">AES-128</option>
                    <option value="rsa2048">RSA-2048</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout de sesión (minutos)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="60" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Autenticación de dos factores</Label>
                    <p className="text-xs text-muted-foreground">Seguridad adicional para acceso</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Logs de auditoría</Label>
                    <p className="text-xs text-muted-foreground">Registrar todas las acciones</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Acceso restringido por IP</Label>
                    <p className="text-xs text-muted-foreground">Limitar acceso por dirección IP</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Backup y Recuperación</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupPath">Ruta de backup</Label>
                  <Input id="backupPath" defaultValue="/backups/omni-trade" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupFreq">Frecuencia de backup</Label>
                  <select id="backupFreq" className="w-full p-2 border rounded-md bg-background">
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Retención (días)</Label>
                  <Input id="backupRetention" type="number" defaultValue="30" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Backup automático</Label>
                    <p className="text-xs text-muted-foreground">Backup programado automáticamente</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Backup en la nube</Label>
                    <p className="text-xs text-muted-foreground">Sincronizar con servicio en la nube</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2 pt-2">
                  <Button variant="outline" className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    Crear Backup Ahora
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restaurar desde Backup
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configuración Avanzada</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logLevel">Nivel de logs</Label>
                  <select id="logLevel" className="w-full p-2 border rounded-md bg-background">
                    <option value="debug">Debug (Muy detallado)</option>
                    <option value="info">Info (Normal)</option>
                    <option value="warn">Warning (Solo advertencias)</option>
                    <option value="error">Error (Solo errores)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLogSize">Tamaño máximo de logs (MB)</Label>
                  <Input id="maxLogSize" type="number" defaultValue="100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dbPath">Ruta de base de datos</Label>
                  <Input id="dbPath" defaultValue="/data/omni-trade.db" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxDbSize">Tamaño máximo DB (GB)</Label>
                  <Input id="maxDbSize" type="number" defaultValue="5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Modo desarrollador</Label>
                    <p className="text-xs text-muted-foreground">Habilitar funciones de desarrollo</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Telemetría</Label>
                    <p className="text-xs text-muted-foreground">Enviar datos de uso anónimos</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium">Actualizaciones automáticas</Label>
                    <p className="text-xs text-muted-foreground">Instalar actualizaciones automáticamente</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Información del Sistema</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Versión:</p>
                    <p className="font-medium">v2.1.4</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Build:</p>
                    <p className="font-medium">#2024.01.15</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uptime:</p>
                    <p className="font-medium">7d 14h 23m</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Memoria:</p>
                    <p className="font-medium">2.1GB / 8GB</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CPU:</p>
                    <p className="font-medium">34% de 8 cores</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Disco:</p>
                    <p className="font-medium">45GB / 500GB</p>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Diagnóstico del Sistema
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Limpiar Cache
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Reiniciar Sistema
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;