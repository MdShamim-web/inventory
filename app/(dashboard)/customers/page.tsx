"use client";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1 987 654 321",
    status: "Active",
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 456 789 123",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 555 222 111",
    status: "Active",
  },
];

export default function CustomersPage() {
  return (
    <section className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-3xl font-bold text-slate-800">
          Customers
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          + Add Customer
        </button>
      </div>

      <section className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{customer.id}</td>

                <td className="p-4">
                  <div className="font-medium">{customer.name}</div>
                </td>

                <td className="p-4">{customer.email}</td>

                <td className="p-4">{customer.phone}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="mr-2 text-blue-600 hover:underline">
                    Edit
                  </button>

                  <button className="text-red-600 hover:underline">
                    Delete
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