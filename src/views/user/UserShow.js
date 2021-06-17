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
import Switch from '@material-ui/core/Switch';

const modelName = 'user';


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
                <h3 className="mb-0">{item.username} ({item._id})</h3>
              </CardHeader>
              <CardBody>
                <img src={item.photo} width="200" className="img-fluid mb-4 mx-auto" />
                <h3 className="mb-0">{item.firstname} {item.lastname}</h3>
                <h3 className="mb-0">{item.email}</h3>
                <h3 className="mb-0">{item.role}</h3>
                <h3 className="mb-0">isVerified
                  {
                    <Switch
                      checked={item.isVerified}
                      readOnly
                      color="primary"
                    />
                  }
                </h3>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

