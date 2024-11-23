import { useMemo } from "react";

export function SpecificSection(props: { animalType: string; }) {
  const animals: { [key: string]: string[]; } = useMemo(() => {
    console.log("using memo"); //okay it only gets calculated once as expected
    const cat = ['Origin ', 'Temperament ', 'Colors (separate different ones with commas)'];
    const dog = ['Breed_Group ', 'Size ', 'Lifespan ', ...cat];

    return Object.freeze({
      dog,
      cat,
      bird: ['Species ', 'Family ', 'Habitat ', 'Place_found ', 'Diet (separate different foods with a comma)', 'Weight (in kg) ', 'Height (in cm) ']
    });
  }, []);

  const array = animals[props.animalType];

  return (
    <div id="specific-div" className="covered">
      <h2 id="animal" className='text-middle'> {props.animalType.charAt(0).toUpperCase() + props.animalType.slice(1)} </h2>
      <table id='specific'>
        <tbody>
          {array.map((value, index) => <tr key={index}>
            <td> {value} </td>
            <td>
              <input name={`${value[0].toLowerCase() + value.substring(1, value.indexOf(' '))}`} />
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
