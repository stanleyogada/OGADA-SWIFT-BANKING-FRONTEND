import { useState } from "react";
import Button from "../Button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
    </div>
  );
}

export default App;
