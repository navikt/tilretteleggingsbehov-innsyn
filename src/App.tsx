import React, { useEffect, useState } from 'react';
import { hentMeg, Respons } from './api/api';
import Visning from './visning/Visning';
import { enKandidat } from './mock/testdata';

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
            window.location.replace('./redirect-til-login');
        }
    }, [respons.status]);

    const kandidat = enKandidat;

    return (
        <div className="App">
            <h1>Dine tilretteleggingsbehov</h1>
            <code>{JSON.stringify(respons, null, 4)}</code>
            <Visning kandidat={kandidat} />;
        </div>
    );
};

export default App;
