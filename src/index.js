import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../node_modules/axios';
import CategoryRow from './CategoryRow';
import Categories from './Categories';
import Category from './Category';


class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            category: {}
        }
        this.selectCategory = this.selectCategory.bind(this);
    }
    async componentDidMount() {
        try {
            const res = await axios.get('/api/categories');
            this.setState({ categories: res.data })
        } catch(err) { console.log("Mounting Error!") }
    }
    async selectCategory(id) {
        if(id === -1) {
            this.setState({ category: {} })
            return;
        }
        const res = await axios.get(`/api/categories/${id}`);
        this.setState({ category: res.data })
    }
    render() {
        const { selectCategory } = this;
        const { categories, category } = this.state;
        return (
                category.id ? (<Category category={ category } selectCategory={ selectCategory }/>) : (
                <Categories categories={ categories } selectCategory={ selectCategory } />
                )
        )   
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))