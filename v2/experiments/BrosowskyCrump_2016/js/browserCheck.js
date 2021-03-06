try {
    UMB = function() {
        function a(g, c, e) {
            e = e || 0;
            for (var d in g) try {
                g[d] = c[d].constructor == Object ? a(g[d], c[d], e + 1) : c[d]
            } catch (f) {}
            return g
        }
        var c = !1,
            h = !1,
            d = {},
            e = function() {
                if (!c) {
                    c = !0;
                    UMB.Detect.init();
                    var g = window._umb || {};
                    d = {
                        require: {
                            chrome: UMB.Browsers.chrome.minimum,
                            firefox: UMB.Browsers.firefox.minimum,
                            ie: UMB.Browsers.ie.minimum,
                            opera: UMB.Browsers.opera.minimum,
                            safari: UMB.Browsers.safari.minimum,
                            edge: UMB.Browsers.edge.minimum
                        },
                        display: !0,
                        nonCritical: !1
                    };
                    d = a(d, g)
                }
            };
        return {
            load: function() {
                h || (h = !0, UMB.attach(window,
                    "load",
                    function() {
                        e();
                        d.display && UMB.autoDisplayWidget()
                    }))
            },
            attach: function(c, a, d) {
                c.addEventListener ? window.addEventListener(a, d, !1) : c.attachEvent && c.attachEvent("on" + a, d)
            },
            getConfig: function() {
                e();
                return d
            },
            getCurrentBrowser: function() {
                e();
                return UMB.Detect.browser
            },
            getCurrentVersion: function() {
                e();
                return UMB.Detect.version
            },
            getBrowserInfo: function(c) {
                e();
                return UMB.Browsers[c]
            },
            getStatus: function() {
                e();
                return UMB.Status.getStatus()
            },
            displayWidget: function() {
                e();
                UMB.Widget.display()
            },
            hideWidget: function() {
                e();
                UMB.Widget.hide()
            },
            autoDisplayWidget: function() {
                e();
                if (-1 == document.cookie.indexOf("_umb=hide")) {
                    var c = UMB.getStatus();
                    "update" == c && d.nonCritical ? UMB.displayWidget() : "warning" == c && UMB.displayWidget()
                }
            },
            scrollToTop: function() {
                var c = document.body,
                    a = document.documentElement,
                    a = c.clientHeight ? c : a;
                a.scrollTop = 0
            }
        }
    }();
    UMB.load();
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Browsers = {
        chrome: {
            name: "Chrome",
            vendor: "Google",
            current: "52",
            minimum: "51",
            update_url: "https://www.google.com/chrome/browser/desktop/index.html",
            info_url: "http://www.google.com/chrome/intl/en/more/index.html"
        },
        safari: {
            name: "Safari",
            vendor: "Apple",
            current: "9.1",
            minimum: "8.1",
            update_url: "http://www.apple.com/safari/",
            info_url: "http://www.apple.com/safari/"
        },
        edge: {
            name: "Edge",
            vendor: "Microsoft",
            current: "14",
            minimum: "13",
            update_url: "https://www.microsoft.com/en-us/download/details.aspx?id=48126",
            info_url: "https://www.microsoft.com/en-us/windows/microsoft-edge"
        },
        firefox: {
            name: "Firefox",
            vendor: "Mozilla",
            current: "48",
            minimum: "47",
            update_url: "http://www.getfirefox.com/",
            info_url: "https://www.mozilla.org/firefox/desktop/"
        },
        ie: {
            name: "Internet Explorer",
            vendor: "Microsoft",
            current: "11",
            minimum: "10",
            update_url: "http://www.microsoft.com/ie",
            info_url: "http://windows.microsoft.com/internet-explorer"
        },
        opera: {
            name: "Opera",
            vendor: null,
            current: "39",
            minimum: "38",
            update_url: "http://www.opera.com/browser/",
            info_url: "http://www.opera.com/browser/features/"
        }
    };
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Detect = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "unknown";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "unknown"
        },
        searchString: function(a) {
            for (var c = 0; c < a.length; c++) {
                var h = a[c].string,
                    d = a[c].prop;
                this.versionSearchString = a[c].versionSearch || a[c].identity;
                if (h) {
                    if (-1 != h.indexOf(a[c].subString)) return a[c].identity
                } else if (d) return a[c].identity
            }
        },
        searchVersion: function(a) {
            var c =
                a.indexOf(this.versionSearchString);
            if (-1 != c) return parseFloat(a.substring(c + this.versionSearchString.length + 1))
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "OPR/",
            identity: "opera",
            versionSearch: "OPR"
        }, {
            string: navigator.userAgent,
            subString: "Edge",
            identity: "edge",
            versionSearch: "Edge"
        }, {
            string: navigator.userAgent,
            subString: "Chrome",
            versionSearch: "Chrome",
            identity: "chrome"
        }, {
            string: navigator.vendor,
            subString: "Apple",
            identity: "safari",
            versionSearch: "Version"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            versionSearch: "Firefox",
            identity: "firefox"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "ie",
            versionSearch: "MSIE"
        }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "ie",
            versionSearch: "rv"
        }],
        dataOS: [{
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iOS"
        }, {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iOS"
        }, {
            string: navigator.userAgent,
            subString: "Android",
            identity: "Android"
        }, {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        }, {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        }, {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }]
    };
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Status = function() {
        return {
            getStatus: function() {
                var a = UMB.getBrowserInfo(UMB.Detect.browser),
                    c = UMB.Detect.OS;
                if (!a || "iOS" == c || "Android" == c) return "unsupported";
                a = parseFloat(a.current);
                c = parseFloat(UMB.getConfig().require[UMB.Detect.browser]);
                return UMB.Detect.version >= a ? "latest" : UMB.Detect.version >= c ? "update" : "warning"
            }
        }
    }();
    "undefined" === typeof UMB && (UMB = function() {});
    UMB.Widget = function() {
        var a = !1,
            c = !1,
            h = function(f, b) {
                for (var c in f) b.style[c] = f[c]
            },
            d = function() {
                c = !1;
                var f = document.getElementById("BrowserBar");
                f && document.getElementsByTagName("body")[0].removeChild(f);
                f = document.createElement("div");
                h({
                    display: "none",
                    position: "absolute",
                    height: "19px",
                    fontSize: "14px",
                    lineHeight: "1em",
                    fontFamily: "Arial, sans-serif",
                    color: "black",
                    padding: "10px 0",
                    top: "-40px",
                    left: "0px",
                    backgroundColor: "#FDF2AB",
                    backgroundImage: "url(//updatemybrowser.org/warning.gif)",
                    backgroundPosition: "10px center",
                    backgroundRepeat: "no-repeat",
                    borderBottom: "1px solid #A29330",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    zoom: "1",
                    zIndex: 9999,
                    "-webkit-box-sizing": "content-box",
                    "-moz-box-sizing": "content-box",
                    "box-sizing": "content-box",
                    overflow: "hidden"
                }, f);
                f.setAttribute("id", "BrowserBar");
                var b = document.createElement("p");
                h({
                    margin: "0px 0px 0px 40px",
                    padding: "0px",
                    lineHeight: "1.5em"
                }, b);
                var a = document.createElement("a");
                a.href = "javascript:void(0);";
                a.title = "Don't show me this notification bar for the next 24 hours";
                a.onclick = function(b) {
                    b || (b = window.event);
                    b.cancelBubble = !0;
                    b.stopPropagation && b.stopPropagation();
                    UMB.Widget.hidePersistent(1);
                    return !1
                };
                h({
                    display: "block",
                    width: "20px",
                    height: "20px",
                    margin: "0px 0px 0px 40px",
                    padding: "0px",
                    lineHeight: "1.5em",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundImage: "url(//updatemybrowser.org/close.gif)",
                    backgroundPosition: "0 0",
                    backgroundRepeat: "no-repeat"
                }, a);
                f.appendChild(b);
                f.appendChild(a);
                document.getElementsByTagName("body")[0].appendChild(f)
            },
            e = function() {
                var f =
                    UMB.getStatus(),
                    b = UMB.getBrowserInfo(UMB.getCurrentBrowser()),
                    a = UMB.getCurrentVersion();
                if (f && b && a) {
                    var d = document.getElementById("BrowserBar"),
                        k = document.createElement("a");
                    k.href = "https://www.updatemybrowser.org";
                    k.onclick = function() {
                        return !1
                    };
                    k.style.color = "#2183d0";
                    k.style.fontWeight = "bold";
                    k.target = "_blank";
                    var e = "",
                        g = "";
                    "latest" == f ? (e = "You have the latest version of your browser installed (" + b.name + " " + a + "). ", k.style.color = "#00A651", k.appendChild(document.createTextNode("Learn more"))) : "update" ==
                        f ? (e = "An update (" + b.name + " " + b.current + ") is available for your browser. Please ", k.appendChild(document.createTextNode("install this browser update")), g = ".") : "warning" == f && (e = "An important update (" + b.name + " " + b.current + ") is available for your browser. Please ", k.style.color = "#ED1C24", k.appendChild(document.createTextNode("install this critical browser update")), g = ".", c = !0);
                    d.getElementsByTagName("p")[0].appendChild(document.createTextNode(e));
                    d.getElementsByTagName("p")[0].appendChild(k);
                    d.getElementsByTagName("p")[0].appendChild(document.createTextNode(g));
                    document.getElementById("BrowserBar").onclick = function() {
                        window.open(k.href)
                    }
                }
            },
            g = function(f, b) {
                var c;
                window.getComputedStyle ? c = window.getComputedStyle(f)[b] : f.currentStyle && (c = f.currentStyle[b]);
                c || (c = f.style[b]);
                return c
            },
            m = function(c, b, a, d, e, h, l) {
                "opacity" == b && m(c, "filter", 100 * a, d, e, "alpha(opacity=", ")");
                h = h || "";
                l = l || ""; - 1 < "|top|marginTop|".indexOf(b) && (l = l || "px");
                var q = parseFloat(g(c, b).replace(h, "").replace(l, "")) || 0;
                if (0 == a.toString().indexOf("+") || 0 == a.toString().indexOf("-")) a = q + parseFloat(a);
                var n = 1 / (d / 10),
                    r = 0,
                    t = function(b) {
                        return Math.round(100 * (q + (a - q) * (.5 - Math.cos(b * Math.PI) / 2))) / 100
                    },
                    p = setInterval(function() {
                        r += n;
                        c.style[b] = h + t(r) + l;
                        1 <= r && (clearInterval(p), c.style[b] = h + t(1) + l, e && e())
                    }, 10)
            },
            n = function() {
                var a = document.getElementsByTagName("body")[0],
                    b = document.getElementById("BrowserBar");
                if ("none" === g(b, "display") && (a.className += " umb-active", b.style.opacity = "0", b.style.filter = "alpha(opacity=0)", b.style.display = "block", m(b, "opacity", .95, 600), "ie" == UMB.getCurrentBrowser() && "BackCompat" ==
                        document.compatMode ? (b.style.top = "0px", b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px") : (a.style.position = "relative", a.style.overflow = "visible", m(a, "top", "+40", 300), c || (UMB.attach(window, "resize", function() {
                            b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px"
                        }), b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px", b.style.top = "-" + (parseFloat(g(a, "marginTop")) + 40) + "px", b.style.left = "-" + parseFloat(g(a,
                            "marginLeft")) + "px")), c))
                    if ("ie" == UMB.getCurrentBrowser() && "BackCompat" == document.compatMode) UMB.attach(window, "scroll", function() {
                        b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) + (!b.offsetHeight && 0) + "px"
                    }), b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) + (!b.offsetHeight && 0) + "px";
                    else if ("ie" == UMB.getCurrentBrowser() && 6 >= UMB.getCurrentVersion()) {
                    UMB.attach(window, "resize", function() {
                        b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) +
                            "px"
                    });
                    b.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px";
                    var d = parseFloat(g(a, "marginTop")) + 40;
                    b.style.top = "-" + d + "px";
                    b.style.left = "-" + parseFloat(g(a, "marginLeft")) + "px";
                    UMB.attach(window, "scroll", function() {
                        b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) - d + "px"
                    });
                    b.style.top = (document.documentElement.scrollTop || document.body.scrollTop) - d + "px"
                } else b.style.top = "0px", b.style.position = "fixed"
            },
            p = function() {
                var a = document.getElementsByTagName("body")[0],
                    b = document.getElementById("BrowserBar");
                "block" === g(b, "display") && (a.className = a.className.replace(" umb-active", ""), m(b, "opacity", 0, 600, function() {
                    b.style.display = "none"
                }), "ie" == UMB.getCurrentBrowser() && "BackCompat" == document.compatMode || m(a, "top", "-40", 300))
            };
        return {
            init: function() {
                a || (a = !0, UMB.Widget.redraw())
            },
            redraw: function() {
                d();
                e()
            },
            display: function() {
                UMB.Widget.init();
                n()
            },
            hide: function() {
                UMB.Widget.init();
                p()
            },
            hidePersistent: function(a) {
                a = a || 1;
                var b = new Date;
                b.setDate(b.getDate() + a);
                a = encodeURIComponent("hide") +
                    (null == a ? "" : "; expires=" + b.toUTCString()) + "; path=/";
                document.cookie = "_umb=" + a;
                UMB.hideWidget()
            }
        }
    }();
} catch (e) {
    throw 'JavaScript parse error (' + e.message + ').';
}
