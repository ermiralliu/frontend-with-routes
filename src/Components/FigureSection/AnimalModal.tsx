import { useRef, useEffect, FormEvent} from "react";
import { Animal } from "./FigureSection";

//This probably will need to be refactored to something clearer

export default function AnimalModal(props: { animal: Animal, setShow: (value: boolean) => void, isWritable: boolean }) {
	const dialog = useRef<HTMLDialogElement>(null);
	
	//const form = useRef<HTMLFormElement>(null);

	useEffect(() => {
		dialog.current?.showModal();
	}, []);

	function handleSubmit(event: FormEvent<HTMLFormElement>){	//maybe this'll be changed
		
		// if(form.current === null)
		// 	return;
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		
		// for( const [key, value] of Object.entries(event.target))
		// 	console.log( key + ' : ' + value.name + ' : ' + value.value);
		event.preventDefault();
		const formJson = Object.fromEntries(formData.entries());
		console.log(formJson); //okay, so it's actually working 
		//the delete function just sends a url, so that'll be easy af to implement
	}

	return (
		<dialog ref={dialog} onClick={() => props.setShow(false)}>
			{ 
				props.isWritable ? 
					<form id='update-form' onSubmit={handleSubmit}>
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

function ModalTable(props: {animal: Animal, isWritable: boolean, children: React.ReactNode}){

	return(
		<table onClick={(event) => event.stopPropagation()}>
			<tbody>
				{Object.entries(props.animal).map(([key, value], index) => <tr key={index}>
					<th> {key} </th>
					<td>
						{ props.isWritable ?
							<input form='update-form' id={key} name={key} type='text' defaultValue={value.toString()} readOnly={key === 'id'} />
							: value?.toString()}
					</td>
				</tr>)}
				{props.children}
			</tbody>
		</table>
	);
}
