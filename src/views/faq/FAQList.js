import React, {useEffect, useState} from "react";
// reactstrap components
import {Card, CardHeader, Container, Row} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {DataGrid} from "@material-ui/data-grid";
import {Button} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {del, get} from "functions/request";
import {DATAGRID_RESULTS_PER_PAGE, DATAGRID_WIDTH} from "../../config";
import {Link} from "react-router-dom";
import ListTableActions from "components/shared/ListTableActions";


const modelName = 'faq';

export default () => {

    const [dummy, setDemmy] = useState(0)
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const handleDelete = (id) => {
        const conf = window.confirm(`are you sure you want to delete this ${modelName}?`)
        if (!conf) {
            return;
        }
        del(`${modelName}/${id}`, `${modelName} deleted successfully!`)
            .then(() => {
                setDemmy(prevState => (prevState + 1))
            })
    }
    useEffect(() => {
        get(`/${modelName}`)
            .then(response => {
                let res = response.data.res

                res.map((res) => {
                    res['id'] = res['_id']
                })


                setRows(res)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [dummy])


    const columns = [
        {
            field: 'question', headerName: 'question',
            width: `${DATAGRID_WIDTH * 0.3}px`,
        },
        {
            field: 'answer', headerName: 'answer',
            width: `${DATAGRID_WIDTH * 0.3}px`,
        },
        {
            field: 'category', headerName: 'category',
            width: `${DATAGRID_WIDTH * 0.15}px`,
            renderCell: (params) => {
                return (params.row.category.name);
            }
        },
        {
            field: 'section', headerName: 'section',
            width: `${DATAGRID_WIDTH * 0.15}px`,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: `${DATAGRID_WIDTH * 0.2}px`,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <>
                        <ListTableActions modelName={modelName} id={params.row._id} handleDelete={handleDelete}/>
                    </>
                );
            }
        },
    ];

    return (
        <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7 " fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow px-3 pb-4">
                            <CardHeader className="bg-transparent d-flex justify-content-between">
                                <h3 className="mb-0">List {modelName}s</h3>
                                <Link to={`${modelName}/create`}>
                                    <Button variant="contained" color="primary" className="bg-primary">
                                        <AddCircleOutlineOutlinedIcon className="mr-1"/>
                                        Create
                                    </Button>
                                </Link>
                            </CardHeader>
                            <div style={{height: '70vh', width: '100%'}}>
                                <DataGrid columnBuffer={9} loading={isLoading} rows={rows} columns={columns}
                                          pageSize={DATAGRID_RESULTS_PER_PAGE}/>
                            </div>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

