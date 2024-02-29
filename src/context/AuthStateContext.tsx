import { ReactNode, createContext, useContext, useReducer } from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

type Action =
  | {
      type: 'LOGIN';
    }
  | {
      type: 'LOGOUT';
    }
  | { type: 'START-UP' };

type Dispatch = (action: Action) => void;

const AuthStateContext = createContext<AuthState>({ isAuthenticated: false });
const AuthDispatchContext = createContext<Dispatch | undefined>(undefined);

function reducer(state: AuthState, action: Action) {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true };

    case 'LOGOUT':
      return { isAuthenticated: false };

    case 'START-UP':
      const user = localStorage.getItem('user');
      if (!user) {
        return { isAuthenticated: false };
      }
      //check if is in localStorage
      return { isAuthenticated: true };

    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false });
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export function useAuthState() {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);

  if (!context) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }

  return context;
}
