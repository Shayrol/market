import { useQuery } from "@apollo/client";
// import { useFetchUsedItemQuestionAnswers } from "../../../commons/hooks/graphql-queries/useQUeryFetchUsedItemQuestionAnswers"
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../commons/types/generated/types";
import * as S from "./QuestionAnswer.styles";
import { getDate } from "../../../../commons/libraries/utils";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../graphql-queries/useQUeryFetchUsedItemQuestionAnswers";

interface IProps {
  questionAnswer: string;
}

export default function QuestionAnswer(props: IProps): JSX.Element {
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: {
      page: 1,
      useditemQuestionId: props.questionAnswer,
    },
  });

  return (
    <div>
      {data?.fetchUseditemQuestionAnswers &&
      data?.fetchUseditemQuestionAnswers.length > 0 ? (
        <S.Wrap>
          <S.QuestionAnswerImg src="/images/marketsComment/subdirectory_arrow_right.png" />
          <S.QuestionAnswerWrap>
            {data.fetchUseditemQuestionAnswers.map((el) => (
              <S.QuestionAnswerWrap key={el._id}>
                {el.useditemQuestion._id === props.questionAnswer && (
                  <S.UserWrap>
                    <S.QuestionAnswerPicture
                      src={`https://storage.googleapis.com/${el.user.picture}`}
                    />
                    <S.UserInfoWrap>
                      <S.QuestionAnswerUserName>
                        {el.user.name}
                      </S.QuestionAnswerUserName>
                      <S.QuestionAnswerContent>
                        {el.contents}
                      </S.QuestionAnswerContent>
                      <S.QuestionAnswerCreatedAt>
                        {getDate(el.createdAt)}
                      </S.QuestionAnswerCreatedAt>
                    </S.UserInfoWrap>
                  </S.UserWrap>
                )}
              </S.QuestionAnswerWrap>
            ))}
          </S.QuestionAnswerWrap>
        </S.Wrap>
      ) : (
        <></>
      )}
    </div>
  );
}
