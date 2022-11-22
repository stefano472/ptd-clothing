// import { Link } from 'react-router-dom'

import ProductCard from '../product-card/product-card.component'
// import './category-preview.scss'
import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles'


const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer >
        <Title to={title}>
            {/* <Link className='title' to={title}> */}
              {title.toUpperCase()}
            {/* </Link> */}
        </Title>
        <Preview>
            {
                products.filter((_, index) => index < 4 )
                    .map((product) => {
                        return (
                          <ProductCard key={product.id} product={product} />
                        )
                    })
            }
        </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview