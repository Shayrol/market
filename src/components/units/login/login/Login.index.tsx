import { useRouter } from "next/router";
import * as S from "./Login.index.styles";
import { useMutationLoginUser } from "../../../commons/hooks/graphql-mutation/useMutationLoginUser";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { isAccessToken } from "../../../../commons/stores";
import { useMutationLoginUserExample } from "../../../commons/hooks/graphql-mutation/useMutationLoginUserExample";

export default function Login(): JSX.Element {
  const router = useRouter();
  const [loginUser] = useMutationLoginUser();
  // const [loginUserExample] = useMutationLoginUserExample();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useRecoilState(isAccessToken);

  // 아이디 입력
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;
    setEmail(email);
  };

  // 비밀번호 입력
  const onChangePW = (event: ChangeEvent<HTMLInputElement>): void => {
    const PW = event.target.value;
    setPassword(PW);
  };

  // 로그인 버튼
  const onClickLogin = async (): Promise<void> => {
    if (email === "") {
      alert("이메일아이디 입력해 주세요");
      return;
    }
    if (password === "") {
      alert("비밀번호 입력해 주세요");
      return;
    }

    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      setAccessToken(result.data?.loginUser.accessToken ?? "");

      // 로그인 후 이전 페이지 이동 - (LayoutHeader의 로그인 버튼)
      const PrevPath = window.sessionStorage.getItem("prevPath");
      if (PrevPath) {
        // 로그인 후 필요없는 prevPath 스토리지에서 삭제
        window.sessionStorage.removeItem("prevPath");
        void router.push(PrevPath);
        window.sessionStorage.setItem(
          "accessToken",
          result.data?.loginUser.accessToken ?? ""
        );
      } else {
        void router.push("/boards");
      }
    } catch (error) {
      if (error instanceof Error) alert("회원정보가 없습니다.");
    }
  };

  // Enter로 로그인 하기
  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === "Enter") {
      await onClickLogin();
    }
  };

  // 회원가입 버튼
  const onClickSignUp = (): void => {
    void router.push("/signup");
  };

  return (
    <S.Wrap>
      <S.LoginWrap>
        <S.LoginImageWrap>
          <S.LoginImage src="/images/loginPage/login.png" />
        </S.LoginImageWrap>
        <S.LoginInputWrap>
          <S.LoginHeader>Login</S.LoginHeader>
          <S.InputID
            type="email"
            placeholder="이메일"
            onChange={onChangeEmail}
            onKeyPress={handleKeyPress}
          />
          <S.InputPW
            type="password"
            placeholder="비밀번호"
            onChange={onChangePW}
            onKeyPress={handleKeyPress}
          />
          <S.Button onClick={onClickLogin}>login</S.Button>
          <S.LoginModule>
            <S.LoginModuleLinkID>아이디 찾기</S.LoginModuleLinkID>
            <S.LoginModuleLinkPW>비번 찾기</S.LoginModuleLinkPW>
            <S.LoginModuleLinkCreateUser onClick={onClickSignUp}>
              회원가입
            </S.LoginModuleLinkCreateUser>
          </S.LoginModule>
        </S.LoginInputWrap>
      </S.LoginWrap>
    </S.Wrap>
  );
}

// 2024.06.20.목 /
// 1. 로그인 페이지 임시 구현 완료
//    css부분에서 보드 가운데 정렬 높이 등 문제가 좀 있음....
//    보여주기식으로 했지만 지저분하고 globals.css에서 body,html에서
//    초기 셋팅을 안하고 해서 부 자연스러운 점있음 -
//    (다시 하기엔 멀리와버린..)

// 해야할 것:
// 1. 회원가입 페이지 구현
// 2. 로그인 API 설정
// 3. 회원가입 API 설정

// 2024.06.21.금 /
// 1. 로그인 API 요청 성공

// 해야할 것:
// 1. 로그인 양식 구현 (이메일 형식, useForm으로 입력창 관리, 아이디 틀린경우 등)
// 2. 로그인 시 메인페이지 이동과 함께 로그인 된 프로필 구현
// 3. 회원가입 페이지 만들고 API 연동하기
// 4. 로그인 해야 들어갈 수 있는 페이지 만들기 (상품 페이지)
// 5. 로그아웃 구현

// 확인해봐야 할 것:
// 1. 로그인 후 새로고침 후 refreshToken 받아오는지
// 2. 안되면 useEffect로 getAccessToken()을 사용했던 것을 다시 사용을 해야하는지..
//    (API 요청이 두 번 일어나서 지움)
