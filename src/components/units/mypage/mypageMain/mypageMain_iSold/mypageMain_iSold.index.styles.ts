import styled from "@emotion/styled";

// 검색 공간 - myPageMain의 styled에서 전체 Wrap의 position 기준으로 잡아서
//            위치 조정함
// MyPageMain에 Search를 사용하기 않은 이유는 다른 useQuery의 data를 사용하면
// 불 필요한 API 요청이 일어나 각각 분리함
export const SearchWrap = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;
`;

export const Wrap = styled.div`
  height: 440px;
  width: 100%;
`;

export const TableHeadWrap = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  height: 40px;
  justify-content: space-between;
`;

// 번호
export const TableNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 10%;
`;

// 상품명
export const TableContentItemName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 40%;
`;

// 판매가격
export const TablePrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 15%;
`;

// 날짜
export const TableCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 10%;
`;

//
//
//
// 테이블 내용 공간
export const TableContentsWrap = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  height: 40px;
  justify-content: space-between;
`;

// 번호
export const TableContentsNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  width: 10%;
`;

// 상품명
export const TableContentImpID = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 판매가격
export const TableContentPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #4f4f4f;
  width: 15%;
`;

// 날짜
export const TableContentCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  width: 10%;
`;

// 내용없음
export const NotContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 22px;
  font-weight: 700;
  color: gray;
`;
