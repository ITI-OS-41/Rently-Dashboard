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

const Empty = () => {
  const [copiedText, setCopiedText] = useState();
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
                <h3 className="mb-0">Empty</h3>
              </CardHeader>
              <CardBody>
                <Row>

                  <Col lg="3" md="6">
                    <Button color="primary" type="button"> 
                    Create</Button>


                    Dynamic Material UI
                    Material Table
                    Echart

                    https://echarts.apache.org/examples/en/index.html#chart-type-pie
                    https://material-table.com/#/
                    https://material-ui.com/store/
                    https://www.npmjs.com/package/dynamic-material-ui
                    http://dynamicmaterialui.geoviewer.io/simpleform
                    http://dynamicmaterialui.geoviewer.io/playground
                    https://www.pluralsight.com/guides/generating-dynamic-forms-from-json-in-react


                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Empty;
