import styled from "@emotion/styled";

// 토스 색상코드: #0064ff
// 토스 색상코드 회색: #bec0c4

export const Wrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 30px 0;
  padding: 20px 20px 0px 20px;
  border: 2px solid #0064ff;
  border-radius: 20px;
  width: 1200px;
`;

export const CommentWrap = styled.div`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  :hover {
    border: 2px solid #0064ff;
  }
`;

export const CommentListWrap = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 5px;
`;

export const CommentList = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

export const CommentCreatedAt = styled.div`
  font-size: 10px;
  color: gray;
  margin-left: 5px;
`;

export const CommentContent = styled.div`
  font-size: 15px;
  font-weight: 200;
  /* 글자 줄 바꿈 - word-wrap / overflow-wrap */
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: 10px;
`;

export const CommentBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CommentEditDlt = styled.div`
  font-size: 13px;
  margin-left: 5px;
  cursor: pointer;
  :hover {
    color: gray;
  }
`;

// 게시글 댓글 작성
export const CommentWriteWrap = styled.div`
  width: 100%;
`;

export const InputWrite = styled.input`
  border: 2px solid #ccc;
  border-radius: 6px;
  padding: 2px 5px;
  margin: 0 10px 10px 0;
  outline: none;
  &:focus {
    border-color: #0064ff;
  }
`;
export const InputPassword = styled.input`
  border: 2px solid #ccc;
  border-radius: 6px;
  padding: 2px 5px;
  margin: 0 10px 10px 0;
  outline: none;
  &:focus {
    border-color: #0064ff;
  }
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

export const CommentWriteBtnWrap = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

export const CommentWriteBtn = styled.div`
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  padding: 2px 5px;
  cursor: pointer;

  :hover {
    border-color: #0064ff;
  }
`;

// 경계선
export const Line = styled.div`
  width: 100%;
  margin: 20px 0;
  border: 1px solid #ccc;
`;
