import './header.css';
import { useAuthContext } from '../../../context/AuthContext';
import { FaSearch } from 'react-icons/fa';
import { ChangeEvent, ReactElement } from 'react';
import { useFilterContext } from '../../../context/FilterContext';
import { FilterType } from '../../../utils/interfaces/product';

export function Header(): ReactElement {
  const userAuth = useAuthContext();
  const filter = useFilterContext();
  const inputValue =
    filter.filter.type === FilterType.name ? filter.filter.param : '';

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    filter.setFilter({ type: FilterType.name, param: e.target.value });
  }

  return (
    <section className="home-header">
      <section className="home-header-user">
        <img
          className="header-avatar"
          src={`https://unavatar.io/github/${
            userAuth.user?.username ? userAuth.user.username : 'default'
          }`}
          alt={`${
            userAuth.user?.name ? userAuth.user.username : 'default'
          } avatar`}
        />
        <h2>Welcome, {userAuth.user?.name}</h2>
      </section>
      <section>
        <p className="header-search-title">Find your favorite book</p>
        <div className="header-search-group">
          <span className="header-search-icon">
            <FaSearch />
          </span>
          <input
            onChange={handleFilter}
            value={inputValue}
            className="header-search-input"
            type="search"
            placeholder="Search"
          />
        </div>
      </section>
    </section>
  );
}
