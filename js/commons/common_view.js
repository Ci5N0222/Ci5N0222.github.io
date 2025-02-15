document.addEventListener('DOMContentLoaded', () => {

    // Header Binding
    header();

    // Footer Binding
    footer();

    // Search Modal Binding
    searchModal()
});

// Header html element
const header = () => {
    let item = `
        <div class="container-fluid navi">
            <div class="row">
                <div class="col-12">
                    <nav class="navbar navbar-expand-md">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="/index.html" style="color: deeppink;">ANI-MATE</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/view/best.html"><p class="default-font">BEST</p></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/view/event.html"><p class="default-font">EVENT</p></a>
                                    </li>
                                    <li class="nav-item d-md-none">
                                        <a href="view/login.html">
                                            <p class="default-font">Login</p>
                                        </a>
                                    </li>
                                </ul>
                                <div class="nav-account d-none d-md-block">
                                    <i class="fa-solid fa-magnifying-glass" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal" style="cursor: pointer; margin-right: 15px;"></i>
                                    <a href="/view/login.html"><i class="fa-solid fa-user"></i></a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <div style="height: 50px;"></div>
    `
    document.querySelector('#nav-bar').innerHTML = item;
}

// Footer html element
const footer = () => {
    let item = `
        <div class="row footer" style="margin-top: 70px; margin-left: auto; margin-right: auto;">
            <br />
            <hr />
            <div class="col-12 col-md-4">
                <span style="color: deeppink; font-size: 30px;">ANI-MATE</span>
                <p>
                    (주)ANI-MATE 사업자 정보
                </p>
            </div>
            <div class="col-12 col-md-8" style="text-align: center;">
                <p>Create by Sion-Noh</p>
                <p>Contract Kakao: test123 　| 　E-mail: test@gamil.com</p>
            </div>
        </div>
    `

    document.querySelector('#footer-bar').innerHTML = item;
}

// Search Modal 
const searchModal = () => {
    let item = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Search</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <a href="detail1.html" style="color:blue; margin-right: 10px;">#귀멸의칼날</a>
                        <a href="detail2.html" style="color:blue; margin-right: 10px;">#주술회전</a>
                        <a href="detail3.html" style="color:blue">#최애의아이</a>
                        <input type="text" style="width: 400px; margin-top:15px" placeholder="검색어를 입력하세요">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">검색</button>
                    </div>
                </div>
            </div>
        </div> 
        `

    document.querySelector('#search-modal').innerHTML = item;
}
