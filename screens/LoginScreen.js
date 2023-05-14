import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useContext} from 'react'
import {useNavigation} from '@react-navigation/core'
import { KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import UserContext from '../Context/UserContext'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {users, setUsers} = useContext(UserContext);
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [error, setErrorMessage] = useState('');
    const navigation = useNavigation()
    
    

    const handleSignUp = () =>{
        
        const newUser = { email, password };
        setUsers([...users, newUser]);
        setErrorMessage('Dodano użytkownika!');
        {error};
    }
    const handleLogin = () =>{
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home', params: {loggedInUser: user} }],
            });
          } else {
            setErrorMessage('Niepoprawne dane logowania');
          }
    }
  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
    >
        <View style={styles.inputContainer}>
            <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            ></TextInput>
            <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            ></TextInput>
             {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
        <View style={styles.buttonContainer}>

            <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer:{
        width: '80%'
    },
input:{
    backgroundColor: 'white',
    paddingHorizontal:15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop:5,
},
buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop:40,
},
button:{
    backgroundColor:'#0782F9',
    width:'100%',
    padding:15,
    borderRadius: 10,
    alignItems:'center',
},
buttonText:{
    color:'white',
    fontWeight: '700',
    fontSize: 16,
},
buttonOutline:{
    backgroundColor: 'white',
    marginTop:5,
    borderColor:'#0782F9',
    borderWidth:2,
},
buttonOutlineText:{
    color:'#0782F9',
    fontWeight: '700',
    fontSize: 16,
},
})