import {capitalize} from 'lodash';

export const formattedSubcategory = (subcategory: string) => {
  let text = subcategory
    .split('_')
    .map((item: string) => capitalize(item))
    .join(' ')
    .split('dot')
    .join('.')
    .split('apostrophe')
    .join(`'`);
  if (text === 'Gno' || text === 'Nye') {
    text = text.toUpperCase();
  }
  return text;
};
