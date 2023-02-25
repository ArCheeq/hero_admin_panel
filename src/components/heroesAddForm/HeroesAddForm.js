import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

import { addHero } from '../heroesList/heroesSlice';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState(null);

    const {request} = useHttp();
    const dispatch = useDispatch();
        const {filters} = useSelector(state => state.filters);

    const onChangeHeroElement = (element) => {
        setHeroElement(element);
    }

    const onAddHero = (e) => {
        e.preventDefault();

        if (heroName && heroDescr && heroElement) {
            const hero = {
                id: uuidv4(),
                name: heroName,
                description: heroDescr,
                element: heroElement
            }
            request("http://localhost:3001/heroes", "POST", JSON.stringify(hero));
            dispatch(addHero(hero));
            setHeroName('');
            setHeroDescr('');
            setHeroElement('all');  
        }   
    }

    const renderElementsList = (arr) => {
        if (arr.length === 0) {
            <option value={null}>{"Элементов пока нет"}</option>
        }
    
        return arr.map(({name, label}) => {
            return <option key={name} value={name}>{label}</option>
        })
    } 

    const elementsList = renderElementsList(filters);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => {onAddHero(e)}}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => {setHeroName(e.target.value)}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => {setHeroDescr(e.target.value)}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={(e) => {onChangeHeroElement(e.target.options[e.target.selectedIndex].value)}}>
                    {elementsList}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;