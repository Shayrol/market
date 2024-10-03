import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import * as S from "./MarketsUpdate.styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLatState,
  isLonState,
  isOpenState,
  isTagsState,
} from "../../../../commons/stores";
import KakaoMap from "../../../commons/hooks/KaKaoMap/useKakaoMap.index";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MarketWriterSchema } from "../../../commons/hooks/yup/validation";
import { IForm } from "./MarketsUpdate.IForm";
import { Modal } from "antd";
import { useRouter } from "next/router";

import { useMutationUploadFile } from "../../../commons/hooks/graphql-mutation/uesMutationUploadFile";
import { useMutationUpdateUsedItem } from "../../../commons/hooks/graphql-mutation/useMutationUpdateUsedItem";
import {
  FETCH_USED_ITEM,
  useQueryFetchUsedItem,
} from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItem";
import UseTagEdit from "../../../commons/hooks/Tag/useTagEdit.index";
import useFileUrls from "../../../commons/hooks/customs/useFileUrls";
import UploadsFile from "../../../commons/uploads/test01/UploadsTest.index";
import { v4 as uuidv4 } from "uuid";
import { FETCH_USED_ITEMS } from "../../../commons/hooks/graphql-queries/useQueryFetchUsedItems";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function MarketsUpdate(): JSX.Element {
  const Tags = useRecoilValue(isTagsState);
  const Lat = useRecoilValue(isLatState);
  const Lon = useRecoilValue(isLonState);
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const router = useRouter();
  // const [createUseditem] = useMutationCreateUsedItem();
  const [updateUseditem] = useMutationUpdateUsedItem();
  const { data } = useQueryFetchUsedItem();

  // const { data } = useQueryFetchUsedItem({
  //   variables: { useditemId: router.query.useditemId as string },
  //   skip: !router.query.useditemId,
  // });

  const [uploadFile] = useMutationUploadFile();
  const { fileUrl, uploadUrl, onChangeFileUrls } = useFileUrls();

  const [uploadImage, setUploadImage] = useState<string[]>(["", "", ""]);

  const [addressDetail, setAddressDetail] = useState("");

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

    const expandedResults = [
      ...results,
      ...Array(uploadImage.length - results.length).fill(undefined),
    ];

    // updateBoardInput 배열에 들어갈 images
    // uploadImages는 기존에 저장된 이미지에서 변경된 이미지로 바꾸는 작업
    const uploadImages = uploadImage
      .map((el, index) =>
        expandedResults[index] !== undefined ? expandedResults[index] : el
      )
      .map((el) => el ?? "");
    console.log("업로드 이미지: ", uploadImages);

    try {
      if (typeof router.query.useditemId !== "string") {
        alert("게시글 ID에 문제가 있습니다.");
        return;
      }
      const result = updateUseditem({
        variables: {
          useditemId: router.query.useditemId,
          updateUseditemInput: {
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
            query: FETCH_USED_ITEMS,
          },
        ],
      });
      void router.push("/markets");
      console.log("수정 결과: ", result);
    } catch {}
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

  useEffect(() => {
    if (data?.fetchUseditem) {
      setValue("name", data.fetchUseditem.name);
      setValue("remarks", data.fetchUseditem.remarks);
      setValue("contents", data.fetchUseditem.contents); // 초기 값 설정
      setValue("price", Number(data.fetchUseditem.price));
      setValue(
        "addressDetail",
        data.fetchUseditem.useditemAddress?.addressDetail ?? ""
      );
    }
  }, [data]);

  useEffect(() => {
    const images = data?.fetchUseditem.images;
    if (images !== undefined && images !== null) {
      const newUploadImage = [...images];
      setUploadImage(newUploadImage);
    }
    console.log("BoardWrite.index.ts: 실행되는지 확인 useEffect");
  }, [data]);
  console.log("dddd", uploadImage);

  return (
    <S.Wrap onSubmit={handleSubmit(onClickSubmit)}>
      <S.Market>상품 수정</S.Market>
      <S.TitleWrap>
        <S.RequiredName>상품명</S.RequiredName>
        <S.TitleInput
          type="text"
          {...register("name")}
          defaultValue={data?.fetchUseditem.name ?? ""}
        />
        <S.TitleError>{formState.errors.name?.message}</S.TitleError>
      </S.TitleWrap>
      <S.RemarksWrap>
        <S.RequiredName>부가설명</S.RequiredName>
        <S.RemarksInput
          type="text"
          {...register("remarks")}
          defaultValue={data?.fetchUseditem.remarks ?? ""}
        />
        <S.RemarksError>{formState.errors.remarks?.message}</S.RemarksError>
      </S.RemarksWrap>
      <S.ContentsWrap>
        <S.RequiredName>상품설명</S.RequiredName>
        <Controller
          name="contents"
          control={control}
          rules={{ required: "내용을 입력해주세요." }}
          defaultValue={data?.fetchUseditem.contents ?? ""}
          render={({ field: { value, onChange } }) => (
            <ReactQuill
              // 외부의 값을 ReactQuill에 띄운다.
              defaultValue={data?.fetchUseditem.contents ?? (value || "")}
              theme="snow"
              placeholder="내용을 입력해주세요."
              onChange={(content) => {
                const cleanContent =
                  content.trim() === "<p><br></p>" ? "" : content;
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
        <S.PriceInput
          type="number"
          {...register("price")}
          defaultValue={data?.fetchUseditem.price ?? ""}
        />
        <S.PriceError>{formState.errors.price?.message}</S.PriceError>
      </S.PriceWrap>
      <S.TagsWrap>
        <S.OptionalName>태그입력</S.OptionalName>
        <UseTagEdit initialTags={data?.fetchUseditem.tags ?? []} />
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
                defaultValue={
                  data?.fetchUseditem.useditemAddress?.addressDetail ?? ""
                }
                {...register("addressDetail")}
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
            uploadUrl={uploadUrl}
            index={index}
            isEdit={false}
            dataImg={data?.fetchUseditem.images}
            onChangeFileUrls={onChangeFileUrls}
          />
        ))}
      </S.ImageWrap>
      <S.MarketWriterBtnWrap>
        {/* 이미지 */}

        <S.Cancel type="button" onClick={onClickCancel}>
          취소
        </S.Cancel>
        <S.Submit type="submit">수정하기</S.Submit>
      </S.MarketWriterBtnWrap>
    </S.Wrap>
  );
}

// 🎈 2024.07.25.목 /
// 1. 태그, 이미지, 유효성 검사 다 했음

// 문제점:
// 1. 이미지 제거 추가에 문제가 있음...
//    createMarket은 문제없이 이미지를 추가 할 수 있는데
//    updateMarket은 기존 이미지 1~2개일 때 1개 더 추가를 하면 첫 번째 이미지가 사라지고
//    새로 추가한 이미지로 바뀐다.
//    또한 이미지 제거를 해도 제거 되지 않는다.
// 예상되는 점:
//  1. DB의 이미지를 가져와 직접 추가된 배열 순서를 조작을 해야 해결 될 듯 함
//     Recoil의 isFileUpload 초기 값이 없어 index의 순서 문제가 있는 것 같다.
//  2. BoardWrite는 이미지 file 저장을 할 때 index을 포함 저장을 하고 있다.
//     하지만 Recoil의 isFileUpload에서의 저장은 index를 사용하고 있지 않고
//     그냥 file 형식만 저장을 하고 있음.
// 이미지 추가는 해결 했음
// 하지만 이미지 삭제 또는 변경은 안됨 ㅅㅂ...
//

// 🎈 2024.07.26.금 /
// 1. 이미지 AnTd Upload 사용 안함
// 2. 이미지 BoardWrite 방식 사용함
// 3. MarketsDetail에서 본인 게시글은 수정하기
// 4. 아니 다른 유저 게시글은 구매하기 버튼 뜨게함

// 해야할 것:
// 1. 이미지 스타일 완성하기
// 2. MarketsDetail 구매하기 버튼 완성하기
// 3. 수정, 상품 등록 페이지에서 로그아웃 시 페이지 못 들어가게 하기
// 4. 로그인 확인을 hoc을 활용해 로그인 검사하기
//    그럼 버튼의 accessToken 확인하는 조건문을 여러 페이지에 사용할
//    필요 없이 hoc의 로그인 체크 하나 만들어 필요한 컴포넌트에
//    감싸주면 된다.
