import { Container } from "react-bootstrap";
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
      .then((res) => this.setState({ studentsList: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <SingleProduct />
      </Container>
    );
  }
}

export default ProductList;
