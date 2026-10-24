"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  ShoppingCart,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const menus = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Product Stock", href: "/productstock", icon: Boxes },
  { name: "Product Sales", href: "/sales", icon: ShoppingCart },
  { name: "Orders", href: "/orders", icon: ClipboardList },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">Inventory</h2>

      <div className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className="flex items-center gap-3 rounded p-3 hover:text-black  hover:bg-yellow-200"
            >
              <Icon size={20} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}