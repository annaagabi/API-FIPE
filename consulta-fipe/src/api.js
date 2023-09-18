// Importação da biblioteca Axios para fazer solicitações HTTP
import axios from 'axios';

import * as fipe from 'fipe-promise';

// Definição a URL base para a API da tabela FIPE
const baseURL = 'https://parallelum.com.br/fipe/api/v1';

// Função para obter as marcas de veículos com base no tipo (carros, motos, caminhoes)
export const getMarcas = (tipo) => {

    // Construção da URL completa para buscar as marcas
    const url = `${baseURL}/${tipo}/marcas`;

    // Solicitação GET para a URL e retorna a promessa (promise) resultante
    return axios.get(url);

};

// Função para obter os modelos de um veículo com base no tipo e na marca selecionada
export const getModelos = (tipo, marcaId) => {

    // Construção da URL completa para buscar os modelos
    const url = `${baseURL}/${tipo}/marcas/${marcaId}/modelos`;

    // Solicitação GET para a URL e retorna a promessa (promise) resultante
    return axios.get(url);

};

// Função para obter os anos de um veículo com base no tipo, marca e modelo selecionados
export const getAnos = (tipo, marcaId, modeloId) => {

    // Construção a URL completa para buscar os anos
    const url = `${baseURL}/${tipo}/marcas/${marcaId}/modelos/${modeloId}/anos`;

    // Solicitação GET para a URL e retorna a promessa (promise) resultante
    return axios.get(url);

};

// Função para obter o valor de um veículo com base no tipo, marca, modelo e ano selecionados
export const getValor = (tipo, marcaId, modeloId, ano) => {
    // Construção a URL completa para buscar o valor
    const url = `${baseURL}/${tipo}/marcas/${marcaId}/modelos/${modeloId}/anos/${ano}`;
    // Solicitação GET para a URL e retorna a promessa (promise) resultante

    return axios.get(url);
};