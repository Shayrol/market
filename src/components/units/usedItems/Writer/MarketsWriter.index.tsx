import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import * as S from "./MarketsWriter.styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import UseTag from "../../../commons/hooks/Tag/useTag.index";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isAccessToken,
  isLatState,
  isLonState,
  isOpenState,
  isTagsState,
} from "../../../../commons/stores";
import KakaoMap from "../../../commons/hooks/KaKaoMap/useKakaoMap.index";
import { useMutationCreateUsedItem } from "../../../commons/hooks/graphql-mutation/useMutationCreateUsedItem";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MarketWriterSchema } from "../../../commons/hooks/yup/validation";
import { IForm } from "./MarketsWriter.IForm";
import { Modal, Upload } from "antd";
import { useRouter } from "next/router";
import { useMutationUploadFile } from "../../../commons/hooks/graphql-mutation/uesMutationUploadFile";
import useFileUrls from "../../../commons/hooks/customs/useFileUrls";
import UploadsFile from "../../../commons/uploads/test01/UploadsTest.index";
import { v4 as uuidv4 } from "uuid";
import { useApolloClient } from "@apollo/client";
import { FETCH_USED_ITEMS_I_SOLD } from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItemsISold";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function MarketsWrite(): JSX.Element {
  const Tags = useRecoilValue(isTagsState);
  const Lat = useRecoilValue(isLatState);
  const Lon = useRecoilValue(isLonState);
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const router = useRouter();
  const [createUseditem] = useMutationCreateUsedItem();
  const [uploadFile] = useMutationUploadFile();
  const [uploadImage, setUploadImage] = useState<string[]>(["", "", ""]);
  const { fileUrl, uploadUrl, onChangeFileUrls } = useFileUrls();
  const [addressDetail, setAddressDetail] = useState("");

  const accessToken = useRecoilValue(isAccessToken);

  const client = useApolloClient();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 후 이용가능한 서비스입니다.");
      void router.push("/login");
      window.sessionStorage.setItem("prevPath", router.asPath);
    }
  });

  const { register, handleSubmit, formState, control, setValue, trigger } =
    useForm<IForm>({
      resolver: yupResolver(MarketWriterSchema),
      mode: "onChange",
    });

  const onClickSubmit = async (data_: IForm): Promise<void> => {
    // 스토리지에 이미지 저장
    const results = await Promise.all(
      uploadUrl.map(async (el) => {
        if (el) {
          const result = await uploadFile({ variables: { file: el } });
          return result.data?.uploadFile.url ?? undefined;
        } else {
          return undefined;
        }
      })
    );

    // 새로 추가한 이미지를 최대 요소가 3개가 되지 않는다면 요소를 추가하고 undefined로 채움
    const expandedResults = [
      ...results,
      ...Array(uploadImage.length - results.length).fill(undefined),
    ];
    // ["", "", ""]를 돌려 새로 추가한 이미지가 있으면 추가 없으면 undefined
    const uploadImages = uploadImage
      .map((el, index) =>
        expandedResults[index] !== undefined ? expandedResults[index] : el
      )
      .map((el) => el ?? "");

    const result = await createUseditem({
      variables: {
        createUseditemInput: {
          name: data_.name,
          remarks: data_.remarks,
          contents: data_.contents,
          price: Number(data_.price),
          images: uploadImages,
          tags: Tags,
          useditemAddress: {
            addressDetail,
            lat: Lat,
            lng: Lon,
          },
        },
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEMS_I_SOLD,
          variables: {
            search: "",
            page: 1,
          },
        },
      ],
    });

    // ❗ client를 사용해 API 요청없이 cache를 수정하는 것도 좋지만 pagination의 업데이트를 위해
    // ❗ refetchQuery를 했다. pagination의 count 증가 또한 client로 수정할 수 있지만
    // ❗ 편의성은 refetch이고 성능면에서는 client를 사용하는게 좋을 듯 하다.
    // 상품 등록 시 client 수정으로 API 요청 없이 새로 추가된 date 추가하기
    // const usedItemsISold = client.readQuery({
    //   query: FETCH_USED_ITEMS_I_SOLD,
    // });
    // if (usedItemsISold) {
    //   const updateUsedItemsISold = [
    //     result.data?.createUseditem,
    //     ...usedItemsISold.fetchUseditemsISold,
    //   ];

    //   client.writeQuery({
    //     query: FETCH_USED_ITEMS_I_SOLD,
    //     data: {
    //       fetchUseditemsISold: updateUsedItemsISold,
    //     },
    //   });
    // }
    console.log("생성결과이미지: ", result);
    void router.push("/markets");
  };

  // 모달 open / close
  const onClickAddressSearch = (): void => {
    setIsOpen((prev) => !prev);
  };

  // 위치 상세 입력 - Input
  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const detail = event.target.value;
    setAddressDetail(detail);
  };

  // 취소 - 돌아가기
  const onClickCancel = (): void => {
    void router.push("/markets");
  };

  return (
    <S.Wrap onSubmit={handleSubmit(onClickSubmit)}>
      <S.Market>상품 등록</S.Market>
      <S.TitleWrap>
        <S.RequiredName>상품명</S.RequiredName>
        <S.TitleInput type="text" {...register("name")} />
        <S.TitleError>{formState.errors.name?.message}</S.TitleError>
      </S.TitleWrap>
      <S.RemarksWrap>
        <S.RequiredName>부가설명</S.RequiredName>
        <S.RemarksInput type="text" {...register("remarks")} />
        <S.RemarksError>{formState.errors.remarks?.message}</S.RemarksError>
      </S.RemarksWrap>
      <S.ContentsWrap>
        <S.RequiredName>상품설명</S.RequiredName>
        <Controller
          name="contents"
          control={control}
          rules={{ required: "내용을 입력해주세요." }}
          render={({ field: { value, onChange } }) => (
            <ReactQuill
              // 외부의 값을 ReactQuill에 띄운다.
              value={value || ""}
              theme="snow"
              placeholder="내용을 입력해주세요."
              // 내용 변경에 대한 저장
              onChange={(content) => {
                // ReactQuill은 기본으로 dangerouslySetInnerHTML으로 태그 속성으로 반환
                // 그래서 입력 후 모든 내용을 지우게 되면 <p><br></p>으로 반환한다.
                // 따라서 trigger를 통해 유효성 검사에 제대로 동작을 하기 위해 다음과 같이 했음
                // 또한 입력 값을 HTML 태그로 반환을 하기에 XSS에 대비하기 위해 DOMPurify 사용
                const cleanContent =
                  content.trim() === "<p><br></p>"
                    ? ""
                    : DOMPurify.sanitize(content);
                onChange(cleanContent);
                void trigger("contents");
              }}
              style={{
                height: "400px",
                marginTop: "5px",
              }}
            />
          )}
        />
        <S.ContentsError>{formState.errors.contents?.message}</S.ContentsError>
      </S.ContentsWrap>
      <S.PriceWrap>
        <S.RequiredName>판매 가격</S.RequiredName>
        <S.PriceInput type="number" {...register("price")} />
        <S.PriceError>{formState.errors.price?.message}</S.PriceError>
      </S.PriceWrap>
      <S.TagsWrap>
        <S.OptionalName>태그입력</S.OptionalName>
        <UseTag />
        {/* <button onClick={() => console.log(Tags)}>태그확인</button> */}
      </S.TagsWrap>
      <S.MapWrap>
        <S.MapP1>거래하고 싶은 장소를 선택해주세요.</S.MapP1>
        <S.MapP2>
          만나서 거래할 때는 누구나 찾기 쉬운 공공장소가 좋아요.
        </S.MapP2>
        <S.Map>
          <KakaoMap />
          <S.MapButton onClick={onClickAddressSearch}>선택 완료</S.MapButton>
        </S.Map>
      </S.MapWrap>
      {isOpen && (
        <Modal
          visible={true}
          onCancel={onClickAddressSearch}
          onOk={onClickAddressSearch}
          footer={null}
          style={{ top: "30%" }}
        >
          <S.ModalMapWrap>
            <S.ModalTitle>선택한 곳의 장소명을 입력해주세요</S.ModalTitle>
            <S.ModalInfoWrap>
              <S.ModalInput
                type="text"
                placeholder="예) 강남역 1번 출구, 교보타워 앞"
                onChange={onChangeAddressDetail}
              />
              <S.ModalBtn onClick={onClickAddressSearch}>
                거래장소 등록
              </S.ModalBtn>
            </S.ModalInfoWrap>
          </S.ModalMapWrap>
        </Modal>
      )}
      <S.ImageWrap>
        {fileUrl.map((el, index) => (
          <UploadsFile
            key={uuidv4()}
            fileUrl={el}
            dataImg={null}
            index={index}
            isEdit={true}
            uploadUrl={uploadUrl}
            onChangeFileUrls={onChangeFileUrls}
          />
        ))}
      </S.ImageWrap>
      <S.MarketWriterBtnWrap>
        <S.Cancel type="button" onClick={onClickCancel}>
          취소
        </S.Cancel>
        <S.Submit type="submit">등록하기</S.Submit>
      </S.MarketWriterBtnWrap>
    </S.Wrap>
  );
}

// 🎈 2024.07.12.금 /
// 1. 베스트 상품 구현 완

// 해야할 것:
// 1. 상품 등록하기 페이지 만들기
// 2.

// react-Quill을 사용을 하는데 해당 Contents의 내용과 useForm의 사용에 있어 충돌이 일어난다.
// 그래서 Controller를 감싸 해결을 하는데 여기서 수정된 내용이 있는지 확인하는 로직을
// 추가 할 지는 확인 해봐야 할 것 같음.
// 여러 버그들이 있고 굳이 있어야 하는 기능인가 생각하게 됨
//
// 2024.07.14.일 / 에 했던 BoardWriter에서 reactQuill를 다시 손을 봤는데
// 1. 수정 페이지에서 해당 value가 있음에도 값이 없어 유효성 검사에 걸림
// 2. 연습에서는 useState를 사용을 해서 값이 초기화 되고 data 값만 불러와 사용을 했어서
//    빈 문자열("") 비교를 해 수정 내용이 있는지 확인이 가능했음 하지만
//    useForm을 사용함에 있어 useState가 아닌 register, watch("contents")의 값과 비교를
//    해야하는데 비교 대상이 없어서 useEffect로 해당 값을 useState에 저장을 하고 비교를 함
// 3. 새로고침을 하면 defaultValue의 값은 제대로 가져오는데 useForm의 유효성 검사에 걸림
//    계속 수정하기 버튼 클릭을 하면 해결은 되나 뭐가 문제인지 잘 모르겠음

// 해야할 것:
// 1. 제목, 내용, 이미지, 주소, 위치 등 사용을 하는데 useForm을 사용할 것 인지 고민중
//    등록, 수정을 하나의 컴포넌트로 구상하니 복잡함이 있어 따로 분리를 해서 할지 생각중이다.
// 2. useQuill의 이미지, 동영상 등록이 가능하게 시도해 볼 것.
// 3. kakaoMap 사용.
//

// 🎈 2024.07.15.월 /
// 1. 태그 antd을 통해 구현
// 2. 카카오 맵 생성과 좌표 찍은 곳 마커 생성 구현

// 해야할 것:
// 1. 상품 등록 페이지 완성하기
// 2. react-Quill 오류 없이 생성하기
// 3. tags 잘 적용하기
// 4. kakao Map 잘 저용하기
// 5. kakao Map 적용시 초기 맵 위치 권한 받아서 현재위치 받아보기
// 6. kakao Map 키워드 검색으로 위치 이동하기 - 주소검색과 비슷
// 7. 등록 페이지와 수정 페이지 분리하기
//  - 조건부가 많이 생기고
//  - 코드 가독성 떨어지고
//  - 유지보수에 어려움이 생긴다.
//  - 시도할만.txt에 분리한 컴포넌트가 있으나 등록에는 문제가 없을 듯 하는데
//  - 수정에 기존 데이터 불러오는데 문제가 많아 보임
//  - 또한 등록, 수정 구분을 주는 state도 봐야 함
//  - 우선 제시한 방법으로 해보고 안되면 각각 컴포넌트 생성할 거임..
//

// 🎈 2024.07.16.화 /
// 1. 카카오 맵 next에서 SSR로 useEffect를 사용을 하고
// 2. 해당 script 다운 받는 동안 useEffect가 실행이 되어 window.kakao가 없는데
//    실행을 하려해 에러가 생긴다.
// 3. 그래서 script가 다 다운 받고 실행을 하기 위해 addEventListener의 load로
//    실행해주면 돈다.
//

// 해야할 것:
// 1. 맵 클릭으로 마커 위치 이동 후 좌표 저장 및 좌표 마커 생성 저장
//

// 🎈 2024.07.17.수 /
// 1. 카카오 맵은 현재 위치에서 마커가 찍히고 클릭을 통해 상세한 위치 조정 가능
//
// 해야할 것:
// 1. useForm 적용 - (안됐음..)
// 2. react-Quill 적용
// 3. 나중에 카카오 맵 검색을 통해 위치 이동 가능하게 설정할 것
// 4. 태그, 내용 등 입력 요소 createUsedItem에 적용
//

// 🎈 2024.07.18.목 /
// 1. reactQuill 완
//
// 해야할 것:
// 1. price 입력을 register를 통해 저장을 하는데 버튼 클릭으로 1000, 10000 등
//    직접입력없이 바로 입력이 되게 했으나 안됨
//  - register 내에 ref가 있어 해당 input에 ref 사용은 안됨 - (유효성검사에 계속 걸림..)
//  - register("price", 함수) 이렇게 함수를 넣어 사용을 하려 했는데 아직 잘 안됨
//  - setValue로 ref의 변경된 값으로 수정을 하려 했으나 타입 문제로 안됨
// 2. 대부분의 기능 구현 완료함 css 부분 완성하면 끝날 듯/
//

// 🎈 2024.07.19.금 /
// 문제점:
// - 유효성 검사를 처음만 진행하고 내용 입력 후 지우면 유효성 검사에 걸리지 않음
// - contents만 비우고 입력 후 Submit 하면 에러창이 뜸
//
// 1. ReactQuill과 react-hook-form의 연동의 문제로 유효성 검사를 하지 않는 문제가 있다.
//    그래서 Controller 태그를 사용해 ReactQuill의 값을 form에 전달을 하도록 해서 해결을
//    했는데 처음에만 유효성 검사를 하고 내용 입력 후 다시 지워도 유효성 검사를 하지 않는
//    문제가 있다.
//    보면 contents가 비워져 있는데 유효성 검사도 하지 않고 API 요청이 가 내용을 확인했는데
//    <p><br></p> 내용은 비어있지만 HTML 요소가 들어가 있는걸 확인했다.
//    그래서 content.trim()을 사용해 우선 빈 공백을 지우고 삼항연산자를 통해 "<p><br></p>"
//    이면 "" 빈 문자열로 아니면 content 내용으로 조건을 걸어 해결을 했다.
//
// 2. contents만 비우고 다른 input을 입력 후 Submit을 클릭하면 유효성 검사에 걸리는게
//    아닌 에러창이 뜬다.
//    - 처음 field.value는 ReactQuill 내부적으로만 값을 변경이 되기 때문에 외부의 value가
//      전달 되지 않을 수 있다.
//      그래서 render={({ field: { value, onChange } })로 value를 사용해 넘겨
//      react-hook-form의 value와 ReactQuill의 value를 사용해 연동이 된다.
//    - ReactQuill의 onChange를 통해 변경된 값을 react-hook-form에 넘겨주는데
//      react-hook-form의 onChange와 ReactQuill의 onChange를 통해 변경된 값을
//      넘겨 받음으로써 연동이 된다.
//
// 1. ReactQuill의 문제 해결 완
//
// 해야할 것:
// 1. price의 버튼 클릭으로 지정된 가격 증가 구현하기
// 2. 주소, 위치 등 나며지 MarketsWriter 페이지 완성하기
//

// 🎈 2024.07.20.토 /
// 1. 태그 완성 최대 5개 등록
//
// 해야할 것:
// 1. 주소, 지도 등 마저 완성하기
// 2. 자신이 등록한 게시글에 들어가면 삭제 가능하게 하기
// 3. MarketDetail의 댓글, 대댓글 기능 구현
// 4. 마이페이지 구현
//

// 🎈 2024.07.22.월 /
// 1. 카카오 맵 좌표 저장에 대한 오류 해결
//    setState로 변경된 좌표를 저장을 했지만 실행이 안되어 저장이 안됨
//    useEffect안에 넣어 생긴 문제로 생각해 useEffect 밖에서 useCallback을 사용
//    useCallback(() => {...}, [setLat, setLon])으로 변경 될 때마다 실행 하도록 했음
//
// 해야할 것:
// 1. 좌표 저장은 했으나 해당 주소, 상세주소를 불러와야 함 ✨
// 2. 이미지 저장, 태그 저장 완성하기 ✨
// 3. 다 완성하면 해야할 것:
//     - reactQuill 이미지 등록,
//     - MarketsList에서 최근 본 상품 띄우기 ✨
//     - 찜 기능 구현 ✨
//     - 마이페이지 구현 ✨
//     - 결재 시스템 카카오페이 외 다른 결재 추가하기
//     - BoardWriter에서도 reactQuill 최적화 한거 적용하기
//     - 다른 컴포넌트에서의 useState, useRecoilState 사용으로 리렌더링 발생 찾아
//       해결하기 - useRef, useRecoilValue 등 사용
//

// 🎈 2024.07.23.화 /
// 1. 맵 디자인 끝
// 2. 맵 좌표 선택 후 Modal로 상세 위치 입력창 만듦 - Address, zipCode 사용 X
//    주소가 아닌 당근 처럼 특정 위치 입력 - AddressDetail로 저장을 했음
//

// 해야할 것:
// 1. 이미지 저장 하기
// 2. 찜 기능
// 3. 최근 본 상품
// 4. 마이페이지
//

// 🎈 2024.07.24.수 /
// 1. 이미지 저장 끝

// 해야할 것:
// 1. 수정 페이지 구현 - 새 컴포넌트에 생성
// 2. 수정 시 이미지 불러오기
// 3. 저장된 이미지 불러오기
// 4. 상세 주소 손보기
// 5. 찜 기능
// 6. 최근 본 상품
// 7. 마이페이지
