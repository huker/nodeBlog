/**
 * Created by huk on 17/2/21.
 */
$(function () {

    $('#searchBtn').click(function () {
        var content = $('#s_content').val();
        if(!content && content==''){
            alert('请输入关键词')
        }else{
            window.location.href = '/search/' + content;
        }

        return false
    });

    $('.send_i').click(function () {
        changeTextInput($(this))
    });
    $('#update_btn').click(function () {
        window.location.href = '/articles/update/' + $(this).attr('data-type');
    });
    $('#center_nav_tips').on('click', 'li', function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var tip = $(this).attr('data-type');
        var uid = $('#userId').attr('data-type');
        switch (tip) {
            case 'article':
                $('#tip_title').html('我的文章');
                break;
            case 'ask':
                $('#tip_title').html('我的提问');
                break;
            case 'answer':
                $('#tip_title').html('我的回答');
                break;
            case 'comment':
                $('#tip_title').html('我的评论');
                break;
        }
        center_tip_data(tip, uid);
    })
});
/**
 * 点击修改图标文字变输入框
 * @param ele 当前ele
 */
function center_tip_data(tip, id) {
    $.ajax({
        url: '/users/userCenter/' + tip + '/' + id,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('#tip_list').empty();
            if (data.length > 0) {
                var html = '';
                $.each(data, function (i, ele) {
                    switch (tip) {
                        case 'article':
                            html += '<li class="list-group-item"><a href="/articles/detail/' + ele._id + '">' + ele.title + '</a></li>';
                            break;
                        case 'ask':
                            html += '<li class="list-group-item"><a href="/questions/detail/' + ele._id + '">' + ele.title + '</a></li>';
                            break;
                        case 'answer':
                            break;
                        case 'comment':
                            break;
                    }
                });
                $('#tip_list').append(html);
            }

        },
        error: function () {
            $('#tip_list').html('无');
        }
    })
}
function changeTextInput(ele) {
    var old_value = $(ele).prev().html();
    var type = $(ele).attr('data-type');
    $(ele).css('display', 'none');
    $(ele).prev().css('display', 'none');
    $(ele).after('<form action="" style="display: inline-block">' +
        '<input type="text" id="changed_val" value="' + old_value + '">' +
        '<button class="btn btn-sm btn-default change_btn">修改</button></form>');
    $('.change_btn').click(function () {
        sendNewValue(type);
        return false
    });
    function sendNewValue(tip) {
        var send_url = '/users/center/' + tip;
        var data_str = {"value": $('#changed_val').val()};
        var json = JSON.stringify(data_str);
        console.log(json)
        $.ajax({
            url: send_url,
            type: 'POST',
            data: json,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $(ele).css('display', 'inline');
                $(ele).prev().css('display', 'inline-block');
                $(ele).prev().html(data[tip]);
                $(ele).next().remove();
            }
        })
    }
}