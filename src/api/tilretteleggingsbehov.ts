import {
    Kategori,
    Behov,
    Arbeidshverdagen,
    UtfordringerMedNorsk,
    Fysisk,
    Arbeidstid,
} from './Behov';

export type Behovtekst = {
    behov: Behov;
    beskrivelse: string;
};

const tilretteleggingsbehov: Record<Kategori, Behovtekst[]> = {
    [Kategori.Arbeidstid]: [
        {
            behov: Arbeidstid.IkkeHeleDager,
            beskrivelse: 'Kan jobbe hver ukedag, men ikke hele dager',
        },
        {
            behov: Arbeidstid.BorteFasteDagerEllerTider,
            beskrivelse: 'Må være borte fra jobben til faste dager eller tider',
        },
        { behov: Arbeidstid.Fleksibel, beskrivelse: 'Må ha fleksible arbeidsdager' },
        {
            behov: Arbeidstid.GradvisØkning,
            beskrivelse: 'Ønsker gradvis økning av stillingsprosenten',
        },
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
        {
            behov: Arbeidshverdagen.PersonligBistand,
            beskrivelse: 'Personlig bistand',
        },
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
