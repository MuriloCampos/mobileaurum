import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import * as Keychain from 'react-native-keychain';

interface User {
  email: string;
  logged_in: boolean;
}

interface AuthState {
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<string>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({
    user: {
      email: '',
      logged_in: false,
    },
  });

  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    if (credentials.password === '123') {
      const user: User = {
        email: credentials.username,
        logged_in: true,
      };

      await Keychain.setGenericPassword(
        credentials.username,
        credentials.password,
      );

      setData({ user });

      return '';
    }

    return 'Usuário ou senha incorretos.';
  }, []);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const storedSecureData = await Keychain.getGenericPassword();
      setLoading(false);

      if (storedSecureData) {
        setData(current => {
          const newUser = {
            ...current.user,
            logged_in: true,
          };
          return { user: newUser };
        });
      }
    }

    loadStoragedData();
  }, []);

  const signOut = useCallback(async () => {
    await Keychain.resetGenericPassword();
    setData({
      user: {
        ...data.user,
        logged_in: false,
      },
    });
  }, [data.user]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
