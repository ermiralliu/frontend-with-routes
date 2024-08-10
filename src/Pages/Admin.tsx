import { useEffect, useRef, useState } from "react";
import config from "./config.json" with { type: "json" };
import { Link, useLocation} from "react-router-dom";
import makeTheme from '../useTheme';
import { AnimalModal } from "../Components";

type Animal = { image: string; name: string, id: number, [key: string]: string | number };

export default function Admin() {
	const location = useLocation();
	useEffect(()=>{
		makeTheme(location.state);
		document.body.className += ' overflow';
	}, [location.state])
	const [showDialog, setDialog] = useState(false);
	const currentAnimal = useRef<Animal | null>(null);
	return (<>
		<Link to='/' className='link back' state={{darkMode: location.state?.darkMode}}> Back </Link>
		<Link to='./new' className='link adm' state={{darkMode: location.state?.darkMode}}> New </Link>
		<h1 style={{textAlign : 'center'}} > Haha, you admin now </h1>
		{['dogs', 'cats', 'birds'].map((animal, index) => <AnimalTable key={index} animal={animal} currentAnimal={currentAnimal} setDialog={setDialog} />)}
		{(showDialog && currentAnimal.current != null) ? 
			<AnimalModal animal={currentAnimal.current} setShow={setDialog} writable={true}>
				<tr>
					<td rowSpan={2}>
						<button type='button'> Update </button>
						<button type='button'> Delete </button>
					</td>
				</tr>
			</AnimalModal> : <></>}
	</>)
}

function AnimalTable(props: { animal: string, currentAnimal: React.MutableRefObject<Animal | null>, setDialog: (value: boolean) => void }) {
	const [animals, setAnimals] = useState([] as Animal[]);
	useEffect(() => {
		const URL = config['url'] + props.animal;
		fetch(URL).then(res => res.json())
			.then((res: Animal[]) => setAnimals(res))
			.catch(err => console.error(err));

	}, [props.animal]);

	if (animals.length === 0)
		return <></>;

	return (
		<table style={{margin: '50px auto'}}>
			<tbody>
				<tr>
					{Object.keys(animals[0]).map((animalKey, index) => <th key={index}> {animalKey} </th>)}
					<th> Update </th>
				</tr>
				{animals.map((animal, index) =>
					<tr key={index}>
						{Object.values(animal).map((value, valueIndex) => <td key={valueIndex}> {value.toString()} </td>)}
						<td> <button type='button' onClick={() => { props.currentAnimal.current = animals[index], props.setDialog(true) }}> Update </button> </td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

//Here used to be an AnimalUpdateDialog, but that was fortunately replaced by a writable version of AnimalModal