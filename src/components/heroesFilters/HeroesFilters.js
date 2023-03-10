import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from './filtersSlice';
import { filtersChanged } from './filtersSlice';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(fetchFilters());

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onChangeFilter = (filter) => {
        dispatch(filtersChanged(filter));
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтров пока нет</h5>
        }
    
        return arr.map(({name, className, label}) => {
            return <button key={name} className={`btn ${className}`} onClick={() => onChangeFilter(name)}>{label}</button>
        })
    }

    const elements = renderFiltersList(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;