import { Kategori } from './Kategori';
import { Behov, Arbeidstid, Fysisk, Arbeidshverdagen, UtfordringerMedNorsk } from './Behov';

export type Behovtekst = {
    label: string;
    hjelpetekst?: string;
};

export type Kategoritekster = {
    [behov: string]: Behovtekst;
};

const teksterTilArbeidstid: Kategoritekster = {
    [Arbeidstid.IkkeHeleDager]: { label: 'Kan jobbe hver ukedag, men ikke hele dager' },
    [Arbeidstid.BorteFasteDagerEllerTider]: {
        label: 'Må være borte fra jobben til faste dager eller tider',
    },
    [Arbeidstid.GradvisØkning]: { label: 'Ønsker gradvis økning av stillingsprosenten' },
    [Arbeidstid.Fleksibel]: { label: 'Må ha fleksible arbeidsdager' },
};

const teksterTilFysisk: Kategoritekster = {
    [Fysisk.UniversellUtforming]: {
        label: 'Universell utforming av arbeidsplassen',
        hjelpetekst: 'For eksempel rullestolrampe, tale i heis eller teleslynge',
    },
    [Fysisk.Ergonomi]: {
        label: 'Ergonomiske tilpasninger',
        hjelpetekst: 'For eksempel heve-/senkepult eller spesialstol',
    },
    [Fysisk.Arbeidsstilling]: { label: 'Varierte arbeidsstillinger' },
    [Fysisk.TungeLøft]: { label: 'Unngå tunge løft' },
};

const teksterTilArbeidshverdagen: Kategoritekster = {
    [Arbeidshverdagen.Opplæring]: {
        label: 'Opplæring',
        hjelpetekst: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
    },
    [Arbeidshverdagen.Arbeidsoppgaver]: {
        label: 'Arbeidsoppgaver',
        hjelpetekst: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
    },
    [Arbeidshverdagen.TettOppfølging]: {
        label: 'Tett oppfølging',
        hjelpetekst: 'For eksempel ekstra støtte fra en kollega eller mentor',
    },
    [Arbeidshverdagen.StilleOgRoligMiljø]: { label: 'Stille og rolig miljø' },
};

const teksterTilUtfordringerMedNorsk: Kategoritekster = {
    [UtfordringerMedNorsk.Snakke]: { label: 'Snakke' },
    [UtfordringerMedNorsk.Skrive]: { label: 'Skrive' },
    [UtfordringerMedNorsk.Lese]: { label: 'Lese' },
};

const teksterTilAlleBehov = {
    [Kategori.Arbeidstid]: teksterTilArbeidstid,
    [Kategori.Fysisk]: teksterTilFysisk,
    [Kategori.Arbeidshverdagen]: teksterTilArbeidshverdagen,
    [Kategori.UtfordringerMedNorsk]: teksterTilUtfordringerMedNorsk,
};

export const hentTeksterForBehov = (behov: Behov[], kategori: Kategori): Behovtekst[] => {
    const teksterTilKategori = teksterTilAlleBehov[kategori];
    const aktuelleTekster = (Object.entries(teksterTilKategori) as [
        string,
        Behovtekst
    ][]).filter(([b]) => behov.includes(b as Behov));
    return aktuelleTekster.map(([_, tekst]) => tekst);
};
