import { Routes, Route } from "react-router-dom"

import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"
import './shop.scss'

const Shop = () => {

  return (
    <Routes >
      <Route index element={<CategoriesPreview />} />
      {/* se devo far cambiare il path in modo dinamico lo appoggio ad una variabile con una colon :
      nel mio caso :category, per poter aver accesso a questo paramtro dovrò gestirlo nel 
      category component con un import useParams */}
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop