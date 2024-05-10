import {
  Button,
  Navbar,
  Modal,
  Spinner,
  Alert,
  Dropdown,
} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";

function NavBarComponent() {
  const { items, getTotalCost, isLoading, error } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched categories:", data); // logs the fetched data to the console
        setCategories(data); // sets the fetched data into the state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/sizes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched sizes:", data);
        setSizes(data);
      })
      .catch((error) => {
        console.error("Error fetching sizes:", error);
      });
  }, []);

  const checkout = async () => {
    try {
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.filter((item) => item.quantity > 0),
        }),
      });
      const result = await response.json();
      if (result.url) {
        window.location.assign(result.url);
      }
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
  };

  return (
    <>
      <Navbar expand="sm" bg="primary">
        <Navbar.Brand href="/">The Minis Emporium</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Shop
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/">
                All Products
              </Dropdown.Item>
              <Dropdown as="span" drop="end">
                <Dropdown.Toggle as="a" className="dropdown-item">
                  By Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      as={Link}
                      to={`/shop/category/${category.id}`}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="span" drop="end">
                <Dropdown.Toggle as="a" className="dropdown-item">
                  By Size
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {sizes.map((size) => (
                    <Dropdown.Item
                      key={size.id}
                      as={Link}
                      to={`/shop/size/${size.id}`}
                    >
                      {size.size}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>

          <Link to="/about" className="btn mr-3">
            About
          </Link>
          <Link to="/contact" className="btn mr-3">
            Contact
          </Link>
          <Button onClick={handleShow}>
            Cart ({items.reduce((sum, item) => sum + item.quantity, 0)} Items)
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <Spinner animation="border" />}
          {error && <Alert variant="danger">Error: {error}</Alert>}
          {items.reduce((sum, item) => sum + item.quantity, 0) > 0 ? (
            <>
              <p>Items in your cart:</p>
              {items
                .filter((item) => item.quantity > 0)
                .map((currentProduct) => (
                  <CartProduct
                    key={currentProduct.id}
                    product={currentProduct}
                  />
                ))}
              <h4>Subtotal: ${getTotalCost().toFixed(2)}</h4>
              <h4>HST (13%): ${(getTotalCost() * 0.13).toFixed(2)}</h4>
              <h1>Total: ${(getTotalCost() * 1.13).toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBarComponent;
