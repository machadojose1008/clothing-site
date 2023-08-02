import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./routes/navigation/navigation.component";



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NavigationBar />} >
        <Route index element={<Home />} />
      </Route>

    </Routes>
  )
}

export default App;
