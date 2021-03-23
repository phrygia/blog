import React from 'react'
import { Link } from 'react-router-dom'

function Category({ posts }) {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, category_name, posts }, index) => (
            <div key={_id + index}>
              <Link to={`/post/category/${category_name}`}>
                <button>
                  {category_name} {posts.length}
                </button>
              </Link>
            </div>
          ))
        : null}
    </>
  )
}

export default Category
