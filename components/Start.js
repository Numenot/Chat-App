import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, TouchableOpacity } from 'react-native';
import BackgroundImage from '../assets/Background-Image.png';
import icon from '../assets/icon.svg';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      BackgroundColor: ''
    };
  }

  color = {
    black: '#090C08',
    darkgrey: '#474056',
    grey: '#8A95A5',
    green: '#B9C6AE'
  };

  // Function to update the BackgroundColor state
  changeBackgroundgColor = (newBackgroundColor) => {
    this.setState({ BackgroundColor: newBackgroundColor });
  };

  render() {
    return (
      //Main container
      <View style={styles.container}>

        {/* Background Image displayed behind the entirety of the Start page */}
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.backgroundimage}>

          {/* Title div */}
          <View>
            <Text style={styles.title}>
              Meet App
            </Text>
          </View>

          {/* Main content div */}
          <View style={styles.maincontent}>

            {/* Name input box */}
            <View style={styles.textinputbox}>
              <Image source={icon} style={styles.icon} />
              <TextInput
                style={styles.textinput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>

            {/* Text above background color selector */}
            <View style={styles.colorpalettelabel}>
              <Text style={styles.colorpalettelabeltext}>
                Choose Background Color:
              </Text>
            </View>

            {/* Background color selector */}
            <View style={styles.colorpalette}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Black color"
                accessibilityHint="Lets you set the background color of your chat to black."
                accessibilityRole="button"
                style={styles.color1}
                onPress={() => this.changeBackgroundgColor(this.color.black)}>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Dark grey color"
                accessibilityHint="Lets you set the background color of your chat to dark grey."
                accessibilityRole="button"
                style={styles.color2}
                onPress={() => this.changeBackgroundgColor(this.color.darkgrey)}>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Grey color"
                accessibilityHint="Lets you set the background color of your chat to grey."
                accessibilityRole="button"
                style={styles.color3}
                onPress={() => this.changeBackgroundgColor(this.color.grey)}>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Green color"
                accessibilityHint="Lets you set the background color of your chat to green."
                accessibilityRole="button"
                style={styles.color4}
                onPress={() => this.changeBackgroundgColor(this.color.green)}>
              </TouchableOpacity>
            </View>

            {/* The button navigates to the Chat page and sends the backgroundColor and name states */}
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Chat button"
              accessibilityHint="Lets you open the chat page"
              accessibilityRole="button"
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, BackgroundColor: this.state.BackgroundColor })}
            >
              <Text style={styles.buttontext}>Start Chatting</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground >
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  backgroundimage: {
    flex: 1,
    justifyContent: 'space-between'
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 70
  },

  maincontent: {
    marginBottom: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    minHeight: 260,
    maxHeight: 300,
    height: '44%',
    width: '88%'
  },

  textinputbox: {
    flexDirection: 'row',
    width: '88%',
    borderColor: '#757083',
    borderWidth: 1,
    padding: 5
  },

  icon: {
    padding: 10,
    margin: 5,
    height: 15,
    width: 15,
    alignItems: 'center',
    opacity: 0.5
  },

  textinput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5
  },

  colorpalettelabeltext: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1
  },

  colorpalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    paddingRight: 40
  },

  color1: {
    backgroundColor: '#090C08',
    width: 40,
    height: 40,
    borderRadius: 20
  },

  color2: {
    backgroundColor: '#474056',
    width: 40,
    height: 40,
    borderRadius: 20
  },

  color3: {
    backgroundColor: '#8A95A5',
    width: 40,
    height: 40,
    borderRadius: 20
  },

  color4: {
    backgroundColor: '#B9C6AE',
    width: 40,
    height: 40,
    borderRadius: 20
  },

  button: {
    backgroundColor: '#757083',
    width: "88%",
    alignItems: 'center'
  },

  buttontext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: 15,
    color: '#FFFFFF'
  }
})