import React, { FunctionComponent } from 'react';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './Tilbake.less';

const Tilbake: FunctionComponent = () => {
    return (
        <Lenke className="tilbake" href="https://www.nav.no/person/personopplysninger/">
            <VenstreChevron />
            <span>Tilbake til personopplysninger</span>
        </Lenke>
    );
};

export default Tilbake;
