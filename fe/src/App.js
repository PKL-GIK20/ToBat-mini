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


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
