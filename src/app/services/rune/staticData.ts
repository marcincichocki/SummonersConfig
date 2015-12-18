export interface STATIC_DATA_STATS {
  [key: string]: string;
}

export interface STATIC_DATA_RUNES {
  [key: string]: Rune;
}

/**
 * Represent single rune.
 */
export interface Rune {
  id: number;
  name: string;
  description: string;
  tier: number;
  image: string;
  primary: string;
  type: string;
  available: boolean;
  ip: number;
  tags: string[];
  stats: {
    [key: string]: number;
  };
};
