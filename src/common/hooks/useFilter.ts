import {useState} from 'react';

type ColourFilter = (product: Product) => boolean;

const filters: Record<string, ColourFilter> = {
  All: () => true,
  Black: (product) => product.colour === 'Black',
  Stone: (product) => product.colour === 'Stone',
  Red: (product) => product.colour === 'Red',
};

const colours = Object.keys(filters);

export function useFilter() {
  const [colour, setColour] = useState(colours[0]);

  const filter = (product: Product) => filters[colour](product);

  return [filter, colour, setColour] as const;
}
