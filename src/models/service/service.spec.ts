import { Service, Services } from './service';
import { ServicesError } from './errors';

describe('service model', (): void => {
  it('should create valid services', (): void => {
    const services: Services = Services([Service.AccederADuMateriel]);

    expect(services).toStrictEqual([Service.AccederADuMateriel]);
  });

  it('should not create invalid services', (): void => {
    expect((): void => {
      Services(['Sécuriser son ordinateur ou son téléphone' as Service]);
    }).toThrow(new ServicesError('Sécuriser son ordinateur ou son téléphone' as Service));
  });

  it('should not create invalid services containing a valid and an invalid value', (): void => {
    expect((): void => {
      Services([Service.AccederADuMateriel, 'Sécuriser son ordinateur ou son téléphone' as Service]);
    }).toThrow(new ServicesError('Sécuriser son ordinateur ou son téléphone' as Service));
  });
});
