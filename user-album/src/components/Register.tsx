import { useEffect, useState } from "react";
import { RegisterUserDto } from "../api/client"
// import { useApiClient } from "../contexts/ApiClientContext";
import { Stack, TextField, Button, Paper, Typography } from "@mui/material";
import { useApiClient } from "../contexts/ApiClientContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');
    const [token, setToken] = useState<string | null>(null)
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const apiClient = useApiClient()

    useEffect(() => {

        if (token != null) {
            console.log(token);
            localStorage.setItem('token', token!)
            navigate("/");

        }
    }, [token, navigate])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const userDto = new RegisterUserDto({
            name,
            email,
            password,
            roleName
        });

        try {
            const response = await apiClient.register(userDto)

            console.log('response.token', response.token);
            setToken(response.token)
        }
        catch (err: any) {
            setError(err.message);
            console.error('register failed:', err);
        }

    }
    return (<>
        <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
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
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </Stack>
            </form>
        </Paper>
    </>)
}

export default Register