$(function() {
    $('header').load('../html/header.html');
    $('footer').load('../html/footer.html');
    window.onload = function() {
        // 拿cookie并更改
        let user = JSON.parse($.cookie('user'));
        // console.log(user);
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
    var id = ($(window).attr('location').search).replace('?id=', '')
    let url = `http://localhost:3000/products/${id}`

    $('.jian').click(function() {
        let num1 = $('.num input').val()
        if (num1 <= 1) {
            $('.num input').val(1);
            return false;
        }
        num1--;
        $('#title input').val(num1);
    })
    $('.jia').click(function() {
        let num1 = $('.num input').val()
        num1++;
        $('#title input').val(num1);
    })

    axios.get(url).then(res => {
        // console.log(res.data);
        $('#Bigbox img').attr('src', res.data.imgUrl);
        $('#Midbox img').attr('src', res.data.imgUrl);
        $('#Smabox img').attr('src', res.data.imgUrl);
        $('#title h2').html(res.data.title);
        $('#title .price').html('￥' + res.data.price);
        $('#title .btn').after('<p class="success1">添加成功</p>')
        $('#title .success1')
            .css({
                'position': 'absolute',
                'right': "30px",
                "bottom": '160px',
                "display": 'none'
            });

        $('#title .btn').click(function() {
            console.log(JSON.parse($.cookie('user')));
            if (JSON.parse($.cookie('user')) == null) {
                alert('请先登录');
                $(window).attr('location', '../html/login.html')
                return false;
            }
            let user = JSON.parse($.cookie('user')).id;
            axios.get(`http://localhost:3000/catData`).then(res => {
                // console.log(res.data);
                $.each(res.data, function(i) {
                    var flag = true;
                    if (res.data[i].id == user) {
                        let arr = res.data[i].data;
                        let Num = Number($('#title input').val())
                        $.each(arr, function(j) {
                            if (arr[j].id == id) {
                                let count = Number(arr[j].num)
                                count += Num;
                                arr[j].num = count;
                                return flag = false;
                            }
                        })
                        if (flag) {
                            arr1 = { id: id, num: $('#title input').val() }
                            arr.push(arr1);
                        }
                        // console.log(arr);
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: arr
                        })

                        $('#title .success1').fadeIn().animate({
                            'bottom': '180px'
                        }).fadeOut().css({
                            'bottom': '160px'
                        });
                    }
                })
            })
        })
    })
})