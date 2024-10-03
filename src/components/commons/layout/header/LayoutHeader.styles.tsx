import styled from "@emotion/styled";

// 모달 띄우기
// interface IModalProps {
//   isModal: boolean;
// }

export const Wrap = styled.div`
  height: 60px;
  line-height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  margin: 0;
  background-color: white;
  border-bottom: 1px solid black;
  z-index: 2;
  padding: 0 30px;
`;

export const InfoWrap = styled.div`
  width: 1200px;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #0064ff;
  cursor: pointer;
`;

export const LoginMore = styled.div``;

export const Login = styled.a`
  font-size: 12px;
  padding-right: 5px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
export const Join = styled.a`
  font-size: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }

  ::before {
    content: "|";
    margin-right: 5px;
  }
`;

export const LoggedInWrap = styled.div`
  box-shadow: 1px 1px 2px #444;
  border-radius: 25px;
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  width: 70px;
  transition: 0.2s;

  :hover {
    background-color: #444;
  }

  &:hover .child {
    transform: translateY(2px);
    filter: invert(100%) brightness(200%);
  }
`;

export const IcProfileImg = styled.img`
  box-shadow: 0.3px 0.3px 3px #444;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  width: 35px;
  height: 35px;
  user-select: none;
`;

export const IcMoreImg = styled.img`
  position: absolute;
  right: 5px;
  width: 25px;
  transition: 0.3s;
`;

// 모달 창
export const Union = styled.div`
  position: absolute;
  border-radius: 18px;
  background-image: url("/images/loginProfile/Union.png");
  background-size: 300px;
  background-repeat: no-repeat;
  background-position: -20px -13px;
  width: 260px;
  height: 240px;
  right: -5px;
  top: 50px;
  filter: drop-shadow(0 0 5px #444);
  padding-top: 15px;
`;

// 유저 상세정보
export const ProfileMoreWrap = styled.div`
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
`;

// 프로필 사진 변경
export const ProfileMoreImgSettingWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    filter: brightness(90%);
  }
`;

// 프로파일 이미지
export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;
// 프로파일 셋팅 이미지
export const SettingImg = styled.img`
  border-radius: 50%;
  position: absolute;
  width: 25px;
  height: 25px;
  bottom: 0px;
  right: -2px;
`;

// 프로필 닉네임 정보 Wrap
export const ProfileUserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100px;
  padding: 0 10px;
  margin-left: 10px;
`;

// 유저 닉네임
export const ProfileName = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  height: 24px;
`;

export const PointWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
`;

// 포인트
export const ProfilePoint = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  font-size: 17px;
  height: 24px;
`;

export const Reload = styled.img`
  /* border: 1px solid red; */
  margin-left: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    transform: rotate(90deg);
  }
`;

// 로그아웃, 충전하기 버튼 Wrap
export const ProfileFunc = styled.div`
  display: flex;
  flex-direction: column;
`;

// 충전 공간
export const ChargeWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  cursor: pointer;
`;

export const ChargeImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

export const ChargeTxt = styled.h1`
  font-size: 17px;
  color: #bdbdbd;
`;

// 로그아웃 공간
export const LogoutWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  cursor: pointer;
`;

export const LogoutImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

export const LogoutTxt = styled.h1`
  font-size: 17px;
  color: #bdbdbd;
`;

export const Line = styled.div`
  border-bottom: 1px solid #bdbdbd;
`;
