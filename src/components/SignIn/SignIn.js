import React from 'react';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            SignInEmail: '',
            SignInPassword: '',
            wrongCred: ''
        }

    }

    componentDidMount() {

        if (sessionStorage.getItem('user') !== null) {

            this.props.loadUser(JSON.parse(sessionStorage.getItem('user')));
            this.props.onRouteChange('Home');
        }
    }

    onEmailChange = (event) => {
        this.setState({ SignInEmail: event.target.value })

    }
    onPasswordChange = (event) => {
        this.setState({ SignInPassword: event.target.value })
    }
    onSignInClick = () => {
        fetch(`${this.props.backend}/signin`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        })
            .then(response => response.json())
            .then(user => { //getting the user via response
                if (user.id) {
                    sessionStorage.setItem('user', JSON.stringify(user))

                    this.props.loadUser(user);
                    this.props.onRouteChange('Home');              
                }
                else if (user === 'something missing') {
                    this.setState({ wrongCred: 'Missing fields' })
                }
                else if (user === 'unable to get user' || user === 'wrong username or password') {
                    this.setState({ wrongCred: 'Wrong credentials' })
                }
            })


    }

    render() {
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" id="email" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSignInClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => this.props.onRouteChange('ForgotPassword')} className="f6 link dim black db pointer">Forgot Password</p>
                        </div>

                        <label className="db fw6 lh-copy f5">{this.state.wrongCred}</label>

                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;