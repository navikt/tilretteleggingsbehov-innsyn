export enum Kategori {
    Arbeidstid,
    Fysisk,
    Arbeidshverdagen,
    UtfordringerMedNorsk,
}

export enum Arbeidstid {
    IkkeHeleDager = 'IKKE_HELE_DAGER',
    BorteFasteDagerEllerTider = 'BORTE_FASTE_DAGER_ELLER_TIDER',
    Fleksibel = 'FLEKSIBEL',
    GradvisØkning = 'GRADVIS_ØKNING',
}

export enum Fysisk {
    Arbeidsstilling = 'ARBEIDSSTILLING',
    Ergonomi = 'ERGONOMI',
    TungeLøft = 'TUNGE_LØFT',
    UniversellUtforming = 'UNIVERSELL_UTFORMING',
}

export enum Arbeidshverdagen {
    Opplæring = 'OPPLÆRING',
    Arbeidsoppgaver = 'OPPGAVER',
    TettOppfølging = 'TETT_OPPFØLGING',
    StilleOgRoligMiljø = 'STILLE_OG_ROLIG_MILJØ',
    PersonligBistand = 'PERSONLIG_BISTAND',
}

export enum UtfordringerMedNorsk {
    Snakke = 'SNAKKE',
    Skrive = 'SKRIVE',
    Lese = 'LESE',
}

export type Behov = Arbeidstid | Fysisk | Arbeidshverdagen | UtfordringerMedNorsk;
