import React, { FunctionComponent } from 'react';
import { ReactComponent as Kontoikon } from './kontoikon.svg';
import './Brødsmulesti.less';
import Lenke from 'nav-frontend-lenker';
import lenker from '../lenker';

const Skilletegn = () => <span className="brødsmulesti__skilletegn">/</span>;

const Brødsmulesti: FunctionComponent = () => {
    return (
        <nav className="brødsmulesti">
            <Kontoikon />
            <Lenke className="brødsmulesti__steg" href={lenker.dittNav}>
                Ditt NAV
            </Lenke>
            <Skilletegn />
            <Lenke className="brødsmulesti__steg" href={lenker.personopplysninger}>
                Personopplysninger
            </Lenke>
            <Skilletegn />
            <span className="brødsmulesti__steg">Behov for tilrettelegging</span>
        </nav>
    );
};

export default Brødsmulesti;
