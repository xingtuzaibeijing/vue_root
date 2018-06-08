define(['jquery', 'jquery_cookie'], function ($) {
    util = {}

    /**过滤字符串两边的空格*/
	util.trim = function(str) {
	    return str.replace(/(^\s*)|(\s*$)/g, '');
	}

	util.check = function (str, title) {
        str = this.trim(str);
        if(str === '') {
            return false;
        }
        return str;
    }

	util.setCookie = function(key, value) {
	    $.cookie(key, value)
    }

    util.getCookie = function(key) {
	    return $.cookie(key)
    }
	return util;
});
