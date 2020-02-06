import { Behov, ArbeidstidBehov, ArbeidsmijøBehov, FysiskBehov, GrunnleggendeBehov } from './Behov';

export type Alternativtekster = {
    label: string;
    hjelpetekst?: string;
};

export declare type Behovmapping = Map<String, Alternativtekster>;

const arbeidstidMapping: Behovmapping = new Map([
    [ArbeidstidBehov.KanIkkeJobbe, { label: 'Kan ikke jobbe nå' }],
    [ArbeidstidBehov.Heltid, { label: 'Heltid' }],
    [ArbeidstidBehov.IkkeHeleDager, { label: 'Kan jobbe hver ukedag, men ikke hele dager' }],
    [
        ArbeidstidBehov.BorteFasteDagerEllerTider,
        { label: 'Må være borte fra jobben til faste dager eller tider' },
    ],
    [ArbeidstidBehov.Fleksibel, { label: 'Må ha fleksible arbeidsdager' }],
]);

const fysiskMapping: Behovmapping = new Map([
    [FysiskBehov.Arbeidsstilling, { label: 'Varierte arbeidsstillinger' }],
    [
        FysiskBehov.Ergonomi,
        {
            label: 'Ergonomiske tilpasninger',
            hjelpetekster: 'For eksempel hev/senk-pult eller tilpassede lys- eller lydforhold',
        },
    ],
    [FysiskBehov.TungeLøft, { label: 'Unngå tunge løft' }],
    [FysiskBehov.Hørsel, { label: 'Hørsel' }],
    [FysiskBehov.Syn, { label: 'Syn' }],
    [FysiskBehov.AndreFormer, { label: 'Andre former for fysisk tilrettelegging' }],
]);

const arbeidsmiljøMapping: Behovmapping = new Map([
    [
        ArbeidsmijøBehov.TilrettelagtOpplæring,
        {
            label: 'Tilrettelagt opplæring',
            hjelpetekst: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
        },
    ],
    [
        ArbeidsmijøBehov.TilrettelagteArbeidsoppgaver,
        {
            label: 'Tilrettelagte arbeidsoppgaver',
            hjelpetekst: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
        },
    ],
    [
        ArbeidsmijøBehov.Mentor,
        { label: 'Mentor', hjelpetekst: 'En egen person med ansvar for tett oppfølging' },
    ],
    [ArbeidsmijøBehov.Annet, { label: 'Andre former for tilrettelegging' }],
]);

const grunnleggendeMapping: Behovmapping = new Map([
    [GrunnleggendeBehov.SnakkeNorsk, { label: 'Snakke norsk' }],
    [GrunnleggendeBehov.SkriveNorsk, { label: 'Skrive norsk' }],
    [GrunnleggendeBehov.LeseNorsk, { label: 'Lese norsk' }],
    [GrunnleggendeBehov.RegningOgTallforståelse, { label: 'Regning og tallforståelse' }],
    [GrunnleggendeBehov.AndreUtfordringer, { label: 'Andre utfordringer' }],
]);

const hentBehovtekster = (behov: Behov, mapping: Behovmapping): Alternativtekster => {
    return mapping.get(behov) || { label: '' };
};

export const arbeidstidTekster = (arbeidstidBehov: ArbeidstidBehov[]): Alternativtekster[] => {
    return arbeidstidBehov.map(behov => hentBehovtekster(behov, arbeidstidMapping));
};

export const fysiskTekster = (fysiskeBehov: FysiskBehov[]): Alternativtekster[] => {
    return fysiskeBehov.map(behov => hentBehovtekster(behov, fysiskMapping));
};

export const arbeidsmiljøTekster = (arbeidsmiljøBehov: ArbeidsmijøBehov[]): Alternativtekster[] => {
    return arbeidsmiljøBehov.map(behov => hentBehovtekster(behov, arbeidsmiljøMapping));
};

export const grunnleggendeTekster = (
    grunnleggendeBehov: GrunnleggendeBehov[]
): Alternativtekster[] => {
    return grunnleggendeBehov.map(behov => hentBehovtekster(behov, grunnleggendeMapping));
};
