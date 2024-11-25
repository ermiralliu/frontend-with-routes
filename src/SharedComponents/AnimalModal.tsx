import { useRef, useEffect} from "react";
import { AnimalObject } from '../AnimalObject';
import { deleteAnimal, putAnimal } from "../eventHandler";
import { AnimalType } from "../AnimalChoice";

//This probably will need to be refactored to something clearer

export default function AnimalModal(props: { animal: AnimalObject, setShow: (value: boolean) => void, isWritable: boolean, type?: AnimalType }) {
	const dialog = useRef<HTMLDialogElement>(null);
  const action = useRef<'PUT'| 'DELETE'>('PUT');

	useEffect(() => { //maybe I will just use dialogs normally
		dialog.current?.showModal();
	}, []);

	return (
		<dialog ref={dialog} onClick={() => props.setShow(false)}>
			{ 
				props.isWritable ? 
					<form id='update-form' method={action.current} onSubmit={ async event => {
              event.preventDefault();
              console.log('form being submitted: ' +action.current);
              if(props.type === undefined)
                return;
              if(action.current === 'PUT')
                await putAnimal(event, props.type, props.animal.id);
              else
                await deleteAnimal(props.type, props.animal.id);
            } 
          }>
						<ModalTable isWritable={true} animal={props.animal}> 
							<tr>
								<td colSpan={2} style={{textAlign:'center'}}>
									<button type='submit' onClick={() => action.current = 'PUT'}> Update </button>
									<button type='submit' onClick={()=> action.current = 'DELETE'}> Delete </button>
								</td>
							</tr>
						</ModalTable>
					</form> :
				<ModalTable isWritable={false} animal={props.animal}><></></ModalTable>
			}
		</dialog>
	);
}

function ModalTable(props: {animal: AnimalObject, isWritable: boolean, children: React.ReactNode}){
  if(props.animal === undefined)
    return <></>;
  const body = Object.entries(props.animal).filter(([key]) => key !== 'image_url').map(([key, value], index) => <tr key={index}>
    <th> {key} </th>
      <td>
        { props.isWritable ?
          <input form='update-form' id={key} name={key} defaultValue={value} readOnly={key === 'id'} />
          : value}
      </td>
    </tr>);
    
  const final = (<tr>
    <th> image </th>
      <td>
        { props.isWritable ?
          <input form='update-form' id='image' name='image' type='file' accept="image/*"/>
          : props.animal.image_url}
      </td>
    </tr>);

	return(
		<table onClick={(event) => event.stopPropagation()}>
			<tbody>
          {body}
          {final}
          {props.children}
			</tbody>
		</table>
	);
}
