```
npm i react-pdf-signit --save
```

```
import React, {useState} from 'react'
import ReactPDFSignIn from "react-pdf-signit";

function App() {
    const [loading, setLoading] = useState(false);

    const fileUrl = 'Your Pdf file'

    const handleSubmit = (file) => {
        console.log(file)
    }

    return (
        <ReactPDFSignIn
            fileUrl={fileUrl}
            handleSubmit={(file) => handleSubmit(file)}
        />
    );
}

export default App;
```
