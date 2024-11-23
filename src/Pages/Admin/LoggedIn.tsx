import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimalModal } from "../Home/Components";
import { AnimalTable } from "./Components/AnimalTable";

import { AnimalType } from "../../AnimalChoice";
import { AnimalObject } from "../../AnimalObject";
import redirect from "../redirect";

export function LoggedIn() {
  const [showDialog, setDialog] = useState(false);
  const currentAnimal = useRef<AnimalObject | null>(null);
  const currentType = useRef<AnimalType>('dog');
  const [show, setShow] = useState(false);

  console.log(window.location.origin);

  useEffect(()=>{
    redirect(setShow);
  },[]);

  if(!show)
    return <></>;

  return (<>
    <Link to='../new' className='blue link adm '>  New </Link>
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
