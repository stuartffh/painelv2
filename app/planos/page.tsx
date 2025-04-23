"use client";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PlanosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Nossos Planos</h1>
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
      </main>
      
      <Footer />
    </div>
  );
}