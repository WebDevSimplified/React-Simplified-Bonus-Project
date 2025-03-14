import { Outlet } from "react-router"

export function AuthLayout() {
  return (
    <div className="flex justify-center items-center h-full">
      <Outlet />
    </div>
  )
}
