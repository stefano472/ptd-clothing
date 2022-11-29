import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils"; 
import { setCurrentUser } from "./store/user/user.action";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  // redux genera una funzione di dispatch globale che andremo a chiamare tutte le volte che vogliamo aggiornare uno stato
  const dispatch = useDispatch()
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user) {
          createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user))
    })
    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        {/* 
          invece di utilizzare pattern matching path se voglio visualizzare una cosa assieme 
          al path genitore posso passare index come un attribute, nel nostro caso è come dire
          index={true}, ma posso semplicficare in index e basta perche sottointeso e sostanzialmente
          sgnifica che quando il path matcha col genitore mostramelo
          In sostanza vado a mostrare l'elemento Home quando i lpath è uguale al genitore, 
          nel nostro caso '/'
        */}
        <Route index element={<Home />} />
        {/* se voglio nestare route all'interno di un route dichiaro in primis, che voglio accettare qualsiasi
        cosa ci sia dopo il / con il * poi vado a dichiarare all'interno del nostro el (shop nel mio
        caso), che diventerà a sua volta un routes con all'interno route */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;
