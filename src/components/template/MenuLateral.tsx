/* eslint-disable @next/next/no-img-element */
import { IconeHome, IconePergunta, IconePresence, IconeTurmas, IconeUnidades, IconeMiniteste, IconeNarrativo, IconeLogs, IconeSair } from "../icons";
import MenuItem from "./MenuItem";
import useAuth from "../../data/hook/useAuth";
import logoPadrao  from '../../../public/logobot2.svg'
import Image from 'next/image'
import AppContext from '../../data/context/AppContext';
import { useContext } from "react";
import logoBranca from '../../../public/logobrancas3.svg'
export default function MenuLateral() {
    const { logout } = useAuth();
    const {tema} = useContext(AppContext);
    return (
        <aside className={`
            flex flex-col p-2
            bg-gray-200 text-gray-800
            dark:bg-black dark:text-white 
        `}>
            <div className={`dark:bg-white mt-5 mb-5`} />
            <Image
                src={tema === 'dark' ? logoBranca : logoPadrao}
                alt={tema === 'dark' ? 'Logo Branca' : 'Logo Padrão'}
                width={85}
                height={100}
            />
            <ul className={`flex-grow`}>
                <MenuItem url="/" texto="Início" icone={IconeHome} />
                <MenuItem url="/turmas" texto="Turmas" icone={IconeTurmas} />
                <MenuItem url="/perguntas" texto="Perguntas" icone={IconePergunta} />
                <MenuItem url="/presenca" texto="Presença" icone={IconePresence} />
                <MenuItem url="/unidades" texto="Unidades" icone={IconeUnidades} />
                <MenuItem url="/miniteste" texto="Miniteste" icone={IconeMiniteste} />
                <MenuItem url="/narrativo" texto="Narrativo" icone={IconeNarrativo} />
                <MenuItem url="/logs" texto="Logs" icone={IconeLogs} />
            </ul>
            <ul>
                <MenuItem className={`text-red-600 dark:text-red-400 hover:bg-red-400 hover:text-white dark:hover:text-white`} onClick={logout} texto="Sair" icone={IconeSair} />
            </ul>
        </aside>
    );
    }