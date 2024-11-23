import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimalModal } from "../Home/Components";
import { Animal } from "./Admin";
import { AnimalTable } from "./Components/AnimalTable";

import { AnimalType } from "../../AnimalChoice";

export function LoggedIn() {
  const [showDialog, setDialog] = useState(false);
  const currentAnimal = useRef<Animal | null>(null);
  const currentType = useRef<AnimalType>('dog');

  return (<>
    <Link to='./new' className='blue link adm '>  New </Link>
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 0, paddingTop: 10 }}> Haha, you admin now </h1>
      {['dog', 'cat', 'bird'].map((animal, index) => <AnimalTable 
        key={index} 
        animal={animal} 
        currentAnimal={currentAnimal} 
        currentType={currentType}
        setDialog={setDialog} 
      />)}
      {(showDialog && currentAnimal.current != null) ?
        <AnimalModal animal={currentAnimal.current} type={currentType.current} setShow={setDialog} isWritable={true} />
      : <></>}
    </div>
  </>);
}
