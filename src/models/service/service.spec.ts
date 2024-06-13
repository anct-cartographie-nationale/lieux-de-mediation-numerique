import { Service, Services } from './service';
import { ServicesError } from './errors';

describe('service model', (): void => {
  it('should create valid services', (): void => {
    const services: Services = Services([Service.AccesInternetEtMaterielInformatique]);

    expect(services).toStrictEqual([Service.AccesInternetEtMaterielInformatique]);
  });

  it('should not create invalid services', (): void => {
    expect((): void => {
      Services(['Sécuriser son ordinateur ou son téléphone' as Service]);
    }).toThrow(new ServicesError('Sécuriser son ordinateur ou son téléphone' as Service));
  });

  it('should not create invalid services containing a valid and an invalid value', (): void => {
    expect((): void => {
      Services([Service.AccesInternetEtMaterielInformatique, 'Sécuriser son ordinateur ou son téléphone' as Service]);
    }).toThrow(new ServicesError('Sécuriser son ordinateur ou son téléphone' as Service));
  });

  it('should have at least one value to be valid services', (): void => {
    expect((): void => {
      Services([]);
    }).toThrow(new ServicesError('service indéfini'));
  });
});
