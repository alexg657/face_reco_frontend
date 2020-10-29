import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
class Logo extends React.Component {
    constructor() {
        super();
        this.state = {
            imgBase64: ''
        }
    }
    componentDidMount() {
        this.onPhotoLoad()
    }
    onPhotoLoad = () => {
        fetch(`${this.props.backend}/filesdownload`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        })
            .then(response => response.json())
            .then(file => {

                this.setState({ imgBase64: file })
            })
    }


    render() {

        return (
            <div className='ma4 mt0'>
                <Tilt className="Tilt br2 shadow-2" options={{ max: 50 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner">
                        <img src={`data:image/jpeg;base64,${this.state.imgBase64}`} alt='Logo'></img>
                    </div>
                </Tilt>
            </div>
        )
    }
}

export default Logo;