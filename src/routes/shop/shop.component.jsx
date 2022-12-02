import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"


// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { fetchCategoriesAsync } from "../../store/categories/category.action"
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"
// import './shop.scss'

const Shop = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchCategoriesAsync())
    // const getCategoriesMap = async () => {
      /**
       * questo dispath che prima eseguivo qui ora lo vado ad estrapolare nelle
       * action da compiere sulle categories in modo da eseguirlo quando faccio
       * la chiamata di fetch all' API
       */
        // const categoriesArray = await getCategoriesAndDocuments("categories")
        // dispatch(setCategories(categoriesArray))
    // }
    // getCategoriesMap()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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