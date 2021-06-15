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

const modelName = 'category';


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
                <h3 className="mb-0">{item.name}</h3>
              </CardHeader>
              <CardBody>
                <img src={item.photo} className="img-fluid mb-4 mx-auto" />
                <h3 className="mb-0">{item.description}</h3>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

