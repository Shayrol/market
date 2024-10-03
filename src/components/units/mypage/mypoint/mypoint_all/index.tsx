import { getDate } from "../../../../../commons/libraries/utils";
import { useQueryFetchPointTransactions } from "../../../../commons/hooks/graphql-queries/useQueryFetchPointTransactions";
import * as S from "./mypoint_all.styles";

export default function TapPointAll(): JSX.Element {
  const { data, refetch } = useQueryFetchPointTransactions();

  return (
    <div>
      {data?.fetchPointTransactions &&
      data.fetchPointTransactions.length > 0 ? (
        <div>
          <S.Wrap>
            <S.TableHeadWrap>
              <S.TableCreatedAt>날짜</S.TableCreatedAt>
              <S.TableStatus>내용</S.TableStatus>
              <S.TableAmount>거래 및 충전 내역</S.TableAmount>
              <S.TableBalance>잔액</S.TableBalance>
            </S.TableHeadWrap>
            {data?.fetchPointTransactions.map((el) => (
              <S.TableContentsWrap key={el._id}>
                <S.TableContentCreatedAt>
                  {getDate(el.createdAt)}
                </S.TableContentCreatedAt>
                {/* <S.TableContentStatusWrap> */}
                <S.Status
                  isStatus={
                    el.status === "구매"
                      ? "구매"
                      : el.status === "충전"
                      ? "충전"
                      : "판매"
                  }
                >
                  {el.status}
                </S.Status>
                {/* </S.TableContentStatusWrap> */}
                <S.TableContentAmount isStatusAmount={el.status === "구매"}>
                  {el.amount?.toLocaleString("ko-KR")}원
                </S.TableContentAmount>
                <S.TableContentBalance>
                  {el.balance?.toLocaleString("ko-KR")}원
                </S.TableContentBalance>
              </S.TableContentsWrap>
            ))}
          </S.Wrap>
          <S.TextInfo1>
            전체 내역 중 최근 10개의 내역만 확인할 수 있습니다.
          </S.TextInfo1>
          <S.TextInfo2>상세 내역 확인은 상단 탭을 이용해 주세요.</S.TextInfo2>
        </div>
      ) : (
        <S.NotContents>전체내역이 없습니다.</S.NotContents>
      )}
    </div>
  );
}

// pagination을 추가하지 않은 이유는 해당 data에 대한 count가 없으며
// 전체가 아닌 구매, 판매, 충전내역에서의 각각의 count API 요청을 할 수 있어
// 전체내역은 단순 최근 10개의 내역을 보여주는 느낌...
