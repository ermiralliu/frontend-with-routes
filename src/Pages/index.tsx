import { useEffect, useRef, useState } from 'react'
import { AnimalType, Animal } from '../Components/AnimalChoice';
//import Components from '../Components';
import {FigureSection, SearchBar, AnimalNav, DarkModeToggle} from '../Components';
import { Link, useBeforeUnload, useLocation } from 'react-router-dom';
import { isDark } from '../useTheme';
//import './index.css';
//import { About, Contact } from '../Components/FigureSection'; we're gonna put these inside a dialog and do the eventHandling later


//const {FigureSection, SearchBar, AnimalNav, DarkModeToggle} = Components;

export default function Home(){
  const location = useLocation();
  console.log(location.state);  //this will be null or undefined when opened the first time, so we use JSONparse
  const [darkMode, setDarkMode] = useState( isDark( location.state ) );
  const [animal, setAnimal] = useState<AnimalType>(localStorage.getItem('animal') as AnimalType ?? Animal.DOG);
  const [search, setSearch] = useState<string>('');
  const checked = useRef(darkMode);
  const animalToSave = useRef(animal);

  useEffect( ()=>{
    document.body.className = darkMode ? 'dark' : 'light';
    checked.current = darkMode;
  }, [darkMode] );

  useEffect( ()=> {animalToSave.current = animal}, [animal])

  useBeforeUnload(()=>{
    saveAfterClose(checked, animalToSave);
  });

  useEffect( ()=>{
    console.log( `starting mode: ${checked.current.toString()} and starting animal: ${animalToSave.current}`)
    window.addEventListener('beforeunload', ()=>{
      saveAfterClose(checked, animalToSave);
      console.log(`successfully saved the last mode: ${checked.current} and animal: ${animalToSave.current}`); //this gets printed twice in debug, but only runs once in debug build so don't worry
    });
  }, []);  

  const URL = (search === '') ? animal 
    : (animal + '?search=' + search);
  
  return (
    <>
      <Link className='link adm' to='admin' state={{darkMode}} onClick={ ()=> saveAfterClose(checked, animalToSave)}> Log In </Link>
      <DarkModeToggle setDarkMode={setDarkMode} defaultChecked={darkMode} />
      <AnimalNav changeView={setAnimal}/>
      <SearchBar setUrl={setSearch}/>  
      <FigureSection currentURL={URL}/>
    </>
  )
}

function saveAfterClose(checked: React.MutableRefObject<boolean>, animalToSave: React.MutableRefObject<string>){
  localStorage.setItem('darkMode', checked.current.toString());
      localStorage.setItem('animal', animalToSave.current as string);
}