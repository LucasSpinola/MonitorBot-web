import Layout from "../components/template/Layout";
import TurmaDetalhes from "../components/template/TurmaDetalhe";

export default function PresencaVer() {
  return (
    <Layout titulo="Detalhes da Turma" subtitulo="Informações detalhadas da turma">
      <TurmaDetalhes />
    </Layout>
  );
}