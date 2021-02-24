$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        repwd: function (value) {
            const password = $('.reg-box [name = password]').val();
            if (password !== value) {
                return '两次输入不一致';
            };
        }
    });


    //监听注册表单的提交行为
    $('#reg-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('#reg-form [name = username]').val(),
                password: $('#reg-form [name = password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('注册成功');
                $('#link-login').click();
            }
        })
    });

    //监听登陆表单的提交行为
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = './index.html';
            }
        });
    });

})