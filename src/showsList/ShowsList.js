import React, { useEffect, useRef, useState } from 'react';
import Modal from '../modal/Modal';
import './ShowsList.css';

function ShowList() {
  let [showList, setShowList] = useState([]);
  let [filteredShowList, setfilteredShowList] = useState([]);
  let [searchValue, setSearchValue] = useState('');
  let [selectedShow, setSselectedShow] = useState({});
  let [showLoader, setShowLoader] = useState(true);
  const modalEle = useRef(null);
  const searchInputEle = useRef(null);
  function configureModal() {
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function () {
      modalEle.current.style.display = 'none';
    };
    window.onclick = function (event) {
      if (event.target === modalEle.current) {
        modalEle.current.style.display = 'none';
      }
    };
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modalEle.current.style.display = 'none';
        searchInputEle.current.focus();
      }
    });
  }
  function searchShow(event) {
    // console.log(event.target.value);
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    if (value === '') {
      setfilteredShowList(showList);
      return;
    }
    const filterList = showList.filter((list) => {
      return list.content.series.title?.toLowerCase().includes(value);
    });
    setfilteredShowList(filterList);
  }
  function openModal(event, showDetails) {
    // console.log(modalEle);
    // console.log(event);
    if (event.type === 'click' || event.key === 'Enter') {
      const span = document.getElementsByClassName('close')[0];
      modalEle.current.style.display = 'block';
      //   console.log(showDetails);
      span.focus();
      setSselectedShow(showDetails);
    }
  }
  function focusNextElement() {
    searchInputEle.current.focus();
    const imageList = document.getElementsByClassName('imageBox');
    for (var i = 0; i < imageList.length; i++)
      imageList[i].addEventListener(
        'keyup',
        function (e) {
          if (e.keyCode === 37) {
            // left-arrow
            this.previousElementSibling?.focus();
          } else if (e.keyCode === 39) {
            // right-arrow
            this.nextElementSibling?.focus();
          }
        },
        false
      );
  }
  function closeModal(event) {
    if (event.key === 'Enter') {
      modalEle.current.style.display = 'none';
      searchInputEle.current.focus();
    }
  }
  useEffect(() => {
    //http://localhost:8000/shows
    fetch('https://myjson.dit.upm.es/api/bins/aq19')
      .then((res) => res.json())
      .then((data) => {
        setShowLoader(false);
        // console.log(data);
        const list =
          data._embedded['viaplay:blocks'][0]._embedded['viaplay:products'];
        // console.log(list);
        setShowList(list);
        setfilteredShowList(list);
        focusNextElement();
        configureModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // should be called once on page load
  return (
    <div className='body'>
      <div className='searchBox'>
        <label htmlFor='search'>Search the shows here: </label>
        <input
          type='text'
          tabIndex='0'
          id='search'
          placeholder='Type anything to search...'
          value={searchValue}
          ref={searchInputEle}
          onChange={($event) => searchShow($event)}
        />
      </div>
      {showLoader ? (
        <p className='no-result'>Loading...</p>
      ) : filteredShowList.length > 0 ? (
        filteredShowList.map((show, index) => {
          return (
            <div
              className='imageBox'
              key={index + show.publicPath}
              tabIndex='0'
              onKeyDown={(e) => openModal(e, show.content)}
              onClick={(e) => openModal(e, show.content)}
            >
              <img
                src={show.content.images.landscape.url}
                alt={show.content.originalTitle}
              />
            </div>
          );
        })
      ) : (
        <p className='no-result'>No Result Found !!</p>
      )}
      <Modal
        selectedShow={selectedShow}
        closeModal={closeModal}
        ref={modalEle}
      />
    </div>
  );
}

export default ShowList;
