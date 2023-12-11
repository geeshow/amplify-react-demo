import {
  Link,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const initialUser = {
  isLogged: false,
  username: '',
  userId: '',
  signInDetails: {} as any,
}
export function Nav() {
  const [ user, setUser ] = useState(initialUser)
  const navigator = useNavigate()
  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      setUser({ isLogged: true, username, userId, signInDetails });
    } catch (err) {
      setUser(initialUser);
    }
  }
  useEffect(() => {
    currentAuthenticatedUser().then((user) => {
      console.log('user:', user);
    });
    
    
  }, []);
  
  const todoSignOut = async () => {
    try {
      await signOut();
      setUser(initialUser);
      navigator('/');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  
  return (
      <Flex width="4rem">
        <Link href={'/'}>
          <Button loadingText="">
            Home
          </Button>
        </Link>
        <Link href={'/profile'}>
          <Button loadingText="">
            Profile
          </Button>
        </Link>
        <Link href={'/todos'}>
          <Button loadingText="">
            Todos
          </Button>
        </Link>
        {user.isLogged && (
          <Button loadingText="Loading" onClick={todoSignOut}>Sign out</Button>
        )}
      </Flex>
  );
}

export default Nav;
