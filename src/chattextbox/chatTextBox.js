import React from 'react';
import styles from './styles'
import {withStyles} from "@material-ui/core";
import TextField from '@material-ui/core/TextField'
import Send from '@material-ui/icons/Send'

class ChatTextBoxComponent extends  React.Component{
    constructor(){
        super();
        this.state={
            chatText : ''
        };
    }

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.chatTextBoxContainer}>
                <TextField
                    placeholder={'Type your message...'}
                    onKeyUp={(e) => this.userTyping(e)}
                    className={classes.chatTextBox}
                    id={'chattextbox'}
                    onFocus={this.userClickedInput}
                    required
                />

                <Send onClick={this.submitMessage}
                      className={classes.sendBtn}
                />
            </div>
        )
    }

    userTyping = (e) =>{
        e.keyCode === 13 ?  this.submitMessage() : this.setState({chatText:e.target.value})
    };

    messageValid = (txt) =>
        txt && txt.replace(/\s/g, '').length;  //checks for empty message and empty spaces message

    userClickedInput = (e) =>{
        this.props.messageRead();
    };

    submitMessage = (e) =>{
        if(this.messageValid(this.state.chatText)){
            // call parent function
            document.getElementById('chattextbox').value = '';
            this.props.submitMessageFn(this.state.chatText)
        }
        else{
            console.log("Invalid Message")
        }
    };
}
//TODO YouTube video Part 7 - 13mins
export default withStyles(styles)(ChatTextBoxComponent)