import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Menu, Home, ImageIcon, FolderOpen, Tag, Upload, Settings, LogOut } from "lucide-react"

interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileNav({ className, ...props }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const location = useLocation()
  const pathname = location.pathname

  const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: <Home className="mr-2 h-4 w-4" /> },
    { title: "All Photos", href: "/dashboard/photos", icon: <ImageIcon className="mr-2 h-4 w-4" /> },
    { title: "Albums", href: "/dashboard/albums", icon: <FolderOpen className="mr-2 h-4 w-4" /> },
    { title: "Tags", href: "/dashboard/tags", icon: <Tag className="mr-2 h-4 w-4" /> },
    { title: "Upload", href: "/dashboard/upload", icon: <Upload className="mr-2 h-4 w-4" /> },
    { title: "Settings", href: "/dashboard/settings", icon: <Settings className="mr-2 h-4 w-4" /> },
  ]

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <div className="px-7">
            <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
              <span className="font-bold">PhotoCloud</span>
            </Link>
          </div>
          <div className="flex flex-col gap-3 px-2 py-4">
            {navItems.map((item, index) => (
              <Link key={index} to={item.href} onClick={() => setOpen(false)}>
                <span
                  className={cn(
                    "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium",
                    pathname === item.href ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  {item.icon}
                  {item.title}
                </span>
              </Link>
            ))}
            <Button variant="ghost" className="justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">PhotoCloud</span>
      </Link>
    </div>
  )
}