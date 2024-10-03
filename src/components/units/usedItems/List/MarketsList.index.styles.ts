import styled from "@emotion/styled";

export interface IActiveProps {
  isActive: boolean;
}

export const Wrap = styled.div`
  /* border-bottom: 1px solid gray; */
  display: flex;
  flex-direction: column;
  width: 1200px;
  /* padding-bottom: 100px; */
  margin-bottom: 100px;
  margin-top: 30px;
  position: relative;
`;
export const WrapBottom = styled.div`
  border-bottom: 1px solid gray;
  margin-right: 16px;
`;

// 판매정보 버튼
export const SoldWrap = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  margin-right: 16px;
`;

export const ItemBtnWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
`;

export const SoldBtn = styled.div`
  font-size: 18px;
  padding-bottom: 3px;
  transition: 0.2s;
  cursor: pointer;
  color: ${(props: IActiveProps) => (props.isActive ? "#4f4f4f" : "#000000")};
  font-weight: ${(props: IActiveProps) => (props.isActive ? "400" : "600")};
  box-shadow: ${(props: IActiveProps) =>
    props.isActive ? "none" : "0 2px 0 0 #0064ff"};
  :hover {
    box-shadow: 0 2px 0 0 #0064ff;
    font-weight: 600;
  }
`;

export const SoldOutBtn = styled.div`
  font-size: 18px;
  margin-left: 15px;
  padding-bottom: 3px;
  transition: 0.2s;
  cursor: pointer;
  color: ${(props: IActiveProps) => (props.isActive ? "#000000" : "#4f4f4f")};
  font-weight: ${(props: IActiveProps) => (props.isActive ? "600" : "400")};
  box-shadow: ${(props: IActiveProps) =>
    props.isActive ? "0 2px 0 0 #0064ff" : "none"};
  :hover {
    box-shadow: 0 2px 0 0 #0064ff;
    font-weight: 600;
  }
`;

// 검색
export const SearchWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  border: 2px solid #bdbdbd;
  border-radius: 5px;
  width: 300px;
  height: 35px;
  padding-left: 5px;
  font-size: 14px;
  outline-color: #0064ff;
`;

export const SearchBtn = styled.div`
  background-color: #0064ff;
  border: 1px solid #000000;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 45px;
  margin-left: 5px;
  cursor: pointer;
  :hover {
    background-color: #0056e0;
    color: #e0e0e0;
    color: #fff;
  }
`;

// 여러상품 담은 공간
export const ItemsWrap = styled.div`
  border-left: 1px solid gray;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 1000px;
  padding-right: 10px;

  ::-webkit-scrollbar {
    background-color: #f2f2f2;
    width: 6px;
    height: 0px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #0064ff;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #bdbdbd;
    border-radius: 5px;
  }
`;

// 상품 공간🎈
export const ItemWrap = styled.div`
  border-bottom: 1px solid blue;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

// 상품정보 공간
export const ItemInfoWrap = styled.div`
  display: flex;
  padding: 15px;
`;

// 상품 이미지
export const ItemImg = styled.img`
  width: 160px;
  height: 160px;
  margin-right: 20px;
  border-radius: 5px;
`;

// 상품관련 정보
export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
`;

// 제목,부가정보 Wrap
export const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

// 제목
export const Title = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;

// 부가정보
export const Remarks = styled.div``;

// 부가정보 P태그
export const RemarksP = styled.span`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
  color: #4f4f4f;
  cursor: default;
`;

// 태그
export const Tags = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #bdbdbd;
`;

// 판매자 정보
export const UserInfo = styled.div`
  display: flex;
`;

// 판매자 사진
export const Picture = styled.img`
  border: 1px solid #bdbdbd;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  overflow: hidden;
`;

// 상품 제목
export const Name = styled.div`
  color: #000000;
  margin-right: 15px;
`;

// 관심 이미지
export const PickedCountImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 3px;
`;

// 관심 카운트
export const PickedCount = styled.div`
  width: 18px;
  height: 24px;
  color: #4f4f4f;
`;

// 가격 공간
export const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

// WON 이미지
export const PriceImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

// 가격
export const ItemPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

// 생성 버튼
export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 20px 0;
`;

export const PencilIcon = styled.img``;

export const Button = styled.button`
  background-color: #0064ff;
  border: 1px solid #000000;
  color: #fff;
  border-radius: 5px;
  padding: 0px 10px;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.1s;
  :hover {
    background-color: #0056e0;
    color: #e0e0e0;
    border: 1px solid #0064ff;
  }
`;

// Best
export const BestWrap = styled.div`
  width: 100%;
  height: 270px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

export const H3 = styled.h3`
  margin-bottom: 5px;
`;

export const BestBoard = styled.div`
  /* border: 1px solid blue; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 100%;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }
`;

export const BestBoardImgWrap = styled.div`
  width: 100%;
  height: 60%;
  pointer-events: none;
`;

export const BestImg = styled.img`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const BestBoardUserWrap = styled.div`
  padding: 10px 20px;
  width: 100%;
  pointer-events: none;
`;

export const BestBoardTitle = styled.div`
  /* border: 1px solid red; */
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  overflow: hidden; /* 내용이 박스를 넘치면 숨기기 */
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  text-overflow: ellipsis; /* 넘친 텍스트에 '...' 표시 */
  pointer-events: none;
`;

export const BestBoardUser = styled.div`
  display: flex;
  pointer-events: none;
`;

export const WriterWrap = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  pointer-events: none;
`;

export const Writer = styled.div`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 5px;
  pointer-events: none;
`;

export const Date = styled.div`
  font-size: 12px;
  pointer-events: none;
`;

export const BoardLikeWrap = styled.div`
  /* border: 1px solid red; */
  position: flex;
  flex-direction: column;
  pointer-events: none;
`;

export const Vector = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
  pointer-events: none;
`;

export const LikeCount = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

// 검색결과 없음
export const NoSearchResults = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: 600;
  color: #bdbdbd;
  padding-top: 100px;
`;

// 최근 본 상품
export const TodayItemsWrap = styled.div`
  border: 2px solid #0064ff;
  border-radius: 5px;
  position: absolute;
  right: -220px;
  /* right: 15px; */
  /* top: 330px; */
  top: 380px;
  width: 200px;
  padding: 5px;
`;

export const TodayP = styled.p`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const TodayDelete = styled.div`
  display: flex;
  justify-content: right;
  font-size: 12px;
  cursor: pointer;
`;

export const TodayItems = styled.div`
  border: 2px solid #bdbdbd;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;

  :hover {
    border: 2px solid #0064ff;
  }
`;

export const PriceFavoriteWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const FavoriteWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
`;

export const TodayFavoriteImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const TodayPickedCount = styled.div`
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
`;

export const TodayPrice = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

export const TodayItemsImg = styled.img`
  width: 100%;
`;

export const TitleWrap = styled.div`
  /* padding-left: 5px; */
`;

export const TodayTitle = styled.div`
  font-weight: 600;
  line-height: 100%;
`;

export const TodayRemarks = styled.div`
  color: #4f4f4f;
  line-height: 100%;
`;

export const TodayTags = styled.div`
  color: #dbdbdb;
`;
