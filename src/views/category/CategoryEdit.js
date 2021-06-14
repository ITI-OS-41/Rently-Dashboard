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
// core components
import Header from "components/Headers/Header.js";
import { get } from "functions/request";
import FAQForm from "components/forms/FAQForm";

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
  }, [])


  return item && (<>
    <Header />
    {/* Page content */}
    <Container className="mt--7" fluid>
      {/* Table */}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">Edit {modelName}</h3>
            </CardHeader>
            <CardBody>
              <FAQForm type="edit" data={item} />
            </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
  </>
  );
};

