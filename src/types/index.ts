type BillionaireInfo = {
  age: number;
  bioSuppress: boolean;
  bios: string[];
  birthDate: number;
  category: string;
  city: string;
  country: string;
  countryOfCitizenship: string;
  csfDisplayFields: string[];
  date: number;
  familyList: boolean;
  finalWorth: number;
  firstName: string;
  gender: string;
  imageExists: boolean;
  industries: string[];
  lastName: string;
  listDescription: string;
  listUri: string;
  month: number;
  name: string;
  naturalId: string;
  otherCompensation: number;
  parentListUri: string;
  person: {
    imageExists: boolean;
    name: string;
    squareImage: string;
    uri: string;
  };
  personName: string;
  position: number;
  premiumProfile: boolean;
  rank: number;
  selfMade: boolean;
  source: string;
  squareImage: string;
  status: string;
  suppressOnProfiles: boolean;
  thumbnail: string;
  timestamp: number;
  uri: string;
  version: number;
  visible: boolean;
  wealthList: boolean;
  year: number;
};

type page = {
  end: number;
  start: number;
  totalCount: number;
};

export type BillionaireFull = {
  page: page;
  personLists: BillionaireInfo[];
};
