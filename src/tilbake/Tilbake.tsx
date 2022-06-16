import React, { FunctionComponent } from 'react';
import lenker from '../lenker';
import { Back } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import './Tilbake.less';

const Tilbake: FunctionComponent = () => {
    return (
        <div className="tilbake">
            <Link className="tilbake__lenke" href={lenker.personopplysninger}>
                <Back className="tilbake__chevron" />
                <span>Tilbake</span>
            </Link>
        </div>
    );
};

export default Tilbake;
