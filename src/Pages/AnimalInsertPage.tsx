import { useState } from "react";

export default function AnimalInsertPage(){
    const [animalType, setAnimalType] = useState('dogs');

    return(
        <form id="the-form" action={`../insert/${animalType}`} method="POST">
            <h1>General Information</h1>
            <table className="covered">
                { ['name', 'description', 'image'].map(( str: string, index) => 
                    <tr key={index}>
                        <td> {str.charAt(0).toUpperCase() + str.slice(1)} </td>
                        <td><input name={str}/></td>
                    </tr>)  
                }
            </table>
            <h2>Specific Information</h2>
            <div id="buttons">
                <button className="animal-button" onClick={()=> setAnimalType('dogs')} type="button"> Dog </button>
                <button className="animal-button" onClick={()=> setAnimalType('cats')} id="Cats" type="button"> Cat </button>
                <button className="animal-button" onClick={()=> setAnimalType('birds')} id="Birds" type="button"> Bird </button>
            </div>
            <SpecificSection animalType={animalType}/>
            <div id="finish">
                <button id="last" type="submit" > Add to Database </button>
            </div>
        </form>
    );
}

const animals :{[key:string]:string[]} = (()=>{
    const cats = ['Origin ', 'Temperament ', 'Colors (separate different ones with commas)'];
    const dogs = ['Breed Group ', 'Size ', 'Lifespan ', ...cats];

    return Object.freeze({
        dogs,
        cats,
        birds: ['Species ','Family ','Habitat ','Place_found ', 'Diet (separate different foods with a comma)', 'Weight (in kg) ', 'Height (in cm) ']
    });
})();

function SpecificSection(props:{animalType:string}){
    const array = animals[ props.animalType ];
    return (
        <div id="specific-div" className="covered">
            <h2 id="animal"> {props.animalType} </h2>
            <table id='specific'>
                { array.map( (value, index) => 
                    <tr key={index}>
                        <th> {value} </th>
                        <td> 
                            <input name={ `${value[0].toLowerCase() + value.slice(1).split(' ')}`}/>
                        </td>
                    </tr>
                )}
            </table>
        </div>
    );

}