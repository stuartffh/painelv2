"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  BarChart,
  MessageSquare,
  Users,
  Settings,
  CreditCard,
  LogOut,
  HelpCircle,
  Bell,
  ActivitySquare,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();

  const clientRoutes = [
    {
      title: "Principal",
      links: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: BarChart,
        },
        {
          title: "Instâncias",
          href: "/dashboard/instancias",
          icon: MessageSquare,
        },
        {
          title: "Notificações",
          href: "/dashboard/notificacoes",
          icon: Bell,
        },
      ],
    },
    {
      title: "Conta",
      links: [
        {
          title: "Faturamento",
          href: "/dashboard/faturamento",
          icon: CreditCard,
        },
        {
          title: "Configurações",
          href: "/dashboard/configuracoes",
          icon: Settings,
        },
        {
          title: "Suporte",
          href: "/dashboard/suporte",
          icon: HelpCircle,
        },
      ],
    },
  ];

  const adminRoutes = [
    {
      title: "Principal",
      links: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: BarChart,
        },
        {
          title: "Usuários",
          href: "/admin/usuarios",
          icon: Users,
        },
        {
          title: "Instâncias",
          href: "/admin/instancias",
          icon: MessageSquare,
        },
        {
          title: "Atividades",
          href: "/admin/atividades",
          icon: ActivitySquare,
        },
      ],
    },
    {
      title: "Configurações",
      links: [
        {
          title: "Planos",
          href: "/admin/planos",
          icon: CreditCard,
        },
        {
          title: "Configurações",
          href: "/admin/configuracoes",
          icon: Settings,
        },
      ],
    },
  ];

  const routes = isAdmin ? adminRoutes : clientRoutes;

  return (
    <div className="relative h-full flex flex-col border-r bg-card">
      <div className="flex h-16 items-center px-4 py-4 border-b">
        <Logo />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-6 p-4">
          {routes.map((group, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-muted-foreground px-2">
                {group.title}
              </h3>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Button
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2",
                      pathname === link.href
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-transparent hover:text-primary"
                    )}
                    size="sm"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.title}
                  </Button>
                </Link>
              ))}
              {i < routes.length - 1 && <Separator className="mt-2" />}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-2 p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            {isAdmin ? "Modo Admin" : "Tema"}
          </p>
          <ThemeToggle />
        </div>
        <Link href="/logout" passHref>
          <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </Link>
      </div>
    </div>
  );
}