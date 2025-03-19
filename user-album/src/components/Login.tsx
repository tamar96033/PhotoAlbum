import { useState } from "react";
import { useApiClient } from "../contexts/ApiClientContext";
import { LoginUserDto } from "../api/client";

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const user: LoginUserDto = {
    name: name,
    password: password
  }
  const response = useApiClient()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await response.login(user); // ✅ Use the client
      console.log('response', r);

    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
export default Login