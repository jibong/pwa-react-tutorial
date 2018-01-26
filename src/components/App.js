import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import './app.css';
import NotificationResource from '../resources/NotificationResource';

class App extends Component {
  state = { user: null, messages: [], messagesLoaded: false };

  handleSubmitMessage = msg => {
    console.log(msg);
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now()
    };

    firebase
      .database()
      .ref('messages/')
      .push(data);
  }

  componentDidMount() {
    console.log('App Did Mount');
    this.notifications = new NotificationResource(firebase.messaging(), firebase.database());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
        console.log(user);
        this.notifications.changeUser(user);
      } else {
        this.props.history.push('/login');
      }
    });

    this.listenForMessages();
  }

  listenForMessages = () => {
    firebase
    .database()
    .ref('/messages')
    .on('value', snapshot => {
      this.onMessage(snapshot);
      console.log('snapshot: ' + snapshot.val());  

      if (!this.state.messagesLoaded) {
        this.setState({messagesLoaded : true});
      }
    });
  }

  onMessage = snapshot => {
    if (snapshot.val() != null) {
      const messages = Object.keys(snapshot.val()).map(key => {
        const msg = snapshot.val()[key];
        msg.id = key;
        return msg;
      });

      this.setState({ messages });
      
      console.log('Messages: ' + messages);
    }
  }

  render() {
    return (
      <div id="container">
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/" render={() => 
          <ChatContainer
            messagesLoaded={this.state.messagesLoaded}
            onSubmit={this.handleSubmitMessage} 
            user={this.state.user}
            messages={this.state.messages} />}
          />
        <Route path="/users/:id" 
          render={({ history, match }) =>
          <UserContainer
          messagesLoaded={this.state.messagesLoaded}
          user={match.params.id}
          messages={this.state.messages} />}
        />
        </div>
    );
  }
}

export default withRouter(App);
