import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';

export default class UserContainer extends Component {
    renderedUserEmail = false;

    getAuthor = author => {
        if (!this.renderedUserEmail) {
            this.renderedUserEmail = true;
            return <p className="author">{author}</p>;
        }
    }

    render () {
        return (
            <div id="UserContainer">
                <Header>
                    <Link to="/">
                        <button className="red">Back to Chat</button>
                    </Link>
                </Header>
                {this.props.messagesLoaded ? (
                    <div id="message-container">
                        {this.props.messages.map(msg => {
                            if (msg.user_id === this.props.user) {
                                console.log(msg.msg);
                                return (
                                    <div key={msg.id} className="message">
                                        {this.getAuthor(msg.author)}
                                        <p>{msg.msg}</p>
                                    </div>
                                );
                            }
                        }
                    )}
                    </div>
                ) : (
                    <div id="loading-contianer">
                        <img src="/assets/icon.png" alt="logo" id="loader"/>
                    </div>
                )}
            </div>
        );
    }
}