import styled from "@emotion/styled";

export const Wrap = styled.div`
  /* border: 2px solid #0064ff;
  border-radius: 10px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; */
`;

export const LoginWrap = styled.div`
  width: 1200px;
  padding: 0 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  height: 400px;
  padding: 0 30px;
`;

export const LoginInputWrap = styled.div`
  border: 2px solid #0054ff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 70px;
  margin-left: 30px;
`;

export const LoginImage = styled.img`
  width: 300px;
`;

export const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const InputID = styled.input`
  /* width: 400px; */
  height: 35px;
  font-size: 16px;
  padding: 14px;
  border: 1.3px solid gray;
  border-radius: 5px;
  outline: none;
  margin-bottom: 5px;

  :focus {
    border: 1.5px solid #0064ff;
  }
`;
export const InputPW = styled.input`
  height: 35px;
  font-size: 16px;
  padding: 14px;
  border: 1.3px solid gray;
  border-radius: 5px;
  outline: none;

  :focus {
    border: 1.5px solid #0064ff;
  }
`;

export const Button = styled.div`
  border-radius: 5px;
  background-color: #0064ff;
  color: white;
  font-size: 18px;
  font-weight: 600;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: center;
  margin: 10px 0;
  cursor: pointer;
`;

// 아이디 비번 찾기, 회원가입

export const LoginModule = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginModuleLinkID = styled.a`
  font-size: 12px;
  cursor: pointer;
`;
export const LoginModuleLinkPW = styled.a`
  font-size: 12px;
  cursor: pointer;

  ::before {
    content: "|";
    margin: 0 7px;
    position: relative;
    top: -2px;
  }
`;
export const LoginModuleLinkCreateUser = styled.a`
  font-size: 12px;
  cursor: pointer;

  ::before {
    content: "|";
    margin: 0 7px;
    position: relative;
    top: -2px;
  }
`;
