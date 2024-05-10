import { Card, Container } from "react-bootstrap";

function About() {
  return (
    <Container>
      {/* <div id="imageContainer"></div> */}

      <Card className="mx-auto my-5 p-4" style={{ width: "60%" }}>
        <Card.Body>
          <Card.Title className="text-center">About Us</Card.Title>
          <Card.Text>
            Welcome to <b>The Mini Emporium</b>, where imagination comes to life
            through the artistry of hand-painted tabletop RPG miniatures. At the
            Mini Emporium, we believe that every gaming experience should be a
            visual masterpiece, and our meticulously crafted miniatures are
            designed to transport you to fantastical realms where heroes and
            villains come to life.
            <br />
            <br />
            With skilled artists dedicated to bringing your characters to life,
            we take pride in offering a diverse range of high-quality,
            hand-painted miniatures that capture the essence of your tabletop
            adventures. From epic warriors and mythical creatures to intricate
            dungeon denizens, our collection is a testament to the limitless
            possibilities of your imagination.
            <br />
            <br />
            What sets The Mini Emporium apart is our commitment to excellence in
            craftsmanship. Each miniature is a unique work of art, painstakingly
            painted with precision and attention to detail. We use premium
            materials to ensure durability and longevity, so your miniatures can
            stand the test of time and countless gaming sessions.
            <br />
            <br />
            Whether you&apos;re a seasoned dungeon master or a newcomer to the
            world of tabletop RPGs, The Mini Emporium is here to enhance your
            gaming experience. Our miniatures not only serve as dynamic game
            pieces but also as cherished keepsakes that capture the essence of
            your characters&apos; journeys.
            <br />
            <br />
            Join us on a journey where creativity knows no bounds. Explore our
            collection and discover the perfect companions for your tabletop
            adventures. At The Mini Emporium, we don&apos;t just sell
            miniatures; we craft stories, one miniature at a time.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About;
