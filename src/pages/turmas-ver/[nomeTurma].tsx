import { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/template/Layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/router';
import EditarAlunoDialog from '../../components/template/EditarAlunoDialog';
import ExcluirAlunoDialog from '../../components/template/ExcluirAlunoDialog';
import CriarAlunoDialog from '../../components/template/CriarAlunoDialog';

const TurmaDetalhes = () => {
  const router = useRouter();
  const { nomeTurma } = router.query;
  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matriculaToDelete, setMatriculaToDelete] = useState(null);

  useEffect(() => {
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

  const handleEditAluno = async (editedData) => {
    try {
      await api.put(`/alunos/edita_aluno/${editedData.matricula}`, editedData);
      const updatedAlunos = alunos.map((aluno) => {
        if (aluno.matricula === editedData.matricula) {
          return editedData;
        }
        return aluno;
      });
      setAlunos(updatedAlunos);
      console.log('Dados editados do aluno:', editedData);
    } catch (error) {
      console.error('Erro ao editar aluno:', error);
    }
  };

  const handleDeleteConfirmation = async (matricula) => {
    try {
      await api.delete(`/alunos/deleta_aluno/${matricula}`);
      const updatedAlunos = alunos.filter((aluno) => aluno.matricula !== matricula);
      setAlunos(updatedAlunos);
      setMatriculaToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
    }
  };

  const handleCreateAluno = async (newAlunoData) => {
    try {
      const response = await api.post(`/alunos/cria_aluno/`, newAlunoData);
      const createdAluno = response.data;
      console.log('Aluno criado:', createdAluno);
      setAlunos([...alunos, createdAluno]);
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
    }
  };

  return (
    <Layout titulo="Detalhes da Turma" subtitulo="Informações detalhadas da turma" voltar="/turmas">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID Discord</TableCell>
              <TableCell>Matrícula</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Sub Turma</TableCell>
              <TableCell>Turma</TableCell>
              <TableCell>Ações</TableCell>
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
                <TableCell className="flex items-center">
                  <ExcluirAlunoDialog
                    matricula={aluno.matricula}
                    onConfirmDelete={handleDeleteConfirmation}
                    onClose={() => setMatriculaToDelete(null)}
                  />
                  <span className="inline-block w-1"></span>
                  <EditarAlunoDialog aluno={aluno} onConfirmEdit={handleEditAluno} />
                  <span className="inline-block w-1"></span>
                  <CriarAlunoDialog onConfirmCreate={handleCreateAluno} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <style jsx>{`
        .table-container {
          overflow-y: auto;
          max-height: calc(100vh - 200px);
        }
      `}</style>
    </Layout>
  );
};

export default TurmaDetalhes;
