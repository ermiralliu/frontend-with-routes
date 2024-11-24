import { useEffect, useState } from "react";
import { postLogin } from "../../eventHandler";
import redirect from "../redirect";
import './admin.css';
import { Link } from "react-router-dom";

export default function LogInPage() {
  //console.log(window.location);
  const [show, setShow] = useState(false);
  useEffect(()=>{
    redirect(setShow);
  },[]);

  if(!show)
    return <></>; //I need to have a loading animation here

  return <>
    <Link to='/' className='link adm red'> Back </Link>
    <form
      className='text-middle flex-middle'
      method='POST'
      onSubmit={
        async (event) =>{
          if(await postLogin(event))
            window.location.href = window.location.origin + '/admin/user';
        }
      }
    >
      <div id='login-div' className='text-middle'>
        <h2> Log In </h2>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' name='Email' type='text' />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' name='Password' type='password' />
        </div>
        <div>
          <button id="login-button" type='submit'> Log In </button>
        </div>
      </div>
    </form>
  </>;
}
