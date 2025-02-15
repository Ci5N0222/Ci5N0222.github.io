let baseUrl = "http://localhost";

document.addEventListener('DOMContentLoaded', async() => {

    // 데이터 통신
    let data = await dataApi(baseUrl);

    if(data.result === "ok") {
        // 배너 캐러셀 바인딩
        bannerItems(data.value.banner);

        // Best 작품 바인딩
        bestItems(data.value.best);
        
        // 인기 작품 바인딩
        cardItems(data.value.animation);
    }
    

    // 메인 배너 케러셀
    const nextBtn = document.querySelector(".carousel-control-next");
    setInterval(() => nextBtn.click(), 4000);

});

// 데이터 통신
const dataApi = async (path) => {
    let data = await fetch(path);
    return await data.json();
}


// 배너 아이템 바인딩
const bannerItems = (data) => {
    let count = 0;

    for(items of data){
        let str = count > 0? "" : "active";
        const item  = `
            <div class="carousel-item ${str}">
                <img src="${items.bannerUrl}" class="d-block w-100" alt="${items.title} 배너" />
            </div>`
        document.querySelector('#carouselItem').innerHTML += item;
        count ++;
    }
}

// 베스트 작품 바인딩
const bestItems = (data) => {
    for(items of data) {
        let item = `
            <div class="col-12 col-md-4" style="margin-top: 15px;">
                <div class="card" style="width: 100%;">
                    <a href="${baseUrl}/detail/${items.idx}">
                        <img src="${items.thumbnail}" class="card-img-top" id="content-image1" alt="${items.title}">
                    </a>
                    <div class="card-body">
                        <p class="card-text" style="font-size: 24px;">${items.title}
                            <span class="card-text" style="font-size: 16px; color: grey;"><a
                                    href="${baseUrl}/detail/${items.idx}">자세히보기</a></span>
                        </p>
                    </div>
                </div>
            </div>`

        document.querySelector('#best-contents').innerHTML += item;
    }
}

// 작품
const cardItems = (data) => {
    for(items of data) {
        let item = `
            <div class="col-6 col-md-4 col-lg-3" style="margin-top: 15px;">
                <div class="card" style="width: 100%;">
                    <a href="/view/detail.html?idx=${items.idx}">
                        <img src="${items.thumbnail}" class="card-img-top" id="content-image1" alt="${items.title}">
                    </a>
                    <div class="card-body">
                        <p class="card-text" style="font-size: 22px;">${items.title}
                            <span class="card-text" style="font-size: 14px; color: grey;"><a
                                    href="/view/detail.html?idx=${items.idx}">자세히보기</a></span>
                        </p>
                    </div>
                </div>
            </div>`

        document.querySelector('#popular-contents').innerHTML += item;
    }
}
