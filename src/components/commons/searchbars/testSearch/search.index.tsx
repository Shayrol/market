// ❗ BoardsList 검색 결과에 대한 커스텀 훅

import { ApolloQueryResult } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import _ from "lodash";
import { ChangeEvent } from "react";
import * as S from "./search.style";

interface IKeyword {
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  refetchBoardsCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
  onChangeKeyword: (value: string) => void;
}

export default function TestSearch(props: IKeyword): JSX.Element {
  const getDebounce = _.debounce((value) => {
    void props.refetch({
      page: 1,
      search: value,
    });
    void props.refetchBoardsCount({
      search: value,
    });
    props.onChangeKeyword(value);
  }, 500);

  const Search = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value;
    getDebounce(searchValue);
  };

  return <S.SearchBar type="text" onChange={Search} placeholder="검색" />;
}

// 리스트 부분은 header, banner 부분 하기
// 게시글 작성 및 수정 부분 에러 수정하기
// - 게시글 등록하면 등록된  게시글 리스트에 업데이트 되지 않음
// - 수정하기 하면 등록한 이미지, 내용 등 사라짐
// 해당 게시글로 이동을 하면 이미지 크기, 내용 수정
// - 삭제, 수정 버튼
