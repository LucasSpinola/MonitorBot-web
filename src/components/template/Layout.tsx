import Conteudo from "./Conteudo";
import Header from "./Header";
import MenuLateral from "./MenuLateral";
import useAppData from '../../data/hook/useAppData'
import Footer from "./Footer";
import ForcarAutenticacao from "../auth/AutenticationForce";

interface LayoutProps {
    titulo?: string;
    subtitulo?: string;
    children?: any;
}	

export default function Layout(props: LayoutProps) {
    const { tema } = useAppData()
    
    return (
        <ForcarAutenticacao>
        <div className={`${tema} flex h-screen`}>
            <MenuLateral />
            <div className={`flex flex-col w-full p-10 bg-gray-300 dark:bg-zinc-950`}>
                <Header titulo={props.titulo} subtitulo={props.subtitulo} />
                <Conteudo>
                    {props.children}
                </Conteudo>
                <div className={`flex justify-center items-end mt-auto`}><Footer /></div>
            </div>
        </div>
        </ForcarAutenticacao>
    );
}