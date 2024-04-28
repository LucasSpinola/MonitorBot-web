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
        <Card className="bg-white dark:bg-stone-950 border border-gray-400 p-4 mb-3 text-center text-lg flex flex-col min-w-[300px] flex-1 mr-10">
            <CardHeader>
                <CardTitle><strong>{cursoKey}</strong></CardTitle>
                <CardDescription className="p-1">ID: {turma.id_docente}</CardDescription>
                <CardDescription>FB: {turmaKey}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <p className="mb-3"><strong>Período:</strong> {turma.periodo}</p>
                <p className="mb-3"><strong>Alunos:</strong> {numeroAlunos}</p>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-500">Online</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <Link href={`/presencas-ver/${cursoKey}`} passHref>
                    <Button variant="outline" className="bg-blue-600 hover:bg-blue-400 border">Ver Presença</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
