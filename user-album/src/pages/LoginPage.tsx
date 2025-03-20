import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";

const LoginPage = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
  
    const handleLogin = () => {
      setLogin(!login);
      setRegister(false);
    };
  
    const handleRegister = () => {
      setRegister(!register);
      setLogin(false);
    };
  
    return (
    //   <Stack
    //     alignItems="center"
    //     justifyContent="center"
    //     height="100vh"
    //     bgcolor="#f5f5f5"
    //   >
        <Card sx={{ width: 400, p: 3, borderRadius: 3, boxShadow: 5 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Welcome
            </Typography>
  
            <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
              <Button
                variant={login ? "contained" : "outlined"}
                onClick={handleLogin}
                fullWidth
              >
                Login
              </Button>
              <Button
                variant={register ? "contained" : "outlined"}
                onClick={handleRegister}
                fullWidth
              >
                Register
              </Button>
            </Stack>
  
            {login && <Login />}
            {register && <Register />}
          </CardContent>
        </Card>
    //   </Stack>
    );
  };

export default LoginPage


// import { FormEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/AuthService';
// import { useAuth } from '../hooks/useAuth';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     console.log('arrived to LoginPage to handleSubmit');
    
//     e.preventDefault();
//     const user = await login(email, password);
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       navigate('/gallery');
//     } else {
//       alert('ההתחברות נכשלה');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
//       <button type="submit">התחבר</button>
//     </form>
//   );
// }
