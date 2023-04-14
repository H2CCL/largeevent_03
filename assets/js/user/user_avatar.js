$(function() {
    var layer = layui.layer
    // 1.1获取裁剪区的DOM元素
    var $image = $('#image')
    // 1.2配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3创建裁剪区域
    $image.cropper(options)

    // 为上传按钮添加点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    })

    // 为文件绑定change事件
    $('#file').on('change', function(e) {
        // console.log(e)
        var filelist = e.target.files;
        if (filelist.length == 0) {
            return layer.msg('请选择照片！')
        }
        var file = e.target.files[0]
        var imageURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imageURL).cropper(options)
    })

    // 为确定绑定点击事件
    $('#btnUpload').on('click', function() {
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个Canvas画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
        // 调用接口
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('上传头像失败')
                }
                layer.msg('上传头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})