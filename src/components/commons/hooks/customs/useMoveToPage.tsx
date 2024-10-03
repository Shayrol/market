import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface IMoveToPage {
  onClickMoveToPage: (path: string) => MouseEventHandler<HTMLElement>;
}

export const useMoveToPage = (): IMoveToPage => {
  const router = useRouter();

  const onClickMoveToPage = (path: string): MouseEventHandler<HTMLElement> => {
    return (event) => {
      void router.push(path);
    };
  };

  return {
    onClickMoveToPage,
  };
};
