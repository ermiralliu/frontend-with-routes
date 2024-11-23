import { useEffect, useState } from "react";
import { postLogin } from "../../eventHandler";
import redirect from "../redirect";


export default function LogInPage() {
  //console.log(window.location);
  const [show, setShow] = useState(false);
  useEffect(()=>{
    redirect(setShow);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if(!show)
    return <></>; //I need to have a loading animation here

  return <form 
    className='text-middle flex-middle' 
    method='POST' 
    onSubmit={
      async (event) =>{
        if(await postLogin(event))
          window.location.href = window.location.origin + '/admin/user';
      } 
    }
  >
    <table className='text-middle'>
      <tbody>
        <tr>
          <td><label htmlFor='email'>Email:</label></td>
          <td><input id='email' name='Email' type='text' /></td>
        </tr>
        <tr>
          <td><label htmlFor='password'>Password:</label></td>
          <td><input id='password' name='Password' type='password' /></td>
        </tr>
        <tr><td colSpan={2}><button type='submit'> Log In </button></td></tr>
      </tbody>
    </table>
  </form>;
}
