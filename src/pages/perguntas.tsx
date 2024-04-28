import Layout from "../components/template/Layout";
import PerguntaDetalhes from "./pergunta/[nomeTurma]";

export default function Perguntas() {
  return (
    <div className={``}>
      <Layout titulo="Veja suas perguntas" subtitulo="Estamos contruindo">
        <PerguntaDetalhes />
      </Layout>
      </div>
  );
}
