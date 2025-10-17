import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (user: string, pass: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', String(isAuthenticated));
    }, [isAuthenticated]);

    const login = async (user: string, pass: string): Promise<boolean> => {
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
            const users: { username: string }[] = await response.json();
            
            const foundUser = users.find(apiUser => apiUser.username === user);

            if (foundUser) {
                setIsAuthenticated(true);
                return true;
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
        return false; // Retorna false se o usuário não for encontrado ou em caso de erro.
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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