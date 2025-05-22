import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

interface ProfileMenuProps {
  userName: string;
  onLogout: () => void;
}

const ProfileMenu = ({ userName, onLogout }: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const firstLetter = userName?.charAt(0).toUpperCase() || "?";

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
          {firstLetter}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>{userName}</MenuItem>
        <MenuItem onClick={onLogout}>התנתק</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;