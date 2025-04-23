import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-4 flex flex-col gap-2">
            <Logo />
            <p className="text-muted-foreground mt-2 text-sm">
              Plataforma líder para gerenciamento de instâncias WhatsApp com Evolution API.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium mb-3">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/planos" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link 
                  href="/recursos" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link 
                  href="/guias" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Guias
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium mb-3">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/faq" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/suporte" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  href="/docs" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentação
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/termos" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacidade" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium mb-3">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/sobre" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} ZapChatBR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}