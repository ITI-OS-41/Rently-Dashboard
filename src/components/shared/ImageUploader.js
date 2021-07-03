import React, {useEffect, useRef, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
const ImageUploader = (props) => {
    const {multiple, onSubmit,current,background,  ...rest} = props;

    const imageUploaderRef = useRef({});
    const [thumbnails,setThumbnails] = useState(current);
    const [files,setFiles] = useState([]);

    console.log({current})
    const handleChangeFiles = e => {
        let f = [...e.target.files];
        console.log(f)
        if (f.length){
            setFiles(f);
            let previews = [];
            f.forEach(file => {
                previews.push(URL.createObjectURL(file))
                console.log(URL.createObjectURL(file))
            });
            console.log(previews)
            setThumbnails(previews)
            onSubmit(f);
        }
    };

    return (
        <>
            <input
                accept="image/*"
                type="file"
                multiple={multiple}
                hidden
                ref={imageUploaderRef}
                onChange={handleChangeFiles}
            />

            <div style={{
                padding: '1rem',
                border: '2px dashed #ddd',
                // background: '#efefef',
                minHeight: '120px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                cursor: 'pointer',
                // overFlowY: 'auto'
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'

            }}
                onClick={()=>{imageUploaderRef.current.click()}}
            >
{}
                {
                    thumbnails.length
                        ?
                        thumbnails.map(preview=>(<img key={preview} src={preview} width="100" height="100" style={{margin: '3px', border: '2px solid white', borderRadius: '5px'}} alt=""/>))
                        :

                        <IconButton color="primary" aria-label="add" style={{display: 'block', margin: 'auto'}}>
                            <AddCircleOutlineOutlinedIcon fontSize="large" />
                        </IconButton>

                }

            </div>
        </>
    )
}



ImageUploader.defaultProps = {
    type: 'single',
    current: []
};


export default ImageUploader;
