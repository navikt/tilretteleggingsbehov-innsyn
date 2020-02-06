import React, { FunctionComponent } from 'react';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './Tilbake.less';

const Tilbake: FunctionComponent = () => {
    return (
        <div className="tilbake">
            <Lenke className="tilbake__lenke" href="https://www.nav.no/person/personopplysninger">
                <VenstreChevron />
                <span>Tilbake til personopplysninger</span>
            </Lenke>
        </div>
    );
};

export default Tilbake;
