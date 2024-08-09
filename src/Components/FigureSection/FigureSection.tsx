import { useEffect, useRef, useState} from 'react';
import AnimalFigure from './AnimalFigure';
import './FigureSection.css';

type Animal = {image:string; name:string, id:number, [key:string]:string|number};   //I actually fucked up with this naming

function FigureSection(props:{currentURL: string}) :JSX.Element{  //the main section basically 
    const [ figures, setFigures ] = useState([] as Animal[]);   //everytime the state is changed, we get a rerendering,
    //so I only rerender once the animal array is returned successfully
    const [ showModal, setModal] = useState(false);
    const animal = useRef(1);

    useEffect( ()=>{
        get(props.currentURL);
        function get(currentURL :string){
            fetch(`https://freetestapi.com/api/v1/${currentURL}`)
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
            { showModal ? <AnimalModal animal={ figures[animal.current] } setShow={setModal}/> : <></>}  
        </>
    );     
}

function AnimalModal(props: {animal: Animal, setShow: (value: boolean)=> void}){
    const dialog = useRef<HTMLDialogElement>(null);
    
    useEffect(()=>{
            dialog.current?.showModal();
    });

    return(
        <dialog ref={dialog} onClick={()=>dialog.current?.close()} onClose={ () => props.setShow(false) }>
            <table onClick= {(event) => event.stopPropagation()}>
                <tbody>
                    {Object.entries(props.animal).map( ([key, value], index) => 
                        <tr key={index}>
                            <th> {key} </th>
                            <td> {value?.toString()} </td>  
                        </tr>)}
                </tbody>
            </table>
        </dialog>
    );
}

export default FigureSection; 