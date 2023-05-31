import React from 'react';
import { ReactComponent as Tavleikon } from './tavleikon/tavleikon.svg';
import Brødsmulesti from './brødsmulesti/Brødsmulesti';
import Tilbake from './tilbake/Tilbake';
import { Heading } from '@navikt/ds-react';
import css from './App.module.css';

const App = () => {
    return (
        <div className={css.app}>
            <Brødsmulesti />
            <div className={css.tilbakeOgHeader}>
                <Tilbake />
                <header className={css.header}>
                    <Tavleikon />
                    <Heading level="1" size="large">
                        Behov for tilrettelegging
                    </Heading>
                </header>
                <span className={css.spacer} />
            </div>

            <main className={css.main}>
                NAV registrerer ikke lenger tilretteleggingsbehov i forbindelse med arbeidsrettet
                oppfølging. Informasjon som tidligere har vært registrert er nå slettet.
            </main>
        </div>
    );
};

export default App;
