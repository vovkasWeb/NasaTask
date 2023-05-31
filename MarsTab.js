import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GlobalContext } from './GlobalContext';

const MarsTab = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useEffect(() => {
    fetchMarsData();
  }, []);

  const fetchMarsData = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${globalVariable}`
      );
      const json = await response.json();
      setData(json.photos);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6bf500" />
      </View>
    );
  }

  const currentImage = data[currentIndex];

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: currentImage.img_src }} />
      <Text style={styles.title}>{currentImage.camera.full_name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={goToPreviousImage}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Предыдущий</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToNextImage} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Cледущее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#123a00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MarsTab;
