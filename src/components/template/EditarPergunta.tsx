import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import IconeEdita from '../icons/editar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

const EditarPerguntaDialog = ({ uuid, pergunta, onConfirmEdit, onClose }) => {
    const [editedData, setEditedData] = useState({
      uuid: uuid,
      pergunta: pergunta.pergunta,
      resposta: pergunta.resposta,
    });
    

    const handleConfirmEdit = async () => {
      try {
        const response = await api.put(`/perguntas/edita_pergunta/${uuid}`, editedData);
        if (response.status === 200) {
          onConfirmEdit(uuid);
          window.location.reload();
          toast.success('Pergunta editada com sucesso.', { position: "top-center" });
        } else {
          toast.error('Erro ao editar pergunta.');
        }
      } catch (error) {
        console.error('Erro ao editar pergunta:', error);
        toast.error('Erro ao editar pergunta.');
      }
    }

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
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
          <DialogTitle className='flex justify-center'><strong>Editar Pergunta</strong></DialogTitle>
          <DialogDescription className='text-xs py-2'>
            Faça as alterações necessárias nos campos abaixo e clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uuid" className="text-right">
              <strong>UUID:</strong>
            </Label>
            <Input
              id="uuid"
              value={editedData.uuid}
              onChange={(e) => handleInputChange(e, 'uuid')}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pergunta" className="text-right">
              <strong>Pergunta:</strong>
            </Label>
            <Input
              id="pergunta"
              value={editedData.pergunta}
              onChange={(e) => handleInputChange(e, 'pergunta')}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resposta" className="text-right">
              <strong>Resposta:</strong>
            </Label>
            <Input
              id="resposta"
              value={editedData.resposta}
              onChange={(e) => handleInputChange(e, 'resposta')}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='bg-blue-700 hover:bg-blue-500 w-full' variant={'outline'} onClick={handleConfirmEdit}>
            <strong>Salvar Alterações</strong>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditarPerguntaDialog;
