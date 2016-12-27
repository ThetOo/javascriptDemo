/* Information
----------------------------------------------
File Name : tab.js
URL : http://www.atokala.com/
Copyright : (C)atokala
Author : Masahiro Abe
--------------------------------------------*/
var ATTabChangeForImage = function(vars) {
	//コンストラクタ
	var _self = this;
	var _tabs = new Array();

	//デフォルトオプション
	var options = {
		on : '_on',
		off : '_off',
		current : '_in',
		tabID : 'tabList'
	};

	//オプションの上書き設定
	this.config = function(property) {
		for (var i in property) {
			//設定されていない時は上書きしない
			if (!property.hasOwnProperty(i)) {
				continue;
			}
			options[i] = property[i];
		}
	}

	//Objectクラスに画像置き換え追加
	this.imageChange = function(img, from, to) {
		img.setAttribute('src', img.src.replace(from + '.', to + '.'));
	}

	//現在値取得
	this.getIndex = function(element) {
		var i = 0;

		while (element = element.previousSibling) {
			if (element.nodeType == 1) i++;
		}

		return i;
	}

	//プリロード設定
	this.preLoad = function() {
		var img = document.getElementById(options.tabID).getElementsByTagName('img');

		for (var i = 0; i < img.length; i++) {
			//offの文字列がある場合、onとin画像を先読み
			if (img[i].src.match(new RegExp("(.*)" + options.off + "(\..*)$"))) {
				var onSrc = RegExp.$1 + options.on + RegExp.$2;
				this.preImage(onSrc);

				var inSrc = RegExp.$1 + options.current + RegExp.$2;
				this.preImage(inSrc);
			}
			//inの文字列がある場合、offとon画像を先読み
			else if (img[i].src.match(new RegExp("(.*)" + options.current + "(\..*)$"))) {
				var offSrc = RegExp.$1 + options.off + RegExp.$2;
				this.preImage(offSrc);

				var onSrc = RegExp.$1 + options.on + RegExp.$2;
				this.preImage(onSrc);
			}
		}
	}

	this.preImage = function(src) {
		var pre = new Image();
		pre.src = src;
	}

	//current表示
	this.view = function(current) {
		for (var i = 0; i < _tabs.length; i++) {
			var idName;
			var tab = _tabs[i];
			var img = tab.getElementsByTagName('img')[0];
			var id = document.getElementById(tab.hash.replace(/#/, ''));

			if (current == i) {
				id.style.display = 'block';
				if (img.src.indexOf(options.on) > 0) {
					this.imageChange(img, options.on, options.current);
				}
				else if (img.src.indexOf(options.off) > 0) {
					this.imageChange(img, options.off, options.current);
				}
			}
			else {
				id.style.display = 'none';
				this.imageChange(img, options.current, options.off);
			}
		}
	}

	//イベント追加
	this.addEvent = function(eventTarget, eventName, func) {
		// モダンブラウザ
		if(eventTarget.addEventListener) {
			eventTarget.addEventListener(eventName, func, false);
		}
		// IE
		else if(window.attachEvent) {
			eventTarget.attachEvent('on'+eventName, function(){func.apply(eventTarget);});
		}
	}

	this.load = function(vars) {
		this.config(vars);

		this.addEvent(window, 'load', function() {
			var tabs = document.getElementById(options.tabID);
			if (!tabs) return;

			_self.preLoad();

			_tabs = tabs.getElementsByTagName('a');
			for (var i = 0; i < _tabs.length; i++) {
				var tab = _tabs[i];
				var img = tab.getElementsByTagName('img')[0];

				//画像アクション時
				img.onmouseover = function() {_self.imageChange(this, options.off, options.on);};
				img.onmouseout = function() {_self.imageChange(this, options.on, options.off);};

				//aタグクリック時
				tab.onclick = function() {
					current = _self.getIndex(this.parentNode);
					_self.view(current);
					return false;
				};
			}
		});
	}
};

