import React, { FunctionComponent } from 'react';
import { ReactComponent as Kontoikon } from './kontoikon.svg';
import './Brødsmulesti.less';
import Lenke from 'nav-frontend-lenker';

const Skilletegn = () => <span className="brødsmulesti__skilletegn">/</span>;

const Brødsmulesti: FunctionComponent = () => {
    return (
        <nav className="brødsmulesti">
            <Kontoikon />
            <Lenke href="https://www.nav.no/no/ditt-nav">Ditt NAV</Lenke>
            <Skilletegn />
            <Lenke href="https://www.nav.no/person/personopplysninger">Personopplysninger</Lenke>
            <Skilletegn />
            <span>Behov for tilrettelegging</span>
        </nav>
    );
};

export default Brødsmulesti;
