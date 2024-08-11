import { useEffect, useRef, useState} from 'react';
import AnimalFigure from './AnimalFigure';
import './FigureSection.css';
import AnimalModal from './AnimalModal';
import config from "../../Pages/config.json" with { type: "json" };

export type Animal = {image:string; name:string, id:number, [key:string]:string|number};   //I actually fucked up with this naming

function FigureSection(props:{currentURL: string}) :JSX.Element{  //the main section basically 
	const [ figures, setFigures ] = useState([] as Animal[]);   //everytime the state is changed, we get a rerendering,
	//so I only rerender once the animal array is returned successfully
	const [ showModal, setModal] = useState(false);
	const animal = useRef(1);

	useEffect( ()=>{
		get(props.currentURL);
		function get(currentURL :string){
			fetch(`${config[ 'url' ]}${currentURL}`)
				.then( (respose) => {
					if(respose.ok)
						return respose.json();
				}).then( (resJson) =>{
					setFigures(resJson);
				}).catch( err=>{
					console.error(err);
					alert("Could't GET figures");
				});
		}
	}, [props.currentURL]);  //it only works when currentURL changes
	const fig = figures.map((element, index)=>      //we make an animal section for each animal
		<AnimalFigure key={index} animal={element} onClick={ (currentAnimal:number)=> {
			animal.current = currentAnimal;
			setModal( true );
		} }/>    
	);
	return (
		<>
			<div className={'figure-section'}> {fig} </div>
			{ showModal ? <AnimalModal animal={ figures[animal.current] } setShow={setModal} isWritable={false}/> : <></>}  
		</>
	);     
}

export default FigureSection; 