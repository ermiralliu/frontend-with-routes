import './AnimalFigure.css';
import { AnimalObject } from '../../../../AnimalObject';

export default function AnimalFigure(
  args: {
    animal: AnimalObject,
    onClick: (index: number) => void
  }): JSX.Element {
  const animal = args.animal;
  return (
    <figure className='body-figure' onClick={() => args.onClick(animal.id - 1)}>
      <img className="body-img" alt={animal.name} src={animal.image_url} />
      <figcaption>
        Name:  {animal.name}<br />
        Origin:  {animal.origin || animal.place_of_found || "placeholder"}
      </figcaption>
    </figure>
  );
}