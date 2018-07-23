/*! tiny.js 0.2.0 by Everaldo Canuto - MIT License */
(function (d) {
	$ = function (a) {
		return new $.tiny(a);
	};

	$.tiny = function(a) {
		if (typeof a === 'function')
			return (d.readyState === 'complete') ? a() :
				$(d).on('DOMContentLoaded', a);

		[].push.apply(this,
			(typeof a === 'string') ? d.querySelectorAll(a) : [a]
		);
	};

	$.fn = $.prototype = $.tiny.prototype = {
		each: function (i, v) {
			[].forEach.call(this, i, v);
			return this;
		},
		on: function (e, f) {
			return this.each(function (t) {
				t.addEventListener(e, f);
			});
		},
		off: function (e, f) {
			return this.each(function (t) {
				t.removeEventListener(e, f);
			});
		},
		hasClass: function(c) {
			return this[0].classList.contains(c);
		},
		addClass: function (c) {
			return this.each(function (t) {
				t.classList.add(c);
			});
		},
		removeClass: function (c) {
			return this.each(function (t) {
				t.classList.remove(c);
			});
		},
		toggleClass: function (c) {
			return this.each(function (t) {
				t.classList.toggle(c);
			});
		}
	}
})(document);

/* script.js */
$(function () {

	$.fn.trackGA = function () {
		return this.each(function (t) {
			var listener = function (event) {
				category = t.getAttribute('data-category');
			  	hittype = t.getAttribute('data-hittype') || 'event';
			  	action = t.getAttribute('data-action') || 'execution';
			  	label = t.getAttribute('data-label');

		  		ga('send', {
				 	hitType: hittype,
					eventCategory: category,
					eventAction: action,
					eventLabel: label
				});
				$(t).off('click', listener);
			};

			$(t).on('click', listener);
		});
	};

	// tinykit toggle
	$('[data-tk-toggle-target]').each(function(s) {
		var t = s.getAttribute('data-tk-toggle-target');
		var c = s.getAttribute('data-tk-toggle-class') || 'visible';
		$(s).on('click', function(e) {
			$(t).toggleClass(c);
		});
	});

	// Google Anlytics tracking
	$('.track-ga').trackGA();

	// footer menu
	$('.menu-btn').on('click', function(e) {
		window.scrollTo(0, document.body.scrollHeight);
	});

	// up button
	$('.up').on('click', function(e) {
		window.scrollTo(0, 0);
	});

	// search button
	$('.btn-busca').on('click', function(e) {
		campobusca.focus();
	});

	// search form
	$('#form-search').on('submit', function(e) {
		e.preventDefault();
		campobusca.value === '' ? campobusca.focus() : e.srcElement.submit();
	});

	// fix footer position when we have adsense at bottom of page
	if ($('#page-block-fixed').length) {
		$('#footer')[0].style.marginBottom = "50px";
	}

	// transforms rgb color to hexadecimal
	function rgbToHex(rgb) {
		var a = rgb.match(/^rgb\((\d+),\s?(\d+),\s?(\d+)\)$/);
		var red = parseInt(a[1]);
		var green = parseInt(a[2]);
		var blue = parseInt(a[3]);
		var hex = ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
		return hex;
	}

	// device detection
	useragent = navigator.userAgent || navigator.vendor || window.opera;
	if (!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(useragent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(useragent.substr(0,4))) {
		$('#device-detect').addClass('visible');
	}

	String.prototype.stripAccents = function() {
		var src = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g,
			dst =  "aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY";

		return (this.replace(src, function(match) {
			return dst.substr(src.source.indexOf(match)-1, 1);
		}));
	}
});
