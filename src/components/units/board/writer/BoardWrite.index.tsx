import "react-quill/dist/quill.snow.css";
import { useMutationCreateBoard } from "../../../commons/hooks/graphql-mutation/useMutationCreateBoard";
import { Controller, useForm } from "react-hook-form";
import { schema } from "../../../commons/hooks/yup/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { isEditState, isOpenState } from "../../../../commons/stores";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import dynamic from "next/dynamic";
import {
  FETCH_BOARD,
  useQueryFetchBoard,
} from "../../../commons/hooks/graphql-queries/useQueryFetchBoard";
import { useEffect, useState } from "react";
import { IForm } from "./BoardWriter.IForm";
import { v4 as uuidv4 } from "uuid";
import * as S from "./newBoardWrite.styles";
import UploadsFile from "../../../commons/uploads/test01/UploadsTest.index";
import useFileUrls from "../../../commons/hooks/customs/useFileUrls";
import { useMutationUploadFile } from "../../../commons/hooks/graphql-mutation/uesMutationUploadFile";
import { IUpdateBoardInput } from "../../../../commons/types/generated/types";
import { useMutationUpdateBoard } from "../../../commons/hooks/graphql-mutation/useMutationUpdateBoard";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function BoardWrite(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState,
    control,
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [createBoard] = useMutationCreateBoard();
  const [uploadFile] = useMutationUploadFile();
  const [updateBoard] = useMutationUpdateBoard();

  const { data } = useQueryFetchBoard();
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  // 이미지
  const { fileUrl, uploadUrl, onChangeFileUrls } = useFileUrls();
  const [uploadImage, setUploadImage] = useState<string[]>(["", "", ""]);

  const onClickSubmit = async (data_: IForm): Promise<void> => {
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
    const uploadImages = uploadImage
      .map((el, index) =>
        expandedResults[index] !== undefined ? expandedResults[index] : el
      )
      .map((el) => el ?? "");
    console.log("이미지: ", uploadImages);
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: data_.writer,
          title: data_.title,
          password: data_.password,
          contents: data_.contents,
          boardAddress: {
            address,
            zipcode,
            addressDetail: data_.addressDetail,
          },
          youtubeUrl: data_.youtubeUrl,
          images: uploadImages,
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data?.createBoard, ...prev];
            },
          },
        });
      },
    });
    void router.push(`/boards/${result.data?.createBoard._id}`);
  };

  // 주소 검색
  const onClickAddressSearch = (): void => {
    setIsOpen((prev) => !prev);
  };

  const onCompleteAddressSearch = (data: Address): void => {
    setZipcode(data.zonecode);
    setAddress(data.address);
    setIsOpen((prev) => !prev);
  };

  // 수정하기 페이지에서 새로고침 유지
  useEffect(() => {
    if (router.pathname === `/boards/[boardId]/edit`) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
    console.log("BoardWrite.index.ts: ", router.pathname);
  }, [router.pathname]);

  // DB 저장된 이미지 저장 - 수정된 이미지를 넣기 위함
  useEffect(() => {
    const images = data?.fetchBoard.images;
    if (images !== undefined && images !== null) {
      const newUploadImage = [...images];
      setUploadImage(newUploadImage);
    }
    console.log("BoardWrite.index.ts: 실행되는지 확인 useEffect");
  }, [data]);

  // 수정된 내용이 있는지 확인하기 위한 요소
  const [initialContents, setInitialContents] = useState("");
  const [initialTitle, setInitialTitle] = useState("");

  useEffect(() => {
    if (data?.fetchBoard) {
      const { contents } = data.fetchBoard;
      const { title } = data.fetchBoard;

      setInitialContents(contents);
      setInitialTitle(title);
      setValue("contents", contents); // React Hook Form의 setValue를 사용하여 초기 내용 설정
      setValue("title", title); // React Hook Form의 setValue를 사용하여 초기 내용 설정
    }
  }, [data, setValue]);

  // 수정하기 - Update
  const onClickUpdate = async (data_: IForm): Promise<void> => {
    // 변경한 이미지 스토리지에 저장
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
    // 스토리지에 저장된 배열의 갯수와 DB에 저장된 배열 갯수를 동일화 하기 위한 작업.
    // results에 [undefined, "img2.png"] 이렇게만 저장이 되어 DB에 저장된 길이만큼
    // 추가로 늘려줌 [undefined, "img2.png", undefined]
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

    const currentFiles = JSON.stringify(uploadImages);
    const defaultFiles = JSON.stringify(data?.fetchBoard.images);
    const isChangeFiles = currentFiles !== defaultFiles;

    // 해당 contents 내용을 가져오기
    const currentContents = watch("contents");

    if (
      data_.title === initialTitle &&
      currentContents === initialContents &&
      address === "" &&
      data_.addressDetail === "" &&
      zipcode === "" &&
      data_.youtubeUrl === "" &&
      !isChangeFiles
    ) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    if (data_.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (data_.title !== "") updateBoardInput.title = data_.title;
    if (currentContents !== "") updateBoardInput.contents = currentContents;
    if (data_.youtubeUrl !== "") updateBoardInput.youtubeUrl = data_.youtubeUrl;
    if (address !== "" || data_.addressDetail !== "" || zipcode !== "") {
      updateBoardInput.boardAddress = {};
      if (zipcode !== "") updateBoardInput.boardAddress.zipcode = zipcode;
      if (address !== "") updateBoardInput.boardAddress.address = address;
      if (data_.addressDetail !== "")
        updateBoardInput.boardAddress.addressDetail = data_.addressDetail;
    }
    if (isChangeFiles) updateBoardInput.images = uploadImages;
    console.log("updateBoardInput: ", updateBoardInput);
    try {
      if (typeof router.query.boardId !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }
      const result = await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password: data_.password,
          updateBoardInput,
        },
        refetchQueries: [
          { query: FETCH_BOARD, variables: { boardId: router.query.boardId } },
        ],
      });

      if (result.data?.updateBoard._id === undefined) {
        alert("요청에 문제가 있습니다.");
        return;
      }
      void router.push(`/boards/${result.data?.updateBoard._id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
    console.log("주소: ", data?.fetchBoard.boardAddress?.address);
    console.log("상세주소: ", data?.fetchBoard.boardAddress?.addressDetail);
    console.log("코드: ", data?.fetchBoard.boardAddress?.zipcode);
  };

  return (
    <>
      <S.Wrap
        onSubmit={
          isEdit ? handleSubmit(onClickSubmit) : handleSubmit(onClickUpdate)
        }
      >
        <S.BoardTitle>{isEdit ? "게시물 등록" : "게시물 수정"}</S.BoardTitle>

        {/* 사용자 영역 */}
        <S.UserWrap>
          {/* 작성 인풋 */}
          <S.UserInputWrap>
            <S.Image src="/images/board/write/user_icon.png" />
            <S.UserInput
              type="text"
              placeholder="이름을 입력해주세요"
              {...register("writer")}
              defaultValue={data?.fetchBoard.writer ?? ""}
              readOnly={Boolean(data?.fetchBoard.writer)}
            />
            <S.UserError>{formState.errors.writer?.message}</S.UserError>
          </S.UserInputWrap>

          {/* 비밀번호 인풋 */}
          <S.UserInputWrap>
            <S.Image src="/images/board/write/lock_icon.png" />
            <S.UserInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
            />
            <S.UserError>{formState.errors.password?.message}</S.UserError>
          </S.UserInputWrap>
        </S.UserWrap>

        {/* 제목 영역 */}
        <S.TitleWrap>
          <S.TitleInput
            type="text"
            // required
            placeholder="제목을 작성해주세요"
            {...register("title")}
            defaultValue={data?.fetchBoard.title ?? ""}
          />
          <S.TitleError>{formState.errors.title?.message}</S.TitleError>
        </S.TitleWrap>

        {/* 내용 영역 */}
        <S.ContentsWrap>
          {/* css 스타일 globals.css에 있음 */}
          <Controller
            name="contents"
            control={control}
            // rules={{
            //   required: "Please enter task description",
            // }}
            // defaultValue={data?.fetchBoard.contents ?? ""}
            render={({ field }) => (
              <ReactQuill
                // value={value || ""}
                theme="snow"
                placeholder="내용을 입력해주세요."
                onChange={(content) => {
                  const cleanContent =
                    content.trim() === "<p><br></p>"
                      ? ""
                      : DOMPurify.sanitize(content);
                  field.onChange(cleanContent);
                  void trigger("contents");
                }}
                defaultValue={watch("contents") ?? ""}
                style={{
                  width: "100%",
                  height: "200px",
                }}
              />
            )}
          />
          <S.ContentsError>
            {formState.errors.contents?.message}
          </S.ContentsError>
          {/* {formState.errors.contents && (
          <p>{formState.errors.contents.message}</p>
          )} */}
          {/* <ReactQuill
            theme="snow"
            value={editorContents}
            onChange={onChangeContents}
            placeholder="내용을 작성해주세요"
            modules={modules}
            style={{
              width: "100%",
              height: "200px",
            }}
            defaultValue={data?.fetchBoard.contents ?? ""}
          /> */}
        </S.ContentsWrap>

        {/* 주소 영역 */}
        <S.AddressWrap>
          {isOpen && (
            <Modal
              visible={true}
              onCancel={onClickAddressSearch}
              onOk={onClickAddressSearch}
            >
              <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
            </Modal>
          )}

          {/* <div>주소</div>s */}
          <S.AddressCodeWrap>
            <S.AddressCode
              placeholder="code"
              readOnly
              // {...register("zipcode")}
              value={
                zipcode !== ""
                  ? zipcode
                  : data?.fetchBoard.boardAddress?.zipcode ?? ""
              }
            />
            <S.AddressBtn type="button" onClick={onClickAddressSearch}>
              우편번호 검색
            </S.AddressBtn>
          </S.AddressCodeWrap>
          <S.AddressCodeWrap>
            <S.Address
              placeholder="address"
              readOnly={true}
              // {...register("address")}
              value={
                address !== ""
                  ? address
                  : data?.fetchBoard.boardAddress?.address ?? ""
              }
            />
          </S.AddressCodeWrap>
          <S.AddressCodeWrap>
            <S.AddressDetail
              type="text"
              placeholder="addressDetail"
              {...register("addressDetail")}
              defaultValue={data?.fetchBoard.boardAddress?.addressDetail ?? ""}
            />
          </S.AddressCodeWrap>
        </S.AddressWrap>

        {/* 유튜브 영역 */}
        <S.YoutubeWrap>
          <S.Youtube href="https://www.youtube.com" target="_blank">
            <S.YoutubeLogo src="/images/board/write/youtube logo_icon.png" />
          </S.Youtube>
          <S.YoutubeUrl
            placeholder="링크를 입력해 주세요."
            {...register("youtubeUrl")}
            defaultValue={data?.fetchBoard.youtubeUrl ?? ""}
          />
        </S.YoutubeWrap>

        {/* 사진 영역 */}
        <S.UploadFileWrap>
          {fileUrl.map((el, index) => (
            <UploadsFile
              key={uuidv4()}
              fileUrl={el}
              uploadUrl={uploadUrl}
              index={index}
              isEdit={isEdit}
              dataImg={data?.fetchBoard.images}
              onChangeFileUrls={onChangeFileUrls}
            />
          ))}
        </S.UploadFileWrap>

        {/* 라디오 번튼 영역 */}
        <S.SubmitBtnWrap>
          <S.SubmitBtn>{isEdit ? "등록하기" : "수정하기"}</S.SubmitBtn>
        </S.SubmitBtnWrap>
      </S.Wrap>
    </>
  );
}

// react-hook에서의 custom-hook의 wrapFormAsync 다시 확인하기
// custom-hook은 24-구조분해할당(destructuring), REST 파라미터 메모를
// 확인하고 section 24 / 24-06의 파일 코드 확인 해볼 것

// 다음에 해야할 일: css, youtube, 주소, 사진 업로드 까지 하기

// 🎈 2023.12.10.일 /
// useForm의 register를 사용해 주소API를 사용해 해당 주소를 input태그에
// readonly인 상태로 바인딩 하려 했는데 input에서 바인딩 하는 과정에서
// 주소API의 data 즉 해당 API에서 제공하는 data의 타입이 있는데
// 그 data의 address를 뽑아올 방법이 없음
// 그래서 recoil을 사용해야 할 것으로 보임
// 예상되는 문제점은 useForm으로 form 태그의 입력요소를 저장을 하는데
// 과연 생각대로 진행 될 지 의문...
// 코드 127 / 67 번째 줄 확인

// 🎈 2023.12.11.월 /
// 전 날에 주소API의 data를 input 바인딩 하기 위해 data 매개변수를
// 사용을 해야 했다.
// 그래서 uesRecoilState를 사용하여 리레더링 없이 상태를 관리하고
// 전역에서 관리하려 했으나 비동기 실행으로 즉시 업데이트가 이뤄지지 않아
// 그전의 데이터가 저장되는 현상이 있다.
// useEffect로 업데이트를 해주고 또한 초기화가 안돼 다시 초기화 해주는 작업을
// 해야하는 번거로움이 있다.
// 하지만 useState를 사용하면 간편하게 해결을 할 수 있지만 변경을 할 때마다
// 리렌더링이 얼어나 비효율적으로 생각이 되기는 하지만
// 여기서 사용되는 useState는 입력을 할 때만다 요청이 아닌 한 번
// 주소변경을 통해 리렌더링이 한 번 일어나기에 괜찮을 듯 싶다.
// (인프런에 문의한 상태)
// ✨다음 해야할 일: 주소 디테일을 DB에 저장 되도록 하고 youtube url 시도하기

// 🎈 2023.12.21.목 /
// 주소 디테일과 youtube url DB에 저장할 수 있고
// ✨다음 해야할 일: style과 수정하기에 대해서 적용하기와
//  내용입력에 대한 태그 출력되는거 막기
//  그리고 <UploadsTest> container 지우고 index로 코드 줄이기

// 🎈 2023.12.22.금 /
// ✨input요소에 required을 추가하면 필수 입력으로 브라우저에서
// 입력하라고 뜬다.
// 여기서 문제점은 required의 기능 때문에 focus 효과를 못 주고 있다.
// (input을 focus하면 label이 움직이는 효과)
//

// 🎈 2023.12.26.화 /
// input요소의 focus 효과는 사용하지 않고
// 아이콘으로 대체했음
// 게시물 등록 페이지 완성
// ✨수정페이지 작성하기
//

// 2024.04.24.수 /
// 이미지 선택 시 API 요청되는 UploadFile 것을 막았음
// 하지만 게시글 등록 화면으로 처음 이동을 하면 createBoard API 요청이 가는데
// 실패한 API 요청이 감 / 원래는 요청이 안감
// 여기서 큰 문제 없이 등록은 할 수 있음
// 두 번째 문제는 이미지가 배열 형식으로 되어있는데 첫 번째 이미지 선택을 하지 않고
// 두 번째 이미지 선택을 하면 에러 발생
// 즉 선택하는 이미지 버튼이 3개 있는데 그 전의 이미지가 비어있으면 에러남
// 첫 번째 비우고 두 세 번째 = 에러
// 두 번째 비우고 세 번째 = 에러

// 🎈 2024.04.30.화 /
// 수정하기 클릭을 하면 Detail에서의 boardId를 가져오지 못하고 있음
// Detail에서는 직접 useQuery를 사용해 데이터를 가져오고 있고 router.query를 사용해
// 해당 boardId의 값을 가지고 오고 있음
// 그래서 커스텀 훅으로 만든 fetchBoard를 새로 router.query.boardId를 사용한 훅을 만들던가
// boardWriter에도 BoardDetail처럼 useQuery를 사용해 boardId의 값을 가져오든가 해야함

// 🎈 2024.05.03.금 /
// uploadBoard의 API는 정상적으로 된다.
// 문제점이 여럿 있는데
// 1. 수정하러 해당 페이지로 이동을 하면 기존에 있던 이미지가 있지 않고 비어있다.
// 2. 수정된 이미지가 있는지 확인하는 로직에서 브라우저의 임시 이미지Url과 DB의 이미지Url이
//    비교를 하고 있어 잘 못 비교를 하고 있는 것 같음(기존 이미지의 defaultValue의 값이 유지 안됨)
// 3. useForm에서 contents는 input의 text가 아니라 reactQuill 라이브러리 사용하고 있어
//    수정하지 않고 넘어가려 해도 내용이 없다고 판단이 된다.
//    (내용이 있는상태(fetchBoard.contents로 값을 가져와 보여줘도 내용이 없다고 판단하여 유효성 검사에 걸림))
//    또한 비밀번호를 입력을 하지 않으면 비밀번호를 입력을 하라고 alert 창이 떠야하는데
//    useForm의 유효성 검사에 걸림
// 즉 문제점은 useForm으로 인한 유효성 검사 문제와 이미지 문제
// 이미지는 string[] 타입의 fileUrl을 사용하지 말고 uploadUrl를 사용해서 DB에 저장되어 있는것과 비교해야함
// fileUrl은 브라우저의 임시Url를 저장하고 있어 DB의 images와 비교하면 무조건 수정된 상태로 저장이 되고
// DB에 저장이 된 것은 브라우저의 임시Url이 저장이 되어 이미지가 안보임

//
// 🎈 2024.05.24.금 /
// 주소저장 시 해당 address와 zoneCode의 값이 저장이 되지 않는 현상이 있음
// 이유는 addressDetail과 다르게 다음의 Post 라이브러리를 사용하고 있었고
// 거기서 제공하는 것은 우편번호(zoneCode)와 주소(address)인데 이는 Modal로 띄워
// ok 클릭 시 실행 함수를 통해 zoneCode와 address를 저장을 해야 했다.
// useState로 저장을 했고 이 값을 createBoard 또는 updateBoard를 하는데 사용
//
// 아직 해결되지 않은 문제는 contents 수정이다.
// Recoil 사용으로 useForm의 입력 값을 인지하지 못해 register를 사용 못한다.
// 그래서 setValue를 사용해 값을 저장을 하고 trigger를 통해 유효성 검사를 했는데
// 수정하기 페이지에 들어가면 Form의 값이 초기화 되어 값이 없는 상태인데
// updateBoard에서 수정 체크하는 부분에서 값이 있는데도 Recoil에 빈 값으로 인식해
// useForm의 유효성 검사에 걸린다.
// 이 부분에 대해 해결을 해야한다.

//
// 🎈 2024.05.26.일 /
// updateBoard 후 화면 업데이트 되지 않는 현상이 있다.
// API 요청은 정상적으로 되고 새로고침을 해야 업데이트 된 모습으로 되는데
// update: {}를 사용해도 해결이 되지 않았다.
// refetchQueries: {}를 사용하니 해결이 됐는데
// 둘다 새로운 데이터로 변경해주는데 update는 직접 수동으로 페치를 한다면
// refetchQueries는 변경에 있어 바로 적용되는 곳에 적합하다고 하는데
// 정확한 사용는 모르겠음...
//
// 해야할 것:
// 1. 아직 contents의 수정에 대한 유효성 검사 해결하지 못함
//    (useEffect를 사용해 setValue로 업데이트 하고 있어 유효성 검사에 안걸림)
// 2. 게시물의 댓글 추가 해야함
// 3. 좋아요 / 싫어요 버튼 구성 해야함
// 4. 상품 등록에 대해 추가 해야함
