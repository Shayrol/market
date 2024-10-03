// import { useEffect } from "react";

// declare const window: {
//   kakao: any;
// };

// const KakaoMap: React.FC = () => {
//   const apiKey = "c8ac38df25b77e3b14b8f13f0e33be1c";

//   // 카카오 API 호출
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
//     document.head.appendChild(script);

//     script.addEventListener("load", () => {
//       window.kakao.maps.load(() => {
//         const container = document.getElementById("map");
//         const options = {
//           center: new window.kakao.maps.LatLng(37.544992, 126.722193), // 초기 중심 좌표 (위도, 경도)
//           level: 3, // 지도 확대 레벨
//         };
//         const map = new window.kakao.maps.Map(container, options);
//       });
//     });
//   }, []);

//   return (
//     <>
//       <div id="map" style={{ width: "100%", height: "400px" }}></div>
//     </>
//   );
// };

// export default KakaoMap;

// import { useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { isLatState, isLonState } from "../../../../commons/stores";

// declare const window: {
//   kakao: any;
// };

// const KakaoMap = (): JSX.Element => {
//   const [, setLat] = useRecoilState(isLatState);
//   const [, setLon] = useRecoilState(isLonState);

//   const apiKey = "c8ac38df25b77e3b14b8f13f0e33be1c";

//   // 카카오 API 호출
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
//     document.head.appendChild(script);

//     script.addEventListener("load", () => {
//       window.kakao.maps.load(() => {
//         const container = document.getElementById("map");
//         const options = {
//           center: new window.kakao.maps.LatLng(37.544992, 126.722193), // 초기 중심 좌표 (위도, 경도)
//           level: 3, // 지도 확대 레벨
//         };
//         const map = new window.kakao.maps.Map(container, options);

//         if (navigator.geolocation) {
//           // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//           navigator.geolocation.getCurrentPosition(function (position) {
//             const lat = position.coords.latitude; // 위도
//             const lon = position.coords.longitude; // 경도

//             const locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
//             console.log("카카오맵: ", lat);
//             console.log("카카오맵: ", lon);
//             setLat(lat);
//             setLon(lon);

//             // 마커를 표시합니다
//             displayMarker(locPosition);
//           });
//         } else {
//           // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치를 설정합니다

//           const locPosition = new window.kakao.maps.LatLng(
//             33.450701,
//             126.570667
//           );

//           displayMarker(locPosition);
//         }

//         // 지도에 마커를 표시하는 함수입니다
//         function displayMarker(locPosition: any): void {
//           const marker = new window.kakao.maps.Marker({
//             map,
//             position: locPosition,
//           });
//           marker.setMap(map);
//           window.kakao.maps.event.addListener(
//             map,
//             "click",
//             function (mouseEvent: any) {
//               const latlng = mouseEvent.latLng;
//               marker.setPosition(latlng);
//             }
//           );

//           // 지도 중심좌표를 접속위치로 변경합니다
//           map.setCenter(locPosition);
//         }
//       });
//     });
//     console.log("카카오생성");
//   }, []);
//   return (
//     <>
//       <div id="map" style={{ width: "100%", height: "400px" }}></div>
//     </>
//   );
// };

// export default KakaoMap;

// 🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈

import { useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { isLatState, isLonState } from "../../../../commons/stores";
import { useQueryFetchUsedItem } from "../graphql-queries/useQueryFetchUsedItem";

declare const window: {
  kakao: any;
};

const KakaoMap = (): JSX.Element => {
  const [, setLat] = useRecoilState(isLatState);
  const [, setLon] = useRecoilState(isLonState);
  const { data } = useQueryFetchUsedItem();

  const apiKey = "c8ac38df25b77e3b14b8f13f0e33be1c";

  // 카카오 맵 초기화 및 설정
  const initializeMap = useCallback(() => {
    const container = document.getElementById("map");
    if (!container) return;

    // 주소 없으면 강남역 설정됨
    const defaultLat = data?.fetchUseditem.useditemAddress
      ? Number(data?.fetchUseditem.useditemAddress?.lat)
      : 37.49648606;
    const defaultLon = data?.fetchUseditem.useditemAddress
      ? Number(data?.fetchUseditem.useditemAddress?.lng)
      : 127.02836155;

    // 카카오 맵 기본 설정
    const options = {
      center: new window.kakao.maps.LatLng(defaultLat, defaultLon),
      // center: new window.kakao.maps.LatLng(37.544992, 126.722193),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const marker = new window.kakao.maps.Marker({
      map,
      position: options.center,
    });

    // 좌표 이동에 대한 마커 위치 표시 및 좌표 저장
    const updatePosition = (lat: number, lon: number): void => {
      const locPosition = new window.kakao.maps.LatLng(lat, lon);
      setLat(lat);
      setLon(lon);
      marker.setPosition(locPosition);
    };

    // 저장된 데이터가 있으면 해당 데이터 위치 없으면 사용자 현재 위치 가져오기
    if (data?.fetchUseditem.useditemAddress) {
      const defaultLat = Number(data?.fetchUseditem.useditemAddress.lat);
      const defaultLon = Number(data?.fetchUseditem.useditemAddress.lng);
      updatePosition(defaultLat, defaultLon);
    } else {
      // 현재 위치
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        updatePosition(lat, lon);
        // 새로고침 시 해당 marker(좌표)로 맵 이동
        const locPosition = new window.kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }

    // 클릭으로 마커 표시
    window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
      const latlng = mouseEvent.latLng;
      const lat = latlng.getLat();
      const lon = latlng.getLng();
      updatePosition(lat, lon);
    });
  }, [setLat, setLon]);

  // CSR에서 해당 script 다운 받도록 하기 위함
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    const handleScriptLoad = (): void => {
      window.kakao.maps.load(initializeMap);
    };

    script.addEventListener("load", handleScriptLoad);

    return () => {
      script.removeEventListener("load", handleScriptLoad);
      document.head.removeChild(script);
    };
  }, [initializeMap, apiKey]);
  // initializeMap으로 해야

  return (
    <>
      <div
        id="map"
        style={{ width: "100%", height: "500px", borderRadius: "10px" }}
      ></div>
    </>
  );
};

export default KakaoMap;
