import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { GlobalContext } from './GlobalContext';

const EarthTab = () => {
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEarthData();
  }, []);

const fetchEarthData = async () => {
  try {
    const apiKey = globalVariable;
    const response = await fetch(
      `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&dim=0.10&api_key=${apiKey}`
    );
    const data = await response.json();
    setImageData(data);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: item.url }} />
      <Text style={styles.date}>Дата: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : imageData.length > 0 ? (
        <FlatList
          data={imageData}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.imageList}
        />
      ) : (
        <Text style={styles.error}>Работает только по подпки 100$ на эту карту </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageList: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  loading: {
    marginBottom: 20,
  },
  error: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
    color: 'red',
  },
});

export default EarthTab;
