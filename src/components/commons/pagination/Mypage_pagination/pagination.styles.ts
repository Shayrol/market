import styled from "@emotion/styled";

export interface IPageProps {
  isActive: boolean;
}

export const PageNation = styled.div`
  display: flex;
`;

export const Page = styled.span`
  padding: 5px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  color: ${(props: IPageProps) => (props.isActive ? "red" : "black")};
`;

export const NextPage = styled.span`
  padding: 5px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  margin-left: 20px;
`;

export const PrevPage = styled.span`
  padding: 5px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  margin-right: 20px;
`;
