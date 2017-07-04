angular.module("com.xm.xiaomi.services", [])

	.service("t", function($http, $sce) {
		this.getTopic = function() {
			return $http({
				method: "get",
				url: "./data/topic.json"
			})
		}
	})

	.factory("oneFactory", function($http, $sce) {
		function _getLists() {
			var url = "./data/list.json";
			return $http({
				url: url,
				method: "get"
			})
		}
		//对外返回
		return {
			getList: _getLists
		}
	})

	.provider("sort", function() {
		//$.get向外提供方法的调用
		this.$get = function($http, $sce) {
			//定义一个获取用户信息的服务

			function _getLists1() {
				var url = "./data/sort.json";
				return $http({
					url: url,
					method: "get"
				})
			}
			//对外返回
			return {
				getList1: _getLists1
			}
		}
	})
	
	.filter("f", function(){
		return {
			"id":goodsId
		}
	})