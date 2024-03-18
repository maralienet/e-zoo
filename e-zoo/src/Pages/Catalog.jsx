import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuNav from "../Components/MenuNav";
import GeneralPageHeader from "../Components/GeneralPageHeader";
import ProductCard from "../Components/ProductCard";

function Catalog({ name, animal, type, __type='' }) {
    const serverPath = __type ? `http://localhost:3001/prods/${animal}/${type}/${__type}`:`http://localhost:3001/prods/${animal}/${type}`;
    const [prodList, setProdList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [weightList, setWeightList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [ageList, setAgeList] = useState([]);
    const [flavourList, setFlavourList] = useState([]);
    useEffect(() => {
        axios.get(`${serverPath}?available=1`).then((res) => {
            setProdList(res.data)
            console.log(res.data)
        });
    }, []);

    useEffect(() => {
        axios.get(`${serverPath}/brands`).then((res) => {
            setBrandList(res.data)
        });

        if (type !== 'soderzhanie-i-ukhod' || animal+'/'+__type==='bird/napolniteli')
            axios.get(`${serverPath}/weights`).then((res) => {
                setWeightList(res.data)
            });

        if (type !== 'soderzhanie-i-ukhod' && type !== 'napolniteli' && type !== 'aquariums' && type !== 'veterinary')
            axios.get(`${serverPath}/flavours`).then((res) => {
                setFlavourList(res.data)
            });

        if (type !== 'napolniteli' && (animal+'/'+type) === 'dog/soderzhanie-i-ukhod')
            axios.get(`${serverPath}/ages`).then((res) => {
                setAgeList(res.data)
            });

        if (type === 'soderzhanie-i-ukhod' && (__type === 'igrushki' || __type === 'aksessuary'))
            axios.get(`${serverPath}/types`).then((res) => {
                setTypeList(res.data)
            });
    }, []);


    let animalBC;
    switch (animal) {
        case 'dog': animalBC = 'Собаки'; break;
        case 'cat': animalBC = 'Кошки'; break;
        case 'bird': animalBC = 'Птицы'; break;
        case 'rodent': animalBC = 'Грызуны'; break;
        case 'fish': animalBC = 'Рыбки'; break;
        case 'veterinaries': animalBC = 'Ветаптека'; break;
    }

    return (
        <div className="sale">
            <MenuNav />
            <GeneralPageHeader name={name} count={prodList.length} ways={[{ name: 'Главная', href: '/' }, { name: 'Каталог', href: '/' }, { name: animalBC, href: '/' }, { name: name, href: `/catalog/${animal}/${type}` }]} />
            <div className="general">
                <aside>
                    <ul className="asideFilter">
                        <li>
                            <a>Бренд</a>
                            <div className="filterItems">
                                {brandList.map((item, index) => (
                                    <div class="privacyCheck" key={index}>
                                        <input type="checkbox" id={`${item.brand}`} name={`${item.brand}`} />
                                        <label for="agreed">
                                            <span>{item.brand}</span><span className="count">{item.count}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </li>
                        <li>
                            <a>Товары по акции</a>
                            <div className="filterItems">
                                <div class="privacyCheck">
                                    <input type="checkbox" id='yesSale' name='yesSale' />
                                    <label for="agreed">
                                        <span>Да</span><span className="count"></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                        {weightList.length > 0 && type !== 'aquariums' ?
                            <li>
                                <a>Фасовка</a>
                                <div className="filterItems">
                                    {weightList.map((item, index) => (
                                        <div class="privacyCheck" key={index}>
                                            <input type="checkbox" id={`${item.weight}`} name={`${item.weight}`} />
                                            <label for="agreed">
                                                <span>{item.weight} кг </span><span className="count">{item.count}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </li>
                            : weightList.length > 0 && type === 'aquariums' &&
                            <li>
                                <a>Объём</a>
                                <div className="filterItems">
                                    {weightList.map((item, index) => (
                                        <div class="privacyCheck" key={index}>
                                            <input type="checkbox" id={`${item.volume}`} name={`${item.volume}`} />
                                            <label for="agreed">
                                                <span>{item.volume} кг </span><span className="count">{item.count}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        }
                        {
                            ageList.length > 0 &&
                            <li>
                                <a>Возраст</a>
                                <div className="filterItems">
                                    {ageList.map((item, index) => (
                                        <div class="privacyCheck" key={index}>
                                            <input type="checkbox" id={`${item.petAge}`} name={`${item.petAge}`} />
                                            <label for="agreed">
                                                <span>{item.petAge}</span><span className="count">{item.count}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        }
                        {
                            flavourList.length > 0 &&
                            <li>
                                <a>Вкус</a>
                                <div className="filterItems">
                                    {flavourList.map((item, index) => (
                                        <div class="privacyCheck" key={index}>
                                            <input type="checkbox" id={`${item.flavour}`} name={`${item.flavour}`} />
                                            <label for="agreed">
                                                <span>{item.flavour}</span><span className="count">{item.count}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        }
                        {
                            typeList.length > 0 &&
                            <li>
                                <a>Тип</a>
                                <div className="filterItems">
                                    {typeList.map((item, index) => (
                                        <div class="privacyCheck" key={index}>
                                            <input type="checkbox" id={`${item.type}`} name={`${item.type}`} />
                                            <label for="agreed">
                                                <span>{item.type}</span><span className="count">{item.count}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        }
                    </ul>
                </aside>
                <div className="prodsDiv">
                    <div className="prods">
                        {prodList.length===0 &&
                            <div className="empty">
                                <h2>Товары не найдены</h2>
                            </div>
                        }
                        {type === 'napolniteli' &&
                            prodList.map((prod) => (
                                <ProductCard key={prod.id} id={prod.id} img={require(`../pics/prods/${prod.image}`)} href={`${animal}/${type}`} name={`${prod.brand} ${prod.name}`} packing={prod.Filler.weight} price={prod.price} onSale={false} />
                            ))
                        }
                        {type === 'soderzhanie-i-ukhod' &&
                            prodList.map((prod) => (
                                <ProductCard key={prod.id} id={prod.id} img={require(`../pics/prods/${prod.image}`)} href={`${animal}/${type}`} name={`${prod.brand} ${prod.name}`} measurement={null} price={prod.price} onSale={false} />
                            ))
                        }
                        {(type === 'diet-korm' || type === 'korm') &&
                            prodList.map((prod) => (
                                <ProductCard key={prod.id} id={prod.id} img={require(`../pics/prods/${prod.image}`)} href={`${animal}/${type}`} name={`${prod.brand} ${prod.name}`} packing={prod.Feed.weight} price={prod.price} onSale={false} />
                            ))
                        }
                        {type === 'aquariums' &&
                            prodList.map((prod) => (
                                <ProductCard key={prod.id} id={prod.id} img={require(`../pics/prods/${prod.image}`)} href={`${animal}/${type}`} name={`${prod.brand} ${prod.name}`} packing={prod.Aquarium.volume} measurement={'л'} price={prod.price} onSale={false} />
                            ))
                        }
                        {animal === 'veterinary' &&
                            prodList.map((prod) => (
                                <ProductCard key={prod.id} id={prod.id} img={require(`../pics/prods/${prod.image}`)} href={`${animal}/${type}`} name={`${prod.brand} ${prod.name}`} packing={prod.Veterinary.weight} measurement={' '} price={prod.price} onSale={false} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;