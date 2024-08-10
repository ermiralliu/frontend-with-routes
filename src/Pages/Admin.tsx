import { useEffect, useRef, useState } from "react";
import config from "./config.json" with { type: "json" };
import { Link } from "react-router-dom";
import { AnimalModal } from "../Components";
import "./AnimalInsertPage.css";

type Animal = { image: string; name: string, id: number, [key: string]: string | number };

export default function Admin() {
	const [logged, logIn] = useState<boolean|null>(false);

	useEffect(()=>{	//does a get request so the server checks the cookies
		fetch('someUrl').then( res => res.json())
			.then( res => logIn(res.success) )
			.catch( err => console.error(err));
	}, []);

	const bodyClass = document.body.className;
	
	useEffect(()=>{
		document.body.className += ' overflow';
	}, [bodyClass]);

	if(logged === null)
		return <></>;

	return (<>
		<Link to='/' className='link back' > Back </Link>
		{ !logged ? <LogInPage logIn={logIn}/> :
		<LoggedIn/>}
	</>)
}

function LogInPage(props:{logIn: React.Dispatch<React.SetStateAction<boolean | null>>}){
	function validation(){
		fetch("/echo/json/", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({a: 1, b: 2})
		}).then(res=>res.json())
		.then( res => props.logIn(res.success))
		.catch( err => console.error(err));
	}

	return <form className='text-middle flex-middle'>
		<table className='text-middle'>
			<tbody>
				<tr>
					<td><label htmlFor='email'>Email:</label></td>
					<td><input id='email' type='text'/></td>
				</tr>
				<tr>
					<td><label htmlFor='password'>Password:</label></td>
					<td><input id='password' type='password'/></td>
				</tr>
				<tr><td  colSpan={2}><button onClick={validation}> Log In </button></td></tr>
			</tbody>
		</table>
	</form>;
}

function LoggedIn(){
		const [showDialog, setDialog] = useState(false);
		const currentAnimal = useRef<Animal | null>(null);
		return (<>
			<Link to='./new' className='link adm'>  New </Link>
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