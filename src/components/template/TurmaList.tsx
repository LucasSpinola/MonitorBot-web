import Link from 'next/link';

const TurmasList = ({ turmas }) => {
  return (
    <div>
      {turmas &&
        Object.keys(turmas).map(cursoKey => (
          <div key={cursoKey}>
            <h2>{cursoKey}</h2>
            {turmas[cursoKey].map(turma => (
              <div key={turma.id}>
                <h3>{turma.nome}</h3>
                <Link href={`/turmas-ver/${turma.nome}`} passHref>
                  <button>Ver Turma</button>
                </Link>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default TurmasList;