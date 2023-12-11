import {
  Image,
  Card,
  Flex,
  Grid,
  Input,
  Label,
  View,
  withAuthenticator,
  WithAuthenticatorProps
} from "@aws-amplify/ui-react";
import { list, getUrl, uploadData } from 'aws-amplify/storage';
import {useEffect, useState} from "react";


function Gallery({ user }: WithAuthenticatorProps) {
  const [images, setImages] = useState([] as string[]);
  
  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async () => {
    try {
      const files = await list({
        options: {
          listAll: true
        }
      });
      console.log('files', files)
      const urls = await Promise.all(files.items.map(async (file) => {
        console.log('file', file)
        const url = await getUrl({ key: file.key});
        
        return url.url.toString()
      }));
      
      setImages(urls);
      console.log('urls', urls)
    } catch (error) {
      console.log(error);
    }
  }
  
  async function onChange(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const result = await uploadData({
        key: file.name,
        data: file,
        options: {
          accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          onProgress: () => fetchImages() // Optional progress callback.
        }
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  }
  return (
      <Flex direction={"column"}>
        <View>
          <Flex as="form" direction="column" width="20rem">
            <Flex direction="column" gap="small">
              <Label htmlFor="file">Email</Label>
              <Input id="file" type="file" isRequired onChange={onChange} />
            </Flex>
            {/*<Button type="button" onClick={onClilck}>Upload</Button>*/}
          </Flex>
        </View>
        
        <Grid
            columnGap="0.5rem"
            rowGap="0.5rem"
            templateColumns="1fr 1fr 1fr"
            templateRows="1fr 3fr 1fr"
        >
          {images.map((image) => (
            <Image
                key={image}
                alt="Amplify logo"
                src={image}
                objectFit="initial"
                objectPosition="50% 50%"
                backgroundColor="initial"
                height="75%"
                width="75%"
                opacity="100%"
                onClick={() => alert('📸 Say cheese!')}
            />
          ))}
        </Grid>
      </Flex>
  );
}

export default withAuthenticator(Gallery);
