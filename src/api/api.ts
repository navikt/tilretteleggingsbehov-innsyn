import { Kandidat, Oppfølgingsstatus } from './Kandidat';

if (process.env.REACT_APP_MOCK) {
    require('../mock/mock.ts');
}

export enum Status {
    IkkeLastet,
    LasterInn,
    Suksess,
    Feil,
    UkjentFeil,
}

type IkkeLastet = {
    status: Status.IkkeLastet;
};

type LasterInn = {
    status: Status.LasterInn;
};

type Suksess = {
    status: Status.Suksess;
    kandidat: Kandidat;
};

type Feil = {
    status: Status.Feil;
    statusKode: number;
};

type UkjentFeil = {
    status: Status.UkjentFeil;
};

export type Respons = IkkeLastet | LasterInn | Suksess | Feil | UkjentFeil;

export const hentTilretteleggingsbehov = async (): Promise<Respons> => {
    try {
        const respons = await fetch('/person/behov-for-tilrettelegging/tilretteleggingsbehov', {
            method: 'GET',
            credentials: 'include',
        });

        if (respons.ok) {
            const kandidat = await respons.json();

            return {
                status: Status.Suksess,
                kandidat,
            };
        }

        return {
            status: Status.Feil,
            statusKode: respons.status,
        };
    } catch (error) {
        return {
            status: Status.UkjentFeil,
        };
    }
};

type SuksessOppfolgingsstatus = {
    status: Status.Suksess;
    oppfolgingsstatus: Oppfølgingsstatus;
};

export type ResponsOppfolgingsstatus =
    | IkkeLastet
    | LasterInn
    | SuksessOppfolgingsstatus
    | Feil
    | UkjentFeil;

export const hentOppfolgingsstatus = async (): Promise<ResponsOppfolgingsstatus> => {
    try {
        const respons = await fetch('/person/behov-for-tilrettelegging/oppfolgingsstatus', {
            method: 'GET',
            credentials: 'include',
        });

        if (respons.ok) {
            const oppfolgingsstatus: Oppfølgingsstatus = await respons.json();

            return {
                status: Status.Suksess,
                oppfolgingsstatus: oppfolgingsstatus,
            };
        }
        return {
            status: Status.Feil,
            statusKode: respons.status,
        };
    } catch (error) {
        return {
            status: Status.UkjentFeil,
        };
    }
};
