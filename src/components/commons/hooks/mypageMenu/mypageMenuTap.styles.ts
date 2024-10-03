import styled from "@emotion/styled";

// MyPage Tap
export const Wrap = styled.div`
  border: 2px solid #dbdbdb;
  width: 30%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  box-sizing: border-box;
`;

// 마이페이지 글자
export const MyPageTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

// 프로필 정보 - 사진, 이름, 포인트
export const UserProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

export const PictureWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 25px;
  :hover {
    filter: brightness(90%);
  }
`;

// 프로필 사진
export const Picture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

// 프로필 셋팅 사진 - 톱니
export const PictureSetting = styled.img`
  border-radius: 50%;
  background-color: #ffd600;
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0px;
  right: -2px;
`;

// 프로필 이름
export const UserProfileName = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
`;

// 프로필 포인트 공간
export const UserProfilePointWrap = styled.div`
  display: flex;
  align-items: center;
`;

// 프로필 포인트
export const UserProfilePoint = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

// 프로필 포인트 이미지
export const UserProfilePointImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

// Button Tap - 내 장터, 내 포인트, 내 프로필 전체 공간
export const MyPageTapWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* justify-content: space-between; */
`;

// 각가의 탭 공간
export const MyPageTap = styled.div`
  display: flex;
  padding: 5px 0;
  cursor: pointer;
`;

// 탭 아이콘 이미지
export const TapImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

// 탭 이름
export const TapName = styled.p<{ isActive: boolean }>`
  /* color: ${(props) => (props.isActive ? "black" : "gray")}; */
  color: ${(props) => (props.isActive ? "#000000" : "#828282")};
  font-weight: ${(props) => (props.isActive ? "700" : "500")};
  font-size: 18px;
`;
