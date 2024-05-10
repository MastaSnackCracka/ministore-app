const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const stripe = require("stripe")(
  "stripe secret key"
);

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "********",
  database: "ministore",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL.");
});

// Endpoint to fetch products
app.get("/products", (req, res) => {
  let { categoryId, sizeId } = req.query;
  let query = `SELECT p.id, p.Name AS name, p.Description AS description, p.Price AS price,
               c.Name AS category, s.Size AS size, p.Image1 AS image1, p.Image2 AS image2, p.Image3 AS image3,
               p.Char_Class AS charClass, p.Char_Race AS charRace
               FROM products p
               JOIN categories c ON p.CatId = c.id
               JOIN size s ON p.Size = s.id`;
  let parameters = [];

  if (categoryId) {
    query += ` WHERE c.id = ?`;
    parameters.push(categoryId);
  }
  if (sizeId) {
    query += (parameters.length ? " AND " : " WHERE ") + "s.id = ?";
    parameters.push(sizeId);
  }

  console.log("Executing query:", query, "with parameters:", parameters);
  connection.query(query, parameters, handleQueryResponse(res));
});

// Helper function to handle SQL query responses
function handleQueryResponse(res) {
  return (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data: " + err.message);
      return;
    }
    res.json(
      results.map((product) => ({
        ...product,
        images: [product.image1, product.image2, product.image3].filter(
          Boolean
        ),
      }))
    );
  };
}

// Endpoint to fetch categories
app.get("/categories", (req, res) => {
  const query = "SELECT id, Name AS name FROM categories";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      res.status(500).send("Error fetching categories");
      return;
    }
    res.json(results);
  });
});

// Endpoint to fetch sizes
app.get("/sizes", (req, res) => {
  const query = "SELECT id, Size AS size FROM size";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching sizes:", err);
      res.status(500).send("Error fetching sizes");
      return;
    }
    res.json(results);
  });
});
//**************************************************************************************** */

app.post("/checkout", async (req, res) => {
  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  // Add a separate line item for total tax
  const totalCost = items.reduce(
    (sum, item) => sum + item.price_data.unit_amount * item.quantity,
    0
  );
  const totalTax = totalCost * 0.13; // Calculate total tax based on subtotal

  items.push({
    price_data: {
      currency: "cad",
      product_data: {
        name: "Total HST",
      },
      unit_amount: Math.round(totalTax), // Total tax in cents
    },
    quantity: 1, // Tax is a single line item
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res
      .status(500)
      .json({ error: "Error processing payment", details: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});

// Close MySQL connection on process termination
process.on("SIGINT", () => {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  connection.end((err) => {
    if (err) {
      console.error("Failed to close MySQL connection:", err);
    } else {
      console.log("MySQL connection closed.");
    }
    process.exit(0);
  });
});
