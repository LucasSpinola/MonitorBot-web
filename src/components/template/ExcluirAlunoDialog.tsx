import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const ExcluirAlunoDialog = ({ matricula, onConfirmDelete, onClose }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirmDelete = () => {
    onConfirmDelete(matricula);
    setIsConfirmationOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-red-600 hover:bg-red-400' variant="destructive"  onClick={() => setIsConfirmationOpen(true)}>Excluir</Button>
      </DialogTrigger>
      {isConfirmationOpen && (
        <DialogContent  className='bg-gray-300 border border-black rounded-lg'>
          <DialogHeader>
            <DialogTitle className='dark:text-white border'>Confirmar Exclusão</DialogTitle>
            <DialogDescription>Tem certeza de que deseja excluir este aluno?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className='bg-blue-600 hover:bg-blue-400' onClick={handleConfirmDelete} variant={'outline'}><strong>Confirmar</strong></Button>
        <Button className='bg-red-600 hover:bg-red-400' onClick={onClose} variant={'outline'}><strong>Cancelar</strong></Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ExcluirAlunoDialog;
