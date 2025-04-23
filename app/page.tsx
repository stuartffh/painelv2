import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { 
  Bot, 
  Cog, 
  Database, 
  Lock, 
  MessageSquare, 
  Settings, 
  Star, 
  Zap 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 z-0 gradient-bg opacity-10"></div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Transforme Seu Negócio com{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Automação Inteligente
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Soluções inovadoras para otimizar seus processos e aumentar sua produtividade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/registro">
                  <Button size="lg" className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
                    Comece agora
                  </Button>
                </Link>
                <Link href="/planos">
                  <Button variant="outline" size="lg" className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
                    Ver planos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Soluções completas para transformar sua empresa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Automação Inteligente</h3>
                <p className="text-muted-foreground">
                  Soluções personalizadas para maximizar sua produtividade e segurança.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Cog className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Otimização de Processos</h3>
                <p className="text-muted-foreground">
                  Soluções personalizadas para maximizar sua produtividade e segurança.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">Integrações Personalizadas</h3>
                <p className="text-muted-foreground">
                  Soluções personalizadas para maximizar sua produtividade e segurança.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Gestão de Dados</h3>
                <p className="text-muted-foreground">
                  Soluções personalizadas para maximizar sua produtividade e segurança.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Segurança Digital</h3>
                <p className="text-muted-foreground">
                  Soluções personalizadas para maximizar sua produtividade e segurança.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Automate Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Por que Automatizar?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Reduza custos, elimine tarefas repetitivas, melhore a segurança digital e foque no crescimento do seu negócio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Aumente a Produtividade</h3>
                <p className="text-muted-foreground">
                  Automatize tarefas repetitivas e foque no que realmente importa.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Melhore a Comunicação</h3>
                <p className="text-muted-foreground">
                  Integre diferentes canais e centralize suas comunicações.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">Experiência Superior</h3>
                <p className="text-muted-foreground">
                  Ofereça um atendimento mais rápido e eficiente.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <p className="text-lg mb-4">
                  "A automação aumentou nossa produtividade"
                </p>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">RC</span>
                  </div>
                  <div>
                    <p className="font-medium">Roberto Carlos</p>
                    <p className="text-sm text-muted-foreground">Diretor Comercial</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <p className="text-lg mb-4">
                  "A integração personalizada otimizou nossos processos e reduziu custos"
                </p>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center">
                    <span className="text-lg font-semibold text-secondary">RC</span>
                  </div>
                  <div>
                    <p className="font-medium">Rafael Carvalho</p>
                    <p className="text-sm text-muted-foreground">CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0 gradient-bg opacity-10"></div>
          <div className="container relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para transformar sua empresa?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Entre em contato e descubra como podemos ajudar.
            </p>
            <Link href="/registro">
              <Button size="lg">Fale Conosco</Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}