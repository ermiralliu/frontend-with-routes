import { useEffect, useRef, useState } from 'react'
import { AnimalType, Animal } from '../../AnimalChoice';
import {FigureSection, SearchBar, AnimalNav} from './Components';
import { Link } from 'react-router-dom';
//import { About, Contact } from '../Components/FigureSection'; we're gonna put these inside a dialog and do the eventHandling later
// const location = useLocation();  <<= this is used to pass stuff between routes, but I avoided that here


export default function Home(){
  // const [animal, setAnimal] = useState<AnimalType>(localStorage.getItem('animal') as AnimalType ?? Animal.DOG);
  const [animal, setAnimal] = useState<AnimalType>(Animal.CAT);
  const [search, setSearch] = useState<string>('');
  
  const animalToSave = useRef(animal);

  useEffect( ()=> {animalToSave.current = animal}, [animal])

  useEffect( ()=> {
    console.log( `Starting animal: ${animalToSave.current}`)
    return ()=> localStorage.setItem('animal', animalToSave.current as string); //this gets executed when the component unmounts
  }, []);  

  const URL = (search === '') ? animal 
    : (animal + '?search=' + search);
  
  return (
    <>
      <Link className='link adm red' to='admin'> Log In </Link>
      <AnimalNav changeView={setAnimal}/>
      <SearchBar setUrl={setSearch}/>  
      <FigureSection currentURL={URL}/>
    </>
  )
}