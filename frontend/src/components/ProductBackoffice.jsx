import { Button as MUIbutton } from "@material-ui/core";

const { Alert, Col, Form, Spinner, Container } = require("react-bootstrap");
const { Component } = require("react");

class ProductBackoffice extends Component {
  state = {
    pruductInfo: {
      name: "",
      description: "",
      brand: "",
      imageUrl: "",
      price: 0,
      category: "",
    },
    fetching: true,
    errorMessage: "",
    productImgPath: "",
  };

  updateProductIMG = (e) => {
    this.setState({ productImgPath: e.target.files[0] });
  };

  submitProductPic = async () => {
    const FormImage = new FormData();
    FormImage.append("profile", this.state.userImage);
    try {
      const response = await fetch(`http://localhost:3001/files/upload`, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
        }),
        body: FormImage,
      });
      if (response.ok) {
        const parRes = await response.json();
        console.log(parRes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateFormField = (e) => {
    const pruductInfo = { ...this.state.pruductInfo }; // creating a copy of the current state
    const currentId = e.currentTarget.id; // 'name', 'phone', etc.
    pruductInfo[currentId] = e.currentTarget.value; // e.currentTarget.value is the keystroke
    this.setState({ pruductInfo: pruductInfo });
  };

  submitForm = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        body: JSON.stringify(this.state.pruductInfo),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        alert("Pruducts Info saved!");
        this.setState({
          pruductInfo: {
            name: "",
            description: "",
            brand: "",
            imageUrl: "",
            price: 0,
            category: "",
          },
          errMessage: "",
          loading: false,
        });
      } else {
        console.log("an error occurred");
        let error = await response.json();
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e); // Error
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }
  };

  render() {
    const {
      name,
      description,
      brand,
      price,
      category,
    } = this.state.pruductInfo;
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
              <Form onSubmit={() => console.log(222)}>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      onChange={this.updateFormField}
                      value={name}
                      required
                    />
                  </Form.Group>
                </Form.Row>
                <br />
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="description"
                      value={description}
                      onChange={this.updateFormField}
                      required
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Brand *</Form.Label>
                    <Form.Control
                      type="text"
                      id="brand"
                      onChange={this.updateFormField}
                      value={brand}
                      required
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    id="price"
                    onChange={this.updateFormField}
                    value={price}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category *</Form.Label>
                  <Form.Control
                    type="text"
                    id="category"
                    onChange={this.updateFormField}
                    value={category}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Upload image *</Form.Label>
                  <input
                    type="file"
                    onChange={(e) => this.updateProductIMG(e)}
                  />
                </Form.Group>
                <div className="text-right">
                  <MUIbutton
                    variant="contained"
                    color="primary"
                    onClick={this.submitForm}
                  >
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
// onSubmit={() => {
//   console.log("Form submited");
//   this.submitForm();
// this.submitProductPic();
// }}
