import React, {useContext} from 'react';
import Modal from '../Modal/Modal'
import './Compare.scss'
import {SlideContext} from "../../context/SlideContext";

const Compare = ({results}) => {
    const {compare} = useContext(SlideContext);

    const closeHandler = () => {
        compare.show(false);
    };

    const generateTable = () => {
        const items = results.filter( (result) => { return compare.hasItem(result.getId()) });
        console.log("Items", items)

        const header = [null];

        // SPECS
        const tableGroups = [];

        items.forEach(item => {
            header.push({title:item.getTitle(), image:item.getImage()});

            const itemSpecs = item.getSpecs();

            let genericValues = [...itemSpecs.features.generic.values];

            itemSpecs.customFeatures.forEach(f => {
                genericValues.push({text:true, value:`${f.value} ${f.unit}`, title:f.name});
            });

            itemSpecs.smartTexts.forEach(st => {
                genericValues.push({text:true, value:st.title});
            });

            const groups = [...itemSpecs.features.groups, {title:itemSpecs.features.generic.title, values:genericValues}];

            groups.forEach(group => {
                const groupTitle = group.title;

                let tableGroup = tableGroups.find( it => it.title===groupTitle);
                if (tableGroup==null) {
                    tableGroup={
                        title:groupTitle,
                        rows:[]
                    };
                    tableGroups.push(tableGroup);
                }

                group.values.forEach(val => {
                    let row = tableGroup.rows.find( it => it.title===val.title);
                    if (row==null) {
                        row = {title:val.title, cells:[]};
                        tableGroup.rows.push(row);
                    }

                    row.cells.push(val);
                });
            });
        });

        return (
            <table className="comparison-table">
                <thead>
                    <tr>
                        <th />

                        {header.map( (cell, i) => {
                            if (cell==null) return null;

                            return (
                                <th key={i}>
                                    <div className="image">
                                        <img src={cell.image} alt={cell.title}/>
                                    </div>
                                    <div className="title">{cell.title}</div>
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Price</td>
                        {items.map( (item,i) => {
                            return (
                                <td key={i}>${item.getPrice()}</td>
                            )
                        })}
                    </tr>
                </tbody>

                {tableGroups.map( (tableGroup,i) => {
                    if (tableGroup.rows.length===0) return null;

                    return (
                        <tbody key={i}>
                            <tr>
                                <td className="header" colSpan={header.length}>{tableGroup.title}</td>
                            </tr>

                            {tableGroup.rows.map( (row, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{row.title}</td>

                                        {row.cells.map( (value,i) => {
                                            let cellValue;

                                            if (value.text) {
                                                cellValue = <span>{value.value}</span>
                                            } else {
                                                cellValue = <span className={'check ' + (value.active?'checked':'')}></span>
                                            }

                                            return (
                                                <td key={i}>{cellValue}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    )

                })}
            </table>
        );
    };

    return (
        <Modal close={closeHandler} title="Product comparison">
            {generateTable()}
        </Modal>
    )
};

export default Compare;