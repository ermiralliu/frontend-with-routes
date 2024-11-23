import { useRef, useEffect} from "react";
import { AnimalObject } from '../AnimalObject';
import { API_ANIMALS } from "../constants";
import handleSubmit from "../eventHandler";

//This probably will need to be refactored to something clearer

export default function AnimalModal(props: { animal: AnimalObject, setShow: (value: boolean) => void, isWritable: boolean, type?: string }) {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		dialog.current?.showModal();
	}, []);

	return (
		<dialog ref={dialog} onClick={() => props.setShow(false)}>
			{ 
				props.isWritable ? 
					<form id='update-form' onSubmit={ event => handleSubmit(
            API_ANIMALS + '/'+ props.type + '/' + props.animal.id, 
            event,
            'PUT')
          }>
						<ModalTable isWritable={true} animal={props.animal}> 
							<tr>
								<td colSpan={2} style={{textAlign:'center'}}>
									<button type='submit'> Update </button>
									<button type='submit'> Delete </button>
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
