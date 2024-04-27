import { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/template/Layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const PresencaDetalhes = () => {
  const router = useRouter();
  const { nomeTurma } = router.query;
  const [presencas, setPresencas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detalhesPresenca, setDetalhesPresenca] = useState(null);

  useEffect(() => {
    const fetchPresencas = async () => {
      try {
        const response = await api.get(`/presenca/pegar_frequencias/${nomeTurma}`);
        setPresencas(response.data.frequencias);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os dados de presença:', error);
        setLoading(false);
      }
    };

    if (nomeTurma) {
      fetchPresencas();
    }
  }, [nomeTurma]);

  if (loading) {
    return <Layout><p>Carregando...</p></Layout>;
  }

  if (!presencas || Object.keys(presencas).length === 0) {
    return <Layout><p>Não há dados de presença disponíveis.</p></Layout>;
  }

  const totaisPorMatricula = {};
  Object.values(presencas).forEach((frequencia) => {
    const { matricula, frequencia: presencasPorData } = frequencia;
    let totalTeoria = 0;
    let totalLaboratorio = 0;
    Object.values(presencasPorData).forEach((presencaPorData) => {
      if (presencaPorData.includes('PT')) totalTeoria++;
      if (presencaPorData.includes('PL')) totalLaboratorio++;
    });
    if (!totaisPorMatricula[matricula]) {
      totaisPorMatricula[matricula] = { totalTeoria, totalLaboratorio };
    } else {
      totaisPorMatricula[matricula].totalTeoria += totalTeoria;
      totaisPorMatricula[matricula].totalLaboratorio += totalLaboratorio;
    }
  });

  const handleVerDetalhes = (matricula) => {
    router.push(`/presencas-ver/${nomeTurma}/${matricula}`);
  };

  return (
    <Layout titulo="Detalhes da Presença" subtitulo="Informações detalhadas de presença" voltar="/turmas">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Matrícula</TableCell>
            <TableCell>Total Teoria</TableCell>
            <TableCell>Total Laboratório</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(totaisPorMatricula).map((matricula) => {
            const { totalTeoria, totalLaboratorio } = totaisPorMatricula[matricula];
            return (
              <TableRow key={matricula}>
                <TableCell>{matricula}</TableCell>
                <TableCell>{totalTeoria}</TableCell>
                <TableCell>{totalLaboratorio}</TableCell>
                <TableCell>
                  <Button onClick={() => handleVerDetalhes(matricula)} className={` bg-blue-800 border hover:bg-blue-500 `}>Ver Detalhes</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default PresencaDetalhes;
