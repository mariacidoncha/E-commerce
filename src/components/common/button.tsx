import './button.css';
import { ReactNode } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface IButtonProps {
  children: ReactNode;
  size?: string;
}

export function Button(props: IButtonProps) {
  return (
    <button className="my-button" style={{ fontSize: props.size }}>
      {props.children}
      <FaArrowRight />
    </button>
  );
}
