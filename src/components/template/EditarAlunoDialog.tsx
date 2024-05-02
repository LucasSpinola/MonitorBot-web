import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import IconeEdita from '../icons/editar';

const EditarAlunoDialog = ({ aluno, onConfirmEdit }) => {
  const [editedData, setEditedData] = useState({
    nome: aluno.nome,
    matricula: aluno.matricula,
    turma: aluno.turma,
    sub_turma: aluno.sub_turma,
    id_discord: aluno.id_discord,
  });

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleEditConfirmation = () => {
    onConfirmEdit(editedData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="flex items-center justify-center">
          <Button className={`bg-yellow-600 hover:bg-yellow-300`}>
            <span className="flex justify-center">
              <IconeEdita width={6} height={5} marginRight="0.1rem" />
            </span>
            Editar
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-300">
        <DialogHeader>
          <DialogTitle className='flex justify-center'><strong>Editar Aluno</strong></DialogTitle>
          <DialogDescription className='text-xs py-2'>
            Faça as alterações necessárias nos campos abaixo e clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              <strong>Nome:</strong>
            </Label>
            <Input
              id="nome"
              value={editedData.nome}
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
              value={editedData.matricula}
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
              value={editedData.turma}
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
              value={editedData.sub_turma}
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
              value={editedData.id_discord}
              onChange={(e) => handleInputChange(e, 'id_discord')}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='bg-blue-700 hover:bg-blue-500 w-full' variant={'outline'} onClick={handleEditConfirmation}>
            <strong>Salvar Alterações</strong>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EditarAlunoDialog;