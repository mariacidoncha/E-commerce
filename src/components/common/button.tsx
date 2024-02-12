import './button.css';
import { FaArrowRight } from 'react-icons/fa';

interface IButtonProps {
  text: string;
}

export function Button(props: IButtonProps) {
  return (
    <button>
      {props.text}
      <FaArrowRight />
    </button>
  );
}
