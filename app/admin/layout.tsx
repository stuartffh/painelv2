import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Na versão final, isso viria do banco de dados
  const user = {
    name: "Admin Exemplo",
    email: "admin@example.com",
    role: "admin",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="hidden md:block w-64">
          <Sidebar isAdmin={true} />
        </div>
        <div className="flex flex-col flex-1">
          <Header user={user} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}