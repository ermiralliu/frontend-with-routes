import { useState, useEffect } from "react";
import { API_ANIMALS } from "../../../constants";
import { Animal } from "../Admin";
import { AnimalType } from "../../../AnimalChoice";

export function AnimalTable(props: { 
  animal: string, 
  currentAnimal: React.MutableRefObject<Animal | null>,
  currentType: React.MutableRefObject<AnimalType>
  setDialog: (value: boolean) => void 
}) {
  const [animals, setAnimals] = useState([] as Animal[]);
  useEffect(() => {
    const URL = API_ANIMALS + '/' + props.animal;
    fetch(URL).then(res => res.json())
      .then((res: Animal[]) => setAnimals(res))
      .catch(err => console.error(err));

  }, [props.animal]);

  if (animals == undefined || animals == null || animals.length === 0)
    return <h1>{props.animal}: No animals of this type </h1>;
  if (animals[0] == null || animals[0] == undefined)
    return <h1> please stop </h1>;


  return (
    <table style={{ margin: '50px auto' }}>
      <h1>{props.animal}: {animals.length} </h1>
      <tbody>
        <tr>
          {Object.keys(animals[0]).map((animalKey, index) => <th key={index}> {animalKey} </th>)}
          <th> Update </th>
        </tr>
        {animals.map((animal, index) => <tr key={index}>
          {Object.values(animal).map((value, valueIndex) => <td key={valueIndex}> {value?.toString()} </td>)}
          <td> <button type='button' onClick={() => { 
            props.currentAnimal.current = animals[index]; 
            props.setDialog(true); 
            props.currentType.current = props.animal as AnimalType;
          }}> Update </button> </td>
        </tr>
        )}
      </tbody>
    </table>
  );
}
