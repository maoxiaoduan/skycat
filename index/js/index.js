$(function() {
    //引入头部
    $('#Nav-wrap').load('../html/header.html')


    //扩展菜单
    $('#banner1 .B1').hover(function() {
        $(this).addClass('hover1').find('.line').stop().fadeIn()
            .siblings('.b11').show()
    }, function() {
        $(this).removeClass('hover1').find('.line').stop().fadeOut().siblings('.b11').hide();
    });
    $('.del').click(function() {
        // console.log($(this).parent().siblings('.line').parent());
        $(this).parent().stop().hide()
            .siblings('.line').stop().fadeOut().parent()
            .removeClass('hover1');
    })

    //swiper轮播图
    //滑动上去停掉动画，移出动态启动
    $("#banner2 .swiper-wrapper .swiper-slide").hover(function() {
        swiper1.autoplay.stop();
    }, function() {
        swiper1.autoplay.start();
    })
    $(".swiper-pagination-bullet").mouseover(function() {
        $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
    })

    //全球精选
    $(function() {
        axios.get(`http://localhost:3000/products`).then(res => {
            let data1 = res.data.splice(Math.floor(Math.random()) * 10, 5);
            let str1 = '';
            $.each(data1, function(i) {
                str1 += `<div class="con0-3" data-id="${data1[i].id}">
                    <div class="img">
                        <span>
                            <h2>9</h2>.0<br>
                            折
                        </span>
                        <a href="#">
                            <img src="${data1[i].imgUrl}" alt="">
                        </a>
                    </div>
                    <div class="con">
                        <p>海外品牌，瞎吹的</p>
                        <h2>${data1[i].title}</h2>
                        <p>${data1[i].title}</p>
                    </div>
                    <div class="price">
                        <div class="pri1">
                            <div>
                                <span>￥<b>${(data1[i].price)}</b></span>
                                <span>￥${data1[i].price}</span>
                            </div>
                            <p>
                                已售件${Math.floor(Math.random() * 9999)}件
                            </p>
                        </div>
                        <a href="#">
                        马上抢
                        </a>
                    </div>
                </div>`
            })
            $('#con0 .con0-2').html(str1);
            $('.con0-3').click(function() {
                let url = `../html/productDetail.html?id=${$(this).attr('data-id')}`
                $(window).attr('location', url);
            })
        })
    })

    //信息中的数据
    //获取随机数据 
    function Data(data, dom) {
        let str = "";
        let num = Math.round(Math.random() * (data.length - 5));
        let arr = data.splice(num, 5);
        $.each(arr, function(i) {
            str += `
        <div class="pro-item" data-id="${arr[i].id}">
            <a>
            <img src="${arr[i].imgUrl}" alt="">
                <div class="title">${arr[i].title}</div>
            <div class="price">
            <p><span>￥</span>${arr[i].price}</p>
            <span>￥${Math.floor(arr[i].price * 0.9)}</span>
                </div>
                </a>
            </div>
        `
        })
        dom.html(str);
        $('.pro-item').click(function() {
            let url = `../html/productDetail.html?id=${$(this).attr('data-id')}`
            $(window).attr('location', url);
        })
    }
    $.ajax({
        url: `http://localhost:3000/products`,
        type: 'get',
        success: function(data) {
            let arr1 = $('.con1-con .con1-3');
            Data(data, arr1.eq(0));
            Data(data, arr1.eq(1));
            Data(data, arr1.eq(2));
            Data(data, arr1.eq(3));
            Data(data, arr1.eq(4));
            Data(data, arr1.eq(5));
            Data(data, arr1.eq(6));
        }
    })


    $('.con11 .con1-3>div').hover(function() {
        $(this).find('img').stop().animate({
            'left': '-5px'
        }, 200)
    }, function() {
        $(this).find('img').stop().animate({
            'left': '0px'
        }, 200)
    })

    //楼梯导航
    $(window).scroll(function() {
        $(this).scrollTop() > 200 ? $('#stairs').fadeIn() : $('#stairs').fadeOut()
    });

    $('#stairs1 li').hover(function() {
        $(this).find('span').stop().animate({
            "left": '-40px'
        }, 200).siblings().stop().animate({
            "left": '0px'
        }, 200)
    }, function() {
        $(this).find('span').stop().animate({
            "left": '0px'
        }, 200).siblings().stop().animate({
            "left": '40px'
        }, 200)
    })
    $('#stairs2 li').hover(function() {
            $(this).find('span').stop().animate({
                "left": '-40px'
            }, 200).siblings().stop().animate({
                "left": '0px'
            }, 200)
        }, function() {
            $(this).find('span').stop().animate({
                "left": '0px'
            }, 200).siblings().stop().animate({
                "left": '40px'
            }, 200)
        })
        //引入底部
    $('#Footer-wrap').load('../html/footer.html')


    window.onload = function() {
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