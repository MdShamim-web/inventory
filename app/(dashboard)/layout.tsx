import Navbar from "../components/home/nav";
import Sidebar from "../components/home/sitebar";

// Layout for all pages inside the (dashboard) group.
// Only the root layout (app/layout.tsx) may render <html> and <body>,
// so nested layouts must use normal elements like <div>.
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b-2">
        <Navbar />
      </div>

      <div className="flex gap-2">
        <div className="border-r-2">
          <Sidebar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
