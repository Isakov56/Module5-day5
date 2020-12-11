const { Link } = require("react-router-dom");
const { Navbar, Nav, Button, FormControl, Form } = require("react-bootstrap");

const { SiAmazon } = require("react-icons/si");
// const { AiOutlineShoppingCart } = require("react-icons/si");
// const amazonLogo = "%PUBLIC_URL%/amazon-logo.png";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <Navbar.Brand as={Link} to="/">
        <SiAmazon /> Amazon
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="add-product">
          Add product
        </Nav.Link>
        <Nav.Link as={Link} to="add-review">
          Add review
        </Nav.Link>
      </Nav>
      <Form>
        <FormControl type="text" placeholder="Search" className="warning" />
      </Form>
      <Button variant="outline-info">Search</Button>
    </Navbar>
  );
};

export default NavBar;
