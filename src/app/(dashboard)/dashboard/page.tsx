import AdminLayout from "@/app/components/layout/layout"

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="h-32 rounded-lg bg-gray-200" />
        <div className="h-32 rounded-lg bg-gray-200" />
        <div className="h-32 rounded-lg bg-gray-200" />
      </div>
      <div className="h-48 rounded-lg bg-gray-200" />
    </AdminLayout>
  )
}
