function BreedInfo({ breeds, name }) {
  return (
    <div>
      {breeds.map((breed) => (
        <div key={breed.id}>
          <p>{name}</p>
          <p>{breed.description}</p>
        </div>
      ))}
    </div>
  );
}

export default BreedInfo;

// id
// description
// image (id - url)
// name
// origin
// temperament
// wikipedia_url
// life_span
// weight (imperial lb - metric kg)
