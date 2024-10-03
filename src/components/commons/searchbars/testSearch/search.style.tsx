import styled from "@emotion/styled";

export const SearchBar = styled.input`
  border-radius: 20px;
  width: 600px;
  outline: none;
  padding: 15px 30px;
  font-size: 18px;
  :focus {
    border: 2px solid #0064ff;
    transition: border-color 0.3s ease;
  }
`;
