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
          console.log(breeds);
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
              setShowInitialMsg={setShowInitialMsg}
            />
          </div>
          <main className="c__content">
            {showInitialMsg ? (
              <>
                <FirstInterface />
              </>
            ) : (
              filteredBreeds.map((breed) => (
                <div key={breed.id} className="content">
                  <div className="content__image">
                    <img src={breed.image.url} alt="cat picture" />
                  </div>
                  <div className="content__text">
                    <p>
                      <span>Breed:</span> {breed.name}
                    </p>
                    <p>
                      <span>Description:</span> {breed.description}
                    </p>
                    <p>
                      <span>Temperament:</span> {breed.temperament}
                    </p>
                    <p>
                      <span>Origin:</span> {breed.origin}
                    </p>
                    <p>
                      <span>Life span:</span> {breed.life_span} years
                    </p>
                    <p>
                      <span>Weight:</span> {breed.weight.metric} kg
                    </p>
                    <p>
                      <a href={breed.wikipedia_url}>
                        <span>Wikipedia</span>
                      </a>
                    </p>
                  </div>
                </div>
              ))
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
