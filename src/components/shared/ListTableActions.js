
import { Link } from "react-router-dom";
import { Tooltip, IconButton, Button } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';


const ListTableActions = (props) => {
    const { modelName, id, handleDelete } = props;
    return (
        <>
            <Link to={`${modelName}/` + id}>
                <Tooltip title="Show" aria-label="show">
                    <IconButton
                        aria-label="show" className="mx-1">
                        <VisibilityOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Link>

            <Link to={`${modelName}/` + id + '/edit'}>
                <Tooltip title="Edit" aria-label="edit">
                    <IconButton aria-label="edit" className="mx-1">
                        <CreateOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Link>

            <Tooltip title="Edit" aria-label="edit">
                <IconButton
                    onClick={() => { handleDelete(id) }}
                    aria-label="delete" className="mx-1">
                    <DeleteOutlinedIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default ListTableActions