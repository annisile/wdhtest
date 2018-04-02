function warming(str){
	//alert(6);
	var str = '<div class="glWarmingWrap"><div class="glWarmingPosition"></div><div class="glWarmingTxt">'+str+'</div></div>';
	$('.glWarmingWrap').remove();
	$('body').append(str);
	setTimeout(removefun,1500)
	function removefun(){
		$('.glWarmingWrap').animate({'top':'-50px','opacity':'0'},300,function(){
			$(this).remove();
		})
	}
}

function delQueStr(url, ref) {
    var str = "";
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    }
    else {
        return url;
    }
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    }
    else {
        arr = str.split('=');
        if (arr[0] == ref) {
            return url.substr(0, url.indexOf('?'));
        }
        else {
            return url;
        }
    }
}
function changeURLArg(url,arg,arg_val){ 
    var pattern=arg+'=([^&]*)'; 
    var replaceText=arg+'='+arg_val; 
    if(url.match(pattern)){ 
        var tmp='/('+ arg+'=)([^&]*)/gi'; 
        tmp=url.replace(eval(tmp),replaceText); 
        return tmp; 
    }else{ 
        if(url.match('[\?]')){ 
            return url+'&'+replaceText; 
        }else{ 
            return url+'?'+replaceText; 
        } 
   } 
    return url+'\n'+arg+'\n'+arg_val; 
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function Ajax(fun,url,data,type) {
    $.ajax({
        url: url,
        type: type,
        //async: false,
        data: data,
        //dataType: "json",
        beforeSend: function () { //发送请求前 
        	var loading = '<div class="zf-loading"><i class="am-icon-spinner am-icon-pulse"></i></div>';
        	//var blackdiv = '<div class="blackdiv">'+loading+'</div>';
        	//$('.blackdiv').append(loading);
        	$('body').append(loading);
        },
        complete: function () { //发送请求完成后
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("error!" + errorThrown);
            //alert("请求错误，请重试！");
        },
        success: function(data){
        	$('.zf-loading').remove();
        	fun(data);
        }
    });
}
///alert(888);
function uuid(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}

function preview(file,obj){
	 if (file.files && file.files[0])
	 {
	 var reader = new FileReader();
	 reader.onload = function(evt){
	 obj.html('<img src="' + evt.target.result + '" />');
	}  
	 reader.readAsDataURL(file.files[0]);

	}
	if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE 
	 		//alert(file);
	        var url1 = getFileUrl(file);
	        //alert(url1);
	        obj.html('<img src='+url1+' />');
	   } 
	 /*else  
	 {
	 obj.html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>');
	 }
	 //alert(file.value);*/
	 }
/**
 * [isMobile 判断平台]
 * @param test: 0:iPhone    1:Android
 */
function ismobile(test){
    var u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
     if(window.location.href.indexOf("?mobile")<0){
      try{
       if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
        return '0';
       }else{
        return '1';
       }
      }catch(e){}
     }
    }else if( u.indexOf('iPad') > -1){
        return '0';
    }else{
        return '1';
    }
};
//----------------------------------------------------------------------------------------------------------------------------------------------
function elt(name,obj,top){
	//alert('doubi');
		var con = '';
		var zz = '<div class="zz">'+'</div>';
		con = '';		
		con += '<div class="elt" style="top:'+top+'px">'+'<div class="oneTileName">'+'<label>'+name+'</label>';
		con += '<input type="text" />'+'</div>';
		con += '<a class="oneshut">'+'&times'+'</a>'
		con += '<a class="oneTitleSure">'+'确定'+'</a>';
		con += '</div>';
		obj.find('.elt').remove();
		obj.append(con);
		$('.zz').remove();
		obj.append(zz);
		$('.oneshut').click(function(e){
			e = e||window.event;
			e.stopPropagation();
			$('.zz').remove();
			obj.find('.elt').remove();
		});		
};
function eltString(strings,obj,width,height,boolen){		
		if(!width){width = 400;}
		if(!height){height = 200;}
		$("body,html").css({"overflow-y":"hidden"});
		var sctolltop = $('body').scrollTop()||$(document).scrollTop();
		var top = sctolltop+$(window).height()/2-height/2;
		var mleft = -(width/2); 
		var bwidth = width-2;		
		//alert(top);
		var con = '';
		var zz = '<div class="zz" style="margin-top:'+sctolltop+'px;background:url(images/bjbjbj.png)">'+'</div>';
		con = '';		
		con += '<div class="elt" style="width:'+width+'px;height:'+height+'px;top:'+top+'px;margin-left:'+mleft+'px;">';
		con += '<div style="width:100%;height:100%;position:relative;margin:0;padding:0;">';
		con += '<div class="oneTileName" style="height:auto;">';		
		con += '<div style="line-height:28px;display:block;">'+strings+'</div>'+'</div>';
		con += '<a class="oneshut">'+'&times'+'</a>';
		con += '<div class="sureBox" style="width:'+bwidth+'px;height:80px;background:#68d841;text-align:center;position:absolute;bottom:0;">';
		con += '<a class="oneTitleSure" style="cursor:pointer;width:90px;margin:0 auto;margin-left:0;margin-top:30px;border-radius:20px;">'+'确定'+'</a>';
		con += '</div>';
		con += '</div>'+'</div>';		
		obj.find('.elt').remove();
		obj.append(con);
		$('.zz').remove();
		obj.append(zz);
		$('.oneshut').click(function(){
			$("body,html").css({"overflow-y":"auto"});
			$('.zz').remove();
			obj.find('.elt').remove();
		});
		$('.oneTitleSure').click(function(){
			if(boolen){
				//$('#wuliuForm1').submit();
			$("body,html").css({"overflow-y":"auto"});
			$('.zz').remove();
			obj.find('.elt').remove();
			}			
		});		
	}
//拖拽
function getScrollOffsets(w){
				w = w || window;
				//除了ie8以下都能用
				if(w.pageXOffset != null) return {x:w.pageXOffset, y:w.pageYOffset};
				//对标准模式下的ie
				var d =w.document;
				if(document.compatMode == "CSS1Compat")
				return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
				//对怪异模式下的浏览器
				return {x:d.body.scrollLeft, y:d.body.scrollTop};
			}
			
			function drag(elementToDrag,event){
				var scroll = getScrollOffsets();
				var startX = event.clientX+scroll.x;
				var startY = event.clientY+scroll.y;
				
				var origX = elementToDrag.offsetLeft;
				var origY = elementToDrag.offsetTop;
				
				var deltaX = startX - origX;
				var deltaY = startY - origY;
				/*console.log("startX:"+startX+"");
				console.log("startY:"+startY+"");
				console.log("origX:"+origX+"");
				console.log("origY:"+origY+"");*/
					
			
			
			//监听事件
			if(document.addEventListener){
				document.addEventListener("mousemove",moveHandler,true);
				document.addEventListener("mouseup",upHandler,true);
			}else if(document.attachEvent){
				elementToDrag.setCapture();
				elementToDrag.attachEvent("onmousemove",moveHandler);
				elementToDrag.attachEvent("onmouseup",upHandler);
				elementToDrag.attachEvent("onlosecaptrue",upHandler);
			}
			
			if(event.stopPropagation) event.stopPropagation();
			else event.cancelBubble = true;
			
			if(event.preventDefault) event.preventDefault();
			else event.returnValue =false;
			
			function moveHandler(e){
				if(!e) e= window.event;
				
				var scroll = getScrollOffsets();
				elementToDrag.style.left = (e.clientX+scroll.x - deltaX)+"px";
				elementToDrag.style.top = (e.clientY+scroll.x - deltaY)+"px";
				
				if(e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
	
			}
			
			function upHandler(e){
				if(!e) e= window.event;
				
				if(document.removeEventListener){
					document.removeEventListener("mouseup",upHandler,true);
					document.removeEventListener("mousemove",moveHandler,true);	
				}else if(document.detachEvent){
					elementToDrag.detachEvent("onlosecaptrue",upHandler);
					elementToDrag.detachEvent("onmouseup",upHandler);
					elementToDrag.detachEvent("onmousemove",moveHandler);
					elementToDrag.releaseCapture();
				
				}
				if(e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
			}
			}
//拖拽结束
var bool=false;
var timer ='';
$('.elt').undelegate().delegate('mousedown.my',function (e){
		e = e||window.event;
		e.stopPropagation();
		var nowwidth = $(window).width()||$(document).width();
		var thisheight = $(this).height();
		var thiswidth = $(this).width();
		var scrollheight =$(document).scrollTop()||$(window).scrollTop();
		var nowheight = $(window).height()||$(document).height();
		var relheight = scrollheight+nowheight-thisheight/2-30;
		var relwidth = nowwidth-thiswidth/2-10;
		bool = true;
		$(this).css('cursor','move');
		$('.elt').mousemove(function(e){
			e.stopPropagation();
		if(bool){
			var ex = e.pageX;
			var ey = e.pageY;
			if(ex<0+thiswidth/2+10){ex=thiswidth/2+10};
			if(ex>relwidth){ex=relwidth};
			if(ey<scrollheight+thisheight/2){ey=scrollheight+thisheight/2};
			if(ey>relheight){ey=relheight};
			$('.elt').css({'left':ex+'px','top':ey-100+'px'});
		}
		})	
	});

$('.elt').undelegate().delegate('mouseup.you',function (e){
	bool = false;
	$(this).css('cursor','default');
});

$(document).mousemove(function(){
	bool = false;
	return false;	
});

function Altbox(str,width,height){
	var nwidth = width;
	var nheight = height;
	//alert(nwidth);
	if(nwidth == undefined){
		//alert(56);
		nwidth = '500';
	}
	if(nheight == undefined){
		//alert(56);
		nheight = '320';
	}
	$('.jsstrBox').css({'width':nwidth+'px','height':nheight+'px'}).show();
	$('.jszz').show();
	this.close = function(){
		$('.jsstrBox .jsclose').click(function(){
			//alert(667);
			$('.jsstrBox').hide();
			$('.jszz').hide();
		})
	};
	
	this.tuo = function(){
		var left, top, $this;
		$(document).undelegate().delegate('.jsstrBox .tuo', 'mousedown', function (e) {
		    left = e.clientX, top = e.clientY, $this = $(this).css('cursor', 'move');
		    this.setCapture ? (
		    this.setCapture(),
		    this.onmousemove = function (ev) { mouseMove(ev || event); },
		    this.onmouseup = mouseUp
		    ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
		});
		function mouseMove(e) {
		    var target = $this.parents('.jsstrBox');
		    var l = Math.max((e.clientX - left + Number(target.css('margin-left').replace(/px$/, '')) || 0), -target.position().left);
		    var t = Math.max((e.clientY - top + Number(target.css('margin-top').replace(/px$/, '')) || 0), -target.position().top);
		    l = Math.min(l, $(window).width() - target.width() - target.position().left);
		    t = Math.min(t, $(window).height() - target.height() - target.position().top);
		    left = e.clientX;
		    top = e.clientY;
		    target.css({ 'margin-left': l, 'margin-top': t });
		}
		function mouseUp(e) {
		    var el = $this.css('cursor', 'default').get(0);
		    el.releaseCapture ?
		    (
		        el.releaseCapture(),
		        el.onmousemove = el.onmouseup = null
		    ) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
		}
		
	};
	this.showcont = function(){
		$('.jsstrBox .strBoxWrap .jscont').html('').append(str);
	};
	this.close();
	this.showcont();
	this.tuo();
	
}
////时间戳转日期
function timestampToTime(timestamp) {
	//alert(56);
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    D = date.getDate() + '日  ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}
////时间戳转日期2
function timestampToTime2(timestamp,need) {
	//alert(56);
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    D = date.getDate() + '日  ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    if(need){
    	return Y+M+D+h+m+s;
    }else{
    	return Y+M+D;
    }
    
}
///获取三个月前的时间戳
function get3MonthBefor(){
    var resultDate,year,month,date,hms;
    var currDate = new Date();
    year = currDate.getFullYear();
    month = currDate.getMonth()+1;
    date = currDate.getDate();
    hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0'+currDate.getSeconds() : currDate.getSeconds());
    switch(month)
    {
      case 1:
      case 2:
      case 3:
        month += 9;
        year--;
        break;
      default:
        month -= 3;
        break;
    }
    month = (month < 10) ? ('0' + month) : month;
    resultDate = year + '-'+month+'-'+date+' ' + hms;
    var datec = new Date(resultDate);
    // 有三种方式获取
    var time1 = datec.getTime();
  return time1;
}
//----------------------------------------------------------------------------------------------判断类函数
function isRealNum(val){//判断是否是数字
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}  
//判断是否为手机号  
function isPoneAvailable(pone) {  
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
  if (!myreg.test(pone)) {  
    return false;  
  } else {  
    return true;  
  }  
}
// 判断是否为电话号码  
function isTelAvailable(tel) {  
  var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;  
  if (!myreg.test(tel)) {  
    return false;  
  } else {  
    return true;  
  }  
}
//验证邮箱
function checkEmail(email){
	　　var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
	　　if(!reg.test(email)){ //正则验证不通过，格式不对
	　　　　//alert("验证不通过!");
	　　　　return false;
	　　}else{
	　　　　//alert("通过！");
	　　　　return true;
	　　}
	}
$(function(){
	/*var strings = '能为空不能为空不能为空不能为空不能为空不能为空不能为空不能能为空不能为空不能为空不能为空不能为空不能为空不能为空不能';
	eltString(strings,$('body'),8);*/
	/*var strings = '';
	strings += '<div style="width:100%;">'+'<label style="float:left;margin-right:8px;width:100px;text-align:right;">'+'选择物流公司:'+'</label>';
	strings += '<select style="float:left;width:120px;">'+'<option>'+'全峰快递'+'</option>'+'<option>'+'国通快递'+'</option>'+'</select>'+'</div>';
	strings += '<div style="width:100%;margin-top:10px;">'+'<label style="float:left;margin-right:8px;width:100px;text-align:right;">'+'填写运单号:'+'</label>';
	strings += '<input type="text" style="float:left;width:160px;"/>'+'</div>';
	strings += '<div style="width:100%;margin-top:10px;">'+'<label style="float:left;margin-right:8px;width:100px;text-align:right;">'+'填写备注:'+'</label>';
	strings += '<textarea rows="3" cols="28">'+'</textarea>'+'</div>';
	eltString(strings,$('body'),29,400,300);*/
	//弹框类
	
})

//----------------------------------------------------------------------------------------------------------------------------------------------