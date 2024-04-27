import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Cookie from 'js-cookie';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; 

export function VerPresenca() {
    const [turmas, setTurmas] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const id_discord = Cookie.get('id_discord');
    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                if (id_discord) { 
                    const response = await api.get(`/turmas/ler_turma_professor/${id_discord}`);
                    setTurmas(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Erro ao obter as turmas:', error);
                setIsLoading(false);
            }
        };

        fetchTurmas();
    }, [id_discord]);

    const renderTurmas = () => {
        if (!turmas) {
            return <div>Nenhuma turma encontrada.</div>;
        }

        return Object.keys(turmas).map(cursoKey => {
            return (
                <div key={cursoKey}>
                    {Object.keys(turmas[cursoKey]).map(turmaKey => {
                        return (
                            <TurmaCard
                                key={turmaKey}
                                cursoKey={cursoKey}
                                turmaKey={turmaKey}
                                turma={turmas[cursoKey][turmaKey]}
                                id_discord={id_discord}
                            />
                        );
                    })}
                </div>
            );
        });
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {isLoading ? <Progress value={50} /> : renderTurmas()}
        </div>
    );
}

const TurmaCard = ({ cursoKey, turmaKey, turma, id_discord }) => {
    const [numeroAlunos, setNumeroAlunos] = useState(0);

    useEffect(() => {
        const fetchNumeroAlunos = async (turmaKey) => {
            try {
                if (id_discord) { 
                    const response = await api.get(`/turmas/numero_alunos_turma/${turmaKey}`);
                    setNumeroAlunos(response.data.numero_alunos);
                }
            } catch (error) {
                console.error('Erro ao obter o número de alunos da turma:', error);
            }
        };

        fetchNumeroAlunos(cursoKey);
    }, [cursoKey, id_discord]);

    return (
        <Card style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '5px', textAlign: 'center', fontSize: '18px', flexDirection: 'column', minWidth: '300px', flex: '1', marginRight: '10px' }}>
            <CardHeader>
                <CardTitle><strong>{cursoKey}</strong></CardTitle>
                <CardDescription>ID: {turma.id_docente}</CardDescription>
                <CardDescription>FB: {turmaKey}</CardDescription>
            </CardHeader>
            <CardContent>
                <p style={{ marginBottom: '5px' }}><strong>Período:</strong> {turma.periodo}</p>
                <p style={{ marginBottom: '5px' }}><strong>Alunos:</strong> {numeroAlunos}</p>
            </CardContent>
            <CardFooter style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link href={`/presencas-ver/${cursoKey}`} passHref>
                    <Button variant="outline" className={`bg-blue-600 hover:bg-blue-400 border`}>Ver Presença</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
