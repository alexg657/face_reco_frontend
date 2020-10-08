import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
const Logo = ({name}) => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 50 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner"><img src={name} alt='Logo'></img> </div>
            </Tilt>
        </div>
    )
}

export default Logo;