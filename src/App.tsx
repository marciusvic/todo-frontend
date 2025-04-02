import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/Router";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
