import styled from "@emotion/styled";

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
