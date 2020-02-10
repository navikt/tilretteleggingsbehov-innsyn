import React, { useEffect, useState } from 'react';
import {
    hentTilretteleggingsbehov,
    Respons,
    Status,
    ResponsOppfolgingsstatus,
    hentOppfolgingsstatus,
} from './api/api';
import { ReactComponent as Tavleikon } from './tavleikon/tavleikon.svg';
import { Systemtittel } from 'nav-frontend-typografi';
import Brødsmulesti from './brødsmulesti/Brødsmulesti';
import Informasjon from './informasjon/Informasjon';
import Tilbake from './tilbake/Tilbake';
import Visning from './visning/Visning';
import './App.less';

const App = () => {
    const [respons, setRespons] = useState<Respons>({
        status: Status.IkkeLastet,
    });

    const [responsOppfolgingsstatus, setResponsOppfolgingsstatus] = useState<
        ResponsOppfolgingsstatus
    >({
        status: Status.IkkeLastet,
    });

    useEffect(() => {
        const hent = async () => {
            setRespons({
                status: Status.LasterInn,
            });
            setResponsOppfolgingsstatus({
              status: Status.LasterInn  
            })

            setRespons(await hentTilretteleggingsbehov());
            setResponsOppfolgingsstatus(await hentOppfolgingsstatus());
        };

        hent();
    }, []);

    useEffect(() => {
        if (respons.status === Status.Feil && respons.statusKode === 401) {
            window.location.replace('./redirect-til-login');
        }
    }, [respons]);

    return (
        <div className="app typo-normal">
            <Brødsmulesti />
            <Tilbake />
            <header className="app__header">
                <Tavleikon />
                <Systemtittel tag="h1" className="blokk-m">
                    Behov for tilrettelegging
                </Systemtittel>
            </header>
            <main className="app__main">
                <Informasjon
                    respons={respons}
                    responsOppfolgingsstatus={responsOppfolgingsstatus}
                />
                {respons.status === Status.Suksess && <Visning kandidat={respons.kandidat} />}
            </main>
        </div>
    );
};

export default App;
