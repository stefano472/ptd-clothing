import './categories.scss'

import Category from "../category/Category.component";

const Categories = ({categories}) => {

  return (
    <div className="categories-container" >
      {categories.map(category => (
          <Category key={category.id}  category={category} />
        )
      )}
    </div>
  )
}

export default Categories