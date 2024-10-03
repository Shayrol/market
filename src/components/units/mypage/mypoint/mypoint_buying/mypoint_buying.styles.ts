import styled from "@emotion/styled";

// 포인트 상태에 따라 색상 및 +- 스타일
interface MyStatusAmount {
  isStatusAmount: boolean;
}

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

// 거래일
export const TableCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 10%;
`;

// 상품명
export const TableItemName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 20%;
`;

// 거래내역
export const TableAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 20%;
`;

// 거래 후 잔액
export const TableBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 15%;
`;

// 판매자
export const TableSeller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 15%;
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

// 거래일
export const TableContentCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  width: 10%;
`;

// 상품명
export const TableContentItemName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  width: 20%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 거래내역
export const TableContentAmount = styled.div<MyStatusAmount>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => (props.isStatusAmount ? "#0031E0" : "#FFD600")};
  width: 20%;

  ::before {
    content: "${(props) => (props.isStatusAmount ? "" : "+")}";
  }
`;

// 거래 후 잔액
export const TableContentBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #4f4f4f;
  width: 15%;
`;

// 판매자
export const TableContentSeller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #4f4f4f;
  width: 15%;
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
