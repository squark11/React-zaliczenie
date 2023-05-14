import {  StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import UserContext from '../Context/UserContext'


const HomeScreen = () => {
  const route = useRoute();
  const { users } = useContext(UserContext);
  const {loggedInUser} = route.params;
  const [gallery, setImageData] = useState([]);
  const navigation = useNavigation();
  // Wybierz zdjęcie z galerii
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageData([...gallery, result]);
    }
  };
  const renderImage = ({ item }) => {
    return <Image source={{ uri: item.uri }} style={styles.image} />;
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login', params: {users}}],
    });
  };

  const handleProfile = () => {
    navigation.navigate({
      name: 'Profile',
      params: {loggedInUser},
    });
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={gallery}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      renderItem={renderImage}
    />
    <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.addButton} onPress={pickImage}>
          <Text style={styles.addButtonText}>Dodaj zdjęcie</Text>
        </TouchableOpacity>
    </View>
    
        <View style={styles.buttonsContainer}>
          
        <TouchableOpacity style={styles.button} onPress={handleProfile}>
          <Text style={styles.buttonText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText} >Wyloguj</Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})