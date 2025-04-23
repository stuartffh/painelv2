"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulação de login - em produção, isso seria uma chamada API real
      setTimeout(() => {
        if (email === "admin@example.com" && password === "admin") {
          toast({
            title: "Login realizado com sucesso",
            description: "Redirecionando para o painel administrativo...",
          });
          router.push("/admin");
        } else if (email === "cliente@example.com" && password === "cliente") {
          toast({
            title: "Login realizado com sucesso",
            description: "Redirecionando para seu painel...",
          });
          router.push("/dashboard");
        } else {
          toast({
            title: "Erro ao fazer login",
            description: "Email ou senha incorretos.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro ao tentar fazer login.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Logo size="large" />
            </div>
            <CardTitle className="text-2xl text-center">Entrar na sua conta</CardTitle>
            <CardDescription className="text-center">
              Digite seu email e senha para acessar seu painel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="/recuperar-senha"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/registro" className="text-primary hover:underline">
                  Registre-se
                </Link>
              </p>
              
              <div className="text-xs text-muted-foreground text-center mt-2">
                <p>Contas de demonstração:</p>
                <p>Admin: admin@example.com / admin</p>
                <p>Cliente: cliente@example.com / cliente</p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}