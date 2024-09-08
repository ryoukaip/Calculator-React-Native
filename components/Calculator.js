import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import * as math from "mathjs";
import {Entypo} from '@expo/vector-icons';

const Calculator = () => {
  const [topText, setTopText] = useState("0");
  const [headerText, setHeaderText] = useState("0");
  const [darkMode, setDarkMode] = useState(false);

  // Animated values for smooth transitions
  const topTextFontSize = useRef(new Animated.Value(70)).current;
  const headerTextFontSize = useRef(new Animated.Value(40)).current;

  // ScrollView reference for auto-scrolling
  const scrollViewRef = useRef();

  const buttonNames = [
    "(",")","⌫","/",
    "7","8","9","*",
    "4","5","6","-",
    "1","2","3","+",
    "C","0",".","=",
  ];

  let isFirstZero = true;

  function formatResult(result) {
    // Check if the result is an integer
    if (Math.floor(result) === result) {
        return result.toString();
    }
    
    // For non-integers, format with high precision, then trim trailing zeros
    let formatted = math.format(result, {precision: 14});
    return formatted.replace(/\.?0+$/, '');
}
  const handleInput = (buttonName) => {
    if (buttonName === "C") {
      isFirstZero = true;
      setTopText("0");
      setHeaderText("0");
      animateFontSizes(70, 40);
    } else if (buttonName === "⌫") {
      setTopText((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      animateFontSizes(70, 40);
    } else if (buttonName === "=") {
      try {
        if (isValidExpression(topText)) {
          const result = math.evaluate(topText);
          const formattedResult = formatResult(result);
          setHeaderText(String(formattedResult));
          animateFontSizes(40, 70);
        } else {
          setHeaderText("Error");
        }
      } catch (error) {
        setHeaderText("Error");
      }
    } else {
      if (!isFirstZero) {
        setTopText((prev) => prev + buttonName);
      } else {
        setTopText((prev) => (prev === "0" ? buttonName : prev + buttonName));
        isFirstZero = false;
      }
    }

    // Auto-scroll to the right whenever a button is pressed
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const animateFontSizes = (newTopFontSize, newHeaderFontSize) => {
    Animated.timing(topTextFontSize, {
      toValue: newTopFontSize,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    Animated.timing(headerTextFontSize, {
      toValue: newHeaderFontSize,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const isValidExpression = (expression) => {
    const openParenthesis = (expression.match(/\(/g) || []).length;
    const closeParenthesis = (expression.match(/\)/g) || []).length;
    const lastChar = expression[expression.length - 1];
    const invalidEnding = ["+", "-", "*", "/", "."].includes(lastChar);
    return openParenthesis === closeParenthesis && !invalidEnding;
  };

  return (
    <View style={styles.container}>
      {/* Scrollable topText */}
      <View style={styles.scrollWrapper}>
      <TouchableOpacity style={styles.themeButton} onPress={() => {
            if (darkMode) {
              setDarkMode(false);
            } else {
              setDarkMode(true);
            }
          }} >
        <Entypo 
          name={darkMode ? 'light-up' : 'moon'} 
          size={24} 
          color={darkMode ? 'white' : 'black'} 
        />
      </TouchableOpacity>
        <ScrollView
          ref={scrollViewRef} // Reference the ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Animated.Text
            style={[styles.topText, { fontSize: topTextFontSize }]}
            numberOfLines={1}
          >
            {topText}
          </Animated.Text>
        </ScrollView>
      </View>

      {/* Scrollable headerText */}
      <View style={styles.scrollWrapper}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Animated.Text
            style={[styles.headerText, { fontSize: headerTextFontSize }]}
            numberOfLines={1}
          >
            {headerText}
          </Animated.Text>
        </ScrollView>
      </View>

      <View style={styles.flexContainer}>
        {buttonNames.map((buttonName, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridButton}
            onPress={() => handleInput(buttonName)}
          >
            <Text style={styles.buttonText}>{buttonName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scrollWrapper: {
    height: "22%", // Adjust based on how much space you want to allocate for text
    backgroundColor: "#526D82",
  },
  scrollContainer: {
    alignItems: "flex-end", // Right-align text within ScrollView
    justifyContent: "center", // Center vertically if needed
  },
  topText: {
    padding: 10,
    textAlign: "right",
    color: "#DDE6ED",
    marginBottom: -10,
  },
  headerText: {
    padding: 10,
    marginBottom: 20,
    textAlign: "right",
    color: "white",
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "57%",
    padding: 10,
    backgroundColor: "#27374D",
  },
  gridButton: {
    flexBasis: "20%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27374D",
    margin: 5,
    borderRadius: 35,
  },
  buttonText: {
    color: "#DDE6ED",
    fontSize: 35,
  },
  themeButton: {
    alignSelf: 'flex-start',
    bottom: '-12%',
    margin: 15,
    backgroundColor: false ? '#7b8084' : '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Calculator;
