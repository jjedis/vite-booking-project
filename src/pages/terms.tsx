import "../styles/legal.css";

function TermsFi() {
  return (
    <div className="legal-page">
      <h1>Käyttöehdot</h1>
      <p className="legal-updated">
        Päivitetty viimeksi:{" "}
        <span className="legal-placeholder">8.8.2026</span>
      </p>

      <p>
        Nämä ehdot koskevat verkkosivustomme käyttöä ja kaikkia yrityksen{" "}
        <span className="legal-placeholder">[Yrityksen virallinen nimi]</span>{" "}
        ("me") kanssa tehtyjä ajanvarauksia. Varaamalla ajan hyväksyt alla
        olevat ehdot.
      </p>

      <h2>1. Varaukset</h2>
      <p>
        Sivuston kautta tehty ajanvaraus on vahvistettu, kun saat
        vahvistusviestin sähköpostitse tai tekstiviestinä. Saavuthan ajoissa —
        myöhästyminen voi lyhentää hoitoaikaasi, jotta seuraava asiakas ei
        viivästy, hinnan pysyessä ennallaan.
      </p>

      <h2>2. Peruutukset ja ajan siirtäminen</h2>
      <p>
        Pyydämme ilmoittamaan peruutuksesta tai ajan siirrosta vähintään{" "}
        <span className="legal-placeholder">[24 tuntia]</span> etukäteen. Tätä
        myöhemmin tehdyistä peruutuksista tai ilman ilmoitusta väliin jääneistä
        käynneistä voidaan periä{" "}
        <span className="legal-placeholder">
          [peruutusmaksu / X % hoidon hinnasta]
        </span>
        .
      </p>

      <h2>3. Maksaminen</h2>
      <p>
        <span className="legal-placeholder">
          [Kuvaa hyväksytyt maksutavat, veloitusajankohta (varauksen yhteydessä
          vai käynnin jälkeen) ja palautusehdot.]
        </span>
      </p>

      <h2>4. Terveys ja turvallisuus</h2>
      <p>
        Hieronta ja kehotyö eivät korvaa lääketieteellistä hoitoa. Kerrothan
        meille ennen käyntiäsi mahdollisista vammoista, sairauksista,
        allergioista tai raskaudesta, jotta voimme mukauttaa hoitoa tai
        tarvittaessa kieltäytyä sen antamisesta. Pidätämme oikeuden kieltäytyä
        hoidosta tai keskeyttää se, mikäli se vaikuttaa vaaralliselta asiakkaan
        terveydelle tai hoitajan turvallisuudelle.
      </p>

      <h2>5. Ikävaatimus</h2>
      <p>
        Asiakkaan tulee olla vähintään{" "}
        <span className="legal-placeholder">[18-vuotias]</span> voidakseen
        varata ajan itsenäisesti.{" "}
        <span className="legal-placeholder">
          [Lisää tarvittaessa käytäntö alaikäisille, esim. huoltajan läsnäolo
          tai kirjallinen suostumus.]
        </span>
      </p>

      <h2>6. Oikeus kieltäytyä palvelusta</h2>
      <p>
        Voimme harkintamme mukaan kieltäytyä hoidosta tai keskeyttää sen —
        esimerkiksi asiattoman käytöksen, päihtymyksen tai käynnillä ilmenevän
        terveysriskin vuoksi. Tällöin sovelletaan edelleen kohdan 2
        peruutusehtoja.
      </p>

      <h2>7. Vastuunrajoitus</h2>
      <p>
        <span className="legal-placeholder">
          [Lisää yrityksellesi ja vakuutusturvallesi sopiva vastuunrajoitus —
          esimerkiksi vastuun rajaaminen hoidon hintaan, ellei kyseessä ole
          meidän tuottamuksemme, ja mainita, ettemme vastaa ennalta
          ilmoittamattomista terveydentiloista. Tämä kohta tulisi tarkistuttaa
          juristilla ennen julkaisua.]
        </span>
      </p>

      <h2>8. Muutokset näihin ehtoihin</h2>
      <p>
        Voimme päivittää näitä ehtoja ajoittain. Ajanvarauspalvelun käytön
        jatkaminen muutosten julkaisemisen jälkeen katsotaan päivitettyjen
        ehtojen hyväksymiseksi.
      </p>

      <h2>9. Sovellettava laki</h2>
      <p>
        Näihin ehtoihin sovelletaan Suomen lakia. Mahdolliset erimielisyydet,
        joita ei saada ratkaistua suoraan, käsitellään Suomen tuomioistuimissa,
        tämän kuitenkaan rajoittamatta EU- tai Suomen lain mukaisia pakottavia
        kuluttajansuojaoikeuksiasi.
      </p>

      <h2>10. Yhteystiedot</h2>
      <p>
        Kysymykset näistä ehdoista voi lähettää osoitteeseen{" "}
        <span className="legal-placeholder">[yhteyssähköposti]</span>.
      </p>
    </div>
  );
}

export default TermsFi;
