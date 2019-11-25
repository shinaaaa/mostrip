import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function List({ }) {
  const [list, setList] = useState([])

  const handle = async () => {

    /*     const data = await axios.get(
          'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown?serviceKey=qPaKtPFXuD0yHTVcEz2ld9WDwKR0PVHmMesO%2FQl2MGGtnAh1IWV8qJMQkHZmn04J0xmRn%2B2YqB6tmaboC8pXow%3D%3D&pageNo=1&numOfRows=10'
        )
        console.log(data);
    
        setList(data); */

    var xmlHttp = new XMLHttpRequest();       // XMLHttpRequest 객체를 생성함.
    xmlHttp.onreadystatechange = function () { // onreadystatechange 이벤트 핸들러를 작성함.
      // 서버상에 문서가 존재하고 요청한 데이터의 처리가 완료되어 응답할 준비가 완료되었을 때
      if (this.status == 200 && this.readyState == this.DONE) {
        // 요청한 데이터를 문자열로 반환함.
        console.log(xmlHttp.responseText);
        setList(xmlHttp.responseText);
        /* document.getElementById("text").innerHTML = xmlHttp.responseText;
 */
      }
    };
    xmlHttp.open("GET", "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown?serviceKey=qPaKtPFXuD0yHTVcEz2ld9WDwKR0PVHmMesO%2FQl2MGGtnAh1IWV8qJMQkHZmn04J0xmRn%2B2YqB6tmaboC8pXow%3D%3D&pageNo=1&numOfRows=10", true);
    xmlHttp.send();
    /* document.getElementById("text").innerHTML = xmlHttp.responseText; */
  }
  useEffect(() => {
    handle()
  }, [])
  return (
    <div id='text'>
      {list}
    </div>
  )
}
