import { describe, it, expect } from 'vitest';
import { DispositifProgrammeNational, DispositifProgrammesNationaux } from '../dispositif-programme-national';
import { Frais, FraisACharge } from '../frais-a-charge';
import { Itinerance, Itinerances } from '../itinerance';
import { ModaliteAcces, ModalitesAcces } from '../modalite-acces';
import { PublicSpecifiquementAdresse, PublicsSpecifiquementAdresses } from '../publics-specifiquement-adresses';
import { Typologie, Typologies } from './typologie';

/**
 * La bibliothèque ne dédupliquait que `Services` et `ModalitesAccompagnement`, un écart qui ne
 * tenait qu'à l'ordre dans lequel les modèles ont été écrits.
 */
describe('every closed vocabulary deduplicates', (): void => {
  it('should deduplicate typologies', (): void => {
    expect(Typologies([Typologie.CCAS, Typologie.CCAS, Typologie.MJC])).toStrictEqual([Typologie.CCAS, Typologie.MJC]);
  });

  it('should deduplicate frais a charge', (): void => {
    expect(FraisACharge([Frais.Gratuit, Frais.Gratuit])).toStrictEqual([Frais.Gratuit]);
  });

  it('should deduplicate itinerances', (): void => {
    expect(Itinerances([Itinerance.Fixe, Itinerance.Fixe])).toStrictEqual([Itinerance.Fixe]);
  });

  it('should deduplicate modalites acces', (): void => {
    expect(ModalitesAcces([ModaliteAcces.Telephoner, ModaliteAcces.Telephoner])).toStrictEqual([ModaliteAcces.Telephoner]);
  });

  it('should deduplicate publics specifiquement adresses', (): void => {
    expect(
      PublicsSpecifiquementAdresses([PublicSpecifiquementAdresse.Jeunes, PublicSpecifiquementAdresse.Jeunes])
    ).toStrictEqual([PublicSpecifiquementAdresse.Jeunes]);
  });

  it('should deduplicate dispositifs', (): void => {
    expect(
      DispositifProgrammesNationaux([DispositifProgrammeNational.FranceServices, DispositifProgrammeNational.FranceServices])
    ).toStrictEqual([DispositifProgrammeNational.FranceServices]);
  });
});
