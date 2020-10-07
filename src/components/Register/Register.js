import React from 'react';

class Register extends React.Component{
    constructor(){
        super();
        this.state={
            RegisterName:'',
            RegisterEmail:'',
            RegisterPassword:'',
            wrongCred:''
        }
    }
    onNameChange=(event)=>{
        this.setState({RegisterName:event.target.value})
        
    }
    onEmailChange=(event)=>{
        this.setState({RegisterEmail:event.target.value})
        
    }
    onPasswordChange=(event)=>{
        this.setState({RegisterPassword:event.target.value})
    }
    onRegisterClick=()=>{
        fetch(`${this.props.backend}/register`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name:this.state.RegisterName,
                email:this.state.RegisterEmail,
                password:this.state.RegisterPassword
            })
        })
        .then(response=>response.json())
        .then(user=>{ //getting the user via response
            if(user.id){
                this.props.loadUser(user);
                this.setState({ wrongCred: 'Success' })
                setTimeout(() => {
                    this.props.onRouteChange('Home');
                }, 2000);
                
            }
            else if(user==='something missing')
                {
                    this.setState({ wrongCred: 'Missing fields' })
                }
        })
        
        
    }
    
render(){
    return (
        <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onRegisterClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f5">{this.state.wrongCred}</label>
                    </div>
                </div>
            </main>
        </article>
    )}
}

export default Register;