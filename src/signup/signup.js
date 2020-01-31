import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles'

const firebase = require('firebase');

class SignupComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        const {classes} = this.props;

        function submitSignup(e){
            console.log("Submitting");
        }

        function userTyping(type, e){
            console.log(type, e.target.value);
        }

        // noinspection RequiredAttributes
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component={'h1'} variant={'h5'}>
                        Sign Up!
                    </Typography>

                    <form className={classes.form} onSubmit={(e) => submitSignup(e)}>

                        <FormControl required fullWidth margin={'normal'}>
                            <InputLabel htmlFor={'signup-email-input'}>
                                Enter your email
                            </InputLabel>
                            <Input autoComplete={'email'} autoFocus id={'signup-email-input'} onChange={(e) => userTyping('email', e)} >
                            </Input>
                        </FormControl>

                        <FormControl required fullWidth margin={'normal'}>
                            <InputLabel htmlFor={'signup-password-input'}>
                                Create a password
                            </InputLabel>
                            <Input type={'password'} id={'signup-password-input'} onChange={(e) => userTyping('password', e)}>
                            </Input>
                        </FormControl>

                        <FormControl required fullWidth margin={'normal'}>
                            <InputLabel htmlFor={'signup-password-confirmation-input'}>
                                Confirm your password
                            </InputLabel>
                            <Input type={'password'} id={'signup-password-confirmation-input'} onChange={(e) => userTyping('password', e)}>
                            </Input>
                        </FormControl>

                        <Button type={'submit'} fullWidth variant={'contained'} color={'primary'} className={classes.submit}>
                            Submit
                        </Button>

                        <Typography component={'h6'} variant={'h6'} className={classes.hasAccountHeader}>
                            Already have an account?
                        </Typography>

                        <Link className={classes.logInLink} to={'/login'}>Log In!</Link>
                        
                    </form>
                </Paper>

            </main>
        );
    }
}

export default withStyles(styles)(SignupComponent);