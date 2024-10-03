import { useState } from "react";
import { useQueryFetchUsedItemsCountISold } from "../../../../commons/hooks/graphql-queries/useQueryFetchUsedItemsCountISold";
import { useQueryFetchUsedItemsISold } from "../../../../commons/hooks/graphql-queries/useQueryFetchUsedItemsISold";
import * as S from "./mypageMain_iSold.index.styles";
import { getDate } from "../../../../../commons/libraries/utils";
import MyPagePagination from "../../../../commons/pagination/Mypage_pagination/pagination.index";
import Search from "../../../../commons/searchbars/ItemsISold/search.index";

export default function TapMyPageISold(): JSX.Element {
  const { data, refetch } = useQueryFetchUsedItemsISold();
  const { data: dataCount } = useQueryFetchUsedItemsCountISold();

  const [keyword, setKeyword] = useState<string>("");

  return (
    <div>
      <S.SearchWrap>
        <Search refetch={refetch} keyword={keyword} setKeyword={setKeyword} />
      </S.SearchWrap>
      {data?.fetchUseditemsISold && data.fetchUseditemsISold.length > 0 ? (
        <div>
          <S.Wrap>
            <S.TableHeadWrap>
              <S.TableNumber>ID</S.TableNumber>
              <S.TableContentItemName>상품명</S.TableContentItemName>
              <S.TablePrice>판매가격</S.TablePrice>
              <S.TableCreatedAt>날짜</S.TableCreatedAt>
            </S.TableHeadWrap>
            {data?.fetchUseditemsISold.map((el) => (
              <S.TableContentsWrap key={el._id}>
                <S.TableContentsNumber>
                  {el._id.slice(-4).toUpperCase()}
                </S.TableContentsNumber>
                <S.TableContentImpID>{el.name}</S.TableContentImpID>
                <S.TableContentPrice>
                  {el.price?.toLocaleString("ko-KR")}원
                </S.TableContentPrice>
                <S.TableContentCreatedAt>
                  {getDate(el.createdAt)}
                </S.TableContentCreatedAt>
              </S.TableContentsWrap>
            ))}
          </S.Wrap>
          <MyPagePagination
            refetch={refetch}
            count={dataCount?.fetchUseditemsCountISold}
            keyword={keyword}
          />
        </div>
      ) : (
        <S.NotContents>나의상품내역이 없습니다.</S.NotContents>
      )}
    </div>
  );
}
