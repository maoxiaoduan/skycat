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
                    <p class="totalprice">总价为:<span class='totalprice'>${res.data.price * arr[i].num}</span></p>
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
                    //减
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
                            totalUpdata();

                        })
                        //加
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
                            totalUpdata();

                        })
                        //输入框改变
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
                            totalUpdata();

                        }

                    )

                    // 删除
                    $('.del').click(function() {
                        let dom = $(this).parent()
                        let ID = dom.attr('data-id');
                        // console.log(dom, ID);

                        function deleteItem(item, list) {
                            // 先遍历list里面的每一个元素，对比item与每个元素的id是否相等，再利用splice的方法删除
                            for (var key in list) {
                                if (list[key].id === item) {
                                    list.splice(key, 1)
                                }
                            }
                        }
                        deleteItem(ID, arr);
                        // console.log(arr);

                        //移出dom节点
                        $('#content').find(dom).remove();
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: arr
                        })
                        totalUpdata();

                        Check();

                        let checkAll = $('.totalcheck');
                        let cks = $('input[type=checkbox]').not(".totalcheck");
                        checkAll.click(function() {
                            cks.prop('checked', checkAll.prop('checked'));
                            totalUpdata();
                        })

                        cks.click(function() {
                            let checknum1 = $('input[type=checkbox]:checked').not(".totalcheck").length;
                            let checknum = cks.length;
                            let flag = false;
                            // console.log(checknum1, checknum);
                            if (checknum == checknum1) {
                                flag = true;
                            }
                            checkAll.prop('checked', flag);
                            totalUpdata();

                        })
                    })

                    //清空购物车
                    $('#clean').click(function() {
                        $('#content').empty().html('购物车为空');
                        // let arr1 = []
                        axios.put(`http://localhost:3000/catData/${user}`, {
                            data: []
                        })
                        Check();
                        totalUpdata();
                    })

                    //全选单选
                    function Check() {
                        let checkAll = $('.totalcheck');
                        let cks = $('input[type=checkbox]').not(".totalcheck");
                        checkAll.click(function() {
                            cks.prop('checked', checkAll.prop('checked'));
                            totalUpdata();
                        })

                        cks.click(function() {
                            let checknum1 = $('input[type=checkbox]:checked').not(".totalcheck").length;
                            let checknum = cks.length;
                            let flag = false;
                            // console.log(checknum1, checknum);
                            if (checknum == checknum1) {
                                flag = true;
                            }
                            checkAll.prop('checked', flag);
                            totalUpdata();

                        })


                        //结算
                        $('#pay').click(function() {
                            let checknum1 = $('input[type=checkbox]:checked').not(".totalcheck").length;
                            if (checknum1 > 0) {
                                alert('卡内余额不足,请充值');
                                return false;
                            }
                            alert('请选择需要付款的商品')
                        })
                    }

                    //总价更新
                    function totalUpdata() {
                        //总价计算
                        let cks = $('input[type=checkbox]').not(".totalcheck");
                        let totalprice = $('span.totalprice');
                        // console.log(totalprice);
                        let num1 = 0;
                        for (let i = 0; i < cks.length; i++) {
                            // console.log(totalprice[i]);
                            if (cks[i].checked) {
                                num1 += +totalprice[i].innerText;
                            }
                        }
                        $('#atotalprice').html(num1);
                    }
                    Check();
                    totalUpdata();
                }
            })
        })
    })
})