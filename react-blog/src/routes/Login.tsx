import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); // Limpa erros anteriores
        const isLoggedIn = await auth.login(username, password);

        if (isLoggedIn) {
            navigate(from, { replace: true });
        } else {
            setError('Usuário ou senha inválidos.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login do Autor</h2>
                <p>Use seu username + "password".</p>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;