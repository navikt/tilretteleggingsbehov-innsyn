import React, { FunctionComponent } from 'react';
import { ReactComponent as Kontoikon } from './kontoikon.svg';
import { Link } from '@navikt/ds-react';
import lenker from '../lenker';
import './Brødsmulesti.less';

const Skilletegn = () => <span className="brødsmulesti__skilletegn">/</span>;

const Brødsmulesti: FunctionComponent = () => {
    return (
        <nav className="brødsmulesti">
            <Kontoikon />
            <Link className="brødsmulesti__steg" href={lenker.dittNav}>
                Ditt NAV
            </Link>
            <Skilletegn />
            <Link className="brødsmulesti__steg" href={lenker.personopplysninger}>
                Personopplysninger
            </Link>
            <Skilletegn />
            <span className="brødsmulesti__steg">Behov for tilrettelegging</span>
        </nav>
    );
};

export default Brødsmulesti;
