import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import ApodTab from './ApodTab';
import AsteroidsTab from './AsteroidsTab';
import EarthTab from './EarthTab';
import MarsTab from './MarsTab';
import EpicTab from './EpicTab';
import Authorize from './Authorize';
import { GlobalProvider } from './GlobalContext';
import { GlobalContext } from './GlobalContext';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuthorizeSubmitted, setIsAuthorizeSubmitted] = useState(false);
  
  const handleAuthorizeSubmitted = (success) => {
    setIsAuthorizeSubmitted(success);
  };

  const tabs = [
    {content: <Authorize onSubmitted={handleAuthorizeSubmitted} />},
    { title: 'APOD', content: <ApodTab />, disabled: !isAuthorizeSubmitted },
    { title: 'Asteroids', content: <AsteroidsTab />, disabled: !isAuthorizeSubmitted },
    { title: 'Earth', content: <EarthTab />, disabled: !isAuthorizeSubmitted },
    { title: 'Mars', content: <MarsTab />, disabled: !isAuthorizeSubmitted },
    { title: 'EPIC', content: <EpicTab />, disabled: !isAuthorizeSubmitted }
  ];

  return (
    <GlobalProvider>
      <View style={styles.container}>
        <View style={styles.tabs}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                activeTab === index ? styles.activeTab : null,
                tab.disabled ? styles.disabledTab : null
              ]}
              onPress={() => setActiveTab(index)}
              disabled={tab.disabled}
            >
              {index === 0 ? (
                <View style={styles.profileIconContainer}>
                  <Image
                    source={{uri: 'https://cdn-icons-png.flaticon.com/512/2609/2609282.png'}} // Replace with the actual path to the profile photo
                    style={styles.profileIcon}
                  />
                </View>
              ) : null}
              <Text style={styles.tabTitle}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.content}>{tabs[activeTab].content}</View>
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000'
  },
  disabledTab: {
    opacity: 0.5
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  content: {
    flex: 1
  },
  profileIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    overflow: 'hidden',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
