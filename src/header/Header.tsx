import React, { FunctionComponent } from 'react';

const Header: FunctionComponent = () => {
    return (
        <>
            <svg style={{ display: 'block' }} height="4rem" width="4rem">
                <circle cx="2rem" cy="2rem" r="2rem" fill="#99c2e8" />
            </svg>
            <h1>Behov for tilrettelegging</h1>
        </>
    );
};

export default Header;
