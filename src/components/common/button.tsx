import './button.css';
import { ReactNode } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface IButtonProps {
  children: ReactNode;
  size?: string;
  icon?: boolean;
  handle?: () => void;
}

export function Button(props: IButtonProps) {
  const iconClass = props.icon ? 'hide' : '';
  return (
    <button
      onClick={props.handle}
      className="my-button"
      style={{ fontSize: props.size }}
    >
      {props.children}
      <FaArrowRight className={iconClass} />
    </button>
  );
}
