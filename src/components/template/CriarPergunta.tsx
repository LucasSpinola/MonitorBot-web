import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import IconeCriar from '../icons/criar';

const CriarPerguntaDialog = ({ isOpen, onClose, onConfirmCreate }) => {
  const [novaPergunta, setNovaPergunta] = useState({
    pergunta: '',
    resposta: '',
  });

  const handleInputChange = (e, field) => {
    setNovaPergunta({ ...novaPergunta, [field]: e.target.value });
  };

  const handleCreateConfirmation = async () => {
    try {
      await api.post(`/perguntas/cria_pergunta/`, novaPergunta);
      onConfirmCreate(novaPergunta);
      setNovaPergunta({
        pergunta: '',
        resposta: '',
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar pergunta:', error);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className={`bg-green-700 hover:bg-green-500 w-50`}>
          <span className="flex justify-center p-1">
            <IconeCriar width={6} height={5} marginRight="0.5rem" />
          </span>
          Criar Pergunta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-100">
        <DialogHeader>
          <DialogTitle className='flex justify-center'><strong>Criar Pergunta</strong></DialogTitle>
          <DialogDescription className='text-xs py-2 flex justify-center'>
            Preencha os campos abaixo para criar uma nova pergunta.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="grid grid-cols-1 gap-2 items-center">
            <Label htmlFor="pergunta" className="">
              <strong>Pergunta:</strong>
            </Label>
            <Input
              id="pergunta"
              value={novaPergunta.pergunta}
              onChange={(e) => handleInputChange(e, 'pergunta')}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 items-center">
            <Label htmlFor="resposta" className="mt-1">
              <strong>Resposta:</strong>
            </Label>
            <Input
              id="resposta"
              value={novaPergunta.resposta}
              onChange={(e) => handleInputChange(e, 'resposta')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='bg-blue-700 hover:bg-blue-500 w-full' variant={'outline'} onClick={handleCreateConfirmation}>
            <strong>Criar Pergunta</strong>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CriarPerguntaDialog;
