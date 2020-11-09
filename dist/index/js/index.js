$(function() {
    //顶部导航
    $('.Nfr9').hover(function() {
        $(this).children('.Nf0').show().end();
    }, function() {
        $(this).children('.Nf0').hide();
    })

    $('.Nf0').hover(function() {
        $(this).siblings().children('a').toggleClass('noline')
    }, function() {
        $(this).siblings().children('a').toggleClass('noline')
    })

    //中部导航搜索框
    // https://suggest.taobao.com/sug?code=utf-8&q=笔记本&_ksTS=1604491767708_377&callback=jsonp&area=b2c&code=utf-8
    //用jq实时获取input的内容
    $("#head3 input").bind('input propertychange', function() {
        let str = `https://suggest.taobao.com/sug?code=utf-8&q=${$(this).val()}&_ksTS=1604491767708_377&area=b2c&code=utf-8`;
        $.ajax({
            type: 'get',
            url: str,
            dataType: 'jsonp',
            jsonpCallback: 'jsonp',
            success: function(data) {
                if ($('#head3 input').val() == "" && data.result.length == 0) {
                    $('#head3 ul').html('').hide();
                    return;
                }
                let str1 = '';
                $.each(data.result, function(i) {
                    str1 += `<li>${data.result[i][0]}</li>`;
                })
                $('#head3 ul').html('').append(str1).show().children('li').click(function() {
                    $('#head3 input').val($(this).html());
                    $('#head3 ul').hide();
                });
            }
        })
    });
    $("#head3 input").focus(function() {
        let str = `https://suggest.taobao.com/sug?code=utf-8&q=${$(this).val()}&_ksTS=1604491767708_377&area=b2c&code=utf-8`;
        $.ajax({
            type: 'get',
            url: str,
            dataType: 'jsonp',
            jsonpCallback: 'jsonp',
            success: function(data) {
                if ($('#head3 input').val() == "" && data.result.length == 0) {
                    $('#head3 ul').html('').hide();
                    return;
                }
                let str1 = '';
                $.each(data.result, function(i) {
                    str1 += `<li>${data.result[i][0]}</li>`;
                })
                $('#head3 ul').html('').append(str1).show().children('li').click(function() {
                    $('#head3 input').val($(this).html());
                    $('#head3 ul').hide();
                });
            }
        })
    });

    //扩展菜单
    $('#banner1 .B1').hover(function(e) {
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
        let str = `https://tns.simba.taobao.com/?name=tcmad&st_type=5_8&o=m&count=10&pid=430406_1007&_ksTS=1604710243215_225&p4p=jsonp226`
        $.ajax({
            type: 'get',
            url: str,
            dataType: 'jsonp',
            jsonpCallback: 'jsonp226',
            success: function(data) {
                // console.log(data.data[0].adList);
                //刷新页面随机获取五个数据
                let data1 = data.data[0].adList.splice(Math.floor(Math.random()) * 10, 5);
                // console.log(data1);
                let str1 = '';
                $.each(data1, function(i) {
                    if (data1[i].PROMOTEPRICE == '') {
                        data1[i].PROMOTEPRICE = (data1[i].GOODSPRICE + '.0').replace('00.0', '');
                    }
                    // console.log(data1[i].TBGOODSLINK.replace('_sum.jpg', ''));
                    let zhe = Math.floor((data1[i].PROMOTEPRICE / (data1[i].GOODSPRICE + '.0').replace('00.0', '') * 10)).toFixed(0)
                    let zhe1 = (((data1[i].PROMOTEPRICE / (data1[i].GOODSPRICE + '.0').replace('00.0', '')).toFixed(2) * 10).toFixed(1) + "").split('.')[1]
                    str1 += `<div class="con0-3">
                    <div class="img">
                        <span>
                            <h2>${zhe}</h2>.${zhe1}<br>
                            折
                        </span>
                        <a href="#">
                            <img src="${data1[i].TBGOODSLINK.replace('_sum.jpg', '')}" alt="">
                        </a>
                    </div>
                    <div class="con">
                        <p>海外品牌，瞎吹的</p>
                        <h2>${data1[i].SHORTTITLE}</h2>
                        <p>${data1[i].TITLE}</p>
                    </div>
                    <div class="price">
                        <div class="pri1">
                            <div>
                                <span>￥<b>${Math.ceil(data1[i].PROMOTEPRICE)}</b></span>
                                <span>￥${(data1[i].GOODSPRICE + '.0').replace('00.0', '')}</span>
                            </div>
                            <p>
                                已售件${data1[i].SELL}件
                            </p>
                        </div>
                        <a href="#">
                        马上抢
                        </a>
                    </div>
                </div>`
                })
                $('#con0 .con0-2').html(str1);
            }
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
        <div>
            <a href="#" data-id="${arr[i].id}">
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

})