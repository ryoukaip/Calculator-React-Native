import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Vibration} from 'react-native';
import {Entypo} from '@expo/vector-icons';


export default App = () => {

  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumer] = useState('');
  const [lastNumber, setLastNumer] = useState('');
  const buttons = ['C', 'DEL', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2','3', '+', '0', '.', '=']
  function calculator(){
    let lastArr = currentNumber[currentNumber.length -1]
    if (lastArr === '/' || 
      lastArr === '*' || 
      lastArr === '-' || 
      lastArr === '+' || 
      lastArr === '.'){
      setCurrentNumer(currentNumber)
      return
    }
    else{
      let result = eval(currentNumber).toString();
      setCurrentNumer(result)
      return
    }

  }
  function handleInput(buttonPressed){
    if (buttonPressed === '+' ||
    buttonPressed === '-' ||
    buttonPressed === '*' ||
    buttonPressed === '/' 
    ){
      Vibration.vibrate(35);
      setCurrentNumer(currentNumber+buttonPressed)
      return
    }
    else if (buttonPressed === '1' ||
    buttonPressed === '2' ||
    buttonPressed === '3' ||
    buttonPressed === '4' ||
    buttonPressed === '5' ||
    buttonPressed === '6' ||
    buttonPressed === '7' ||
    buttonPressed === '8' ||
    buttonPressed === '9' ||
    buttonPressed === '0' ||
    buttonPressed === '-' ){
      Vibration.vibrate(35);
    }
    switch (buttonPressed){
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumer(currentNumber.substring(0, (currentNumber.length -1)))
        return
      case 'C':
        Vibration.vibrate(35);
        setLastNumer('')
        setCurrentNumer('')
        return
      case '=':
        Vibration.vibrate(35);
        setLastNumer(currentNumber + '=')
        calculator()
        return
    }
    setCurrentNumer(currentNumber + buttonPressed)
  }
  return(
    <View>
      <View style={styles.results}>
      <TouchableOpacity style={styles.themeButton}>
        <Entypo 
          name={darkMode ? 'light-up' : 'moon'} 
          size={24} 
          color={darkMode ? 'white' : 'black'} 
          onPress={() => {
            if (darkMode) {
              setDarkMode(false);
            } else {
              setDarkMode(true);
            }
          }} 
        />
      </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ||
          button === '/' ||
          button === '*' ||
          button === '-' ||
          button === '+' ?
          <TouchableOpacity key={button}
            style={[styles.button, {backgroundColor:'#00b9d6'}]}
            onPress={()=> handleInput(button)}
            >
              <Text style={[styles.textButton, {color:'white', fontSize:28}]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 'C' ?
            <TouchableOpacity key={button}
            style={[styles.button, {backgroundColor:typeof(button) === 'number' ?
            darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853': '#ededed', minWidth: '36%'}]}
            onPress={()=> handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity key={button}
            style={[styles.button, {backgroundColor:typeof(button) === 'number' ?
            darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853': '#ededed'}]}
            onPress={()=> handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>

        )} 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  results: {
    backgroundColor: false ? '#282f3b' : '#f5f5f5',
    maxWidth: '100%',
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  resultsText: {
    maxHeight: 45,
    color: '#00b9d6',
    margin: 15,
    fontSize: 35,
  },
  historyText: {
    color: false ? '#B5B7BB' : '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
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
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    borderColor: false ? '#3f4d5b' : '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '54%',
    flex: 2,
  },
  textButton: {
    color: false ? '#b5b7bb' : '#7c7c7c',
    fontSize: 28,
  }
})