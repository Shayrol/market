import { Fragment, MouseEvent } from "react";
import * as S from "./LayoutNavigation.styles";
import { useRouter } from "next/router";

const NAVIGATION_MENU = [
  { name: "게시글", page: "/boards" },
  { name: "라이브쇼핑", page: "/markets" },
  { name: "마이페이지", page: "/mypage" },
];

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();

  const onClickMenu = (event: MouseEvent<HTMLDivElement>): void => {
    void router.push(event.currentTarget.id);
  };

  return (
    <S.Wrapper>
      {NAVIGATION_MENU.map((el) => (
        <Fragment key={el.page}>
          <S.Menu id={el.page} onClick={onClickMenu}>
            {el.name}
          </S.Menu>
        </Fragment>
      ))}
    </S.Wrapper>
  );
}
