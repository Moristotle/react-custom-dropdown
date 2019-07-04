import React from 'react';
import styles from './Dropdown.module.css';
import PropTypes from 'prop-types';

const CircleSvg = ({ classes, color }) => (
    <svg className={classes} viewBox="0 0 640 400">
        <circle cx="150" cy="200" r="100" stroke={color} strokeWidth="2" fill={color} />
    </svg>
)

function Dropdown(props) {    
    return (

        <div className={styles.dropdown} aria-label="dropdown">
            
            <CircleSvg classes={styles.dropdownIcon} color={props.color} aria-label="circle-svg"/> 
            <div className={styles.dropdownText} aria-labelledby="dropdownText">
                {props.content}
            </div>
        </div>
    
    );
};

export default Dropdown;

Dropdown.propTypes = {
    color: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}