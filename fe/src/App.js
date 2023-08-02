import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Batch from "./Pages/Batch";
import Order from "./Pages/Order";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/batch" element={<Batch/>}></Route>
          <Route path="/Order" element={<Order/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
