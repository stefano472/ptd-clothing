import './directory.scss'

import Category from "../category/category.component.jsx";

const Directory = ({categories}) => {

  return (
    <div className="categories-container" >
      {categories.map(category => (
          <Category key={category.id}  category={category} />
        )
      )}
    </div>
  )
}

export default Directory