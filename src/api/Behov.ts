export enum ArbeidstidBehov {
    KanIkkeJobbe = 'KAN_IKKE_JOBBE',
    Heltid = 'HELTID',
    IkkeHeleDager = 'IKKE_HELE_DAGER',
    BorteFasteDagerEllerTider = 'BORTE_FASTE_DAGER_ELLER_TIDER',
    Fleksibel = 'FLEKSIBEL',
}

export enum FysiskBehov {
    Arbeidsstilling = 'ARBEIDSSTILLING',
    Ergonomi = 'ERGONOMI',
    TungeLøft = 'TUNGE_LØFT',
    Hørsel = 'HØRSEL',
    Syn = 'SYN',
    AndreFormer = 'ANNET',
}

export enum ArbeidsmijøBehov {
    TilrettelagtOpplæring = 'TILRETTELAGT_OPPLÆRING',
    TilrettelagteArbeidsoppgaver = 'TILRETTELAGTE_ARBEIDSOPPGAVER',
    Mentor = 'MENTOR',
    Annet = 'ANNET',
}

export enum GrunnleggendeBehov {
    SnakkeNorsk = 'SNAKKE_NORSK',
    SkriveNorsk = 'SKRIVE_NORSK',
    LeseNorsk = 'LESE_NORSK',
    RegningOgTallforståelse = 'REGNING_OG_TALLFORSTÅELSE',
    AndreUtfordringer = 'ANDRE_UTFORDRINGER',
}

export type Behov = ArbeidstidBehov | FysiskBehov | ArbeidsmijøBehov | GrunnleggendeBehov;
