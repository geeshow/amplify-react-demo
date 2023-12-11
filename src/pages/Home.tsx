import {
  Heading,
  View,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


export default function Home() {
  
  return (
    <View as="section" margin='1rem'>
      <Heading level={1} width='100vw'>Todo project by Amplify</Heading>
      <Heading level={2} width='100vw'>Hello world.</Heading>
    </View>
  );
}
