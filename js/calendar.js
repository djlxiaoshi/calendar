//创建calendar类
	    var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth();
		var day=now.getDay();
		var date=now.getDate();
		var c= getIdDom("calendar");
		var show=getIdDom("show");
		var a=c.getElementsByTagName("a");
		//var div=c.getElementsByTagName("div");
		var ca=new calendar(year,month);
	
		//初始化显示
		function init_calendar(){
				
				a[1].onclick=function(){
					month--;
					if(month<0){
						year--;
						month=11;
					};
					ca=new calendar(year,month);
					show_calendar();
				}
				
				a[2].onclick=function(){
					month++;
					if(month>11){
						year++;
						month=0;
					};
					ca=new calendar(year,month);
					show_calendar();
				}
				a[0].onclick=function(){
					year--;
					ca=new calendar(year,month);
					show_calendar();
				}
				
				a[3].onclick=function(){
					year++;
					ca=new calendar(year,month);
					show_calendar();
				}
				
				show_calendar();
		}

		function show_calendar(){
			//是否为节日标志
		   var f_flag=null;
		   getIdDom("show_y_m").innerHTML=year+"年"+(month+1)+"月";
		   var template="<table border=\"0\" cellspacing=\"1\">";
		   template+="<tr><th scope=\"col\" class='red'>日</th><th scope=\"col\">一</th><th scope=\"col\">二</th><th scope=\"col\">三</th><th scope=\"col\">四</th><th scope=\"col\">五</th><th scope=\"col\" class='red'>六</th></tr>";
		   template+="<tr>";
		   //每月之前前面有多少个是没有的
		   if(ca.firstday>0){
		   	  for(var i=0;i<ca.firstday;i++){
		   	  	template+="<td></td>";
		   	  }
		   	}
		   for(var i=ca.firstday,j=1;j<ca.daynum+1;i++,j++){
			     if(i%7==0&&i>0){template+="</tr><tr>";}
			     
			     //公历转农历
			     var nong_li=GetLunarDay(year,month+1,j);
			     //判断是否为公历节日
			     fArr.forEach(function(item,index){
			     	var f_arr=item.split("-");
			     	var f_date=f_arr[0];
			     	var f_desc=f_arr[1];
			     	//console.log(month+1+""+j);
			     	if(month+1+""+j===f_date){
			     		f_flag=f_desc;
			     	}
			     });
			     
			     //判断是否为农历节日
			     f_n_Arr.forEach(function(item,index){
			     	var f_arr=item.split("-");
			     	var f_date=f_arr[0];
			     	var f_desc=f_arr[1];
			     	if(nong_li===f_date){
			     		f_flag=f_desc;
			     	}
			     });
			     
			     //如果有节日节日
			     if(f_flag){
			     	if(i%7==0||(i+1)%7==0){
				     	template+="<td class='red'>"+j+"<br>"+f_flag+"</td>";
				     }else{
				     	template+="<td class='orange'>"+j+"<br>"+f_flag+"</td>";
				     }
				    f_flag=null;
			     }else{          //非节日
			     	if(i%7==0||(i+1)%7==0){
				     	template+="<td class='red'>"+j+"<br>"+nong_li.substr(-2)+"</td>";
				     }else{
				     	template+="<td>"+j+"<br>"+nong_li.substr(-2)+"</td>";
				     }
			     }
			     
			     
		   }
		   
		   //每月末尾有多少空格
		   if(7>(7-(ca.daynum+ca.firstday)%7)>0){
		   		for(var i=0;i<(7-(ca.daynum+ca.firstday)%7);i++){
		   			template+="<td></td>";
		   		}
		   	}
		   
		   template+="</tr></table>";
		   show.innerHTML=template;
		}
		
		
		function calendar(y,m){
		  var c=new Date(y,m,1,0,0,0,0);  //当月第一天
		  this.daynum=getMonthDays(m+1,y);  //获得当月的天数
		  this.firstday=c.getDay();  //当月第一天星期几
		}

	//获取某一月的天数
	function getMonthDays(m,y){
	  var monthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
	  if(m==2){
	  	if(isLeapYear(y)){
	  		return 29;
	  	}else{
	  		return 28;
	  	}
	  }else{
	  	return monthDays[m-1];
	  }
	}
	
	//判断是否为闰年,非整百年数除以4，无余为闰，有余为平；整百年数除以400，无余为闰有余平
	  function isLeapYear(year){
	    if(year%100==0){
	    	if(year%400==0){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    }else{
	    	if(year%4==0){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    }
	  }
	  
	  
	  function getIdDom(dom){
	  	return document.getElementById(dom);
	  }


window.onload=init_calendar;