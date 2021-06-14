import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import AppRateForm from "components/forms/AppRateForm";

const modelName = 'apprate';


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
                <AppRateForm />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
