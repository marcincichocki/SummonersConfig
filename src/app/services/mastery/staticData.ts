export interface STATIC_DATA_GRID {
  [key: string]: [
    number[]
  ];
}

export interface STATIC_DATA_MASTERIES {
  [key: string]: {
    id: number;
    name: string;
    description: string[];
    ranks: number;
  };
}
