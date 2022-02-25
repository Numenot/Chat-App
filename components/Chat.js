import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

//import Firestore
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
    }

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBora1Vj-90jtf6co3vGUg53lcqP-yVe_s",
        authDomain: "chat-app-581d5.firebaseapp.com",
        projectId: "chat-app-581d5",
        storageBucket: "chat-app-581d5.appspot.com",
        messagingSenderId: "94506385167",
        appId: "1:94506385167:web:2976e8c2d8bd6bf4f1087a",
        measurementId: "G-G84GGTLCBT"
      });
    }
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages: messages
    });
  }

  componentDidMount() {
    // use name defined in Start page
    const { name } = this.props.route.params
    this.props.navigation.setOptions({ title: name })

    this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });

      this.referenceMessageUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);
    });
  }

  // add new message to database
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message.id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  // function to display messages in chat
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    })), () => {
      this.addMessages()
    }
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

  componentWillUnmount() {
    this.authUnsubscribe();
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
            _id: this.state.user._id,
            name: this.state.name,
            avatar: ''
          }}
        />
        {/* To avoid keyboard overlapping with message input box on Android */}
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}
