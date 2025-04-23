"use client";

import { useState, useEffect } from "react";
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
import {
  BarChart3,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

// Dados simulados
const instancesData = [
  { id: "inst1", name: "Atendimento", status: "connected", lastActive: "2 minutos atrás" },
  { id: "inst2", name: "Vendas", status: "disconnected", lastActive: "5 horas atrás" },
  { id: "inst3", name: "Suporte", status: "connected", lastActive: "Agora" },
];

const statsData = [
  {
    title: "Total de Mensagens",
    value: "3,542",
    description: "Enviadas este mês",
    icon: MessageSquare,
    change: "+12%",
  },
  {
    title: "Instâncias Ativas",
    value: "2",
    description: "De 3 disponíveis",
    icon: CheckCircle2,
    change: "+0%",
  },
];

const chartData = [
  { name: "Jan", mensagens: 400 },
  { name: "Fev", mensagens: 520 },
  { name: "Mar", mensagens: 750 },
  { name: "Abr", mensagens: 620 },
  { name: "Mai", mensagens: 800 },
  { name: "Jun", mensagens: 1200 },
  { name: "Jul", mensagens: 950 },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "connected":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "disconnected":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "initializing":
      return <RefreshCw className="h-5 w-5 text-amber-500 animate-spin" />;
    default:
      return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "connected":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          Conectado
        </Badge>
      );
    case "disconnected":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
          Desconectado
        </Badge>
      );
    case "initializing":
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
          Inicializando
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          Desconhecido
        </Badge>
      );
  }
}

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe suas instâncias e estatísticas.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="instances">Instâncias</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statsData.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}{" "}
                    <span className="text-green-500">{stat.change}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Uso do Plano
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">66%</div>
                <div className="mt-2 space-y-2">
                  <Progress value={66} />
                  <p className="text-xs text-muted-foreground">
                    2 de 3 instâncias utilizadas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Gráfico */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Atividade de Mensagens</CardTitle>
              <CardDescription>
                Total de mensagens enviadas nos últimos meses
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorMensagens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
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
                      dataKey="mensagens" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorMensagens)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          
          {/* Instâncias recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Suas Instâncias</CardTitle>
              <CardDescription>
                Status atual das suas instâncias do WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instancesData.map((instance) => (
                  <div
                    key={instance.id}
                    className="flex items-center justify-between space-x-4 rounded-md border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(instance.status)}
                      <div>
                        <p className="font-medium leading-none mb-1">
                          {instance.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Ativo: {instance.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusLabel(instance.status)}
                      <Button variant="ghost" size="sm">
                        Gerenciar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="instances" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Instâncias</CardTitle>
              <CardDescription>
                Conecte, desconecte e gerencie suas instâncias do WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  O conteúdo detalhado das instâncias aparecerá aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Mensagens</CardTitle>
              <CardDescription>
                Visualize e gerencie suas mensagens recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  O histórico detalhado de mensagens aparecerá aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}