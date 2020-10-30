import React from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import Profile from './components/Profile/Profile'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ForgotPasswordRenew from './components/ForgotPasswordRenew/ForgotPasswordRenew';

const particles_options = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}
const initialState = {
  input: '',
  imgUrl: '',
  boxes: {},
  route: 'SignIn',
  isSignedIn: false,
  ForgotPasswordEmail: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

const backend='https://face-reco-backend.herokuapp.com';
// const backend = '//localhost:3001';

class App extends React.Component {

  constructor() {
    super();
    this.state = initialState
  }

  //user data get on response
  loadUser = (data) => {

    this.setState(
      {
        user:
        {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      }
    )
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  calcBox = (data) => {
    const image = document.getElementById('inputImg');
    const width = image.width;
    const height = image.height;

    const newObj = {}

    Object.entries(data).forEach(([key, value]) => {
      const top_row = value.top_row * height;

      const left_col = value.left_col * width;

      const bottom_row = height - (value.bottom_row * height);

      const right_col = width - (value.right_col * width);

      newObj[key] = Object.assign({ 'top_row': top_row, 'left_col': left_col, 'bottom_row': bottom_row, 'right_col': right_col })

    });

    this.setState({
      boxes: Object.assign(newObj)
    });

  }

  onPictureSubmit = () => {
    if (this.state.input) {

      this.setState({ imgUrl: this.state.input });//setState rerender and FaceRecognition loads imgUrl to show img 
      fetch(`${backend}/clarifai`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })

        .then(response => response.json())
        .then(data => {
          this.calcBox(data);

          fetch(`${backend}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(data => { //getting the user rank after +1
              if (data) {
                this.setState(
                  //update specific obj param without override entire obj
                  Object.assign(this.state.user, { entries: data })
                )
              }
            })
            .catch(() => {
              console.log('rank error')
            });
        })
        .catch(() => {
          console.log('api error')
        });
    }
  }

  onRouteChange = (route) => {

    if (route === 'SignIn') {

      sessionStorage.removeItem('user')

      this.setState(initialState)
    }

    if (route === 'Home') {
      this.setState({ isSignedIn: true })
    }
    
    if (route === 'Register') {
      this.setState(initialState)
    }

    this.setState({ route: route });
  }

  componentDidUpdate() {
    if (sessionStorage.getItem('user') !== null) {
      sessionStorage.setItem('user', JSON.stringify(this.state.user))
    }
  }

  ForgotPasswordEmail = (email) => {
    this.setState({ ForgotPasswordEmail: email })
  }

  render() {

    let return1;

    if (this.state.route === 'SignIn') {
      return1 = <SignIn backend={backend} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

    }
    if (this.state.route === 'ForgotPassword') {
      return1 = <ForgotPassword backend={backend} onRouteChange={this.onRouteChange} ForgotPasswordEmail={this.ForgotPasswordEmail} />

    }
    if (this.state.route === 'ForgotPasswordRenew') {
      return1 = <ForgotPasswordRenew email={this.state.ForgotPasswordEmail} backend={backend} onRouteChange={this.onRouteChange} />

    }
    if (this.state.route === 'Home') {
      
      return1 = <div>
        <Logo backend={backend} email={this.state.user.email}/>
        <Rank name={this.state.user.name} rank={this.state.user.entries} />
        <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
        <FaceRecognition imgUrl={this.state.imgUrl} boxes={this.state.boxes} />
      </div>
    }
    if (this.state.route === 'Register') {
      return1 = <Register backend={backend} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
    }
    if (this.state.route === 'Profile') {
      return1 = <Profile backend={backend} loadUser={this.loadUser} name={`EDIT ${this.state.user.name}'s profile`} email={this.state.user.email} onRouteChange={this.onRouteChange} />
    }

    return (
      <div className="App">
        <Particles className='particles' params={particles_options} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

        {return1}

      </div>
    );
  }
}

export default App;
