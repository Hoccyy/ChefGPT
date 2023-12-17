import React from 'react';
import inputStyles from './TopBar.module.css'

type Props = {
    userName?: string
};

const TopBar = ({
    userName = ''
}:Props) => {
    return (
        <div className={inputStyles.topBarPrimary}>
            <h1>Input what you have for a quick recipe! 🥘</h1>
        </div>
    );
};

TopBar.defaultProps = {
    userName : '',
};

export default TopBar;