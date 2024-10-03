import { getDate } from "../../../../../commons/libraries/utils";
import { useQueryFetchPointTransactionsCountOfBuying } from "../../../../commons/hooks/graphql-queries/useQueryFetchPointTransactionsCountOfBuying";
import { useQueryFetchPointTransactionsOfBuying } from "../../../../commons/hooks/graphql-queries/useQueryfetchPointTransactionsOfBuying";
import MyPointPagination from "../../../../commons/pagination/Mypoint_pagination/pagination.index";
import * as S from "./mypoint_buying.styles";

export default function TapPointBuying(): JSX.Element {
  const { data, refetch } = useQueryFetchPointTransactionsOfBuying();
  const { data: dataCount } = useQueryFetchPointTransactionsCountOfBuying();

  return (
    <div>
      {data?.fetchPointTransactionsOfBuying &&
      data.fetchPointTransactionsOfBuying.length > 0 ? (
        <div>
          <S.Wrap>
            <S.TableHeadWrap>
              <S.TableCreatedAt>거래일</S.TableCreatedAt>
              <S.TableItemName>상품명</S.TableItemName>
              <S.TableAmount>거래내역</S.TableAmount>
              <S.TableBalance>거래 후 잔액</S.TableBalance>
              <S.TableSeller>판매자</S.TableSeller>
            </S.TableHeadWrap>
            {data?.fetchPointTransactionsOfBuying.map((el) => (
              <S.TableContentsWrap key={el._id}>
                <S.TableContentCreatedAt>
                  {getDate(el.createdAt)}
                </S.TableContentCreatedAt>
                <S.TableContentItemName>
                  {el.useditem?.name}
                </S.TableContentItemName>
                <S.TableContentAmount isStatusAmount={el.status === "구매"}>
                  {el.amount?.toLocaleString("ko-KR")}원
                </S.TableContentAmount>
                <S.TableContentBalance>
                  {el.balance?.toLocaleString("ko-KR")}원
                </S.TableContentBalance>
                <S.TableContentSeller>
                  {el.useditem?.seller?._id.slice(-4).toUpperCase()}
                </S.TableContentSeller>
              </S.TableContentsWrap>
            ))}
          </S.Wrap>
          <MyPointPagination
            refetch={refetch}
            count={dataCount?.fetchPointTransactionsCountOfBuying}
          />
        </div>
      ) : (
        <S.NotContents>구매내역이 없습니다.</S.NotContents>
      )}
    </div>
  );
}

// seller.name과 email의 값이 null인 상태로 data를 받아옴
// 그래서 해당 useditem의 seller의 값을 _id로 대체함 - (seller의 _id는 정상적으로 불러옴)
// 구매내역의 검색창은 불필요한 API 요청만 생기고 필요성을 못 느껴 제외함
