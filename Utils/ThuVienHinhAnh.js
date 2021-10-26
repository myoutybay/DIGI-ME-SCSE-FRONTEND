const WEB_API = "https://api.scse-vietnam.org/API/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Management/ListImageTitle")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            const loadMore = $('#loadMore')
            loadMore.on('click', function (e) {
                e.preventDefault();
                var html = response.map(function (response) {
                    let { ID, IDCat, Title, Slug, Details, Image } = response
                    if (IDCat === 1) {
                        IDCat = 'Tin tức'
                    }
                    if (IDCat === 2) {
                        IDCat = 'Dự án'
                    }
                    if (IDCat === 3) {
                        IDCat = 'Hợp tác nghiên cứu'
                    }
                    return `
                    <div class="card mb-3" style="width:100%;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img style="width:300px;height:220px" src="${Image}" class=" mt-3 mx-3"
                                style="border-radius: 2rem;" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                                    <h5 class="card-title font-weight-bold">${Title}</h5>
                                </a>
                                <p class="card-text"><small class="text-muted">${CreatedByDate}</small></p>
                                <p class="card-text">${Details.slice(0, 500)}</p>

                                <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}"><button
                                        class="btn bg-blue-scse btn-primary lg">Chi Tiet</button></a>
                            </div>
                        </div>

                    </div>
                </div>
                    `;
                })
                $('#tbody').html(html);
            })
            const get6NewestPostedDate = response.slice(0, 6)
            var html = get6NewestPostedDate.map(function (response) {
                let { ID, IDCat, Title, Slug, Details, Image } = response
                if (IDCat === 1) {
                    IDCat = 'Tin tức'
                }
                if (IDCat === 2) {
                    IDCat = 'Dự án'
                }
                if (IDCat === 3) {
                    IDCat = 'Hợp tác nghiên cứu'
                }
                return `
                <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="mb-5">
                        <div class="card" style="width:100%; height:100%;box-shadow: 10px 10px 0px #C4C4C4;">
                                <img id="ImgAlbum" onclick="getImage(${ID})" src="${Image}"
                                    class="card-img-top my-2 px-2" style="width:350px; height:250px;object-fit:cover" alt="...">
                            <div class="card-body">
                                <a style="text-decoration: none; color:black" href="#">
                                    <h5 class="card-title">${Title}</h5>
                                </a>

                            </div>
                            <div class="card-footer">
                                <small class="text-muted">${IDCat}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            })
            $('#tbody').html(html);
        })
}
function getImage(ID) {
    var modal = document.getElementById('myModal');
    fetch(WEB_API + "Interface/GetByIDPhotoGallery?ID=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { Image } = response;
            document.getElementById("img01").src = Image;
        })
    modal.style.opacity = 1;
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.opacity = 0;
        modal.style.display = "none";
    }
}