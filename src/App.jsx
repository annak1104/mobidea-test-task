import { Slider } from "./components/Slider/Slider.jsx";
import "./App.css";
import { Header } from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Slider />
      <Form />
    </div>
  );
}

export default App;
