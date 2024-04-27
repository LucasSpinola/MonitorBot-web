import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/router';
import Layout from '../../components/template/Layout';

const TurmaDetalhes = () => {
  const router = useRouter();
  const { nomeTurma } = router.query;
  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Nome da turma:', nomeTurma);

    const fetchTurma = async () => {
      try {
        const response = await api.get(`/alunos/alunos_por_turma/${nomeTurma}`);
        setTurma(response.data);
        setAlunos(response.data.alunos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os dados da turma:', error);
        setLoading(false);
      }
    };

    if (nomeTurma) {
      fetchTurma();
    }
  }, [nomeTurma]);

  if (loading) {
    return <Layout><p>Carregando...</p></Layout>;
  }

  if (!turma) {
    return <Layout><p>Não foi possível carregar os dados da turma.</p></Layout>;
  }

  return (
    <div>
      <Layout titulo="Detalhes da Turma" subtitulo="Informações detalhadas da turma" voltar="/turmas">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID Discord</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Sub Turma</TableCell>
            <TableCell>Turma</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alunos.map((aluno) => (
            <TableRow key={aluno.id_discord}>
              <TableCell>{aluno.id_discord}</TableCell>
              <TableCell>{aluno.matricula}</TableCell>
              <TableCell>{aluno.nome}</TableCell>
              <TableCell>{aluno.sub_turma}</TableCell>
              <TableCell>{aluno.turma}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Layout>
    </div>
  );
};

export default TurmaDetalhes;