import React, { useState } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function GeneralPageHeader({ name, count, ways }) {
    const [sortDropdownActive, setsortDropdownActive] = useState(false);
    let sortDropdown = sortDropdownActive;
    return (
        <div className="generalPageHeader">
            <a className="back" href="/">
                Назад
            </a>
            <div>
                <div className="hierarchy">
                    <div className="header">
                        <h5>{name}</h5>
                        <span className="salesCount">{count}</span>
                    </div>
                    <div className="breadcrumbs">
                        <Breadcrumb>
                            {ways.map((way, index) => (
                                <Breadcrumb.Item key={index} href={way.href}>
                                    {way.name}
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    </div>
                </div>
                <div className="sort" onClick={() => setsortDropdownActive(!sortDropdown)}>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.90039 11H9.10039" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M2.59961 6H10.3996" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M0 1H13" stroke="#9E9E9E" stroke-width="2"></path>
                    </svg>
                    <p>По популярности</p>
                    {sortDropdownActive ?
                        <div className="sortDropdown">
                            <ul>
                                <li>По убыванию Я-а</li>
                                <li>По возрастанию А-я</li>
                                <li>По цене ↑</li>
                                <li>По цене ↓</li>
                            </ul>
                        </div> : ''}
                </div>
            </div>
        </div>
    );
}

export default GeneralPageHeader;