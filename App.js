import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Calculator from "./components/Calculator";
import { useState } from "react";
import {Entypo} from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <SafeAreaView style={styles.SafeAreaViewContainer}>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  SafeAreaViewContainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#526D82",
  },
  themeButton: {
    alignSelf: 'flex-start',
    bottom: '5%',
    margin: 15,
    backgroundColor: false ? '#7b8084' : '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
