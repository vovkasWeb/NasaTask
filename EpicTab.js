import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GlobalContext } from './GlobalContext';

const EpicTab = () => {
  const [imageData, setImageData] = useState(null);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEpicImage();
  }, []);

  const fetchEpicImage = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=${globalVariable}`
      );
      const data = await response.json();
      setImageData(data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const goToNextImage = () => {
    const nextImageIndex = imageData ? (imageData.imageIndex + 1) % imageData.length : 0;
    setImageData(imageData[nextImageIndex]);
  };

  const goToPreviousImage = () => {
    const previousImageIndex = imageData
      ? (imageData.imageIndex - 1 + imageData.length) % imageData.length
      : 0;
    setImageData(imageData[previousImageIndex]);
  };

  const formatDateValue = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : imageData ? (
        <Image
          style={styles.image}
          source={{
            uri: `https://api.nasa.gov/EPIC/archive/natural/${new Date(imageData.date).getFullYear()}/${formatDateValue(
              new Date(imageData.date).getMonth() + 1
            )}/${formatDateValue(new Date(imageData.date).getDate())}/png/${imageData.image}.png?api_key=FDvEV8IeA8CmptzlvKBcaktFSknbvrydfJBc36AY`,
          }}
        />
      ) : (
        <Text style={styles.error}>чтобы разблокировать этот айфон введите 12 баллов в зачет</Text>
      )}
      <Text style={styles.date}>
        {imageData && new Date(imageData.date).toLocaleDateString()}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={goToPreviousImage} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Предыдущий</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToNextImage} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Следущий</Text>
        </TouchableOpacity>
        
      </View>
      <Text style={styles.error}>Кнопки запрещено нажимать Законом Украины, штраф 12 балов</Text>
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
    marginTop: 20,
  },
  date: {
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  loading: {
    marginTop: 20,
  },
  error: {
    fontSize: 23,
    fontStyle: 'italic',
    marginTop: 20,
    color: 'red',
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
    paddingHorizontal: 10,
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

export default EpicTab;
