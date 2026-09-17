export const dateMajSiLisible = (dateMaj?: Date | string | null): { date_maj?: Date } => {
  if (dateMaj == null) return {};

  const date: Date = dateMaj instanceof Date ? dateMaj : new Date(dateMaj);

  return Number.isNaN(date.getTime()) ? {} : { date_maj: date };
};
