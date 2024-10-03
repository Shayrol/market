// import LayoutBanner from "./banner/LayoutBanner.container";
import styled from "@emotion/styled";
import LayoutHeader from "./header/LayoutHeader.index";
import { useRouter } from "next/router";
import React from "react";
import MyPageMenuTap from "../hooks/mypageMenu/mypageMenuTap";
import LayoutNavigation from "./navigation/LayoutNavigation.index";
import LayoutBanner from "./banner/LayoutBanner.index";

const MemoizedLayoutHeader = React.memo(LayoutHeader);
const MemoizedLayoutNavigation = React.memo(LayoutNavigation);

const Body = styled.div`
  /* height: 500px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface ILayoutProps {
  children: JSX.Element;
}

const BANNER_HIDDEN = [
  "/login/",
  "/signup/",
  "/markets/",
  "/mypage/",
  "/mypage/mypoint/",
  "/mypage/myprofile/",
];
const HEADER_HIDDEN = ["/login/", "/signup/"];
const NAVIGATION_HIDDEN = ["/login/", "/signup/"];

function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const banner = BANNER_HIDDEN.includes(router.asPath);
  const header = HEADER_HIDDEN.includes(router.asPath);
  const navigation = NAVIGATION_HIDDEN.includes(router.asPath);
  // /mapage로 시작하는 주소만 해당 탭이 보이도록 함 - (startsWith: 시작 값을 본다.)
  // 따라서 /mypage or /mypage/password or /mypage/point 등 해당 페이지에서 탭을 띄울 수 있음
  const isMyPageRoute = router.asPath.startsWith("/mypage/");

  return (
    // <div style={{ width: "98.5vw", minWidth: "1200px" }}>
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!header && <MemoizedLayoutHeader />}
      {!banner && <LayoutBanner />}
      {!navigation && <MemoizedLayoutNavigation />}
      <div
        style={{
          display: "flex",
          width: "1200px",
        }}
      >
        {isMyPageRoute && <MyPageMenuTap />}
        <Body>{props.children}</Body>
      </div>
    </div>
  );
}

export default React.memo(Layout);
