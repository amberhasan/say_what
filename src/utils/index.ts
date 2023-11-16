import {capitalize} from 'lodash';

export const formattedSubcategory = (subcategory: string) => {
  return subcategory
    .split('_')
    .map((item: string) => capitalize(item))
    .join(' ');
};
