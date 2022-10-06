import { Service, ServiceIndefini } from '../service';

export class ServicesError extends Error {
  constructor(service: Service | ServiceIndefini) {
    super(`Le service '${service}' n'est pas une valeur admise`);
  }
}
