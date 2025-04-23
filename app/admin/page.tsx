"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  BarChart,
  Bar
} from "recharts";
import { 
  Users, 
  MessageSquare, 
  Activity, 
  LayoutDashboard, 
  ArrowRight,
  Phone,
  CheckCircle2,
  XCircle,
  RefreshCw
} from "lucide-react";

// Dados simulados para o painel administrativo
const statsData = [
  {
    title: "Total de Usuários",
    value: "124",
    description: "+8 este mês",
    icon: Users,
    change: "+6.8%",
  },
  {
    title: "Instâncias Ativas",
    value: "87",
    description: "de 142 no total",
    icon: Phone,
    change: "+12.3%",
  },
  {
    title: "Mensagens Hoje",
    value: "12,845",
    description: "+3,412 desde ontem",
    icon: MessageSquare,
    change: "+24.5%",
  },
  {
    title: "Taxa de Entrega",
    value: "98.7%",
    description: "Nas últimas 24h",
    icon: Activity,
    change: "+0.5%",
  },
];

const messageChartData = [
  { date: "01/04", enviadas: 1200, recebidas: 900 },
  { date: "02/04", enviadas: 1300, recebidas: 1000 },
  { date: "03/04", enviadas: 1400, recebidas: 1100 },
  { date: "04/04", enviadas: 1800, recebidas: 1400 },
  { date: "05/04", enviadas: 2000, recebidas: 1600 },
  { date: "06/04", enviadas: 2400, recebidas: 1900 },
  { date: "07/04", enviadas: 2200, recebidas: 1700 },
];

const userGrowthData = [
  { name: "Jan", usuarios: 45 },
  { name: "Fev", usuarios: 52 },
  { name: "Mar", usuarios: 61 },
  { name: "Abr", usuarios: 67 },
  { name: "Mai", usuarios: 76 },
  { name: "Jun", usuarios: 85 },
  { name: "Jul", usuarios: 97 },
  { name: "Ago", usuarios: 108 },
  { name: "Set", usuarios: 115 },
  { name: "Out", usuarios: 124 },
];

const instanceStatusData = [
  { name: "Conectadas", value: 87 },
  { name: "Desconectadas", value: 43 },
  { name: "Em manutenção", value: 12 },
];

const recentInstancesData = [
  { id: "inst432", name: "Marketing Global", user: "João Silva", status: "connected", lastActive: "2 minutos atrás" },
  { id: "inst287", name: "Suporte Premium", user: "Maria Oliveira", status: "disconnected", lastActive: "5 horas atrás" },
  { id: "inst876", name: "Vendas Diretas", user: "Carlos Santos", status: "initializing", lastActive: "Agora" },
  { id: "inst654", name: "SAC Prioritário", user: "Ana Costa", status: "connected", lastActive: "1 hora atrás" },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "connected":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "disconnected":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "initializing":
      return <RefreshCw className="h-4 w-4 text-amber-500 animate-spin" />;
    default:
      return null;
  }
}

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
        <p className="text-muted-foreground">
          Visualize métricas e gerencie todas as instâncias e usuários.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, i) => (
          <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.description}{" "}
                <span className="text-green-500 ml-1">{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="instances">Instâncias</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 animate-fade-in">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full lg:col-span-4">
              <CardHeader>
                <CardTitle>Tráfego de Mensagens</CardTitle>
                <CardDescription>
                  Total de mensagens enviadas e recebidas nos últimos 7 dias
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={messageChartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorEnviadas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRecebidas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="hsl(var(--border))" 
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          color: "hsl(var(--popover-foreground))",
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="enviadas" 
                        name="Enviadas"
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorEnviadas)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="recebidas" 
                        name="Recebidas"
                        stroke="hsl(var(--secondary))" 
                        fillOpacity={1} 
                        fill="url(#colorRecebidas)" 
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-full lg:col-span-3">
              <CardHeader>
                <CardTitle>Crescimento de Usuários</CardTitle>
                <CardDescription>
                  Novos usuários registrados nos últimos 10 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={userGrowthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="hsl(var(--border))" 
                      />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          color: "hsl(var(--popover-foreground))",
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="usuarios" 
                        name="Usuários"
                        stroke="hsl(var(--accent))" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-full md:col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>Status das Instâncias</CardTitle>
                <CardDescription>
                  Distribuição atual das instâncias por status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={instanceStatusData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="hsl(var(--border))" 
                      />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          color: "hsl(var(--popover-foreground))",
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        name="Instâncias"
                        fill="hsl(var(--chart-1))" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-full md:col-span-1 lg:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>
                    Últimas instâncias ativas ou modificadas
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInstancesData.map((instance) => (
                    <div
                      key={instance.id}
                      className="flex items-center justify-between space-x-4 rounded-md border p-3"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(instance.status)}
                        <div>
                          <p className="font-medium leading-none mb-1">
                            {instance.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {instance.user}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline">
                          {instance.lastActive}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="instances" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Instâncias</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as instâncias da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Button variant="outline" asChild>
                  <a href="/admin/instancias">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Ir para o painel de instâncias
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os usuários da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Button variant="outline" asChild>
                  <a href="/admin/usuarios">
                    <Users className="h-4 w-4 mr-2" />
                    Ir para o painel de usuários
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}