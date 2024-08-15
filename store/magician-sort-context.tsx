import { createContext, useEffect, useState } from "react";
import { getAllCharacters } from "../utils/http";
import { Magician } from "../model/Magician";
import { NOT_IN_HOUSE } from "../const/house";

export const MagicianSortContext = createContext({
  charactersForGuess: [],
  guessedCharacters: [],
  isLoading: false,
  getRandomCharacterForGuess: (): Magician => new Magician([]),
  onReset: () => {},
  takeGuess: (guess: string, magician: Magician) => {},
  successAffilations: 0,
  failedAffilations: 0,
});

export default function MagicianSortContextProvider({ children }) {
  const [charactersForGuess, setCharactersForGuess] = useState<Magician[]>([]);
  const [guessedCharacters, setGuessedCharacters] = useState<Magician[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successAffilations, setSuccessAffilations] = useState(0);
  const [failedAffilations, setFailedAffilations] = useState(0);

  useEffect(() => {
    async function fetchCharacters() {
      const chars = await getAllCharacters();
      setCharactersForGuess(chars);
      setIsLoading(false);
    }

    fetchCharacters();
  }, []);

  const getRandomCharacterForGuess = (): Magician => {
    return charactersForGuess[
      Math.floor(Math.random() * charactersForGuess.length)
    ];
  };

  const onReset = () => {
    setCharactersForGuess((prevState) => [...prevState, ...guessedCharacters]);
    setFailedAffilations(0);
    setSuccessAffilations(0);
    setGuessedCharacters([]);
  };

  const takeGuess = (guess: string, magician: Magician) => {
    magician.attempts = magician.attempts ? magician.attempts + 1 : 1;
    const guessedMagicianIdx = guessedCharacters.findIndex(
      (char) => char.id === magician.id
    );
    if (guess === NOT_IN_HOUSE) {
      if (!magician.house) {
        setSuccessAffilations((prevState) => prevState + 1);
        setCharactersForGuess((prevState) =>
          prevState.filter((char) => char.id !== magician.id)
        );
        setGuessedCharacters((prevState) => {
          const updatedState = [...prevState];

          if (guessedMagicianIdx !== -1) {
            updatedState[guessedMagicianIdx] = {
              ...updatedState[guessedMagicianIdx],
              attempts: updatedState[guessedMagicianIdx].attempts + 1,
              isGuessed: true,
            };
          } else {
            updatedState.push({
              ...magician,
              attempts: magician.attempts,
              isGuessed: true,
            });
          }

          return updatedState;
        });
      } else {
        setFailedAffilations((prevState) => prevState + 1);
        magician.isGuessed = false;
        setGuessedCharacters((prevState) => {
          const updatedState = [...prevState];

          if (guessedMagicianIdx !== -1) {
            updatedState[guessedMagicianIdx] = {
              ...updatedState[guessedMagicianIdx],
              attempts: updatedState[guessedMagicianIdx].attempts + 1,
              isGuessed: false,
            };
          } else {
            updatedState.push({
              ...magician,
              attempts: magician.attempts,
              isGuessed: false,
            });
          }

          return updatedState;
        });
      }
      return;
    }

    const isCorrectHouse = magician.house === guess;
    if (isCorrectHouse) {
      setSuccessAffilations((prevState) => prevState + 1);
      setCharactersForGuess((prevState) =>
        prevState.filter((char) => char.id !== magician.id)
      );
      setGuessedCharacters((prevState) => {
        const updatedState = [...prevState];

        if (guessedMagicianIdx !== -1) {
          updatedState[guessedMagicianIdx] = {
            ...updatedState[guessedMagicianIdx],
            attempts: updatedState[guessedMagicianIdx].attempts + 1,
            isGuessed: true,
          };
        } else {
          updatedState.push({
            ...magician,
            attempts: magician.attempts,
            isGuessed: true,
          });
        }

        return updatedState;
      });
    } else {
      magician.isGuessed = false;
      setFailedAffilations((prevState) => prevState + 1);
      setGuessedCharacters((prevState) => {
        const updatedState = [...prevState];

        if (guessedMagicianIdx !== -1) {
          updatedState[guessedMagicianIdx] = {
            ...updatedState[guessedMagicianIdx],
            attempts: updatedState[guessedMagicianIdx].attempts + 1,
            isGuessed: false,
          };
        } else {
          updatedState.push({
            ...magician,
            attempts: magician.attempts,
            isGuessed: false,
          });
        }

        return updatedState;
      });
    }
  };

  const ctxValue = {
    charactersForGuess,
    guessedCharacters,
    isLoading,
    takeGuess,
    getRandomCharacterForGuess,
    onReset,
    successAffilations,
    failedAffilations,
  };

  return (
    <MagicianSortContext.Provider value={ctxValue}>
      {children}
    </MagicianSortContext.Provider>
  );
}
