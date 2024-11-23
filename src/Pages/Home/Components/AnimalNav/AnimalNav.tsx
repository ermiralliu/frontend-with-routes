import { AnimalType } from '../../../../AnimalChoice';
import './AnimalNav.css';

const AnimalImgString : {[key:string]:string} = {
  Dogs : 'https://1.bp.blogspot.com/_EAViqbzwc_s/TKGUD30c95I/AAAAAAAABX4/3mESqT-k0uA/s1600/dog+(7).jpg',
  Cats : 'https://images5.alphacoders.com/287/287909.jpg',
  Birds : 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?cs=srgb&dl=wood-flight-bird-326900.jpg&fm=jpg'
}
Object.freeze(AnimalImgString);


function Choice( props:{ changeView: (a: AnimalType)=>void, children:string},) {
  const imgSrc = AnimalImgString[ props.children ];
  const str = props.children.slice(0, props.children.length-1).toLowerCase();
  return (
    <div className={'choice-div'}>
      <h1 className={'animal-nav-h'}>{props.children}</h1>
      <img className={'head-image'} alt={props.children} src={imgSrc} onClick={ ()=>props.changeView( str as AnimalType) }></img>
    </div>
  );
}

export default function Container(props:{ changeView:(choice: AnimalType)=>void }): JSX.Element {
    return (
      <nav className={'nav-bar'}>
        <Choice key={0} changeView={props.changeView}>
          Dogs
        </Choice>
        <Choice key={1} changeView={props.changeView}>
          Cats
        </Choice>
        <Choice key={2} changeView={props.changeView}>
          Birds
        </Choice>
      </nav>
    );
}