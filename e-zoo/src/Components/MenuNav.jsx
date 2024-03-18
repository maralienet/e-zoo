import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Animals from "../Components/Animals";

import sales from "../pics/header/sales.svg";
import aptekaHead from "../pics/header/apteka.svg";


function MenuNav() {
    const dispatch = useDispatch();
    const active = useSelector(state => state.activeSearch);

    const showSearch = () => {
        dispatch({ type: 'SHOW_HIDE_SEARCH', activeSearch: !active });
        if (!active)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset';
    }
    return (
        <div className="menuNav">
            <div className="menuCont">
                <Animals />
                <div className="links">
                    <div className="linkItem">
                        <img src={sales} />
                        <a href="/sales">Акции</a>
                    </div>
                    <div className="linkItem">
                        <img src={aptekaHead} />
                        <a href="/catalog/veterinary">Ветаптека</a>
                    </div>
                    <div class="linkItemSearch" onClick={showSearch}>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle r="7" transform="matrix(-1 0 0 1 8 8.64941)" stroke="#3E3E3E" stroke-width="2"></circle>
                            <path d="M12 14.6494L15 18.6494" stroke="#3E3E3E" stroke-width="2"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuNav;