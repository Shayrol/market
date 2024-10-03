import { useForm } from "react-hook-form";
import * as S from "./myprofile.index.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyProfileSchema } from "../../../commons/hooks/yup/validation";
import { useMutationResetUserPassword } from "../../../commons/hooks/graphql-mutation/useMutationResetUserPassword";
import { IFormPassword } from "./IForm";
import { message } from "antd";

export default function MyProfile(): JSX.Element {
  const [resetUserPassword] = useMutationResetUserPassword();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(MyProfileSchema),
    mode: "onChange",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const onClickPassword = async (data_: IFormPassword): Promise<void> => {
    try {
      await resetUserPassword({
        variables: { password: data_.newPassword },
      });
      // 비번 변경 성공 시 상단에 알림 띄움
      void messageApi.open({
        type: "success",
        content: "비밀번호 변경 성공",
      });
      reset();
    } catch {
      // 비번 변경 실패 시 상단에 알림 띄움
      void messageApi.open({
        type: "error",
        content: "비밀번호 변경 실패",
      });
    }
  };

  return (
    <S.Wrap onSubmit={handleSubmit(onClickPassword)}>
      {/* 비번 변경 시 상태창 */}
      {contextHolder}
      <S.PasswordTitle>비밀번호 변경</S.PasswordTitle>
      <S.PasswordInputWrap>
        <S.PasswordField>
          <S.PasswordLabel>현재 비밀번호</S.PasswordLabel>
          <S.PasswordInput
            type="password"
            placeholder="현재 비밀번호를 입력해 주세요."
            {...register("currentPassword")}
          />
          <S.PasswordError>
            {formState.errors.currentPassword?.message}
          </S.PasswordError>
        </S.PasswordField>
        <S.PasswordField>
          <S.PasswordLabel>새 비밀번호</S.PasswordLabel>
          <S.PasswordInput
            type="password"
            placeholder="새 비밀번호를 입력해 주세요."
            {...register("newPassword")}
          />
          <S.PasswordError>
            {formState.errors.newPassword?.message}
          </S.PasswordError>
        </S.PasswordField>
        <S.PasswordField>
          <S.PasswordLabel>새 비밀번호 확인</S.PasswordLabel>
          <S.PasswordInput
            type="password"
            placeholder="새 비밀번호를 확인해 주세요."
            {...register("confirmNewPassword")}
          />
          <S.PasswordError>
            {formState.errors.confirmNewPassword?.message}
          </S.PasswordError>
        </S.PasswordField>
      </S.PasswordInputWrap>
      <S.ChangePasswordButtonWrap>
        <S.ChangePasswordButton>비밀번호 변경</S.ChangePasswordButton>
      </S.ChangePasswordButtonWrap>
    </S.Wrap>
  );
}

// 🎈2024.08.13.화 /
// 1. 비밀번호 변경하는 resetUserPassword은 현재 비밀번호가 일치한지 확이하지 않는다.
//    이 API는 로그인 된 상태에서만 사용할 수 있고 또한 새로운 비밀번호 변경만 가능하다.
//    - 현재 비밀번호 확인하는 로직의 API 즉 백엔드 API에 구현되어있지 않아 사용 못함
//    - 새 비밀번호만 입력해 넘겨주면 비밀번호 변경됨,
//      useForm으로 조건을 걸어 현재, 새 비번확인 유효성 검사를 걸었음
//   즉 새 비밀번호 입력창 외 장식임..
//
// 해야할 것:
// 1. 내 장터 내 포인트 처럼 컴포넌트 분리 및 배열 저장하기
// 2. 나머지 최적화 하기 - 리렌더링 등
//    특히 ApolloSetting에서 accessToken을 받아오는 useEffect 요놈이 문제임
//
// MyPage로 이동함
