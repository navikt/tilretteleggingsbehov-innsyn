# tilretteleggingsbehov-innsyn

Vis registrerte tilretteleggingsbehov for personbruker.

## Utvikling

```sh
npm install
npm run start
```

## Utvikling uten backend (mock)

```sh
npm run start:mock
```

## Utvikling av server

Kjøre Redis i Docker-container
```sh
docker run -d -p 6379:6379 --name tilretteleggingsbehov-innsyn-redis -d redis
```

Koble til Redis
```sh
npm install -g redis-cli # Installer CLI
rdcli -h localhost -p 6379
```

## Testing i dev-miljø

* Gå til [ekstern.dev.nav.no/person/personopplysninger](https://www.ekstern.dev.nav.no/person/personopplysninger)
* Velg "TestId"
* Logg inn med en syntetisk testbruker (du finner mange slike i [Rekrutteringsbistand](https://rekrutteringsbistand.intern.dev.nav.no/kandidater))
* Scroll ned og trykk på "Behov for tilrettelegging" under "Flere opplysninger om deg"
* Du skal nå se tilretteleggingsbehovene for vedkommende

Hvis testbrukeren ikke har noen tilretteleggingsbehov, kan dette registreres i aktivitetsplanen. Se [registrer tilretteleggingsbehov](https://github.com/navikt/registrer-tilretteleggingsbehov) for mer informasjon.

# Henvendelser

## For Nav-ansatte

* Dette Git-repositoriet eies av [Team tiltak og inkludering (TOI) i Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx).
* Slack-kanaler:
  * [#arbeidsgiver-toi-dev](https://nav-it.slack.com/archives/C02HTU8DBSR)
  * [#arbeidsgiver-utvikling](https://nav-it.slack.com/archives/CD4MES6BB)

## For folk utenfor Nav

* Opprett gjerne en issue i Github for alle typer spørsmål
* IT-utviklerne i Github-teamet https://github.com/orgs/navikt/teams/arbeidsgiver
* IT-avdelingen i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)
