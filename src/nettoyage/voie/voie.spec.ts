import { describe, it, expect } from 'vitest';
import { nettoyerVoie } from './voie';

describe('nettoyerVoie', (): void => {
  it('should expand street type abbreviations, which the reference scores better', (): void => {
    expect(nettoyerVoie('12 Av de la Gare')).toBe('12 Avenue de la Gare');
    expect(nettoyerVoie('3 Bd Voltaire')).toBe('3 Boulevard Voltaire');
    expect(nettoyerVoie('1 Pl de la Liberte')).toBe('1 Place de la Liberte');
  });

  it('should expand an abbreviation whatever its case, and a trailing dot', (): void => {
    expect(nettoyerVoie('All des Roses')).toBe('Allée des Roses');
    expect(nettoyerVoie('ALL DES ROSES')).toBe('Allée DES ROSES');
    expect(nettoyerVoie('AV. de la Gare')).toBe('Avenue de la Gare');
  });

  it('should expand the abbreviations the reference spells out in full', (): void => {
    expect(nettoyerVoie('4 PLACE HOTEL VILLE ESP LIBERATION')).toBe('4 PLACE HOTEL VILLE Esplanade LIBERATION');
    expect(nettoyerVoie('39 RUE GEN DUFIEUX')).toBe('39 RUE Général DUFIEUX');
    expect(nettoyerVoie('25 Avenue Cdt Dumont')).toBe('25 Avenue Commandant Dumont');
    expect(nettoyerVoie('2 Place DU DOC LAZARE GOUJON')).toBe('2 Place DU Docteur LAZARE GOUJON');
  });

  it('should expand these abbreviations whatever their case', (): void => {
    expect(nettoyerVoie('3 rue du gen Leclerc')).toBe('3 rue du Général Leclerc');
    expect(nettoyerVoie('5 place du Doc. Roux')).toBe('5 place du Docteur Roux');
    expect(nettoyerVoie('1 esp des Arts')).toBe('1 Esplanade des Arts');
  });

  it('should expand the other abbreviations met in the field', (): void => {
    expect(nettoyerVoie('207 CHS DU 24EME TERRITORIAL')).toBe('207 Chaussée DU 24EME TERRITORIAL');
    expect(nettoyerVoie('30 Rue du Pr Andre Beaudoing')).toBe('30 Rue du Professeur Andre Beaudoing');
    expect(nettoyerVoie('4 Av de la Gde Duchesse Charlotte')).toBe('4 Avenue de la Grande Duchesse Charlotte');
    expect(nettoyerVoie('RPT DES SOURCES DE LA VENDEE')).toBe('Rond-point DES SOURCES DE LA VENDEE');
    expect(nettoyerVoie('Prom Villard Valmar')).toBe('Promenade Villard Valmar');
    expect(nettoyerVoie('QUA KOUTROUZATSINI')).toBe('Quartier KOUTROUZATSINI');
  });

  it('should read QU as a quartier, which is what the field means by it', (): void => {
    expect(nettoyerVoie('QU. DARBOUSSON 201 CHEMIN DE FAVEYROLLES')).toBe('Quartier DARBOUSSON 201 CHEMIN DE FAVEYROLLES');
  });

  it('should expand an ambiguous abbreviation when it opens the voie or follows the number', (): void => {
    expect(nettoyerVoie('PAS DES ECOLES')).toBe('Passage DES ECOLES');
    expect(nettoyerVoie('11 Pas de la Mairie')).toBe('11 Passage de la Mairie');
    expect(nettoyerVoie('54 PRO DES LICES')).toBe('54 Promenade DES LICES');
    expect(nettoyerVoie('12 B AVE FOCH')).toBe('12 B Avenue FOCH');
    expect(nettoyerVoie('QU COSMES 23 AVENUE GEORGES POMPIDOU')).toBe('Quartier COSMES 23 AVENUE GEORGES POMPIDOU');
  });

  it.each([
    ["2 Rue de l'Ave Maria"],
    ['Allée des Petits Pas'],
    ['12 rue de la Zone Pro'],
    ['POLE DE SERVICES - QU LES OLIVIERS 30 AVENUE DE ZELZATE']
  ])('should leave %s alone, an ambiguous abbreviation being a word anywhere else', (voie: string): void => {
    expect(nettoyerVoie(voie)).toBe(voie);
  });

  it('should part an abbreviation from the name its dot is glued to', (): void => {
    expect(nettoyerVoie('Avenue du Dr.Monmont')).toBe('Avenue du Docteur Monmont');
  });

  it('should not expand an abbreviation glued to anything but a name', (): void => {
    expect(nettoyerVoie('mairie@st.fr')).toBe('mairie@st.fr');
    expect(nettoyerVoie('12 av.de la Gare')).toBe('12 av.de la Gare');
  });

  it('should not mistake the start of a word for an abbreviation', (): void => {
    expect(nettoyerVoie('Allee des Roses')).toBe('Allee des Roses');
  });

  it('should join a bis, ter or quater suffix to its number', (): void => {
    expect(nettoyerVoie('1 bis rue des Ajoncs')).toBe('1bis rue des Ajoncs');
    expect(nettoyerVoie('12 TER avenue Foch')).toBe('12ter avenue Foch');
  });

  it('should drop a zero house number', (): void => {
    expect(nettoyerVoie('0 Rue de la Paix')).toBe('Rue de la Paix');
  });

  it('should drop a null prefix left by a serialisation', (): void => {
    expect(nettoyerVoie('null 12 avenue des Fleurs')).toBe('12 avenue des Fleurs');
  });

  it('should empty a voie that is only a postal code', (): void => {
    expect(nettoyerVoie('75001')).toBe('');
    expect(nettoyerVoie('75001 Paris')).toBe('');
  });

  it('should cut what follows a postal code', (): void => {
    expect(nettoyerVoie('12 rue de la Gare 75009 Paris')).toBe('12 rue de la Gare');
  });

  it('should drop forbidden characters', (): void => {
    expect(nettoyerVoie('12 rue "des" Marronniers')).toBe('12 rue des Marronniers');
  });

  it('should repair a latin-1 reading of utf-8 bytes', (): void => {
    expect(nettoyerVoie('2 rue du Caf\u00c3\u00a9')).toBe('2 rue du Café');
  });

  it('should never throw', (): void => {
    expect(nettoyerVoie('')).toBe('');
  });

  it.each([['LOT Le Clos d Achille'], ['12 LOT des Mimosas'], ['16 Avenue du LOT']])(
    'should leave %s alone, the reference scoring it better abbreviated',
    (voie: string): void => {
      expect(nettoyerVoie(voie)).toBe(voie);
    }
  );
});
