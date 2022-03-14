import React, { Fragment, useEffect, useReducer } from 'react';
import { Header, SearchBox, Image } from './components';
import useLocalStorage from './hooks/useLocalStorage';
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from 'react-modal';
import { generateUrl } from './util';

import fetchData from './axios';

const modalStyle = {
    width: '70%',
}
let timeOut = null;

const SearchPage = () => {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { data: null, records: [], currentPage: 1, searchText: '', isModalOpen: false, activeImageSrc: '' }
    )
    const [searchData, setSearchData] = useLocalStorage();;
    const { data, records, currentPage, searchText, isModalOpen, activeImageSrc } = state;
    // fetch data initially
    useEffect(() => {
        fetchData(searchText, currentPage).then(newData => {
            let tempRecords = []
            if (currentPage > 1) {
                tempRecords = newData ? [...records, ...newData.photo] : [];
            } else {
                tempRecords = newData ? newData.photo : [];
            }
            setState({ data: newData, records: tempRecords })
        });
    }, [currentPage, searchText])

    // load data on search
    const onSearch = (e) => {
        const searchValue = e.target.value;
        if (timeOut) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(() => {
            setState({ currentPage: 1, searchText: searchValue })
            setSearchData(searchValue);
        }, 2000);
    }
    // load more data on scroll
    const fetchMoreData = () => {
        setState({ currentPage: currentPage + 1 })
    }
    const onImageClick = (src) => {
        setState({ activeImageSrc: src, isModalOpen: true })
    }
    const closeModal = () => setState({ isModalOpen: false });

    const tags = (searchData && searchData.queries) || [];
    return <Fragment>
        <div className='flex-container flex-col width-70'>
            <div className='header-container'>
                <Header />
                <SearchBox onSearch={onSearch} tags={tags} />
            </div>
            <div className='list-container'>
                <InfiniteScroll
                    dataLength={(data && data.total) || 0}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {records && records.map((record) => <Image alt={record.title || ''} onImageClick={onImageClick} src={generateUrl(record)} />)}
                </InfiniteScroll>
            </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Image Preview"
            style={modalStyle}
        >
            <div className='flex-container flex-col'>
                <button className='closeModal' onClick={closeModal}>X</button>
                <Image alt={"Image"} src={activeImageSrc} />
            </div>
        </Modal>
    </Fragment>
}
export default SearchPage;
