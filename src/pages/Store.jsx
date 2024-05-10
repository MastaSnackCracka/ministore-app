import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId, sizeId } = useParams(); // Retrieve categoryId and sizeId from URL

  // Mapping of category IDs to names
  const categoryNames = {
    1: "Heroes",
    2: "Villains",
    3: "Monsters",
  };

  // Mapping for size names
  const sizeNames = {
    1: "Tiny",
    2: "Small",
    3: "Medium",
    4: "Large",
    5: "Huge",
    6: "Gargantuan",
  };

  useEffect(() => {
    // Construct fetch URL based on categoryId and sizeId
    let fetchUrl = "http://localhost:5000/products";
    const params = [];
    if (categoryId) {
      params.push(`categoryId=${categoryId}`);
    }
    if (sizeId) {
      params.push(`sizeId=${sizeId}`);
    }
    if (params.length) {
      fetchUrl += `?${params.join("&")}`;
    }

    fetchProducts(fetchUrl);
  }, [categoryId, sizeId]); // Re-run this effect if categoryId or sizeId changes

  const fetchProducts = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className="p-3">
        Shop -{" "}
        {categoryId
          ? categoryNames[categoryId]
          : sizeId
          ? sizeNames[sizeId]
          : "All Products"}
      </h1>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && (
        <Alert variant="danger">
          An error occurred: {error}
          <Button
            onClick={() => fetchProducts(fetchUrl)}
            variant="outline-secondary"
            size="sm"
            className="m-2"
          >
            Retry
          </Button>
        </Alert>
      )}
      <Row xs={1} md={3} className="g-4">
        {products.map((product) => (
          <Col align="center" key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
