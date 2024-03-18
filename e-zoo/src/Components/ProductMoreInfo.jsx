import React from "react";
import Collapsible from 'react-collapsible';

function ProductMoreInfo({ prod, type }) {
    switch (type) {
        case 'diet-korm': {
            return (
                <div className="moreInfo">
                    <Collapsible trigger="Бренд">
                        {`${prod.brand}`}
                    </Collapsible>
                    <Collapsible trigger="Страна">
                        {`${prod.country}`}
                    </Collapsible>
                    <Collapsible trigger="Описание">
                        {`${prod.Feed.description}`}
                    </Collapsible>
                    <Collapsible trigger="Фасовка">
                        {`${prod.Feed.weight} кг`}
                    </Collapsible>
                    <Collapsible trigger="Возраст питомца">
                        {`${prod.Feed.petAge}`}
                    </Collapsible>
                    <Collapsible trigger="Вкус">
                        {`${prod.Feed.flavour}`}
                    </Collapsible>
                    <Collapsible trigger="Класс корма">
                        {`${prod.Feed.classification}`}
                    </Collapsible>
                    <Collapsible trigger="Состав">
                        {`Состав: ${prod.Feed.composition}`}
                    </Collapsible>
                </div>
            );
        }
        case 'korm': {
            return (
                <div className="moreInfo">
                    <Collapsible trigger="Бренд">
                        {`${prod.brand}`}
                    </Collapsible>
                    <Collapsible trigger="Страна">
                        {`${prod.country}`}
                    </Collapsible>
                    <Collapsible trigger="Описание">
                        {`${prod.Feed.description}`}
                    </Collapsible>
                    <Collapsible trigger="Фасовка">
                        {`${prod.Feed.weight} кг`}
                    </Collapsible>
                    <Collapsible trigger="Возраст питомца">
                        {`${prod.Feed.petAge}`}
                    </Collapsible>
                    <Collapsible trigger="Вкус">
                        {`${prod.Feed.flavour}`}
                    </Collapsible>
                    <Collapsible trigger="Класс корма">
                        {`${prod.Feed.classification}`}
                    </Collapsible>
                    <Collapsible trigger="Состав">
                        {`Состав: ${prod.Feed.composition}`}
                    </Collapsible>
                </div>
            );
        }
        case 'soderzhanie-i-ukhod': {
            if (prod.Bowl) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Bowl.description}`}
                        </Collapsible>
                        <Collapsible trigger="Возраст питомца">
                            {`${prod.Bowl.petAge}`}
                        </Collapsible>
                        <Collapsible trigger="Материал">
                            {`${prod.Bowl.material}`}
                        </Collapsible>
                    </div>
                )
            }
            else if (prod.Bed) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Bed.description}`}
                        </Collapsible>
                        <Collapsible trigger="Состав">
                            {`Состав: ${prod.Bed.composition}`}
                        </Collapsible>
                    </div>
                )
            }
            else if (prod.Toy) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Toy.description}`}
                        </Collapsible>
                    </div>
                )
            }
            else if (prod.Accessory) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Accessory.description}`}
                        </Collapsible>
                        <Collapsible trigger="Тип">
                            {`${prod.Accessory.type}`}
                        </Collapsible>
                        <Collapsible trigger="Материал">
                            {`${prod.Accessory.material}`}
                        </Collapsible>
                    </div>
                )
            }
            else if (prod.Cage) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Cage.description}`}
                        </Collapsible>
                        <Collapsible trigger="Цвет">
                            {`${prod.Cage.colour}`}
                        </Collapsible>
                        <Collapsible trigger="Материал">
                            {`${prod.Cage.material}`}
                        </Collapsible>
                    </div>
                )
            }
            else if (prod.Filler) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Filler.description}`}
                        </Collapsible>
                        <Collapsible trigger="Тип">
                            {`${prod.Filler.type}`}
                        </Collapsible>
                        <Collapsible trigger="Фасовка">
                            {`${prod.Filler.weight} кг`}
                        </Collapsible>
                        <Collapsible trigger="Состав">
                            {`Состав: ${prod.Filler.composition}`}
                        </Collapsible>
                    </div>
                )
            }
            else if (prod.Drug) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Drug.description}`}
                        </Collapsible>
                    </div>
                )
            }
        }
        case 'fillers': {
            if (prod.Filler) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Filler.description}`}
                        </Collapsible>
                        <Collapsible trigger="Тип">
                            {`${prod.Filler.type}`}
                        </Collapsible>
                        <Collapsible trigger="Фасовка">
                            {`${prod.Filler.weight} кг`}
                        </Collapsible>
                        <Collapsible trigger="Состав">
                            {`Состав: ${prod.Filler.composition}`}
                        </Collapsible>
                    </div>
                )
            }
        }
        case 'aquariums': {
            if (prod.Aquarium) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Aquarium.description}`}
                        </Collapsible>
                        <Collapsible trigger="Объём">
                            {`${prod.Aquarium.volume} л`}
                        </Collapsible>
                        <Collapsible trigger="Фома">
                            {`${prod.Aquarium.form}`}
                        </Collapsible>
                    </div>
                )
            }
        }
        case 'veterinary': {
            if (prod.Veterinary) {
                return (
                    <div className="moreInfo">
                        <Collapsible trigger="Бренд">
                            {`${prod.brand}`}
                        </Collapsible>
                        <Collapsible trigger="Страна">
                            {`${prod.country}`}
                        </Collapsible>
                        <Collapsible trigger="Описание">
                            {`${prod.Veterinary.description}`}
                        </Collapsible>
                        <Collapsible trigger="Тип">
                            {`${prod.Veterinary.type}`}
                        </Collapsible>
                        <Collapsible trigger="Фасовка">
                            {`${prod.Veterinary.weight}`}
                        </Collapsible>
                        <Collapsible trigger="Состав">
                            {`Состав: ${prod.Veterinary.testimony}`}
                        </Collapsible>
                    </div>
                )
            }
        }
    }
}

export default ProductMoreInfo;