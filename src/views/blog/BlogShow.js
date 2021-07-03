import React, { useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  Spinner
} from "reactstrap";
import { TextField, Grid } from '@material-ui/core';
import Header from "components/Headers/Header.js";
import BlogForm from '../../components/forms/BlogForm'
import { get } from "functions/request";



export default (props) => {
  const [item, setItem] = useState(null);
  const id = props.match.params.id

  useEffect(() => {
    get(`/blog/${id}`)
      .then(response => {
        let res = response.data
        setItem(res)
      })
      .catch(err => { })
  }, [])


  return item && (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">{item.title}</h3>
              </CardHeader>
              <CardBody>
                <img src={item.headerPhoto} style={{width: '100%',marginBottom: '2rem'}} alt=""/>

                {item.description}
              </CardBody>

            </Card>

            <Card className="shadow mt-4">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Author</h3>
              </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="id" value={item.author_id} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="name" value={item.author.name} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="username" value={item.author.username} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="firstname" value={item.author.firstname} />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="lastname" value={item.author.lastname} />
                  </Grid>
                </Grid>
              </CardBody>


            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

