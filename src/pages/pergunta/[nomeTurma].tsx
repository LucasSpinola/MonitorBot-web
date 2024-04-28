import { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import Layout from '../../components/template/Layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/router';

const PerguntaDetalhes = () => {
  const router = useRouter();
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null); // Ref para a tabela

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

  useEffect(() => {
    // Verifica se a tabela e o ref estão definidos antes de tentar acessá-los
    if (tableRef.current) {
      const tableHeight = tableRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      
      // Adiciona scroll à tabela se ela ultrapassar a altura da janela
      if (tableHeight > windowHeight) {
        tableRef.current.style.overflowY = 'scroll';
        tableRef.current.style.maxHeight = `${windowHeight - 200}px`; // Ajuste de margem para o scroll não cobrir outros elementos
      }
    }
  }, [perguntas]);

  if (loading) {
    return <Layout><p>Carregando...</p></Layout>;
  }

  if (!perguntas || perguntas.length === 0) {
    return <Layout><p>Não há dados de perguntas disponíveis.</p></Layout>;
  }

  return (
      <div ref={tableRef} style={{ overflowY: 'auto' }}>
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
