import { useEffect, useState } from "react";
import { useApiClient } from "../contexts/ApiClientContext";
import { LoginUserDto } from "../api/client";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (token != null) {
      console.log(token);
      localStorage.setItem('token', token!)
      navigate("/");

    }
  }, [token, navigate])

  const user = new LoginUserDto()
  user.name = name
  user.password = password

  const response = useApiClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const r = await response.login(user);
      console.log('response', r);

      setToken(r.token)
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Login failed:', err);
    }
  }

  return (<>
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      {/* <Typography variant="h5" align="center" mb={3}>
      Login
    </Typography> */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Stack>
      </form>
    </Paper>
  </>);
}
export default Login