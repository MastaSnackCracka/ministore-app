// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarComponent from "./components/Navbar";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Store from "./pages/Store";
import Success from "./pages/Success";
import CartProvider from "./CartContext";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Container>
          <NavBarComponent />
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="shop/:categoryId" element={<Store />} />
            <Route path="/shop/category/:categoryId" element={<Store />} />
            <Route path="/shop/size/:sizeId" element={<Store />} />
          </Routes>
        </Container>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
