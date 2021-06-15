import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { DataGrid } from "@material-ui/data-grid";
import { Tooltip, IconButton, Button } from '@material-ui/core';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { del } from "functions/request";
import { get } from "functions/request";
import { DATAGRID_RESULTS_PER_PAGE, DATAGRID_WIDTH } from "../../config";
import { Link } from "react-router-dom";

const modelName = 'apprate';

export default () => {

  const [dummy, setDemmy] = useState(0)
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const handleDeleteNotification = (id) => {
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
        let res = response.data

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
      field: 'rater', headerName: 'Rater',
      width: `${DATAGRID_WIDTH * 0.2}px`,
      renderCell: (params) => {
        return (params.row.rater.username)
      },
    },
    {
      field: 'site', headerName: 'Site',
      width: `${DATAGRID_WIDTH * 0.2}px`,
    },
    {
      field: 'comment', headerName: 'Comment',
      width: `${DATAGRID_WIDTH * 0.3}px`,
    },
    {
      field: 'rating', headerName: 'Rating',
      type: 'number',
      width: `${DATAGRID_WIDTH * 0.2}px`,
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
            <Link to={`${modelName}/` + params.id}>
              <Tooltip title="Show" aria-label="show">
                <IconButton
                  aria-label="show" className="mx-1">
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to={`${modelName}/` + params.id + '/edit'}>
              <Tooltip title="Edit" aria-label="edit">
                <IconButton aria-label="edit" className="mx-1">
                  <CreateOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title="Edit" aria-label="edit">
              <IconButton
                onClick={() => { handleDeleteNotification(params.id) }}
                aria-label="delete" className="mx-1">
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    },
  ];

  return (
    <>
      <Header />
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
                    <AddCircleOutlineOutlinedIcon className="mr-1" />
                  Create
                </Button>
                </Link>
              </CardHeader>
              <div style={{ height: '70vh', width: '100%' }} >
                <DataGrid columnBuffer={5} loading={isLoading} rows={rows} columns={columns} pageSize={DATAGRID_RESULTS_PER_PAGE} />
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

