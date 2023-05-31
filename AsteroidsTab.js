import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { GlobalContext } from './GlobalContext';

const AsteroidsTab = () => {
  const [asteroids, setAsteroids] = useState([]);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-05-15&end_date=2023-05-15&api_key=${globalVariable}`
      );
      const data = await response.json();
      const todayAsteroids = data.near_earth_objects['2023-05-15'];
      setAsteroids(todayAsteroids);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>m: {item.estimated_diameter.meters.estimated_diameter_max}</Text>
        <Text style={styles.subtitle}>Дата закрытия: {item.close_approach_data[0].close_approach_date_full}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Asteroids</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
        <FlatList
          data={asteroids}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    borderRadius: 20,
    backgroundColor: '#0fffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  loading: {
    marginTop: 20,
  },
});

export default AsteroidsTab;
