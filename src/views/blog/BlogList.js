import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton, Button } from '@material-ui/core';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { del } from "functions/request";
import { get } from "functions/request";
import { DATAGRID_RESULTS_PER_PAGE, DATAGRID_WIDTH } from "../../config";
import { Link } from "react-router-dom";
import history from "functions/history";



export default () => {

  const [dummy, setDemmy] = useState(0)
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const handleDeleteBlog = (id) => {
    const conf = window.confirm("are you sure you want to delete?")
    if (!conf) {
      return;
    }
    del(`blog/${id}`, "Blog deleted successfully!")
      .then(() => {
        setDemmy(prevState => (prevState + 1))
      })
  }

  useEffect(() => {
    get('/blog')
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
    { field: 'title', headerName: 'Title', width: `${DATAGRID_WIDTH * 0.3}px` },
    { field: 'description', headerName: 'Description', width: `${DATAGRID_WIDTH * 0.55}px` },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: `${DATAGRID_WIDTH * 0.20}px`,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <Link to={'blog/' + params.id}>
              <IconButton
                aria-label="show" className="mx-1">
                <VisibilityOutlinedIcon />
              </IconButton>
            </Link>

            <IconButton aria-label="edit" className="mx-1">
              <CreateOutlinedIcon />
            </IconButton>

            <IconButton
              onClick={() => { handleDeleteBlog(params.id) }}
              aria-label="delete" className="mx-1">
              <DeleteOutlinedIcon />
            </IconButton>
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
                <h3 className="mb-0">List Blog</h3>
                <Link to="blog/create">
                  <Button variant="contained" color="primary" className="bg-primary">
                    <AddCircleOutlineOutlinedIcon className="mr-1" />
                  Create
                </Button>
                </Link>
              </CardHeader>
              <div style={{ height: '70vh', width: '100%' }}>
                <DataGrid loading={isLoading} rows={rows} columns={columns} pageSize={DATAGRID_RESULTS_PER_PAGE} />
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

