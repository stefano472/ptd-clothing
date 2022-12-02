import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'
import Spinner from "../../components/spinner/spinner.component"

// import { CategoriesContext } from '../../contexts/categories.context'
import { useSelector } from 'react-redux'
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector'

// import './category.scss'
import { CategoryContainer, Title } from './category.styles'

const Category = () => {
    const { category } = useParams()
    // console.log(category)

    // const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
    // console.log(useSelector(selectCategoriesIsLoading), "consol")
    const isLoading = useSelector(selectCategoriesIsLoading)
    /**
     * A questo punto avrei potuto settare i miei products direttamente con un = categoriesMap[category]
     * però così facendo il component si sarebbe rirenderizzato tutte le volte che cambiavo un
     * elemento, con use state ed use effect, si rirenderizza solo all'aggiornarsi delle due 
     * dependecies dichiarate, categoriesMap  e category, così abbaimo reso il codice più robusto
     */

    const [ products, setProduct ] = useState(categoriesMap[category])

    useEffect(() => {
        setProduct(categoriesMap[category])
    }, [categoriesMap, category])

  return (
    <>
        <Title>{category.toUpperCase()}</Title>
        {
            isLoading ? <Spinner />
                : <CategoryContainer>
                    {
                        products && products.map(product => {
                            return <ProductCard key={product.id} product={product} />
                        })
                    }
                </CategoryContainer>
        }
    </>
  )
}

export default Category