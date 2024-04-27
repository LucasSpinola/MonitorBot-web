import React from 'react';
import Layout from '../components/template/Layout';
import Grafico from '../components/template/Grafico';
import { Calendar } from '@/components/ui/calendar';

const Home = () => {

  return (
    <Layout titulo="Página Inicial" subtitulo="Estamos construindo">
      <h3>Conteúdo</h3>
        <div>
          <Grafico />
        </div>
        
    </Layout>
  );
};

export default Home;
