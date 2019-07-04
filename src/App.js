import React from 'react';
import DropdownMenu from './containers/DropdownMenu/DropdownMenu';
import styles from './App.module.css'

function App() {

  return (
    <div className={styles.app} aria-label="root">
      <div className={styles.header}>
        <p style={{margin: "0"}}>Custom dropdown menu example</p>
        <p style={{margin: "0"}}>Powered by React Hooks & CSS Modules</p>
      </div>

      <div className={styles.wrapper} aria-label="root-wrapper">    
          {/* How to use: pass an array of strings to the list property to change the elements of the dropdown menu */}
          <DropdownMenu 
              list={["option", "option", "option", "option"]}
          />
      </div>
    </div>
  );
}

export default App;
