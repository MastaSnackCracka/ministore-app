import React, { useContext, useState } from "react";
import { Card, Button, Modal, Carousel, Image } from "react-bootstrap";
import { CartContext } from "../CartContext";
import PropTypes from "prop-types";

function ProductCard(props) {
  const { product } = props;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    cart.addOneToCart(product.id);
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    cart.removeOneFromCart(product.id);
  };

  const handleDeleteFromCart = (e) => {
    e.stopPropagation();
    cart.deleteFromCart(product.id);
  };

  return (
    <>
      <Card style={{ width: "19rem" }} onClick={handleShowModal}>
        <Card.Img
          variant="top"
          src={
            product.image1 ? `/images/${product.image1}` : "/images/noimage.jpg"
          }
        />
        <Card.Body>
          <Card.Title>{product.name || "No Name Available"}</Card.Title>
          <Card.Text>
            Price: ${product.price ? product.price.toFixed(2) : "0.00"}
            <br />
            Category: {product.category || "No Category"}
            <br />
            Size: {product.size || "No Size"}
            <br />
            Class: {product.charClass || "No Class"}
            <br />
            Race: {product.charRace || "No Race"}
          </Card.Text>
          {productQuantity > 0 ? (
            <>
              <Card.Text>In Cart: {productQuantity}</Card.Text>
              <Button
                variant="secondary"
                onClick={handleRemoveFromCart}
                className="mx-2"
              >
                -
              </Button>
              <Button
                variant="secondary"
                onClick={handleAddToCart}
                className="mx-2"
              >
                +
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteFromCart}
                className="mt-2"
              >
                Remove
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="custom-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product.images && product.images.length > 1 ? (
            <Carousel>
              {product.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <Image src={`/images/${img}`} alt={`Slide ${index}`} fluid />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Image
              src={
                product.image1
                  ? `/images/${product.image1}`
                  : "/images/noimage.jpg"
              }
              fluid
            />
          )}
          <p className="mt-3">{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Size: {product.size}</p>
          <p>Class: {product.charClass}</p>
          <p>Race: {product.charRace}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    size: PropTypes.string,
    image1: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    charClass: PropTypes.string,
    charRace: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
