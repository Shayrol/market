import styled from "@emotion/styled";

// /boards 이동하는 로고버튼
export const SignUpLogo = styled.h1`
  /* border: 1px solid red; */
  width: 500px;
  /* height: 50px; */
  line-height: 50px;
  font-size: 34px;
  font-weight: 700;
  color: #0064ff;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

// 회원정보 글
export const SignUpText = styled.h1`
  /* border: 1px solid red; */
  width: 500px;
  display: flex;
  justify-content: left;
  font-size: 10px;
  margin-bottom: 5px;
`;

// 로그인 input 공간
export const Wrap = styled.form`
  border-radius: 15px;
  width: 500px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

// 이름st **********
export const InputNameWrap = styled.div`
  border: 1.5px solid #0064ff;
  border-radius: 5px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 50px;
`;

export const InputName = styled.input`
  border: none;
  padding-left: 5px;
  font-size: 16px;
  width: 100%;
  height: 22px;
  outline: none;
  cursor: pointer;
`;

export const NameImg = styled.img`
  width: 30px;
  height: 30px;
  padding: 4px;
  line-height: 30px;
`;
// 이름st **********

// 아이디st **********
export const InputIdWrap = styled.div`
  border: 1.5px solid #0064ff;
  border-radius: 5px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 50px;
`;

export const InputId = styled.input`
  border: none;
  padding-left: 5px;
  font-size: 16px;
  width: 100%;
  height: 22px;
  outline: none;
  cursor: pointer;
`;

export const IdImg = styled.img`
  width: 30px;
  height: 30px;
  line-height: 30px;
`;
// 아이디ed **********

// 비밀번호st **********
export const InputPasswordWrap = styled.div`
  border: 1.5px solid #0064ff;
  border-radius: 5px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 50px;

  :focus-within {
    border-bottom: 1px solid #0064ff;
  }
`;

export const InputPassword = styled.input`
  /* border: 1px solid red; */
  border: none;
  font-size: 16px;
  padding-left: 5px;
  height: 22px;
  width: 100%;
  outline: none;
  cursor: pointer;
`;

export const PasswordImg = styled.img`
  width: 30px;
  height: 30px;
  padding: 4px;
  line-height: 30px;
`;

export const PasswordEye = styled.img`
  /* border: 1px solid red; */
  width: 20px;
  height: 20px;
  margin: 0 7px;
  cursor: pointer;
`;
// 비밀번호ed **********

// errors message
export const Error = styled.p`
  /* border: 1px solid red; */
  height: 17px;
  display: flex;
  color: red;
  font-size: 10px;
  margin: 2px 0;
`;

// 가입하기 버튼st **********
export const SubmitBtn = styled.button`
  border: 1.5px solid #bec0c4;
  border-radius: 5px;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: #0064ff;
    color: white;
    border: 1.5px solid #0064ff;
  }
`;
// 가입하기 버튼ed **********
