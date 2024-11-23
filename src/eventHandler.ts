import { FormEvent } from "react";
import { API_ANIMALS, API_LOGIN } from "./constants";

enum DataVariant{
  FORM,
  JSON
}

function prepareForm(event: FormEvent, variant: DataVariant){ //and the fetch headers
  event.preventDefault();
  const form = new FormData(event.target as HTMLFormElement);
  const headers: {'Accept':string, 'Content-Type'?: string} = {'Accept': 'application/json'};
  if(variant === DataVariant.FORM)
    return {form, headers};
  
  const data: { [key: string]: FormDataEntryValue } = {};
  for (const [key, value] of form.entries())
    data[key] = value;
  headers['Content-Type'] = 'application/json';
  return {form: data, headers};
}

export async function get(url: string){
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Accept': 'application/json' },
    method: 'GET',
  });
  if( !res.ok )
    return null;

  const resJson = res.json();
  console.log(resJson);

  return resJson;
}

export async function postLogin(event: FormEvent){
  const {form, headers} = prepareForm(event, DataVariant.JSON);
  
  const body = JSON.stringify(form);
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

export async function postAnimal(event: FormEvent){
  const {form, headers} = prepareForm(event, DataVariant.FORM); 
  const body = JSON.stringify(form);
  const res = await fetch(API_ANIMALS, {
    credentials: 'include',
    headers,
    method: 'POST',
    body
  });
  if(!res.ok){
    console.log("response is not okay");
    return;
  }
  alert((await res.json() as {message:string}).message);
}

export async function putAnimal(event: FormEvent, id: number){
  await modifyAnimal(event, id, 'PUT');
}
export async function deleteAnimal(event: FormEvent, id: number){
  await modifyAnimal(event, id, 'DELETE');
}

async function modifyAnimal(event: FormEvent, id: number, method: 'PUT'| 'DELETE'){
  const {form, headers} = prepareForm(event, DataVariant.FORM); 
  const body = JSON.stringify(form);
  const url = API_ANIMALS + '/' + id;

  const res = await fetch(url, {
    credentials: 'include',
    headers,
    method,
    body
  });
  if(!res.ok)
    return;
  const {message} = await res.json() as {message:string};
  alert(message);
}

export default function handleSubmit(
  url: string, 
  event: FormEvent, 
  method: string = 'POST', 
  changeStatus?: (stat: number| ((a:number)=> number)) => void,
  withImage: boolean = true
) {
  event.preventDefault();
  const form = new FormData(event.target as HTMLFormElement);
  const data: { [key: string]: FormDataEntryValue; } = {};
  for (const [key, value] of form.entries())
    data[key] = value;

  console.log(data);

  const body = withImage ? form : JSON.stringify(data);
  
  const headers: {[key: string]: string} = { 'Accept': 'application/json' };
  if(!withImage) headers['Content-Type'] = 'application/json';

  fetch(url, {
    credentials: 'include', //needed to send and recieve cookies
    headers,
    method,
    body
  }).then(res =>{
    if(!res.ok){
      if(changeStatus)
        changeStatus(e=>e+1);
      return Promise.reject(res);
    }
    return res.json();
  }).then(res => {
    if(changeStatus)
      changeStatus(res.status);
    console.log(res);
  }).catch(err => console.error(err));
}

