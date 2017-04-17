/**
 * Created by huk on 17/4/15.
 */
$(function () {
    $('.delbtn').click(function (ev) {
        var _id = $(ev.target).parent().parent().attr('data-type');
        var type = $(ev.target).attr('data-url');
        $.ajax({
            url:'/admin/sys-'+type+'/'+_id,
            method:'GET',
            dataType:'json',
            contentType:"application/json",
            success:function (data) {
                if(data.success){
                    $(ev.target).parent().parent().remove();
                }
            }
        })
    })
});
