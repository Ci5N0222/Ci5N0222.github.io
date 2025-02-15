document.addEventListener('DOMContentLoaded', async() => {

    // URLSearchParams 객체 생성
    const urlParams = new URLSearchParams(window.location.search);

    // 특정 파라미터 값 가져오기
    const idx = urlParams.get('idx');

    await mainContents(idx);

    subContents();


});

const dataApi = async (path) => {
    let data = await fetch(path);
    return await data.json();
}


const mainContents = async (idx) => {
    let data = await dataApi('/data/best.json');

    if(data.result === "ok") {
        for(items of data.value) {
            if(items.idx === parseInt(idx)) {
                let item = `
                    <div class="row d-md-none">
                        <div class="col-12">
                            <img src="${items.bg_sm_image}" alt="${items.title}배경" style="width: 100%; margin-bottom: 15px" />
                        </div>
                        <h2>${items.titlf}</h2>
                        <p>${items.description}</p>
                        <button class="btn btn-primary" onclick="location.href='video.html?idx=${items.idx}'">
                            PV 영상 보기
                        </button>
                    </div>

                    <div class="row content-descript d-none d-md-flex" style="
                        margin-top: 30px;
                        background-image: URL('${items.bg_image}');
                        background-size: cover;
                        ">
                        <div class="title">
                            <div class="col-12">
                                <h1 style="color: white">${items.title}</h1>
                                <br /><br /><br />
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" onclick="location.href='video.html?idx=${items.idx}'">
                                    PV 영상 보기
                                </button>
                            </div>
                            <div class="col-12">
                                <br /><br />
                                <p style="color: white">${items.description}</p>
                            </div>
                        </div>
                        <div class="description">
                            <img src="${items.sub_image1}" class="card-img-top" loop="infinite" alt="${items.title} 이미지1" />
                            <img src="${items.sub_image2}" class="card-img-top" loop="infinite" alt="${items.title} 이미지2" />
                        </div>
                    </div>`;

                document.querySelector('#main-contents').innerHTML =item;

                break;
            }
        }
    }
}

const subContents = () => {
    item = `
        <div class="row" style="margin-top: 70px; margin-left: auto; margin-right: auto;">
            <h3>비슷한 작품</h3>
            <hr>

            <div class="col-6 col-md-4 col-lg-3" style="margin-top: 15px;">
                <div class="card" style="width: 100%;">
                    <a href="#">
                        <img src="../img/popular_1.jpg" class="card-img-top" id="content-image1" alt="귀멸의칼날">
                    </a>
                    <div class="card-body">
                        <p class="card-text" style="font-size: 22px;">스파이 패밀리
                            <span class="card-text" style="font-size: 14px; color: grey;"><a href="#">자세히보기</a></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3" style="margin-top: 15px;">
                <div class="card" style="width: 100%;">
                    <a href="#">
                        <img src="../img/popular_2.jpg" class="card-img-top" id="content-image1" alt="귀멸의칼날">
                    </a>
                    <div class="card-body">
                        <p class="card-text" style="font-size: 22px;">하이큐
                            <span class="card-text" style="font-size: 14px; color: grey;"><a href="#">자세히보기</a></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3" style="margin-top: 15px;">
                <div class="card" style="width: 100%;">
                    <a href="#">
                        <img src="../img/popular_3.jpg" class="card-img-top" id="content-image1" alt="귀멸의칼날">
                    </a>
                    <div class="card-body">
                        <p class="card-text" style="font-size: 22px;">마슐
                            <span class="card-text" style="font-size: 14px; color: grey;"><a href="#">자세히보기</a></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3" style="margin-top: 15px;">
                <div class="card" style="width: 100%;">
                    <a href="#">
                        <img src="../img/popular_4.jpg" class="card-img-top" id="content-image1" alt="귀멸의칼날">
                    </a>
                    <div class="card-body">
                        <p class="card-text" style="font-size: 22px;">원피스
                            <span class="card-text" style="font-size: 14px; color: grey;"><a href="#">자세히보기</a></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `
    document.querySelector('#sub-contents').innerHTML =item;
}