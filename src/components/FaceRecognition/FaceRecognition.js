import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({ imgUrl, boxes }) => {
    let returnBox = [];
    Object.entries(boxes).forEach(([key, value]) => {
        returnBox[key] = <div key={key} className='bounding-box' style={{ top: value.top_row, left: value.left_col, bottom: value.bottom_row, right: value.right_col }}></div>
    });

    return (
        <div className='flex justify-center ma'>
            <div className='absolute mt2'>
                <img id='inputImg' alt='' src={imgUrl} />
                
                    { returnBox }
            </div>
        </div>
    )
}


export default FaceRecognition;