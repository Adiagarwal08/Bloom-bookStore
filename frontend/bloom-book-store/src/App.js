import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

//pages and components
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Catalogue from "./pages/Catalogue";
import Event from "./pages/Event";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<Product />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/events" element={<Event />} />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
