import { VerTurmas } from "../components/template/CardTurma";
import Layout from "../components/template/Layout";
import TurmasList from "../components/template/TurmaList";

export default function Turmas() {
  return (
    <Layout titulo="Veja suas turmas" subtitulo="Estamos construindo">
      <VerTurmas  />
    </Layout>
  );
}
