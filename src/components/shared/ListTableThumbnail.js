import React from "react";


const ListTableThumbnail = (props) =>{
    const {image, ...rest} = props;

    return (
        <img src={image} height="50" width="50" style={{objectFit: 'cover'}} />
    )
};


export default ListTableThumbnail;
