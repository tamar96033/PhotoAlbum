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
