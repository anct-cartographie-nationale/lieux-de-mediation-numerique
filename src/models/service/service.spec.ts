import { describe, expect, it } from 'vitest';
import { Service, Services } from './service';

describe('service model', (): void => {
  it('should create valid services', (): void => {
    const services: Services = Services([Service.AccesInternetEtMaterielInformatique]);

    expect(services).toStrictEqual([Service.AccesInternetEtMaterielInformatique]);
  });

  it('should not create invalid services', (): void => {
    expect(Services.safe(['Sécuriser son ordinateur ou son téléphone' as Service])).toBeNull();
  });

  it('should not create invalid services containing a valid and an invalid value', (): void => {
    expect(
      Services.safe([Service.AccesInternetEtMaterielInformatique, 'Sécuriser son ordinateur ou son téléphone' as Service])
    ).toBeNull();
  });

  it('should accept an empty list, which the cartography assembly refuses on its own', (): void => {
    expect(Services([])).toStrictEqual([]);
  });
});
