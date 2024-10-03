import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import * as S from "./mypageMenuTap.styles";
import { useRouter } from "next/router";
import { useQueryFetchUserLoggedIn } from "../graphql-queries/useQueryFetchUserLoggedIn";
import { useMutationUploadFile } from "../graphql-mutation/uesMutationUploadFile";
import { useMutationUpdateUser } from "../graphql-mutation/useMutationUpdateUser";

const MY_PAGE_MENU_TAP = [
  {
    name: "내 장터",
    page: "/mypage",
    img: "/images/myPage/ic_shopping_cart.png",
    img_color: "/images/myPage/ic_shopping_cart_color.png",
  },
  {
    name: "내 포인트",
    page: "/mypage/mypoint",
    img: "/images/myPage/ic_pig.png",
    img_color: "/images/myPage/pig_color.png",
  },
  {
    name: "내 프로필",
    page: "/mypage/myprofile",
    img: "/images/myPage/ic_profile.png",
    img_color: "/images/myPage/ic_profile_color.png",
  },
];

export default function MyPageMenuTap(): JSX.Element {
  // const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const ProfileRef = useRef<HTMLInputElement>(null);
  const { data, refetch } = useQueryFetchUserLoggedIn();
  const [uploadFile] = useMutationUploadFile();
  const [updateUser] = useMutationUpdateUser();

  const onclickMenu = (event: MouseEvent<HTMLDivElement>): void => {
    void router.push(event.currentTarget.id);
  };

  const onClickProfileImgRef = (): void => {
    ProfileRef.current?.click();
  };

  const onChangeProfileImg = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    // 구글 스토리지에 먼저 저장
    const resultFile = await uploadFile({ variables: { file } });
    const picture = resultFile.data?.uploadFile.url;
    console.log("사진 변경: ", picture);
    await updateUser({
      variables: {
        updateUserInput: {
          name: data?.fetchUserLoggedIn.name,
          picture,
        },
      },
    });
    void refetch();
  };

  return (
    <S.Wrap>
      <S.MyPageTitle>MY PAGE</S.MyPageTitle>
      <S.UserProfileInfoWrap>
        <S.PictureWrap
          onClick={onClickProfileImgRef}
          style={{
            pointerEvents: `${
              router.asPath === "/mypage/myprofile" ? "auto" : "none"
            }`,
          }}
        >
          <input
            type="file"
            ref={ProfileRef}
            onChange={onChangeProfileImg}
            style={{ display: "none" }}
          />
          <S.Picture
            src={
              !data?.fetchUserLoggedIn
                ? "/images/myPage/ic_profile.png"
                : `http://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`
            }
          />
          {router.asPath === "/mypage/myprofile" ? (
            <>
              <S.PictureSetting src="/images/myPage/setting_icon/ic_setting.png" />
            </>
          ) : (
            <></>
          )}
        </S.PictureWrap>
        <S.UserProfileName>
          {!data?.fetchUserLoggedIn ? "null" : data.fetchUserLoggedIn.name}
        </S.UserProfileName>
        <S.UserProfilePointWrap>
          <S.UserProfilePointImg src="/images/myPage/price_won.png" />
          <S.UserProfilePoint>
            {!data?.fetchUserLoggedIn
              ? 0
              : data.fetchUserLoggedIn.userPoint?.amount.toLocaleString(
                  "ko-KR"
                )}
            원
          </S.UserProfilePoint>
        </S.UserProfilePointWrap>
      </S.UserProfileInfoWrap>
      <S.MyPageTapWrap>
        {MY_PAGE_MENU_TAP.map((el) => (
          <S.MyPageTap key={el.page} id={el.page} onClick={onclickMenu}>
            <S.TapImg src={el.page === router.asPath ? el.img_color : el.img} />
            <S.TapName id={el.page} isActive={el.page === router.asPath}>
              {el.name}
            </S.TapName>
          </S.MyPageTap>
        ))}
      </S.MyPageTapWrap>
    </S.Wrap>
  );
}
