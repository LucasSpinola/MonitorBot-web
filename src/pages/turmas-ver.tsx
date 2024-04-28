import Layout from "../components/template/Layout";
import TurmaDetalhes from "./turmas-ver/[nomeTurma]";

export default function TurmaVer() {
  return (
    <Layout titulo="Detalhes da Turma" subtitulo="Informações detalhadas da turma">
      <TurmaDetalhes />
    </Layout>
  );
}