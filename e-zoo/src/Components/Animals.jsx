import React, { useState, useEffect } from "react";
import dog from '../pics/main/dog.svg';
import cat from '../pics/main/cat.svg';
import bird from '../pics/main/bird.svg';
import rodent from '../pics/main/rodent.svg';
import fish from '../pics/main/fish.svg';
import apteka from '../pics/main/apteka.svg';

import { ProdList, MiniProdList } from "../Components/ProdList";

function Animals() {
    const [selectedCateg, setCategSelected] = useState(null);
    const handleCategSel = (category) => {
        setCategSelected(prevCategory => prevCategory === category ? null : category);
    }
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className={`animals ${selectedCateg ? 'actived' : ''}`}>
                <div className={`animal ${selectedCateg === 'dog' ? 'active' : ''}`} onClick={() => handleCategSel('dog')}>
                    <img src={dog} alt='Собаки' />
                    <p>Собаки</p>
                </div>
                <div className={`animal ${selectedCateg === 'cat' ? 'active' : ''}`} onClick={() => handleCategSel('cat')}>
                    <img src={cat} alt='Коты' />
                    <p>Коты</p>
                </div>
                <div className={`animal ${selectedCateg === 'bird' ? 'active' : ''}`} onClick={() => handleCategSel('bird')}>
                    <img src={bird} alt='Птицы' />
                    <p>Птицы</p>
                </div>
                <div className={`animal ${selectedCateg === 'rodent' ? 'active' : ''}`} onClick={() => handleCategSel('rodent')}>
                    <img src={rodent} alt='Грызуны' />
                    <p>Грызуны</p>
                </div>
                <div className={`animal ${selectedCateg === 'fish' ? 'active' : ''}`} onClick={() => handleCategSel('fish')}>
                    <img src={fish} alt='Рыбки' />
                    <p>Рыбки</p>
                </div>
                <div className={`animal ${selectedCateg === 'apteka' ? 'active' : ''}`} onClick={() => handleCategSel('apteka')}>
                    <img src={apteka} alt='Аптека' />
                    <p>Аптека</p>
                </div>
            </div>
            <div className="products">
                {selectedCateg && windowWidth >= 600 ? <ProdList animal={selectedCateg} /> : ''}
                {selectedCateg && windowWidth < 600 ? <MiniProdList animal={selectedCateg} /> : ''}
            </div>
        </>
    );
}

export default Animals;