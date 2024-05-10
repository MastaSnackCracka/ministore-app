import { Card, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Container>
      <Card className="mx-auto my-5 p-4" style={{ width: "80%" }}>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col>
            <div>
              <h4>Contact Information</h4>
              <p>Address: 123 Wyndham St, Guelph ON, Canada</p>
              <p>Phone: +555-555-5555</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Contact;
