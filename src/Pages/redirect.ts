import { API_USER } from "../constants";
import { get } from "../eventHandler";

export default function redirect(show: ((arg0: boolean) => void)){
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

