import React, { useEffect, useState } from 'react';
import { hentMeg, Respons } from './api/api';
import Visning from './visning/Visning';
import { enKandidat } from './mock/testdata';
import Brødsmulesti from './brødsmulesti/Brødsmulesti';
import Tilbake from './tilbake/Tilbake';
import Informasjon, { Situasjon } from './informasjon/Informasjon';
import { ReactComponent as Tavleikon } from './tavleikon/tavleikon.svg';
import './App.less';

const App = () => {
    const [respons, setRespons] = useState<Respons>({
        data: 'Ikke lastet',
        status: 0,
    });

    useEffect(() => {
        const hent = async () => {
            setRespons(await hentMeg());
        };

        hent();
    }, []);

    useEffect(() => {
        if (respons.status === 401) {
            //window.location.replace('./redirect-til-login');
        }
    }, [respons.status]);

    const kandidat = enKandidat;

    return (
        <div className="app typo-normal">
            <Brødsmulesti />
            <Tilbake />
            <header>
                <Tavleikon />
                <h1 className="blokk-m">Behov for tilrettelegging</h1>
            </header>
            <main>
                <Informasjon situasjon={Situasjon.HarIngenBehovForTilrettelegging} />
                <Visning kandidat={kandidat} />
            </main>
        </div>
    );
};

export default App;
