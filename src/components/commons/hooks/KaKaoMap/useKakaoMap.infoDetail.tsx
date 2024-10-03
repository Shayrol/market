// MarketDetail에서 해당 좌표 위치 보여주는 용도

import { useCallback, useEffect } from "react";
import { useQueryFetchUsedItem } from "../graphql-queries/useQueryFetchUsedItem";

declare const window: {
  kakao: any;
};

const KakaoMapDetail = (): JSX.Element => {
  const { data } = useQueryFetchUsedItem();

  const apiKey = "c8ac38df25b77e3b14b8f13f0e33be1c";

  const initializeMap = useCallback(() => {
    const container = document.getElementById("map");
    if (!container) return;

    const defaultLat = Number(data?.fetchUseditem.useditemAddress?.lat);
    const defaultLon = Number(data?.fetchUseditem.useditemAddress?.lng);
    // const defaultLat = data?.fetchUseditem.useditemAddress
    //   ? Number(data?.fetchUseditem.useditemAddress?.lat)
    //   : 37.49648606;
    // const defaultLon = data?.fetchUseditem.useditemAddress
    //   ? Number(data?.fetchUseditem.useditemAddress?.lng)
    //   : 127.02836155;

    const options = {
      center: new window.kakao.maps.LatLng(defaultLat, defaultLon),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const marker = new window.kakao.maps.Marker({
      map,
      position: options.center,
    });
    marker.setMap(map);

    // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const content = `<div style="display: block;
    justify-content;
    background: #50627F;
    color: #fff;
    // text-align: center;
    height: 24px;
    line-height:22px;
    border-radius:4px;
    padding:0px 10px;">${
      data?.fetchUseditem.useditemAddress?.addressDetail
        ? data?.fetchUseditem.useditemAddress?.addressDetail
        : "상세 장소가 입력되지 않았습니다."
    }</div>`;
    // const iwContent = `<span style="
    //  display: block;
    // justify-content;
    // background: #50627F;
    // color: #fff;
    // // text-align: center;
    // height: 24px;
    // line-height:22px;
    // border-radius:4px;
    // padding:0px 10px;
    // ">${data?.fetchUseditem.useditemAddress?.addressDetail}</span>`;

    // const infowindow = new window.kakao.maps.InfoWindow({
    //   position: options.center,
    //   content: iwContent,
    //   // infoWindow 삭제 기능
    //   // removable: true,
    // });
    // infowindow.open(map, marker);
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: options.center,
      content,
      // 마커기준 위치
      xAnchor: 0.5,
      yAnchor: -0.7,
    });
    customOverlay.setMap(map);
  }, [data]);

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

  return (
    <>
      <div
        id="map"
        style={{ width: "100%", height: "500px", borderRadius: "10px" }}
      ></div>
    </>
  );
};

export default KakaoMapDetail;
