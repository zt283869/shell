angular.module("com.xm.xiaomi.configs",[])

.config(['$stateProvider','$urlRouterProvider','$urlMatcherFactoryProvider',function($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider){
	$urlMatcherFactoryProvider.caseInsensitive(true);
	
	$stateProvider
		.state('main',{
			url: '/main',
			templateUrl: 'views/main-view.html',
			controller: 'mainController'
		})
		.state('main.index',{
			url: '/index',
			templateUrl: 'views/index-view.html',
			controller: 'indexController'
		})
		.state('topic',{
			url: '/topic',
			templateUrl: 'views/topic-view.html',
			controller: 'topicController'
		})	
		.state('main.sort',{
			url: '/sort',
			templateUrl: 'views/sort-view.html',
			controller: 'sortController'
		})
		.state('main.list',{
			url: '/list',
			templateUrl: 'views/list-view.html',
			controller: 'listController'
		})
		.state('detail',{
			url: '/detail/:id',
			templateUrl: 'views/detail-view.html',
			controller: 'detailController'
		})
		.state('main.cart',{
			url: '/cart',
			templateUrl: 'views/cart-view.html',
			controller: 'cartController'
		})
		.state('main.my',{
			url: '/my',
			templateUrl: 'views/my-view.html',
			controller: 'myController'
		})
		.state('search',{
			url: '/search',
			templateUrl: 'views/search-view.html',
			controller: 'searchController'
		})
		.state('login',{
			url: '/login',
			templateUrl: 'views/login-view.html',
			controller: 'loginController'
		})
		.state('register',{
			url: '/register',
			templateUrl: 'views/register-view.html',
			controller: 'registerController'
		})

		
		$urlRouterProvider.otherwise('/main/index');
}]);