import BotaoAlternarTema from "./BotaoAlternarTema";
import Title from "./Title";
import useAppData from "../../data/hook/useAppData";
import AvatarUsuario from "../template/AvatarUsuario";
import Cookies from 'js-cookie';
import useAuth from "../../data/hook/useAuth";

interface HeaderProps {
    titulo: string;
    subtitulo: string;
}	

export default function Header(props: HeaderProps) {
    const { tema, alternarTema } = useAppData();
    const { usuario } = useAuth();

    const username = Cookies.get('username');

    return (
        <div className={`flex items-center justify-between `}>
            <div className="flex items-center flex-grow" >
                <Title titulo={props.titulo} subtitulo={props.subtitulo} className="text-2xl font-bold text-white text-center " />
            </div>
            <div className="flex items-center justify-center">
                <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
                <div className="ml-3 dark:text-white text-xl">{username}</div>
                <AvatarUsuario className="ml-3" />
            </div>
        </div>
    );
}