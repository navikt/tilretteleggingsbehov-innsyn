import React, { FunctionComponent } from 'react';
import { ReactComponent as Kontoikon } from './kontoikon.svg';
import { Link } from '@navikt/ds-react';
import lenker from '../lenker';
import css from './Brødsmulesti.module.css';

const Brødsmulesti: FunctionComponent = () => {
    return (
        <nav className={css.brødsmulesti}>
            <Kontoikon />
            <Link className={css.steg} href={lenker.dittNav}>
                Ditt NAV
            </Link>
            <Skilletegn />
            <Link className={css.steg} href={lenker.personopplysninger}>
                Personopplysninger
            </Link>
            <Skilletegn />
            <span className={css.steg}>Behov for tilrettelegging</span>
        </nav>
    );
};

const Skilletegn = () => <span>/</span>;

export default Brødsmulesti;
