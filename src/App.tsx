import React, { useEffect, useState } from 'react';
import { hentMeg, Respons } from './api/api';
import Visning from './visning/Visning';
import { enKandidat } from './mock/testdata';
import Brødsmulesti from './brødsmulesti/Brødsmulesti';
import Tilbake from './tilbake/Tilbake';
import Header from './header/Header';
import Informasjon, { Situasjon } from './informasjon/Informasjon';

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
        <div className="App typo-normal">
            <Brødsmulesti />
            <Tilbake />
            <Header />
            <main>
                <Informasjon situasjon={Situasjon.HarIngenBehovForTilrettelegging} />
                <Visning kandidat={kandidat} />
            </main>
        </div>
    );
};

export default App;
