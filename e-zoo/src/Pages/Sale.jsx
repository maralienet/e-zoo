import React from "react";
import MenuNav from "../Components/MenuNav";
import GeneralPageHeader from "../Components/GeneralPageHeader";
import AnimalTypesFilter from "../Components/AnimalTypesFilter";
import ProductCard from "../Components/ProductCard";

import prod1 from '../pics/prods/1.jpg';
import prod2 from '../pics/prods/2.jpg';
import prod3 from '../pics/prods/3.jpg';

function Sale() {
    return (
        <div className="sale">
            <MenuNav />
            <GeneralPageHeader name='Акции' count='625' ways={[{ name: 'Главная', href: '/' }, { name: 'Акции', href: '/sales' }]} />
            <div className="general">
                <aside>
                    <AnimalTypesFilter />
                </aside>
                <div className="prods">
                    <ProductCard img={prod1} href="/product" name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod2} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod3} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod1} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod2} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod3} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod1} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod2} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod3} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod1} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod2} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod3} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                </div>
            </div>
        </div>
    );
}

export default Sale;