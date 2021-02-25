$(function () {
    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    let indexAdd = '';
    //添加按钮点击事件
    $('#btnAddCate').on('click', function () {
        //调用layer.open设置弹出层
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    //确认按钮点击事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('添加分类成功');
                initUserInfo();
                layer.close(indexAdd);
            }
        })
    });
    //编辑按钮点击事件
    let indexEdit = '';
    const form = layui.form;

    $('tbody').on('click', '#btnEdit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        const id = $(this).data('id');
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    });
    //确认修改按钮点击事件
    $('body').on('submit', '#form-edit', function (e) {
        // console.log(11);
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('修改分类成功');
                initUserInfo();
                layer.close(indexEdit);
            }
        })
    });
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initUserInfo();

                    // initArtCateList()
                }
            })
        })
    })
})

