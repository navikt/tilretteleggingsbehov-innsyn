if (process.env.REACT_APP_MOCK) {
    require('./mock.ts');
}

export type Respons = {
    data: any;
    status: number;
};

export const hentTilretteleggingsbehov = async (): Promise<Respons> => {
    try {
        const respons = await fetch('/tilretteleggingsbehov-innsyn/mine-tilretteleggingsbehov', {
            method: 'GET',
            credentials: 'include',
        });

        if (respons.ok) {
            return {
                data: await respons.json(),
                status: respons.status,
            };
        }

        return {
            data: 'Ikke innlogget',
            status: respons.status,
        };
    } catch (error) {
        return {
            data: 'Ukjent feil',
            status: -1,
        };
    }
};
