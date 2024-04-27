import { VerPresenca } from "../components/template/CardPresence";
import Layout from "../components/template/Layout";

export default function Presenca() {
  return (
    <div className={``}>
      <Layout titulo="Veja as Presenças" subtitulo="Estamos contruindo">
        <VerPresenca />
      </Layout>
      </div>
  );
}
