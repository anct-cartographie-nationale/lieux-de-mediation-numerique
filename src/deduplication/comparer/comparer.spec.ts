import { describe, it, expect } from 'vitest';
import { Typologie } from '../../models';
import { comparer, Comparaison, LieuAComparer } from './comparer';

const mediatheque: LieuAComparer = {
  nom: 'Médiathèque de Fleury',
  adresse: '1 place du Général de Gaulle',
  codeInsee: '75101',
  localisation: { latitude: 48.869, longitude: 2.331 }
};

const memeEndroit = (nom: string): LieuAComparer => ({ ...mediatheque, nom });

const scoreDuNom = (un: string, autre: string): number => comparer(memeEndroit(un), memeEndroit(autre)).nom;

describe('comparer', (): void => {
  it('should hold no veto and score high for the very same lieu', (): void => {
    const comparaison: Comparaison = comparer(mediatheque, mediatheque);

    expect(comparaison.vetos).toEqual([]);
    expect(comparaison.score).toBe(100);
  });

  describe('ressemblance des dénominations', (): void => {
    it('should be total between two identical denominations', (): void => {
      expect(scoreDuNom('mediatheque municipale', 'mediatheque municipale')).toBe(100);
    });

    it('should be null between two denominations without any common character', (): void => {
      expect(scoreDuNom('abc', 'xyz')).toBe(0);
    });

    it('should tolerate a missing character', (): void => {
      expect(scoreDuNom('mediatheque', 'mediathque')).toBe(95);
    });

    it('should be symmetric', (): void => {
      expect(scoreDuNom('mediatheque de fleury', 'fleury mediatheque')).toBe(
        scoreDuNom('fleury mediatheque', 'mediatheque de fleury')
      );
    });

    it('should decrease as the denominations diverge', (): void => {
      expect(scoreDuNom('ville de fleury', 'ville fleury')).toBeGreaterThan(
        scoreDuNom('ville de fleury', 'mediatheque de fleury')
      );
    });

    describe('bornée par l’écart absolu', (): void => {
      const unGabarit: string = 'moselle fibre ateliers organises a la mairie de launstroff';
      const leMemeGabarit: string = 'moselle fibre ateliers ponctuels organises a la mairie de montenach';

      it('should not let a shared boilerplate carry two unrelated denominations', (): void => {
        expect(scoreDuNom(unGabarit, leMemeGabarit)).toBeLessThan(50);
      });

      it('should still bring together two long denominations that differ by little', (): void => {
        expect(scoreDuNom('communaute de communes du pays sabolien', 'communaute de communes pays sabolien')).toBeGreaterThan(
          90
        );
      });

      it('should leave short denominations to the proportional measure', (): void => {
        expect(scoreDuNom('abc', 'xyz')).toBe(0);
      });

      it('should cap two denominations by their edit distance, not by their length', (): void => {
        expect(scoreDuNom(unGabarit, leMemeGabarit)).toBeLessThan(scoreDuNom('mediatheque', 'mediathque'));
      });
    });

    describe('formes équivalentes', (): void => {
      it('should ignore case, accents and punctuation', (): void => {
        expect(scoreDuNom('MAIRIE DU PRÊCHEUR', 'Mairie du Precheur')).toBe(100);
      });

      it.each([
        ['Commune de Fleury', 'Mairie de Fleury'],
        ['Hôtel de ville de Fleury', 'Ville de Fleury'],
        ['Conseil départemental du Rhône', 'Département du Rhône']
      ])('should treat %s and %s as the same denomination', (un: string, autre: string): void => {
        expect(scoreDuNom(un, autre)).toBe(100);
      });

      it.each([
        ['St Denis', 'Saint Denis'],
        ['Ste Marie', 'Sainte Marie'],
        ['Ctre social des Sablons', 'Centre social des Sablons'],
        ['Asso Trait d’Union', 'Association Trait d’Union']
      ])('should expand %s to match %s', (abrege: string, complet: string): void => {
        expect(scoreDuNom(abrege, complet)).toBe(100);
      });

      it.each([
        ['Centre social', 'Centres sociaux'],
        ['Atelier numérique', 'Ateliers numériques'],
        ['Maison rurale', 'Maisons rurales'],
        ['Service municipal', 'Services municipaux']
      ])('should bring the inflections of %s and %s together', (singulier: string, pluriel: string): void => {
        expect(scoreDuNom(singulier, pluriel)).toBe(100);
      });

      it('should leave short terms untouched', (): void => {
        expect(scoreDuNom('pays', 'pay')).toBeLessThan(100);
      });

      it('should keep distinct words apart', (): void => {
        expect(scoreDuNom('communal', 'commune')).toBeLessThan(100);
      });
    });
  });

  describe('vetos', (): void => {
    it('should refuse a service and the entity that hosts it, at the same address', (): void => {
      expect(comparer(mediatheque, memeEndroit('Mairie de Fleury')).vetos).toContain('typologies-incompatibles');
    });

    it('should refuse two lieux of different communes', (): void => {
      expect(comparer(mediatheque, { ...mediatheque, codeInsee: '44109' }).vetos).toContain('commune-differente');
    });

    it.each([
      ['75056', '75118'],
      ['75101', '75118'],
      ['69123', '69381'],
      ['13055', '13201']
    ])('should not separate %s from %s, which are the same city', (un: string, autre: string): void => {
      expect(comparer({ ...mediatheque, codeInsee: un }, { ...mediatheque, codeInsee: autre }).vetos).not.toContain(
        'commune-differente'
      );
    });

    it.each([
      ['75121', '75056'],
      ['69390', '69123']
    ])('should still separate %s from %s, just outside the district range', (un: string, autre: string): void => {
      expect(comparer({ ...mediatheque, codeInsee: un }, { ...mediatheque, codeInsee: autre }).vetos).toContain(
        'commune-differente'
      );
    });

    it.each([[null], [undefined], ['']])('should refuse to conclude without a commune (%s)', (codeInsee): void => {
      expect(comparer({ ...mediatheque, codeInsee }, mediatheque).vetos).toContain('commune-differente');
    });

    it.each([['[Non diffusible]'], ['NON DIFFUSIBLE'], ['Non communiqué'], ['inconnu'], [''], ['   '], ['---']])(
      'should refuse a lieu whose denomination designates nothing (%s)',
      (nom: string): void => {
        expect(comparer(mediatheque, memeEndroit(nom)).vetos).toContain('sans-identite');
      }
    );

    it('should refuse two lieux of the same source by default', (): void => {
      expect(comparer({ ...mediatheque, source: 'coop' }, { ...mediatheque, source: 'coop' }).vetos).toContain('meme-source');
    });

    it('should allow two lieux of the same source when the consumer asks for it', (): void => {
      expect(
        comparer({ ...mediatheque, source: 'coop' }, { ...mediatheque, source: 'coop' }, { allowInternalMerge: true }).vetos
      ).toEqual([]);
    });

    it('should not refuse compatible typologies', (): void => {
      const relais: LieuAComparer = { ...mediatheque, nom: 'Relais', typologies: [Typologie.RFS] };
      const pimms: LieuAComparer = { ...mediatheque, nom: 'Relais', typologies: [Typologie.PIMMS] };

      expect(comparer(relais, pimms).vetos).toEqual([]);
    });

    it('should not refuse when neither denomination reveals a typologie', (): void => {
      expect(comparer(memeEndroit('Espace Jean Moulin'), memeEndroit('Espace Jean Moulin')).vetos).toEqual([]);
    });

    it('should prefer the declared typologie over the one inferred from the name', (): void => {
      expect(comparer({ ...mediatheque, typologies: [Typologie.MUNI] }, memeEndroit('Mairie de Fleury')).vetos).not.toContain(
        'typologies-incompatibles'
      );
    });

    it('should refuse a pair that nothing situates', (): void => {
      const nonDiffusible: LieuAComparer = {
        nom: 'Association Trait d’Union',
        adresse: '[Non diffusible]',
        codeInsee: '75101'
      };

      expect(comparer(nonDiffusible, { ...nonDiffusible }).vetos).toContain('sans-emplacement');
    });

    it('should refuse a pair where only one address is known and nothing else situates it', (): void => {
      const connue: LieuAComparer = { nom: 'Association Trait d’Union', adresse: '1 rue de la Paix', codeInsee: '75101' };

      expect(comparer(connue, { ...connue, adresse: '[Non diffusible]' }).vetos).toContain('sans-emplacement');
    });

    it('should accept a pair without a comparable address when coordinates still situate it', (): void => {
      const nonDiffusible: LieuAComparer = {
        nom: 'Association Trait d’Union',
        adresse: '[Non diffusible]',
        codeInsee: '75101',
        localisation: { latitude: 48.869, longitude: 2.331 }
      };

      expect(comparer(nonDiffusible, { ...nonDiffusible }).vetos).toEqual([]);
    });
  });

  describe('emplacement', (): void => {
    const aLaDistance = (latitude: number, longitude: number): Comparaison =>
      comparer(mediatheque, { ...mediatheque, localisation: { latitude, longitude } });

    it('should be null between a point and itself', (): void => {
      expect(comparer(mediatheque, mediatheque).distance).toBe(0);
    });

    it('should measure a short distance in metres', (): void => {
      const distance: number = aLaDistance(48.8692, 2.331).distance ?? Number.POSITIVE_INFINITY;

      expect(distance).toBeGreaterThan(20);
      expect(distance).toBeLessThan(25);
    });

    it('should measure a long distance in metres', (): void => {
      const distance: number = aLaDistance(45.764, 4.8357).distance ?? 0;

      expect(distance / 1000).toBeGreaterThan(390);
      expect(distance / 1000).toBeLessThan(400);
    });

    it('should not let the threshold drift with latitude', (): void => {
      const enMetropole: number =
        comparer(
          { ...mediatheque, localisation: { latitude: 50.63, longitude: 3.06 } },
          { ...mediatheque, localisation: { latitude: 50.63, longitude: 3.061 } }
        ).distance ?? 0;
      const auxAntilles: number =
        comparer(
          { ...mediatheque, localisation: { latitude: 14.6, longitude: -61.08 } },
          { ...mediatheque, localisation: { latitude: 14.6, longitude: -61.079 } }
        ).distance ?? 0;

      expect(auxAntilles).toBeGreaterThan(enMetropole * 1.5);
    });

    it('should score the distance as identical below fifty metres', (): void => {
      expect(aLaDistance(48.8692, 2.331).distance).toBeLessThan(50);
      expect(aLaDistance(48.8692, 2.331).score).toBe(100);
    });

    it('should decrease the score as the lieux drift apart', (): void => {
      expect(aLaDistance(48.871, 2.331).score).toBeLessThan(comparer(mediatheque, mediatheque).score);
    });
  });

  describe('composantes indisponibles', (): void => {
    it('should omit the distance when a localisation is missing', (): void => {
      expect(comparer(mediatheque, { ...mediatheque, localisation: null })).not.toHaveProperty('distance');
    });

    it('should not let a missing localisation inflate the score', (): void => {
      const loin: LieuAComparer = { ...mediatheque, nom: 'Médiathèque Jean Moulin', localisation: null };

      expect(comparer(mediatheque, loin).score).toBeLessThan(100);
    });

    it('should omit the address when it designates nothing on either side', (): void => {
      expect(comparer(mediatheque, { ...mediatheque, adresse: '[Non diffusible]' })).not.toHaveProperty('adresse');
    });

    it('should compare two addresses written differently', (): void => {
      expect(comparer(mediatheque, { ...mediatheque, adresse: '1, Place du Général de Gaulle' }).adresse).toBe(100);
    });
  });

  describe('scores', (): void => {
    it('should not let a shared address carry a pair whose names diverge', (): void => {
      const comparaison: Comparaison = comparer(memeEndroit('Alpha'), memeEndroit('Zoulou Kilo Bravo'));

      expect(comparaison.adresse).toBe(100);
      expect(comparaison.distance).toBe(0);
      expect(comparaison.nom).toBeLessThan(25);
      expect(comparaison.score).toBeLessThan(60);
    });

    it('should balance the name against the whole location', (): void => {
      const memeNomAilleurs: Comparaison = comparer(mediatheque, {
        ...mediatheque,
        adresse: '99 avenue Ailleurs',
        localisation: { latitude: 48.9, longitude: 2.4 }
      });
      const memeEndroitAutreNom: Comparaison = comparer(mediatheque, memeEndroit('Zoulou Kilo Bravo'));

      expect(Math.abs(memeNomAilleurs.score - memeEndroitAutreNom.score)).toBeLessThan(10);
      expect(memeNomAilleurs.score).toBeLessThan(70);
      expect(memeEndroitAutreNom.score).toBeLessThan(70);
    });

    it('should spread the weights over what could be measured', (): void => {
      const sansCoordonnees: LieuAComparer = { ...mediatheque, localisation: null, nom: 'Alpha' };
      const comparaison: Comparaison = comparer(sansCoordonnees, { ...sansCoordonnees, nom: 'Zoulou Kilo Bravo' });

      expect(comparaison).not.toHaveProperty('distance');
      expect(comparaison.score).toBe(Math.round((2 * comparaison.nom + 100) / 3));
    });

    it('should keep scoring a pair that a veto has refused', (): void => {
      const comparaison: Comparaison = comparer(mediatheque, memeEndroit('Mairie de Fleury'));

      expect(comparaison.vetos).not.toEqual([]);
      expect(comparaison.score).toBeGreaterThan(0);
    });
  });
});
