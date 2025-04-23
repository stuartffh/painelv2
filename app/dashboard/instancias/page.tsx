"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  XCircle, 
  MoreVertical, 
  RefreshCw, 
  PlusCircle, 
  QrCode, 
  PowerOff, 
  RotateCw, 
  AlertCircle
} from "lucide-react";

// Dados simulados de instâncias
const initialInstances = [
  { 
    id: "inst1", 
    name: "Atendimento", 
    status: "connected", 
    lastActive: "2023-04-28T14:53:00Z",
    phone: "+5511999999999",
    battery: 87,
    messages: 342
  },
  { 
    id: "inst2", 
    name: "Vendas", 
    status: "disconnected", 
    lastActive: "2023-04-27T08:30:00Z",
    phone: "+5511888888888",
    battery: 0,
    messages: 128
  },
  { 
    id: "inst3", 
    name: "Suporte", 
    status: "connected", 
    lastActive: "2023-04-28T16:15:00Z",
    phone: "+5511777777777",
    battery: 64,
    messages: 512
  },
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

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export default function InstanciasPage() {
  const [instances, setInstances] = useState(initialInstances);
  const [newInstanceName, setNewInstanceName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<any>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateInstance = () => {
    if (!newInstanceName.trim()) {
      toast({
        title: "Nome inválido",
        description: "Por favor, informe um nome para a instância.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulação de criação de instância
    setTimeout(() => {
      const newInstance = {
        id: `inst${instances.length + 1}`,
        name: newInstanceName,
        status: "disconnected",
        lastActive: new Date().toISOString(),
        phone: "",
        battery: 0,
        messages: 0
      };
      
      setInstances([...instances, newInstance]);
      setNewInstanceName("");
      setIsDialogOpen(false);
      setIsLoading(false);
      
      toast({
        title: "Instância criada",
        description: `A instância "${newInstanceName}" foi criada com sucesso.`,
      });
    }, 1500);
  };

  const handleConnect = (instance: any) => {
    setIsLoading(true);
    
    // Simulação de geração de QR Code
    setTimeout(() => {
      setSelectedInstance(instance);
      setIsQrModalOpen(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleQrConfirm = () => {
    if (!selectedInstance) return;
    
    setIsLoading(true);
    
    // Simulação de conexão
    setTimeout(() => {
      const updatedInstances = instances.map(inst => 
        inst.id === selectedInstance.id 
          ? { ...inst, status: "connected", lastActive: new Date().toISOString() } 
          : inst
      );
      
      setInstances(updatedInstances);
      setIsQrModalOpen(false);
      setIsLoading(false);
      
      toast({
        title: "Instância conectada",
        description: `A instância "${selectedInstance.name}" foi conectada com sucesso.`,
      });
    }, 2000);
  };

  const handleDisconnect = (instance: any) => {
    setIsLoading(true);
    
    // Simulação de desconexão
    setTimeout(() => {
      const updatedInstances = instances.map(inst => 
        inst.id === instance.id 
          ? { ...inst, status: "disconnected", lastActive: new Date().toISOString() } 
          : inst
      );
      
      setInstances(updatedInstances);
      setIsLoading(false);
      
      toast({
        title: "Instância desconectada",
        description: `A instância "${instance.name}" foi desconectada.`,
      });
    }, 1000);
  };

  const handleRestart = (instance: any) => {
    setIsLoading(true);
    
    // Simulação de reinicialização
    setTimeout(() => {
      const updatedInstances = instances.map(inst => 
        inst.id === instance.id 
          ? { ...inst, status: "initializing" } 
          : inst
      );
      
      setInstances(updatedInstances);
      
      // Após "inicialização", conectar novamente
      setTimeout(() => {
        const finalInstances = instances.map(inst => 
          inst.id === instance.id 
            ? { ...inst, status: "connected", lastActive: new Date().toISOString() } 
            : inst
        );
        
        setInstances(finalInstances);
        setIsLoading(false);
        
        toast({
          title: "Instância reiniciada",
          description: `A instância "${instance.name}" foi reiniciada com sucesso.`,
        });
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instâncias</h1>
          <p className="text-muted-foreground">
            Gerencie suas instâncias do WhatsApp
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Nova Instância
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Instância</DialogTitle>
              <DialogDescription>
                Digite um nome para sua nova instância do WhatsApp.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="instance-name">Nome da instância</Label>
                <Input
                  id="instance-name"
                  placeholder="Ex: Atendimento, Vendas, etc."
                  value={newInstanceName}
                  onChange={(e) => setNewInstanceName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateInstance}
                disabled={isLoading}
              >
                {isLoading ? "Criando..." : "Criar instância"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todas ({instances.length})</TabsTrigger>
            <TabsTrigger value="connected">
              Conectadas ({instances.filter(i => i.status === "connected").length})
            </TabsTrigger>
            <TabsTrigger value="disconnected">
              Desconectadas ({instances.filter(i => i.status === "disconnected").length})
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          {instances.map((instance) => (
            <Card key={instance.id} className="animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(instance.status)}
                    <CardTitle>{instance.name}</CardTitle>
                    {getStatusLabel(instance.status)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {instance.status === "disconnected" ? (
                        <DropdownMenuItem onClick={() => handleConnect(instance)}>
                          <QrCode className="h-4 w-4 mr-2" />
                          Conectar
                        </DropdownMenuItem>
                      ) : (
                        <>
                          <DropdownMenuItem onClick={() => handleDisconnect(instance)}>
                            <PowerOff className="h-4 w-4 mr-2" />
                            Desconectar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRestart(instance)}>
                            <RotateCw className="h-4 w-4 mr-2" />
                            Reiniciar
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  ID: {instance.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Última atividade
                    </div>
                    <div className="font-medium">
                      {formatDateTime(instance.lastActive)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Telefone
                    </div>
                    <div className="font-medium">
                      {instance.phone || "Não conectado"}
                    </div>
                  </div>
                  {instance.status === "connected" && (
                    <>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Bateria
                        </div>
                        <div className="font-medium">
                          {instance.battery}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Mensagens
                        </div>
                        <div className="font-medium">
                          {instance.messages} mensagens
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="p-4 flex justify-end gap-2">
                {instance.status === "disconnected" ? (
                  <Button onClick={() => handleConnect(instance)} disabled={isLoading}>
                    <QrCode className="h-4 w-4 mr-2" />
                    Conectar
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => handleDisconnect(instance)} disabled={isLoading}>
                      <PowerOff className="h-4 w-4 mr-2" />
                      Desconectar
                    </Button>
                    <Button onClick={() => handleRestart(instance)} disabled={isLoading}>
                      <RotateCw className="h-4 w-4 mr-2" />
                      Reiniciar
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
          
          {instances.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="text-muted-foreground text-center">
                  <p className="mb-4">Nenhuma instância encontrada.</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Criar nova instância
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="connected">
          {instances.filter(i => i.status === "connected").length > 0 ? (
            <div className="space-y-4">
              {instances
                .filter(i => i.status === "connected")
                .map(instance => (
                  // Renderiza o mesmo card, mas apenas para instâncias conectadas
                  <Card key={instance.id} className="animate-fade-in">
                    {/* Conteúdo semelhante ao card above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(instance.status)}
                          <CardTitle>{instance.name}</CardTitle>
                          {getStatusLabel(instance.status)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDisconnect(instance)}>
                              <PowerOff className="h-4 w-4 mr-2" />
                              Desconectar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRestart(instance)}>
                              <RotateCw className="h-4 w-4 mr-2" />
                              Reiniciar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        ID: {instance.id}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Última atividade
                          </div>
                          <div className="font-medium">
                            {formatDateTime(instance.lastActive)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Telefone
                          </div>
                          <div className="font-medium">
                            {instance.phone}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Bateria
                          </div>
                          <div className="font-medium">
                            {instance.battery}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Mensagens
                          </div>
                          <div className="font-medium">
                            {instance.messages} mensagens
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-4 flex justify-end gap-2">
                      <Button variant="outline" onClick={() => handleDisconnect(instance)} disabled={isLoading}>
                        <PowerOff className="h-4 w-4 mr-2" />
                        Desconectar
                      </Button>
                      <Button onClick={() => handleRestart(instance)} disabled={isLoading}>
                        <RotateCw className="h-4 w-4 mr-2" />
                        Reiniciar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="text-muted-foreground text-center">
                  <p className="mb-4">Nenhuma instância conectada.</p>
                  <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Criar nova instância
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="disconnected">
          {instances.filter(i => i.status === "disconnected").length > 0 ? (
            <div className="space-y-4">
              {instances
                .filter(i => i.status === "disconnected")
                .map(instance => (
                  // Renderiza o mesmo card, mas apenas para instâncias desconectadas
                  <Card key={instance.id} className="animate-fade-in">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(instance.status)}
                          <CardTitle>{instance.name}</CardTitle>
                          {getStatusLabel(instance.status)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleConnect(instance)}>
                              <QrCode className="h-4 w-4 mr-2" />
                              Conectar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        ID: {instance.id}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Última atividade
                          </div>
                          <div className="font-medium">
                            {formatDateTime(instance.lastActive)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Telefone
                          </div>
                          <div className="font-medium">
                            Não conectado
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-4 flex justify-end gap-2">
                      <Button onClick={() => handleConnect(instance)} disabled={isLoading}>
                        <QrCode className="h-4 w-4 mr-2" />
                        Conectar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="text-muted-foreground text-center">
                  <p className="mb-4">Nenhuma instância desconectada.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* QR Code Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conectar instância</DialogTitle>
            <DialogDescription>
              Escaneie o QR Code com seu telefone para conectar a instância {selectedInstance?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="border border-border p-4 rounded-md mb-4">
              {/* QR Code simulado */}
              <div className="w-64 h-64 bg-muted relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        Math.random() > 0.7 ? "bg-foreground" : "bg-transparent"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mb-4">
              O QR Code expira em 45 segundos. Caso expire, clique em "Gerar novo QR Code".
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsQrModalOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              variant="default"
              onClick={handleQrConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Conectando..." : "Confirmar conexão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}