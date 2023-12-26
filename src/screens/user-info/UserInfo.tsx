import { Input, Icon, Center, Container, Heading, Image, Button } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import React from 'react'

const UserInfo = () => {
  return (
    <Center>
      <Container w="70%" mt={15}>
        <Heading mx="auto">PERSONAL PROFILE</Heading>
        <Image
          size={120}
          borderRadius={100}
          mb={10}
          mt={5}
          mx="auto"
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg"
          }}
          alt="Alternate Text"
        />
        <Input
          mx="3"
          mt={2}
          placeholder="Name"
          InputLeftElement={
            <Icon as={<MaterialIcons name="person" />} size={25} ml={2} />
          }
        />
        <Input
          mx="3"
          mt={2}
          placeholder="Birth Date"
          InputLeftElement={
            <Icon as={<MaterialIcons name="date-range" />} size={25} ml={2} />
          }
        />
        <Input
          mx="3"
          mt={2}
          placeholder="Email"
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={25} ml={2} />
          }
        />
        <Input
          mx="3"
          mt={2}
          placeholder="Phone Number"
          InputLeftElement={
            <Icon as={<MaterialIcons name="phone" />} size={25} ml={2} />
          }
        />
        <Button
          size="lg"
          w="100%"
          mt={10}
        >
          Update 
        </Button>
      </Container>
    </Center>
  )
}

export default UserInfo