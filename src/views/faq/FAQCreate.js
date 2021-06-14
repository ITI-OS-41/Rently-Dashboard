import React, { useState } from "react";
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
import FAQForm from '../../components/forms/FAQForm'

const modelName = 'faq';


export default () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Create {modelName}</h3>
              </CardHeader>
              <CardBody>
                <FAQForm />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

