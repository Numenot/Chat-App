import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    // use name defined in Start page
    const { name } = this.props.route.params
    this.props.navigation.setOptions({ title: name })

    this.setState({
      messages: [
        // test message
        {
          _id: 1,
          text: `Hello ${name}`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        // system message
        {
          _id: 2,
          text: `${name} has joined the chat`,
          createdAt: new Date(),
          system: true,
        },
      ]
    })
  }

  // function to display messages in chat
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // chat bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#757083'
          }
        }}
      />
    )
  }

  render() {
    // use BackgroundColor selected in Start screen
    const { BackgroundColor } = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: BackgroundColor }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* To avoid keyboard overlapping with message input box on Android */}
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}
