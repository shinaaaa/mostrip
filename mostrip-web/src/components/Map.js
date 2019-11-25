import React, { useEffect } from 'react';

export default function Map() {

  const handle = async () => {
    var mapContainer = await document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
        center: new window.daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };
    var map = new window.daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다 
    var markerPosition = new window.daum.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성합니다
    var marker = new window.daum.maps.Marker({
      position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

  }

  useEffect(() => {
    console.log(window.daum);
    handle()
  });

  return (
    <>
      <div id="map" style={{ width: '100 %', height: ' 350px' }}></div>
    </>
  )
}
