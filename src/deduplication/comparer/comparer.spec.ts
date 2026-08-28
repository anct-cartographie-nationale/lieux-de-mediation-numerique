import { describe, it, expect } from 'vitest';
import { Typologie } from '../../models';
import { comparer, Comparaison, ComparaisonMesuree, LieuAComparer, OptionsComparaison, preparer } from './comparer';

const mediatheque: LieuAComparer = {
  nom: 'Médiathèque de Fleury',
  adresse: '1 place du Général de Gaulle',
  codeInsee: '75101',
  localisation: { latitude: 48.869, longitude: 2.331 }
};

const comparerLieux = (un: LieuAComparer, autre: LieuAComparer, options?: OptionsComparaison): Comparaison =>
  comparer(preparer(un), preparer(autre), options);

const mesurerLieux = (un: LieuAComparer, autre: LieuAComparer, options?: OptionsComparaison): ComparaisonMesuree =>
  ((comparaison: Comparaison): ComparaisonMesuree => {
    if (!('score' in comparaison)) throw new Error(`comparaison refusée : ${comparaison.vetos.join(', ')}`);
    return comparaison;
  })(comparerLieux(un, autre, options));

describe('comparer', (): void => {
  it('should hold no veto and score high for the very same lieu', (): void => {
    const comparaison: Comparaison = comparerLieux(mediatheque, mediatheque);

    expect(comparaison.vetos).toEqual([]);
    expect(comparaison.score).toBe(100);
  });

  it('should raise the name score for equivalent administrative denominations', (): void => {
    const commune: LieuAComparer = { ...mediatheque, nom: 'Commune de Fleury' };
    const mairie: LieuAComparer = { ...mediatheque, nom: 'Mairie de Fleury' };

    expect(mesurerLieux(commune, mairie).nom).toBe(100);
  });

  describe('vetos', (): void => {
    it('should refuse a service and the entity that hosts it, at the same address', (): void => {
      const mairie: LieuAComparer = { ...mediatheque, nom: 'Mairie de Fleury' };

      expect(comparerLieux(mediatheque, mairie).vetos).toContain('typologies-incompatibles');
    });

    it('should refuse two lieux of different communes', (): void => {
      const aNantes: LieuAComparer = { ...mediatheque, codeInsee: '44109' };

      expect(comparerLieux(mediatheque, aNantes).vetos).toContain('commune-differente');
    });

    it('should not refuse two municipal districts of the same city', (): void => {
      const autreArrondissement: LieuAComparer = { ...mediatheque, codeInsee: '75118' };

      expect(comparerLieux(mediatheque, autreArrondissement).vetos).not.toContain('commune-differente');
    });

    it('should refuse a lieu whose denomination designates nothing', (): void => {
      const anonyme: LieuAComparer = { ...mediatheque, nom: '[Non diffusible]' };

      expect(comparerLieux(mediatheque, anonyme).vetos).toContain('sans-identite');
    });

    it('should refuse two lieux of the same source by default', (): void => {
      const une: LieuAComparer = { ...mediatheque, source: 'coop' };
      const autre: LieuAComparer = { ...mediatheque, source: 'coop' };

      expect(comparerLieux(une, autre).vetos).toContain('meme-source');
    });

    it('should allow two lieux of the same source when the consumer asks for it', (): void => {
      const une: LieuAComparer = { ...mediatheque, source: 'coop' };
      const autre: LieuAComparer = { ...mediatheque, source: 'coop' };

      expect(comparerLieux(une, autre, { allowInternalMerge: true }).vetos).toEqual([]);
    });

    it('should not refuse compatible typologies', (): void => {
      const relais: LieuAComparer = { ...mediatheque, nom: 'Relais', typologies: [Typologie.RFS] };
      const pimms: LieuAComparer = { ...mediatheque, nom: 'Relais', typologies: [Typologie.PIMMS] };

      expect(comparerLieux(relais, pimms).vetos).toEqual([]);
    });

    it('should not refuse when neither denomination reveals a typologie', (): void => {
      const une: LieuAComparer = { ...mediatheque, nom: 'Espace Jean Moulin' };
      const autre: LieuAComparer = { ...mediatheque, nom: 'Espace Jean Moulin' };

      expect(comparerLieux(une, autre).vetos).toEqual([]);
    });

    it('should prefer the declared typologie over the one inferred from the name', (): void => {
      const declaree: LieuAComparer = { ...mediatheque, typologies: [Typologie.MUNI] };
      const mairie: LieuAComparer = { ...mediatheque, nom: 'Mairie de Fleury' };

      expect(comparerLieux(declaree, mairie).vetos).not.toContain('typologies-incompatibles');
    });
  });

  describe('composantes indisponibles', (): void => {
    it('should omit the distance when a localisation is missing', (): void => {
      const sansLocalisation: LieuAComparer = { ...mediatheque, localisation: null };

      expect(comparerLieux(mediatheque, sansLocalisation)).not.toHaveProperty('distance');
    });

    it('should not let a missing localisation inflate the score', (): void => {
      const loin: LieuAComparer = {
        ...mediatheque,
        nom: 'Médiathèque Jean Moulin',
        localisation: { latitude: 48.9, longitude: 2.4 }
      };
      const sansLocalisation: LieuAComparer = { ...loin, localisation: null };

      expect(mesurerLieux(mediatheque, sansLocalisation).score).toBeLessThan(100);
    });

    it('should refuse a pair that nothing situates', (): void => {
      const nonDiffusible: LieuAComparer = {
        nom: 'Association Trait d’Union',
        adresse: '[Non diffusible]',
        codeInsee: '75101'
      };

      expect(comparerLieux(nonDiffusible, { ...nonDiffusible }).vetos).toContain('sans-emplacement');
    });

    it('should refuse a pair where only one address is known and nothing else situates it', (): void => {
      const connue: LieuAComparer = { nom: 'Association Trait d’Union', adresse: '1 rue de la Paix', codeInsee: '75101' };
      const inconnue: LieuAComparer = { ...connue, adresse: '[Non diffusible]' };

      expect(comparerLieux(connue, inconnue).vetos).toContain('sans-emplacement');
    });

    it('should accept a pair without a comparable address when coordinates still situate it', (): void => {
      const nonDiffusible: LieuAComparer = {
        nom: 'Association Trait d’Union',
        adresse: '[Non diffusible]',
        codeInsee: '75101',
        localisation: { latitude: 48.869, longitude: 2.331 }
      };

      expect(comparerLieux(nonDiffusible, { ...nonDiffusible }).vetos).toEqual([]);
    });

    it('should omit the address when it designates nothing on either side', (): void => {
      const nonDiffusible: LieuAComparer = { ...mediatheque, adresse: '[Non diffusible]' };

      expect(comparerLieux(mediatheque, nonDiffusible)).not.toHaveProperty('adresse');
      expect(comparerLieux(nonDiffusible, { ...nonDiffusible })).not.toHaveProperty('adresse');
    });
  });

  describe('scores', (): void => {
    it('should score the distance as identical below fifty metres', (): void => {
      const aVingtMetres: LieuAComparer = { ...mediatheque, localisation: { latitude: 48.8692, longitude: 2.331 } };

      expect(mesurerLieux(mediatheque, aVingtMetres).distance).toBeLessThan(50);
      expect(mesurerLieux(mediatheque, aVingtMetres).score).toBe(100);
    });

    it('should decrease the score as the lieux drift apart', (): void => {
      const aDeuxCentsMetres: LieuAComparer = { ...mediatheque, localisation: { latitude: 48.871, longitude: 2.331 } };

      expect(mesurerLieux(mediatheque, aDeuxCentsMetres).score).toBeLessThan(mesurerLieux(mediatheque, mediatheque).score);
    });

    it('should not let a shared address carry a pair whose names diverge', (): void => {
      const alpha: LieuAComparer = { ...mediatheque, nom: 'Alpha' };
      const bravo: LieuAComparer = { ...mediatheque, nom: 'Zoulou Kilo Bravo' };
      const comparaison: ComparaisonMesuree = mesurerLieux(alpha, bravo);

      expect(comparaison.adresse).toBe(100);
      expect(comparaison.distance).toBe(0);
      expect(comparaison.nom).toBeLessThan(25);
      expect(comparaison.score).toBeLessThan(60);
    });

    it('should balance the name against the whole location', (): void => {
      const memeNomAilleurs: ComparaisonMesuree = mesurerLieux(mediatheque, {
        ...mediatheque,
        adresse: '99 avenue Ailleurs',
        localisation: { latitude: 48.9, longitude: 2.4 }
      });
      const memeEndroitAutreNom: ComparaisonMesuree = mesurerLieux(mediatheque, { ...mediatheque, nom: 'Zoulou Kilo Bravo' });

      expect(Math.abs(memeNomAilleurs.score - memeEndroitAutreNom.score)).toBeLessThan(10);
      expect(memeNomAilleurs.score).toBeLessThan(70);
      expect(memeEndroitAutreNom.score).toBeLessThan(70);
    });

    it('should spread the weights over what could be measured', (): void => {
      const sansCoordonnees: LieuAComparer = { ...mediatheque, localisation: null, nom: 'Alpha' };
      const autre: LieuAComparer = { ...sansCoordonnees, nom: 'Zoulou Kilo Bravo' };
      const comparaison: ComparaisonMesuree = mesurerLieux(sansCoordonnees, autre);

      expect(comparaison).not.toHaveProperty('distance');
      expect(comparaison.score).toBe(Math.round((2 * comparaison.nom + 100) / 3));
    });

    it('should not score a pair that a veto has refused', (): void => {
      const mairie: LieuAComparer = { ...mediatheque, nom: 'Mairie de Fleury' };
      const comparaison: Comparaison = comparerLieux(mediatheque, mairie);

      expect(comparaison.vetos).not.toEqual([]);
      expect(comparaison).not.toHaveProperty('score');
      expect(comparaison).not.toHaveProperty('nom');
    });
  });
});
