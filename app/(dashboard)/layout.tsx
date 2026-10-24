import Navbar from "../components/home/nav";
import Sidebar from "../components/home/sitebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <div  className="border-b-2">
          <Navbar/>          
        </div>

        <div className="flex gap-2">
          <div className="border-r-2"><Sidebar/></div>
          <div className="w-full">{children}</div>
        </div>      
  
      </body>
    </div>
  );
}
