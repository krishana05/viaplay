import React from 'react';
import './Modal.css';

function Modal(props, ref) {
  return (
    <div ref={ref} className='modal'>
      <div className='modal-content'>
        <span
          tabIndex='0'
          onKeyDown={(e) => props.closeModal(e)}
          className='close'
        >
          &times;
        </span>
        <h2 className='title'>{props.selectedShow?.series?.title}</h2>
        <p>
          <b>Description:</b> {props.selectedShow?.series?.synopsis}
        </p>
        <p>
          <b>Season:</b> {props.selectedShow?.series?.seasons}
        </p>
        <p>
          <b>Year: </b> {props.selectedShow?.production?.year}
        </p>
        <p>
          <b>IMDB Rating: </b>
          {props.selectedShow.imdb ? (
            <a
              target='_blank'
              rel='noreferrer'
              href={props.selectedShow?.imdb?.url}
            >
              {props.selectedShow?.imdb?.rating}
            </a>
          ) : (
            'Not Available'
          )}
        </p>
      </div>
    </div>
  );
}

export default React.forwardRef(Modal);
