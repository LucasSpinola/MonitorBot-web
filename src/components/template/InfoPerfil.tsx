import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';
import { useState } from 'react';
import AvatarUsuario from "../template/AvatarUsuario";

export default function InfoPerfil() {
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState(Cookies.get('username') || '');
    const [id_discord, setIdDiscord] = useState(Cookies.get('id_discord') || '');
    const [avatar, setAvatar] = useState(Cookies.get('avatar') || '');

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        Cookies.set('username', username);
        Cookies.set('id_discord', id_discord);
        Cookies.set('avatar', avatar);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-300 shadow-md rounded-md p-6 mt-8">
            <div className="flex justify-center items-center mb-4">
                <AvatarUsuario src={avatar} size="xl" className="mr-4" />
                {editing && (
                    <div>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    </div>
                )}
            </div>
            <h2 className="text-xl font-bold mb-6 text-center dark:text-black">Informações do Perfil</h2>
            <div className="space-y-4">
                <div className={`flex items-center ${editing ? 'mb-4' : ''} dark:text-black`}>
                    <strong>Username:</strong> {editing ? <input value={username} onChange={(e) => setUsername(e.target.value)} className="ml-2 border border-gray-300 p-1" /> : username}
                </div>
                <div className={`flex items-center ${editing ? 'mb-4' : ''} dark:text-black`}>
                    <strong>ID Discord:</strong> {editing ? <input value={id_discord} onChange={(e) => setIdDiscord(e.target.value)} className="ml-2 border border-gray-300 p-1" /> : id_discord}
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                {editing ? (
                    <Button onClick={handleSave} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white">Salvar</Button>
                ) : (
                    <Button onClick={handleEdit} className="px-8 py-2 bg-gray-500 hover:bg-gray-600 text-white">Editar</Button>
                )}
            </div>
        </div>
    );
}