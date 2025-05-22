import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";

export function UserNav() {
  const navigate = useNavigate();

  return (
    <DropdownMenu.Root >
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-56" side="bottom" align="end" sideOffset={5}>
        <div className="p-3">
          <p className="text-sm font-medium leading-none">User</p>
          <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
        </div>
        <DropdownMenu.Item onSelect={() => navigate("/dashboard/profile")}>
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => navigate("/dashboard/settings")}>
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={() => navigate("/login")}>Log out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}