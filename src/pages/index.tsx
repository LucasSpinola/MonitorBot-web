import React from 'react';
import Layout from '../components/template/Layout';
import Grafico from '../components/template/Grafico'; // Importe o componente Grafico
import { Calendar } from '@/components/ui/calendar';

const Home = () => {
  return (
    <Layout titulo="Página Inicial" subtitulo="Estamos construindo">
      <div className=''><p>Numero de alunos que fizeram o Miniteste</p></div>
      <div className=''>
        <Grafico />
      </div>
    </Layout>
  );
};

export default Home;
