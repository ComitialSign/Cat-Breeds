import "../../scss/MainContent.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";

function MainContent() {
  const url = "https://api.thecatapi.com/v1/breeds/";
  const key =
    "live_2VLvzrLQkBa73XBFM01WEwvF1ervcvLygzjfvV5MvaGJHBCSbhQE8zYXrGuZm9T2";

  const [searchTerm, setSearchTerm] = useState("Abyssinian");
  const [breedId, setBreedId] = useState("abys");
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onFocused, setOnFocused] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url, {
          headers: {
            "x-api-key": key,
          },
        });

        if (response.status < 200 || response >= 300) {
          throw new Error("Erro ao carregar a API");
        }

        const data = await response.data;
        setBreeds(data);
        setLoading(false);

        console.log(data);
        console.log(breeds);
      } catch (error) {
        console.error("ocorreu um erro: ", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // lida com o foco no input e ativa o result
  const handleFocus = () => {
    setOnFocused(true);
    console.log("focus activated!");
  };

  // fecha o result ao tirar o foco
  const handleBlur = () => {
    setOnFocused(false);
    console.log("focus disabled!");
  };

  // seta o nome e id no breedId e breedName
  const handleGetBreedInfo = (value) => {
    setSearchTerm(value);
    console.log(searchTerm);
  };

  return (
    <main className="container">
      <div className="c__search">
        <div className="search__bar">
          <Input
            type={"text"}
            placeholder={"Pesquisar"}
            value={searchTerm}
            className={"search"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(event) => handleGetBreedInfo(event.target.value)}
          />
        </div>
        <div className="search__result">
          <div
            className={`${
              onFocused ? "result--activated" : "result--disabled"
            }`}
          >
            <ul className="ul">
              {breeds
                .filter((breed) => {
                  if (breed === "") {
                    return breed;
                  } else if (
                    breed.name
                      .toLowerCase()
                      .startsWith(searchTerm.toLowerCase())
                  ) {
                    return breed;
                  }
                })
                .map((breed) => (
                  <li
                    key={breed.id}
                    className="li"
                    onClick={() => handleGetBreedInfo(breed.name)}
                  >
                    {breed.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="c__content">
        <div className="c__image"></div>
        <div className="c__text"></div>
      </div>
    </main>
  );
}

export default MainContent;

{
  /* <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {breeds.map((breed) => (
            <li key={breed.id}>{breed.name}</li>
          ))}
        </ul>
      )}
    </div> */
}

// id
// description
// image (id - url)
// name
// origin
// temperament
// wikipedia_url
// life_span
// weight (imperial lb - metric kg)
