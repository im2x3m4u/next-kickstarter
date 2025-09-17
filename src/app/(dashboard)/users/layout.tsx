import AdminLayout from "@/app/components/layout/layout"
import UserManagementPage from "./page"

export default function UsersLayout() {
  return (
    <AdminLayout>
      <UserManagementPage />
    </AdminLayout>
  )
}
