import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GlobalContext } from './GlobalContext';

const ApodTab = () => {
  const [apodData, setApodData] = useState(null);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchApodData();
  }, []);

  const fetchApodData = async () => {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?count=10&api_key=${globalVariable}`);
      const data = await response.json();
      setApodData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < apodData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const currentApod = apodData[currentIndex];

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: currentApod.url }} />
      <Text style={styles.title}>{currentApod.title}</Text>
      <Text style={styles.date}>{currentApod.date}</Text>
      <Text style={styles.description}>{currentApod.explanation}</Text>
      <TouchableOpacity
        onPress={handlePrevious}
        style={[styles.arrowButton, styles.leftArrow]}
        activeOpacity={0.7}
      >
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleNext}
        style={[styles.arrowButton, styles.rightArrow]}
        activeOpacity={0.7}
      >
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
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
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    marginHorizontal: 10,
  },
  arrowButton: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 25,
    zIndex: 1, // Set a higher z-index to make the buttons appear on top
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default ApodTab;
