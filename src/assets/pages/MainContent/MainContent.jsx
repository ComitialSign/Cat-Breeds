import "../../scss/MainContent.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function MainContent() {
  const url = "https://api.thecatapi.com/v1/breeds/";
  const key =
    "live_2VLvzrLQkBa73XBFM01WEwvF1ervcvLygzjfvV5MvaGJHBCSbhQE8zYXrGuZm9T2";

  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const data = response.data;
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

  return (
    <main className="container">
      <div className="c__search">
        <Input type={"search"} placeholder={"Pesquisar"} className={"input"} />
        <Button children={"Buscar"} className={"btn"} />
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
