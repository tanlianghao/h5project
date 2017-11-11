;(function($){
    var $carousel_l = $('.carousel_l')
    var xhr = new XMLHttpRequest();
    var $ul = $('<ul/>');
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 &&(xhr.status ===200 || xhr.status ===304)){
            // var res = xhr.responseText;
            var res = eval("("+xhr.responseText+")");

            //第一次循环实现一级导航
            res.map(function(item){
                var $li = $('<li/>');
                var $h4 = $('<h4/>')
                $h4.html(item.type)
                $h4.appendTo($li)
                var $sec_box = $('<div/>')
                //第二次循环给二级导航加上标题
                item.name.map(function(item){
                    var $third_box = $('<div/>')
                    var $h4 = $('<h4/>')
                    $h4.html(item.type)
                    var $sec_ul = $('<ul/>')
                    //第三次循环给二级导航加上详情信息
                    item.name.map(function(item){
                        var $sec_li = $('<li/>')
                        $sec_li.html(item)
                        $sec_li.appendTo($sec_ul)
                    })
                    $h4.appendTo($third_box)
                    $sec_ul.appendTo($third_box)
                    $third_box.appendTo($sec_box)
                })
                $sec_box.appendTo($li)
                $li.appendTo($ul)
            })
            $ul.appendTo($carousel_l)
        }
    }
    xhr.open('get','../api/commodity.json',true);
    xhr.send()
    //给每个一级菜单的li绑定一个事件
    $carousel_l.on('mouseover','li',function(e){
        var a =$(this).children('div')
        $(a).css({'display':'block','z-index':9999})
        $(this).siblings().css({'background':''})
        $(this).css({'background':'red'})

    })
    $carousel_l.on('mouseout','li',function(){
        var a =$(this).children('div')
        $(a).css({'display':'none'})
        $(this).css({'background':''})
    })
})(jQuery)