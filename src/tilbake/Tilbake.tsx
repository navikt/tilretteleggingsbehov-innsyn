import React, { FunctionComponent } from 'react';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './Tilbake.less';
import lenker from '../lenker';

const Tilbake: FunctionComponent = () => {
    return (
        <div className="tilbake">
            <Lenke className="tilbake__lenke" href={lenker.personopplysninger}>
                <VenstreChevron className="tilbake__chevron" />
                <span>Tilbake til personopplysninger</span>
            </Lenke>
        </div>
    );
};

export default Tilbake;
