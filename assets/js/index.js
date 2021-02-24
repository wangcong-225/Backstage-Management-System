$(function () {
    getUserInfo();

    $('#btnlogout').on('click', function () {

        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            console.log('ok');
            localStorage.removeItem('token');
            location.href = './login.html';

            layer.close(index);
        });

    })
});
//获取用户信息函数
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.massage);
            }
            renderAvatar(res.data);
        },
        complete: function (response) {
            console.log(response);
            const { status, message } = response.responseJSON;
            if (status === 1 && message === "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = './login.html'
            }
        }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    const username = user.nickname || user.username;
    $('#welcome').html('欢迎' + username);
    //判断是否存在用户头像
    if (user.user_pic) {
        //存在用户头像则把图片地址给img的src并显示img
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //不存在用户头像则隐藏头像img标签
        $('.layui-nav-img').hide();
        //获取用户名首字母并转为大写
        const firstName = username[0].toUpperCase();
        //将用户名首字母填入字母头像盒子并显示字母头像盒子
        $('.text-avatar').html(firstName).show();
    }
}