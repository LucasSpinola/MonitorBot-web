import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth();

    return (
        <Link href="/perfil">
            <Avatar className={`
                h-10 w-10 rounded-full cursor-pointer
                ${props.className}
            `}>
                <AvatarImage src={"https://github.com/shadcn.png"} />
                <AvatarFallback>{usuario?.username}</AvatarFallback>
            </Avatar>
        </Link>
    );
}