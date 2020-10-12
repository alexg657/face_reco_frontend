import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f2'>
                {'face_reco will detect faces on the picture from your link... try it!'}
            </p>

            <div className='input_button mw8 center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70' type='search' onChange={onInputChange} placeholder='link to your picture goes here...' />
                <button className='w-30 grow f4 ph3 pv2 dib white bg-dark-blue' onClick={onPictureSubmit}>Detect faces</button>
            </div>

        </div>
    )
}

export default ImageLinkForm;