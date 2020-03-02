import { Kategori, Behov, Arbeidshverdagen, UtfordringerMedNorsk, Fysisk } from './Behov';

export type Behovtekst = {
    behov: Behov;
    beskrivelse: string;
};

const tilretteleggingsbehov = {
    [Kategori.Arbeidstid]: [
        {
            behov: Fysisk.UniversellUtforming,
            beskrivelse: 'Universell utforming av arbeidsplassen',
        },
        {
            behov: Fysisk.Ergonomi,
            beskrivelse: 'Ergonomiske tilpasninger',
        },
        { behov: Fysisk.Arbeidsstilling, beskrivelse: 'Varierte arbeidsstillinger' },
        { behov: Fysisk.TungeLøft, beskrivelse: 'Unngå tunge løft' },
    ],
    [Kategori.Fysisk]: [
        {
            behov: Fysisk.UniversellUtforming,
            beskrivelse: 'Universell utforming av arbeidsplassen',
        },
        {
            behov: Fysisk.Ergonomi,
            beskrivelse: 'Ergonomiske tilpasninger',
        },
        { behov: Fysisk.Arbeidsstilling, beskrivelse: 'Varierte arbeidsstillinger' },
        { behov: Fysisk.TungeLøft, beskrivelse: 'Unngå tunge løft' },
    ],
    [Kategori.Arbeidshverdagen]: [
        {
            behov: Arbeidshverdagen.Opplæring,
            beskrivelse: 'Opplæring',
        },
        {
            behov: Arbeidshverdagen.Arbeidsoppgaver,
            beskrivelse: 'Arbeidsoppgaver',
        },
        {
            behov: Arbeidshverdagen.TettOppfølging,
            beskrivelse: 'Tett oppfølging',
        },
        { behov: Arbeidshverdagen.StilleOgRoligMiljø, beskrivelse: 'Stille og rolig miljø' },
    ],
    [Kategori.UtfordringerMedNorsk]: [
        { behov: UtfordringerMedNorsk.Snakke, beskrivelse: 'Snakke' },
        { behov: UtfordringerMedNorsk.Skrive, beskrivelse: 'Skrive' },
        { behov: UtfordringerMedNorsk.Lese, beskrivelse: 'Lese' },
    ],
};

export const hentTeksterForValgteBehov = (kategori: Kategori, behov: Behov[]) => {
    return (tilretteleggingsbehov[kategori] as Behovtekst[]).filter(b => behov.includes(b.behov));
};
