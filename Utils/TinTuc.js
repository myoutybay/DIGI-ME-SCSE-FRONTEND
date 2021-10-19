const WEB_API = "https://api.scse-vietnam.org/API/";


$('#GBDG').on('click', function (e) {
    filterData(1)
})
$('#KHMT').on('click', function (e) {
    filterData(2)
})
$('#TTS').on('click', function (e) {
    filterData(3)
})
$('#NCDT').on('click', function (e) {
    filterData(4)
})
function filterData(IdField) {
    fetch(WEB_API + "Management/ShowAllNewsVN")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const postApproved = response.filter(e => e.IDState === 2)
            if (IdField === 0) {
                const sortByNewDate = postApproved.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                $('#loadMore').on('click', function (e) {
                    executeData(sortByNewDate)

                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                executeData(get6NewestPostedDate)
            } else {
                const filterFields = postApproved.filter(e => e.IdField === IdField)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                executeData(get6NewestPostedDate)
                $('#loadMore').on('click', function (e) {
                    executeData(sortByNewDate)

                })
            }

        })
}
function executeData(data) {
    var html = data.map(function (response) {
        const { Title, Slug, Image, IdField } = response;
        const LinhVuc = changeIdField(IdField)
        return `
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="mt-5 mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <hr class="mt-0 bg-blue-scse" style="height:1rem">
                    <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                        <img src="${Image}"
                            class="card-img-top px-2" style="border-radius: 2rem;" alt="...">
                    </a>
                    <div class="card-body">
                        <a style="text-decoration: none; color:black" href="../Chi-Tiet-Bai-Viet/index.html?slug=${Slug}">
                            <h5 class="card-title font">${Title}</h5>
                        </a>

                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${LinhVuc}</small>
                    </div>
                </div>
            </div>
        </div>                         
            `;
    })
    $('#tbody').html(html);
}
function changeIdField(id) {
    if (id === 1) {
        return 'Giới và bình đẳng giới'
    }
    if (id === 2) {
        return 'Biến đổi khí hậu môi trường'
    }
    if (id === 3) {
        return 'Thực tập sinh'
    }
    if (id === 4) {
        return 'Nghiên cứu Đào tạo'
    }
}
function filterDataEN(IdFieldEN) {
    fetch(WEB_API + "Management/ShowAllNewsEN")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            const postApproved = response.filter(e => e.IDState === 2)
            if (IdFieldEN === 0) {
                const sortByNewDate = postApproved.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                $('#loadMore').on('click', function (e) {
                    executeDataEN(sortByNewDate)

                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                executeDataEN(get6NewestPostedDate)
            } else {
                const filterFields = postApproved.filter(e => e.IdField === IdField)
                const sortByNewDate = filterFields.sort(function (a, b) {
                    a = new Date(a.UpdatedByDate);
                    b = new Date(b.UpdatedByDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                const get6NewestPostedDate = sortByNewDate.slice(0, 6)
                executeDataEN(get6NewestPostedDate)
                $('#loadMore').on('click', function (e) {
                    executeDataEN(sortByNewDate)

                })
            }

        })
}
function executeDataEN(data) {
    var html = data.map(function (response) {
        const { Title, SlugEN, Image, IdField } = response;
        const LinhVuc = changeIdFieldEN(IdField)
        return `
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="mt-5 mb-5">
                <div class="card" style="width:100%; height:100%;">
                    <hr class="mt-0 bg-blue-scse" style="height:1rem">
                    <a href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                        <img src="${Image}"
                            class="card-img-top px-2" style="border-radius: 2rem;" alt="...">
                    </a>
                    <div class="card-body">
                        <a style="text-decoration: none; color:black" href="../Chi-Tiet-Bai-Viet/index.html?slug=${SlugEN}">
                            <h5 class="card-title font">${Title}</h5>
                        </a>

                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${LinhVuc}</small>
                    </div>
                </div>
            </div>
        </div>                         
            `;
    })
    $('#tbody').html(html);
}
function changeIdFieldEN(id) {
    if (id === 1) {
        return 'Gender and gender equality'
    }
    if (id === 2) {
        return 'Climate change - Environment'
    }
    if (id === 3) {
        return 'Internship'
    }
    if (id === 4) {
        return 'Research - Training'
    }
}