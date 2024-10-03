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
export const TitleWrap = styled.div`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  padding-left: 10px;
  width: 100%;
  height: 47px;
  margin-bottom: 20px;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  line-height: 47px;
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
  /* justify-content: center; */
  align-items: center;
`;

export const Contents = styled.div`
  font-size: 18px;
  width: 100%;
  /* margin-top: 30px; */
`;

export const ContentsImage = styled.img`
  border-radius: 10px;
  margin-bottom: 20px;
  width: 80%;
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
`;

export const FooterBtn = styled.div`
  border: 2px solid #bec0c4;
  border-radius: 10px;
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

  /* 임시 */
  margin-bottom: 60px;
`;

// 좋아요 / 싫어요
export const LikeCountWrap = styled.div`
  /* border: 1px solid red; */
  width: 500px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const LikeCountBtnWrap = styled.div`
  /* border: 1px solid blue; */
  margin-right: 20px;
`;
export const DislikeCountBtnWrap = styled.div`
  /* border: 1px solid blue; */
`;

export const LikeCountImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const LikeCount = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
`;
