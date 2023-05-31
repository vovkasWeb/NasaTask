import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Linking,
} from "react-native";
import { GlobalContext } from "./GlobalContext";

const Authorize = ({ onSubmitted }) => {
  const [inputValue, setInputValue] = useState("");
  const { setGlobalVariable } = useContext(GlobalContext);

  const handleInputChange = (text) => {
    setInputValue(text);
    setGlobalVariable(text);
  };

  const handleSubmit = () => {
    if (inputValue !== "") {
      onSubmitted(true);
    }
    setInputValue("");
  };

  const handleOpenBrowser = () => {
    const url = "https://api.nasa.gov/";
    Linking.openURL(url).catch((err) =>
      console.error("Failed opening link:", err)
    );
  };

  const handleLogout = () => {
    setInputValue("");
    onSubmitted(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Сюда API"
        style={styles.textInput}
        placeholderTextColor="#999"
      />
      <View style={styles.buttonContainer}>
        <Button title="Проверить ключь" onPress={handleSubmit} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Получить ключь" onPress={handleOpenBrowser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#f1f1f1",
    width: "80%",
    textAlign: "center",
    height: 40,
    color: "#aaaaaa",
    borderWidth: 1,
    borderColor: "#787878",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
  },
});

export default Authorize;
