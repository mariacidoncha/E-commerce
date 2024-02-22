import './profile.css';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/layouts/NavBar';
import { Header } from '../../components/layouts/Header';
import { Button } from '../../components/common/button';
import { useAuthContext } from '../../context/AuthContext';

export interface IProfileProps {}

export function Profile(props: IProfileProps) {
  const navigate = useNavigate();
  const user = useAuthContext();

  function handleClick() {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <>
      <Header />
      <section className="profile">
        <img
          src={`https://unavatar.io/github/${
            user.user?.username ? user.user.username : 'default'
          }`}
          alt={`${user.user?.username ? user.user.username : 'default'} avatar`}
        />
        <span>
          <p>Name:</p> {user.user?.name}
        </span>
        <span>
          <p>Username:</p> {user.user?.username}
        </span>
        <span>
          <p>Email:</p> {user.user?.email}
        </span>
        <Button handle={handleClick}>Log out</Button>
      </section>
      <NavBar />
    </>
  );
}
