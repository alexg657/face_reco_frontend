import React from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            Name: '',
            Password: '',
            NewEmail: '',
            profileMsg: '',
            profileIMG: '',
            progress:0
        }
    }
    onNameChange = (event) => {
        this.setState({ Name: event.target.value })


    }
    onEmailChange = (event) => {
        this.setState({ NewEmail: event.target.value })

    }
    onPasswordChange = (event) => {
        this.setState({ Password: event.target.value })


    }
    onUpdateClick = () => {

        fetch(`${this.props.backend}/profile`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.Name,
                email: this.props.email,
                password: this.state.Password,
                newemail: this.state.NewEmail,
                getUpdate: true,
                getDelete: false
            })
        })
            .then(response => response.json())
            .then(user => { //getting the user via response
                if (user.id) {
                    this.props.loadUser(user);
                    this.setState({ profileMsg: 'Success' })

                    setTimeout(() => {
                        this.props.onRouteChange('Home');
                    }, 2000);
                }
                else if (user === 'empty') {
                    this.setState({ profileMsg: 'Empty fields nothing to update' })
                }
            })
    }
    onDeleteClick = () => {
        fetch(`${this.props.backend}/profile`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email,
                getDelete: true,
                getUpdate: false
            })
        })
            .then(response => response.json())
            .then(deletion => { //getting the user via response
                if (deletion === 'success') {
                    this.setState({ profileMsg: 'Account DELETED' })

                    setTimeout(() => {
                        this.props.onRouteChange('SignIn');
                    }, 2000);
                }
            })
    }

    getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            
            this.setState({ profileIMG: reader.result});        
        };
        reader.onerror = (error) => {

            this.setState({ profileIMG: 'err'});
        };
     }

    onFileChange = event => {

        if(event.target.files.length>0)
        {
            this.getBase64(event.target.files[0])
        }
        
    }
    setProgess=(value)=>{
        this.setState({progress:value})
        
    }
    onFileSave = () => {

        axios.post(`${this.props.backend}/filesupload`,
        {
            base64:this.state.profileIMG,
            email:this.props.email
        },
        {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100);
                this.setProgess(progress);
        }})
            .then(res => { 
                
                if(res.data==='OK'){
                    this.setState({ profileMsg: 'Picture updated' })
                    setTimeout(() => {
                        this.props.onRouteChange('Home');
                    }, 2000);
                }
                else if(res.data==='err'){
                    this.setState({ profileMsg: 'NO picture updated' })
                    this.setState({progress:0});
                }
            })
    }


    render() {
        return (

            <article className="center mw5 mw6-ns hidden ba bw2 mv4">
                <h1 className="f4 bg-near-black white mv0 pv2 ph3">{this.props.name}</h1>

                <fieldset id="sign_up" className="ba b--transparent ph0 mh0 tl">
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={this.onNameChange} className="b--black pa2 input-reset ba bw1 bg-transparent hover-bg-black hover-white w-100" type="text" id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email">Email address</label>
                        <input onChange={this.onEmailChange} className="b--black pa2 input-reset ba bw1 bg-transparent hover-bg-black hover-white w-100" type="email" id="email" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} className="b--black pa2 input-reset ba bw1 bg-transparent hover-bg-black hover-white w-100" type="password" id="password" />
                    </div>
                </fieldset>

                <div className="mt3">
                    <input onClick={this.onUpdateClick} className="fw6 b ph3 pv2 input-reset ba bw1 b--black bg-transparent grow pointer f6 ma3" type="submit" value="Update" />
                    <p className="fw6 f6 ba bw1 ph3 pv2 mb2 dib black pointer grow" onClick={() => this.props.onRouteChange('Home')}>Back</p>
                </div>

                <div className="mt3">
                    <label className="db fw6 lh-copy f4">{this.state.profileMsg}</label>
                </div>
                <h1 className="f4 bg-near-black white mv3 pv1 ph3">Profile picture</h1>
                <input type="file" name="file" onChange={this.onFileChange} />
                <p className="f6 ph3 pv2 mb2 dib white bg-green pointer grow" onClick={this.onFileSave}>Update</p>
                <ProgressBar now={this.state.progress} />
                <h1 className="f4 bg-near-black white mv3 pv1 ph3">Danger zone</h1>
                <p className="f6 ph3 pv2 mb2 dib white bg-red pointer grow" onClick={this.onDeleteClick}>DELETE Account</p>

            </article>

        )
    }
}
export default Profile;