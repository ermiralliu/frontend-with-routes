import { useState } from "react";
import { Link } from "react-router-dom";
import './AnimalInsertPage.css';
import { API_ANIMALS } from "../../constants";
import { SpecificSection } from "./Components/SpecificSection";
import eventHandler from "../../eventHandler";


export default function AnimalInsertPage() {
	const [animalType, setAnimalType] = useState('dog');

	//I have no idea why, but the input boxes are curved. Cool though, ig
	return (
		<>
		<Link to='../' className='link adm red'> Back </Link>
		<div className='main'>
			<form className='middle' method="POST" onSubmit={(event)=> eventHandler(API_ANIMALS+'/'+ animalType, event)}>
				<h1 className='text-middle'>General Information</h1>
				<table>
					<tbody>
						{['name', 'description'].map((str: string, index) =>
							<tr key={index}>
								<td> {str.charAt(0).toUpperCase() + str.slice(1)} </td>
								<td><input id={str} name={str} /></td>
							</tr>)
						}
            <tr> <td>Image</td> <td> <input id='image' name='image' type="file" accept="image/*"></input></td></tr>
					</tbody>
				</table>
				<h2 className='text-middle'>Specific Information</h2>
				<div className='text-middle'>
					<button className="animal-button" onClick={() => setAnimalType('dog')} id="Dogs" type="button"> Dog </button>
					<button className="animal-button" onClick={() => setAnimalType('cat')} id="Cats" type="button"> Cat </button>
					<button className="animal-button" onClick={() => setAnimalType('bird')} id="Birds" type="button"> Bird </button>
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