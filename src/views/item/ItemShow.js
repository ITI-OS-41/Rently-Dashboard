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

const modelName = 'item';


export default (props) => {
  const [item, setItem] = useState(null);
  const id = props.match.params.id

  useEffect(() => {
    get(`/${modelName}/${id}`)
      .then(response => {
        let res = response.data
        setItem(res)
        console.log(res);
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
                <img src={item.photo} width="200" className="img-fluid mb-4 mx-auto" />

                <h3 className="mb-0">owner: {item.description}</h3>
                <h3 className="mb-0">owner: {item.owner.name}</h3>
                <h3 className="mb-0">category: {item.category.name} ({item.subcategory.name})</h3>
                <h3 className="mb-0">condition: {item.condition}</h3>
                <h3 className="mb-0">status: {item.stock} </h3>
                <h3 className="mb-0">category: {item.cancellation} </h3>
                <h3 className="mb-0">category: {item.deliverable} </h3>
                <h3 className="mb-0">category: {item.deposit} </h3>
                <h3 className="mb-0">price: </h3>
                <h3 className="mb-0">hour: {item.price.hour}</h3>
                <h3 className="mb-0">day: {item.price.day}</h3>
                <h3 className="mb-0">week: {item.price.week}</h3>
                <h3 className="mb-0">month: {item.price.month}</h3>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

