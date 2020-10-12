import React from 'react';

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            SignInEmail: '',
            wrongCred: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ SignInEmail: event.target.value })
    }

    onContinueClick = () => {
        fetch(`${this.props.backend}/forgotpassword`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.SignInEmail
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result === 'ok') {
                    this.setState({
                        wrongCred: 'Temporary password has been sent to your email'
                    })
                    this.props.ForgotPasswordEmail(this.state.SignInEmail);

                    setTimeout(() => {
                        this.props.onRouteChange('ForgotPasswordRenew');
                    }, 2000);
                    
                }
                else{
                    this.setState({
                        wrongCred: result
                    })
                }

            })
    }

    render() {
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Password Recovery</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" id="email" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onContinueClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Continue" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5">{this.state.wrongCred}</label>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default ForgotPassword





