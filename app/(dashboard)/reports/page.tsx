"use client";

const reports = [
  {
    id: 1,
    title: "Monthly Sales Report",
    type: "Sales",
    date: "Jul 2026",
    status: "Completed",
  },
  {
    id: 2,
    title: "Inventory Report",
    type: "Inventory",
    date: "Jul 2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Customer Report",
    type: "Customer",
    date: "Jul 2026",
    status: "Completed",
  },
  {
    id: 4,
    title: "Revenue Report",
    type: "Revenue",
    date: "Jul 2026",
    status: "Pending",
  },
];

export default function ReportsPage() {
  return (
    <section className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-3xl font-bold text-slate-800">
          Reports
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          + Generate Report
        </button>
      </div>

      <section className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Report</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className=" hover:bg-slate-50">
                <td className="p-4">{report.id}</td>

                <td className="p-4">{report.title}</td>

                <td className="p-4">{report.type}</td>

                <td className="p-4">{report.date}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      report.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="mr-2 text-blue-600 hover:underline">
                    View
                  </button>

                  <button className="text-green-600 hover:underline">
                    Download
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