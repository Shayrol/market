import { Dispatch, SetStateAction, useState } from "react";

interface IKeyword {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  onChangeKeyword: (value: string) => void;
}

export const useSearch = (): IKeyword => {
  const [keyword, setKeyword] = useState("");

  const onChangeKeyword = (value: string): void => {
    setKeyword(value);
  };

  return { keyword, setKeyword, onChangeKeyword };
};
