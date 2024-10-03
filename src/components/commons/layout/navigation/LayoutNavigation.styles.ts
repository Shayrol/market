import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  background-color: #0064ff;
  color: black;
  top: 60px;
  z-index: 1;
`;

export const Menu = styled.div`
  margin: 0 60px;
  color: white;
  :hover {
    color: #bec0c4;
    cursor: pointer;
  }
  flex-shrink: 0;
`;
