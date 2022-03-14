import { useEffect, useState } from "react";

// fetch saved data from local storage
const getValueFromLocalStorage = (defaultValues) => {
    const searchQueries = localStorage.getItem('searchData');
    return searchQueries ? JSON.parse(searchQueries) : defaultValues
}

// save and update search queiries 
const saveValuesToLocalStorage = (value) => {
    if (typeof (value) !== 'string')
        return
    let values = getValueFromLocalStorage();
    if ((!values || !values.queries) && value) {
        values = {
            queries: [value]
        }
    }
    if (values && value && values.queries.indexOf(value) < 0) {
        values.queries.push(value);
    }
    localStorage.setItem('searchData', JSON.stringify(values));
}

const useLocalStorage = (defaultValues) => {
    const [value, setValue] = useState();
    useEffect(() => {
        // save value when it changes
        saveValuesToLocalStorage(value)
    }, [value])
    return [getValueFromLocalStorage(defaultValues), setValue];
}
export default useLocalStorage;