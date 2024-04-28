import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "/public/logobot2.svg"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { cadastroApi } from "../../services/cadastroApi"; 
import 'react-toastify/dist/ReactToastify.css';

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [idDiscord, setIdDiscord] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || username.trim() === '' || idDiscord.trim() === '' || senha.trim() === '') {
      toast.error('Por favor, preencha todos os campos.', { position: "top-center" });
      return;
    }
    try {
      setLoading(true);
      await cadastroApi(email, username, idDiscord, senha);
      toast.success('Cadastro realizado com sucesso!');
      const redirectTimer = setTimeout(() => {
        router.push("/login");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    } catch (error) {
      toast.error('Erro ao cadastrar. Por favor, tente novamente.', { position: "top-right" });
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px] border border-gray-400 rounded-lg">
        <CardContent>
          <div className="flex justify-center items-center mb-4">
            <Image src={Logo} alt="Logo" height={200} width={160} />
          </div>
          <form onSubmit={handleCadastro}>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email"><strong>Email:</strong></Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username"><strong>Username:</strong></Label>
                <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="idDiscord"><strong>ID Discord:</strong></Label>
                <Input id="idDiscord" type="text" value={idDiscord} onChange={(e) => setIdDiscord(e.target.value)} placeholder="123456" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password"><strong>Senha:</strong></Label>
                <Input id="password" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="********" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-blue-600 hover:bg-blue-400" type="submit" disabled={loading}><strong>Cadastrar</strong></Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <CardDescription className="text-center center-content">
            Já possui uma conta? <a href="login" className="text-blue-500 p-1">Faça Login</a>
          </CardDescription>
        </CardFooter>
      </Card>
      <ToastContainer position="top-center" />
    </div>
  );
}