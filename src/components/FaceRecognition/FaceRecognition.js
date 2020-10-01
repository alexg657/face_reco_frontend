import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({ imgUrl, box }) => {

    return (
        <div className='flex justify-center ma'>
            <div className='absolute mt2'>
                <img id='inputImg' alt='' src={imgUrl} />
                <div className='bounding-box' style={{ top: box.top_row, left: box.left_col, bottom: box.bottom_row, right: box.right_col }}></div>

            </div>
        </div>
    )
}
// {top_row: 0.29343778, left_col: 0.48530096, bottom_row: 0.46725133, right_col: 0.5502035}

export default FaceRecognition;