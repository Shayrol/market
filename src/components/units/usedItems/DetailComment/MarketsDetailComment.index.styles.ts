import styled from "@emotion/styled";

export const Wrap = styled.div`
  border: 2px solid #0064ff;
  border-radius: 15px;
  width: 100%;
  margin-top: 20px;
  padding: 20px 20px 0 20px;
`;

// 문의하기
export const CommentInfoWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
`;
export const CommentInfoImg = styled.img`
  width: 20px;
  height: 20px;
  margin: 4px 10px 0 0;
`;
export const CommentInfoName = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

// comment
export const TextAreaWrap = styled.div`
  margin-top: 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px 15px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  resize: none; /* 크기 조절 불가 */

  &:focus {
    outline: none;
    border-color: #0064ff;
  }
  &::-webkit-scrollbar {
    width: 12px; /* 스크롤 바의 너비 */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤 바의 트랙 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤 바의 색상 */
    border-radius: 10px;
    border: 2px solid #f1f1f1; /* 스크롤 바의 테두리 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* 스크롤 바를 호버할 때 색상 */
  }
`;

// 등록버튼 공간
export const CommentWriteBtnWrap = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

// 등록버튼
export const CommentWriteBtn = styled.button`
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  padding: 2px 5px;
  cursor: pointer;

  :hover {
    border-color: #0064ff;
  }
`;

// form 태그
export const QuestionForm = styled.form``;

// 댓글
export const CommentWrap = styled.div`
  border: 2px solid #bec0c4;
  display: flex;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  :hover {
    border: 2px solid #0064ff;
  }
`;

export const QuestionAnswerInputWrap = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  margin: 0 0 0 5px;
`;

export const QuestionWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 0 5px;
`;

export const QuestionName = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

export const QuestionCreatedAt = styled.div`
  font-size: 12px;
  color: #bdbdbd;
`;

export const QuestionAnswerPicture = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const QuestionContent = styled.div`
  font-size: 15px;
  font-weight: 200;
  /* 글자 줄 바꿈 - word-wrap / overflow-wrap */
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 3px 0 10px 10px;
`;

export const QuestionAnswerWrap = styled.div`
  display: flex;
  align-items: end;
`;

export const QuestionAnswerImg = styled.img`
  display: flex;
  align-items: end;
  width: 25px;
  height: 25px;
  font-size: 13px;
  margin-left: 5px;
  cursor: pointer;
`;

export const QuestionImg = styled.img`
  width: 25px;
  height: 25px;
  /* margin: 0 10px; */
`;
