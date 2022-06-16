import React, { FunctionComponent } from 'react';
import lenker from '../lenker';
import { Back } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import css from './Tilbake.module.css';

const Tilbake: FunctionComponent = () => {
    return (
        <div className={css.tilbake}>
            <Link className={css.lenke} href={lenker.personopplysninger}>
                <Back className={css.ikon} />
                <span>Tilbake</span>
            </Link>
        </div>
    );
};

export default Tilbake;
