import React from 'react';
import CategoryRow from './CategoryRow';

const Categories = ({ categories, selectCategory }) => {
    return(
        <div>
            <h2>Categories</h2>
            <ul>
                {
                    categories.map(category => {
                        return (<CategoryRow key={ category.id } category={ category } selectCategory={ selectCategory } />)
                    })
                }
            </ul>
        </div>
    )
}

export default Categories;