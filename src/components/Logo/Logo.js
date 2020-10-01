import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face_reco from './face_reco.png';
const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 50 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner"><img className='pa4' src={face_reco} alt='Logo'></img> </div>
            </Tilt>
        </div>
    )
}

export default Logo;