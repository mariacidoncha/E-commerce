import './category.css';
import { ReactElement } from 'react';

export interface ICategoryProps {
  name: string;
  children: ReactElement;
}

export function Category(props: ICategoryProps) {
  return (
    <article className="filter-group">
      <span className="icon-span">{props.children}</span>
      <p>{props.name}</p>
    </article>
  );
}
