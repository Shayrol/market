import styled from "@emotion/styled";

export const Wrap = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

export const PasswordTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 40px;
`;

export const PasswordInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const PasswordField = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const PasswordLabel = styled.p`
  width: 30%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
`;

export const PasswordInput = styled.input`
  height: 45px;
  width: 700px;
  font-size: 16px;
  font-weight: 500;
  padding-left: 15px;
  background-color: #e0e0e0;
  outline: none;
  border: none;
`;

export const ChangePasswordButtonWrap = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 30px;
`;

export const ChangePasswordButton = styled.button`
  width: 150px;
  height: 45px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  cursor: pointer;
  transition: 0.1s;

  :hover {
    filter: brightness(90%);
  }
`;

export const PasswordError = styled.p`
  position: absolute;
  color: red;
  display: flex;
  justify-content: left;
  font-size: 12px;
  font-weight: 700;
  left: 230px;
  bottom: -20px;
`;
