import { Input, Icon, Center, Container, Heading, Button, Pressable, Avatar, useToast, Box, Alert, VStack, HStack, Text, IconButton, CloseIcon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react'

const UserInfo = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [image, setImage] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === "set") {
      toggleDatePicker();
      const currentDate = selectedDate;
      setDate(currentDate);
      setDateOfBirth(currentDate.toDateString());
    } else {
      toggleDatePicker();
    }
  }

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const onUpdate = () => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        render: () => {
          return (
            <Alert w="100%" status="success">
              <VStack space={1} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="center">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="sm" color="coolGray.800">
                      Update Info successfully!
                    </Text>
                  </HStack>
                  <HStack>
                    <IconButton
                      variant="unstyled"
                      _focus={{
                        borderWidth: 0
                      }}
                      icon={
                        <CloseIcon size="3" />
                      }
                      _icon={{
                        color: "coolGray.600"
                      }}
                    />
                  </HStack>
                </HStack>
              </VStack>
            </Alert>
          )
        },
        placement: "bottom-right"
      })
    }
  }

  const toast = useToast();
  const id = "toast-update";

  return (
    <Center>
      <Container w="90%" mt={15}>
        <Heading alignSelf="center">PERSONAL PROFILE</Heading>
        <Pressable
          alignSelf="center"
          onPress={uploadImage}
        >
          <Avatar
            size="2xl"
            mb={10}
            mt={5}
            source={image ? {uri: image}: {uri: "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"}}
          >
            <Avatar.Badge bg="green.500" />
          </Avatar>
        </Pressable>

        <Input
          mt={2}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          p={3}
          size="lg"
          InputLeftElement={
            <Icon as={<MaterialIcons name="person" />} size={25} ml={2} />
          }
        />

        {
          showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )
        }

        <Pressable
          onPress={toggleDatePicker}
          w="100%"
        >
          <Input
            mt={2}
            p={3}
            size="lg"
            placeholder="Birth Date"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            editable={ false }
            InputLeftElement={
              <Icon as={<MaterialIcons name="date-range" />} size={25} ml={2} />
            }
          />
        </Pressable>

        <Input
          mt={2}
          p={3}
          size="lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={25} ml={2} />
          }
        />

        <Input
          mt={2}
          p={3}
          size="lg"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          InputLeftElement={
            <Icon as={<MaterialIcons name="phone" />} size={25} ml={2} />
          }
        />

        <Button
          size="lg"
          w="100%"
          mt={10}
          bgColor="#3935FF"
          onPress={onUpdate}
        >
          Update 
        </Button>

      </Container>
    </Center>
  )
}

export default UserInfo