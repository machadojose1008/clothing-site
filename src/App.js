import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./routes/navigation/navigation.component";
import SignIn from "./routes/signin/signin.component";
import Shop from "./routes/shop/shop.component";



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NavigationBar />} >
        <Route index element={<Home />} />
        <Route path="entrar" element={<SignIn/>}/>
        <Route path="shop" element={<Shop/>}/>
        
      </Route>

    </Routes>
  )
}

export default App;
