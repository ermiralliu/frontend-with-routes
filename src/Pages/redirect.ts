import { API_USER } from "../constants";
import { get } from "../eventHandler";


//a function that redirects the user based on his state of authentication
export default function redirect(show: ((arg: boolean) => void)){ //show allows the current element to render if it's the right one
  get(API_USER).then( (response) => {
    const loggedIn = response !== null;
    const currentPath = window.location.pathname;
    if(!loggedIn){
      if(currentPath === '/admin'){
        show(true);
        return;
      }
      window.location.href = window.location.origin + '/admin';
      return;
    }
    if( currentPath === '/admin'){
      window.location.href = window.location.origin + '/admin/user';
      return;
    }
    show(true);
  });
}

