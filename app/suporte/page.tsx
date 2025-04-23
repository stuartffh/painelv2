"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessagesSquare, Mail, Phone } from "lucide-react";

export default function SuportePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Suporte</h1>
          <p className="text-lg text-gray-600">Como podemos ajudar você hoje?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessagesSquare className="h-5 w-5" />
                Chat Online
              </CardTitle>
              <CardDescription>Converse com nossa equipe em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Iniciar Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email
              </CardTitle>
              <CardDescription>Envie-nos uma mensagem</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">suporte@exemplo.com</p>
              <Button variant="outline" className="w-full">Enviar Email</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Telefone
              </CardTitle>
              <CardDescription>Fale conosco diretamente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">(11) 1234-5678</p>
              <Button variant="outline" className="w-full">Ligar Agora</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Envie sua mensagem</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e entraremos em contato o mais breve possível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Input placeholder="Seu nome" />
              </div>
              <div>
                <Input type="email" placeholder="Seu email" />
              </div>
              <div>
                <Input placeholder="Assunto" />
              </div>
              <div>
                <Textarea 
                  placeholder="Sua mensagem" 
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensagem
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}