import './App.css';
import { Route } from 'react-router-dom';
import { AuthContextProvider } from './components/layouts/AuthContext';
import { AppRouter } from './router';

function App() {
  return (
    <>
      <Route element={<AuthContextProvider />}>
        <AppRouter />
      </Route>
    </>
  );
}

export default App;
