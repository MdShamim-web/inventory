"use client";

import {
  FaUsers,
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaClipboardList,
  FaChartBar,
  FaDollarSign,
  FaArrowUp,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Customers",
    value: "1,250",
    icon: <FaUsers />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Products",
    value: "580",
    icon: <FaBoxOpen />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Product Stock",
    value: "8,430",
    icon: <FaWarehouse />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Today's Sales",
    value: "$4,860",
    icon: <FaDollarSign />,
    color: "bg-purple-100 text-purple-600",
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "John Doe",
    product: "Laptop",
    amount: "$900",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Sarah Smith",
    product: "Mouse",
    amount: "$35",
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "David Wilson",
    product: "Keyboard",
    amount: "$65",
    status: "Completed",
  },
  {
    id: "#ORD-1004",
    customer: "Emma Brown",
    product: "Monitor",
    amount: "$280",
    status: "Cancelled",
  },
];

export default function DashboardPage() {


  return (
    <section className="space-y-8 m-2">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="cursor-default text-3xl font-bold text-slate-800 transition-colors duration-300 hover:text-blue-600">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back, Admin 👋
          </p>
        </div>

        <button
          className="
            rounded-lg
            bg-blue-600
            px-5
            py-2
            font-medium
            text-white
            shadow-md
            transition-all
            duration-300
            hover:scale-105
            hover:bg-blue-700
            hover:shadow-lg
            active:scale-95
          "
        >
          + New Sale
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="
              group
              cursor-pointer
              rounded-xl
              bg-white
              p-6
              shadow
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              hover:shadow-blue-100
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800 transition-all duration-300 group-hover:scale-105 group-hover:text-blue-600">
                  {item.value}
                </h2>

                <div className="mt-3 flex items-center text-green-600">
                  <FaArrowUp className="mr-1 transition-transform duration-300 group-hover:-translate-y-1" />

                  <span className="text-sm">
                    12% Increase
                  </span>
                </div>
              </div>

              <div
                className={`
                  rounded-full
                  p-4
                  text-2xl
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-6
                  ${item.color}
                `}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Product Sales */}
        <div
          className="
            group
            cursor-pointer
            rounded-xl
            bg-white
            p-6
            shadow
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-xl
          "
        >
          <div className="mb-4 flex items-center">
            <FaShoppingCart
              className="
                mr-3
                text-2xl
                text-blue-600
                transition-all
                duration-300
                group-hover:scale-125
                group-hover:rotate-12
              "
            />

            <h2 className="text-xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
              Product Sales
            </h2>
          </div>

          <p className="text-slate-500">
            Total Sales This Month
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800 transition-all duration-300 group-hover:scale-105 group-hover:text-blue-600">
            $18,450
          </h3>
        </div>

        {/* Orders */}
        <div
          className="
            group
            cursor-pointer
            rounded-xl
            bg-white
            p-6
            shadow
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-xl
          "
        >
          <div className="mb-4 flex items-center">
            <FaClipboardList
              className="
                mr-3
                text-2xl
                text-green-600
                transition-all
                duration-300
                group-hover:scale-125
                group-hover:rotate-6
              "
            />

            <h2 className="text-xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-green-600">
              Orders
            </h2>
          </div>

          <p className="text-slate-500">
            Total Orders
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800 transition-all duration-300 group-hover:scale-105 group-hover:text-green-600">
            358
          </h3>
        </div>

        {/* Reports */}
        <div
          className="
            group
            cursor-pointer
            rounded-xl
            bg-white
            p-6
            shadow
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-xl
          "
        >
          <div className="mb-4 flex items-center">
            <FaChartBar
              className="
                mr-3
                text-2xl
                text-purple-600
                transition-all
                duration-300
                group-hover:scale-125
                group-hover:rotate-6
              "
            />

            <h2 className="text-xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-purple-600">
              Reports
            </h2>
          </div>

          <p className="text-slate-500">
            Monthly Revenue
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800 transition-all duration-300 group-hover:scale-105 group-hover:text-purple-600">
            $54,200
          </h3>
        </div>
      </div>

      {/* Recent Orders */}
      <div
        className=" overflow-hidden rounded-xl bg-white shadow transition-all duration-300 hover:shadow-xl
        "
      >
        <div className="border-b p-5">
          <h2 className="text-xl font-bold text-slate-800 transition-colors duration-300 hover:text-blue-600">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left font-semibold text-slate-700">
                  Order ID
                </th>

                <th className="p-4 text-left font-semibold text-slate-700">
                  Customer
                </th>

                <th className="p-4 text-left font-semibold text-slate-700">
                  Product
                </th>

                <th className="p-4 text-left font-semibold text-slate-700">
                  Amount
                </th>

                <th className="p-4 text-left font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className=" cursor-pointer border-t transition-all duration-300 hover:scale-[1.01] hover:bg-blue-50
                  "
                >
                  <td className="p-4 font-medium text-slate-700">
                    {order.id}
                  </td>

                  <td className="p-4 text-slate-600">
                    {order.customer}
                  </td>

                  <td className="p-4 text-slate-600">
                    {order.product}
                  </td>

                  <td className="p-4 font-semibold text-slate-700">
                    {order.amount}
                  </td>

                  <td className="p-4">
                    <span
                      className={` inline-block rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 hover:scale-110
                        ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}