import styled from "@emotion/styled";

// 토스 색상코드: #0064ff
// 토스 색상코드 회색: #bec0c4

export const Wrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 0 0;
  padding: 20px 20px 0px 20px;
  border: 2px solid #0064ff;
  border-radius: 20px;
  width: 1200px;
`;

// 제목(title)
export const TitlesWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 0 20px;
  width: 100%;
  margin-top: 20px;
`;

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Remarks = styled.div`
  font-size: 18px;
  color: #bdbdbd;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: #4f4f4f;
`;

export const PickedCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PickedCount = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const PickedCountImg = styled.img`
  width: 30px;
  height: 30px;
`;

export const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #000000;
  padding-left: 20px;
  margin: 10px 0 30px 0;
  width: 100%;
`;

// 내용(contents)
export const ContentsWrap = styled.div`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Contents = styled.div`
  font-size: 18px;
  margin-top: 20px;
  width: 100%;
`;

export const ContentsImage = styled.img`
  border-radius: 10px;
  margin-bottom: 20px;
  width: 80%;
`;

// 태그
export const TagsWrap = styled.div`
  margin-top: 20px;
  width: 100%;
`;
export const Tags = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #bdbdbd;
`;

// 작성자(writer)
export const UserWrap = styled.div`
  border-bottom: 2px solid lightgray;
  /* border-radius: 10px; */
  width: 100%;
  padding: 0 10px 5px 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const WriterTimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 5px;
`;

export const WriterImg = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

export const WriterInfo = styled.div`
  font-size: 14px;
`;

export const TimeInfo = styled.div`
  font-size: 12px;
  color: gray;
`;

export const Tooltip = styled.div`
  border-radius: 10px;
  width: 60px;
  display: flex;
  justify-content: center;
`;

export const TooltipImg = styled.img``;

// 버튼
export const FooterWrap = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;
export const FooterBtnWrap = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  /* 임시 */
  margin-bottom: 60px;
`;

export const FooterBtn = styled.div`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    border: 2px solid #0064ff;
  }
`;

// 구매하기 or 수정하기
export const PrimaryButton = styled.div`
  border: 2px solid #0064ff;
  border-radius: 10px;
  background-color: #0064ff;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    border: 2px solid #bdbdbd;
    background-color: #fff;
    color: #000000;
  }
`;

// 카카오 맵 위치
export const KakaoMapWrap = styled.div`
  /* border: 1px solid #bdbdbd; */
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
`;

// export const KaKaoMapMarker
