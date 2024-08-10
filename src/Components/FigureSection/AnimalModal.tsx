import { useRef, useEffect } from "react";
import { Animal } from "./FigureSection";


export default function AnimalModal(props: { animal: Animal; setShow: (value: boolean) => void; writable: boolean; children: string | JSX.Element; }) {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		dialog.current?.showModal();
	}, []);

	return (
		<dialog ref={dialog} onClick={() => props.setShow(false)}>
			<table onClick={(event) => event.stopPropagation()}>
				<tbody>
					{Object.entries(props.animal).map(([key, value], index) => <tr key={index}>
						<th> {key} </th>
						<td>
							{ props.writable ?
								<input type='text' defaultValue={value.toString()} readOnly={key === 'id'} />
								: value?.toString()}
						</td>	
					</tr>)}
					{props.children}
				</tbody>
			</table>
		</dialog>
	);
}
