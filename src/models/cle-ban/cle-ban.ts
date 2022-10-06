import { Model } from '../model';
import { CleBanError } from './errors';

export type CleBan = Model<'CleBan', string>;

const throwCleBanError = (cleBanNumber: string): CleBan => {
  throw new CleBanError(cleBanNumber);
};

const CLE_BAN_REG_EXP: RegExp = /^\d[\dAB]\d{3}_[a-z\d]{4,}_\d{5}$/u;

export const isCleBan = (cleBan: string): cleBan is CleBan => CLE_BAN_REG_EXP.test(cleBan);

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const CleBan = (cleBan: string): CleBan => (isCleBan(cleBan) ? cleBan : throwCleBanError(cleBan));
