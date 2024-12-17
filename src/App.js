import "./App.css";
import ReactPDFSignIn from "./lib";
import sample from "./drylab.pdf";

function App() {
  return (
    <ReactPDFSignIn
      fileUrl={sample}
      handleSubmit={(file) => console.log(file)}
    />
  );
}

export default App;
