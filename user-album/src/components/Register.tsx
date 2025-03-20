import { useState } from "react";
import { RegisterUserDto } from "../api/client"
import { useApiClient } from "../contexts/ApiClientContext";
import { Stack, TextField, Button, Paper } from "@mui/material";

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');

    const apiClient = useApiClient()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Create an instance of RegisterUserDto
        const userDto = new RegisterUserDto({
            name,
            email,
            password,
            roleName
        });

        try {
            const response = await apiClient.register(userDto)
            console.log('response', response);
        }
        catch (error: any) {
            console.log(error.message);
        }

    }
    return (<>
        <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
            {/* <Typography variant="h5" align="center" mb={3}>
        Register
      </Typography> */}
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Role Name"
                        variant="outlined"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" fullWidth>
                        Register
                    </Button>
                </Stack>
            </form>
        </Paper>
    </>)
}

export default Register