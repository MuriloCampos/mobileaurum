/* eslint-disable no-extra-semi */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Customer from './Customer';
import Historical from './Historical';

export default interface Lawsuit {
  id: string;
  type: string;
  number: string;
  file: string;
  customers: Customer[];
  title: string;
  court: string;
  lawsuitType: string;
  amount: 10000;
  historicals: Historical[];
  active?: boolean;
  isAutomatic?: boolean;
};
