import {createContext, useContext, useState} from "react";

const FilterContext = createContext()

const FilterProvider = ({children}) => {
    const [filter, setFilter] = useState(null)

    return (
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>)
}

export default FilterProvider

export const useFilter = () => {
    return useContext(FilterContext)
}