import {
  Heading,
  View,
  WithAuthenticatorProps
} from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function Profile({ user }: WithAuthenticatorProps) {
  return (
      <View as="section" margin='1rem'>
        <Heading level={1} width='100vw'>UserName : {user?.username.split('-')[0]}</Heading>
      </View>
  );
}

export default withAuthenticator(Profile);
