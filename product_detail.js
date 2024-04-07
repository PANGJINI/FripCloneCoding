
    // 배너 관련
    const mainBanner = document.querySelector("div.mainBanner");
    const firstBanner = document.createElement("div");
    const lastBanner = document.createElement("div");
    const arrows = document.querySelectorAll("div.arrow");
    const bannerPageSpan = document.querySelector(".presentBannerPage span");
    // 상세보기 더보기 버튼 관련
    const moreButton = document.querySelector(".moreButton");
    const moreButtonStr = document.querySelector(".moreButton span");
    const contentBody = document.querySelector(".contentBody");
    // 유의사항, 환불 더보기 관련
    const caution = document.getElementById("caution");
    const cautionDetail = document.getElementById("cautionDetail");
    const refund = document.getElementById("refund");
    const refundDetail = document.getElementById("refundDetail");

    cautionDetail.style.display = "none";   // 유의사항 세부 내용이 안보이도록 초기화
    refundDetail.style.display = "none";   // 환불 세부 내용이 안보이도록 초기화
    

    let cnt = 0;    // 몇 번째 배너인지를 담을 변수
    bannerPageSpan.textContent = `${cnt + 1} / 2`;  // 배너 이미지 순서 표시

    // 배너
    // 배너의 끝에 1번 이미지 추가하기
    lastBanner.innerHTML = `<img src="imgs/img01.png">`;
    mainBanner.appendChild(lastBanner);
    // 배너의 맨 앞에 2번 이미지 추가하기
    firstBanner.innerHTML = `<img src="imgs/img02.png">`;
    mainBanner.insertBefore(firstBanner, document.querySelector("div.mainBanner div"));
    // 맨 처음에 출력되는 이미지를 1번 이미지로 하기 위함
    mainBanner.style.transform = `translate(-375px)`;   

    // 배너 화살표 클릭 이벤트
    let arrowButtonCheck = true;

    arrows.forEach((arrow) => {
        arrow.addEventListener("click", (e) => {
            if(arrowButtonCheck) {      //arrowButtonCheck가 false인 동안은 새로운 이벤트 발생x
                arrowButtonCheck = false;

                let arrowType = e.target.classList[0];     //이전버튼인지, 다음버튼인지
                if(arrowType === "left") {      //이전버튼
                    cnt--;
                    mainBanner.style.transition = `transform 0.5s`;     // 0.5초동안 애니메이션 적용
                    mainBanner.style.transform = `translate(${-375 * (cnt + 1)}px)`;    // 이전 사진으로 이동

                    if(cnt === -1) {    //맨 처음 슬라이드일 때
                        setTimeout(() => {
                            mainBanner.style.transition = `transform 0s`;       // 애니메이션 없이 바로 적용
                            mainBanner.style.transform = `translate(-750px)`;   // 마지막 사진 위치로 이동
                        }, 500)     // 0.5초 뒤에 실행
                        cnt = 1;
                    }
                } else {    //다음버튼
                    cnt++;  
                    mainBanner.style.transition = `transform 0.5s`;
                    mainBanner.style.transform = `translate(${-375 * (cnt + 1)}px)`;

                    if(cnt === 2) {     //마지막 슬라이드일 때
                        setTimeout(() => {
                            mainBanner.style.transition = `transform 0s`;
                            mainBanner.style.transform = `translate(-375px)`;
                        }, 500)
                        cnt = 0;
                    }
                }
                
                // 배너 이미지 순서 업데이트
                bannerPageSpan.textContent = `${cnt + 1} / 2`;

                // 화살표를 0.5초 후에 재클릭 할 수 있도록 설정
                setTimeout(() => {
                    arrowButtonCheck = true;
                }, 500);
            }

        })//end 이벤트리스너
    });


    let isOpen = false;     // 상세보기 펼침 여부 변수

    // 상세정보 더보기 버튼 이벤트
    moreButton.addEventListener("click", (e) => {
        if(!isOpen) {   // 상세보기 접힘 상태일 때
            contentBody.style.height = '23850px';
            moreButtonStr.textContent = '간략히';
        } else {        // 상세보기 열림 상태일 때
            contentBody.style.height = '940px'
            moreButtonStr.textContent = '상세정보 더보기';
        }
        isOpen = !isOpen;
    });


    // 모이는 장소 지도 (네이버 지도 API)
    let mapNaver = new naver.maps.Map('mapNaver', {     // 네이버 지도 생성
        center: new naver.maps.LatLng(37.479510, 126.440910),
        zoom: 20
    });

    var marker = new naver.maps.Marker({        // 마커 생성
            position: new naver.maps.LatLng(37.479510, 126.440910),
            map: mapNaver
    });


    // 진행하는 장소 지도 (구글맵 API)
    let map = document.getElementById("mapGoogle");

    async function initMap() {
        //28.505348532190954, 83.94747550727986
        const position = { lat: 28.5043, lng: 83.9470 };    // 지도 좌표
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

        map = new Map(document.getElementById("mapGoogle"), {     // 구글 지도 생성
            zoom: 15,
            center: position,
            mapId: "DEMO_MAP_ID",
        });

        new google.maps.Marker({    // 마커 생성
            position: position,
            map,
            title: "Hello World!",
        });
    }

    initMap();


    // 유의사항 펼치기
    let cautionOpen = false;    // 펼침 여부 변수

    caution.addEventListener("click", (e) => {
        if(!cautionOpen) {   // 유의사항 접힘 상태일 때
            console.log("dl");
            cautionDetail.style.display = "block";
        } else {        // 상세보기 열림 상태일 때
            cautionDetail.style.display = "none";
        }
        cautionOpen = !cautionOpen;
    })


    // 유의사항 펼치기
    let refundOpen = false;

    refund.addEventListener("click", (e) => {
        if(!refundOpen) { 
            refundDetail.style.display = "block";
        } else {
            refundDetail.style.display = "none";
        }
        refundOpen = !refundOpen;
    })
