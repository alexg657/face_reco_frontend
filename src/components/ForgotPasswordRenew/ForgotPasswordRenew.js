import React from 'react';

class ForgotPasswordRenew extends React.Component {
    constructor() {
        super();
        this.state = {
            TemporaryPassword: '',
            NewPassword: '',
            wrongCred: ''
        }

    }
    onTemporaryPasswordChange = (event) => {
        this.setState({ TemporaryPassword: event.target.value })

    }
    onNewPasswordChange = (event) => {
        this.setState({ NewPassword: event.target.value })

    }

    onUpdateClick = () => {

        fetch(`${this.props.backend}/renewpassword`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email,
                TemporaryPassword: this.state.TemporaryPassword,
                NewPassword: this.state.NewPassword
            })
        })
            .then(response => response.json())
            .then(result => { //getting the user via response
                this.setState({ wrongCred: result })
                if (result === 'Password updated successfully') {
                    setTimeout(() => {
                        this.props.onRouteChange('SignIn');
                    }, 2000);
                }
            })
    }

    render() {
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Password Renew</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="Temporary-password">Temporary password</label>
                                <input onChange={this.onTemporaryPasswordChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" id="Temporary-password" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="New-password">New password</label>
                                <input onChange={this.onNewPasswordChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" id="New-password" />
                            </div>

                        </fieldset>
                        <div className="">
                            <input onClick={this.onUpdateClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Update" />
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

export default ForgotPasswordRenew;