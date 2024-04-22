// Importação as dependências necessárias

import React, { useState, useEffect } from 'react';
import { getMarcas, getModelos, getAnos, getValor } from './api'; // Importa funções para fazer solicitações à API
import './App.css';

import * as fipe from 'fipe-promise';



function App() {

  // Declaração estados para armazenar dados e seleções 
  const [marcas, setMarcas] = useState([]); // Array de marcas
  const [modelos, setModelos] = useState([]); // Array de modelos
  const [anos, setAnos] = useState([]); // Array de anos
  const [valor, setValor] = useState(''); // Valor do veículo
  const [selectedMarca, setSelectedMarca] = useState(''); // Marca selecionada
  const [selectedModelo, setSelectedModelo] = useState(''); // Modelo selecionado
  const [selectedAno, setSelectedAno] = useState(''); // Ano selecionado



  // Use useEffect para buscar as marcas
  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await getMarcas(fipe.vehicleType.CARS);
        setMarcas(response.data);

      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
      }
    }

    fetchMarcas();

  }, []);

  // Função da mudança de marca selecionada
  async function handleMarcaChange(event) {
    const marcaId = event.target.value;
    setSelectedMarca(marcaId);

    try {
      const response = await getModelos(fipe.vehicleType.CARS, marcaId);
      setModelos(response.data.modelos);

    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }

  }

  // Função da mudança de modelo selecionado
  async function handleModeloChange(event) {
    const modeloId = event.target.value;
    setSelectedModelo(modeloId);

    try {
      const response = await getAnos(fipe.vehicleType.CARS, selectedMarca, modeloId);
      setAnos(response.data);

    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    }

  }

  // Função da mudança de ano selecionado
  async function handleAnoChange(event) {
    const ano = event.target.value;
    setSelectedAno(ano);

    try {
      const response = await getValor(fipe.vehicleType.CARS, selectedMarca, selectedModelo, ano);

      setValor(response.data.Valor);

    } catch (error) {
      console.error('Erro ao buscar valor:', error);
    }

    console.log(ano.data)

  }



  // Renderização do componente com os seletores e o valor do veículo

  return (
    <div className="App">

      <header className="cabecalho">
        <h1>FIPE</h1>
        <h3><a href="https://github.com/hepteto">GITHUB</a></h3>
      </header>

      <main className='conteudo'>
        <h1 className='titulo'>CONSULTA TABELA FIPE</h1>
        <div>
          <label className='titulo-seletor'>MARCAS DE CARROS</label>

          <select className='seletor' onChange={handleMarcaChange}>
            <option className='opcao' value="">Selecione uma marca</option>

            {marcas.map((marca) => (
              <option key={marca.codigo} value={marca.codigo}>
                {marca.nome}
              </option>
            ))}

          </select>
        </div>

        <div>

          <label className='titulo-seletor'>MODELO DO CARRO</label>

          <select className='seletor' onChange={handleModeloChange}>
            <option className='opcao' value="">Selecione um modelo</option>

            {modelos.map((modelo) => (
              <option key={modelo.codigo} value={modelo.codigo}>
                {modelo.nome}
              </option>
            ))}

          </select>
        </div>

        <div>

          <label className='titulo-seletor'>ANO DO CARRO</label>

          <select className='seletor' onChange={handleAnoChange}>
            <option className='opcao' value="">Selecione um ano</option>

            {anos.map((ano) => (
              <option key={ano.codigo} value={ano.codigo}>
                {ano.codigo}
              </option>

            ))}

          </select>
        </div>

        <div className='valor'>
          <label >VALOR</label>
          <div>
            <span className='valor-exibir'>{valor}</span>
          </div>
        </div>
      </main>

      <footer className="rodape">
        <div className='rodape2'>
          <h3><a href="https://sp.senai.br/unidade/suicobrasileira/">SENAI Suiço-Brasileira <p>“Paulo Ernesto Tolle”</p></a></h3>
        </div>

        <div className='rodape3'>
          <h3><a href="https://github.com/annaagabi"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className='svg'>
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
            ANNA GABRIELA</a></h3>
          <h3><a href="https://github.com/DOYKLAS"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className='svg'>
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>DOUGLAS HENRIQUE</a></h3>
        </div>
      </footer>
    </div>


  );
}

export default App;
