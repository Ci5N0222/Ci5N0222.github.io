document.addEventListener('DOMContentLoaded', async() => {

    // URLSearchParams 객체 생성
    const urlParams = new URLSearchParams(window.location.search);

    // 특정 파라미터 값 가져오기
    const idx = urlParams.get('idx');

    await videoContents(idx);

    console.log("idx ===== ", idx);

});

const dataApi = async (path) => {
    let data = await fetch(path);
    return await data.json();
}


const videoContents = async (idx) => {

    let data = await dataApi("/data/video.json");

    if(data.result === "ok"){
        for(items of data.value) {
            if(items.idx === parseInt(idx)) {
                let video = `
                    <div class="row">
                        <div class="col-12">
                            <div class="embed-container">
                                <iframe width="100%" height="100%"
                                    src="${items.video}" frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>`
                document.querySelector('#video-contents').innerHTML = video;

                let description = `
                    <div class="row" style="margin-top: 15px;">
                        <div class="col-12">
                            <h2>${items.title}</h2>
                        </div>
                        <div class="col-12">
                            <p>${items.description}</p>
                        </div>
                        <hr>
                    </div>`
                document.querySelector('#video-description').innerHTML = description;

                break;
            }
        }
    }
}