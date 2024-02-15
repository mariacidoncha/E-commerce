import './header.css';
import { useAuthContext } from '../../../contexts/AuthContext';
import { FaSearch } from 'react-icons/fa';
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface IHeaderProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function Header(props: IHeaderProps): ReactElement {
  const userAuth = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    setSearchParams({ filter: e.target.value });
    props.setFilter(e.target.value);
  }

  return (
    <section className="home-header">
      <section className="home-header-user">
        <img
          className="header-avatar"
          src={`https://unavatar.io/github/${
            userAuth.user.username ? userAuth.user.username : 'default'
          }`}
          alt={`${
            userAuth.user.name ? userAuth.user.username : 'default'
          } avatar`}
        />
        <h2>Welcome, {userAuth.user.name}</h2>
      </section>
      <section>
        <p className="header-search-title">Find your favorite book</p>
        <div className="header-search-group">
          <span className="header-search-icon">
            <FaSearch />
          </span>
          <input
            onChange={handleFilter}
            value={filter}
            className="header-search-input"
            type="search"
            placeholder="Search"
          />
        </div>
      </section>
    </section>
  );
}
