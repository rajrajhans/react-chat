import React, {Component} from 'react';
import ChatListComponent from '../chatlist/chatList'
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
        return (
            <ChatListComponent history={this.props.history}
                               newChatBtnFn={this.newChatBtnClicked}
                               selectChatFn={this.selectChat}
                               chats={this.state.chats}
                               userEmail={this.state.email}
                               selectedChatIndex={this.state.selectedChat}
            />
        );
    }
    selectChat = (chatIndex) =>{
        console.log("Selected a chat", chatIndex);
    };

    newChatBtnClicked = () => {
        this.setState({newChatFormVisible:true, selectedChat:false})
    };

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

export default DashboardComponent;