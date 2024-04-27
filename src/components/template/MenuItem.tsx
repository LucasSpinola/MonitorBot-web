import Link from "next/link";

interface MenuItemProps {
    texto: string
    icone: any
    url?: string
    className?: string
    onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    function renderLink(){
        return(
            <a className={`flex flex-col justify-center items-center h-20 w-20 mt-5 dark:text-gray-200 ${props.className}`}>
                {props.icone}
                <span className={`text-ms font-light`}>{props.texto}</span>
            </a>
        )
    }
    return (
        <li onClick={props.onClick} className={`hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-900`}>
            {props.url ? (
                <Link href={props.url} legacyBehavior>
                {renderLink()}
            </Link>
            ) : (
                renderLink()
            )}
            
        </li>
    )
}	