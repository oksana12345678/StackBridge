import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/welcome" element={<WelcomePage />}/>
        <Route path="/home" />
        <Route path="/signup" />
        <Route path="/signin" />
      </Route>
    </Routes>
  );
}

export default App;
