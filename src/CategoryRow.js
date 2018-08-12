import React from 'react';

const CategoryRow = ({ category, selectCategory }) => {
    const { name, id } = category;
    return (
        <li onClick={() => selectCategory(id)}>
            { category.name }
        </li>
    )
}

export default CategoryRow;