$(function() {
    // 引入头部
    $('header').load('../html/header.html');
    //  引入数据
    $("#product-wrap").load('../html/page.html')
        //引入尾部
    $('footer').load('../html/footer.html')
    window.onload = function() {
        $('.Nfr4').after('<li class="Nfr-phone"><span class="iconfont icon-xiangji"></span> <a href="#">手机版</a><div class="img"><div class="img1"></div><div class="img2"></div><p></p></div></li>');
        $('#head2 img').attr({ 'src': '../img/yzjkqsj.png', 'width': '175px' });
        $('#product-wrap .zxf_pagediv').css({ 'position': 'relative', "top": '0px' })

        // 拿cookie并更改
        let user = JSON.parse($.cookie('user'));
        console.log(user);
        if (user) {
            let str = `
                Hi,<a href="#"> ${user.name}</a>
            `
            $('#Nf-l p').eq(1).html(str).next('p').html('').html(`<a href="#" class="delcookie">退出</a>`);
        }
        $('.delcookie').click(function() {
            $.cookie('user', null);
            alert('退出成功');
            location.reload();
        })
    }
})