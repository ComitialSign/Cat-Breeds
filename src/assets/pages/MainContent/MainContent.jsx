import "../../scss/MainContent.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../../Contents/SearchBar/SearchBar";
import Loading from "../../Contents/Loading/Loading";
import ErrorStatusMsg from "../../Contents/ErrorStatusMsg/ErrorStatusMsg";
import FirstInterface from "../../Contents/FirstInterface/FirstInterface";
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
  const [showInitialMsg, setShowInitialMsg] = useState(true);
  //tela ao pesquisar uma raça não existente
  const [showWrongSearchMsg, setShowWrongSearchMsg] = useState(false);
  //tela caso de erro na API
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  //pega o status code
  const [statusCode, setStatusCode] = useState(null);

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
          setShowErrorMsg(true);
          throw new Error("Erro ao carregar a API");
        }
      } catch (error) {
        console.error("ocorreu um erro: ", error);
        setLoading(false);
        setShowErrorMsg(true);
        setStatusCode(error.response.status);
        console.log(`Status Code: ${error.response.status}`);
      }
    }
    fetchData();
  }, []);

  //se a raça pesquisada no searchBar for igual a uma existente, ele irá renderizar na tela, se não ele dar uma
  //pagina de "não encontrado".
  const filteredBreeds = breeds.filter(
    (breed) => breed.name.toLowerCase() === searchResult.toLowerCase()
  );

  //lida com o resultado quando enter é apertado
  const handleResult = (event) => {
    if (event.key === "Enter") {
      setSearchResult(searchTerm);
      setShowInitialMsg(false);
    }
  };

  return (
    <section className="container">
      {loading ? (
        <Loading />
      ) : showErrorMsg ? (
        <ErrorStatusMsg>{statusCode}</ErrorStatusMsg>
      ) : (
        <>
          <div className="c__search">
            <SearchBar
              breeds={breeds}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSearchResult={setSearchResult}
              onKeyUp={handleResult}
              handleLiClick={handleResult}
              setShowInitialMsg={setShowInitialMsg}
            />
          </div>
          <main className="c__content">
            {showInitialMsg ? (
              <>
                <FirstInterface />
              </>
            ) : (
              <>
                <div className="c__image"></div>
                <div className="c__text">
                  {filteredBreeds.map((breed) => (
                    <p key={breed.id}>breed: {breed.name}</p>
                  ))}
                </div>
              </>
            )}
          </main>
        </>
      )}
    </section>
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
