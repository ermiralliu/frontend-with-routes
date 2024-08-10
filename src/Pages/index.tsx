import { useEffect, useRef, useState } from 'react'
import { AnimalType, Animal } from '../Components/AnimalChoice';
//import Components from '../Components';
import {FigureSection, SearchBar, AnimalNav} from '../Components';
import { Link } from 'react-router-dom';
//import { About, Contact } from '../Components/FigureSection'; we're gonna put these inside a dialog and do the eventHandling later


//const {FigureSection, SearchBar, AnimalNav, DarkModeToggle} = Components;

export default function Home(){
  // const location = useLocation();
  // console.log(location.state);  //this will be null or undefined when opened the first time, so we use JSONparse
  const [animal, setAnimal] = useState<AnimalType>(localStorage.getItem('animal') as AnimalType ?? Animal.DOG);
  const [search, setSearch] = useState<string>('');
  
  const animalToSave = useRef(animal);

  useEffect( ()=> {animalToSave.current = animal}, [animal])


  useEffect( ()=>{
    console.log( `Starting animal: ${animalToSave.current}`)
    
    return ()=> localStorage.setItem('animal', animalToSave.current as string); //this gets executed when the component unmounts
  }, []);  

  const URL = (search === '') ? animal 
    : (animal + '?search=' + search);
  
  return (
    <>
      <Link className='link adm' to='admin'> Log In </Link>
      <AnimalNav changeView={setAnimal}/>
      <SearchBar setUrl={setSearch}/>  
      <FigureSection currentURL={URL}/>
    </>
  )
}