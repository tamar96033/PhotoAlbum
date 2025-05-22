import { DashboardNav } from "./DashboardNav"
import { UserNav } from "./UserNav"
import { MobileNav } from "./MobileNav"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2 md:hidden">
              <MobileNav />
            </div>
            <div className="hidden md:flex">
              <span className="text-xl font-bold">PhotoCloud</span>
            </div>
            <UserNav />
          </div>
        </header>
  
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
            <Outlet />
          </main>
        </div>
      </div>
    )
  }
  
  export default DashboardLayout
  