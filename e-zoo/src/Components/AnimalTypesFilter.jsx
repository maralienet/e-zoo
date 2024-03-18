import React from "react";

function AnimalTypesFilter(){
return(
    <ul className="asideFilter">
        <li><a href="/sales/dogs">Собаки</a></li>
        <li><a href="/sales/cats">Коты</a></li>
        <li><a href="/sales/birds">Птицы</a></li>
        <li><a href="/sales/rodents">Грызуны</a></li>
        <li><a href="/sales/fish">Рыбы</a></li>
        <li><a href="/sales/apteka">Ветаптека</a></li>
    </ul>
);
}

export default AnimalTypesFilter;