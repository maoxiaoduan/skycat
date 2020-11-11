$(function() {
    $('#shaw span').click(
        function() {
            $(window).attr('location', '../html/index1.html')
        }
    )
    $('#shaw input').click(function() {
        $('#shaw').fadeOut();
    })
    console.log($('.name').val(), $('.id').val(), $('.password').val());
    axios.get(`http://localhost:3000/userId`).then(res => {
        console.log(res.data);
        $('.login').click(function() {
            if (res.data) {
                $.each(res.data, function(i) {
                    if (res.data[i].id == $('.id').val()) {
                        alert('小伙子，你换个账户吧，这个有人用了')
                        return false;
                    }
                })
            }
            axios.post(`http://localhost:3000/userId`, {
                name: $('.name').val(),
                id: $('.id').val(),
                password: $('.password').val()
            })
            alert("注册成功");
            $(window).attr('location', '../html/login.html')

        })
    })

})