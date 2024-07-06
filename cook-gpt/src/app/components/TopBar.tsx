import React from 'react';
import inputStyles from './TopBar.module.css';

const TopBar = ({
}) => {
    return (
        <div className={inputStyles.topBarPrimary}>
            <h1>Make something special! 🥘</h1>
            <h1 id='processingMessage'>. . .</h1>
        </div>
    );
};

export default TopBar;