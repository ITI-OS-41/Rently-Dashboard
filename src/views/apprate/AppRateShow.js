import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { get } from "functions/request";
import Rating from "@material-ui/lab/Rating";

const modelName = 'apprate';


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
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">



                <h3 className="mb-0">{item.rater.username} @ {item.site}</h3>
              </CardHeader>
              <CardBody>
                <h3 className="mb-0">{item.comment}</h3>
                <Rating
                  name="rating"
                  readOnly
                  value={item.rating}
                />
                <p>{new Date(item.createdAt).toLocaleDateString()}</p>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

