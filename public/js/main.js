/**
 * Created by huk on 17/2/21.
 */
$(function () {
    $('.send_i').click(function () {
        changeTextInput($(this))
    })
});
/**
 * 点击修改图标文字变输入框
 * @param ele 当前ele
 */
function changeTextInput(ele) {
    var old_value = $(ele).prev().html();
    var type = $(ele).attr('data-type');
    $(ele).css('display','none');
    $(ele).prev().css('display','none');
    $(ele).after('<form action="" style="display: inline-block">' +
        '<input type="text" id="changed_val" value="'+old_value+'">' +
        '<button class="btn btn-sm btn-default change_btn">修改</button></form>');
    $('.change_btn').click(function () {
        sendNewValue(type)
        return false
    });
    function sendNewValue(tip) {
        var send_url = '/users/center/'+tip;
        var data_str = {"value":$('#changed_val').val()};
        var json = JSON.stringify(data_str);
        console.log(json)
        $.ajax({
            url:send_url,
            type:'POST',
            data: json,
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                $(ele).css('display','inline');
                $(ele).prev().css('display','inline-block');
                $(ele).prev().html(data[tip]);
                $(ele).next().remove();
            }
        })
    }
}