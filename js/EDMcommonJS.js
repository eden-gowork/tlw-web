/*
** check ios webview
*/
var isIOSwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);


/*
** 在這個區塊裡邊提供時間參數，以方便作時間判斷
*/
var getServerFullTime; //得到完整時間 ex: 20210928000000 --> 西元年月日時分秒 --> 2021年09月28號00時00分00秒 
if (typeof nowServerDay !== 'undefined')
{
    getServerFullTime = parseInt(nowServerFullTime).toString();
}
else
{
    //本機測試可以從這邊修改時間
    getServerFullTime = 20210831000000;
}
//console.log('getServerFullTime', getServerFullTime)

var localDate = new Date();
var localDate_Date = localDate.getDate(); //得到日期
if(localDate_Date.length < 2)
{
    localDate_Date = '0' + localDate_Date;
}
var localDate_Hour = localDate.getHours();  //得到小時 (24小時制)
if(localDate_Hour.length < 2)
{
    localDate_Hour = '0' + localDate_Hour;
}
var localDate_Minutes = localDate.getMinutes();  //得到小時 (24小時制)
if(localDate_Minutes.length < 2)
{
    localDate_Minutes = '0' + localDate_Minutes;
}
var localDate_Seconds = localDate.getSeconds();  //得到小時 (24小時制)
if(localDate_Seconds.length < 2)
{
    localDate_Seconds = '0' + localDate_Seconds;
}
var localDate_Day = localDate.getDay(); //得到星期幾
    //localDate_Day = 0 --> 星期天
    //localDate_Day = 1 --> 星期一
    //localDate_Day = 2 --> 星期二
    //localDate_Day = 3 --> 星期三
    //localDate_Day = 4 --> 星期四
    //localDate_Day = 5 --> 星期五
    //localDate_Day = 6 --> 星期六
var localMilliseconds = localDate.getMilliseconds();

var localHashTime = localDate_Date + '' + localDate_Hour + '' + localDate_Day + '' + localDate_Hour + ''+ localDate_Minutes + '' + localMilliseconds;

//console.log('localDate', localDate);
//console.log('localDate_Date', localDate_Date);
//console.log('localDate_Hour', localDate_Hour);
//console.log('localDate_Day', localDate_Day);
//console.log('localMilliseconds', localMilliseconds);
//console.log('localMilliseconds', localDate_Date + '' + localDate_Hour + '' + localDate_Day + '' + localDate_Hour + ''+ localDate_Minutes + '' + localMilliseconds);

/*======================================================================================================================*/

/**
 * 暫時暫駐於此，偵測在 APP裡邊時，要將 target="_blank" 拿掉
*/
function isWebview() {
	var useragent = navigator.userAgent;
	var regex = '/(WebView|(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*(wv|.0.0.0))/gi';
	return Boolean(useragent.match(regex));
}

var isAPP = (isWebview())? true: false;



var inAppRemoveTargetBlank = function()
{
    if(isAPP)
    {
        const edmsp_MKSale = document.querySelector('#edmsp_MKSale');
        const edmsp_MKSale_2 = document.querySelector('#edmsp_MKSale_2');
    
        if(edmsp_MKSale)
        {
            edmsp_MKSale_links = edmsp_MKSale.querySelectorAll('a');
            if(edmsp_MKSale_links.length > 0)
            {
                for(var i=0, j=edmsp_MKSale_links.length; i<j; i++)
                {
                    if(edmsp_MKSale_links[i].getAttribute('target'))
                    {
                        edmsp_MKSale_links[i].setAttribute('target', '_self');
                    }
                }
            }
        }
    
    
        if(edmsp_MKSale_2)
        {
            edmsp_MKSale_2_links = edmsp_MKSale_2.querySelectorAll('a');
            if(edmsp_MKSale_2_links.length > 0)
            {
                for(var i=0, j=edmsp_MKSale_2_links.length; i<j; i++)
                {
                    if(edmsp_MKSale_2_links[i].getAttribute('target'))
                    {
                        edmsp_MKSale_2_links[i].setAttribute('target', '_self');
                    }
                }
            }
        }

        var aElements = document.getElementsByTagName("a");

        for (var i = 0, length = aElements.length; i < length; i++)
        {
            var aHref = aElements[i].getAttribute('href');
            // console.log('href', aHref);
            if (aHref && aHref.indexOf('trplus') >= 0 && aHref.indexOf('javascript') == -1)
            {
                if (i == 0)
                {
                    console.info('binding href click event.')
                }

                aElements[i].removeAttribute('target');

                aElements[i].addEventListener("click", function(e) {
                    var innerHref = this.getAttribute('href');
                    console.log('postMessageToParent', innerHref);
                    var urlObj = { type: 'URL', value: innerHref };
                    LoyaltyApp.postMessageToParent(urlObj);
                    e.preventDefault();
                });
            }
        }
    }
}



/*
** 【PC版右側黏人精】-控制程式
*/
var edmsp_pcRightSticky_controlFunction = function()
{
    const edmsp_pcRightSticky = document.querySelector('#edmsp_pcRightSticky');
    edmsp_pcRightSticky.addEventListener('click', function(){
        if (edmsp_pcRightSticky.classList.contains('edmsp_pcRightSticky_menu_hide'))
        {
            edmsp_pcRightSticky.classList.remove('edmsp_pcRightSticky_menu_hide');
        }
        else
        {
            edmsp_pcRightSticky.classList.add('edmsp_pcRightSticky_menu_hide');
        }
    },false)

    setTimeout(function() {
        edmsp_pcRightSticky.classList.add('edmsp_pcRightSticky_menu_hide');
    }, 1500)

}

/*======================================================================================================================*/

/*
** 【mobile版底部黏人精】-控制程式
*/
var edmsp_mobileBottomSticky_controlFunction = function()
{

    const edmsp_mobileBottomSticky = document.getElementById('edmsp_mobileBottomSticky');

    const edmsp_mobileBottomSticky_three_li = document.querySelectorAll('.edmsp_mobileBottomSticky_three li');

    if(edmsp_mobileBottomSticky_three_li.length > 0)
    {
        edmsp_mobileBottomSticky_three_li[0].classList.add('cate-hover');

        const edmsp_mobileBottomSticky_float = document.querySelectorAll('.edmsp_mobileBottomSticky_float');
    
    
        edmsp_mobileBottomSticky_three_li.forEach(item => {
    
            item.addEventListener('click', event => {
    
                let hasClass_catehover = false;
                let hasFloat = false;
                let attr_float_value = '.' + item.getAttribute('float');
    
    
                if(item.classList.contains('cate-hover'))
                {
                    hasClass_catehover = true;
                }
                if(item.classList.contains('hasfloat'))
                {
                    hasFloat = true;
                }
    
                //控制three li
                edmsp_mobileBottomSticky_three_li.forEach(li => {
                    li.classList.remove('cate-hover');
                })
    
                if(hasClass_catehover)
                {
                    edmsp_mobileBottomSticky_three_li[0].classList.add('cate-hover');
                    hasFloat = false;
                }
                else
                {
                    item.classList.add('cate-hover');
                }
    
                //控制three li
                if(hasFloat)
                {
                    edmsp_mobileBottomSticky_float.forEach(float => {
                        float.classList.remove('cate-open');
                    })
                    document.querySelector(attr_float_value).classList.add('cate-open');
                    edmsp_mobileBottomSticky.classList.add('cate-open');
                }
                else
                {
                    edmsp_mobileBottomSticky.classList.remove('cate-open');
                }
            })
    
        },false)
    
    
        const edmsp_mobileBottomSticky_three_bg = document.querySelector('.edmsp_mobileBottomSticky_three_bg');
        edmsp_mobileBottomSticky_three_bg.addEventListener('click',function(){
    
            edmsp_mobileBottomSticky_three_li.forEach(li => {
                li.classList.remove('cate-hover');
            })
    
            edmsp_mobileBottomSticky_float.forEach(float => {
                float.classList.remove('cate-open');
            })
            edmsp_mobileBottomSticky.classList.remove('cate-open');
    
        },false)
    }

}

/*======================================================================================================================*/

/*
** 【中間選單】-控制程式
*/
var edmsp_nav = function()
{

    let edmsp_nav = document.getElementById('edmsp_nav');

    if(!edmsp_nav)
    {
        return false;
    }

    const edmsp_nav_link = document.querySelectorAll('.edmsp_nav_link');

    //處理在桌機板 & 中間選單大於7顆時，要能夠輪播
    if (window.screen.width > 991)
    {
        if(edmsp_nav_link.length > 7)
        {
            //console.log('選單大於7顆')

            const edmsp_nav_ul = document.querySelector('#edmsp_nav ul');
            edmsp_nav_ul.classList.add('owl-carousel', 'owl-carousel-edmNav');

            edmsp_nav_link.forEach(item => {
                item.classList.add('item');
            });

            $('.owl-carousel-edmNav').owlCarousel({
                loop: false,
                margin: 10,
                nav: true,
                dots: false,
                items: 7,
                slideBy: 1,
                URLhashListener:true,
                autoplayHoverPause:true,
                startPosition: 'URLHash',
            });
        }
    }

    //
    
    let edmsp_nav_offsetTop = document.getElementById('edmsp_nav').offsetTop;
    var isNoHeaderFooter = 'false';
    if (typeof isHeaderFooterHide !== 'undefined')
    {
        isNoHeaderFooter = isHeaderFooterHide;
    }

    window.addEventListener('scroll', function(e) {

        let distanceY = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;

        if (window.screen.width <= 991)
        {
            distanceY = distanceY - 51;
        }

        ////console.log('distanceY', distanceY)

        if (distanceY >= edmsp_nav_offsetTop)
        {
            if(isNoHeaderFooter == 'true')
            {
                edmsp_nav.style.top = '0px';
            }
            else
            {
                edmsp_nav.style.top = '50px';
            }
            
            edmsp_nav.style.position = 'fixed';
        }
        else
        {
            edmsp_nav.style.top = '0';
            edmsp_nav.style.position = 'inherit';
        }

    });


}
edmsp_nav();

/*======================================================================================================================*/

/*
** 區塊【data-ts="{'start': '2021/9/4 00:00:00', 'end': '2021/9/9 23:59:59'}"】時間開關控制
*/
function StrFy(val){
    var StrFy = JSON.stringify(val);
    StrFy = StrFy.replace(/(["])/g,"").replace(/(['])/g,'\"'); 
    return JSON.parse(StrFy)
};

function compareTimeShowHide()
{
    const selector_ts = document.querySelectorAll('[data-ts]');
    const ts_now = new Date();
    selector_ts.forEach(function(item, index){

        ////console.log('item.dataset.ts', item.dataset.ts)
        let attr_done = item.getAttribute('done');

        if(!attr_done)
        {
            let StrFy_ts = StrFy(item.dataset.ts)
            let ts_start = new Date(StrFy_ts.start);
            let ts_end = new Date(StrFy_ts.end);

            ////console.log('ts_start', ts_start)
            ////console.log('ts_end', ts_end)

            if(ts_now >= ts_start  &&  ts_now < ts_end)
            {
                item.style.display = 'block';
            }
            else
            {
                //item.style.display = 'none';
                item.remove();
            }

            item.setAttribute('done', 'true')
        }

    });

    inAppRemoveTargetBlank();
}

//比較時間，開關dom element
compareTimeShowHide();

/*======================================================================================================================*/

/*
** 區塊【活動辦法】-控制程式
*/
function controlFooterHeight()
{
    const footer_txt  = document.querySelector('.footer_txt');
    const footer_seeMoreBtn = document.querySelector('.opennotes');

    if(!footer_txt)
    {
        return false;
    }

    if(!footer_seeMoreBtn)
    {
        return false;
    }

    footer_seeMoreBtn.addEventListener('click', event => {

        event.stopPropagation();
        event.preventDefault();

        if(footer_txt.classList.contains('open'))
        {
            footer_txt.classList.remove('open');
            footer_txt.style.height = '262px';
            footer_txt.style.overflowY = 'hidden';
            footer_seeMoreBtn.innerText = '查看更多活動辦法';
        }
        else
        {
            footer_txt.classList.add('open');
            footer_txt.style.height = 'auto';
            footer_seeMoreBtn.innerText = '收合活動辦法';
        }

    })


    /* 
    ** 偷塞ajax  edmsp_block_carousel_commonBanner
    */
    const has_edmsp_block_carousel_commonBanner = document.querySelector('.edmsp_block_carousel_commonBanner');
    if (has_edmsp_block_carousel_commonBanner) {
        var swiper = new Swiper(".edmsp_block_carousel_commonBanner", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }


    //inAppRemoveTargetBlank();
}
controlFooterHeight();

/*======================================================================================================================*/

/*
** 更新商品最新價格
*/
var Sys_FormatNumber = function(strNumber) {
    var i;
    if (typeof(strNumber) == "number") {
        strNumber = Math.ceil(strNumber);
        strNumber = strNumber.toString();
    } else {
        strNumber = Number(strNumber);
        strNumber = Math.ceil(strNumber);
        strNumber = strNumber.toString();
    }
    for (i = strNumber.length - 3; i > 0; i -= 3) {
        strNumber = strNumber.substring(0, i) + "," + strNumber.substring(i);
    }
    return strNumber;
}

setTimeout(function() {
    if (location.href.indexOf('wwwcakeresumecom2') != -1) {
        return false;
    }
    $(document).ready(function() {
        var getAllSPSingleProdSKU_ary = [];
        var splitResult_ary = [];
        $('.iamSPSingleProdSKU').each(function(idx) {
            getAllSPSingleProdSKU_ary[getAllSPSingleProdSKU_ary.length] = $.trim($(this).attr('hereIsSPSingleProdSKU'));
        });
        for (var i = 0; i < getAllSPSingleProdSKU_ary.length; i += 10) {
            splitResult_ary.push(getAllSPSingleProdSKU_ary.slice(i, i + 10));
        }
        //console.log(JSON.stringify(splitResult_ary));
        for (var m = 0, n = splitResult_ary.length; m < n; m++) {
            $.ajax({
                url: 'https://www.trplus.com.tw/rest/v2/trplus/productList',
                type: 'POST',
                data: {
                    'skus': splitResult_ary[m].join(',')
                },
                success: function(json) {
                    for (var i = 0, j = json.data.length; i < j; i++) {
                        $('.iamSPSingleProdSKU').each(function(idx) {
                            if ($(this).attr('hereIsSPSingleProdSKU') == json.data[i].sku)
                            {

                                if($(this).attr('hereIsSPSingleProdSKU') != '016263748')
                                {
                                    var thisClass = $.trim($(this).find('.SP-singleProd-GDPRC').attr('showwhatPRICE'));
                                    switch (thisClass) {
                                        case 'ineedtoshow_saleprice':
                                            if (json.data[i].promoPrice) {
                                                $(this).find('.SP-singleProd-GDPRC').text('$' + Sys_FormatNumber(json.data[i].promoPrice));
                                            } else {
                                                $(this).find('.SP-singleProd-GDPRC').text('$' + Sys_FormatNumber(json.data[i].salePrice));
                                            }
                                            break;
                                        case 'ineedtoshow_promoprice':
                                            if (json.data[i].promoPrice) {
                                                $(this).find('.SP-singleProd-GDPRC').text('$' + Sys_FormatNumber(json.data[i].promoPrice));
                                            } else {
                                                $(this).find('.SP-singleProd-GDPRC').text('$' + Sys_FormatNumber(json.data[i].salePrice));
                                            }
                                            break;
                                        case 'promoPrice':
                                            if (json.data[i].promoPrice) {
                                                $(this).find('.SP-singleProd-GDPRC').text('$' + Sys_FormatNumber(json.data[i].promoPrice));
                                            } else {
                                                $(this).find('.SP-singleProd-GDPRC').text('$' + Sys_FormatNumber(json.data[i].salePrice));
                                            }
                                            break;
                                        case 'noshowPrice':
                                            break;
                                    }
                                }
                            }
                        });
                    }
                },
                error: function(e) {}
            });
        }
    });
}, 50);

/*======================================================================================================================*/

/*
** MENU茅點
*/
const edmsp_nav_anchorLinks = document.querySelectorAll(".edmsp_nav_link");
const headContent_search_height = (document.querySelector('.headContent_search'))? document.querySelector('.headContent_search').offsetHeight : 0;
const edmsp_nav_height = (document.querySelector('#edmsp_nav'))? document.querySelector('#edmsp_nav').offsetHeight : 0;

for (const link of edmsp_nav_anchorLinks) {
    link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop-100;

    for (const link of edmsp_nav_anchorLinks) {
        link.classList.remove('on');
    }

    this.classList.add("on");

    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}


if(location.href.indexOf('#') != -1)
{
    const anchor = location.href.split('#')[1];

    if(anchor && anchor != '')
    {
        const anchorOffsetTop = document.querySelector('#' + anchor).offsetTop-200;

        const AAA = anchorOffsetTop;
        const BBB = anchorOffsetTop - headContent_search_height;
        const CCC = anchorOffsetTop - headContent_search_height - edmsp_nav_height - 10;
        
        window.scrollTo({
            top: anchorOffsetTop,
            behavior: "smooth"
        });
    }
}


/*======================================================================================================================*/

function throttle(fn, interval = 500) {
    let timer = null;
    return function(...args) {
        if (!timer)
        {
            timer = setTimeout(() => {
                timer = null
                fn.call(this, ...args)
            }, interval);
        }
    }
}

class AutoHighLightAnchor {
    // anchors;
    // ScrollContrainer;
    // throttleFn;
    // strategy;
    constructor(anchorsContainer, ScrollContrainer, strategy = 'type3') {
        this.anchors = anchorsContainer.querySelectorAll('a');
        this.anchors.forEach(element => {
            //console.log(element.hash.slice(1))
        });

        this.ScrollContrainer = ScrollContrainer;
        this.strategy = strategy;
        this.init()
    }

    init(strategy = this.strategy) {

        //console.log('this.throttleFn', this.throttleFn)

        if (this.throttleFn)
        {
            this.remove()
        }
        this.throttleFn = throttle(this[strategy].bind(this), 100)
        this.throttleFn() // 初始执行一次更新位置

        window.addEventListener('scroll', this.throttleFn, {
            passive: true
        });
    }
    remove() {
        window.addEventListener('scroll', this.throttleFn, {
            passive: true
        })
    }

    highLightAnchor(id) {

        const windowWidth = window.innerWidth;
        const {width} = document.querySelectorAll('.edmsp_nav_link')[0].getBoundingClientRect()

        this.anchors.forEach(element => {
            element.classList.remove('highLight');

            if (element.hash.slice(1) == id)
            {
                if(windowWidth < 992)
                {

                    //console.log('getBoundingClientRect left', left);
                    //console.log('getBoundingClientRect width', width);
                    //console.log('getBoundingClientRect x', x);

                    const center = ( windowWidth - width )*0.75;

                    document.querySelector('#edmsp_nav .container').scroll({
                        left: (element.offsetLeft-center),
                        behavior: 'smooth'
                    })

                    element.classList.add('highLight');
                }
            }

            

        });
    }

    type3(e) {
        let highligthId = '';
        let maxRatio = 0;
        let anchors_width = 0;


        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth

        //console.log('windowHeight', windowHeight)
        //console.log('windowWidth', windowWidth)

        this.anchors.forEach(element => {




            const id = element.hash.slice(1)
            const target = document.getElementById(id)

            //console.log('target', target)

            if (target)
            {
                let visibleRatio = -1;
                let {
                    top,
                    height,
                    bottom
                } = target.getBoundingClientRect();


                //console.log('target - top', top)
                //console.log('target - height', height)
                //console.log('target - bottom', bottom)


                // 当元素全部可见时
                if (top >= 0 && bottom <= windowHeight)
                {
                    visibleRatio = 1;
                    highligthId = '';
                }
                // 当元素就头部可见时
                if (top >= 0 && top < windowHeight && bottom > windowHeight)
                {
                    visibleRatio = (windowHeight - top) / height;
                    highligthId = '';
                }
                // 当元素占满屏幕时
                if (top < 0 && bottom > windowHeight)
                {
                    visibleRatio = windowHeight / height
                    highligthId = '';
                }
                // 当元素尾部可见时
                if (top < 0 && bottom > 0 && bottom < windowHeight)
                {
                    visibleRatio = bottom / height
                    highligthId = '';
                }

                //console.log('visibleRatio', visibleRatio)

                if (visibleRatio >= maxRatio)
                {
                    maxRatio = visibleRatio;
                    highligthId = id;
                }

            }
        });

        //console.log('highligthId', highligthId)


        if (highligthId != '')
        {
            this.highLightAnchor(highligthId);
            //window.location.hash = highligthId; 
        }
    }

}
AutoHighLightAnchor.Strategys = {
    type1: 'type1',
    type2: 'type2',
    type3: 'type3',
    type4: 'type4'
}


//console.log('commonAjaxURL', commonAjaxURL)
//const goHighLight = new AutoHighLightAnchor(document.querySelector('#edmsp_nav ul'), document.querySelector('#spiderHTMLContent'), AutoHighLightAnchor.Strategys.type3)
