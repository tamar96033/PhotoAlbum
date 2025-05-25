// import { useEffect, useState } from "react";
// import { useApiClient } from "../../contexts/ApiClientContext";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";

// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import { useNavigate } from "react-router-dom";
// import { User } from "../../api/client";

// export function UserNav() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<User>()
//   const apiClient = useApiClient()
//   const token = "Bearer " + localStorage.getItem('token')

//   useEffect(()=>{
//     const fetchUser=async ()=>{
//       console.log(user)
//       const response = await apiClient.getUserByToken(token)
//       setUser(response)
//       console.log(response)
//     }
//     fetchUser()
//   }, [])

//   return (
//     <DropdownMenu.Root >
//       <DropdownMenu.Trigger asChild>
//         <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
//             <AvatarFallback>{user?.name?.[0] ?? 'U'}</AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenu.Trigger>

//       <DropdownMenu.Content className="w-56" side="bottom" align="end" sideOffset={5}>
//         <div className="p-3">
//           <p className="text-sm font-medium leading-none">{user?.name ?? 'User'}</p>
//           <p className="text-xs leading-none text-muted-foreground">{user?.email ?? 'user@example.com'}</p>
//         </div>
//         <DropdownMenu.Item onSelect={() => navigate("/dashboard/profile")}>
//           Profile
//         </DropdownMenu.Item>
//         <DropdownMenu.Item onSelect={() => navigate("/dashboard/settings")}>
//           Settings
//         </DropdownMenu.Item>
//         <DropdownMenu.Separator />
//         <DropdownMenu.Item onSelect={() => navigate("/login")}>Log out</DropdownMenu.Item>
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   );
// }

import { useEffect, useState } from "react"
import { useApiClient } from "../../contexts/ApiClientContext"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { User } from "../../api/client"

export function UserNav() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>()
  const apiClient = useApiClient()
  const token = "Bearer " + localStorage.getItem("token")

  useEffect(() => {
    const fetchUser = async () => {
      const response = await apiClient.getUserByToken(token)
      setUser(response)
    }
    fetchUser()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name ?? "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? "user@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={() => navigate("/login")}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}