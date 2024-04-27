import React, { useEffect, useState, useRef, useContext } from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie';
import Chart from 'chart.js/auto';
import AppContext from '../../data/context/AppContext'; // Importe o contexto do tema

const Grafico = () => {
    const { tema } = useContext(AppContext); // Use o contexto do tema
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id_discord = Cookies.get('id_discord');
                if (!id_discord) {
                    throw new Error('ID Discord não encontrado nos cookies.');
                }

                const responseTurmas = await api.get(`/turmas/ler_turma_professor/${id_discord}`);
                const turmasData = responseTurmas.data;

                const turmaKeys = Object.keys(turmasData);
                const turmas = [];

                for (const turmaKey of turmaKeys) {
                    const responseNumeroAlunosTotal = await api.get(`/turmas/numero_alunos_turma/${turmaKey}`);
                    const numeroAlunosTotal = responseNumeroAlunosTotal.data.numero_alunos;

                    const responseAlunos = await api.get(`/miniteste/alunos/${turmaKey}`);
                    const alunosData = responseAlunos.data;

                    const numeroAlunosMiniteste = Object.keys(alunosData).length;

                    turmas.push({
                        turmaNome: turmaKey,
                        numeroAlunosTotal: numeroAlunosTotal,
                        numeroAlunosMiniteste: numeroAlunosMiniteste,
                    });
                }

                return turmas;
            } catch (error) {
                console.error('Erro ao obter as turmas:', error);
                return [];
            }
        };

        const getTurmasData = async () => {
            const turmasData = await fetchData();
            setTurmas(turmasData);
        };

        getTurmasData();
    }, []);

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const createOrUpdateChart = () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            if (chartRef && chartRef.current) {
                const ctx = chartRef.current.getContext('2d');

                chartInstance.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: turmas.map(turma => turma.turmaNome),
                        datasets: [{
                            label: 'Alunos Miniteste',
                            data: turmas.map(turma => turma.numeroAlunosMiniteste),
                            backgroundColor: 'rgba(0, 123, 255, 0.5)',
                            borderColor: 'rgba(0, 123, 255, 1)',
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    color: tema === 'dark' ? 'white' : 'black', // Use a cor do texto de acordo com o tema
                                    font: {
                                        size: 12, // Tamanho da fonte da legenda
                                        weight: 'bold', // Peso da fonte da legenda
                                    },
                                    generateLabels: chart => {
                                        const data = chart.data.datasets[0].data;
                                        const labels = chart.data.labels;
                                        const result = [];
                                    
                                        for (let i = 0; i < data.length; i++) {
                                            const label = `${labels[i]} (Total: ${turmas[i].numeroAlunosTotal})`;
                                            const textColor = labels[i].startsWith('Turma') ? 'white' : (tema === 'dark' ? 'white' : 'black');
                                            result.push({
                                                text: label,
                                                font: { color: textColor }
                                            });
                                        }
                                    
                                        return result;
                                    },
                                },
                            },
                        },
                    },
                });
            }
        };

        createOrUpdateChart();
    }, [turmas, tema]);

    return (
        <div>
            <canvas ref={chartRef} style={{ maxWidth: '30%', maxHeight: '200px' }} />
        </div>
    );
};

export default Grafico;