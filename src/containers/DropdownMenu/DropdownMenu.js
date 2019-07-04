import React, {useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './DropdownMenu.module.css'
import Dropdown from '../../components/Dropdown/Dropdown';
import PropTypes from 'prop-types';

function DropdownMenu(props) {
  
  const [title, setTitle] = useState(''); //for setting title
  const [position, setPosition] = useState(0); //for handling selection and updating of elements
  const [showList, setList] = useState(false); //for toggling list
  const focusedElement = useRef(null); //for handling keyboard navigation

  useEffect(() => {
      const handleDropdownClosing = () => {
        setList(false);
      }

      setTimeout(() => {
        if(showList) {
          //allows you to close the dropdown when clicking anywhere on window
          window.addEventListener('click', handleDropdownClosing);
        } else {
          window.removeEventListener('click', handleDropdownClosing);
        }
      }, 0)
      return () => {
        window.removeEventListener('click', handleDropdownClosing);

      }
    },[showList]
  );

  const handleSelectedItem = (title, index) => {
    const handleChangedRef = () => {
      focusedElement.current.focus();
    }
    setTitle(title);
    setPosition(index);
    setList(false);
    handleChangedRef();
    
  } 

  //safety measure for being able to update title, focusedElement & position synchronously with the DOM.
  //[optional]
  useLayoutEffect(() => {
    const handleSelectedItem = (title, index) => {
      const handleChangedRef = () => {
        focusedElement.current.focus();
      }
      setTitle(title);
      setPosition(index);
      setList(false);
      handleChangedRef();
      
    } 
  },[position, focusedElement])

  const handleKeyboardNavigation = (event) => { 
    if (event.key === 'ArrowUp') {
      if (position === props.list.length - 1) {
        setPosition(position - position);
      } else {
         setPosition(position + 1);

      }
    }

    if (event.key === 'ArrowDown') {
      if (position === 0) {
        setPosition(props.list.length - 1);
      } else {
        setPosition(position - 1);
      }
    }
  }

  const handleDropdownToggling = () => {
    setList(!showList);
  }

  //assuming that we won't have more than four options. --> However, if option > 4: svg {style={color: darkgray}}
  const handleColorRoulette = (index) => {
    switch(index) {
      case 0: 
        return '#90EE90'; //lightgreen
      case 1: 
        return '#4169E1'; //royalblue
      case 2: 
        return '#FFA500'; //orange
      case 3: 
        return '#FF6347'; //tomato
      default: 
        return '#A9A9A9'; //darkgray
    }
  }

  const {
    list,  
  } = props; //passed to App.js where it is populated with an array of strings.

  
  return (
    <div className={styles.dropdownWrapper} aria-label="dropdown-menu" >
        <div className={styles.dropdownHeader} aria-label="dropdown-header" tabIndex="0" ref={focusedElement} 
          onClick={handleDropdownToggling}  
          onKeyDown={(e) => handleKeyboardNavigation(e)}
        >

          <div className={styles.dropdownHeaderTitle} aria-labelledby="dropdownHeaderTitle">
            <Dropdown color={handleColorRoulette(position)} content={list[position] + " " + (position + 1)} />
          </div>
          
          <svg className={styles.arrowSvg} aria-label="dropdown-cursor" onClick={handleDropdownToggling} 
            fill="currentColor" preserveAspectRatio="xMidYMid meet" height="30px" width="30px" viewBox="0 0 40 40" 
            style={showList ? { transform: "rotateZ(0deg)" } : { transform: "rotateZ(180deg)" }}
            >
            <g>
                <path d="m31 26.4q0 0.3-0.2 0.5l-1.1 1.2q-0.3 0.2-0.6 0.2t-0.5-0.2l-8.7-8.8-8.8 8.8q-0.2 0.2-0.5 0.2t-0.5-0.2l-1.2-1.2q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.6-0.2t0.5 0.2l10.4 10.4q0.2 0.2 0.2 0.5z"></path>
            </g>
          </svg>

        </div>

      {showList && <div className={styles.dropdownList} >
        {list.map((item, index) => ( 
          <div 
          className={styles.dropdownListItem} 
          aria-label="dropdown-list"
          key={index} 
          onClick={() => handleSelectedItem(list[index], index)}
          >

            <div className={styles.dropdownElement} aria-labelledby="dropdownElement">
              <Dropdown color={handleColorRoulette(index)} content={list[index] + " " + (index + 1)} />
            </div>
          
          </div>
        ))}
      </div>}
    </div>
  );
}

export default DropdownMenu;

DropdownMenu.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
}