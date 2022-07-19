import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
    const storeData = useSelector(state => state.favoriteReducer);
    return (
        <>
             <h1>FavoritesPage</h1>
        </>
    )
}


export default FavoritesPage;