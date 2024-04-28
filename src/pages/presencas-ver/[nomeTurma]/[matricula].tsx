import { useEffect, useState, useRef } from 'react';
import api from '../../../services/api';
import Layout from '../../../components/template/Layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

const PresencaVisualizar = () => {
  const router = useRouter();
  const { nomeTurma, matricula } = router.query;
  const [presencas, setPresencas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null); // Ref para a tabela

  useEffect(() => {
    const fetchPresencas = async () => {
      try {
        const response = await api.post(`/presenca/ver_presenca/`, {
          sigla: nomeTurma,
          matricula: matricula
        });

        const presencaId = Object.keys(response.data.presencas)[0];
        const presencasData = response.data.presencas[presencaId].frequencia;

        if (presencasData && Object.keys(presencasData).length > 0) {
          setPresencas(presencasData);
          setError(null);
        } else {
          throw new Error('Dados de presença não disponíveis');
        }
      } catch (error) {
        setError('Dados de presença não disponíveis');
      } finally {
        setLoading(false);
      }
    };

    if (nomeTurma && matricula) {
      fetchPresencas();
    }
  }, [nomeTurma, matricula]);

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
  }, [presencas]);

  const handleVerDetalhes = () => {
    // Implemente a lógica para visualizar os detalhes da presença
  };

  return (
    <Layout titulo={`Detalhes de Presença para a Matrícula ${matricula}`} subtitulo={`Turma: ${nomeTurma}`}>
      {error && <Layout><p>{error}</p></Layout>}
      {!error && (
        <div ref={tableRef} style={{ overflowY: 'auto' }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Teoria</TableCell>
                <TableCell>Laboratório</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(presencas).map(([data, frequencia]) => (
                <TableRow key={data}>
                  <TableCell>{data}</TableCell>
                  <TableCell>{frequencia.includes('PT') ? 'P' : 'F'}</TableCell>
                  <TableCell>{frequencia.includes('PL') ? 'P' : 'F'}</TableCell>
                  <TableCell className=''>
                    <Button onClick={() => handleVerDetalhes()} className={` bg-red-600 border hover:bg-red-400 `}>Excluir</Button>
                    <Button onClick={() => handleVerDetalhes()} className={` bg-yellow-600 border hover:bg-yellow-400 `}>Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Layout>
  );
};

export default PresencaVisualizar;