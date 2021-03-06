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

                Engine.load(cfg.code, cfg.server, {}, cfg.preview).then( ({css, jsLibs}) => {
                    displayCurrentSlide();

                    Utils.embedCSS(css);
                    Utils.embedJSLibs(jsLibs);
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

        const slideModel = Engine.getSlide();
        setSlideModel(slideModel);

        let isEndSlide = slideModel.isType('End');

        // Partial results
        if (isEndSlide) {
            // If it is the end slide, try to use the existing results instead of fetching again
            slideModel.getResults().then( (results) => {
                setResults(results);
            }).catch( (reason) => {
                console.error(reason);
            })
        } else {
            const currentSelectedFilteringOptionIds = Engine.getSelectedOptionIds(true);
            if (!Utils.haveSameElements(currentSelectedFilteringOptionIds, selectedFilteringOptionIds)) {
                setSelectedFilteringOptionIds(currentSelectedFilteringOptionIds);
                // Update results
                if (currentSelectedFilteringOptionIds.length > 0) {
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
        }

        const canRestart = isEndSlide;
        const canBack = slideModel.canBack();
        const canNext = slideModel.canNext();
        const backLabel = slideModel.getBackLabel() || 'Back';
        const nextLabel = slideModel.getNextLabel() || 'Next';

        setNav( {canBack, canNext, backLabel, nextLabel, canRestart});

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
            nav:{canBack:nav.canBack, canNext:nav.canNext, canRestart:nav.canRestart, backLabel:nav.backLabel, nextLabel:nav.nextLabel, back, next, restart}
        }}>
            {slideModel?children:null}
        </SlideContext.Provider>
    )
};

export default SlideContextProvider