import { useEffect, useRef, useState} from 'react';
import AnimalFigure from './AnimalFigure';
import './FigureSection.css';
import AnimalModal from '../../../../SharedComponents/AnimalModal';
import { API_ANIMALS } from '../../../../constants';
import { get } from '../../../../eventHandler';
import { AnimalObject } from '../../../../AnimalObject';

export default function FigureSection(props:{currentURL: string}): JSX.Element{  //the main section basically 
	const [ figures, setFigures ] = useState([] as AnimalObject[]);   //everytime the state is changed, we get a rerendering,
	//so I only rerender once the animal array is returned successfully
	const [ showModal, setModal] = useState(false);
	const animal = useRef(1);

	useEffect( ()=>{

    const url = API_ANIMALS + '/' + props.currentURL;
    get(url).then( result => setFigures(result ?? []) );

	}, [props.currentURL]);  //it only works when currentURL changes

	const fig = figures?.map((element, index)=>      //we make an animal section for each animal
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