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
    if (JSON.parse($.cookie('user')) == null) {
        return false;
    }
    let user = JSON.parse($.cookie('user')).id;
    // console.log(user);
    axios.get(`http://localhost:3000/catData/${user}`).then(res => {
        let str = '';
        let arr = res.data.data;
        $.each(arr, function(i) {
            axios.get(`http://localhost:3000/products/${arr[i].id}`).then(res => {
                str += `
                <li data-id="${res.data.id}">
                <input type="checkbox">
                <img src="${res.data.imgUrl}" alt="">
                <div class="con">
                    <p class="name">${res.data.title}</p>
                    <p class="price">单价为：<span>${res.data.price}</span></p>
                    <p class="totalprice">总价为:<span>${res.data.price * arr[i].num}</span></p>
                    <div class="num">
                        <button class="jian">-</button>
                        <input type="text" value="${arr[i].num}">
                        <button class="jia">+</button>
                    </div>
                </div>
                <button class="del">删除</button>
                <button class="change" style="display:none">确定更改</button>
            </li>
                `
                if (i == arr.length - 1) {
                    $('#content').html(str);
                    $('.num .jian').click(function() {
                        let Count = $(this).siblings('input').val();
                        let ID = $(this).parent().parent().parent().attr('data-id');
                        let price = $(this).parent().siblings('.price').find('span').html()
                        Count--;
                        if (Count <= 1) {
                            Count = 1;
                        }
                        $.each(arr, function(k) {
                            if (arr[k].id == ID) {
                                arr[k].num = Count;
                                return false;
                            }
                        })
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: arr
                        })
                        $(this).siblings('input').val(Count).parent().siblings('.totalprice').find('span').html(price * Count)

                    })
                    $('.num .jia').click(function() {
                        let Count = $(this).siblings('input').val();
                        let ID = $(this).parent().parent().parent().attr('data-id');
                        let price = $(this).parent().siblings('.price').find('span').html()
                        Count++;
                        $.each(arr, function(k) {
                            if (arr[k].id == ID) {
                                arr[k].num = Count;
                                return false;
                            }
                        })
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: arr
                        })
                        $(this).siblings('input').val(Count).parent().siblings('.totalprice').find('span').html(price * Count)
                    })
                    $('.num input').blur(
                        function() {
                            let Count = $(this).val();
                            let ID = $(this).parent().parent().parent().attr('data-id');
                            let price = $(this).parent().siblings('.price').find('span').html()
                            if (Count <= 1 && Count == "") {
                                Count = 1;
                            }
                            $.each(arr, function(k) {
                                if (arr[k].id == ID) {
                                    arr[k].num = Count;
                                    return false;
                                }
                            })
                            axios.put(`http://localhost:3000/catData/${user}`, {
                                data: arr
                            })
                            $(this).val(Count).parent().siblings('.totalprice').find('span').html(price * Count)

                        }
                    )

                    // 删除
                    $('.del').click(function() {
                        let dom = $(this).parent()
                        let ID = dom.attr('data-id');
                        console.log(dom, ID);
                        $.each(arr, function(l) {
                                if (arr[l].id == ID) {
                                    arr.remove(arr[l])
                                }
                            })
                            //移出dom节点
                        $('#content').find(dom).remove();
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: arr
                        })
                    })






                }
            })
        })
    })







})