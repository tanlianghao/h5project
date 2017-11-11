jQuery(function($){
    //给carousel右边的生产导航
    var $carousel = $('.carousel_r');
    var office = document.querySelector('.office')
    console.log(office)
    var opt ='男科,妇科,糖尿病,心脑血管,肝胆科,神经科,肿瘤消化科,风湿骨科,皮肤性病,眼耳鼻喉,呼吸科,滋补保健,散光验配,医疗器械'.split(',')
    function Office(opt){
        var o_ul = document.createElement('ul')
        o_ul.innerHTML = opt.map(function(item){
            return `<li>
                    <a href="#">${item}</a>
            </li>`
        }).join(' ')
        office.appendChild(o_ul)
    }   
   Office(opt)

   //优质服务的动画效果
   var $fuwu = $('.fuwu');
   var $f_li = $fuwu.find('img');
   console.log($f_li)
   $fuwu.on('mouseover','li',function(){
    //console.log($(this).find('img'))
        $(this).find('img').stop().animate({'top':-10})
   })
   $fuwu.on('mouseout','li',function(){
    //console.log($(this).find('img'))
        $(this).find('img').stop().animate({'top':0},'fast')
   })
})