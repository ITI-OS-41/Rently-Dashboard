import { Button } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import LoadingCircle from '../shared/LoadingCircle';

export default (props) => {
    const { isRequesting, type } = props;
    return (
        <Button
            className="mt-5"
            disabled={isRequesting}
            type="submit"
            variant="contained"
            color="primary"
            id="submit"
            size="large"
            startIcon={isRequesting ? <LoadingCircle /> : type == 'create' ? <AddCircleOutlineOutlinedIcon /> : <CreateOutlinedIcon />}>
            {type}
        </Button>
    )
}