import React, { useEffect, useState } from 'react';
import { hentTilretteleggingsbehov, Respons, Status } from './api/api';
import { ReactComponent as Tavleikon } from './tavleikon/tavleikon.svg';
import Brødsmulesti from './brødsmulesti/Brødsmulesti';
import Informasjon from './informasjon/Informasjon';
import Tilbake from './tilbake/Tilbake';
import Visning from './visning/Visning';
import { Heading } from '@navikt/ds-react';
import './App.less';

const App = () => {
    const [respons, setRespons] = useState<Respons>({
        status: Status.IkkeLastet,
    });

    useEffect(() => {
        const hent = async () => {
            setRespons({
                status: Status.LasterInn,
            });

            setRespons(await hentTilretteleggingsbehov());
        };

        hent();
    }, []);

    useEffect(() => {
        if (respons.status === Status.Feil && respons.statusKode === 401) {
            window.location.replace('./redirect-til-login');
        }
    }, [respons]);

    return (
        <div className="app">
            <Brødsmulesti />
            <div className="app__tilbake-og-header">
                <Tilbake />
                <header className="app__header">
                    <Tavleikon />
                    <Heading level="1" size="large">
                        Behov for tilrettelegging
                    </Heading>
                </header>
                <span className="app__spacer" />
            </div>
            <main className="app__main">
                <Informasjon respons={respons} />
                {respons.status === Status.Suksess && <Visning kandidat={respons.kandidat} />}
            </main>
        </div>
    );
};

export default App;
