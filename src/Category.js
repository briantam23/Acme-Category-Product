import React from 'react';

const Category = ({ category, selectCategory }) => {
    return(
        <div>
            <h2>{ category.name }</h2>
            <ul>
                {
                    category.products.map(product => <li key={ product.id }>{ product.name }</li>)
                }
            </ul>
            <a href='#' onClick={ () => selectCategory(-1) }>Back</a>
        </div>
    )
}

export default Category;