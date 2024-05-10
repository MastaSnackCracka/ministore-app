import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../CartContext";

function CartProduct({ product }) {
  const { addOneToCart, removeOneFromCart, deleteFromCart } =
    useContext(CartContext);
  const { id, name, quantity, price, image1 } = product;
  const placeholderImage = "/images/noimage.jpg";
  return (
    <Card className="mb-3" style={{ width: "100%" }}>
      <Row noGutters={true}>
        <Col xs={4}>
          <Image
            src={image1 ? `/images/${image1}` : placeholderImage}
            rounded
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col xs={8}>
          <Card.Body>
            <Card.Title>{name || "Product not found"}</Card.Title>
            <Card.Text>
              Quantity: {quantity} total
              <br />
              Price per item: ${price ? price.toFixed(2) : "0.00"}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button
                variant="outline-secondary"
                onClick={() => removeOneFromCart(id)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => addOneToCart(id)}
              >
                +
              </Button>
              <Button variant="danger" onClick={() => deleteFromCart(id)}>
                Remove
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default CartProduct;
