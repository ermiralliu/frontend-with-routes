import { FormEvent } from "react";
import { API_ANIMALS, API_LOGIN } from "./constants";
import { AnimalType } from "./AnimalChoice";

enum DataVariant{
  FORM,
  JSON
}

function prepareForm(event: FormEvent, variant: DataVariant){ //prepares the body and the fetch headers
  event.preventDefault();
  const form = new FormData(event.target as HTMLFormElement);
  const headers: {'Accept':string, 'Content-Type'?: string} = {'Accept': 'application/json'};
  if(variant === DataVariant.FORM)
    return {body: form, headers};
  
  //this next part doesn't really seem useful ngl
  const data: { [key: string]: FormDataEntryValue } = {};
  for (const [key, value] of form.entries())
    data[key] = value;
  headers['Content-Type'] = 'application/json';
  return {body: JSON.stringify(data), headers};
}
// this will be used instead of the enum thing
// function formToJson(args : {form: FormData, headers: { Accept: string, 'Content-Type': string }}){
//   const data: { [key: string]: FormDataEntryValue } = {};
//   for (const [key, value] of args.form.entries())
//     data[key] = value;
//   args.headers['Content-Type'] = 'application/json';
//   return {form: data, headers: args.headers};
// }

export async function get(url: string){
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Accept': 'application/json' },
    method: 'GET',
  });
  if( !res.ok )
    return null;

  const resJson = await res.json();
  console.log(resJson);

  return resJson;
}

export async function postLogin(event: FormEvent){
  const {body, headers} = prepareForm(event, DataVariant.JSON);
  
  const res = await fetch(API_LOGIN, {
    credentials: 'include',
    headers,
    method: 'POST',
    body
  })
  if(res.ok && res.status === 200)
    return true;
  return false;
}

export async function postAnimal(event: FormEvent, type: string){
  const {body, headers} = prepareForm(event, DataVariant.FORM); 
  const url = API_ANIMALS + '/' +type;

  const res = await fetch(url, {
    credentials: 'include',
    headers,
    method: 'POST',
    body
  });
  if(!res.ok){
    console.log("response is not okay");
    return;
  }
  alert('response is okay');
}

export async function deleteAnimal(type: AnimalType, id: number){
  const url = API_ANIMALS + '/' + type +'/'+ id;

  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Accept' : 'application/json'},
    method: 'DELETE',
    body: null
  });
  if(!res.ok){
    console.log("response is not okay");
    return;
  }
  const {message} = await res.json() as {message:string};
  alert(message);
  window.location.reload();
}

export async function putAnimal(event: FormEvent, type: AnimalType, id: number){
  const {body, headers} = prepareForm(event, DataVariant.FORM) as {body: FormData, headers: {Accept: string} }; //specifying the type so the FormData-specific methods appear in the editor 
  body.delete('id');
  const url = API_ANIMALS + '/' + type +'/' + id;

  const res = await fetch(url, {
    credentials: 'include',
    headers,
    method: 'PUT',
    body,
  });
  if(!res.ok){
    console.log("response is not okay");
    return;
  }
    
  const {message} = await res.json() as {message:string};
  alert(message);
  window.location.reload();
}

// below is a more complete fetch:

// fetch(API_USER, {
//   credentials: 'include'
// })
// .then( res => {
//   console.log(res.status);
//   if(res.ok){
//     logIn( res.status === 200 );
//     return res.json();
//   }
//   logIn( false );
//   return Promise.reject(res);
// })
// .then( res => console.log(res))
// .catch( error => {
//   if (typeof error.json === "function") {
//     error.json().then((jsonError: Error) => {
//       console.log("Json error from API");
//       console.log(jsonError);
//     }).catch(() => {
//       console.log("Generic error from API");
//       console.log(error.statusText);
//     });
//   } else {
//       console.log("Fetch error");
//       console.log(error);
//   }
// });