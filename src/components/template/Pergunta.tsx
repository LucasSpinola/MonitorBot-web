import { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import Layout from '../../components/template/Layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/router';
import EditarPerguntaDialog from '../template/EditarPergunta';
import CriarPerguntaDialog from '../template/CriarPergunta';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExcluirPerguntaDialog from '../template/ExcluirPergunta';
const PerguntaDetalhes = () => {
    const router = useRouter();
    const [perguntas, setPerguntas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [criandoPergunta, setCriandoPergunta] = useState(false);
    const tableRef = useRef(null);
  
    const fetchPerguntas = async () => {
      try {
        const response = await api.get(`/perguntas/lista_perguntas`);
        setPerguntas(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os dados das perguntas:', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPerguntas();
    }, []);
  
    useEffect(() => {
      if (tableRef.current) {
        const tableHeight = tableRef.current.clientHeight;
        const windowHeight = window.innerHeight;
  
        if (tableHeight > windowHeight) {
          tableRef.current.style.overflowY = 'scroll';
          tableRef.current.style.maxHeight = `${windowHeight - 200}px`;
        }
      }
    }, [perguntas]);
  
    const handleEditPergunta = (uuid) => {
      const pergunta = perguntas[uuid];
      if (pergunta) {
        router.push({
          pathname: `/editar-pergunta/${uuid}`,
          query: {
            pergunta: pergunta.pergunta,
            resposta: pergunta.resposta,
            uuid: uuid,
          },
        });
      }
    };
  
    const handleCreatePergunta = async (novaPergunta) => {
      if (criandoPergunta) return;
      try {
        setCriandoPergunta(true);
        await api.post(`/perguntas/cria_pergunta/`, novaPergunta);
        fetchPerguntas();
        toast.success('Pergunta criada com sucesso!');
      } catch (error) {
        console.error('Erro ao criar pergunta:', error);
      } finally {
        setCriandoPergunta(false);
      }
    };
  
    const handleDeletePergunta = async (uuid) => {
      try {
        await api.delete(`/perguntas/deleta_pergunta/${uuid}`);
        fetchPerguntas();
        toast.success('Pergunta excluída com sucesso!', { autoClose: 3000 });
      } catch (error) {
        console.error('Erro ao excluir pergunta:', error);
      }
    };
  
    if (loading) {
      return <p>Carregando...</p>;
    }
  
    if (!perguntas || perguntas.length === 0) {
      return <p>Não há dados de perguntas disponíveis.</p>;
    }
  
    return (
      <div ref={tableRef} style={{ overflowY: 'auto' }}>
        <div className='flex items-end justify-end px-20'>
          <CriarPerguntaDialog onConfirmCreate={handleCreatePergunta} />
        </div>
        <Table className="max-w-full">
          <TableHeader>
            <TableRow>
              <TableCell>UUID</TableCell>
              <TableCell>Pergunta</TableCell>
              <TableCell>Resposta</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(perguntas).map((uuid) => (
              <TableRow key={uuid}>
                <TableCell className="w-[200px]">{uuid}</TableCell>
                <TableCell className="w-[600px]">{perguntas[uuid].pergunta}</TableCell>
                <TableCell className="w-[900px]">{perguntas[uuid].resposta}</TableCell>
                <TableCell className="flex items-center">
                  <ExcluirPerguntaDialog uuid={uuid} onConfirmDelete={handleDeletePergunta} onClose={fetchPerguntas} />
                  <span className="inline-block w-1"></span>
                  <EditarPerguntaDialog uuid={uuid} pergunta={perguntas[uuid]} onConfirmEdit={() => handleEditPergunta(uuid)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default PerguntaDetalhes;