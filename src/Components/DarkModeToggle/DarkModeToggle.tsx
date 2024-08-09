import './DarkModeToggle.css';

export default function DarkModeToggle(props:{setDarkMode: (update: (state: boolean)=> boolean)=> void, defaultChecked:boolean} ){
    
    return (
        <label className='switch'>
            <input id='darkmode-toggle' type='checkbox' 
                defaultChecked={props.defaultChecked}
                onChange={ ()=> props.setDarkMode( state => {
                    const nextState = !state;
                    return nextState}
                )}
            />
            <span className='slider round'></span>
        </label>
    );
}