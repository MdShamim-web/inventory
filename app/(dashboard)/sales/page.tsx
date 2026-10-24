"use client";

const sales = [
  {
    id: 1,
    invoice: "#INV-1001",
    customer: "John Doe",
    amount: "$250",
    status: "Paid",
  },
  {
    id: 2,
    invoice: "#INV-1002",
    customer: "Sarah Smith",
    amount: "$180",
    status: "Pending",
  },
  {
    id: 3,
    invoice: "#INV-1003",
    customer: "David Wilson",
    amount: "$320",
    status: "Paid",
  },
  {
    id: 4,
    invoice: "#INV-1004",
    customer: "Emma Brown",
    amount: "$145",
    status: "Cancelled",
  },
];

export default function SalesPage() {
  return (
    <section className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-3xl font-bold text-slate-800">
          Sales
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          + New Sale
        </button>
      </div>

      <section className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{sale.id}</td>
                <td className="p-4">{sale.invoice}</td>
                <td className="p-4">{sale.customer}</td>
                <td className="p-4">{sale.amount}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      sale.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : sale.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="mr-2 text-blue-600 hover:underline">
                    View
                  </button>

                  <button className="text-green-600 hover:underline">
                    Invoice
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