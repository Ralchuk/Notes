import { createContext, useContext, type ReactNode } from "react";
import { useState } from "react";

interface AccordionContextType {
    isOpen: string;
    setIsOpen: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordionContext = () => {
    const context = useContext(AccordionContext);
    if (context === null) 
        throw new Error('useAccordionContext must be inside Accorion');
    return context;
        
}

const AccordionComponent = ({children}: {children: React.ReactNode}) => {
    const[isOpen, setIsOpen] = useState('');
    return (
        <AccordionContext.Provider value={{isOpen, setIsOpen}}>
               {children}
        </AccordionContext.Provider>
    )
}

interface AccordionItemProp {
    value: string,
    children: ReactNode,
};

const AccordionItem = ({value, children}: AccordionItemProp) => {
    return (
        <div>
        {children}
        </div>
    )
}

const AccordionHeader = ({value}: {value: string}) => {
    const AccordionHeaderContext = useAccordionContext();
    if (AccordionHeaderContext === null) return;
    const { isOpen, setIsOpen } = AccordionHeaderContext;
    return (
        <div onClick={() => (
            setIsOpen(isOpen === value ? '' : value))}>
        </div>
    );
};

const AccordionContent = ({value, children}: {value: string, children: ReactNode}) => {
    const AccordionContentContext = useAccordionContext();
    return (AccordionContentContext !== null && value === AccordionContentContext.isOpen) ? children : null;
}

const Accordion = Object.assign(AccordionComponent,{
    Item: AccordionItem,
    Header: AccordionHeader,
    Content: AccordionContent,
});

export default Accordion;