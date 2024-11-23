import { API_LOGIN } from "../../constants";
import handleSubmit from "../../eventHandler";


export function LogInPage(props: { logIn: (status: number)=> void; }) {

  return <form 
    className='text-middle flex-middle' 
    method='POST' 
    onSubmit={
      (event) => handleSubmit(API_LOGIN, event, undefined, props.logIn, false)
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
