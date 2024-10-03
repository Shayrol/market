import styled from "@emotion/styled";

// 대댓글
export const Wrap = styled.div`
  display: flex;
`;
export const QuestionAnswerImg = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 10px;
`;

export const QuestionAnswerWrap = styled.div`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

export const QuestionAnswerContent = styled.div`
  font-size: 15px;
  font-weight: 200;
  /* 글자 줄 바꿈 - word-wrap / overflow-wrap */
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 3px 0 10px 10px;
`;

export const QuestionAnswerPicture = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const UserWrap = styled.div`
  display: flex;
`;

export const UserInfoWrap = styled.div`
  width: 100%;
  margin-left: 5px;
`;

export const QuestionAnswerUserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  :hover {
    font-weight: 700;
  }
`;

export const QuestionAnswerCreatedAt = styled.div`
  font-size: 12px;
  color: #bdbdbdbd;
`;
