import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import api from '../../services/api'; // Importe a API aqui

const CriarAlunoDialog = ({ onConfirmCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newAlunoData, setNewAlunoData] = useState({
    nome: '',
    matricula: '',
    turma: '',
    sub_turma: '',
    id_discord: '',
  });

  const handleInputChange = (e, field) => {
    setNewAlunoData({ ...newAlunoData, [field]: e.target.value });
  };

  const handleCreateConfirmation = async () => {
    try {
      await api.post(`/alunos/cria_aluno/`, newAlunoData);
      onConfirmCreate(newAlunoData);
      setNewAlunoData({
        nome: '',
        matricula: '',
        turma: '',
        sub_turma: '',
        id_discord: '',
      });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
    }
  };

  return (
    <>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTrigger asChild>
          <Button className={`bg-green-700 hover:bg-green-500`} onClick={() => setIsOpen(true)}>
            Criar Aluno
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-300">
          <DialogHeader>
            <DialogTitle className='flex justify-center'><strong>Criar Aluno</strong></DialogTitle>
            <DialogDescription className='text-xs py-2 flex justify-center'>
              Preencha os campos abaixo para criar um novo aluno.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                <strong>Nome:</strong>
              </Label>
              <Input
                id="nome"
                value={newAlunoData.nome}
                onChange={(e) => handleInputChange(e, 'nome')}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="matricula" className="text-right">
                <strong>Matrícula:</strong>
              </Label>
              <Input
                id="matricula"
                value={newAlunoData.matricula}
                onChange={(e) => handleInputChange(e, 'matricula')}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="turma" className="text-right">
                <strong>Turma:</strong>
              </Label>
              <Input
                id="turma"
                value={newAlunoData.turma}
                onChange={(e) => handleInputChange(e, 'turma')}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sub_turma" className="text-right">
                <strong>Sub Turma:</strong>
              </Label>
              <Input
                id="sub_turma"
                value={newAlunoData.sub_turma}
                onChange={(e) => handleInputChange(e, 'sub_turma')}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id_discord" className="text-right">
                <strong>ID Discord:</strong>
              </Label>
              <Input
                id="id_discord"
                value={newAlunoData.id_discord}
                onChange={(e) => handleInputChange(e, 'id_discord')}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className='bg-blue-700 hover:bg-blue-500 w-full' variant={'outline'} onClick={handleCreateConfirmation}>
              <strong>Criar Aluno</strong>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CriarAlunoDialog;
