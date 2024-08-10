import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import './AnimalInsertPage.css';


export default function AnimalInsertPage() {
	const [animalType, setAnimalType] = useState('dogs');

	//I have no idea why, but the input boxes are curved. Cool though, ig
	return (
		<>
		<Link to='../' className='link back'> Back </Link>
		<div className='main'>
			<form className='middle' action={`../insert/${animalType}`} method="POST">
				<h1 className='text-middle'>General Information</h1>
				<table>
					<tbody>
						{['name', 'description', 'image'].map((str: string, index) =>
							<tr key={index}>
								<td> {str.charAt(0).toUpperCase() + str.slice(1)} </td>
								<td><input name={str} /></td>
							</tr>)
						}
					</tbody>
				</table>
				<h2 className='text-middle'>Specific Information</h2>
				<div className='text-middle'>
					<button className="animal-button" onClick={() => setAnimalType('dogs')} type="button"> Dog </button>
					<button className="animal-button" onClick={() => setAnimalType('cats')} id="Cats" type="button"> Cat </button>
					<button className="animal-button" onClick={() => setAnimalType('birds')} id="Birds" type="button"> Bird </button>
				</div>
				<SpecificSection animalType={animalType} />
				<div className="text-middle">
					<button type="submit" > Add to Database </button>
				</div>
			</form>
		</div>
	</>
	);
}


function SpecificSection(props: { animalType: string }) {
	const animals: { [key: string]: string[] } = useMemo(()=> {
		console.log("using memo");	//okay it only gets calculated once as expected
		const cats = ['Origin ', 'Temperament ', 'Colors (separate different ones with commas)'];
		const dogs = ['Breed_Group ', 'Size ', 'Lifespan ', ...cats];
	
		return Object.freeze({
			dogs,
			cats,
			birds: ['Species ', 'Family ', 'Habitat ', 'Place_found ', 'Diet (separate different foods with a comma)', 'Weight (in kg) ', 'Height (in cm) ']
		});
	}, []);

	const array = animals[props.animalType];
	
	return (
		<div id="specific-div" className="covered">
			<h2 id="animal" className='text-middle'> {props.animalType.charAt(0).toUpperCase() + props.animalType.slice(1)} </h2>
			<table id='specific'>
				<tbody>
					{array.map((value, index) =>
						<tr key={index}>
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