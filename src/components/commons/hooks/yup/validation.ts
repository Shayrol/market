import * as yup from "yup";

// 게시글 - Board
export const schema = yup.object({
  writer: yup.string().required("작성자를 입력해주세요."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(4, "최소 4자 이상 작성해야 합니다.")
    .max(12, "최대 12자까지 작성해야 합니다."),
  title: yup.string().required("제목을 입력해주세요."),
  contents: yup.string().required("내용을 입력해주세요."),
  addressDetail: yup.string(),
});

// 회원가입
export const SubmitSchema = yup.object({
  name: yup.string().required("이름을 입력해주세요."),
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("유효한 이메일 주소가 아닙니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(4, "최소 4자 이상 입력해주세요.")
    .max(12, "최대 12자 이하 입력해주세요."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 다시 입력해주세요."),
});

// 상품 등록
export const MarketWriterSchema = yup.object({
  name: yup.string().required("제목을 입력해주세요."),
  remarks: yup.string().required("부가설명을 입력해주세요."),
  contents: yup.string().required("내용을 입력해주세요.."),
  price: yup
    .number()
    // 숫자 타입으로 저장 비어있으면 null 있으면 숫자 저장함
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue.trim() === "" ? null : value;
      }
      return value; // originalValue가 문자열이 아니면 그대로 반환
    })
    .required("판매가격을 입력해주세요."),
  // tags: yup
  //   .array()
  //   .of(yup.string())
  //   .max(5, "태그는 최대 5개까지 입력할 수 있습니다."),
  addressDetail: yup.string(),
});

// 마이 프로파일 비밀번호 변경 form태그
export const MyProfileSchema = yup.object({
  currentPassword: yup.string().required("현재 비밀번호를 입력해 주세요."),
  newPassword: yup
    .string()
    .required("새 비밀번호를 입력해 주세요.")
    .matches(
      /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
      "비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요."
    )
    .test(
      "not-same-as-current",
      "새 비밀번호는 현재 비밀번호와 같을 수 없습니다.",
      function (value) {
        return value !== this.parent.currentPassword;
      }
    ),
  confirmNewPassword: yup
    .string()
    .required("새 비밀번호 확인을 위한 입력해 주세요.")
    .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다."),
});

// 댓글
export const ItemDetailComment = yup.object({
  question: yup.string().required("내용을 입력해 주세요."),
});
