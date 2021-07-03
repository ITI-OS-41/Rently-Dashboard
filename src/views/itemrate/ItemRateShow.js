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
import Rating from "@material-ui/lab/Rating";

const modelName = 'itemrate';


export default (props) => {
  const [item, setItem] = useState(null);
  const id = props.match.params.id

  useEffect(() => {
    get(`/${modelName}/${id}`)
      .then(response => {
        let res = response.data
        setItem(res)
        console.log("item backend: ", res);
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
                <h3 className="mb-0">Rate Info</h3>
              </CardHeader>
              <CardBody>
                <span><b>Rated Item: </b>{item.item.name} </span>  < br />
                <span><b>Rater name: </b> {item.rater.name} </span>  <br />
                <span><b>Rating number:
                </b>
                  <Rating
                    name="rating"
                    readOnly
                    value={item.rating}
                />
                </span>
                <br />
                <span><b>Rater Comment: </b> {item.comment} </span>  <br />

              </CardBody>
            </Card>

            <Card className="shadow mt-4">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Rater Info</h3>
              </CardHeader>
              <CardBody>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="id" value={item.rater_id} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="name" value={item.rater.name} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="username" value={item.rater.username} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="firstname" value={item.rater.firstname} />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField variant="outlined" fullWidth label="lastname" value={item.rater.lastname} />
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

