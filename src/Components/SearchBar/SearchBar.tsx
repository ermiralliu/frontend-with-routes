import './SearchBar.css';

export default function SearchBar(props: {setUrl: (url: string)=> void}){

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        if( event.currentTarget !== null )
            props.setUrl(event.currentTarget.value);
    }

    return (
        <div>
            <span className={'middle'}>
                <input id='search-bar' type='search' onChange={handleInputChange}/>
            </span>
        </div>

    );
}