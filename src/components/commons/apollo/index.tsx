import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  isAccessToken,
  restoreAccessTokenLoadable,
} from "../../../commons/stores";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
import { useEffect, useState } from "react";

interface IApolloSetting {
  children: JSX.Element;
}

const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting(props: IApolloSetting): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(isAccessToken);
  const RefreshAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);
  // recoil의 accessToken의 값이 들어갈 동안 기다리기 위함
  const [isTokenReady, setIsTokenReady] = useState(false);

  // 로그인 상태에서 새로고침으로 useRecoilState의 비워진 accessToken을 다시 받기 위함
  useEffect(() => {
    if (!accessToken) {
      void RefreshAccessToken.toPromise().then((newAccessToken) => {
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          // window.sessionStorage.setItem("accessToken", newAccessToken);
        } else {
          setAccessToken("");
        }
        setIsTokenReady(true); // Token is ready, allow rendering
      });
    } else {
      setIsTokenReady(true); // Token is ready, allow rendering
    }
  }, []);

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  // 토큰 만료 후 새로운 accessToken 받기
  let isRefreshing = false; // 토큰을 갱신 중인지 여부를 추적

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          if (!isRefreshing) {
            isRefreshing = true;
            const oldHeaders = operation.getContext().headers;

            return fromPromise(
              getAccessToken()
                .then((newAccessToken) => {
                  if (newAccessToken) {
                    setAccessToken(newAccessToken);
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        Authorization: `Bearer ${newAccessToken}`,
                      },
                    });
                  }
                })
                .finally(() => {
                  isRefreshing = false; // 갱신 완료 후 상태 초기화
                })
            ).flatMap(() => forward(operation));
          }
        }
      }
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  // recoil의 accessToken의 값이 들어갈 때까지 Loading...화면 띄우기
  if (!isTokenReady) {
    return <div>Loading...</div>;
  }

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
// RefreshAccessToken.state 를 사용해 "loading" 상태에서는 <Layout>이 실행되지 않도록
// 했으나 토큰만료는 errorLink의 getAccessToken()이 실행이 되어 새로운 accessToken이
// 저장을 하기전에 <Layout>으로 넘어가 LoggedIn에 문제가 생긴다.
// 또한 sessionStorage의 만료된 accessToken이 새로운 accessToken으로 변경이 일어나지 않아
// 만료된 토큰으로 모든 API 요청에 실패가 뜬다.
// 그래서 처음부터 sessionStorage에 새로운 accessToken만 저장을 하도록 했는데
// loading 상태를 무시하고 <Layout>을 실행을 해버려서 accessToken은 빈 값으로
// LoggedIn API가 요청이 가고 accessToken의 값이 생긴 후 LoggedIn 요청이 가서
// 중복 API 요청이 2번 일어난다. (해당 페이지에 사용한 API 모두 중복 요청 발생)

// ✨ restoreAccessToken의 정리
// ⨝ useEffect와 errorLink에서 getAccessToken()함수를 사용해 새로운 accessToken을
// ⨝ 받아오고 있는데 서로 받아오는 조건이 다른다.
// 🔔useEffect:
//      1. useEffect에서 사용하고 있는 getAccessToken()은 Recoil에 accessToken을
//         저장하고 있다.
//         하지만 Recoil 특성상 새로고침을 하면 해당 값이 초기화 되어 accessToken 값이
//         초기화 되어 사라진다.
//         그렇게 되면 로그인이 풀리게 되고 매번 로그인을 해줘야 하는 경우가 생기는데
//         이는 새로운 accessToken을 재발급 받아와 로그인 상태를 유지할 수 있게 도와준다.
// ⨝ 즉 useEffect는 로그인 상태를 유지하기 위함이다.
//
// 🔔errorLink:
//      1. getAccessToken에서 getAccessToken()함수는 새로운 accessToken을 받아오지만
//         조건이 있다.
//         이는 조건문에 "UNAUTHENTICATED"이 걸리면 accessToken이 만료가 되어 새로운
//         accessToken을 가져오는 역할을 하고 있다.
// ⨝ 즉 errorLink는 보안상 토큰이 만료가 되면 다시 새로운 토큰을 받아오기 위함이다.
//
// 정리:
//  1. useEffect의 역할은 로그인 유지를 위해 계속 토큰을 확인해 사용자 정보를 가져오고 있다.
//     그러기 위해서 accessToken이 있어야 하는데 이를 확인하고 새로운 accessToken을
//     가져오는 역할을 하고 있다.
//  2. errorLink의 역할은 계속 로그인 상태에서 보안상 토큰기간이 끝나면 다시 새로운
//     accessToken을 받아오기 위함이다.
// 따라서 useEffect는 로그인 유지 / errorLink는 토큰만료 방지
//
//
//
//
//
// 🎈 2024.06.19.수 /
// 1. 로그인 accessToken, refreshAccessToken에 대해 새로고침시 accessToken이 사라져
//    다시 refreshAccessToken을 통해 accessToken을 재발급 받는 것을 useEffect를 사용했음,,

// const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
// useEffect(() => {
//   console.log("브라우저에서 실행 됨");
//   void aaa.toPromise().then((newAccessToken) => {
//     setAccessToken(newAccessToken ?? "");
//   });
// }, []);

// 근데 위에 사용을 하니 같은 API 요청을 한번 더 하는데
// 애초에 useEffect로 새로운 accessToken을 받은 이유는 새로고침시 RecoilState에
// 저장된 accessToken이 초기화 되어 했던 것 이었음...

// 하지만 어차피 최상위 컴포넌트에서 렌더링 일어나 errorLink가 실행이 되니
// 굳이 사용을 해야한가?

// 확인해봐야 할 것:
// 1. 새로고침은 errorLink를 통해 새로운 accessToken을 가져오지만
//    accessToken 만료는 어떻게 되는지 모르겠음...
//    코드를 보면 errorLink에 확인하는 로직이 있긴 함.

// 해야할 것:
// 1. 로그인 시스템 구현
// 2. 회워가입 시스템 구현
// 3. 상품페이지, 마이페이지 구현
//

// 🎈 2024.08.21.수 /
// 1. 새로고침 마다 refreshToken으로 여러번 API 요청이 일어나는 경우가 있음
//    이는 새로고침으로 recoil의 값이 초기화 되어 accessToken을 다시
//    refreshAccessToken을 통해 새로운 accessToken을 가져오는데
//    아직 accessToken이 받아오는 도중 자식 컴포넌트인 <Layout />이 실행이 되어
//    accessToken이 없는 상태에서 해당 LoggedIn의 data를 가져올려 하고 있어
//    API가 여러번 요청이 나가는 거였다.

// 해결:
// 1. 우선 useMemo를 사용을 하여 해당 ApolloSetting이 리렌더링이 되어도 자식 컴포넌트까지
//    리렌더링 되는걸 막았다.
// 2. useEffect의 실행이 끝날 때 까지 Layout이 실행이 되는 걸 막아야 한다.
//    이는 RefreshAccessToken의 state의 값을 확인하면 되는데
//    RefreshAccessToken.state === "loading" 은 refreshAccessToken이 실행되는 동안
//    의 loading 상태를 뜻한다 로딩중에서는 Loading의 창을 보여주고 완료되면
//    Layout의 컴포넌트로 넘어가는데 accessToken이 있는 상태여서 API 요청이 한 번으로
//    해결이 되었다.

// ApolloClient - refreshToken(API 중복 요청).txt 참고

//
// headers: {
//   Authorization: `Bearer ${accessToken}`,
// }
// 해더에 Authorization을 통해 안전하게 accessToken을 보내고 응답을 받는다.
// 여기서 응답을 받기 위해서는 credentials: "include" 이 설정을 해줘야 한다.
// 그래야 해당 accessToken을 가지도 다른 PC에 접속하는걸 막을 수 있다.
// 즉 매번 토큰이 유효한지 확인을 하는데 errorLink는 만료가 됐는지 확인을 하고 없으면 그대로
// uploadLink가 실행이 되고
// 만료가 되면 getAccessToken()을 통해 새로운 accessToken을 받아와 he
