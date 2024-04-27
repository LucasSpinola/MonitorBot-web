import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

const VerTurmas = ({ nomeTurma }) => {
    const [turma, setTurma] = useState(null);
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchTurma = async () => {
        try {
          const response = await api.get(`/alunos/alunos_por_turma/${nomeTurma}`);
          setTurma(response.data);
          setAlunos(response.data.alunos);
          setLoading(false); // Marca o carregamento como concluído
        } catch (error) {
          console.error('Erro ao obter os dados da turma:', error);
          setError('Erro ao carregar os dados da turma.'); // Define um erro se houver problema com a API
          setLoading(false); // Marca o carregamento como concluído, mesmo com erro
        }
      };
  
      if (nomeTurma) {
        fetchTurma();
      }
    }, [nomeTurma]);
  
    if (loading) {
      return <p>Carregando...</p>; // Mostra "Carregando..." enquanto os dados estão sendo buscados
    }
  
    if (error) {
      return <p>{error}</p>; // Mostra uma mensagem de erro se houver algum problema com a API
    }
  
    if (!turma) {
      return <p>Não foi possível carregar os dados da turma.</p>; // Mostra uma mensagem se não houver dados da turma
    }
  
    return (
      <div>
        <h2>Turma: {turma.nome}</h2>
        <p>ID Docente: {turma.id_docente}</p>
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
      </div>
    );
  };
  
  export default VerTurmas;