import { MouseEvent, useState } from "react";
import * as S from "./MarketsDetailComment.index.styles";
import {
  FETCH_USED_ITEM_QUESTIONS,
  useFetchUsedItemQuestions,
} from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItemQuestions";
import { useMutationCreateUsedItemQuestion } from "../../../commons/hooks/graphql-mutation/useMutationCreateUsedItemQuestion";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemDetailComment } from "../../../commons/hooks/yup/validation";
import { useMutationCreateUsedItemQuestionAnswer } from "../../../commons/hooks/graphql-mutation/useMutationCreateUsedItemQuestionAnswer";
import { gql } from "@apollo/client";
import QuestionAnswer from "../../../commons/hooks/QuestionAnswer-MarketDetail/QuestionAnswer";
import { getDate } from "../../../../commons/libraries/utils";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../../../commons/hooks/graphql-queries/useQUeryFetchUsedItemQuestionAnswers";
// import { useMutationDeleteUsedItemQuestion } from "../../../commons/hooks/graphql-mutation/useMutationDeleteUsedItemQuestion";

interface IForm {
  question: string;
  questionAnswer: string;
}

export default function MarketsDetailComment(): JSX.Element {
  const termsOfUseNotice: string =
    "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  const [questionID, setQuestionID] = useState<string>(""); // 상태 변경
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IForm>({
    mode: "onChange",
    context: yupResolver(ItemDetailComment),
  });

  const { data } = useFetchUsedItemQuestions();
  const [createUseditemQuestion] = useMutationCreateUsedItemQuestion();
  const [createUseditemQuestionAnswer] =
    useMutationCreateUsedItemQuestionAnswer();
  // const [deleteUseditemQuestion] = useMutationDeleteUsedItemQuestion();
  const [resetValue] = useState("");

  // 댓글의 대댓글 입력을 하기 위함 - 또한 해당 댓글의 id 가져오기 위함
  const onClickQuestion = (event: MouseEvent<HTMLImageElement>): void => {
    const id = event.currentTarget.id;
    setQuestionID((prev) => (prev === id ? "" : id)); // 동일한 ID를 클릭하면 닫기
  };

  const onClickQuestionSubmit = async (data_: IForm): Promise<void> => {
    const createUseditemQuestionInput = {
      contents: data_.question,
    };

    await createUseditemQuestion({
      variables: {
        createUseditemQuestionInput,
        useditemId: String(router.query.useditemId),
      },
      // 댓글 생성하면서 댓글 최신화로 화면에 바로 update
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS,
          variables: { page: 1, useditemId: String(router.query.useditemId) },
        },
      ],
    });
    reset(); // 폼 리셋
  };

  // 대댓글 입력 시 실행 함수
  const onClickQuestionAnswerSubmit = async (data_: IForm): Promise<void> => {
    const createUseditemQuestionAnswerInput = {
      contents: data_.questionAnswer,
    };
    await createUseditemQuestionAnswer({
      variables: {
        createUseditemQuestionAnswerInput,
        useditemQuestionId: questionID,
      },
      // 대댓글 입력 시 바로 화면에 update
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTION_ANSWERS,
          variables: {
            page: 1,
            useditemQuestionId: questionID,
          },
        },
      ],
    });
    reset({ questionAnswer: "" }); // 폼 리셋
    setQuestionID("");
  };

  console.log("id확인: ", data?.fetchUseditemQuestions);

  // 댓글 삭제 - 공간이 애매해져서 사용 안함
  // const onClickDeleteQuestion = (event: MouseEvent<HTMLDivElement>): void => {
  //   void deleteUseditemQuestion({
  //     variables: { useditemQuestionId: event.currentTarget.id },
  //     refetchQueries: [
  //       {
  //         query: FETCH_USED_ITEM_QUESTIONS,
  //         variables: {
  //           page: 1,
  //           useditemId: router.query.useditemId,
  //         },
  //       },
  //     ],
  //   });
  // };

  return (
    <S.Wrap>
      <form onSubmit={handleSubmit(onClickQuestionSubmit)}>
        <S.CommentInfoWrap>
          <S.CommentInfoImg src="/images/marketsComment/comment.png" />
          <S.CommentInfoName>문의하기</S.CommentInfoName>
        </S.CommentInfoWrap>
        <S.TextAreaWrap>
          <S.TextArea
            placeholder={termsOfUseNotice}
            {...register("question")}
            defaultValue={resetValue}
          />
        </S.TextAreaWrap>
        <S.CommentWriteBtnWrap>
          <S.CommentWriteBtn type="submit">등록</S.CommentWriteBtn>
        </S.CommentWriteBtnWrap>
      </form>

      {data?.fetchUseditemQuestions &&
      data?.fetchUseditemQuestions?.length > 0 ? (
        data.fetchUseditemQuestions.map((el) => (
          <div key={el._id}>
            <S.CommentWrap>
              <S.QuestionAnswerPicture
                src={`https://storage.googleapis.com/${el.user.picture}`}
              />
              <S.QuestionWrap>
                <S.QuestionName>{el.user.name}</S.QuestionName>
                <S.QuestionContent>{el.contents}</S.QuestionContent>
                <S.QuestionCreatedAt>
                  {getDate(el.createdAt)}
                </S.QuestionCreatedAt>
              </S.QuestionWrap>
              <S.QuestionAnswerWrap>
                <S.QuestionAnswerImg
                  id={el._id}
                  src="/images/marketsComment/question_answer.png"
                  onClick={onClickQuestion}
                  itemType="button"
                />
              </S.QuestionAnswerWrap>
            </S.CommentWrap>
            {questionID === el._id && (
              <S.QuestionForm
                onSubmit={handleSubmit(onClickQuestionAnswerSubmit)}
              >
                <S.QuestionAnswerInputWrap>
                  <S.QuestionImg src="/images/marketsComment/subdirectory_arrow_right.png" />
                  <S.TextArea
                    placeholder={termsOfUseNotice}
                    {...register("questionAnswer")}
                    defaultValue={resetValue}
                  />
                </S.QuestionAnswerInputWrap>
                <S.CommentWriteBtnWrap>
                  <S.CommentWriteBtn type="submit">답글등록</S.CommentWriteBtn>
                </S.CommentWriteBtnWrap>
              </S.QuestionForm>
            )}
            <div>
              <QuestionAnswer questionAnswer={el._id} />
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </S.Wrap>
  );
}

// 🎈 2024.08.18.일 /
// 1. 댓글 기능 완
// 2. 해당 댓글의 답글 기능 구현해야함
//
// 문제점:
// 1. 댓글의 답글을 달고 => 답글의 답답글을 추가 하는 방법을 찾는데
// 간단하게 생각하면 다음과 같이 생각한다.
// MarketDetail => Question
// Question => QuestionAnswer
// 이렇게 Question을 해당 아이템 상품으로 잡고
// QuestionAnswer를 답글이 아닌 댓글로 생각하면 된다.

// 또한 Question에서 답글(QuestionAnswer)이 달리고 또 뒤에 추가 될때
// 여기서 생각해야 할 것은 몇가지 조건이 있는데
// 댓글에서 답글
// 댓글에서 다른사람이 추가 답글
// 답글에서 답글
// 답글에서 다른사람이 추가 답글
// 이렇게 했을 때 화면을 어떻게 보여주고 어떻게 data를 가져와야 하는지...
//
// 해결방안:
//   일단 생각한 방법은 댓글에서 추가한 답글은 같은 입력창 크기로 답글을 추가하고
//   답글에서 추가 답답글을 추가하면 답글보다 작은 크기로 추가되게 해줄 듯
//   여기서 계속 같은 답글의 답글 or 답답글을 하면 해당 답답글 크기로 추가되게 해주는게 될 듯
//
// 즉 댓글의 크기가 100 이면
// 댓글의 답글의 크기는 80 이고
// 답글의 답답글의 크기는 60 이고
// 답글, 답답글에서 계속 달리는 글은 60으로 고정할 것이다.
// 따라서 댓글에서 달린 답글의 크기만 달라질 듯
// 상황에 따라서 60의 크기를 없애고 80크기로 계속 추가할 듯?

// 해야할 것:
// 1. 댓글, 답글 완성하기 - 작성자 프로필 사진 등 추가
// 2. Header 최적화
// 3. ApolloClient - accessToken 최적화
// 4. Banner 이미지 변경
// 5. 배포
//

// 🎈 2024.08.19.월 /
// 1. 댓글의 대댓글 등록하기 완성 - 스타일 부분만 해결하기
// 2. 대댓글의 API 요청을 한 번을 통해 가져오지 않고 하나하나 API 요청이 일어남 확인할 것
//
// 해야할 것:
// 1. 대댓글 API 요청 문제 해결하기
// 2. 대댓글 스타일 완성하기
// 3. 코드 정리 하기
//
// 해결한 방법:
// 1. 대댓글을 가져오지 못하는 경우, 가져오더라도 해당 댓글의 대댓글을 어떻게 가져올지에 대해
//    많은 문제가 되었다.
// 2. 해결을 하기 위해서는 graphql의 playground에 있는 API의 fetchUseditemQuestionAnswers
//    설명을 보면 대댓글의 _id가 있고 useditemQuestion의 _id가 있다.
//    즉 참조를 통해 data의 값을 가져오라는 건데
//    앞서 설명하기전 다음과 같다.
// 3. 해당 상품에 들어가면 댓글을 가져오기 위해서는 해당 useditemId의 값을 variables에 ID 값을
//    넣어서 가져왔다.
// 4. 그럼 해당 댓글의 ID를 가지고 대댓글의 id 또한 가져올 수 있다.
// 5. 댓글을 .map()함수를 통해 data를 가져왔으면 해당 el._id(댓글의 id)를 대댓글의 data를
//    가져오기 위해 variables에 넣어 el._id와 가져온 data의 useditemQUestion._id 와 비교를
//    해서 해당 댓글의 대댓글을 불러올 수 잇다.

// 하면서 문제점:
// 1. 참조를 하기 위해 useditemQuestion {}의 객체 안에 _id 값을 사용을 했는데 이외에도
//    useditemQuestion의 객체 안에는 { _id contents useditem{} user{} } 등 여러 값을
//    불러올 수 잇다.
// 2. 근데 여기서 문제가 해당 fetchUseditemQuestionAnswers의 API는 해당 useditemQuestion을
//    _id 값만 받을려 하고 있어 다른 객체의 key를 사용하면 에러가 생거 data를 불러오지 못한다.
//    나는 해당 contents가 필요 없는데도 계속 사용을 하고 있어 에러로
//    useditemQuestion의 contents는 없다고 뜨는데 왜 못가져오는지 이해를 하지 못했다.
// 3. 결국 contents라는 key 값을 사용하지 못하는 거였고 사용하지 않음으로 해결을 할 수 있다.

// 정리:
// 1. 댓글을 생성을 하면 해당 Question의 Id 값이 생긴다.
// 2. 대댓글의 fetchUseditemQuestionAnswers의 variables에 넣어 댓글의 id를 넣으면 data를
//    가져올 수는 있다.
// 3. 하지만 댓글이 여러 있으면 어떻게 가져올 것인가?
// 4. 대댓글만 따로 커스텀 훅으로 빼돌어 props로 댓글의 id 값을 받아오도록 했다.
// 5. 댓글의 id는 위해서 댓글의 data를 출력하기위해 .map((el))를 통해 각각의 댓글을 나눴던걸
//    활용해 el._id를 props로 넘겨주고 있다.
//    <QuestionAnswer questionAnswer={el._id} />
// 6. 이걸 통해 data를 가져오고 출력으로 해당 댓글의 대댓글을 구분을 해야하는데 이는 다음과 같다.
//    props.questionAnswer === el.useditemQuestion._id && <></> (보여줄 data 입력)
//    이렇게 해서 구분을 했다.
//    el.useditemQuestion은 fetchUseditemQuestionAnswers의 map()함수를 통해 나온 것
// 7. 이렇게 해서 해당 게시글의 댓글과 각각의 댓글에 달린 대댓글들을 불러올 수 있다.
// 한가지 문제점이라면 대댓글을 한 번의 API 통해 불러오지 못하고
// 대댓글 하나하나 불러오고 있다.
// (댓글에 달린 대댓글 전부 한 번의 API 통해 가져오는 것이 아닌 각각의 대댓글을 요청함)
//

// 🎈 2024.08.20.화 /
// 1. 댓글, 대댓글 구현 완
//
// 해야할 것:
// 1. 진짜 refreshAccessToken 최적화 - 리렌더링 등 문제 해결하기
// 2. 코드 파일 정리 - test 파일, 안쓰는 컴포넌트 등 정리
// 3. container, presenter 분리된 컴포넌트 하나의 index로 합치기
// 4. 댓글, 대댓글 수정, 삭제 추가
// 5. 배포하기
//
// 수정된 점:
// 1. 로그인에 대한 정보 - LayoutHeader의 로그인 정보를 가져오는 useQueryFetchUserLoggedIn
//    이제 여러번 요청하지 않음
//    이전에 로그아웃 후 다른 계정으로 로그인을 하면 이전의 계정이 남아있는 현상이 있었음
//    그래서 useEffect로 refetch로 해줬는데 이것 때문에 계속 api 요청이 나감
// 2. 해당 useEffect를 지우고 2가지 방법을 사용함
//     - 로그인 시 refetch를 하도록 했음 refetchQueries를 사용해 불 필요한 api 요청 없이
//       로그인 버튼 클릭한 실행하도록 했음
//     - 로그아웃 시 ApolloClient의 cache를 삭제하도록 했음
//       이전에 client.resetStore()를 했을 때 삭제와 동시에 다시 API 요청으로 data를
//       받아왔는데 client.clearStore()으로 재 요청 없이 cache만 삭제 했음
//   이렇게 해서 다른 계정으로 로그인 시 로그인 한 정보도 최신화 잘 되고
//   useQueryFetchUserLoggedIn의 불필요한 API 요청 없이 한 번만 잘 요청이 감.
//
// 최종:
// 1. 마찬가지로 새로고침을 하면 일정하게 같은 API가 3번 요청이 나감
//      - 여기서 ApolloSetting의 useEffect()를 사용 안하면 2번 요청이 나감 - refreshToken
// 2. 불필요한 컴포넌트 파일 정리하기 - Test 뭐시기 등등
// 3. 하나의 index 컴포넌트가 아닌 것들 합치기
// 4. 댓글, 대댓글 수정, 삭제 추가
// 5. 배포

// 새로고침으로 인한 API 요청이 여러번 나가는 이유가 추측이지만 refreshToken를 하면서
// 생긴 문제라 생각한다.
// app컴포넌트에서 Layout, component보다 상위 즉 부모 컴포넌트로 있어 부모 컴포넌트 변경으로
// 자식 컴포넌트도 리렌더링으로 API 요청이 일어나는 것 같다.
// refreshToken을 통해 새로운 accessToken을 발급 하고 있는 getAccessToken() 함수나
// ApolloSetting의 memo를 통해 부모가 변경이 일어나도 자식 컴포넌트까지 리렌더링이 일어나지
// 않게 해주든 일단 2가지 방법을 생각해 봐야할 것 같다.
//

// 🎈 2024.08.21.수 /
// 1. 새로고침으로 API 중복요청이 일어난 이유 알음
// 2. ApolloSetting의 refreshAccessToken에서 생긴 문제였음
//    새로고침으로 recoil의 accessToken이 없는 상태에서 다시 refreshAccessToken을 통해
//    새로운 accessToken을 받아오는 과정에서 <Layout> 컴포넌트가 실행이 되면서 생긴 문제 였음
// 3. <Layout>에서 LayoutHeader에서는 로그인에 필요한 accessToken이 있어야
//    로그인 유지가 가능하다 즉 recoil의  accessToken이 없거나 만료가 되면
//    refreshAccessToken을 요청을 해줘야 하는데 아직 accessToken에 값이 비어있는 상태에
//    해당 로그인의 data를 불러오니 data가 null인 상태로 API 요청이 가고 또
//    accessToken의 값이 있는 상태에서 다시 API 요청으로 data를 가져오고 있으니
//    중복 API 요청을 여러번 호출하고 있다.
//    (현재 보고 있는 페이지의 API 요청을 전부 중복으로 요청을 하고 있음)

// 따라서 accessToken을 다 받아올 때까지 ApolloSetting에서 붙잡고 있다가
// 값을 받아 저장을 하면 <Layout>으로 넘겨 실행하게 하면 된다.

// 해야할 것:
// 1. 댓글, 대댓글 수정, 삭제 구현  - 🎈 해당 기능 구현 취소 (공간적인 문제가 있어 취소, 필요시 가능)
// 2. 필요없는 컴포넌트 파일 삭제 및 index 파일 합치기
// 3. 배포
//
// 이렇게 하면서 약간의 로딩시간이 길어졌음
//

// 🎈 2024.08.22.목 /
// 1. accessToken에 대한 리렌더링 문제로 중복 API 요청되는 문제 해결함
// 2. 필요없는 컴포넌트 정리 완
//
// 해야할 것:
// 1. 상품 등록의 이미지 등록 스타일 수정
// 2. 대댓글 등록 시 입력 값 초기화 및 입력창 사라지게 하기
// 3. 배포
//

// 🎈 2024.08.26.월 /
// 1. 상품 등록, 수정 이미지 등록 위치 수정함
// 2. 대댓글 등록 시 입력 값 초기화 및 입력창 사람지게 함
// 3. 마켓 업데이트에 위치 이동에 대한 수정이 안되었던 문제 해결함
//    gql에 Lat, lon의 위치 값을 저장을 하고 있지 않았음
// 4. 마켓 업데이트에 content의 수정을 해도 값이 실시간으로 변경이
//    일어나지 않음, 실제 값은 수정이 됨
//    value가 아닌 defaultValue로 수정 가능하게 바꿔 해결함
// 5. 구매, 충전, 전체내역 등 그것에 대한 업데이트를 손 봤음
//    충전:
//      - 충전 시 내 포인트, 충전내역, 충전내역개수(count) refetchQueries 사용
//    구매:
//      - 구매 시 내 포인트, 구매내역, 구매내역개수(count) refetchQueries 사용
//    전체내역:
//      - client를 수정을 하여 추가 API 요청 없이 추가 했음
// 즉 충전, 구매를 하면 Mutation API 한 개 날라가고
// refetch로 3개(자신 포인트, 구매내역, 구매내역 카운트)가 API로 요청이 나가며
// 전체내역은 pagination이 필요없는 최근 내역 10개만 보여주고 있어 .slice(0, 10)으로
// cache 추가를 해도 10개만 보여주고 API 요청없이 추가했다.
//
// 해야할 것:
// 1. 배포
