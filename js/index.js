document.addEventListener('DOMContentLoaded', () => {
    
    // Best 작품 바인딩
    bestItems();
    
    // 인기 작품 바인딩
    cardItems();

    // 메인 배너 케러셀
    const nextBtn = document.querySelector(".carousel-control-next");
    setInterval(() => nextBtn.click(), 4000);
    
});

const dataApi = async (path) => {
    let data = await fetch(path);
    return await data.json();
}

const bestItems = async () => {
    let data = await dataApi('/data/best.json');

    if(data.result === "ok") {
        for(items of data.value) {
            let item = `
                <div class="col-12 col-md-4" style="margin-top: 15px;">
                    <div class="card" style="width: 100%;">
                        <a href="/view/detail.html?idx=${items.idx}">
                            <img src="${items.image}" class="card-img-top" id="content-image1" alt="${items.title}">
                        </a>
                        <div class="card-body">
                            <p class="card-text" style="font-size: 24px;">${items.title}
                                <span class="card-text" style="font-size: 16px; color: grey;"><a
                                        href="/view/detail.html?idx=${items.idx}">자세히보기</a></span>
                            </p>
                        </div>
                    </div>
                </div>`

            document.querySelector('#best-contents').innerHTML += item;
        }
    }
}

const cardItems = async() => {
    let data = await dataApi('/data/popular.json');
    if(data.result === "ok") {
        for(items of data.value) {
            let item = `
                <div class="col-6 col-md-4 col-lg-3" style="margin-top: 15px;">
                    <div class="card" style="width: 100%;">
                        <a href="${items.href}">
                            <img src="${items.image}" class="card-img-top" id="content-image1" alt="${items.title}">
                        </a>
                        <div class="card-body">
                            <p class="card-text" style="font-size: 22px;">${items.title}
                                <span class="card-text" style="font-size: 14px; color: grey;"><a
                                        href="${items.href}">자세히보기</a></span>
                            </p>
                        </div>
                    </div>
                </div>`

            document.querySelector('#popular-contents').innerHTML += item;
        }
    }

}