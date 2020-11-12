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
        $('#content').empty().html('请先登录');
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

                        function deleteItem(item, list) {
                            // 先遍历list里面的每一个元素，对比item与每个元素的id是否相等，再利用splice的方法删除
                            for (var key in list) {
                                if (list[key].id === item) {
                                    list.splice(key, 1)
                                }
                            }
                        }
                        // 例子，我想删除数组中id为2的元素
                        deleteItem(ID, arr);
                        console.log(arr);

                        //移出dom节点
                        $('#content').find(dom).remove();
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: arr
                        })
                        Check();
                    })


                    //清空购物车
                    $('#clean').click(function() {
                        $('#content').empty().html('购物车为空');
                        // let arr1 = []
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: []
                        })
                        Check();
                    })

                    //全选单选
                    function Check() {
                        let checkAll = $('.totalcheck');
                        let cks = $('input[type=checkbox]').not(".totalcheck");
                        checkAll.click(function() {
                            let flag = checkAll.prop('checked');
                            cks.prop('checked', flag);
                            let num1 = 0;
                            if (cks.prop('checked') == true) {
                                $.each(cks, function(j) {
                                    console.log($(this).siblings().find('.totalprice').find('span').html());
                                    num1 += +$(this).siblings().find('.totalprice').find('span').html();
                                })
                                $('#atotalprice').html(num1);
                            }
                            if (cks.prop('checked') == false) {
                                $('#atotalprice').html(0);
                            }
                        })
                        let checknum1 = $('input[type=checkbox]:checked').not(".totalcheck").length;
                        let checknum = cks.length;
                        let flag = false;
                        if (checknum == checknum1) {
                            flag = true;
                        }
                        checkAll.prop('checked', flag);
                        console.log(checknum1);
                        let num = 0;
                        cks.click(function() {
                            let price1 = $(this).siblings().find('.totalprice').find('span').html();
                            console.log(price1);
                            if ($(this).prop('checked') == true) {
                                num += +price1;
                            }
                            if ($(this).prop('checked') == false) {
                                num -= +price1;
                            }
                            $('#atotalprice').html(num);
                            checknum1 = $('input[type=checkbox]:checked').not(".totalcheck").length;
                            let flag = false;
                            if (checknum == checknum1) {
                                flag = true;
                            }
                            checkAll.prop('checked', flag);
                        })

                        $('#pay').click(function() {
                            alert('付款成功' + $('#atotalprice').html())

                            $('#content').empty().html('购物车为空');
                            $('#atotalprice').html(0)
                                // let arr1 = []
                            axios.put(`http://localhost:3000/catData/${user}`, {
                                data: []
                            })
                        })
                    }


                    Check();


                }
            })
        })
    })







})