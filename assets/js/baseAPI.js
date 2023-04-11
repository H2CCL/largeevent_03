$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://www.liulongbin.top:3007' + options.url;

        options.headers = {
            Authorization: localStorage.getItem('token')
        }
        
        options.complete = function(res) {
            // console.log(res)
            if (res.responseJSON.status !== 0 && res.responseJSON.message !== "获取用户基本信息成功！") {
                // 1.强制清除本地存储
                localStorage.removeItem('token')
                // 2.强制跳转会login.html
                location.href = '/login.html'
            }
        }
    })
})