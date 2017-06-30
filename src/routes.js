module.exports = [{
	path: "/",
	name: "homepage",
	component: function (resolve) {
  	require(['./pages/homepage'], resolve);
  },
},
{
	path: "/page1",
	name: "page1",
	component: function (resolve) {
  	require(['./pages/page1'], resolve);
  },
},
{
	path: "/page2",
	name: "page2",
	component: function (resolve) {
  	require(['./pages/page2'], resolve);
  },
}];
