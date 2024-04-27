import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "/public/logobot2.svg"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router";
import AuthContext from "../../data/context/AuthContext";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useContext } from "react"
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { carregando, login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || senha.trim() === '') {
      toast.error('Por favor, preencha todos os campos.', { position: "top-right" });
      return;
    }
    try {
      await login(email, senha);
    } catch (error) {
      toast.error('Erro ao fazer login. Por favor, tente novamente.', { position: "top-right" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px] border border-gray-400 rounded-lg">
        <CardContent>
          <div className="flex justify-center items-center mb-4">
            <Image src={Logo} alt="Logo" height={200} width={160} />
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha:</Label>
                <Input id="password" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="********" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-blue-600 hover:bg-blue-400" type="submit">Entrar</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <CardDescription className="text-center center-content"> 
            Não tem uma conta? <a href="cadastro" className="text-blue-500 p-1">Cadastre-se</a>
          </CardDescription>
        </CardFooter>
      </Card>
      <ToastContainer position="top-center" />
    </div>
  );
}