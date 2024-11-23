import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../InsertPage/AnimalInsertPage.css";
import { API_USER } from "../../constants";
import { LoggedIn } from "./LoggedIn";
import { LogInPage } from "./LogInPage";

export type Animal = { image_url: string; name: string, id: number, [key: string]: string | number };

export default function Admin() {
	const [responseStatus, setStatus] = useState<number>(0);
	const [logged, logIn] =  useState<boolean|null>(null);
	
	useEffect(()=>{	//does a get request so the server checks the cookies
		fetch(API_USER, {
				credentials: 'include'
			})
			.then( res => {
				console.log(res.status);
        if(res.ok){
          logIn( res.status === 200 );
          return res.json();
        }
        logIn( false );
				return Promise.reject(res);
			})
			.then( res => console.log(res))
			.catch( error => {
        if (typeof error.json === "function") {
          error.json().then((jsonError: Error) => {
            console.log("Json error from API");
            console.log(jsonError);
          }).catch(() => {
            console.log("Generic error from API");
            console.log(error.statusText);
          });
        } else {
            console.log("Fetch error");
            console.log(error);
        }
      });
	}, [responseStatus]);
	
	useEffect( ()=>{
		if(!document.body.classList.contains('overflow') )
			document.body.classList.add('overflow');
		return ()=> {document.body.classList.remove('overflow')}	//before component unmount
	},[]);
	
	if(logged === null) // I did this so we don't render anything until we see if there's a user or not. A loading animation should be added here instead
		return <></>;
	
	return (
		<>
			<Link to='/' className='link adm red' > Back </Link>
			{ !logged ? <LogInPage logIn={setStatus} /> 
      : <LoggedIn/>}
		</>)
}