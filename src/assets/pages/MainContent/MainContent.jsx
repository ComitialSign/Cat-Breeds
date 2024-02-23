import "../../scss/MainContent.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../../Contents/SearchBar/SearchBar";
import BreedInfo from "../../Contents/BreedInfo/BreedInfo";

function MainContent() {
  const url = "https://api.thecatapi.com/v1/breeds/";
  const key =
    "live_2VLvzrLQkBa73XBFM01WEwvF1ervcvLygzjfvV5MvaGJHBCSbhQE8zYXrGuZm9T2";

  //nome da raça de acordo com o search bar
  const [searchTerm, setSearchTerm] = useState("");
  //resultado da pesquisa
  const [searchResult, setSearchResult] = useState("");
  //array com o data do fetch
  const [breeds, setBreeds] = useState([]);
  //loading do conteudo fetch
  const [loading, setLoading] = useState(true);
  //tela inicial ao entrar no site
  const [showInitialInterface, setShowInitialInterface] = useState(true);
  //tela ao pesquisar uma raça não existente
  const [showWrongSearchInterface, setShowWrongSearchInterface] =
    useState(false);
  //tela caso de erro na API
  const [showErrorInterface, setShowErrorInterface] = useState(false);

  //Fetch do CatAPI
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url, {
          headers: {
            "x-api-key": key,
          },
        });

        if (response.status >= 200 || response.status < 300) {
          const data = response.data;
          setBreeds(data);
          setLoading(false);
        } else {
          setErrorStatusCode(response.status);
          setShowErrorInterface(true);
          throw new Error("Erro ao carregar a API");
        }
      } catch (error) {
        console.error("ocorreu um erro: ", error);
        setLoading(false);
        setShowErrorInterface(true);
      }
    }
    fetchData();
  }, []);

  const handleNewSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setShowInitialInterface(false);
  };

  const filteredBreeds = breeds.filter(
    (breed) => breed.name.toLowerCase() === searchResult.toLowerCase()
  );

  //lida com o resultado quando enter é apertado
  const handleResult = (event) => {
    if (event.key === "Enter") {
      setSearchResult(searchTerm);
    }
  };

  return (
    <main className="container">
      {loading ? (
        <p>Carregando</p>
      ) : showErrorInterface ? (
        <div className="Error">
          <p>Ocorreu um erro ao carregar o site</p>
        </div>
      ) : (
        <>
          <div className="c__search">
            <SearchBar
              breeds={breeds}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSearchResult={setSearchResult}
              onKeyUp={handleResult}
            />
          </div>
          <div className="c__content">
            <div className="c__image"></div>
            <div className="c__text">
              {filteredBreeds.map((breed) => (
                <p>breed: {breed.name}</p>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default MainContent;

// {loading ? (
//   <p>Carregando</p>
// ) : showInitialLayout ? ( // Mostra o layout inicial se showInitialLayout for true
//   <InitialLayout />
// ) : (
//   filteredBreeds.length > 0 ? ( // Se a raça filtrada existe, mostra o BreedInfo
//     <BreedInfo key={filteredBreeds[0].id} breed={filteredBreeds[0]} />
//   ) : (
//     <p>Nenhum resultado encontrado</p>
//   )
// )}

{
  /* // id
// description
// image (id - url)
// name
// origin
// temperament
// wikipedia_url
// life_span
// weight (imperial lb - metric kg) */
}
