import React, { useState } from "react";

const SearchBox = ({ onSearch, tags }) => {
    const [value, setValue] = useState();
    // handle input value and call on Search
    const onChange = (e) => {
        onSearch(e);
        setValue(e.target.value)
    }
    // handle tag click and call onSearch
    const onTagClick = (e) => {
        setValue(e.target.innerText)
        e.target.value = e.target.innerText;
        onSearch(e);
    }
    const onClearSearch = () => {
        localStorage.setItem("searchData", "{}");
        onSearch({ target: { value: null } })
        setValue('');
    }
    return <div className="search-container flex-container flex-col">
        <div className="search-input">
            <label>Search</label>
            <input onChange={onChange} value={value} />
            <button className="tag" onClick={onClearSearch}>Clear Search </button>
        </div>
        <div className="tags-container flex-container flex-row">
            {tags && tags.map(item => {
                return <div className="tag" onClick={onTagClick}>{item} </div>
            })}
        </div>
    </div>
}
export default SearchBox;