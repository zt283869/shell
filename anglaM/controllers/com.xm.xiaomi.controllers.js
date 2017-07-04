angular.module("com.xm.xiaomi.controllers", [])

	.controller('mainController', ['$scope', function($scope) {
		
	}])
	.controller('indexController', ['$scope', '$http', '$state', '$interval', function($scope, $http, $state,$interval) {
		                
				var i = 0;
				var timeout_upd = $interval(show,3000); 

				$scope.$on('$destroy',function(){  
					console.log('destroy')
       				$interval.cancel(timeout_upd);  
   				})  

				function show() {
					i++;
					if(i > 2) {
						i = 0;
					}					
					$('.sc_title li').eq(i).show().siblings().hide();
				}


		$.post("/indexs", function(username) {
					console.log(username);
					//console.log(goods.img);
					if(!username) {
						$("#login_1").show();
						$('#imgs_1').hide();
					} else {
						$("#login_1").hide();
						$('#imgs_1').show();
					}
				})


		$http({
				url: './data/index.json',
				method: "get"
			})
			.then(function(data) {
				$scope.list = data.data;
			})
//		$http({
//				url: 'http://m.kuwo.cn/newh5/mv/play?mid=14131642',
//				method: "get"
//			})
//			.then(function(data) {
//				$scope.list = data.data;
//				console.log("kuwo="+data.data)
//			})	
//			

	}])
	.controller('sortController', ['$scope', '$http', '$state', 'sort', function($scope, $http, $state, sort) {

		sort.getList1().then(function(data) {
			console.log(data.data);
			$scope.sort = data.data;		
		})
	
	}])
	.controller('cartController', ['$scope', function($scope) {

	}])
	.controller('myController', ['$scope', function($scope) {

			
	}])
	.controller('topicController', ['$scope', 't', function($scope, t) {
		t.getTopic().then(function(resp) {
			console.log(resp.data);
			$scope.topic = resp.data;			
		})		
	}])
	.controller('listController', ['$scope', '$http', '$state', 'oneFactory', function($scope, $http, $state, oneFactory) {

		oneFactory.getList().then(function(data) {
			console.log(data.data);
			$scope.l = data.data;
			
		})
	
	}])
	.controller('detailController', ['$scope', '$stateParams', 'oneFactory', '$rootScope', function($scope, $stateParams, oneFactory, $rootScope) {
		$rootScope.goodsId = $stateParams.id;
		console.log($rootScope.goodsId);
		oneFactory.getList().then(function(data) {
			//console.log(data.data);
			for(var i = 0; i < data.data.length; i++) {
				if(data.data[i].id.indexOf($rootScope.goodsId) > -1) {
					$scope.s = data.data[i];
					console.log($scope.s);
				}
			}
		})

		$scope.show = function() {
			console.log(2)
			$('.share').show();
		}
		$scope.hide = function() {
			console.log(3)
			$('.share').hide();

		}

	}])
	.controller('searchController', ['$scope', '$http', '$state', function($scope, $http, $state) {
		console.log(1)
		$scope.txt = "";
		console.log("k1=" + $scope.txt)

		$scope.search = function() {
			if($scope.txt == '') {
				$('.searchkey').show();
				$('.search_list').hide();
			} else {
				//
				$('.searchkey').hide();
				$('.search_list').show();
			}
			console.log($scope.txt);
			$('.search_lists').html('');

			$.ajax({
				type: "GET",
				dataType: 'JSONP',
				url: 'http://search.mi.com/search/expand?keyword=' + $scope.txt,
				jsonp: 'jsonpcallback',
				success: function(data) {
					console.log(data)
					var str = ''
					for(var i = 0; i < data.length; i++) {
						str += '<li>' + data[i].Key + '</li>';
					}
					$('.search_lists').append(str);
				}
			})

		}

	}])
	.controller('loginController', ['$scope',"$http" ,'$location' ,function($scope,$http,$location) {
		console.log(2222)
		$scope.login = function() {
			if($("#username").val() !== "" || $("#userpass").val() !== "") {
				$http({
					url: "/logins", 
					method: "post",
					data: {
						username: $("#username").val(),
						password: $("#userpass").val()						
					}
				})
				.then(function(data) {							
					console.log('data='+data.data)
					if(data.data.indexOf("1") > -1) {	
						console.log('用户名或密码错误')
						$(".lgncode").html("用户名或密码错误");						
					} else {	
						console.log('登录首页')
						// location.href = "#/main/index";
							$location.path('/main/index');							
					}
				});
			}else{
				$(".lgncode").html("用户名或密码不能为空");
			}
			

		}
	}])
	.controller('registerController', ['$scope', '$location' ,function($scope,$location) {
		console.log(333)
		//$scope.$location.path();
		//验证用户名是否存在
		$scope.blur = function(){
			console.log(666)
			if(/^1\d{10}$/.test($("#username").val())) {
				console.log(88)
				$.post("/checkuser", {
					"username": $("#username").val()
				}, function(data) {
					console.log("data=" + data)
					if(data.indexOf("1") > -1) {
						console.log('用户名可以使用');
						$(".lgncode").html('<lable style="color:green;">用户名可以使用</lable>');
					} else {
						console.log('用户名已被使用');
						$(".lgncode").html("用户名已被使用");
					}
				});
			} else if( $("#username").val() == "") {
				$(".lgncode").html("用户名不能为空");
			} else {
				$(".lgncode").html("请输入正确的手机号码");
			}
		};
		//密码验证
		$scope.pass = function(){
			console.log(777)
			if(/^[a-zA-Z_]\w{5,14}$/.test($("#userpass").val())) {
				$(".lgncode").html('<lable style="color:green;">密码可以使用</lable>');
			} else if($("#userpass").val() == "") {
				$(".lgncode").html("密码不能为空");
			} else {
				$(".lgncode").html("密码长度在6-15之间，字母，下划线开头");
			}
		};
		//注册
		$scope.register = function() {				
			console.log($("#username").val())
			console.log(2222)
			if(/^1\d{10}$/.test($("#username").val()) && /^[a-zA-Z_]\w{5,14}$/.test($("#userpass").val()) && $("#username").val() != "" && $("#userpass").val() != "") {
				$.post("/registers", {
					"username": $("#username").val(),
					"password": $("#userpass").val()
				}, function(data) {
					console.log('data=' + data)
					if(data.indexOf("1") > -1) {
						console.log('跳转首页')
						$location.path('/main/index');
						$scope.$apply();
					} else {
						console.log('刷新页面')
						location.reload(true);
					}
				});

			}
		}

	}])