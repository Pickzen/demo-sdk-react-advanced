import React, { useState, createContext, useEffect, useRef } from 'react'
import Utils from '../utils/Utils'
import {cfg} from '../containers/App'

export const SlideContext = createContext(null);

const SlideContextProvider = ({children}) => {
    const EngineRef = useRef(null);
    const [slideModel, setSlideModel] = useState(null);
    const [nav, setNav] = useState({canBack:false, canNext:false});
    const [results, setResults] = useState(null);
    const [progress, setProgress] = useState(0);
    const [selectedFilteringOptionIds, setSelectedFilteringOptionIds] = useState([]);
    const [compareVisible, setCompareVisible] = useState(false);
    const [compareItems, setCompareItems] = useState([]);

    useEffect(() => {
        // Mounted
        Utils.waitForEngine((Engine)=>{
            if (Engine) {
                EngineRef.current = Engine;

                Engine.load(cfg.code, cfg.server, {}, cfg.preview).then(() => {
                    displayCurrentSlide();
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                console.error("Error loading the Pickzen SDK");
            }
        });
    }, []);

    const displayCurrentSlide = () => {
        const Engine = EngineRef.current;

        // Partial results
        const currentSelectedFilteringOptionIds = Engine.getSelectedOptionIds(true);
        if (!Utils.haveSameElements(currentSelectedFilteringOptionIds, selectedFilteringOptionIds)) {
            setSelectedFilteringOptionIds(currentSelectedFilteringOptionIds);
            // Update results
            if (currentSelectedFilteringOptionIds.length>0) {
                Engine.getPartialResults()
                    .then((results) => {
                        setResults(results)
                    })
                    .catch(() => {
                    });
            } else {
                setResults(null)
            }
        }

        const newSlideModel = Engine.getSlide();
        setSlideModel(newSlideModel);

        const canRestart = newSlideModel.getType()==='End';

        setNav( {canBack:newSlideModel.canBack(), canNext:newSlideModel.canNext(), canRestart});

        setProgress(Engine.getProgress(true, false));

        setCompareItems([]);
    };

    const next = () => {
        slideModel.next();
        displayCurrentSlide();
    };

    const back = () => {
        slideModel.back();
        displayCurrentSlide();
    };

    const restart = () => {
        slideModel.restart();
        displayCurrentSlide();
    };

    const showCompare = (visible) => {
        setCompareVisible(visible);
    };

    const addCompareItem = (id) => {
        if (compareItems.indexOf(id)===-1) setCompareItems( [...compareItems,id] );
    };

    const removeCompareItem = (id) => {
        const index = compareItems.indexOf(id);
        if (index>=0) {
            compareItems.splice(index,1);
        }
    };

    const hasCompareItem = (id) => {
        return compareItems.indexOf(id)!==-1;
    };

    return (
        <SlideContext.Provider value={{
            Engine:EngineRef.current,
            slideModel,
            displayCurrentSlide,
            results,
            progress,
            compare:{isVisible:compareVisible, show:showCompare, hasItem:hasCompareItem, addItem:addCompareItem, removeItem:removeCompareItem},
            nav:{canBack:nav.canBack, canNext:nav.canNext, canRestart:nav.canRestart, back, next, restart}
        }}>
            {slideModel?children:null}
        </SlideContext.Provider>
    )
};

export default SlideContextProvider