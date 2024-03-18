import React from "react";
import Collapsible from 'react-collapsible';

export function ProdList({ animal }) {
    switch (animal) {
        case 'dog': {
            return (
                <div className="prodList">
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/dog/diet-korm/">Диетический Корм</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/dog/diet-korm/diet-dry-korm/">Диетический сухой корм</a>
                            <a href="/catalog/dog/diet-korm/konservy-diet/">Консервы диетические</a>
                            <a href="/catalog/dog/diet-korm/preservy-diet/">Пресервы диетические</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/dog/korm/">Корм</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/dog/korm/dry-korm/">Сухой корм</a>
                            <a href="/catalog/dog/korm/konservy/">Консервы</a>
                            <a href="/catalog/dog/korm/preservy/">Пресервы</a>
                            <a href="/catalog/dog/korm/lakomstva/">Лакомства</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/dog/soderzhanie-i-ukhod/">Содержание и уход</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/dog/soderzhanie-i-ukhod/domiki-i-lezhaki/">Домики и лежаки</a>
                            <a href="/catalog/dog/soderzhanie-i-ukhod/igrushki/">Игрушки</a>
                            <a href="/catalog/dog/soderzhanie-i-ukhod/transportirovka-perenoski-budki/">Транспортировка, переноски, будки</a>
                            <a href="/catalog/dog/soderzhanie-i-ukhod/posuda/">Посуда</a>
                        </div>
                    </div>
                </div>
            );
        }
        case 'cat': {
            return (
                <div className="prodList">
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/cat/diet-korm/">Диетический корм</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/cat/diet-korm/diet-korm/">Диетический корм</a>
                            <a href="/catalog/cat/diet-korm/konservy-diet/">Консервы диетические</a>
                            <a href="/catalog/cat/diet-korm/preservy-diet/">Пресервы диетические</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/cat/korm/">Корм</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/cat/korm/dry-korm/">Сухой корм</a>
                            <a href="/catalog/cat/korm/konservy/">Консервы</a>
                            <a href="/catalog/cat/korm/preservy/">Пресервы</a>
                            <a href="/catalog/cat/korm/lakomstva/">Лакомства</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/cat/napolniteli/">Наполнители</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/cat/napolniteli/drevesnyy/">Древесный</a>
                            <a href="/catalog/cat/napolniteli/komkuyushchiysya/">Комкующийся</a>
                            <a href="/catalog/cat/napolniteli/silikagelevyy/">Силикагелевый</a>
                            <a href="/catalog/cat/napolniteli/soevye/">Соевые</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/cat/soderzhanie-i-ukhod/">Содержание и уход</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/cat/soderzhanie-i-ukhod/domiki-i-lezhaki/">Домики и лежаки</a>
                            <a href="/catalog/cat/soderzhanie-i-ukhod/igrushki/">Игрушки</a>
                            <a href="/catalog/cat/soderzhanie-i-ukhod/posuda-i-miski/">Посуда и миски</a>
                            <a href="/catalog/cat/soderzhanie-i-ukhod/transportirovka-perenoski/">Транспортировка, переноски</a>
                        </div>
                    </div>
                </div>
            );
        }
        case 'bird': {
            return (
                <div className="prodList">
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/bird/korm/">Корм</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/bird/korm/dry-korm/">Сухой корм</a>
                            <a href="/catalog/bird/korm/lakomstva-i-vitaminy/">Лакомства и витамины</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/bird/soderzhanie-i-ukhod/">Содержание и уход</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/bird/soderzhanie-i-ukhod/aksessuary/">Аксессуары</a>
                            <a href="/catalog/bird/soderzhanie-i-ukhod/kletki/">Клетки</a>
                            <a href="/catalog/bird/soderzhanie-i-ukhod/napolniteli/">Наполнители</a>
                            <a href="/catalog/bird/soderzhanie-i-ukhod/posuda/">Посуда</a>
                        </div>
                    </div>
                </div>
            );
        }
        case 'rodent': {
            return (
                <div className="prodList">
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/rodent/korm/">Корм</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/rodent/korm/dry-korm/">Сухой корм</a>
                            <a href="/catalog/rodent/korm/lakomstva-i-vitaminy/">Лакомства и витамины</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/rodent/soderzhanie-i-ukhod/">Содержание и уход</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/rodent/soderzhanie-i-ukhod/aksessuary/">Аксессуары</a>
                            <a href="/catalog/rodent/soderzhanie-i-ukhod/kletki/">Клетки</a>
                            <a href="/catalog/rodent/soderzhanie-i-ukhod/napolniteli/">Наполнители и сено</a>
                            <a href="/catalog/rodent/soderzhanie-i-ukhod/posuda/">Посуда</a>
                        </div>
                    </div>
                </div>
            );
        }
        case 'fish': {
            return (
                <div className="prodList">
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/fish/aquariums/">Аквариумы</a>
                        </h5>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/fish/korm/">Корм</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/fish/korm/korm-dlya-ryb/">Корм для рыб</a>
                            <a href="/catalog/fish/korm/korm-dlya-cherepakh/">Корм для черепах</a>
                        </div>
                    </div>
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/fish/soderzhanie-i-ukhod/">Содержание и уход</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/fish/soderzhanie-i-ukhod/dekoratsii/">Декорации</a>
                            <a href="/catalog/fish/soderzhanie-i-ukhod/khimiya-i-lekarstva/">Химия и лекарства</a>
                        </div>
                    </div>
                </div>
            );
        }
        case 'apteka': {
            return (
                <div className="prodList">
                    <div className="prodListItem">
                        <h5>
                            <a href="/catalog/veterinary/">Ветпрепараты</a>
                        </h5>
                        <div className="txts">
                            <a href="/catalog/veterinary/sale/">Акция</a>
                            <a href="/catalog/veterinary/dezinfektanty/">Средства от гельминтов</a>
                            <a href="/catalog/veterinary/dermatologiya/">Защита от блох и клещей</a>
                            <a href="/catalog/veterinary/dlya-glaz/">Для глаз</a>
                            <a href="/catalog/veterinary/dlya-zhkt/">Для ЖКТ</a>
                            <a href="/catalog/veterinary/dlya-immunnoy-sistemy/">Для иммунной системы</a>
                            <a href="/catalog/veterinary/dlya-sustavov/">Для суставов</a>
                            <a href="/catalog/veterinary/dlya-ushey/">Для ушей</a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export function MiniProdList({ animal }) {
    switch (animal) {
        case 'dog': {
            return (
                <div className="miniProdList">
                    <Collapsible trigger="Диетический корм">
                        <a href="/catalog/dog/diet-korm/diet-dry-korm/">Диетический сухой корм</a>
                        <a href="/catalog/dog/diet-korm/konservy-diet/">Консервы диетические</a>
                        <a href="/catalog/dog/diet-korm/preservy-diet/">Пресервы диетические</a>
                    </Collapsible>
                    <Collapsible trigger="Корм">
                        <a href="/catalog/dog/korm/dry-korm/">Сухой корм</a>
                        <a href="/catalog/dog/korm/konservy/">Консервы</a>
                        <a href="/catalog/dog/korm/preservy/">Пресервы</a>
                        <a href="/catalog/dog/korm/lakomstva/">Лакомства</a>
                    </Collapsible>
                    <Collapsible trigger="Содержание и уход">
                        <a href="/catalog/dog/soderzhanie-i-ukhod/domiki-i-lezhaki/">Домики и лежаки</a>
                        <a href="/catalog/dog/soderzhanie-i-ukhod/igrushki/">Игрушки</a>
                        <a href="/catalog/dog/soderzhanie-i-ukhod/transportirovka-perenoski-budki/">Транспортировка, переноски, будки</a>
                        <a href="/catalog/dog/soderzhanie-i-ukhod/posuda/">Посуда</a>
                    </Collapsible>
                </div>
            );
        }
        case 'cat': {
            return (
                <div className="miniProdList">
                    <Collapsible trigger="Диетический корм">
                        <a href="/catalog/cat/diet-korm/diet-korm/">Диетический корм</a>
                        <a href="/catalog/cat/diet-korm/konservy-diet/">Консервы диетические</a>
                        <a href="/catalog/cat/diet-korm/preservy-diet/">Пресервы диетические</a>
                    </Collapsible>
                    <Collapsible trigger="Корм">
                        <a href="/catalog/cat/korm/dry-korm/">Сухой корм</a>
                        <a href="/catalog/cat/korm/konservy/">Консервы</a>
                        <a href="/catalog/cat/korm/preservy/">Пресервы</a>
                        <a href="/catalog/cat/korm/lakomstva/">Лакомства</a>
                    </Collapsible>
                    <Collapsible trigger="Наполнители">
                        \                        <a href="/catalog/cat/napolniteli/drevesnyy/">Древесный</a>
                        <a href="/catalog/cat/napolniteli/komkuyushchiysya/">Комкующийся</a>
                        <a href="/catalog/cat/napolniteli/silikagelevyy/">Силикагелевый</a>
                        <a href="/catalog/cat/napolniteli/soevye/">Соевые</a>
                    </Collapsible>
                    <Collapsible trigger="Содержание и уход">
                        <a href="/catalog/cat/soderzhanie-i-ukhod/domiki-i-lezhaki/">Домики и лежаки</a>
                        <a href="/catalog/cat/soderzhanie-i-ukhod/igrushki/">Игрушки</a>
                        <a href="/catalog/cat/soderzhanie-i-ukhod/posuda-i-miski/">Посуда и миски</a>
                        <a href="/catalog/cat/soderzhanie-i-ukhod/transportirovka-perenoski/">Транспортировка, переноски</a>
                    </Collapsible>
                </div>
            );
        }
        case 'bird': {
            return (
                <div className="miniProdList">
                    <Collapsible trigger="Корм">
                        <a href="/catalog/bird/korm/dry-korm/">Сухой корм</a>
                        <a href="/catalog/bird/korm/lakomstva-i-vitaminy/">Лакомства и витамины</a>
                    </Collapsible>
                    <Collapsible trigger="Содержание и уход">
                        <a href="/catalog/bird/soderzhanie-i-ukhod/aksessuary/">Аксессуары</a>
                        <a href="/catalog/bird/soderzhanie-i-ukhod/kletki/">Клетки</a>
                        <a href="/catalog/bird/soderzhanie-i-ukhod/napolniteli/">Наполнители</a>
                        <a href="/catalog/bird/soderzhanie-i-ukhod/posuda/">Посуда</a>
                    </Collapsible>
                </div>
            );
        }
        case 'rodent': {
            return (
                <div className="miniProdList">
                    <Collapsible trigger="Корм">
                        <a href="/catalog/rodent/korm/lakomstva-i-vitaminy/">Лакомства и витамины</a>
                        <a href="/catalog/rodent/korm/dry-korm/">Сухой корм</a>
                    </Collapsible>
                    <Collapsible trigger="Содержание и уход">
                        <a href="/catalog/rodent/soderzhanie-i-ukhod/aksessuary/">Аксессуары</a>
                        <a href="/catalog/rodent/soderzhanie-i-ukhod/kletki/">Клетки</a>
                        <a href="/catalog/rodent/soderzhanie-i-ukhod/napolniteli/">Наполнители и сено</a>
                        <a href="/catalog/rodent/soderzhanie-i-ukhod/posuda/">Посуда</a>
                    </Collapsible>
                </div>
            );
        }
        case 'fish': {
            return (
                <div className="miniProdList">
                    <Collapsible trigger="Аквариумы">
                    </Collapsible>
                    <Collapsible trigger="Корм">
                        <a href="/catalog/fish/korm/korm-dlya-ryb/">Корм для рыб</a>
                        <a href="/catalog/fish/korm/korm-dlya-cherepakh/">Корм для черепах</a>
                    </Collapsible>
                    <Collapsible trigger="Содержание и уход">
                        <a href="/catalog/fish/soderzhanie-i-ukhod/dekoratsii/">Декорации</a>
                        <a href="/catalog/fish/soderzhanie-i-ukhod/khimiya-i-lekarstva/">Химия и лекарства</a>
                    </Collapsible>
                </div>
            );
        }
        case 'apteka': {
            return (
                <div className="miniProdList">
                    <Collapsible trigger="Ветпрепараты">
                        <a href="/catalog/veterinary/sale/">Акция</a>
                        <a href="/catalog/veterinary/dezinfektanty/">Средства от гельминтов</a>
                        <a href="/catalog/veterinary/dermatologiya/">Защита от блох и клещей</a>
                        <a href="/catalog/veterinary/dlya-glaz/">Для глаз</a>
                        <a href="/catalog/veterinary/dlya-zhkt/">Для ЖКТ</a>
                        <a href="/catalog/veterinary/dlya-immunnoy-sistemy/">Для иммунной системы</a>
                        <a href="/catalog/veterinary/dlya-sustavov/">Для суставов</a>
                        <a href="/catalog/veterinary/dlya-ushey/">Для ушей</a>
                    </Collapsible>
                </div >
            );
        }
        default: {
            return (<></>);
        }
    }
}
