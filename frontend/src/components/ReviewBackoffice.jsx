import { Button as MUIbutton } from "@material-ui/core";

const { Alert, Col, Form, Spinner, Container } = require("react-bootstrap");
const { Component } = require("react");

class ProductBackoffice extends Component {
  state = {
    pruductsInfo: {
      name: "",
      description: "",
      brand: "",
      imageUrl: "",
      price: 0,
      category: "",
    },
    fetching: true,
  };

  render() {
    return (
      <div>
        {this.state.errMessage ? (
          <Alert variant="danger">
            We encountered a problem with your request
            {this.state.errMessage}
          </Alert>
        ) : (
          <div>
            <Container>
              <Form onSubmit={this.EditUserInfos}>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      // onChange={this.updateFormField}
                      // value={this.state.user.name}
                      required
                    />
                  </Form.Group>
                </Form.Row>
                <br />
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="description"
                      // value={this.state.user.surname}
                      // onChange={this.updateFormField}
                      required
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Brand *</Form.Label>
                    <Form.Control
                      type="text"
                      id="brand"
                      // onChange={this.updateFormField}
                      // value={this.state.user.name}
                      required
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    id="title"
                    // onChange={this.updateFormField}
                    // value={this.state.user.title}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Category *</Form.Label>
                  <Form.Control
                    type="text"
                    id="Category"
                    // onChange={this.updateFormField}
                    // value={this.state.user.title}
                    required
                  />
                </Form.Group>
                <div className="text-right">
                  <MUIbutton variant="contained" color="primary">
                    Add
                  </MUIbutton>
                </div>
              </Form>
            </Container>
          </div>
        )}
        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            Reserving your table, please wait
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductBackoffice;
