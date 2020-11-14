$(function() {
    // console.log($('.name').val(), $('.password').val());
    axios.get(`http://localhost:3000/userId`).then(res => {
        console.log(res.data);
        $('.con-login').click(function() {
            // $.each(res.data, function(i) {
            for (let i in res.data) {
                console.log(typeof($('.name').val()), $('.password').val());
                if ($('.name').val() == res.data[i].id) {
                    if ($('.password').val() == res.data[i].password) {
                        alert('登陆成功');
                        $.cookie("user", JSON.stringify({ id: res.data[i].id, name: res.data[i].name }), { expires: 7, path: '/' });
                        $(window).attr('location', '../html/index1.html')
                        return false;
                    } else {
                        alert('密码错误，请重试');
                        // return false;
                    }
                }
            }
            // })
        })
    })
})