import { getDate } from "../../../../../commons/libraries/utils";
import { useQueryFetchPointTransactionsCountOfSelling } from "../../../../commons/hooks/graphql-queries/useQueryFetchPointTransactionsCountOfSelling";
import { useQueryFetchPointTransactionsOfSelling } from "../../../../commons/hooks/graphql-queries/useQueryFetchPointTransactionsOfSelling";
import MyPointPagination from "../../../../commons/pagination/Mypoint_pagination/pagination.index";
import * as S from "./mypoint_selling.styles";

export default function TapPointSelling(): JSX.Element {
  const { data, refetch } = useQueryFetchPointTransactionsOfSelling();
  const { data: dataCount } = useQueryFetchPointTransactionsCountOfSelling();

  return (
    <div>
      {data?.fetchPointTransactionsOfSelling &&
      data.fetchPointTransactionsOfSelling.length > 0 ? (
        <div>
          <S.Wrap>
            <S.TableHeadWrap>
              <S.TableCreatedAt>거래일</S.TableCreatedAt>
              <S.TableName>상품명</S.TableName>
              <S.TableAmount>거래내역</S.TableAmount>
              <S.TableBalance>거래 후 잔액</S.TableBalance>
            </S.TableHeadWrap>
            {data?.fetchPointTransactionsOfSelling.map((el) => (
              <S.TableContentsWrap key={el._id}>
                <S.TableContentCreatedAt>
                  {getDate(el.createdAt)}
                </S.TableContentCreatedAt>
                <S.TableContentName>{el.useditem?.name}</S.TableContentName>
                <S.TableContentAmount isStatusAmount={el.status === "구매"}>
                  {el.amount?.toLocaleString("ko-KR")}원
                </S.TableContentAmount>
                <S.TableContentBalance>
                  {el.balance?.toLocaleString("ko-KR")}원
                </S.TableContentBalance>
              </S.TableContentsWrap>
            ))}
          </S.Wrap>
          <MyPointPagination
            refetch={refetch}
            count={dataCount?.fetchPointTransactionsCountOfSelling}
          />
        </div>
      ) : (
        <S.NotContents>판매내역이 없습니다.</S.NotContents>
      )}
    </div>
  );
}

// 판매내역의 검색창은 불필요한 API 요청만 생기고 필요성을 못 느껴 제외함
