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
  Spinner
} from "reactstrap";

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// core components
import Header from "components/Headers/Header.js";

const Notification = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


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
                <Row className="justify-content-between">
                  <Col >
                    <h3 className="mb-0">Notification</h3>
                  </Col>
                  <Col >
                    <Button color="primary" type="button">
                      Button
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>

                  <Col lg="3" md="6">
                    <Button onClick={handleClick}>Open simple snackbar</Button>
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message="Note archived"
                      action={
                        <React.Fragment>
                          <Button color="secondary" size="small" onClick={handleClose}>
                            UNDO
            </Button>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                      }
                    />



                    <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />

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

export default Notification;
