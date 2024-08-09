import { useEffect, useRef, useState } from 'react'
import { AnimalType, Animal } from '../Components/AnimalChoice';
import Components from '../Components';
import './index.css';


const {FigureSection, SearchBar, AnimalNav, DarkModeToggle} = Components;

export default function Home(){
  const [darkMode, setDarkMode] = useState( JSON.parse(localStorage.getItem('darkMode') ?? 'true') as boolean);
  const [animal, setAnimal] = useState<AnimalType>(localStorage.getItem('animal') as AnimalType ?? Animal.DOG);
  const [search, setSearch] = useState<string>('');
  const checked = useRef(darkMode);
  const animalToSave = useRef(animal);

  useEffect( ()=>{
    document.body.className = darkMode ? 'dark' : 'light';
    checked.current = darkMode;
  }, [darkMode] );
  useEffect( ()=> {animalToSave.current = animal}, [animal])

  useEffect( ()=>{
    console.log( `starting mode: ${checked.current.toString()} and starting animal: ${animalToSave.current}`)
    window.addEventListener('beforeunload', ()=>{
      localStorage.setItem('darkMode', checked.current.toString());
      localStorage.setItem('animal', animalToSave.current as string);
      console.log(`successfully saved the last mode: ${checked.current} and animal: ${animalToSave.current}`); //this gets printed twice in debug, but only runs once in debug build so don't worry
    });
  }, []);  

  const URL = (search === '') ? animal 
    : (animal + '?search=' + search);
  
  return (
    <>
      <a className='adm' href='admin'> Log In </a>
      <DarkModeToggle setDarkMode={setDarkMode} defaultChecked={darkMode} />
      <AnimalNav changeView={setAnimal}/>
      <SearchBar setUrl={setSearch}/>
      <FigureSection currentURL={URL}/>
    </>
  )
}