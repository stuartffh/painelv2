import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { CheckCircle2, Cpu, MessageSquareText, Shield } from "lucide-react";

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
                Gerencie suas instâncias WhatsApp com{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  facilidade
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Plataforma completa para gerenciar múltiplas instâncias da Evolution API
                em um único lugar, com interface intuitiva e recursos avançados.
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
        
        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma oferece tudo o que você precisa para gerenciar 
                suas instâncias do WhatsApp de forma profissional.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquareText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Multi-instâncias</h3>
                <p className="text-muted-foreground flex-grow">
                  Gerencie múltiplas contas de WhatsApp a partir de uma única interface, 
                  controle cada instância individualmente.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Automação Completa</h3>
                <p className="text-muted-foreground flex-grow">
                  Automatize mensagens, respostas e interações com seus contatos através da 
                  integração com a Evolution API.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col h-full transition-all hover:shadow-md">
                <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">Segurança Avançada</h3>
                <p className="text-muted-foreground flex-grow">
                  Conexões seguras, autenticação em duas etapas e backups regulares para 
                  garantir a proteção dos seus dados.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Começar a usar nossa plataforma é simples e rápido. Siga os passos abaixo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-semibold text-primary">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Crie sua conta</h3>
                <p className="text-muted-foreground">
                  Registre-se em nossa plataforma e escolha o plano que melhor atende suas necessidades.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-semibold text-primary">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Configure suas instâncias</h3>
                <p className="text-muted-foreground">
                  Adicione novas instâncias do WhatsApp e conecte-as facilmente através do QR Code.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-semibold text-primary">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Gerencie suas mensagens</h3>
                <p className="text-muted-foreground">
                  Comece a enviar e receber mensagens, configure automações e acompanhe suas interações.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Escolha o plano perfeito para seu negócio, com preços acessíveis e flexíveis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="bg-card rounded-lg border overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-medium mb-2">Básico</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-bold">R$29,90</span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                  <p className="text-muted-foreground">
                    Ideal para pequenos negócios e uso pessoal.
                  </p>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>1 instância do WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Envio de mensagens ilimitado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Acesso ao painel básico</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Suporte por e-mail</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link href="/registro?plano=basico">
                    <Button variant="outline" className="w-full">Escolher plano</Button>
                  </Link>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-card rounded-lg border overflow-hidden flex flex-col h-full transition-all hover:shadow-md relative">
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl">
                    Popular
                  </div>
                </div>
                <div className="p-6 border-b">
                  <h3 className="text-xl font-medium mb-2">Profissional</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-bold">R$99,90</span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                  <p className="text-muted-foreground">
                    Perfeito para empresas em crescimento.
                  </p>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>5 instâncias do WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Envio de mensagens ilimitado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Acesso completo ao painel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Suporte prioritário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Automações básicas</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link href="/registro?plano=profissional">
                    <Button className="w-full">Escolher plano</Button>
                  </Link>
                </div>
              </div>
              
              {/* Enterprise Plan */}
              <div className="bg-card rounded-lg border overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-medium mb-2">Empresarial</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-bold">R$249,90</span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                  <p className="text-muted-foreground">
                    Solução completa para grandes empresas.
                  </p>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>15 instâncias do WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Envio de mensagens ilimitado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Acesso completo ao painel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Suporte 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Automações avançadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>API personalizada</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link href="/registro?plano=empresarial">
                    <Button variant="outline" className="w-full">Escolher plano</Button>
                  </Link>
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
              Pronto para começar?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Junte-se a milhares de empresas que já utilizam nossa plataforma para 
              gerenciar suas comunicações via WhatsApp.
            </p>
            <Link href="/registro">
              <Button size="lg">Criar conta gratuitamente</Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}