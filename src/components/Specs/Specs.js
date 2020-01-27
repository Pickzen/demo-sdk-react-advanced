import React from 'react';
import Utils from "../../utils/Utils"
import './Specs.scss'

const Specs = ({data}) => {

    //console.log("DATA", data)

    let genericValues = [...data.features.generic.values];

    data.customFeatures.forEach(f => {
        genericValues.push({text:true, title:`${f.name}: ${f.value} ${f.unit}`});
    });

    data.smartTexts.forEach(st => {
        genericValues.push({text:true, title:st.title});
    });

    const groups = [...data.features.groups, {title:data.features.generic.title, values:genericValues}];

    let specs;

    if (!Utils.isEmpty(groups)) {

        specs = groups.map( (group,index) => {

            const features = group.values.map( (feature,index) =>{
                let iconClass;

                if (feature.text) {
                    iconClass = 'dot';
                } else {
                    iconClass = 'check ' + (feature.active?'active':'');
                }

                return (
                    <li key={index}>
                        <i className={'icon ' + iconClass}></i>
                        <span className="group-title">{feature.title}</span>
                    </li>
                );
            });

            return (
                <div key={index} className="spec-group">
                    <p className="spec-group-title">{group.title}</p>
                    <ul>
                        {features}
                    </ul>
                </div>
            )

        });
    }

    return (
        <div className="specs">
            {specs}
        </div>
    )
};

export default Specs;