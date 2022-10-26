import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/sign-in/authentication.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        {/* 
          invece di utilizzare pattern matching path se voglio visualizzare una cosa assieme 
          al path genitore posso passare index come un attribute, nel nostro caso è come dire
          index={true}, ma posso semplicficare in index e basta perche sottointeso e sostanzialmente
          sgnifica che quando il path matcha col genitore mostramelo  
        */}
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
