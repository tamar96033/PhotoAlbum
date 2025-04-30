import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const NavBar = () => {
    return (
        <AppBar position="absolute" color="default" elevation={1} sx={{ top: 16, right: 16, left: 'auto', width: 'auto' }}>
            <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
                <Box display="flex" gap={2}>
                    <Button component={Link} to="/" color="primary">דף הבית</Button>
                    <Button component={Link} to="/pictures" color="primary">תמונות</Button>
                    <Button component={Link} to="/albums" color="primary">אלבומים</Button>
                    <Button component={Link} to="/tags" color="primary">תגים</Button>
                </Box>
                <Button component={Link} to="/login" variant="outlined" color="primary">
                    התחברות
                </Button>
                <ProfileMenu/>
            </Toolbar>


        </AppBar>


    );
};

export default NavBar;