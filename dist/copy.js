// ==UserScript==
// @name        🔥🔥🔥文本选中复制🔥🔥🔥
// @description 解除网站不允许复制的限制，文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 无忧考网 学习啦 蓬勃范文 思否社区 力扣 知乎
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     2.1.5
// @author      Czy
// @include     *://wenku.baidu.com/view/*
// @include     *://www.51test.net/show/*
// @include     *://www.xuexi.la/*
// @include     *://www.xuexila.com/*
// @include     *://www.cspengbo.com/*
// @include     *://www.doc88.com/*
// @include     *://segmentfault.com/*
// @include     *://wk.baidu.com/view/*
// @include     *://leetcode-cn.com/problems/*
// @include     *://www.zhihu.com/*
// @include     *://z.30edu.com.cn/*
// @license     GPL License
// @require     https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @connect     res.doc88.com
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "#_copy{width:60px;height:30px;background:#4c98f7;color:#fff;position:absolute;z-index:1000;display:flex;justify-content:center;align-items:center;border-radius:3px;font-size:13px;cursor:pointer}#select-tooltip,#sfModal,.modal-backdrop,div[id^=reader-helper]{display:none!important}.modal-open{overflow:auto!important}._sf_adjust_body{padding-right:0!important}";
  styleInject(css_248z);

  function initEvent($, ClipboardJS) {
    $("body").on("mousedown", function (e) {
      $("#_copy").remove();
    });

    document.oncopy = function () {};

    $("body").on("copy", function (e) {
      e.stopPropagation();
      return true;
    });
    ClipboardJS.prototype.on('success', function (e) {
      $("#_copy").html("复制成功");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
    ClipboardJS.prototype.on('error', function (e) {
      $("#_copy").html("复制失败");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
  }

  var path = "";

  function init() {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://res.doc88.com/assets/js/v2.js",
      onload: function onload(response) {
        var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
        path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
      }
    });
  }

  function getSelectedText() {
    return unsafeWindow.Core.api._if;
  }

  var doc88 = {
    init: init,
    getSelectedText: getSelectedText
  };

  function init$1($) {
    $(window).on("load", function (e) {
      $(".sf-edu-wenku-vw-container").attr("style", "");
      $(".sfa-body").on("selectstart", function (e) {
        e.stopPropagation();
        return true;
      });
    });
  }

  var wk = {
    init: init$1
  };

  function init$2($) {
    $("body").append("<style>#_copy{display: none !important;}</style>");
  }

  var leetcode = {
    init: init$2
  };

  function init$3($) {
    $("body").append("<style>#_copy{display: none !important;}</style>");
  }

  var zhihu = {
    init: init$3
  };

  function init$4($) {
    window.onload = function () {
      var iframes = document.getElementsByTagName("iframe");

      if (iframes.length === 2) {
        console.log(iframes[1].contentWindow.document);
        var body = $(iframes[1].contentWindow.document.querySelector("body"));
        console.log(body);
        body.attr("oncopy", "");
        body.attr("oncontextmenu", "");
        body.attr("onselectstart", "");
      }
    };
  }

  var edu30 = {
    init: init$4
  };

  function initWebsite($, ClipboardJS) {
    var mather = function mather(regex, funct) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (regex.test(window.location.href)) funct.apply(void 0, args);
    };

    mather(/.*doc88\.com\/.+/, doc88.init);
    mather(/.*segmentfault\.com\/.+/, wk.init, $);
    mather(/.*wk\.baidu\.com\/view\/.+/, wk.init, $);
    mather(/.*leetcode-cn\.com\/problems\/.+/, leetcode.init, $);
    mather(/.*zhihu\.com\/.+/, zhihu.init, $);
    mather(/.*30edu\.com\.cn\/.+/, edu30.init, $);
  }

  function getSelectedText$1() {
    if (window.location.href.match(/.*www\.doc88\.com\/.+/)) return doc88.getSelectedText();
    if (window.getSelection) return window.getSelection().toString();else if (document.getSelection) return document.getSelection();else if (document.selection) return document.selection.createRange().text;
    return "";
  }

  (function () {
    var $ = window.$;
    var ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text

    initEvent($, ClipboardJS);
    initWebsite($);
    document.addEventListener("mouseup", function (e) {
      var copyText = getSelectedText$1();
      if (copyText) console.log(copyText);else return "";
      $("#_copy").remove();
      var template = "\n            <div id=\"_copy\"\n            style=\"left:".concat(e.pageX + 30, "px;top:").concat(e.pageY, "px;\"\n            data-clipboard-text=\"").concat(copyText, "\">\u590D\u5236</div>\n        ");
      $("body").append(template);
      $("#_copy").on("mousedown", function (event) {
        event.stopPropagation();
      });
      $("#_copy").on("mouseup", function (event) {
        event.stopPropagation();
      });
      new ClipboardJS('#_copy');
    });
  })();
  /**
   * https://www.wenku.zone/
   * http://wenku.baiduvvv.com/
   * https://www.huiyingwu.com/1718/
   */

}());
