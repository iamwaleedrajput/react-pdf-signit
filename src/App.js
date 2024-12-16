import "./App.css";
import ReactPDFSignIn from "./lib";
import sample from "./drylab.pdf";

function App() {
  return <ReactPDFSignIn fileUrl={sample} />;
}

export default App;
