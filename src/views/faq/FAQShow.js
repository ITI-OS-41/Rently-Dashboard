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

const modelName = 'faq';


export default (props) => {
  const [item, setItem] = useState(null);
  const id = props.match.params.id

  useEffect(() => {
    get(`/${modelName}/${id}`)
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
                <h3 className="mb-0">{item.question}</h3>
              </CardHeader>
              <CardBody>
                {item.answer}

                <h2>{item.category.name}</h2>
                <hr/>
                Section:
                <h2>{item.section}</h2>
              </CardBody>
            </Card>

            <Card className="shadow mt-4">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Created by</h3>
              </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="id" value={item.createdBy._id} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="username" value={item.createdBy.username} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="firstname" value={item.createdBy.firstname} />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="lastname" value={item.createdBy.lastname} />
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

