/**
 * Created by 白色风车 on 2017/7/4.
 */
$(function () {
    $('.comment').click(function (e) {
        var target = $(this);
        var toId = target.data('tid');         //每一条 评论的用户的_id
        var commentId = target.data('cid');     //每一条 评论的 _id
        if($('#toId').length>0){
            $('toId').val(toId);
        }else{
            $('<input>').attr({
                type:'hidden',
                id:'toId',
                name:'comment[tid]',
                value:toId,
            }).appendTo('#commentForm');
        }
        if($('#commentId').length>0){
            $('commentId').val(commentId);
        }else{
            $('<input>').attr({
                type:'hidden',
                id:'commentId',
                name:'comment[cid]',
                value:commentId,
            }).appendTo('#commentForm');
        }
    });
});