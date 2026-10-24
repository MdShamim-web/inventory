"use client";

const orders = [
  {
    id: 1,
    orderId: "#ORD-1001",
    customer: "John Doe",
    total: "$250",
    status: "Completed",
  },
  {
    id: 2,
    orderId: "#ORD-1002",
    customer: "Sarah Smith",
    total: "$180",
    status: "Pending",
  },
  {
    id: 3,
    orderId: "#ORD-1003",
    customer: "David Wilson",
    total: "$320",
    status: "Cancelled",
  },
  {
    id: 4,
    orderId: "#ORD-1004",
    customer: "Emma Brown",
    total: "$145",
    status: "Completed",
  },
];

export default function OrdersPage() {
  return (
    <section className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-3xl font-bold text-slate-800">
          Orders
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          + Add Order
        </button>
      </div>

      <section className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{order.id}</td>

                <td className="p-4">{order.orderId}</td>

                <td className="p-4">{order.customer}</td>

                <td className="p-4">{order.total}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="mr-2 text-blue-600 hover:underline">
                    View
                  </button>

                  <button className="text-red-600 hover:underline">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}