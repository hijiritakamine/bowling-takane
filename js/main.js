$(function () {
    $('#navToggle').click(function() {
        $('#gloval-nav').slideToggle();
    });
});

$(function() {
    let data = [];
    let startIndex = 0;
    const itemsPerPage = 5;

    function loadMoreItems() {
        const endIndex = startIndex + itemsPerPage;
        const itemsToLoad = data.slice(startIndex, endIndex);

        itemsToLoad.forEach(user => {
            const userDiv = $('<div></div>').addClass('user');
            const userName = $('<h2></h2>').text(user.name);
            const userEmail = $('<p></p>').text(`Email: ${user.email}`);
            userDiv.append(userName, userEmail);
            $('#user-list').append(userDiv);
        });

        startIndex += itemsPerPage;

        // すべてのアイテムを表示し終えたらボタンを非表示にする
        if (startIndex >= data.length) {
            $('#load-more').hide();
        }
    }

    // JSONファイルからデータを読み込む
    $.getJSON('data.json', function(response) {
        data = response;

        // 初回ロード
        loadMoreItems();
    });

    // ボタンのクリックイベント
    $('#load-more').on('click', function() {
        loadMoreItems();
    });
});