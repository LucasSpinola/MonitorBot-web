import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Usuario from '../../models/Usuario';
import api from '../../services/api';
import { loginApi, getPerfilUsuario } from '../../services/loginapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthContextProps {
    usuario?: Usuario;
    carregando?: boolean;
    cadastrar?: (email: string, username: string, id_discord: string, senha: string) => Promise<void>;
    login?: (email: string, senha: string) => Promise<void>;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function gerenciarCookie(logado: boolean | string) {
    if (logado) {
        Cookies.set('admin-template-cod3r-auth', logado as string, {
            expires: 7,
        });
    } else {
        Cookies.remove('admin-template-cod3r-auth');
    }
}

export function AuthProvider(props: { children: React.ReactNode }) {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
    const router = useRouter();

    async function configurarSessao(email: string) {
        if (email) {
            const novoUsuario: Usuario = {
                email: email || '', 
                username: usuario?.username || '', 
                id_discord: usuario?.id_discord || '',
                token: '',
                imagemUrl: ''
            };
            setUsuario(novoUsuario);
            gerenciarCookie(true);
            setCarregando(false);
        } else {
            setUsuario(undefined);
            gerenciarCookie(false);
            setCarregando(false);
        }
    }

    async function cadastrar(email: string, username: string, id_discord: string, senha: string) {
        try {
            setCarregando(true);
            const response = await api.post('/users/adiciona', { email, username, id_discord, senha });
            configurarSessao(email);
            router.push('/login');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        } finally {
            setCarregando(false);
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true);
            const response = await loginApi(email, senha);
            const { token, ...userData } = response.data;
            userData.token = token;
            await getPerfilUsuario(email, senha);
            configurarSessao(userData);
            router.push("/");
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            toast.error('Erro ao fazer login. Por favor, tente novamente.', { position: "top-right" });
        } finally {
            setCarregando(false);
        }
    }

    async function logout() {
        try {
            setCarregando(true);
            setUsuario(undefined);
            gerenciarCookie(false);
            router.push('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        const usuarioLogado = Cookies.get('admin-template-cod3r-auth');
        if (usuarioLogado) {
            configurarSessao(usuarioLogado);
        } else {
            setCarregando(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, carregando, cadastrar, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
