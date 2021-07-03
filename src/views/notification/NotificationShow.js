import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row
} from "reactstrap";
import { TextField, Grid } from '@material-ui/core';
import Header from "components/Headers/Header.js";
import { get } from "functions/request";
import DoneAllIcon from '@material-ui/icons/DoneAll';

const modelName = 'notification';


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
                <h3 className="mb-0">Content

                  {item.isRead && <DoneAllIcon color="primary" style={{marginLeft: '0.5rem'}}/>}
                </h3>
              </CardHeader>
              <CardBody>
                {item.content}
              </CardBody>
            </Card>

            <Card className="shadow mt-4">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Receiver</h3>
              </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="id" value={item.receiver._id} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="name" value={item.receiver.name} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="username" value={item.receiver.username} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="firstname" value={item.receiver.firstname} />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="lastname" value={item.receiver.lastname} />
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

