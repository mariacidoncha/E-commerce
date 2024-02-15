// Generated by https://quicktype.io

export interface Product {
  id: string;
  name: string;
  image: string;
  year: string;
  author: Author;
  synopsis: string;
  rate: number;
  genre: string[];
  options: Option[];
}

export interface Author {
  name: string;
  description: string;
  image: string;
}

export interface Option {
  cover: Cover;
  price: number;
}

export enum Cover {
  Ebook = 'Ebook',
  Hardcover = 'Hardcover',
  Kindle = 'Kindle',
  Paperback = 'Paperback',
}