import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login(props) {
    const navigation = useNavigation();
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [formValidity, setFormValidity] = useState(false)
    const [loginStatus, setLoginStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(true);

    const handleLoginForm = () => {
        setIsLogin(true);
      };

    const handleSignUpForm = () => {
        setIsLogin(false);
      };

    const isEmpty = value => value.trim() === ''

    const submitLogin = (event) => {
        event.preventDefault();

        setFormValidity(false)
        setLoginStatus(false)

        const enteredUsernameIsValid = !isEmpty(usernameInput)
        const enteredPasswordIsValid = !isEmpty(passwordInput)

        if (!enteredUsernameIsValid || !enteredPasswordIsValid) {
            setFormValidity(true)
            return
        }

        const loginData = {
            username: usernameInput,
            password: passwordInput
        }
        
        if(isLogin){
          fetch('https://let-me-cook.onrender.com/auth/login', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(loginData)
          })
          .then((response) => response.json())
          .then((json) => {
            console.log(json)
              if (json.error) {
                  setLoginStatus(true)
              } else {  
                  navigation.navigate('Home' as never)
              }
          })
          .catch((error) => {
            console.error(error);
          });
        }
        else{
          fetch('https://let-me-cook.onrender.com/auth/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            if (json.error) {
              // Handle registration error
              setLoginStatus(true);
            } else {
              // Handle registration success
              navigation.navigate('Home' as never);
            }
          })
          .catch((error) => {
            console.error(error);
          });
        }
    }

    const submitSignUp = () => {}

    return (
        <View style={styles.container}>
            <View style={styles.navButtonContainer}>
                <TouchableOpacity onPress={handleLoginForm} style={isLogin ? styles.activeButton : styles.deactiveButton}>
                <Text style={isLogin ? styles.ActiveButtonText : styles.DeactiveButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUpForm} style={!isLogin ? styles.activeButton : styles.deactiveButton}>
                <Text  style={!isLogin ? styles.ActiveButtonText : styles.DeactiveButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Letmecook</Text>
            <Text style={styles.subtitle}>{isLogin ? 'Pleace login to your account' : 'Pleace fill your info to create account'}</Text>
            <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input]}
                placeholder="Username"
                onChangeText={text => setUsernameInput(text)}
            />
            <TextInput
                secureTextEntry={true}
                 style={[styles.input]}
                placeholder="Password"
                onChangeText={text => setPasswordInput(text)}
            />
            </View>
            <TouchableOpacity >
                {isLogin && (
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                )}
                {!isLogin && (
                <Text style={styles.info}>
                    By signing up I accept the terms of use and the data privacy policy.
                </Text>
                )}
            </TouchableOpacity>
            {loginStatus && <Text style={styles.warning}>Wrong username/password !</Text>}
            <TouchableOpacity style={styles.loginButton} onPress={submitLogin}>
                <Text style={styles.login}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </Text>
            </TouchableOpacity>
           
            {formValidity && <Text style={styles.warning}>Please fill all required field !</Text>}
          
        </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
      },
      navButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginHorizontal: '40%',
        marginTop: 0,
        marginBottom: '30%',
      },
      ActiveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      DeactiveButtonText: {
        color: '#3935FF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      activeButton: {
        width: '50%',
        height: 30,
        backgroundColor: '#3935FF',
        color: '#FFFFFF',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      },
      deactiveButton: {
        width: '50%',
        height: 30,
        backgroundColor: '#F2F2F7',
        borderColor: '#3935FF',
        borderWidth: 1,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      },
      navButton: {
        width: 109.89,
        height: 36,
        backgroundColor: '#3935FF',
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 12,
        fontFamily: 'Outfit',
        fontWeight: '400',
      },
      inputContainer: {
        width: '90%',
        padding: 16,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      input: {
        width: '100%',
        height: 40,
        borderColor: '#979798',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 5,
      },
      button: {
        backgroundColor: '#3935FF',
        borderRadius: 10,
        padding: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      title: {
        fontSize: 30,
        marginBottom: 10,
        color: '#3935FF',
        fontWeight: 'bold'
      },
      subtitle: {
        fontSize: 15,
        marginBottom: 20,
        color: '#3935FF',
        fontWeight: '500'
      },
    warning: {
        color: "#ff2a00",
        textAlign: "center"
    },
    loginButton: {
        margin: '5%',
        width: '90%',
        height: 40,
        borderRadius: 6,
        backgroundColor: '#3935FF',
        justifyContent: 'center',
        alignItems: 'center',
      },
    info:{
        alignItems: 'center',
        textAlign: 'center',
        margin: '5%'
    },
      login:{
        color: '#fff',
        fontWeight: '500'
      },
    forgotPasswordText: {
        color: '#3935FF',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: '60%',
        margin: '5%'
      },
});