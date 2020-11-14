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



        // 拿cookie并更改
        // $('header').ready(function() {
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
    // })