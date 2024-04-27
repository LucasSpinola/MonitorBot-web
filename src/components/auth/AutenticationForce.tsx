import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../data/hook/useAuth';
import Head from 'next/head';
import Image from 'next/image';
import loading from '../../../public/images/loading.gif';

export default function ForcarAutenticacao(props) {
    const { usuario, carregando } = useAuth();
    const router = useRouter();
    const [verificandoToken, setVerificandoToken] = useState(true);

    useEffect(() => {
        if (!carregando && !usuario?.email) {
            router.push('/login');
        }
        setTimeout(() => {
            setVerificandoToken(false);
        }, 1000);
    }, [carregando, usuario, router]);

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("admin-template-cod3r-auth")) {
                                    window.location.href = "/login";
                                }
                            `,
                        }}
                    />
                </Head>
                {props.children}
            </>
        );
    }

    function renderizarCarregando() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loading} alt="loading" />
            </div>
        );
    }

    if (verificandoToken) {
        return renderizarCarregando(); // Mostra tela de carregamento enquanto verifica o token
    } else {
        return renderizarConteudo(); // Mostra o conteúdo após verificar o token
    }
}
