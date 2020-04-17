import React, {Component} from 'react';
import ChatListComponent from '../chatlist/chatList'
import {Button, withStyles} from "@material-ui/core";
import styles from './styles'
import ChatViewComponent from '../chatview/chatView'
import ChatTextBoxComponent from '../chattextbox/chatTextBox'
const firebase = require("firebase");

class DashboardComponent extends Component {

    constructor(){
        super();
        this.state = {
            selectedChat : null,
            newChatFormVisible : false,
            email : null,
            chats : []
        }
    }

    render() {

        const {classes} = this.props;

        return (
            <div>
                <ChatListComponent history={this.props.history}
                               newChatBtnFn={this.newChatBtnClicked}
                               selectChatFn={this.selectChat}
                               chats={this.state.chats}
                               userEmail={this.state.email}
                               selectedChatIndex={this.state.selectedChat}
            />
                {
                    this.state.newChatFormVisible ?
                        null :
                        <ChatViewComponent
                            user={this.state.email}
                            chat={this.state.chats[this.state.selectedChat]}
                        />
                }

                {
                    this.state.selectedChat !== null && !this.state.newChatFormVisible ? <ChatTextBoxComponent messageReadFn ={this.messageRead} submitMessageFn = {this.submitMessage} > </ChatTextBoxComponent> : null
                }

                <Button className={classes.signOutBtn } onClick={this.signOut}>Sign Out</Button>
            </div>
        );
    }

    signOut = () => firebase.auth().signOut();

    selectChat = async (chatIndex) =>{
        await this.setState({selectedChat : chatIndex});
        this.messageRead();
    };

    //the key was user1:user2 in alphabetical order
    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

    submitMessage = (msg) => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
        firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg,
                    timestamp: Date.now()
                }),
                recieverHasRead: false
            });
    };

    newChatBtnClicked = () => {
        this.setState({newChatFormVisible:true, selectedChat:false})
    };


    messageRead = () => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0])
        if(this.clickedChatWhereNotSender(this.state.selectedChat)){
            firebase.firestore()
                .collection('chats')
                .doc(docKey)
                .update({
                    recieverHasRead: true
                })
        } else {
            console.log('clicked message where user is sender')
        }
    };

    clickedChatWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

    componentDidMount() {
        firebase.auth().onAuthStateChanged(async _user => {
            if(!_user)
                this.props.history.push('/login');
            else{
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _user.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data())
                        await this.setState({
                            email: _user.email,
                            chats : chats
                        });
                        console.log(this.state)
                    })
            }
        })
    }
}

export default withStyles(styles)(DashboardComponent);