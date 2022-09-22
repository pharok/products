import React from 'react';

interface Props {
  colour: string;
  setColour: (value: string) => void;
}

function FilterBar({colour, setColour}: Props) {
  return (
    <div className="flex flex-col items-start">
      <label className="dark:text-white mb-2" htmlFor="colours">
        Filter By Colour
      </label>
      <select
        name="colours"
        id="colours"
        onChange={(e) => setColour(e.target.value)}
        className="font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white dark:bg-gray-800 w-auto md:w-[20rem] p-1"
      >
        <option value="All">All</option>
        <option value="Black">Black</option>
        <option value="Stone">Stone</option>
        <option value="Red">Red</option>
      </select>
    </div>
  );
}

export default FilterBar;
