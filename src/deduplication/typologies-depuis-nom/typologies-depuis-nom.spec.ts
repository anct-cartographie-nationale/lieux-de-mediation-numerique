import { describe, it, expect } from 'vitest';
import { Typologie } from '../../models';
import { typologiesDepuisNom } from './typologies-depuis-nom';

describe('typologiesDepuisNom', (): void => {
  it.each([
    ['EPN de Fleury', Typologie.EPN],
    ['Espace Public Numérique', Typologie.EPN],
    ['Cyberbase de Laval', Typologie.EPN],
    ['Cyberespace municipal', Typologie.EPN],
    ['Médiathèque de Fleury', Typologie.BIB],
    ['Bibliothèque municipale', Typologie.BIB],
    ['Commune de Fleury', Typologie.MUNI],
    ['Mairie de Fleury', Typologie.MUNI],
    ['Hôtel de ville de Fleury', Typologie.MUNI],
    ['CCAS de Laval', Typologie.CCAS],
    ['Mission locale du Chablais', Typologie.ML],
    ['MJC de Thonon', Typologie.MJC],
    ['Fablab de Nantes', Typologie.FABLAB],
    ['France Services de Vaison', Typologie.RFS],
    ['Maison de quartier des Sablons', Typologie.MQ],
    ['La Poste de Fleury', Typologie.LA_POSTE]
  ])('should infer a typologie from %s', (nom: string, attendue: Typologie): void => {
    expect(typologiesDepuisNom(nom)).toContain(attendue);
  });

  it('should infer nothing from a denomination that says nothing about its kind', (): void => {
    expect(typologiesDepuisNom('Espace Jean Moulin')).toEqual([]);
  });

  it('should not repeat a typologie matched by several expressions', (): void => {
    expect(typologiesDepuisNom('Médiathèque et bibliothèque de Fleury')).toEqual([Typologie.BIB]);
  });

  it('should separate a service from the entity that hosts it', (): void => {
    expect(typologiesDepuisNom('EPN de Fleury')).not.toEqual(typologiesDepuisNom('Commune de Fleury'));
  });
});
