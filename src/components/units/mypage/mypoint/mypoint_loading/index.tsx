import { getDate } from "../../../../../commons/libraries/utils";
import { useQueryFetchPointTransactionsCountOfLoad } from "../../../../commons/hooks/graphql-queries/useQueryFetchPointTransactionsCountOfLoad";
import { useQueryFetchPointTransactionsOfLoading } from "../../../../commons/hooks/graphql-queries/useQueryFetchPointTransactionsOfLoading";
import MyPointPagination from "../../../../commons/pagination/Mypoint_pagination/pagination.index";
import * as S from "./mypoint_loading.styles";

export default function TapPointLoading(): JSX.Element {
  const { data, refetch } = useQueryFetchPointTransactionsOfLoading();
  const { data: dataCount } = useQueryFetchPointTransactionsCountOfLoad();

  return (
    <div>
      {data?.fetchPointTransactionsOfLoading &&
      data.fetchPointTransactionsOfLoading.length > 0 ? (
        <div>
          <S.Wrap>
            <S.TableHeadWrap>
              <S.TableCreatedAt>충전일</S.TableCreatedAt>
              <S.TableImpID>결제 ID</S.TableImpID>
              <S.TableAmount>충전내역</S.TableAmount>
              <S.TableBalance>충전 후 잔액</S.TableBalance>
            </S.TableHeadWrap>
            {data?.fetchPointTransactionsOfLoading.map((el) => (
              <S.TableContentsWrap key={el._id}>
                <S.TableContentCreatedAt>
                  {getDate(el.createdAt)}
                </S.TableContentCreatedAt>
                <S.TableContentImpID>{el.impUid}</S.TableContentImpID>
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
            count={dataCount?.fetchPointTransactionsCountOfLoading}
          />
        </div>
      ) : (
        <S.NotContents>충전내역이 없습니다.</S.NotContents>
      )}
    </div>
  );
}
