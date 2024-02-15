import './header.css';
import { useAuthContext } from '../AuthContext';
import { FaSearch } from 'react-icons/fa';
import { ReactElement } from 'react';

export function Header(): ReactElement {
  const userAuth = useAuthContext();

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
            className="header-search-input"
            type="search"
            placeholder="Search"
          />
        </div>
      </section>
    </section>
  );
}
