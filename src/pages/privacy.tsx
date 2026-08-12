import "../styles/legal.css";

function PrivacyFi() {
  return (
    <div className="legal-page">
      <h1>Tietosuojaseloste</h1>
      <p className="legal-updated">
        Päivitetty viimeksi:{" "}
        <span className="legal-placeholder">8.8.2026</span>
      </p>

      <p>
        Tässä selosteessa kerrotaan, mitä henkilötietoja{" "}
        <span className="legal-placeholder">[Yrityksen virallinen nimi]</span>{" "}
        ("me") kerää, kun varaat ajan verkkosivustomme kautta, miksi tietoja
        käsitellään ja mitä oikeuksia sinulla on tietojesi suhteen. Toimimme
        rekisterinpitäjänä EU:n yleisen tietosuoja-asetuksen (GDPR) ja Suomen
        tietosuojalain tarkoittamalla tavalla.
      </p>

      <h2>1. Kuka olemme</h2>
      <p>
        <span className="legal-placeholder">[Yrityksen virallinen nimi]</span>
        <br />
        <span className="legal-placeholder">[Y-tunnus]</span>
        <br />
        <span className="legal-placeholder">[Yrityksen osoite]</span>
        <br />
        Yhteystiedot:{" "}
        <span className="legal-placeholder">
          [tietosuojayhteyshenkilön sähköposti]
        </span>
      </p>

      <h2>2. Mitä tietoja keräämme</h2>
      <p>
        Kun varaat ajan tai otat meihin yhteyttä, keräämme seuraavat tiedot:
      </p>
      <ul>
        <li>Etu- ja sukunimi</li>
        <li>Puhelinnumero</li>
        <li>Osoite</li>
        <li>Sähköpostiosoite</li>
        <li>
          Markkinointisuostumuksen tila sekä ajankohta, jolloin suostumus
          annettiin tai peruutettiin
        </li>
        <li>Varaustiedot — varattu palvelu, päivämäärä ja kellonaika</li>
      </ul>
      <p>
        Emme tietoisesti kerää tätä lomaketta käyttäen erityisiin
        henkilötietoryhmiin kuuluvia tietoja (kuten terveystietoja). Mikäli
        kerrot meille hoitoosi liittyvästä terveydentilasta (esimerkiksi ennen
        hierontakäyntiä), näitä tietoja käsitellään erikseen ja vain
        nimenomaisella suostumuksellasi — katso kohta 7.
      </p>

      <h2>3. Miksi käsittelemme näitä tietoja</h2>
      <ul>
        <li>
          <strong>Palvelun toimittamiseksi</strong> — ajanvarausten
          vahvistaminen, hallinta ja niistä muistuttaminen. Käsittelyperuste:
          sopimuksen täytäntöönpano (GDPR 6 art. 1 kohta b).
        </li>
        <li>
          <strong>Markkinointiviestintää varten</strong> — vain, jos olet
          antanut siihen suostumuksen. Käsittelyperuste: suostumus (GDPR 6 art.
          1 kohta a). Voit peruuttaa suostumuksen milloin tahansa, katso kohta
          6.
        </li>
        <li>
          <strong>Lakisääteisten velvoitteiden täyttämiseksi</strong> —
          esimerkiksi Suomen kirjanpitolain edellyttämien tietojen
          säilyttäminen. Käsittelyperuste: lakisääteinen velvoite (GDPR 6 art. 1
          kohta c).
        </li>
      </ul>

      <h2>4. Kenen kanssa jaamme tietoja</h2>
      <p>
        Emme myy henkilötietojasi. Voimme jakaa tietoja palveluntarjoajille,
        jotka käsittelevät niitä puolestamme, kuten:
      </p>
      <ul>
        <li>
          <span className="legal-placeholder">
            [ajanvaraus-/kalenteriohjelmiston toimittaja]
          </span>
        </li>
        <li>
          <span className="legal-placeholder">
            [sähköposti- tai tekstiviestipalvelun tarjoaja, jota käytetään
            muistutuksiin/markkinointiin]
          </span>
        </li>
        <li>
          <span className="legal-placeholder">
            [maksunvälittäjä, mikäli käytössä]
          </span>
        </li>
      </ul>
      <p>
        Nämä palveluntarjoajat käsittelevät tietoja vain ohjeidemme mukaisesti
        ja niitä sitoo tietojenkäsittelysopimus.{" "}
        
      </p>

      <h2>5. Kuinka kauan säilytämme tietoja</h2>
      <p>
        Säilytämme varaus- ja yhteystietoja{" "}
        <span className="legal-placeholder">[X kuukautta/vuotta]</span>{" "}
        viimeisen käyntisi jälkeen, ellei laki edellytä pidempää säilytysaikaa —
        esimerkiksi Suomen kirjanpitolaki edellyttää tiettyjen maksutietojen
        säilyttämistä kuusi vuotta. Markkinointisuostumusta koskevia tietoja
        säilytetään niin kauan kuin suostumus on voimassa, sekä merkintä sen
        mahdollisesta peruuttamisesta.
      </p>

      <h2>6. Oikeutesi</h2>
      <p>GDPR:n mukaan sinulla on oikeus:</p>
      <ul>
        <li>saada pääsy hallussamme oleviin henkilötietoihisi</li>
        <li>oikaista virheelliset tai puutteelliset tiedot</li>
        <li>pyytää tietojesi poistamista soveltuvin osin</li>
        <li>rajoittaa tai vastustaa tiettyä käsittelyä</li>
        <li>saada tietosi siirrettävässä muodossa</li>
        <li>
          peruuttaa markkinointisuostumus milloin tahansa vaikuttamatta aiempaan
          käsittelyyn
        </li>
      </ul>
      <p>
        Voit käyttää näitä oikeuksia ottamalla yhteyttä osoitteeseen{" "}
        <span className="legal-placeholder">
          [tietosuojayhteyshenkilön sähköposti]
        </span>
        . Sinulla on myös oikeus tehdä valitus tietosuojavaltuutetun
        toimistolle, jos katsot, että tietojasi on käsitelty lainvastaisesti.
      </p>

      <h2>7. Terveyteen liittyvät tiedot</h2>
      <p>
        Jos kerrot meille vapaaehtoisesti hoitoosi liittyvistä terveystiedoista
        (kuten vammasta, raskaudesta tai allergiasta), käsittelemme näitä GDPR:n
        9 artiklan tarkoittamana erityisenä henkilötietoryhmänä ja vain
        nimenomaisella suostumuksellasi, ainoastaan hoitosi turvallisen
        toteuttamisen varmistamiseksi. Näitä tietoja ei käytetä markkinointiin,
        ja niitä säilytetään erillään yleisistä varaustiedoista.
      </p>

      <h2>8. Evästeet ja verkkosivuston analytiikka</h2>
      <p>
        <span className="legal-placeholder">
          [Kuvaa sivustolla käytettävät evästeet tai analytiikkatyökalut, esim.
          Google Analytics, ja linkitä evästekäytäntöön tai suostumusbanneriin,
          jos käytössä.]
        </span>
      </p>

      <h2>9. Muutokset tähän selosteeseen</h2>
      <p>
        Voimme päivittää tätä selostetta ajoittain. Olennaiset muutokset näkyvät
        yllä olevan "Päivitetty viimeksi" -päivämäärän muutoksena.
      </p>

      <h2>10. Yhteystiedot</h2>
      <p>
        Kysymykset tästä selosteesta tai tiedoistasi voi lähettää osoitteeseen{" "}
        <span className="legal-placeholder">
          [tietosuojayhteyshenkilön sähköposti]
        </span>
        .
      </p>
    </div>
  );
}

export default PrivacyFi;
