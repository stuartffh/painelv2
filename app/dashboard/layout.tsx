import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Na versão final, isso viria do banco de dados
  const user = {
    name: "Cliente Exemplo",
    email: "cliente@example.com",
    role: "client",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="hidden md:block w-64">
          <Sidebar isAdmin={false} />
        </div>
        <div className="flex flex-col flex-1">
          <Header user={user} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}