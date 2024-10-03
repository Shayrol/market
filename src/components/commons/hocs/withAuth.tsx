// 로그인 확인 페이지는 mypage에 사용함

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isAccessToken } from "../../../commons/stores";

// 보통 로그인체크가 아닌 withAuth라고 짓는다.
export const WithAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  const accessToken = useRecoilValue(isAccessToken);

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 후 이용 가능합니다!fdsfsd!");
      void router.push("/login");
      // 이전 페이지 돌아가기 위한 주소 저장
      window.sessionStorage.setItem("prevPath", router.asPath);
    }
  }, []);

  return <Component {...props} />;
};

// restoreAccessToken을 활용해 refreshToken이 있으면 접속가능하고 없으면 로그인 창으로
// 이동을 하게 했으나 문제점이 있다.
// 1. 로그아웃을 하게 되면 refreshToken을 삭제를 하는데 그럼 해당 페이지에 접속을 하지
//    못해야 한다. 하지만 접속이 가능함...
// 2. 로그인이 필요한 페이지에서 로그아웃으로 로그인 페이지로 이동을 하고
//    로그인을 하면 계속 로그인 체크 여부로 로그인 페이지로 이동
//    로그인 된 상태에서 로그인 페이지 이동됨
