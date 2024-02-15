import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
