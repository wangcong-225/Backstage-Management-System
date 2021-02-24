$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    //判断url地址是否为权限接口
    if (options.url.includes('/my')) {
        //权限地址设置headers请求头
        options.headers = {
            Authorization: localStorage.token || ''
        }
    };



    options.complete = function (response) {
        console.log(response);
        const { status, message } = response.responseJSON;
        if (status === 1 && message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = './login.html'
        }
    }
})
