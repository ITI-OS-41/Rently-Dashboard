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
import Header from "../../components/Headers/Header.js";
import SubCategoryForm from "../../components/forms/SubCategoryForm";

const modelName = 'subcategory';


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
                <SubCategoryForm />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

