import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translate(-50%,-50%)',
        transformOrigin: 'circle'
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

const LoadingCircle = (props) => {
    const classes = useStylesFacebook();

    const { size, thickness } = props

    return (
        <CircularProgress
            variant="indeterminate"
            size={size}
            thickness={thickness}
            {...props} />

    );
}

LoadingCircle.defaultProps = {
    size: 20,
    thickness: 4
}
export default LoadingCircle