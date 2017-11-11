;(function($){
    var $carousel = $('.carousel_c');
    $.fn.carousel = function(opt){
        var defaults = {
            direction:'left',
            url:['../img/carousel1.jpg'],
            auto:true,
            skip:true,
            time:2000,
            enter:true,
            leave:true,
            index:0
        }
        var opt = $.extend({},defaults,opt);
        this.each(function(idx,item){
            var ele = {
                _init(){
                    this.$urlImg = opt.url;
                    this.$ul = $('<ul/>')
                    //创建li并添加图片进去
                    this.$res =$.map(this.$urlImg,function(item){
                        return `<li style='float:left;'>
                            <img src="${item}">
                            </li>`
                    }).join(' ')
                    this.$ul.html(this.$res);
                    //多添加一张图片实现无缝滚动
                    var $li = $('<li/>');
                    var $img = $('<img/>');
                    $img.attr('src',this.$urlImg[0])
                    $li.append($img)
                    this.$ul.append($li)
                    //添加小圆点并实现点击换图的操作
                    this.$dot_ul = $('<ul/>')
                    this.$dot_ul.css({right:20,bottom:$carousel.height()/10})
                    this.$dot_ul.addClass('dot');
                    for(var i=0;i<this.$urlImg.length;i++){
                        var $li = $('<li/>');
                        $li.appendTo(this.$dot_ul)
                    }
                    this.$dot_ul.appendTo($carousel)
                    $(this.$dot_ul.children('li')[opt.index]).addClass('active')
                    //把图片的ul加入到父元素的上面
                    $carousel.append(this.$ul);
                    this.$ul.addClass('caru')
                    this.$img=this.$ul.find('img')
                    this.$len = this.$ul.find('img').length;
                    //图片加载完成的时候获取图片的宽度
                    this.$img[0].onload = function(){
                        this.$imgWidth = this.$img.width()
                        this.$ulWidth = this.$imgWidth*this.$len;
                        this.$ul.css({'width':this.$ulWidth})
                        this.move(this.$imgWidth)
                        this.enter()
                        this.leave(this.$imgWidth)
                    }.bind(this);
                },
                move(ele){
                    var idx = opt.index;//idx=0

                    this.task = function(){
                        idx++;
                        if(idx>this.$len-1){
                            idx=1
                            this.$ul.css({left:-(idx-1)*ele})                            
                        }else if(idx<0){
                            idx=this.$len
                        }
                        this.$ul.animate({'left':-idx*ele},300)
                        var dot_lis = this.$dot_ul.children('li')
                        for(var i=0;i<dot_lis.length;i++){
                            $(dot_lis[i]).removeClass('active')
                            if(dot_lis[idx]){
                                $(dot_lis[idx]).addClass('active')
                            }else{
                                $(dot_lis[0]).addClass('active')
                            }
                        }
                        
                    }.bind(this)
                    this.timer = setInterval(this.task,opt.time)
                },
                enter(){
                    $carousel.on('mouseover',function(){
                        clearInterval(this.timer)
                    }.bind(this))
                },
                leave(ele){
                    $carousel.on('mouseout',function(e){
                        var a = e.target.parentNode
                        var idx = $(a).index()
                        this.timer = setInterval(this.task,opt.time)
                    }.bind(this))
                }
            }
            ele._init()
        })
    }
    $carousel.carousel({
        url:['../img/carousel1.jpg','../img/carousel2.jpg','../img/carousel3.jpg','../img/carousel4.jpg','../img/carousel5.jpg']
    })
})(jQuery);