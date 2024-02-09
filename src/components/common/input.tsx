import './input.css';

export interface IInputProps {
    text: string,
    type: string,
    img: string
}

export function Input (props: IInputProps) {
  const altText = `${props.text} icon`
  return (
    <section className='group'>
    <img className='input-img' src={props.img} alt={altText} />
    <input type={props.type}  placeholder={props.text}/>
    </ section>
  );
}
