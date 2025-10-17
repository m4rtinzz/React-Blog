import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    username: string;
}

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean; // Manter para facilidade de uso
    login: (username: string, pass: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('blog_user') !== null;
    });
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('blog_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('blog_user', JSON.stringify(currentUser));
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('blog_user');
            setIsAuthenticated(false);
        }
    }, [currentUser]);

    const login = async (username: string, pass: string): Promise<boolean> => {
        // Simulação: validamos o username contra a API e usamos uma senha fixa ('password').
        if (pass !== 'password') {
            return false;
        }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                console.error('Falha ao buscar usuários da API');
                return false;
            }
            const users: User[] = await response.json();
            
            const foundUser = users.find(apiUser => apiUser.username === username);

            if (foundUser) {
                setCurrentUser({ id: foundUser.id, username: foundUser.username });
                return true;
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
        return false; // Retorna false se o usuário não for encontrado ou em caso de erro.
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};