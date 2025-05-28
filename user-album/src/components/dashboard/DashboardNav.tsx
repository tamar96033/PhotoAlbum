import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Home, ImageIcon, FolderOpen, Upload, LogOut } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardNav() {
  // ב-Vite+React בלי Next.js אפשר להשתמש ב-react-router
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()

  const navItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: <Home className="mr-2 h-4 w-4" /> },
    { title: "All Photos", href: "/dashboard/photos", icon: <ImageIcon className="mr-2 h-4 w-4" /> },
    { title: "Albums", href: "/dashboard/albums", icon: <FolderOpen className="mr-2 h-4 w-4" /> },
    // { title: "Tags", href: "/dashboard/tags", icon: <Tag className="mr-2 h-4 w-4" /> },
    { title: "Upload", href: "/dashboard/upload", icon: <Upload className="mr-2 h-4 w-4" /> },
    // { title: "Settings", href: "/dashboard/settings", icon: <Settings className="mr-2 h-4 w-4" /> },
  ]

  const handleClickLogout = () => {
    console.log('logout');
    localStorage.setItem('token', '')
    navigate('/')
  }

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link key={index} to={item.href}>
          <span
            className={cn(
              "btn-ghost justify-start flex items-center px-3 py-2 rounded-md", // מחליף buttonVariants
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
          >
            {item.icon}
            {item.title}
          </span>
        </Link>
      ))}
      <Button variant="ghost" className="justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500 flex items-center" onClick={handleClickLogout}>
        <LogOut className="mr-2 h-4 w-4"/>
        Logout
      </Button>
    </nav>
  )
}