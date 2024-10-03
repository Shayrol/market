import { useRouter } from "next/router";
import * as S from "./SignUp.index.styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateUser } from "../../../commons/hooks/graphql-mutation/useMutationCreateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitSchema } from "../../../commons/hooks/yup/validation";

interface IFom {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordImage, setPasswordImage] = useState("/images/signUp/eye2.png");
  const [createUser] = useCreateUser();

  const { register, handleSubmit, formState, trigger } = useForm<IFom>({
    resolver: yupResolver(SubmitSchema),
    mode: "onChange",
  });

  const onClickLogo = (): void => {
    void router.push("/boards");
  };

  const onClickPasswordTypeOfImage = (): void => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
    setPasswordImage((prevImage) =>
      prevImage === "/images/signUp/eye2.png"
        ? "/images/signUp/eye1.png"
        : "/images/signUp/eye2.png"
    );
  };

  const onClickSubmit = async (data: IFom): Promise<void> => {
    console.log(data.email);
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            name: data.name,
            password: data.password,
          },
        },
      });
      void router.push("/login");
      console.log(result);
      console.log("실행ㅇㅇ");
      alert("회원가입 성공");
    } catch (error) {
      if (error instanceof Error) alert("이미 동일한 아이디 입니다.");
    }
  };

  return (
    <>
      <S.SignUpLogo onClick={onClickLogo}>Logo</S.SignUpLogo>
      <S.SignUpText>회원정보를 입력해주세요</S.SignUpText>

      <S.Wrap onSubmit={handleSubmit(onClickSubmit)}>
        <S.InputNameWrap>
          <S.NameImg src="/images/signUp/name.png" />
          <S.InputName type="text" placeholder="이름" {...register("name")} />
        </S.InputNameWrap>
        <S.Error>{formState.errors.name?.message}</S.Error>
        <S.InputIdWrap>
          <S.IdImg src="/images/signUp/user.png" />
          <S.InputId type="text" placeholder="아이디" {...register("email")} />
        </S.InputIdWrap>
        <S.Error>{formState.errors.email?.message}</S.Error>
        <S.InputPasswordWrap>
          <S.PasswordImg src="/images/signUp/password.png" />
          <S.InputPassword
            type={passwordType}
            placeholder="비밀번호"
            {...register("password")}
          />
          <S.PasswordEye
            src={passwordImage}
            onClick={onClickPasswordTypeOfImage}
          />
        </S.InputPasswordWrap>
        <S.Error>{formState.errors.password?.message}</S.Error>
        <S.InputPasswordWrap>
          <S.PasswordImg src="/images/signUp/password.png" />
          <S.InputPassword
            type={passwordType}
            placeholder="비밀번호 확인"
            {...register("confirmPassword")}
          />
        </S.InputPasswordWrap>
        <S.Error>{formState.errors.confirmPassword?.message}</S.Error>
        <S.SubmitBtn type="submit">가입하기</S.SubmitBtn>
      </S.Wrap>
    </>
  );
}

// 비밀번호 타입 아이콘 추가 작업 필요 - (크기 및 다른 이미지)
// 회원가입 페이지 마무리 하기
// 로그인 시 Header 프로필 작성하기

// 🎈2024.06.27.목 /
// 1. 회원가입 구현 완
// 2. 회원가입 페이지 마무리 하기

// 해야할 것:
// 1. 회원가입 페이지 CSS 마무리 하기
// 2. 로그인 시 LayoutHeader 프로필 CSS 구현 및 정보 표기
