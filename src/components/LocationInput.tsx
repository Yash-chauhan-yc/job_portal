"use client";
import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import cities from "../lib/cities-list";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasfocus, setHasFocus] = useState(false);

    // console.log("====================>",props.value)

    const city = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchedWord = locationSearchInput.split(" ");

      return cities
        .map((city) => `${city.name},${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchedWord[0].toLowerCase()) &&
            searchedWord.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          value={locationSearchInput}
          onChange={(e) => {
            setLocationSearchInput(e.target.value);
          }}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        <div>
          {locationSearchInput.trim() && hasfocus && (
            <div className="absolute bg-background shadow-xl border-x border-b rounded-b-lg z-20 divide-y">
              {!cities.length && <p className="p-3">No results found</p>}
              {city.map((citi) => {
                return (
                  <button
                    className="block w-full text-start p-2"
                    key={citi}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onLocationSelected(citi);
                      setLocationSearchInput("");
                    }}
                  >
                    {citi}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  },
);
