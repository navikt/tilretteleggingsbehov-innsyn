# tilretteleggingsbehov-innsyn

Vis registrerte tilretteleggingsbehov for personbruker.

## Utvikling

```sh
npm install
npm run start
```

## Utvikling uten backend (mock)

```sh
npm run mock
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

## Testing i NAVs preprod (for NAV-ansatte)
* Sørg for at stub-oidc-provider er installert gjennom https://myapps.microsoft.com
* Logg inn på tynnklient
* Åpne nettleser og sørg for at du er innlogget med din egen NAV-ident
* Gå til https://www-q0.nav.no/person/behov-for-tilrettelegging/ (evt https://www.dev.nav.no/person/personopplysninger/ om tilretteleggingsbehov legges der)
* Logg inn "Uten IDPorten", fnr: 10108000398
* Bla ned på siden "Personopplysninger" og velg "Behov for tilrettelegging"

# Henvendelser

## For Nav-ansatte
* Dette Git-repositoriet eies av [Team inkludering i Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx).
* Slack-kanaler:
  * [#inkludering-utvikling](https://nav-it.slack.com/archives/CQZU35J6A)
  * [#arbeidsgiver-utvikling](https://nav-it.slack.com/archives/CD4MES6BB)
  * [#arbeidsgiver-general](https://nav-it.slack.com/archives/CCM649PDH)

## For folk utenfor Nav
* Opprett gjerne en issue i Github for alle typer spørsmål
* IT-utviklerne i Github-teamet https://github.com/orgs/navikt/teams/arbeidsgiver
* IT-avdelingen i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)