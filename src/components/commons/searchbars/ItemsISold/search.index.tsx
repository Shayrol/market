// ❗ 상품 검색 결과에 대한 커스텀 훅

import { Dispatch, SetStateAction, useRef } from "react";
import * as S from "./search.index.styled";

interface ISearchProps {
  refetch: any;
  setKeyword: Dispatch<SetStateAction<string>>;
  keyword: string;
}

const Search = (props: ISearchProps): JSX.Element => {
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const onSearch = async (): Promise<void> => {
    if (scrollableDivRef.current) scrollableDivRef.current.scrollTo({ top: 0 });
    await props.refetch({
      page: 1,
      search: props.keyword,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.setKeyword(e.target.value);
  };

  const handleSearchKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === "Enter") {
      await onSearch();
    }
  };

  return (
    <S.SearchWrap>
      <S.SearchInput
        type="text"
        value={props.keyword}
        onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress}
        placeholder="검색어를 입력하세요"
      />
      <S.SearchBtn onClick={onSearch}>검색</S.SearchBtn>
    </S.SearchWrap>
  );
};

export default Search;
