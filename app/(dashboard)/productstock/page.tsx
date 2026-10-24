"use client";

import {
  FaBoxOpen,
  FaWarehouse,
  FaExclamationTriangle,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Total Products",
    value: "1,250",
    icon: <FaBoxOpen size={28} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "In Stock",
    value: "980",
    icon: <FaWarehouse size={28} />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Low Stock",
    value: "42",
    icon: <FaExclamationTriangle size={28} />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 4,
    title: "Out of Stock",
    value: "18",
    icon: <FaTimesCircle size={28} />,
    color: "bg-red-100 text-red-600",
  },
];

const lowStockProducts = [
  {
    id: 1,
    name: "Wireless Mouse",
    stock: 5,
    status: "Low",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    stock: 3,
    status: "Low",
  },
  {
    id: 3,
    name: "Gaming Headset",
    stock: 0,
    status: "Out",
  },
  {
    id: 4,
    name: "USB-C Cable",
    stock: 7,
    status: "Low",
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">
          Product Stock Dashboard
        </h1>

        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
          + Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-4 transition-transform duration-300 group-hover:scale-110 ${item.color}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Products */}
      <section className="overflow-hidden rounded-xl bg-white shadow-md">
        <div className="border-b p-5">
          <h2 className="text-xl font-semibold text-slate-800">
            Low Stock Products
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {lowStockProducts.map((product) => (
              <tr
                key={product.id}
                className="cursor-pointer border-t transition-all duration-300 hover:bg-blue-50 hover:scale-[1.01]"
              >
                <td className="p-4">{product.id}</td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      product.status === "Low"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status === "Low"
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </td>

                <td className="p-4">
                  <button className="mr-3 rounded-md px-3 py-1 text-blue-600 transition-all duration-300 hover:bg-blue-100 hover:text-blue-700">
                    View
                  </button>

                  <button className="rounded-md px-3 py-1 text-green-600 transition-all duration-300 hover:bg-green-100 hover:text-green-700">
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Recent Activity */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="group flex cursor-pointer items-center gap-4 rounded-lg border border-green-100 bg-green-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-green-100 hover:shadow-lg">
            <div className="rounded-full bg-green-100 p-3 text-green-600 transition-transform duration-300 group-hover:scale-110">
              <FaCheckCircle size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Stock Added
              </h3>

              <p className="text-sm text-slate-600">
                20 units of <strong>Gaming Headset</strong> were added to stock.
              </p>
            </div>
          </div>

          <div className="group flex cursor-pointer items-center gap-4 rounded-lg border border-blue-100 bg-blue-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-100 hover:shadow-lg">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 transition-transform duration-300 group-hover:scale-110">
              <FaBoxOpen size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                New Product
              </h3>

              <p className="text-sm text-slate-600">
                <strong>Wireless Keyboard</strong> was added.
              </p>
            </div>
          </div>

          <div className="group flex cursor-pointer items-center gap-4 rounded-lg border border-yellow-100 bg-yellow-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-100 hover:shadow-lg">
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 transition-transform duration-300 group-hover:scale-110">
              <FaExclamationTriangle size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Low Stock Alert
              </h3>

              <p className="text-sm text-slate-600">
                <strong>Mechanical Keyboard</strong> stock is running low.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}