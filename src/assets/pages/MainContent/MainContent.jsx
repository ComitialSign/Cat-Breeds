import "../../scss/MainContent.scss";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Input from "../../components/Input/Input";

function MainContent() {
  const url = "https://api.thecatapi.com/v1/breeds/";
  const key =
    "live_2VLvzrLQkBa73XBFM01WEwvF1ervcvLygzjfvV5MvaGJHBCSbhQE8zYXrGuZm9T2";

  //nome da raça de acordo com o search bar
  const [searchTerm, setSearchTerm] = useState("Abyssinian");
  //array com o data do fetch
  const [breeds, setBreeds] = useState([]);
  //loading do conteudo fetch
  const [loading, setLoading] = useState(true);
  //focus/blur da div com o filter da search bar
  const [onFocus, setOnFocus] = useState(false);

  //Fetch do CatAPI
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
      } catch (error) {
        console.error("ocorreu um erro: ", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredBreeds = useMemo(() => {
    return breeds.filter((breed) => {
      if (breed === "") {
        return breed;
      } else if (
        breed.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ) {
        return breed;
      }
    });
  }, [breeds, searchTerm]);

  //lida com o foco no input e ativa o result
  const handleFocus = () => {
    setOnFocus(true);
  };

  // fecha o result ao tirar o foco
  const handleBlur = () => {
    new Promise((resolve) => {
      setTimeout(() => {
        setOnFocus(false);
        resolve();
      }, 200);
    });
  };

  const handleClickGetBreedName = (value) => {
    setSearchTerm(value);
  };

  return (
    <main className="container">
      {loading ? (
        <p>Carregando</p>
      ) : (
        <>
          <div className="c__search">
            <div className="search__bar">
              <Input
                type={"search"}
                placeholder={"Pesquisar raça"}
                value={searchTerm}
                className={"search"}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="search__result">
              <div
                className={`${
                  onFocus ? "result--activated" : "result--disabled"
                }`}
              >
                <ul className="ul">
                  {filteredBreeds.map((breed) => (
                    <li
                      key={breed.id}
                      className="li"
                      onClick={() => handleClickGetBreedName(breed.name)}
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
          </div>{" "}
        </>
      )}
    </main>
  );
}

export default React.memo(MainContent);

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
