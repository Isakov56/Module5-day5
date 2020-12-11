import { Container, Spinner, Row, Col } from "react-bootstrap";
import SingleProduct from "./Product";

const { Component } = require("react");
const axios = require("axios");

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsList: [],
      fetching: true,
    };
  }

  componentDidMount = () => {
    this.refreshList();
  };

  refreshList = () => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => this.setState({ productsList: res.data }))

      .catch((err) => console.log(err));
  };

  render() {
    const { productsList } = this.state;
    return (
      <Container>
        <Row>
          {productsList.length ? (
            productsList.map((product) => (
              <Col xs={4}>
                <SingleProduct data={product} />
              </Col>
            ))
          ) : (
            <Spinner animation="border" />
          )}
        </Row>
      </Container>
    );
  }
}

export default ProductList;
