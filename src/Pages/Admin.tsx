import { FormEvent, useEffect, useRef, useState } from "react";
import config from "./config.json" with { type: "json" };
import { Link } from "react-router-dom";
import { AnimalModal } from "../Components";
import "./AnimalInsertPage.css";

type Animal = { image: string; name: string, id: number, [key: string]: string | number };

export default function Admin() {
	const [loggSubmitted, submitLog] = useState<number>(0);
	const [logged, logIn] =  useState<boolean|null>(null);
	
	useEffect(()=>{	//does a get request so the server checks the cookies
		fetch(config.url2 + '/api/user',
			{
				credentials: 'include'
			})
		.then( res => res.json())
		.then( res => {
			console.log(res);
			let log = false;
			if('id' in res && 'name' in res && 'email' in res)
				log = true;
			logIn( log );
		})
		.catch( err => console.error(err));
	}, [loggSubmitted]);
	
	useEffect( ()=>{
		if(!document.body.classList.contains('overflow') )
			document.body.classList.add('overflow');
		return ()=> {document.body.classList.remove('overflow')}
	},[]);
	
	if(logged === null)
		return <></>;
	
	return (<>
		<Link to='/' className='link adm red' > Back </Link>
		{ !logged ? <LogInPage logIn={submitLog} /> :
		<LoggedIn/>}
		</>)
	}
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function LogInPage(props:{logIn: React.Dispatch<React.SetStateAction<number>>}){
		// eslint-disable-next-line
		function handleSubmit(event:FormEvent){
		event.preventDefault()
			const form = new FormData(event.target as HTMLFormElement);
			const data : {[key:string]:FormDataEntryValue} = {};
			for(const [key,value] of form.entries())
				data[key] = value;
			
			fetch(config.url2 + '/api/login', {
				credentials: 'include',		//needed to send and recieve cookies
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST' ,
				body: JSON.stringify(data)
			}).then(res=>res.json())
			.then( res => {
				props.logIn( res.status )
				console.log(res);
			})
			.catch( err => console.error(err));
		}
		
		return <form className='text-middle flex-middle' method='POST' onSubmit={handleSubmit} action={config.url2 + '/api/login'}>
			<table className='text-middle'>
				<tbody>
					<tr>
						<td><label htmlFor='email'>Email:</label></td>
						<td><input id='email' name='Email' type='text' /></td>
					</tr>
					<tr>
						<td><label htmlFor='password'>Password:</label></td>
						<td><input id='password' name='Password' type='password' /></td>
					</tr>
					<tr><td colSpan={2}><button type='submit'> Log In </button></td></tr>
				</tbody>
			</table>
		</form>;
	}
	
	function LoggedIn(){
		const [showDialog, setDialog] = useState(false);
		const currentAnimal = useRef<Animal | null>(null);
		
		return (<>
			<Link to='./new' className='blue link adm '>  New </Link>
			<div>
				<h1 style={{ textAlign: 'center', marginTop: 0, paddingTop: 10 }} > Haha, you admin now </h1>
				{['dogs', 'cats', 'birds'].map((animal, index) => <AnimalTable key={index} animal={animal} currentAnimal={currentAnimal} setDialog={setDialog} />)}
				{(showDialog && currentAnimal.current != null) ?
					<AnimalModal animal={currentAnimal.current} setShow={setDialog} isWritable={true} /> : <></>}
			</div>
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
					<table style={{ margin: '50px auto' }}>
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