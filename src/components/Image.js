import React from "react";
import { string, func } from 'prop-types';

const Image = ({ src, alt, onImageClick }) => {
    const onClick = () => {
        onImageClick(src)
    }
    return <img className="image" alt={alt} src={src} onClick={onClick} />
}

Image.propTypes = {
    src: string.isRequired,
    alt: string.isRequired,
    onImageClick: func.isRequired,
}
export default Image;