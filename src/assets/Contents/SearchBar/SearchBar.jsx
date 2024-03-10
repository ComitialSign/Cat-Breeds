/* eslint-disable react/prop-types */
import Input from "../../components/Input/Input";
import { useState } from "react";

function SearchBar({
  breeds,
  searchTerm,
  setSearchTerm,
  setSearchResult,
  setShowInitialMsg,
}) {
  //focus/blur da div com o filter da search bar
  const [onFocus, setOnFocus] = useState(false);

  //Possibilita a mudança do input search

  // fecha o result ao tirar o foco
  const handleBlur = () => {
    setTimeout(() => {
      setOnFocus(false);
    }, 200);
  };

  // Lida com onClick da Li
  const handleLiClick = (value) => {
    setSearchResult(value);
    setSearchTerm(value);
    setShowInitialMsg(false);
  };

  return (
    <>
      <div className="search__bar">
        <Input
          type={"search"}
          placeholder={"Search breed"}
          value={searchTerm}
          className={"search"}
          onFocus={() => setOnFocus(true)}
          onBlur={handleBlur}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="search__result">
        <div
          className={`${onFocus ? "result--activated" : "result--disabled"}`}
        >
          <ul className="ul">
            {breeds
              .filter((breed) => {
                if (breed === "") {
                  return breed;
                } else if (
                  breed.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return breed;
                }
              })
              .map((breed) => (
                <li
                  key={breed.id}
                  className="li"
                  onClick={() => handleLiClick(breed.name)}
                >
                  {breed.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
