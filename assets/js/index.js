$(function() {
    getUserInfo();
    
})


// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)

        },
        // // 控制用户的访问权限
        // complete: function(res) {
        //     // console.log(res)
        //     if (res.responseJSON.status !== 0 && res.responseJSON.message !== "获取用户基本信息成功！") {
        //         // 1.强制清除本地存储
        //         localStorage.removeItem('token')
        //         // 2.强制跳转会login.html
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户的名字
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    //3. 按需渲染头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}

var layer = layui.layer;
// 实现退出功能
$('#btnLogout').on('click', function() {
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 1.清除本地存储
        localStorage.removeItem('token')
        // 2.页面跳转到登录页
        location.href = '/login.html'

        layer.close(index);
      });
})

