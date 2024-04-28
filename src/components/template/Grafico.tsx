import React, { useEffect, useState, useContext, useRef } from 'react';
import * as d3 from 'd3'; // Importe todas as funções do D3.js
import api from '../../services/api';
import Cookies from 'js-cookie';
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

    // UseRef para a div que conterá o gráfico
    const chartRef = useRef(null);

    useEffect(() => {
        if (turmas.length > 0) {
            // Remove qualquer gráfico anterior
            d3.select(chartRef.current).select('svg').remove();

            // Configuração do gráfico
            const margin = { top: 30, right: 30, bottom: 70, left: 60 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const svg = d3.select(chartRef.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const x = d3.scaleBand()
                .domain(turmas.map(d => d.turmaNome))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(turmas, d => d.numeroAlunosMiniteste)])
                .nice()
                .range([height, 0]);

            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '-0.8em')
                .attr('dy', '-0.5em')
                .attr('transform', 'rotate(-45)'); // Adiciona rotação para melhorar visibilidade

            svg.append('g')
                .call(d3.axisLeft(y));

            const line = d3.line()
                .x(d => x(d.turmaNome) + x.bandwidth() / 2)
                .y(d => y(d.numeroAlunosMiniteste));

            svg.append('path')
                .datum(turmas)
                .attr('fill', 'none')
                .attr('stroke', tema === 'dark' ? '#009688' : '#2196F3') // Cor da linha de acordo com o tema
                .attr('stroke-width', 2)
                .attr('d', line);

            // Adiciona pontos aos gráficos
            svg.selectAll('.ponto')
                .data(turmas)
                .enter()
                .append('circle')
                .attr('class', 'ponto')
                .attr('cx', d => x(d.turmaNome) + x.bandwidth() / 2)
                .attr('cy', d => y(d.numeroAlunosMiniteste))
                .attr('r', 4)
                .attr('fill', tema === 'dark' ? '#009688' : '#2196F3') // Cor do ponto de acordo com o tema
                .on('mouseover', (event, d) => {
                    const tooltip = d3.select(chartRef.current).append('div')
                        .attr('class', 'tooltip')
                        .style('position', 'absolute')
                        .style('background-color', 'rgba(0, 0, 0, 0.7)')
                        .style('color', 'white')
                        .style('padding', '8px')
                        .style('border-radius', '4px')
                        .style('pointer-events', 'none')
                        .style('font-size', '12px')
                        .html(`Turma: ${d.turmaNome}<br>Total de alunos: ${d.numeroAlunosTotal}`);

                    tooltip.style('left', `${event.pageX}px`)
                        .style('top', `${event.pageY}px`);
                })
                .on('mouseleave', () => {
                    d3.selectAll('.tooltip').remove();
                });
        }
    }, [turmas, tema]);

    return (
        <div ref={chartRef} style={{ maxWidth: '100%', maxHeight: '600px', margin: '0 auto' }} />
    );
};

export default Grafico;