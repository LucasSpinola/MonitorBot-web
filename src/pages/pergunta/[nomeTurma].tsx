import { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/template/Layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/router';

const PerguntaDetalhes = () => {
  const router = useRouter();
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const response = await api.get(`/perguntas/lista_perguntas`);
        setPerguntas(Object.values(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os dados das perguntas:', error);
        setLoading(false);
      }
    };

    fetchPerguntas();
  }, []);

  if (loading) {
    return <Layout><p>Carregando...</p></Layout>;
  }

  if (!perguntas || perguntas.length === 0) {
    return <Layout><p>Não há dados de perguntas disponíveis.</p></Layout>;
  }

  return (
      <div className="overflow-x-auto flex flex-grow-0 h-screen">
        <Table className="max-w-full">
          <TableHeader>
            <TableRow>
              <TableCell>Pergunta</TableCell>
              <TableCell>Resposta</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perguntas.map((pergunta) => (
              <TableRow key={pergunta.id}>
                <TableCell className="max-w-xs truncate">{pergunta.pergunta}</TableCell>
                <TableCell className="max-w-xs truncate">{pergunta.resposta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
};

export default PerguntaDetalhes;
