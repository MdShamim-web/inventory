"use client";

import Link from "next/link";
import {
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Total Products",
    value: "1,250",
    icon: FaBoxOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "In Stock",
    value: "980",
    icon: FaWarehouse,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Sales",
    value: "560",
    icon: FaShoppingCart,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Revenue",
    value: "$24,500",
    icon: FaDollarSign,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const activities = [
  {
    id: 1,
    title: "New product added",
    time: "5 minutes ago",
  },
  {
    id: 2,
    title: "Order #1024 completed",
    time: "20 minutes ago",
  },
  {
    id: 3,
    title: "Stock updated",
    time: "1 hour ago",
  },
  {
    id: 4,
    title: "New customer registered",
    time: "2 hours ago",
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Products Dashboard
          </h1>
          <p className="mt-1 text-slate-500">
            Welcome back! Here's an overview of your store.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
          + Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${item.color}`}
                >
                  <Icon className="text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-xl bg-white p-6 shadow lg:col-span-2">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50"
              >
                <span className="font-medium text-slate-700">
                  {activity.title}
                </span>

                <span className="text-sm text-slate-500">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

       {/* Quick Actions */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
            >
              Add New Product
            </Link>

            <Link
              href="/sales"
              className="block w-full rounded-lg bg-green-600 px-4 py-3 text-center text-white hover:bg-green-700"
            >
              Create Sale
            </Link>

            <Link
              href="/reports"
              className="block w-full rounded-lg bg-purple-600 px-4 py-3 text-center text-white hover:bg-purple-700"
            >
              View Reports
            </Link>

            <Link
              href="/inventory"
              className="block w-full rounded-lg bg-slate-800 px-4 py-3 text-center text-white hover:bg-slate-900"
            >
              Manage Inventory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}