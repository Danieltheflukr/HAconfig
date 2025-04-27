var Ln = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, It = {}, Bc;
function Rv() {
  if (Bc) return It;
  Bc = 1, Object.defineProperty(It, "__esModule", { value: !0 }), It._accessExpressionAsString = void 0;
  const j = (q) => F(q) ? `.${q}` : `[${JSON.stringify(q)}]`;
  It._accessExpressionAsString = j;
  const F = (q) => d(q) === !1 && /^[a-zA-Z_$][a-zA-Z_$0-9]*$/g.test(q), d = (q) => N.has(q), N = /* @__PURE__ */ new Set([
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with"
  ]);
  return It;
}
var ar = /* @__PURE__ */ Rv(), jt = {}, Mc;
function Ev() {
  if (Mc) return jt;
  Mc = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt._validateReport = void 0;
  const j = (F) => {
    const d = (N) => {
      if (F.length === 0)
        return !0;
      const q = F[F.length - 1].path;
      return N.length > q.length || q.substring(0, N.length) !== N;
    };
    return (N, q) => (N && d(q.path) && F.push(q), !1);
  };
  return jt._validateReport = j, jt;
}
var Wt = /* @__PURE__ */ Ev();
const Lv = "ll-strategy-dashboard-", ni = "ll-strategy-view-";
var qe = /* @__PURE__ */ ((j) => (j.entity = "entity", j.domain = "domain", j.device = "device", j.area = "area", j.floor = "floor", j.integration = "integration", j.label = "label", j.state = "state", j.attribute = "attribute", j.disabled_by = "disabled_by", j.hidden_by = "hidden_by", j.entity_category = "entity_category", j))(qe || {}), gr = /* @__PURE__ */ ((j) => (j.equal = "equal", j.match = "match", j.in = "in", j.greater_than = "greater_than", j.lower_than = "lower_than", j.is_null = "is_null", j.is_numeric = "is_numeric", j))(gr || {}), Ft = /* @__PURE__ */ ((j) => (j.ascending = "ascending", j.descending = "descending", j))(Ft || {}), Dc = /* @__PURE__ */ ((j) => (j.add = "add", j.reset = "reset", j))(Dc || {});
const Bt = (j, F) => (d) => {
  var q, D;
  let N = !0;
  return j.filter && (N = (((q = j.filter) == null ? void 0 : q.include) || new Array()).reduce((W, U) => {
    if (!W)
      return !1;
    try {
      const H = jn(U.type, d, U.config, F);
      return ei(U.comparator || gr.equal, H, U.value);
    } catch (H) {
      return console.error(H), !1;
    }
  }, N), N = (((D = j.filter) == null ? void 0 : D.exclude) || []).reduce((W, U) => {
    if (!W)
      return !1;
    try {
      const H = jn(U.type, d, U.config, F);
      return !ei(U.comparator || gr.equal, H, U.value);
    } catch (H) {
      return console.error(H), !1;
    }
  }, N)), N;
}, In = (j, F) => (d, N) => {
  let q = 0;
  return j.sort && j.sort.find((D) => {
    const $ = jn(D.type, d, D.config, F), J = jn(D.type, N, D.config, F);
    return q = ei(D.comparator || Ft.ascending, $, J), q;
  }), q;
};
function Iv(j) {
  return Object.values(gr).includes(j);
}
function jv(j) {
  return Object.values(Ft).includes(j);
}
const ei = (j, F, d) => {
  const N = parseFloat(F), q = parseFloat(d), D = String(F), $ = String(d), [J, W] = isNaN(N) || isNaN(q) ? [D, $] : [N, q];
  if (jv(j))
    switch (j) {
      case Ft.ascending:
        return J > W ? 1 : J < W ? -1 : 0;
      case Ft.descending:
        return J < W ? 1 : J > W ? -1 : 0;
    }
  if (Iv(j))
    switch (j) {
      case gr.equal:
        return F == d;
      case gr.match:
        return F ? new RegExp($).test(D) : !1;
      case gr.in:
        return Array.isArray(d) ? d.includes(F) : (console.warn("Cannot compare. Value must be array."), !1);
      case gr.greater_than:
        return isNaN(N) || isNaN(q) ? (console.warn("Cannot compare. One or more values are not numeric"), !1) : N > q;
      case gr.lower_than:
        return isNaN(N) || isNaN(q) ? (console.warn("Cannot compare. One or more values are not numeric"), !1) : N < q;
      case gr.is_null:
        return !!F;
      case gr.is_numeric:
        return !isNaN(N);
    }
  throw Error(`comparator '${j}' not implement`);
}, yr = (j) => "floor_id" in j, jn = (j, F, d, N) => {
  var q, D, $;
  switch (j) {
    case qe.entity:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return F.entity_id;
    case qe.domain:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return F.entity_id.split(".")[0];
    case qe.area:
      const U = !yr(F) && F.device_id ? (q = N.devices[F.device_id]) == null ? void 0 : q.area_id : void 0;
      return F.area_id || U || void 0;
    case qe.floor:
      if (!yr(F))
        throw Error(`valueType '${j}' not supported for entities`);
      return F.floor_id || void 0;
    case qe.device:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return F.device_id || void 0;
    case qe.integration:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return F.platform;
    case qe.label:
      const ie = F.labels;
      return (/* @__PURE__ */ (() => {
        const w = (I) => (I.key === void 0 || typeof I.key == "string") && typeof I.label == "string";
        return (I) => typeof I == "object" && I !== null && w(I);
      })())(d) && ie.find((w) => new RegExp(d.label).test(w)) || void 0;
    case qe.state:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return (D = N.states[F.entity_id]) == null ? void 0 : D.state;
    case qe.attribute:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      const Q = ($ = N.states[F.entity_id]) == null ? void 0 : $.attributes;
      if ((/* @__PURE__ */ (() => {
        const w = (I) => (I.label === void 0 || typeof I.label == "string") && typeof I.key == "string";
        return (I) => typeof I == "object" && I !== null && w(I);
      })())(d)) {
        if (Q && Q.hasOwnProperty(d.key))
          return Q[d.key];
        console.warn(`'${d.key}' does not exist on '${F.entity_id}'`);
        return;
      } else {
        console.warn("value is not defined correctly");
        return;
      }
    case qe.disabled_by:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return F.disabled_by || void 0;
    case qe.hidden_by:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return F.hidden_by || void 0;
    case qe.entity_category:
      if (yr(F))
        throw Error(`valueType '${j}' not supported for areas`);
      return F.entity_category || void 0;
  }
};
var Tt = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var Tv = Tt.exports, Pc;
function Wv() {
  return Pc || (Pc = 1, function(j, F) {
    (function() {
      var d, N = "4.17.21", q = 200, D = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", $ = "Expected a function", J = "Invalid `variable` option passed into `_.template`", W = "__lodash_hash_undefined__", U = 500, H = "__lodash_placeholder__", K = 1, te = 2, ie = 4, re = 1, Q = 2, X = 1, g = 2, i = 4, w = 8, I = 16, M = 32, se = 64, pe = 128, Ee = 256, be = 512, ke = 30, je = "...", Be = 800, He = 16, Te = 1, k = 2, m = 3, T = 1 / 0, x = 9007199254740991, c = 17976931348623157e292, a = NaN, y = 4294967295, u = y - 1, o = y >>> 1, _ = [
        ["ary", pe],
        ["bind", X],
        ["bindKey", g],
        ["curry", w],
        ["curryRight", I],
        ["flip", be],
        ["partial", M],
        ["partialRight", se],
        ["rearg", Ee]
      ], p = "[object Arguments]", L = "[object Array]", le = "[object AsyncFunction]", Ar = "[object Boolean]", st = "[object Date]", Gc = "[object DOMException]", Pt = "[object Error]", Dt = "[object Function]", oi = "[object GeneratorFunction]", cr = "[object Map]", lt = "[object Number]", qc = "[object Null]", br = "[object Object]", ii = "[object Promise]", kc = "[object Proxy]", dt = "[object RegExp]", fr = "[object Set]", ut = "[object String]", $t = "[object Symbol]", Hc = "[object Undefined]", yt = "[object WeakMap]", zc = "[object WeakSet]", gt = "[object ArrayBuffer]", Zr = "[object DataView]", Tn = "[object Float32Array]", Wn = "[object Float64Array]", Fn = "[object Int8Array]", Bn = "[object Int16Array]", Mn = "[object Int32Array]", Pn = "[object Uint8Array]", Dn = "[object Uint8ClampedArray]", $n = "[object Uint16Array]", Un = "[object Uint32Array]", Kc = /\b__p \+= '';/g, Zc = /\b(__p \+=) '' \+/g, Yc = /(__e\(.*?\)|\b__t\)) \+\n'';/g, ai = /&(?:amp|lt|gt|quot|#39);/g, ci = /[&<>"']/g, Jc = RegExp(ai.source), Xc = RegExp(ci.source), Vc = /<%-([\s\S]+?)%>/g, Qc = /<%([\s\S]+?)%>/g, fi = /<%=([\s\S]+?)%>/g, ef = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, rf = /^\w*$/, tf = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Nn = /[\\^$.*+?()[\]{}|]/g, nf = RegExp(Nn.source), Gn = /^\s+/, of = /\s/, af = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, cf = /\{\n\/\* \[wrapped with (.+)\] \*/, ff = /,? & /, sf = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, lf = /[()=,{}\[\]\/\s]/, df = /\\(\\)?/g, uf = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, si = /\w*$/, yf = /^[-+]0x[0-9a-f]+$/i, gf = /^0b[01]+$/i, vf = /^\[object .+?Constructor\]$/, hf = /^0o[0-7]+$/i, _f = /^(?:0|[1-9]\d*)$/, mf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ut = /($^)/, Af = /['\n\r\u2028\u2029\\]/g, Nt = "\\ud800-\\udfff", bf = "\\u0300-\\u036f", wf = "\\ufe20-\\ufe2f", xf = "\\u20d0-\\u20ff", li = bf + wf + xf, di = "\\u2700-\\u27bf", ui = "a-z\\xdf-\\xf6\\xf8-\\xff", Cf = "\\xac\\xb1\\xd7\\xf7", pf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Sf = "\\u2000-\\u206f", Of = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", yi = "A-Z\\xc0-\\xd6\\xd8-\\xde", gi = "\\ufe0e\\ufe0f", vi = Cf + pf + Sf + Of, qn = "['’]", Rf = "[" + Nt + "]", hi = "[" + vi + "]", Gt = "[" + li + "]", _i = "\\d+", Ef = "[" + di + "]", mi = "[" + ui + "]", Ai = "[^" + Nt + vi + _i + di + ui + yi + "]", kn = "\\ud83c[\\udffb-\\udfff]", Lf = "(?:" + Gt + "|" + kn + ")", bi = "[^" + Nt + "]", Hn = "(?:\\ud83c[\\udde6-\\uddff]){2}", zn = "[\\ud800-\\udbff][\\udc00-\\udfff]", Yr = "[" + yi + "]", wi = "\\u200d", xi = "(?:" + mi + "|" + Ai + ")", If = "(?:" + Yr + "|" + Ai + ")", Ci = "(?:" + qn + "(?:d|ll|m|re|s|t|ve))?", pi = "(?:" + qn + "(?:D|LL|M|RE|S|T|VE))?", Si = Lf + "?", Oi = "[" + gi + "]?", jf = "(?:" + wi + "(?:" + [bi, Hn, zn].join("|") + ")" + Oi + Si + ")*", Tf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Wf = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Ri = Oi + Si + jf, Ff = "(?:" + [Ef, Hn, zn].join("|") + ")" + Ri, Bf = "(?:" + [bi + Gt + "?", Gt, Hn, zn, Rf].join("|") + ")", Mf = RegExp(qn, "g"), Pf = RegExp(Gt, "g"), Kn = RegExp(kn + "(?=" + kn + ")|" + Bf + Ri, "g"), Df = RegExp([
        Yr + "?" + mi + "+" + Ci + "(?=" + [hi, Yr, "$"].join("|") + ")",
        If + "+" + pi + "(?=" + [hi, Yr + xi, "$"].join("|") + ")",
        Yr + "?" + xi + "+" + Ci,
        Yr + "+" + pi,
        Wf,
        Tf,
        _i,
        Ff
      ].join("|"), "g"), $f = RegExp("[" + wi + Nt + li + gi + "]"), Uf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Nf = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ], Gf = -1, _e = {};
      _e[Tn] = _e[Wn] = _e[Fn] = _e[Bn] = _e[Mn] = _e[Pn] = _e[Dn] = _e[$n] = _e[Un] = !0, _e[p] = _e[L] = _e[gt] = _e[Ar] = _e[Zr] = _e[st] = _e[Pt] = _e[Dt] = _e[cr] = _e[lt] = _e[br] = _e[dt] = _e[fr] = _e[ut] = _e[yt] = !1;
      var he = {};
      he[p] = he[L] = he[gt] = he[Zr] = he[Ar] = he[st] = he[Tn] = he[Wn] = he[Fn] = he[Bn] = he[Mn] = he[cr] = he[lt] = he[br] = he[dt] = he[fr] = he[ut] = he[$t] = he[Pn] = he[Dn] = he[$n] = he[Un] = !0, he[Pt] = he[Dt] = he[yt] = !1;
      var qf = {
        // Latin-1 Supplement block.
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        // Latin Extended-A block.
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s"
      }, kf = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, Hf = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, zf = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, Kf = parseFloat, Zf = parseInt, Ei = typeof Ln == "object" && Ln && Ln.Object === Object && Ln, Yf = typeof self == "object" && self && self.Object === Object && self, Le = Ei || Yf || Function("return this")(), Zn = F && !F.nodeType && F, $r = Zn && !0 && j && !j.nodeType && j, Li = $r && $r.exports === Zn, Yn = Li && Ei.process, Ve = function() {
        try {
          var A = $r && $r.require && $r.require("util").types;
          return A || Yn && Yn.binding && Yn.binding("util");
        } catch {
        }
      }(), Ii = Ve && Ve.isArrayBuffer, ji = Ve && Ve.isDate, Ti = Ve && Ve.isMap, Wi = Ve && Ve.isRegExp, Fi = Ve && Ve.isSet, Bi = Ve && Ve.isTypedArray;
      function ze(A, S, C) {
        switch (C.length) {
          case 0:
            return A.call(S);
          case 1:
            return A.call(S, C[0]);
          case 2:
            return A.call(S, C[0], C[1]);
          case 3:
            return A.call(S, C[0], C[1], C[2]);
        }
        return A.apply(S, C);
      }
      function Jf(A, S, C, P) {
        for (var V = -1, ue = A == null ? 0 : A.length; ++V < ue; ) {
          var Se = A[V];
          S(P, Se, C(Se), A);
        }
        return P;
      }
      function Qe(A, S) {
        for (var C = -1, P = A == null ? 0 : A.length; ++C < P && S(A[C], C, A) !== !1; )
          ;
        return A;
      }
      function Xf(A, S) {
        for (var C = A == null ? 0 : A.length; C-- && S(A[C], C, A) !== !1; )
          ;
        return A;
      }
      function Mi(A, S) {
        for (var C = -1, P = A == null ? 0 : A.length; ++C < P; )
          if (!S(A[C], C, A))
            return !1;
        return !0;
      }
      function Ir(A, S) {
        for (var C = -1, P = A == null ? 0 : A.length, V = 0, ue = []; ++C < P; ) {
          var Se = A[C];
          S(Se, C, A) && (ue[V++] = Se);
        }
        return ue;
      }
      function qt(A, S) {
        var C = A == null ? 0 : A.length;
        return !!C && Jr(A, S, 0) > -1;
      }
      function Jn(A, S, C) {
        for (var P = -1, V = A == null ? 0 : A.length; ++P < V; )
          if (C(S, A[P]))
            return !0;
        return !1;
      }
      function me(A, S) {
        for (var C = -1, P = A == null ? 0 : A.length, V = Array(P); ++C < P; )
          V[C] = S(A[C], C, A);
        return V;
      }
      function jr(A, S) {
        for (var C = -1, P = S.length, V = A.length; ++C < P; )
          A[V + C] = S[C];
        return A;
      }
      function Xn(A, S, C, P) {
        var V = -1, ue = A == null ? 0 : A.length;
        for (P && ue && (C = A[++V]); ++V < ue; )
          C = S(C, A[V], V, A);
        return C;
      }
      function Vf(A, S, C, P) {
        var V = A == null ? 0 : A.length;
        for (P && V && (C = A[--V]); V--; )
          C = S(C, A[V], V, A);
        return C;
      }
      function Vn(A, S) {
        for (var C = -1, P = A == null ? 0 : A.length; ++C < P; )
          if (S(A[C], C, A))
            return !0;
        return !1;
      }
      var Qf = Qn("length");
      function es(A) {
        return A.split("");
      }
      function rs(A) {
        return A.match(sf) || [];
      }
      function Pi(A, S, C) {
        var P;
        return C(A, function(V, ue, Se) {
          if (S(V, ue, Se))
            return P = ue, !1;
        }), P;
      }
      function kt(A, S, C, P) {
        for (var V = A.length, ue = C + (P ? 1 : -1); P ? ue-- : ++ue < V; )
          if (S(A[ue], ue, A))
            return ue;
        return -1;
      }
      function Jr(A, S, C) {
        return S === S ? ys(A, S, C) : kt(A, Di, C);
      }
      function ts(A, S, C, P) {
        for (var V = C - 1, ue = A.length; ++V < ue; )
          if (P(A[V], S))
            return V;
        return -1;
      }
      function Di(A) {
        return A !== A;
      }
      function $i(A, S) {
        var C = A == null ? 0 : A.length;
        return C ? ro(A, S) / C : a;
      }
      function Qn(A) {
        return function(S) {
          return S == null ? d : S[A];
        };
      }
      function eo(A) {
        return function(S) {
          return A == null ? d : A[S];
        };
      }
      function Ui(A, S, C, P, V) {
        return V(A, function(ue, Se, ve) {
          C = P ? (P = !1, ue) : S(C, ue, Se, ve);
        }), C;
      }
      function ns(A, S) {
        var C = A.length;
        for (A.sort(S); C--; )
          A[C] = A[C].value;
        return A;
      }
      function ro(A, S) {
        for (var C, P = -1, V = A.length; ++P < V; ) {
          var ue = S(A[P]);
          ue !== d && (C = C === d ? ue : C + ue);
        }
        return C;
      }
      function to(A, S) {
        for (var C = -1, P = Array(A); ++C < A; )
          P[C] = S(C);
        return P;
      }
      function os(A, S) {
        return me(S, function(C) {
          return [C, A[C]];
        });
      }
      function Ni(A) {
        return A && A.slice(0, Hi(A) + 1).replace(Gn, "");
      }
      function Ke(A) {
        return function(S) {
          return A(S);
        };
      }
      function no(A, S) {
        return me(S, function(C) {
          return A[C];
        });
      }
      function vt(A, S) {
        return A.has(S);
      }
      function Gi(A, S) {
        for (var C = -1, P = A.length; ++C < P && Jr(S, A[C], 0) > -1; )
          ;
        return C;
      }
      function qi(A, S) {
        for (var C = A.length; C-- && Jr(S, A[C], 0) > -1; )
          ;
        return C;
      }
      function is(A, S) {
        for (var C = A.length, P = 0; C--; )
          A[C] === S && ++P;
        return P;
      }
      var as = eo(qf), cs = eo(kf);
      function fs(A) {
        return "\\" + zf[A];
      }
      function ss(A, S) {
        return A == null ? d : A[S];
      }
      function Xr(A) {
        return $f.test(A);
      }
      function ls(A) {
        return Uf.test(A);
      }
      function ds(A) {
        for (var S, C = []; !(S = A.next()).done; )
          C.push(S.value);
        return C;
      }
      function oo(A) {
        var S = -1, C = Array(A.size);
        return A.forEach(function(P, V) {
          C[++S] = [V, P];
        }), C;
      }
      function ki(A, S) {
        return function(C) {
          return A(S(C));
        };
      }
      function Tr(A, S) {
        for (var C = -1, P = A.length, V = 0, ue = []; ++C < P; ) {
          var Se = A[C];
          (Se === S || Se === H) && (A[C] = H, ue[V++] = C);
        }
        return ue;
      }
      function Ht(A) {
        var S = -1, C = Array(A.size);
        return A.forEach(function(P) {
          C[++S] = P;
        }), C;
      }
      function us(A) {
        var S = -1, C = Array(A.size);
        return A.forEach(function(P) {
          C[++S] = [P, P];
        }), C;
      }
      function ys(A, S, C) {
        for (var P = C - 1, V = A.length; ++P < V; )
          if (A[P] === S)
            return P;
        return -1;
      }
      function gs(A, S, C) {
        for (var P = C + 1; P--; )
          if (A[P] === S)
            return P;
        return P;
      }
      function Vr(A) {
        return Xr(A) ? hs(A) : Qf(A);
      }
      function sr(A) {
        return Xr(A) ? _s(A) : es(A);
      }
      function Hi(A) {
        for (var S = A.length; S-- && of.test(A.charAt(S)); )
          ;
        return S;
      }
      var vs = eo(Hf);
      function hs(A) {
        for (var S = Kn.lastIndex = 0; Kn.test(A); )
          ++S;
        return S;
      }
      function _s(A) {
        return A.match(Kn) || [];
      }
      function ms(A) {
        return A.match(Df) || [];
      }
      var As = function A(S) {
        S = S == null ? Le : Qr.defaults(Le.Object(), S, Qr.pick(Le, Nf));
        var C = S.Array, P = S.Date, V = S.Error, ue = S.Function, Se = S.Math, ve = S.Object, io = S.RegExp, bs = S.String, er = S.TypeError, zt = C.prototype, ws = ue.prototype, et = ve.prototype, Kt = S["__core-js_shared__"], Zt = ws.toString, ge = et.hasOwnProperty, xs = 0, zi = function() {
          var e = /[^.]+$/.exec(Kt && Kt.keys && Kt.keys.IE_PROTO || "");
          return e ? "Symbol(src)_1." + e : "";
        }(), Yt = et.toString, Cs = Zt.call(ve), ps = Le._, Ss = io(
          "^" + Zt.call(ge).replace(Nn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Jt = Li ? S.Buffer : d, Wr = S.Symbol, Xt = S.Uint8Array, Ki = Jt ? Jt.allocUnsafe : d, Vt = ki(ve.getPrototypeOf, ve), Zi = ve.create, Yi = et.propertyIsEnumerable, Qt = zt.splice, Ji = Wr ? Wr.isConcatSpreadable : d, ht = Wr ? Wr.iterator : d, Ur = Wr ? Wr.toStringTag : d, en = function() {
          try {
            var e = Hr(ve, "defineProperty");
            return e({}, "", {}), e;
          } catch {
          }
        }(), Os = S.clearTimeout !== Le.clearTimeout && S.clearTimeout, Rs = P && P.now !== Le.Date.now && P.now, Es = S.setTimeout !== Le.setTimeout && S.setTimeout, rn = Se.ceil, tn = Se.floor, ao = ve.getOwnPropertySymbols, Ls = Jt ? Jt.isBuffer : d, Xi = S.isFinite, Is = zt.join, js = ki(ve.keys, ve), Oe = Se.max, We = Se.min, Ts = P.now, Ws = S.parseInt, Vi = Se.random, Fs = zt.reverse, co = Hr(S, "DataView"), _t = Hr(S, "Map"), fo = Hr(S, "Promise"), rt = Hr(S, "Set"), mt = Hr(S, "WeakMap"), At = Hr(ve, "create"), nn = mt && new mt(), tt = {}, Bs = zr(co), Ms = zr(_t), Ps = zr(fo), Ds = zr(rt), $s = zr(mt), on = Wr ? Wr.prototype : d, bt = on ? on.valueOf : d, Qi = on ? on.toString : d;
        function s(e) {
          if (we(e) && !ee(e) && !(e instanceof fe)) {
            if (e instanceof rr)
              return e;
            if (ge.call(e, "__wrapped__"))
              return ec(e);
          }
          return new rr(e);
        }
        var nt = /* @__PURE__ */ function() {
          function e() {
          }
          return function(r) {
            if (!Ae(r))
              return {};
            if (Zi)
              return Zi(r);
            e.prototype = r;
            var t = new e();
            return e.prototype = d, t;
          };
        }();
        function an() {
        }
        function rr(e, r) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!r, this.__index__ = 0, this.__values__ = d;
        }
        s.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: Vc,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: Qc,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: fi,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          variable: "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          imports: {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            _: s
          }
        }, s.prototype = an.prototype, s.prototype.constructor = s, rr.prototype = nt(an.prototype), rr.prototype.constructor = rr;
        function fe(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = y, this.__views__ = [];
        }
        function Us() {
          var e = new fe(this.__wrapped__);
          return e.__actions__ = $e(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = $e(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = $e(this.__views__), e;
        }
        function Ns() {
          if (this.__filtered__) {
            var e = new fe(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else
            e = this.clone(), e.__dir__ *= -1;
          return e;
        }
        function Gs() {
          var e = this.__wrapped__.value(), r = this.__dir__, t = ee(e), n = r < 0, f = t ? e.length : 0, l = ed(0, f, this.__views__), v = l.start, h = l.end, b = h - v, O = n ? h : v - 1, R = this.__iteratees__, E = R.length, B = 0, G = We(b, this.__takeCount__);
          if (!t || !n && f == b && G == b)
            return Ca(e, this.__actions__);
          var Z = [];
          e:
            for (; b-- && B < G; ) {
              O += r;
              for (var oe = -1, Y = e[O]; ++oe < E; ) {
                var ce = R[oe], de = ce.iteratee, Je = ce.type, De = de(Y);
                if (Je == k)
                  Y = De;
                else if (!De) {
                  if (Je == Te)
                    continue e;
                  break e;
                }
              }
              Z[B++] = Y;
            }
          return Z;
        }
        fe.prototype = nt(an.prototype), fe.prototype.constructor = fe;
        function Nr(e) {
          var r = -1, t = e == null ? 0 : e.length;
          for (this.clear(); ++r < t; ) {
            var n = e[r];
            this.set(n[0], n[1]);
          }
        }
        function qs() {
          this.__data__ = At ? At(null) : {}, this.size = 0;
        }
        function ks(e) {
          var r = this.has(e) && delete this.__data__[e];
          return this.size -= r ? 1 : 0, r;
        }
        function Hs(e) {
          var r = this.__data__;
          if (At) {
            var t = r[e];
            return t === W ? d : t;
          }
          return ge.call(r, e) ? r[e] : d;
        }
        function zs(e) {
          var r = this.__data__;
          return At ? r[e] !== d : ge.call(r, e);
        }
        function Ks(e, r) {
          var t = this.__data__;
          return this.size += this.has(e) ? 0 : 1, t[e] = At && r === d ? W : r, this;
        }
        Nr.prototype.clear = qs, Nr.prototype.delete = ks, Nr.prototype.get = Hs, Nr.prototype.has = zs, Nr.prototype.set = Ks;
        function wr(e) {
          var r = -1, t = e == null ? 0 : e.length;
          for (this.clear(); ++r < t; ) {
            var n = e[r];
            this.set(n[0], n[1]);
          }
        }
        function Zs() {
          this.__data__ = [], this.size = 0;
        }
        function Ys(e) {
          var r = this.__data__, t = cn(r, e);
          if (t < 0)
            return !1;
          var n = r.length - 1;
          return t == n ? r.pop() : Qt.call(r, t, 1), --this.size, !0;
        }
        function Js(e) {
          var r = this.__data__, t = cn(r, e);
          return t < 0 ? d : r[t][1];
        }
        function Xs(e) {
          return cn(this.__data__, e) > -1;
        }
        function Vs(e, r) {
          var t = this.__data__, n = cn(t, e);
          return n < 0 ? (++this.size, t.push([e, r])) : t[n][1] = r, this;
        }
        wr.prototype.clear = Zs, wr.prototype.delete = Ys, wr.prototype.get = Js, wr.prototype.has = Xs, wr.prototype.set = Vs;
        function xr(e) {
          var r = -1, t = e == null ? 0 : e.length;
          for (this.clear(); ++r < t; ) {
            var n = e[r];
            this.set(n[0], n[1]);
          }
        }
        function Qs() {
          this.size = 0, this.__data__ = {
            hash: new Nr(),
            map: new (_t || wr)(),
            string: new Nr()
          };
        }
        function el(e) {
          var r = An(this, e).delete(e);
          return this.size -= r ? 1 : 0, r;
        }
        function rl(e) {
          return An(this, e).get(e);
        }
        function tl(e) {
          return An(this, e).has(e);
        }
        function nl(e, r) {
          var t = An(this, e), n = t.size;
          return t.set(e, r), this.size += t.size == n ? 0 : 1, this;
        }
        xr.prototype.clear = Qs, xr.prototype.delete = el, xr.prototype.get = rl, xr.prototype.has = tl, xr.prototype.set = nl;
        function Gr(e) {
          var r = -1, t = e == null ? 0 : e.length;
          for (this.__data__ = new xr(); ++r < t; )
            this.add(e[r]);
        }
        function ol(e) {
          return this.__data__.set(e, W), this;
        }
        function il(e) {
          return this.__data__.has(e);
        }
        Gr.prototype.add = Gr.prototype.push = ol, Gr.prototype.has = il;
        function lr(e) {
          var r = this.__data__ = new wr(e);
          this.size = r.size;
        }
        function al() {
          this.__data__ = new wr(), this.size = 0;
        }
        function cl(e) {
          var r = this.__data__, t = r.delete(e);
          return this.size = r.size, t;
        }
        function fl(e) {
          return this.__data__.get(e);
        }
        function sl(e) {
          return this.__data__.has(e);
        }
        function ll(e, r) {
          var t = this.__data__;
          if (t instanceof wr) {
            var n = t.__data__;
            if (!_t || n.length < q - 1)
              return n.push([e, r]), this.size = ++t.size, this;
            t = this.__data__ = new xr(n);
          }
          return t.set(e, r), this.size = t.size, this;
        }
        lr.prototype.clear = al, lr.prototype.delete = cl, lr.prototype.get = fl, lr.prototype.has = sl, lr.prototype.set = ll;
        function ea(e, r) {
          var t = ee(e), n = !t && Kr(e), f = !t && !n && Dr(e), l = !t && !n && !f && ct(e), v = t || n || f || l, h = v ? to(e.length, bs) : [], b = h.length;
          for (var O in e)
            (r || ge.call(e, O)) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
            (O == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            f && (O == "offset" || O == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            l && (O == "buffer" || O == "byteLength" || O == "byteOffset") || // Skip index properties.
            Or(O, b))) && h.push(O);
          return h;
        }
        function ra(e) {
          var r = e.length;
          return r ? e[bo(0, r - 1)] : d;
        }
        function dl(e, r) {
          return bn($e(e), qr(r, 0, e.length));
        }
        function ul(e) {
          return bn($e(e));
        }
        function so(e, r, t) {
          (t !== d && !dr(e[r], t) || t === d && !(r in e)) && Cr(e, r, t);
        }
        function wt(e, r, t) {
          var n = e[r];
          (!(ge.call(e, r) && dr(n, t)) || t === d && !(r in e)) && Cr(e, r, t);
        }
        function cn(e, r) {
          for (var t = e.length; t--; )
            if (dr(e[t][0], r))
              return t;
          return -1;
        }
        function yl(e, r, t, n) {
          return Fr(e, function(f, l, v) {
            r(n, f, t(f), v);
          }), n;
        }
        function ta(e, r) {
          return e && _r(r, Re(r), e);
        }
        function gl(e, r) {
          return e && _r(r, Ne(r), e);
        }
        function Cr(e, r, t) {
          r == "__proto__" && en ? en(e, r, {
            configurable: !0,
            enumerable: !0,
            value: t,
            writable: !0
          }) : e[r] = t;
        }
        function lo(e, r) {
          for (var t = -1, n = r.length, f = C(n), l = e == null; ++t < n; )
            f[t] = l ? d : Ho(e, r[t]);
          return f;
        }
        function qr(e, r, t) {
          return e === e && (t !== d && (e = e <= t ? e : t), r !== d && (e = e >= r ? e : r)), e;
        }
        function tr(e, r, t, n, f, l) {
          var v, h = r & K, b = r & te, O = r & ie;
          if (t && (v = f ? t(e, n, f, l) : t(e)), v !== d)
            return v;
          if (!Ae(e))
            return e;
          var R = ee(e);
          if (R) {
            if (v = td(e), !h)
              return $e(e, v);
          } else {
            var E = Fe(e), B = E == Dt || E == oi;
            if (Dr(e))
              return Oa(e, h);
            if (E == br || E == p || B && !f) {
              if (v = b || B ? {} : Ha(e), !h)
                return b ? Hl(e, gl(v, e)) : kl(e, ta(v, e));
            } else {
              if (!he[E])
                return f ? e : {};
              v = nd(e, E, h);
            }
          }
          l || (l = new lr());
          var G = l.get(e);
          if (G)
            return G;
          l.set(e, v), bc(e) ? e.forEach(function(Y) {
            v.add(tr(Y, r, t, Y, e, l));
          }) : mc(e) && e.forEach(function(Y, ce) {
            v.set(ce, tr(Y, r, t, ce, e, l));
          });
          var Z = O ? b ? jo : Io : b ? Ne : Re, oe = R ? d : Z(e);
          return Qe(oe || e, function(Y, ce) {
            oe && (ce = Y, Y = e[ce]), wt(v, ce, tr(Y, r, t, ce, e, l));
          }), v;
        }
        function vl(e) {
          var r = Re(e);
          return function(t) {
            return na(t, e, r);
          };
        }
        function na(e, r, t) {
          var n = t.length;
          if (e == null)
            return !n;
          for (e = ve(e); n--; ) {
            var f = t[n], l = r[f], v = e[f];
            if (v === d && !(f in e) || !l(v))
              return !1;
          }
          return !0;
        }
        function oa(e, r, t) {
          if (typeof e != "function")
            throw new er($);
          return Et(function() {
            e.apply(d, t);
          }, r);
        }
        function xt(e, r, t, n) {
          var f = -1, l = qt, v = !0, h = e.length, b = [], O = r.length;
          if (!h)
            return b;
          t && (r = me(r, Ke(t))), n ? (l = Jn, v = !1) : r.length >= q && (l = vt, v = !1, r = new Gr(r));
          e:
            for (; ++f < h; ) {
              var R = e[f], E = t == null ? R : t(R);
              if (R = n || R !== 0 ? R : 0, v && E === E) {
                for (var B = O; B--; )
                  if (r[B] === E)
                    continue e;
                b.push(R);
              } else l(r, E, n) || b.push(R);
            }
          return b;
        }
        var Fr = ja(hr), ia = ja(yo, !0);
        function hl(e, r) {
          var t = !0;
          return Fr(e, function(n, f, l) {
            return t = !!r(n, f, l), t;
          }), t;
        }
        function fn(e, r, t) {
          for (var n = -1, f = e.length; ++n < f; ) {
            var l = e[n], v = r(l);
            if (v != null && (h === d ? v === v && !Ye(v) : t(v, h)))
              var h = v, b = l;
          }
          return b;
        }
        function _l(e, r, t, n) {
          var f = e.length;
          for (t = ne(t), t < 0 && (t = -t > f ? 0 : f + t), n = n === d || n > f ? f : ne(n), n < 0 && (n += f), n = t > n ? 0 : xc(n); t < n; )
            e[t++] = r;
          return e;
        }
        function aa(e, r) {
          var t = [];
          return Fr(e, function(n, f, l) {
            r(n, f, l) && t.push(n);
          }), t;
        }
        function Ie(e, r, t, n, f) {
          var l = -1, v = e.length;
          for (t || (t = id), f || (f = []); ++l < v; ) {
            var h = e[l];
            r > 0 && t(h) ? r > 1 ? Ie(h, r - 1, t, n, f) : jr(f, h) : n || (f[f.length] = h);
          }
          return f;
        }
        var uo = Ta(), ca = Ta(!0);
        function hr(e, r) {
          return e && uo(e, r, Re);
        }
        function yo(e, r) {
          return e && ca(e, r, Re);
        }
        function sn(e, r) {
          return Ir(r, function(t) {
            return Rr(e[t]);
          });
        }
        function kr(e, r) {
          r = Mr(r, e);
          for (var t = 0, n = r.length; e != null && t < n; )
            e = e[mr(r[t++])];
          return t && t == n ? e : d;
        }
        function fa(e, r, t) {
          var n = r(e);
          return ee(e) ? n : jr(n, t(e));
        }
        function Me(e) {
          return e == null ? e === d ? Hc : qc : Ur && Ur in ve(e) ? Ql(e) : ud(e);
        }
        function go(e, r) {
          return e > r;
        }
        function ml(e, r) {
          return e != null && ge.call(e, r);
        }
        function Al(e, r) {
          return e != null && r in ve(e);
        }
        function bl(e, r, t) {
          return e >= We(r, t) && e < Oe(r, t);
        }
        function vo(e, r, t) {
          for (var n = t ? Jn : qt, f = e[0].length, l = e.length, v = l, h = C(l), b = 1 / 0, O = []; v--; ) {
            var R = e[v];
            v && r && (R = me(R, Ke(r))), b = We(R.length, b), h[v] = !t && (r || f >= 120 && R.length >= 120) ? new Gr(v && R) : d;
          }
          R = e[0];
          var E = -1, B = h[0];
          e:
            for (; ++E < f && O.length < b; ) {
              var G = R[E], Z = r ? r(G) : G;
              if (G = t || G !== 0 ? G : 0, !(B ? vt(B, Z) : n(O, Z, t))) {
                for (v = l; --v; ) {
                  var oe = h[v];
                  if (!(oe ? vt(oe, Z) : n(e[v], Z, t)))
                    continue e;
                }
                B && B.push(Z), O.push(G);
              }
            }
          return O;
        }
        function wl(e, r, t, n) {
          return hr(e, function(f, l, v) {
            r(n, t(f), l, v);
          }), n;
        }
        function Ct(e, r, t) {
          r = Mr(r, e), e = Ya(e, r);
          var n = e == null ? e : e[mr(or(r))];
          return n == null ? d : ze(n, e, t);
        }
        function sa(e) {
          return we(e) && Me(e) == p;
        }
        function xl(e) {
          return we(e) && Me(e) == gt;
        }
        function Cl(e) {
          return we(e) && Me(e) == st;
        }
        function pt(e, r, t, n, f) {
          return e === r ? !0 : e == null || r == null || !we(e) && !we(r) ? e !== e && r !== r : pl(e, r, t, n, pt, f);
        }
        function pl(e, r, t, n, f, l) {
          var v = ee(e), h = ee(r), b = v ? L : Fe(e), O = h ? L : Fe(r);
          b = b == p ? br : b, O = O == p ? br : O;
          var R = b == br, E = O == br, B = b == O;
          if (B && Dr(e)) {
            if (!Dr(r))
              return !1;
            v = !0, R = !1;
          }
          if (B && !R)
            return l || (l = new lr()), v || ct(e) ? Ga(e, r, t, n, f, l) : Xl(e, r, b, t, n, f, l);
          if (!(t & re)) {
            var G = R && ge.call(e, "__wrapped__"), Z = E && ge.call(r, "__wrapped__");
            if (G || Z) {
              var oe = G ? e.value() : e, Y = Z ? r.value() : r;
              return l || (l = new lr()), f(oe, Y, t, n, l);
            }
          }
          return B ? (l || (l = new lr()), Vl(e, r, t, n, f, l)) : !1;
        }
        function Sl(e) {
          return we(e) && Fe(e) == cr;
        }
        function ho(e, r, t, n) {
          var f = t.length, l = f, v = !n;
          if (e == null)
            return !l;
          for (e = ve(e); f--; ) {
            var h = t[f];
            if (v && h[2] ? h[1] !== e[h[0]] : !(h[0] in e))
              return !1;
          }
          for (; ++f < l; ) {
            h = t[f];
            var b = h[0], O = e[b], R = h[1];
            if (v && h[2]) {
              if (O === d && !(b in e))
                return !1;
            } else {
              var E = new lr();
              if (n)
                var B = n(O, R, b, e, r, E);
              if (!(B === d ? pt(R, O, re | Q, n, E) : B))
                return !1;
            }
          }
          return !0;
        }
        function la(e) {
          if (!Ae(e) || cd(e))
            return !1;
          var r = Rr(e) ? Ss : vf;
          return r.test(zr(e));
        }
        function Ol(e) {
          return we(e) && Me(e) == dt;
        }
        function Rl(e) {
          return we(e) && Fe(e) == fr;
        }
        function El(e) {
          return we(e) && On(e.length) && !!_e[Me(e)];
        }
        function da(e) {
          return typeof e == "function" ? e : e == null ? Ge : typeof e == "object" ? ee(e) ? ga(e[0], e[1]) : ya(e) : Wc(e);
        }
        function _o(e) {
          if (!Rt(e))
            return js(e);
          var r = [];
          for (var t in ve(e))
            ge.call(e, t) && t != "constructor" && r.push(t);
          return r;
        }
        function Ll(e) {
          if (!Ae(e))
            return dd(e);
          var r = Rt(e), t = [];
          for (var n in e)
            n == "constructor" && (r || !ge.call(e, n)) || t.push(n);
          return t;
        }
        function mo(e, r) {
          return e < r;
        }
        function ua(e, r) {
          var t = -1, n = Ue(e) ? C(e.length) : [];
          return Fr(e, function(f, l, v) {
            n[++t] = r(f, l, v);
          }), n;
        }
        function ya(e) {
          var r = Wo(e);
          return r.length == 1 && r[0][2] ? Ka(r[0][0], r[0][1]) : function(t) {
            return t === e || ho(t, e, r);
          };
        }
        function ga(e, r) {
          return Bo(e) && za(r) ? Ka(mr(e), r) : function(t) {
            var n = Ho(t, e);
            return n === d && n === r ? zo(t, e) : pt(r, n, re | Q);
          };
        }
        function ln(e, r, t, n, f) {
          e !== r && uo(r, function(l, v) {
            if (f || (f = new lr()), Ae(l))
              Il(e, r, v, t, ln, n, f);
            else {
              var h = n ? n(Po(e, v), l, v + "", e, r, f) : d;
              h === d && (h = l), so(e, v, h);
            }
          }, Ne);
        }
        function Il(e, r, t, n, f, l, v) {
          var h = Po(e, t), b = Po(r, t), O = v.get(b);
          if (O) {
            so(e, t, O);
            return;
          }
          var R = l ? l(h, b, t + "", e, r, v) : d, E = R === d;
          if (E) {
            var B = ee(b), G = !B && Dr(b), Z = !B && !G && ct(b);
            R = b, B || G || Z ? ee(h) ? R = h : xe(h) ? R = $e(h) : G ? (E = !1, R = Oa(b, !0)) : Z ? (E = !1, R = Ra(b, !0)) : R = [] : Lt(b) || Kr(b) ? (R = h, Kr(h) ? R = Cc(h) : (!Ae(h) || Rr(h)) && (R = Ha(b))) : E = !1;
          }
          E && (v.set(b, R), f(R, b, n, l, v), v.delete(b)), so(e, t, R);
        }
        function va(e, r) {
          var t = e.length;
          if (t)
            return r += r < 0 ? t : 0, Or(r, t) ? e[r] : d;
        }
        function ha(e, r, t) {
          r.length ? r = me(r, function(l) {
            return ee(l) ? function(v) {
              return kr(v, l.length === 1 ? l[0] : l);
            } : l;
          }) : r = [Ge];
          var n = -1;
          r = me(r, Ke(z()));
          var f = ua(e, function(l, v, h) {
            var b = me(r, function(O) {
              return O(l);
            });
            return { criteria: b, index: ++n, value: l };
          });
          return ns(f, function(l, v) {
            return ql(l, v, t);
          });
        }
        function jl(e, r) {
          return _a(e, r, function(t, n) {
            return zo(e, n);
          });
        }
        function _a(e, r, t) {
          for (var n = -1, f = r.length, l = {}; ++n < f; ) {
            var v = r[n], h = kr(e, v);
            t(h, v) && St(l, Mr(v, e), h);
          }
          return l;
        }
        function Tl(e) {
          return function(r) {
            return kr(r, e);
          };
        }
        function Ao(e, r, t, n) {
          var f = n ? ts : Jr, l = -1, v = r.length, h = e;
          for (e === r && (r = $e(r)), t && (h = me(e, Ke(t))); ++l < v; )
            for (var b = 0, O = r[l], R = t ? t(O) : O; (b = f(h, R, b, n)) > -1; )
              h !== e && Qt.call(h, b, 1), Qt.call(e, b, 1);
          return e;
        }
        function ma(e, r) {
          for (var t = e ? r.length : 0, n = t - 1; t--; ) {
            var f = r[t];
            if (t == n || f !== l) {
              var l = f;
              Or(f) ? Qt.call(e, f, 1) : Co(e, f);
            }
          }
          return e;
        }
        function bo(e, r) {
          return e + tn(Vi() * (r - e + 1));
        }
        function Wl(e, r, t, n) {
          for (var f = -1, l = Oe(rn((r - e) / (t || 1)), 0), v = C(l); l--; )
            v[n ? l : ++f] = e, e += t;
          return v;
        }
        function wo(e, r) {
          var t = "";
          if (!e || r < 1 || r > x)
            return t;
          do
            r % 2 && (t += e), r = tn(r / 2), r && (e += e);
          while (r);
          return t;
        }
        function ae(e, r) {
          return Do(Za(e, r, Ge), e + "");
        }
        function Fl(e) {
          return ra(ft(e));
        }
        function Bl(e, r) {
          var t = ft(e);
          return bn(t, qr(r, 0, t.length));
        }
        function St(e, r, t, n) {
          if (!Ae(e))
            return e;
          r = Mr(r, e);
          for (var f = -1, l = r.length, v = l - 1, h = e; h != null && ++f < l; ) {
            var b = mr(r[f]), O = t;
            if (b === "__proto__" || b === "constructor" || b === "prototype")
              return e;
            if (f != v) {
              var R = h[b];
              O = n ? n(R, b, h) : d, O === d && (O = Ae(R) ? R : Or(r[f + 1]) ? [] : {});
            }
            wt(h, b, O), h = h[b];
          }
          return e;
        }
        var Aa = nn ? function(e, r) {
          return nn.set(e, r), e;
        } : Ge, Ml = en ? function(e, r) {
          return en(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Zo(r),
            writable: !0
          });
        } : Ge;
        function Pl(e) {
          return bn(ft(e));
        }
        function nr(e, r, t) {
          var n = -1, f = e.length;
          r < 0 && (r = -r > f ? 0 : f + r), t = t > f ? f : t, t < 0 && (t += f), f = r > t ? 0 : t - r >>> 0, r >>>= 0;
          for (var l = C(f); ++n < f; )
            l[n] = e[n + r];
          return l;
        }
        function Dl(e, r) {
          var t;
          return Fr(e, function(n, f, l) {
            return t = r(n, f, l), !t;
          }), !!t;
        }
        function dn(e, r, t) {
          var n = 0, f = e == null ? n : e.length;
          if (typeof r == "number" && r === r && f <= o) {
            for (; n < f; ) {
              var l = n + f >>> 1, v = e[l];
              v !== null && !Ye(v) && (t ? v <= r : v < r) ? n = l + 1 : f = l;
            }
            return f;
          }
          return xo(e, r, Ge, t);
        }
        function xo(e, r, t, n) {
          var f = 0, l = e == null ? 0 : e.length;
          if (l === 0)
            return 0;
          r = t(r);
          for (var v = r !== r, h = r === null, b = Ye(r), O = r === d; f < l; ) {
            var R = tn((f + l) / 2), E = t(e[R]), B = E !== d, G = E === null, Z = E === E, oe = Ye(E);
            if (v)
              var Y = n || Z;
            else O ? Y = Z && (n || B) : h ? Y = Z && B && (n || !G) : b ? Y = Z && B && !G && (n || !oe) : G || oe ? Y = !1 : Y = n ? E <= r : E < r;
            Y ? f = R + 1 : l = R;
          }
          return We(l, u);
        }
        function ba(e, r) {
          for (var t = -1, n = e.length, f = 0, l = []; ++t < n; ) {
            var v = e[t], h = r ? r(v) : v;
            if (!t || !dr(h, b)) {
              var b = h;
              l[f++] = v === 0 ? 0 : v;
            }
          }
          return l;
        }
        function wa(e) {
          return typeof e == "number" ? e : Ye(e) ? a : +e;
        }
        function Ze(e) {
          if (typeof e == "string")
            return e;
          if (ee(e))
            return me(e, Ze) + "";
          if (Ye(e))
            return Qi ? Qi.call(e) : "";
          var r = e + "";
          return r == "0" && 1 / e == -1 / 0 ? "-0" : r;
        }
        function Br(e, r, t) {
          var n = -1, f = qt, l = e.length, v = !0, h = [], b = h;
          if (t)
            v = !1, f = Jn;
          else if (l >= q) {
            var O = r ? null : Yl(e);
            if (O)
              return Ht(O);
            v = !1, f = vt, b = new Gr();
          } else
            b = r ? [] : h;
          e:
            for (; ++n < l; ) {
              var R = e[n], E = r ? r(R) : R;
              if (R = t || R !== 0 ? R : 0, v && E === E) {
                for (var B = b.length; B--; )
                  if (b[B] === E)
                    continue e;
                r && b.push(E), h.push(R);
              } else f(b, E, t) || (b !== h && b.push(E), h.push(R));
            }
          return h;
        }
        function Co(e, r) {
          return r = Mr(r, e), e = Ya(e, r), e == null || delete e[mr(or(r))];
        }
        function xa(e, r, t, n) {
          return St(e, r, t(kr(e, r)), n);
        }
        function un(e, r, t, n) {
          for (var f = e.length, l = n ? f : -1; (n ? l-- : ++l < f) && r(e[l], l, e); )
            ;
          return t ? nr(e, n ? 0 : l, n ? l + 1 : f) : nr(e, n ? l + 1 : 0, n ? f : l);
        }
        function Ca(e, r) {
          var t = e;
          return t instanceof fe && (t = t.value()), Xn(r, function(n, f) {
            return f.func.apply(f.thisArg, jr([n], f.args));
          }, t);
        }
        function po(e, r, t) {
          var n = e.length;
          if (n < 2)
            return n ? Br(e[0]) : [];
          for (var f = -1, l = C(n); ++f < n; )
            for (var v = e[f], h = -1; ++h < n; )
              h != f && (l[f] = xt(l[f] || v, e[h], r, t));
          return Br(Ie(l, 1), r, t);
        }
        function pa(e, r, t) {
          for (var n = -1, f = e.length, l = r.length, v = {}; ++n < f; ) {
            var h = n < l ? r[n] : d;
            t(v, e[n], h);
          }
          return v;
        }
        function So(e) {
          return xe(e) ? e : [];
        }
        function Oo(e) {
          return typeof e == "function" ? e : Ge;
        }
        function Mr(e, r) {
          return ee(e) ? e : Bo(e, r) ? [e] : Qa(ye(e));
        }
        var $l = ae;
        function Pr(e, r, t) {
          var n = e.length;
          return t = t === d ? n : t, !r && t >= n ? e : nr(e, r, t);
        }
        var Sa = Os || function(e) {
          return Le.clearTimeout(e);
        };
        function Oa(e, r) {
          if (r)
            return e.slice();
          var t = e.length, n = Ki ? Ki(t) : new e.constructor(t);
          return e.copy(n), n;
        }
        function Ro(e) {
          var r = new e.constructor(e.byteLength);
          return new Xt(r).set(new Xt(e)), r;
        }
        function Ul(e, r) {
          var t = r ? Ro(e.buffer) : e.buffer;
          return new e.constructor(t, e.byteOffset, e.byteLength);
        }
        function Nl(e) {
          var r = new e.constructor(e.source, si.exec(e));
          return r.lastIndex = e.lastIndex, r;
        }
        function Gl(e) {
          return bt ? ve(bt.call(e)) : {};
        }
        function Ra(e, r) {
          var t = r ? Ro(e.buffer) : e.buffer;
          return new e.constructor(t, e.byteOffset, e.length);
        }
        function Ea(e, r) {
          if (e !== r) {
            var t = e !== d, n = e === null, f = e === e, l = Ye(e), v = r !== d, h = r === null, b = r === r, O = Ye(r);
            if (!h && !O && !l && e > r || l && v && b && !h && !O || n && v && b || !t && b || !f)
              return 1;
            if (!n && !l && !O && e < r || O && t && f && !n && !l || h && t && f || !v && f || !b)
              return -1;
          }
          return 0;
        }
        function ql(e, r, t) {
          for (var n = -1, f = e.criteria, l = r.criteria, v = f.length, h = t.length; ++n < v; ) {
            var b = Ea(f[n], l[n]);
            if (b) {
              if (n >= h)
                return b;
              var O = t[n];
              return b * (O == "desc" ? -1 : 1);
            }
          }
          return e.index - r.index;
        }
        function La(e, r, t, n) {
          for (var f = -1, l = e.length, v = t.length, h = -1, b = r.length, O = Oe(l - v, 0), R = C(b + O), E = !n; ++h < b; )
            R[h] = r[h];
          for (; ++f < v; )
            (E || f < l) && (R[t[f]] = e[f]);
          for (; O--; )
            R[h++] = e[f++];
          return R;
        }
        function Ia(e, r, t, n) {
          for (var f = -1, l = e.length, v = -1, h = t.length, b = -1, O = r.length, R = Oe(l - h, 0), E = C(R + O), B = !n; ++f < R; )
            E[f] = e[f];
          for (var G = f; ++b < O; )
            E[G + b] = r[b];
          for (; ++v < h; )
            (B || f < l) && (E[G + t[v]] = e[f++]);
          return E;
        }
        function $e(e, r) {
          var t = -1, n = e.length;
          for (r || (r = C(n)); ++t < n; )
            r[t] = e[t];
          return r;
        }
        function _r(e, r, t, n) {
          var f = !t;
          t || (t = {});
          for (var l = -1, v = r.length; ++l < v; ) {
            var h = r[l], b = n ? n(t[h], e[h], h, t, e) : d;
            b === d && (b = e[h]), f ? Cr(t, h, b) : wt(t, h, b);
          }
          return t;
        }
        function kl(e, r) {
          return _r(e, Fo(e), r);
        }
        function Hl(e, r) {
          return _r(e, qa(e), r);
        }
        function yn(e, r) {
          return function(t, n) {
            var f = ee(t) ? Jf : yl, l = r ? r() : {};
            return f(t, e, z(n, 2), l);
          };
        }
        function ot(e) {
          return ae(function(r, t) {
            var n = -1, f = t.length, l = f > 1 ? t[f - 1] : d, v = f > 2 ? t[2] : d;
            for (l = e.length > 3 && typeof l == "function" ? (f--, l) : d, v && Pe(t[0], t[1], v) && (l = f < 3 ? d : l, f = 1), r = ve(r); ++n < f; ) {
              var h = t[n];
              h && e(r, h, n, l);
            }
            return r;
          });
        }
        function ja(e, r) {
          return function(t, n) {
            if (t == null)
              return t;
            if (!Ue(t))
              return e(t, n);
            for (var f = t.length, l = r ? f : -1, v = ve(t); (r ? l-- : ++l < f) && n(v[l], l, v) !== !1; )
              ;
            return t;
          };
        }
        function Ta(e) {
          return function(r, t, n) {
            for (var f = -1, l = ve(r), v = n(r), h = v.length; h--; ) {
              var b = v[e ? h : ++f];
              if (t(l[b], b, l) === !1)
                break;
            }
            return r;
          };
        }
        function zl(e, r, t) {
          var n = r & X, f = Ot(e);
          function l() {
            var v = this && this !== Le && this instanceof l ? f : e;
            return v.apply(n ? t : this, arguments);
          }
          return l;
        }
        function Wa(e) {
          return function(r) {
            r = ye(r);
            var t = Xr(r) ? sr(r) : d, n = t ? t[0] : r.charAt(0), f = t ? Pr(t, 1).join("") : r.slice(1);
            return n[e]() + f;
          };
        }
        function it(e) {
          return function(r) {
            return Xn(jc(Ic(r).replace(Mf, "")), e, "");
          };
        }
        function Ot(e) {
          return function() {
            var r = arguments;
            switch (r.length) {
              case 0:
                return new e();
              case 1:
                return new e(r[0]);
              case 2:
                return new e(r[0], r[1]);
              case 3:
                return new e(r[0], r[1], r[2]);
              case 4:
                return new e(r[0], r[1], r[2], r[3]);
              case 5:
                return new e(r[0], r[1], r[2], r[3], r[4]);
              case 6:
                return new e(r[0], r[1], r[2], r[3], r[4], r[5]);
              case 7:
                return new e(r[0], r[1], r[2], r[3], r[4], r[5], r[6]);
            }
            var t = nt(e.prototype), n = e.apply(t, r);
            return Ae(n) ? n : t;
          };
        }
        function Kl(e, r, t) {
          var n = Ot(e);
          function f() {
            for (var l = arguments.length, v = C(l), h = l, b = at(f); h--; )
              v[h] = arguments[h];
            var O = l < 3 && v[0] !== b && v[l - 1] !== b ? [] : Tr(v, b);
            if (l -= O.length, l < t)
              return Da(
                e,
                r,
                gn,
                f.placeholder,
                d,
                v,
                O,
                d,
                d,
                t - l
              );
            var R = this && this !== Le && this instanceof f ? n : e;
            return ze(R, this, v);
          }
          return f;
        }
        function Fa(e) {
          return function(r, t, n) {
            var f = ve(r);
            if (!Ue(r)) {
              var l = z(t, 3);
              r = Re(r), t = function(h) {
                return l(f[h], h, f);
              };
            }
            var v = e(r, t, n);
            return v > -1 ? f[l ? r[v] : v] : d;
          };
        }
        function Ba(e) {
          return Sr(function(r) {
            var t = r.length, n = t, f = rr.prototype.thru;
            for (e && r.reverse(); n--; ) {
              var l = r[n];
              if (typeof l != "function")
                throw new er($);
              if (f && !v && mn(l) == "wrapper")
                var v = new rr([], !0);
            }
            for (n = v ? n : t; ++n < t; ) {
              l = r[n];
              var h = mn(l), b = h == "wrapper" ? To(l) : d;
              b && Mo(b[0]) && b[1] == (pe | w | M | Ee) && !b[4].length && b[9] == 1 ? v = v[mn(b[0])].apply(v, b[3]) : v = l.length == 1 && Mo(l) ? v[h]() : v.thru(l);
            }
            return function() {
              var O = arguments, R = O[0];
              if (v && O.length == 1 && ee(R))
                return v.plant(R).value();
              for (var E = 0, B = t ? r[E].apply(this, O) : R; ++E < t; )
                B = r[E].call(this, B);
              return B;
            };
          });
        }
        function gn(e, r, t, n, f, l, v, h, b, O) {
          var R = r & pe, E = r & X, B = r & g, G = r & (w | I), Z = r & be, oe = B ? d : Ot(e);
          function Y() {
            for (var ce = arguments.length, de = C(ce), Je = ce; Je--; )
              de[Je] = arguments[Je];
            if (G)
              var De = at(Y), Xe = is(de, De);
            if (n && (de = La(de, n, f, G)), l && (de = Ia(de, l, v, G)), ce -= Xe, G && ce < O) {
              var Ce = Tr(de, De);
              return Da(
                e,
                r,
                gn,
                Y.placeholder,
                t,
                de,
                Ce,
                h,
                b,
                O - ce
              );
            }
            var ur = E ? t : this, Lr = B ? ur[e] : e;
            return ce = de.length, h ? de = yd(de, h) : Z && ce > 1 && de.reverse(), R && b < ce && (de.length = b), this && this !== Le && this instanceof Y && (Lr = oe || Ot(Lr)), Lr.apply(ur, de);
          }
          return Y;
        }
        function Ma(e, r) {
          return function(t, n) {
            return wl(t, e, r(n), {});
          };
        }
        function vn(e, r) {
          return function(t, n) {
            var f;
            if (t === d && n === d)
              return r;
            if (t !== d && (f = t), n !== d) {
              if (f === d)
                return n;
              typeof t == "string" || typeof n == "string" ? (t = Ze(t), n = Ze(n)) : (t = wa(t), n = wa(n)), f = e(t, n);
            }
            return f;
          };
        }
        function Eo(e) {
          return Sr(function(r) {
            return r = me(r, Ke(z())), ae(function(t) {
              var n = this;
              return e(r, function(f) {
                return ze(f, n, t);
              });
            });
          });
        }
        function hn(e, r) {
          r = r === d ? " " : Ze(r);
          var t = r.length;
          if (t < 2)
            return t ? wo(r, e) : r;
          var n = wo(r, rn(e / Vr(r)));
          return Xr(r) ? Pr(sr(n), 0, e).join("") : n.slice(0, e);
        }
        function Zl(e, r, t, n) {
          var f = r & X, l = Ot(e);
          function v() {
            for (var h = -1, b = arguments.length, O = -1, R = n.length, E = C(R + b), B = this && this !== Le && this instanceof v ? l : e; ++O < R; )
              E[O] = n[O];
            for (; b--; )
              E[O++] = arguments[++h];
            return ze(B, f ? t : this, E);
          }
          return v;
        }
        function Pa(e) {
          return function(r, t, n) {
            return n && typeof n != "number" && Pe(r, t, n) && (t = n = d), r = Er(r), t === d ? (t = r, r = 0) : t = Er(t), n = n === d ? r < t ? 1 : -1 : Er(n), Wl(r, t, n, e);
          };
        }
        function _n(e) {
          return function(r, t) {
            return typeof r == "string" && typeof t == "string" || (r = ir(r), t = ir(t)), e(r, t);
          };
        }
        function Da(e, r, t, n, f, l, v, h, b, O) {
          var R = r & w, E = R ? v : d, B = R ? d : v, G = R ? l : d, Z = R ? d : l;
          r |= R ? M : se, r &= ~(R ? se : M), r & i || (r &= -4);
          var oe = [
            e,
            r,
            f,
            G,
            E,
            Z,
            B,
            h,
            b,
            O
          ], Y = t.apply(d, oe);
          return Mo(e) && Ja(Y, oe), Y.placeholder = n, Xa(Y, e, r);
        }
        function Lo(e) {
          var r = Se[e];
          return function(t, n) {
            if (t = ir(t), n = n == null ? 0 : We(ne(n), 292), n && Xi(t)) {
              var f = (ye(t) + "e").split("e"), l = r(f[0] + "e" + (+f[1] + n));
              return f = (ye(l) + "e").split("e"), +(f[0] + "e" + (+f[1] - n));
            }
            return r(t);
          };
        }
        var Yl = rt && 1 / Ht(new rt([, -0]))[1] == T ? function(e) {
          return new rt(e);
        } : Xo;
        function $a(e) {
          return function(r) {
            var t = Fe(r);
            return t == cr ? oo(r) : t == fr ? us(r) : os(r, e(r));
          };
        }
        function pr(e, r, t, n, f, l, v, h) {
          var b = r & g;
          if (!b && typeof e != "function")
            throw new er($);
          var O = n ? n.length : 0;
          if (O || (r &= -97, n = f = d), v = v === d ? v : Oe(ne(v), 0), h = h === d ? h : ne(h), O -= f ? f.length : 0, r & se) {
            var R = n, E = f;
            n = f = d;
          }
          var B = b ? d : To(e), G = [
            e,
            r,
            t,
            n,
            f,
            R,
            E,
            l,
            v,
            h
          ];
          if (B && ld(G, B), e = G[0], r = G[1], t = G[2], n = G[3], f = G[4], h = G[9] = G[9] === d ? b ? 0 : e.length : Oe(G[9] - O, 0), !h && r & (w | I) && (r &= -25), !r || r == X)
            var Z = zl(e, r, t);
          else r == w || r == I ? Z = Kl(e, r, h) : (r == M || r == (X | M)) && !f.length ? Z = Zl(e, r, t, n) : Z = gn.apply(d, G);
          var oe = B ? Aa : Ja;
          return Xa(oe(Z, G), e, r);
        }
        function Ua(e, r, t, n) {
          return e === d || dr(e, et[t]) && !ge.call(n, t) ? r : e;
        }
        function Na(e, r, t, n, f, l) {
          return Ae(e) && Ae(r) && (l.set(r, e), ln(e, r, d, Na, l), l.delete(r)), e;
        }
        function Jl(e) {
          return Lt(e) ? d : e;
        }
        function Ga(e, r, t, n, f, l) {
          var v = t & re, h = e.length, b = r.length;
          if (h != b && !(v && b > h))
            return !1;
          var O = l.get(e), R = l.get(r);
          if (O && R)
            return O == r && R == e;
          var E = -1, B = !0, G = t & Q ? new Gr() : d;
          for (l.set(e, r), l.set(r, e); ++E < h; ) {
            var Z = e[E], oe = r[E];
            if (n)
              var Y = v ? n(oe, Z, E, r, e, l) : n(Z, oe, E, e, r, l);
            if (Y !== d) {
              if (Y)
                continue;
              B = !1;
              break;
            }
            if (G) {
              if (!Vn(r, function(ce, de) {
                if (!vt(G, de) && (Z === ce || f(Z, ce, t, n, l)))
                  return G.push(de);
              })) {
                B = !1;
                break;
              }
            } else if (!(Z === oe || f(Z, oe, t, n, l))) {
              B = !1;
              break;
            }
          }
          return l.delete(e), l.delete(r), B;
        }
        function Xl(e, r, t, n, f, l, v) {
          switch (t) {
            case Zr:
              if (e.byteLength != r.byteLength || e.byteOffset != r.byteOffset)
                return !1;
              e = e.buffer, r = r.buffer;
            case gt:
              return !(e.byteLength != r.byteLength || !l(new Xt(e), new Xt(r)));
            case Ar:
            case st:
            case lt:
              return dr(+e, +r);
            case Pt:
              return e.name == r.name && e.message == r.message;
            case dt:
            case ut:
              return e == r + "";
            case cr:
              var h = oo;
            case fr:
              var b = n & re;
              if (h || (h = Ht), e.size != r.size && !b)
                return !1;
              var O = v.get(e);
              if (O)
                return O == r;
              n |= Q, v.set(e, r);
              var R = Ga(h(e), h(r), n, f, l, v);
              return v.delete(e), R;
            case $t:
              if (bt)
                return bt.call(e) == bt.call(r);
          }
          return !1;
        }
        function Vl(e, r, t, n, f, l) {
          var v = t & re, h = Io(e), b = h.length, O = Io(r), R = O.length;
          if (b != R && !v)
            return !1;
          for (var E = b; E--; ) {
            var B = h[E];
            if (!(v ? B in r : ge.call(r, B)))
              return !1;
          }
          var G = l.get(e), Z = l.get(r);
          if (G && Z)
            return G == r && Z == e;
          var oe = !0;
          l.set(e, r), l.set(r, e);
          for (var Y = v; ++E < b; ) {
            B = h[E];
            var ce = e[B], de = r[B];
            if (n)
              var Je = v ? n(de, ce, B, r, e, l) : n(ce, de, B, e, r, l);
            if (!(Je === d ? ce === de || f(ce, de, t, n, l) : Je)) {
              oe = !1;
              break;
            }
            Y || (Y = B == "constructor");
          }
          if (oe && !Y) {
            var De = e.constructor, Xe = r.constructor;
            De != Xe && "constructor" in e && "constructor" in r && !(typeof De == "function" && De instanceof De && typeof Xe == "function" && Xe instanceof Xe) && (oe = !1);
          }
          return l.delete(e), l.delete(r), oe;
        }
        function Sr(e) {
          return Do(Za(e, d, nc), e + "");
        }
        function Io(e) {
          return fa(e, Re, Fo);
        }
        function jo(e) {
          return fa(e, Ne, qa);
        }
        var To = nn ? function(e) {
          return nn.get(e);
        } : Xo;
        function mn(e) {
          for (var r = e.name + "", t = tt[r], n = ge.call(tt, r) ? t.length : 0; n--; ) {
            var f = t[n], l = f.func;
            if (l == null || l == e)
              return f.name;
          }
          return r;
        }
        function at(e) {
          var r = ge.call(s, "placeholder") ? s : e;
          return r.placeholder;
        }
        function z() {
          var e = s.iteratee || Yo;
          return e = e === Yo ? da : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function An(e, r) {
          var t = e.__data__;
          return ad(r) ? t[typeof r == "string" ? "string" : "hash"] : t.map;
        }
        function Wo(e) {
          for (var r = Re(e), t = r.length; t--; ) {
            var n = r[t], f = e[n];
            r[t] = [n, f, za(f)];
          }
          return r;
        }
        function Hr(e, r) {
          var t = ss(e, r);
          return la(t) ? t : d;
        }
        function Ql(e) {
          var r = ge.call(e, Ur), t = e[Ur];
          try {
            e[Ur] = d;
            var n = !0;
          } catch {
          }
          var f = Yt.call(e);
          return n && (r ? e[Ur] = t : delete e[Ur]), f;
        }
        var Fo = ao ? function(e) {
          return e == null ? [] : (e = ve(e), Ir(ao(e), function(r) {
            return Yi.call(e, r);
          }));
        } : Vo, qa = ao ? function(e) {
          for (var r = []; e; )
            jr(r, Fo(e)), e = Vt(e);
          return r;
        } : Vo, Fe = Me;
        (co && Fe(new co(new ArrayBuffer(1))) != Zr || _t && Fe(new _t()) != cr || fo && Fe(fo.resolve()) != ii || rt && Fe(new rt()) != fr || mt && Fe(new mt()) != yt) && (Fe = function(e) {
          var r = Me(e), t = r == br ? e.constructor : d, n = t ? zr(t) : "";
          if (n)
            switch (n) {
              case Bs:
                return Zr;
              case Ms:
                return cr;
              case Ps:
                return ii;
              case Ds:
                return fr;
              case $s:
                return yt;
            }
          return r;
        });
        function ed(e, r, t) {
          for (var n = -1, f = t.length; ++n < f; ) {
            var l = t[n], v = l.size;
            switch (l.type) {
              case "drop":
                e += v;
                break;
              case "dropRight":
                r -= v;
                break;
              case "take":
                r = We(r, e + v);
                break;
              case "takeRight":
                e = Oe(e, r - v);
                break;
            }
          }
          return { start: e, end: r };
        }
        function rd(e) {
          var r = e.match(cf);
          return r ? r[1].split(ff) : [];
        }
        function ka(e, r, t) {
          r = Mr(r, e);
          for (var n = -1, f = r.length, l = !1; ++n < f; ) {
            var v = mr(r[n]);
            if (!(l = e != null && t(e, v)))
              break;
            e = e[v];
          }
          return l || ++n != f ? l : (f = e == null ? 0 : e.length, !!f && On(f) && Or(v, f) && (ee(e) || Kr(e)));
        }
        function td(e) {
          var r = e.length, t = new e.constructor(r);
          return r && typeof e[0] == "string" && ge.call(e, "index") && (t.index = e.index, t.input = e.input), t;
        }
        function Ha(e) {
          return typeof e.constructor == "function" && !Rt(e) ? nt(Vt(e)) : {};
        }
        function nd(e, r, t) {
          var n = e.constructor;
          switch (r) {
            case gt:
              return Ro(e);
            case Ar:
            case st:
              return new n(+e);
            case Zr:
              return Ul(e, t);
            case Tn:
            case Wn:
            case Fn:
            case Bn:
            case Mn:
            case Pn:
            case Dn:
            case $n:
            case Un:
              return Ra(e, t);
            case cr:
              return new n();
            case lt:
            case ut:
              return new n(e);
            case dt:
              return Nl(e);
            case fr:
              return new n();
            case $t:
              return Gl(e);
          }
        }
        function od(e, r) {
          var t = r.length;
          if (!t)
            return e;
          var n = t - 1;
          return r[n] = (t > 1 ? "& " : "") + r[n], r = r.join(t > 2 ? ", " : " "), e.replace(af, `{
/* [wrapped with ` + r + `] */
`);
        }
        function id(e) {
          return ee(e) || Kr(e) || !!(Ji && e && e[Ji]);
        }
        function Or(e, r) {
          var t = typeof e;
          return r = r ?? x, !!r && (t == "number" || t != "symbol" && _f.test(e)) && e > -1 && e % 1 == 0 && e < r;
        }
        function Pe(e, r, t) {
          if (!Ae(t))
            return !1;
          var n = typeof r;
          return (n == "number" ? Ue(t) && Or(r, t.length) : n == "string" && r in t) ? dr(t[r], e) : !1;
        }
        function Bo(e, r) {
          if (ee(e))
            return !1;
          var t = typeof e;
          return t == "number" || t == "symbol" || t == "boolean" || e == null || Ye(e) ? !0 : rf.test(e) || !ef.test(e) || r != null && e in ve(r);
        }
        function ad(e) {
          var r = typeof e;
          return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? e !== "__proto__" : e === null;
        }
        function Mo(e) {
          var r = mn(e), t = s[r];
          if (typeof t != "function" || !(r in fe.prototype))
            return !1;
          if (e === t)
            return !0;
          var n = To(t);
          return !!n && e === n[0];
        }
        function cd(e) {
          return !!zi && zi in e;
        }
        var fd = Kt ? Rr : Qo;
        function Rt(e) {
          var r = e && e.constructor, t = typeof r == "function" && r.prototype || et;
          return e === t;
        }
        function za(e) {
          return e === e && !Ae(e);
        }
        function Ka(e, r) {
          return function(t) {
            return t == null ? !1 : t[e] === r && (r !== d || e in ve(t));
          };
        }
        function sd(e) {
          var r = pn(e, function(n) {
            return t.size === U && t.clear(), n;
          }), t = r.cache;
          return r;
        }
        function ld(e, r) {
          var t = e[1], n = r[1], f = t | n, l = f < (X | g | pe), v = n == pe && t == w || n == pe && t == Ee && e[7].length <= r[8] || n == (pe | Ee) && r[7].length <= r[8] && t == w;
          if (!(l || v))
            return e;
          n & X && (e[2] = r[2], f |= t & X ? 0 : i);
          var h = r[3];
          if (h) {
            var b = e[3];
            e[3] = b ? La(b, h, r[4]) : h, e[4] = b ? Tr(e[3], H) : r[4];
          }
          return h = r[5], h && (b = e[5], e[5] = b ? Ia(b, h, r[6]) : h, e[6] = b ? Tr(e[5], H) : r[6]), h = r[7], h && (e[7] = h), n & pe && (e[8] = e[8] == null ? r[8] : We(e[8], r[8])), e[9] == null && (e[9] = r[9]), e[0] = r[0], e[1] = f, e;
        }
        function dd(e) {
          var r = [];
          if (e != null)
            for (var t in ve(e))
              r.push(t);
          return r;
        }
        function ud(e) {
          return Yt.call(e);
        }
        function Za(e, r, t) {
          return r = Oe(r === d ? e.length - 1 : r, 0), function() {
            for (var n = arguments, f = -1, l = Oe(n.length - r, 0), v = C(l); ++f < l; )
              v[f] = n[r + f];
            f = -1;
            for (var h = C(r + 1); ++f < r; )
              h[f] = n[f];
            return h[r] = t(v), ze(e, this, h);
          };
        }
        function Ya(e, r) {
          return r.length < 2 ? e : kr(e, nr(r, 0, -1));
        }
        function yd(e, r) {
          for (var t = e.length, n = We(r.length, t), f = $e(e); n--; ) {
            var l = r[n];
            e[n] = Or(l, t) ? f[l] : d;
          }
          return e;
        }
        function Po(e, r) {
          if (!(r === "constructor" && typeof e[r] == "function") && r != "__proto__")
            return e[r];
        }
        var Ja = Va(Aa), Et = Es || function(e, r) {
          return Le.setTimeout(e, r);
        }, Do = Va(Ml);
        function Xa(e, r, t) {
          var n = r + "";
          return Do(e, od(n, gd(rd(n), t)));
        }
        function Va(e) {
          var r = 0, t = 0;
          return function() {
            var n = Ts(), f = He - (n - t);
            if (t = n, f > 0) {
              if (++r >= Be)
                return arguments[0];
            } else
              r = 0;
            return e.apply(d, arguments);
          };
        }
        function bn(e, r) {
          var t = -1, n = e.length, f = n - 1;
          for (r = r === d ? n : r; ++t < r; ) {
            var l = bo(t, f), v = e[l];
            e[l] = e[t], e[t] = v;
          }
          return e.length = r, e;
        }
        var Qa = sd(function(e) {
          var r = [];
          return e.charCodeAt(0) === 46 && r.push(""), e.replace(tf, function(t, n, f, l) {
            r.push(f ? l.replace(df, "$1") : n || t);
          }), r;
        });
        function mr(e) {
          if (typeof e == "string" || Ye(e))
            return e;
          var r = e + "";
          return r == "0" && 1 / e == -1 / 0 ? "-0" : r;
        }
        function zr(e) {
          if (e != null) {
            try {
              return Zt.call(e);
            } catch {
            }
            try {
              return e + "";
            } catch {
            }
          }
          return "";
        }
        function gd(e, r) {
          return Qe(_, function(t) {
            var n = "_." + t[0];
            r & t[1] && !qt(e, n) && e.push(n);
          }), e.sort();
        }
        function ec(e) {
          if (e instanceof fe)
            return e.clone();
          var r = new rr(e.__wrapped__, e.__chain__);
          return r.__actions__ = $e(e.__actions__), r.__index__ = e.__index__, r.__values__ = e.__values__, r;
        }
        function vd(e, r, t) {
          (t ? Pe(e, r, t) : r === d) ? r = 1 : r = Oe(ne(r), 0);
          var n = e == null ? 0 : e.length;
          if (!n || r < 1)
            return [];
          for (var f = 0, l = 0, v = C(rn(n / r)); f < n; )
            v[l++] = nr(e, f, f += r);
          return v;
        }
        function hd(e) {
          for (var r = -1, t = e == null ? 0 : e.length, n = 0, f = []; ++r < t; ) {
            var l = e[r];
            l && (f[n++] = l);
          }
          return f;
        }
        function _d() {
          var e = arguments.length;
          if (!e)
            return [];
          for (var r = C(e - 1), t = arguments[0], n = e; n--; )
            r[n - 1] = arguments[n];
          return jr(ee(t) ? $e(t) : [t], Ie(r, 1));
        }
        var md = ae(function(e, r) {
          return xe(e) ? xt(e, Ie(r, 1, xe, !0)) : [];
        }), Ad = ae(function(e, r) {
          var t = or(r);
          return xe(t) && (t = d), xe(e) ? xt(e, Ie(r, 1, xe, !0), z(t, 2)) : [];
        }), bd = ae(function(e, r) {
          var t = or(r);
          return xe(t) && (t = d), xe(e) ? xt(e, Ie(r, 1, xe, !0), d, t) : [];
        });
        function wd(e, r, t) {
          var n = e == null ? 0 : e.length;
          return n ? (r = t || r === d ? 1 : ne(r), nr(e, r < 0 ? 0 : r, n)) : [];
        }
        function xd(e, r, t) {
          var n = e == null ? 0 : e.length;
          return n ? (r = t || r === d ? 1 : ne(r), r = n - r, nr(e, 0, r < 0 ? 0 : r)) : [];
        }
        function Cd(e, r) {
          return e && e.length ? un(e, z(r, 3), !0, !0) : [];
        }
        function pd(e, r) {
          return e && e.length ? un(e, z(r, 3), !0) : [];
        }
        function Sd(e, r, t, n) {
          var f = e == null ? 0 : e.length;
          return f ? (t && typeof t != "number" && Pe(e, r, t) && (t = 0, n = f), _l(e, r, t, n)) : [];
        }
        function rc(e, r, t) {
          var n = e == null ? 0 : e.length;
          if (!n)
            return -1;
          var f = t == null ? 0 : ne(t);
          return f < 0 && (f = Oe(n + f, 0)), kt(e, z(r, 3), f);
        }
        function tc(e, r, t) {
          var n = e == null ? 0 : e.length;
          if (!n)
            return -1;
          var f = n - 1;
          return t !== d && (f = ne(t), f = t < 0 ? Oe(n + f, 0) : We(f, n - 1)), kt(e, z(r, 3), f, !0);
        }
        function nc(e) {
          var r = e == null ? 0 : e.length;
          return r ? Ie(e, 1) : [];
        }
        function Od(e) {
          var r = e == null ? 0 : e.length;
          return r ? Ie(e, T) : [];
        }
        function Rd(e, r) {
          var t = e == null ? 0 : e.length;
          return t ? (r = r === d ? 1 : ne(r), Ie(e, r)) : [];
        }
        function Ed(e) {
          for (var r = -1, t = e == null ? 0 : e.length, n = {}; ++r < t; ) {
            var f = e[r];
            n[f[0]] = f[1];
          }
          return n;
        }
        function oc(e) {
          return e && e.length ? e[0] : d;
        }
        function Ld(e, r, t) {
          var n = e == null ? 0 : e.length;
          if (!n)
            return -1;
          var f = t == null ? 0 : ne(t);
          return f < 0 && (f = Oe(n + f, 0)), Jr(e, r, f);
        }
        function Id(e) {
          var r = e == null ? 0 : e.length;
          return r ? nr(e, 0, -1) : [];
        }
        var jd = ae(function(e) {
          var r = me(e, So);
          return r.length && r[0] === e[0] ? vo(r) : [];
        }), Td = ae(function(e) {
          var r = or(e), t = me(e, So);
          return r === or(t) ? r = d : t.pop(), t.length && t[0] === e[0] ? vo(t, z(r, 2)) : [];
        }), Wd = ae(function(e) {
          var r = or(e), t = me(e, So);
          return r = typeof r == "function" ? r : d, r && t.pop(), t.length && t[0] === e[0] ? vo(t, d, r) : [];
        });
        function Fd(e, r) {
          return e == null ? "" : Is.call(e, r);
        }
        function or(e) {
          var r = e == null ? 0 : e.length;
          return r ? e[r - 1] : d;
        }
        function Bd(e, r, t) {
          var n = e == null ? 0 : e.length;
          if (!n)
            return -1;
          var f = n;
          return t !== d && (f = ne(t), f = f < 0 ? Oe(n + f, 0) : We(f, n - 1)), r === r ? gs(e, r, f) : kt(e, Di, f, !0);
        }
        function Md(e, r) {
          return e && e.length ? va(e, ne(r)) : d;
        }
        var Pd = ae(ic);
        function ic(e, r) {
          return e && e.length && r && r.length ? Ao(e, r) : e;
        }
        function Dd(e, r, t) {
          return e && e.length && r && r.length ? Ao(e, r, z(t, 2)) : e;
        }
        function $d(e, r, t) {
          return e && e.length && r && r.length ? Ao(e, r, d, t) : e;
        }
        var Ud = Sr(function(e, r) {
          var t = e == null ? 0 : e.length, n = lo(e, r);
          return ma(e, me(r, function(f) {
            return Or(f, t) ? +f : f;
          }).sort(Ea)), n;
        });
        function Nd(e, r) {
          var t = [];
          if (!(e && e.length))
            return t;
          var n = -1, f = [], l = e.length;
          for (r = z(r, 3); ++n < l; ) {
            var v = e[n];
            r(v, n, e) && (t.push(v), f.push(n));
          }
          return ma(e, f), t;
        }
        function $o(e) {
          return e == null ? e : Fs.call(e);
        }
        function Gd(e, r, t) {
          var n = e == null ? 0 : e.length;
          return n ? (t && typeof t != "number" && Pe(e, r, t) ? (r = 0, t = n) : (r = r == null ? 0 : ne(r), t = t === d ? n : ne(t)), nr(e, r, t)) : [];
        }
        function qd(e, r) {
          return dn(e, r);
        }
        function kd(e, r, t) {
          return xo(e, r, z(t, 2));
        }
        function Hd(e, r) {
          var t = e == null ? 0 : e.length;
          if (t) {
            var n = dn(e, r);
            if (n < t && dr(e[n], r))
              return n;
          }
          return -1;
        }
        function zd(e, r) {
          return dn(e, r, !0);
        }
        function Kd(e, r, t) {
          return xo(e, r, z(t, 2), !0);
        }
        function Zd(e, r) {
          var t = e == null ? 0 : e.length;
          if (t) {
            var n = dn(e, r, !0) - 1;
            if (dr(e[n], r))
              return n;
          }
          return -1;
        }
        function Yd(e) {
          return e && e.length ? ba(e) : [];
        }
        function Jd(e, r) {
          return e && e.length ? ba(e, z(r, 2)) : [];
        }
        function Xd(e) {
          var r = e == null ? 0 : e.length;
          return r ? nr(e, 1, r) : [];
        }
        function Vd(e, r, t) {
          return e && e.length ? (r = t || r === d ? 1 : ne(r), nr(e, 0, r < 0 ? 0 : r)) : [];
        }
        function Qd(e, r, t) {
          var n = e == null ? 0 : e.length;
          return n ? (r = t || r === d ? 1 : ne(r), r = n - r, nr(e, r < 0 ? 0 : r, n)) : [];
        }
        function eu(e, r) {
          return e && e.length ? un(e, z(r, 3), !1, !0) : [];
        }
        function ru(e, r) {
          return e && e.length ? un(e, z(r, 3)) : [];
        }
        var tu = ae(function(e) {
          return Br(Ie(e, 1, xe, !0));
        }), nu = ae(function(e) {
          var r = or(e);
          return xe(r) && (r = d), Br(Ie(e, 1, xe, !0), z(r, 2));
        }), ou = ae(function(e) {
          var r = or(e);
          return r = typeof r == "function" ? r : d, Br(Ie(e, 1, xe, !0), d, r);
        });
        function iu(e) {
          return e && e.length ? Br(e) : [];
        }
        function au(e, r) {
          return e && e.length ? Br(e, z(r, 2)) : [];
        }
        function cu(e, r) {
          return r = typeof r == "function" ? r : d, e && e.length ? Br(e, d, r) : [];
        }
        function Uo(e) {
          if (!(e && e.length))
            return [];
          var r = 0;
          return e = Ir(e, function(t) {
            if (xe(t))
              return r = Oe(t.length, r), !0;
          }), to(r, function(t) {
            return me(e, Qn(t));
          });
        }
        function ac(e, r) {
          if (!(e && e.length))
            return [];
          var t = Uo(e);
          return r == null ? t : me(t, function(n) {
            return ze(r, d, n);
          });
        }
        var fu = ae(function(e, r) {
          return xe(e) ? xt(e, r) : [];
        }), su = ae(function(e) {
          return po(Ir(e, xe));
        }), lu = ae(function(e) {
          var r = or(e);
          return xe(r) && (r = d), po(Ir(e, xe), z(r, 2));
        }), du = ae(function(e) {
          var r = or(e);
          return r = typeof r == "function" ? r : d, po(Ir(e, xe), d, r);
        }), uu = ae(Uo);
        function yu(e, r) {
          return pa(e || [], r || [], wt);
        }
        function gu(e, r) {
          return pa(e || [], r || [], St);
        }
        var vu = ae(function(e) {
          var r = e.length, t = r > 1 ? e[r - 1] : d;
          return t = typeof t == "function" ? (e.pop(), t) : d, ac(e, t);
        });
        function cc(e) {
          var r = s(e);
          return r.__chain__ = !0, r;
        }
        function hu(e, r) {
          return r(e), e;
        }
        function wn(e, r) {
          return r(e);
        }
        var _u = Sr(function(e) {
          var r = e.length, t = r ? e[0] : 0, n = this.__wrapped__, f = function(l) {
            return lo(l, e);
          };
          return r > 1 || this.__actions__.length || !(n instanceof fe) || !Or(t) ? this.thru(f) : (n = n.slice(t, +t + (r ? 1 : 0)), n.__actions__.push({
            func: wn,
            args: [f],
            thisArg: d
          }), new rr(n, this.__chain__).thru(function(l) {
            return r && !l.length && l.push(d), l;
          }));
        });
        function mu() {
          return cc(this);
        }
        function Au() {
          return new rr(this.value(), this.__chain__);
        }
        function bu() {
          this.__values__ === d && (this.__values__ = wc(this.value()));
          var e = this.__index__ >= this.__values__.length, r = e ? d : this.__values__[this.__index__++];
          return { done: e, value: r };
        }
        function wu() {
          return this;
        }
        function xu(e) {
          for (var r, t = this; t instanceof an; ) {
            var n = ec(t);
            n.__index__ = 0, n.__values__ = d, r ? f.__wrapped__ = n : r = n;
            var f = n;
            t = t.__wrapped__;
          }
          return f.__wrapped__ = e, r;
        }
        function Cu() {
          var e = this.__wrapped__;
          if (e instanceof fe) {
            var r = e;
            return this.__actions__.length && (r = new fe(this)), r = r.reverse(), r.__actions__.push({
              func: wn,
              args: [$o],
              thisArg: d
            }), new rr(r, this.__chain__);
          }
          return this.thru($o);
        }
        function pu() {
          return Ca(this.__wrapped__, this.__actions__);
        }
        var Su = yn(function(e, r, t) {
          ge.call(e, t) ? ++e[t] : Cr(e, t, 1);
        });
        function Ou(e, r, t) {
          var n = ee(e) ? Mi : hl;
          return t && Pe(e, r, t) && (r = d), n(e, z(r, 3));
        }
        function Ru(e, r) {
          var t = ee(e) ? Ir : aa;
          return t(e, z(r, 3));
        }
        var Eu = Fa(rc), Lu = Fa(tc);
        function Iu(e, r) {
          return Ie(xn(e, r), 1);
        }
        function ju(e, r) {
          return Ie(xn(e, r), T);
        }
        function Tu(e, r, t) {
          return t = t === d ? 1 : ne(t), Ie(xn(e, r), t);
        }
        function fc(e, r) {
          var t = ee(e) ? Qe : Fr;
          return t(e, z(r, 3));
        }
        function sc(e, r) {
          var t = ee(e) ? Xf : ia;
          return t(e, z(r, 3));
        }
        var Wu = yn(function(e, r, t) {
          ge.call(e, t) ? e[t].push(r) : Cr(e, t, [r]);
        });
        function Fu(e, r, t, n) {
          e = Ue(e) ? e : ft(e), t = t && !n ? ne(t) : 0;
          var f = e.length;
          return t < 0 && (t = Oe(f + t, 0)), Rn(e) ? t <= f && e.indexOf(r, t) > -1 : !!f && Jr(e, r, t) > -1;
        }
        var Bu = ae(function(e, r, t) {
          var n = -1, f = typeof r == "function", l = Ue(e) ? C(e.length) : [];
          return Fr(e, function(v) {
            l[++n] = f ? ze(r, v, t) : Ct(v, r, t);
          }), l;
        }), Mu = yn(function(e, r, t) {
          Cr(e, t, r);
        });
        function xn(e, r) {
          var t = ee(e) ? me : ua;
          return t(e, z(r, 3));
        }
        function Pu(e, r, t, n) {
          return e == null ? [] : (ee(r) || (r = r == null ? [] : [r]), t = n ? d : t, ee(t) || (t = t == null ? [] : [t]), ha(e, r, t));
        }
        var Du = yn(function(e, r, t) {
          e[t ? 0 : 1].push(r);
        }, function() {
          return [[], []];
        });
        function $u(e, r, t) {
          var n = ee(e) ? Xn : Ui, f = arguments.length < 3;
          return n(e, z(r, 4), t, f, Fr);
        }
        function Uu(e, r, t) {
          var n = ee(e) ? Vf : Ui, f = arguments.length < 3;
          return n(e, z(r, 4), t, f, ia);
        }
        function Nu(e, r) {
          var t = ee(e) ? Ir : aa;
          return t(e, Sn(z(r, 3)));
        }
        function Gu(e) {
          var r = ee(e) ? ra : Fl;
          return r(e);
        }
        function qu(e, r, t) {
          (t ? Pe(e, r, t) : r === d) ? r = 1 : r = ne(r);
          var n = ee(e) ? dl : Bl;
          return n(e, r);
        }
        function ku(e) {
          var r = ee(e) ? ul : Pl;
          return r(e);
        }
        function Hu(e) {
          if (e == null)
            return 0;
          if (Ue(e))
            return Rn(e) ? Vr(e) : e.length;
          var r = Fe(e);
          return r == cr || r == fr ? e.size : _o(e).length;
        }
        function zu(e, r, t) {
          var n = ee(e) ? Vn : Dl;
          return t && Pe(e, r, t) && (r = d), n(e, z(r, 3));
        }
        var Ku = ae(function(e, r) {
          if (e == null)
            return [];
          var t = r.length;
          return t > 1 && Pe(e, r[0], r[1]) ? r = [] : t > 2 && Pe(r[0], r[1], r[2]) && (r = [r[0]]), ha(e, Ie(r, 1), []);
        }), Cn = Rs || function() {
          return Le.Date.now();
        };
        function Zu(e, r) {
          if (typeof r != "function")
            throw new er($);
          return e = ne(e), function() {
            if (--e < 1)
              return r.apply(this, arguments);
          };
        }
        function lc(e, r, t) {
          return r = t ? d : r, r = e && r == null ? e.length : r, pr(e, pe, d, d, d, d, r);
        }
        function dc(e, r) {
          var t;
          if (typeof r != "function")
            throw new er($);
          return e = ne(e), function() {
            return --e > 0 && (t = r.apply(this, arguments)), e <= 1 && (r = d), t;
          };
        }
        var No = ae(function(e, r, t) {
          var n = X;
          if (t.length) {
            var f = Tr(t, at(No));
            n |= M;
          }
          return pr(e, n, r, t, f);
        }), uc = ae(function(e, r, t) {
          var n = X | g;
          if (t.length) {
            var f = Tr(t, at(uc));
            n |= M;
          }
          return pr(r, n, e, t, f);
        });
        function yc(e, r, t) {
          r = t ? d : r;
          var n = pr(e, w, d, d, d, d, d, r);
          return n.placeholder = yc.placeholder, n;
        }
        function gc(e, r, t) {
          r = t ? d : r;
          var n = pr(e, I, d, d, d, d, d, r);
          return n.placeholder = gc.placeholder, n;
        }
        function vc(e, r, t) {
          var n, f, l, v, h, b, O = 0, R = !1, E = !1, B = !0;
          if (typeof e != "function")
            throw new er($);
          r = ir(r) || 0, Ae(t) && (R = !!t.leading, E = "maxWait" in t, l = E ? Oe(ir(t.maxWait) || 0, r) : l, B = "trailing" in t ? !!t.trailing : B);
          function G(Ce) {
            var ur = n, Lr = f;
            return n = f = d, O = Ce, v = e.apply(Lr, ur), v;
          }
          function Z(Ce) {
            return O = Ce, h = Et(ce, r), R ? G(Ce) : v;
          }
          function oe(Ce) {
            var ur = Ce - b, Lr = Ce - O, Fc = r - ur;
            return E ? We(Fc, l - Lr) : Fc;
          }
          function Y(Ce) {
            var ur = Ce - b, Lr = Ce - O;
            return b === d || ur >= r || ur < 0 || E && Lr >= l;
          }
          function ce() {
            var Ce = Cn();
            if (Y(Ce))
              return de(Ce);
            h = Et(ce, oe(Ce));
          }
          function de(Ce) {
            return h = d, B && n ? G(Ce) : (n = f = d, v);
          }
          function Je() {
            h !== d && Sa(h), O = 0, n = b = f = h = d;
          }
          function De() {
            return h === d ? v : de(Cn());
          }
          function Xe() {
            var Ce = Cn(), ur = Y(Ce);
            if (n = arguments, f = this, b = Ce, ur) {
              if (h === d)
                return Z(b);
              if (E)
                return Sa(h), h = Et(ce, r), G(b);
            }
            return h === d && (h = Et(ce, r)), v;
          }
          return Xe.cancel = Je, Xe.flush = De, Xe;
        }
        var Yu = ae(function(e, r) {
          return oa(e, 1, r);
        }), Ju = ae(function(e, r, t) {
          return oa(e, ir(r) || 0, t);
        });
        function Xu(e) {
          return pr(e, be);
        }
        function pn(e, r) {
          if (typeof e != "function" || r != null && typeof r != "function")
            throw new er($);
          var t = function() {
            var n = arguments, f = r ? r.apply(this, n) : n[0], l = t.cache;
            if (l.has(f))
              return l.get(f);
            var v = e.apply(this, n);
            return t.cache = l.set(f, v) || l, v;
          };
          return t.cache = new (pn.Cache || xr)(), t;
        }
        pn.Cache = xr;
        function Sn(e) {
          if (typeof e != "function")
            throw new er($);
          return function() {
            var r = arguments;
            switch (r.length) {
              case 0:
                return !e.call(this);
              case 1:
                return !e.call(this, r[0]);
              case 2:
                return !e.call(this, r[0], r[1]);
              case 3:
                return !e.call(this, r[0], r[1], r[2]);
            }
            return !e.apply(this, r);
          };
        }
        function Vu(e) {
          return dc(2, e);
        }
        var Qu = $l(function(e, r) {
          r = r.length == 1 && ee(r[0]) ? me(r[0], Ke(z())) : me(Ie(r, 1), Ke(z()));
          var t = r.length;
          return ae(function(n) {
            for (var f = -1, l = We(n.length, t); ++f < l; )
              n[f] = r[f].call(this, n[f]);
            return ze(e, this, n);
          });
        }), Go = ae(function(e, r) {
          var t = Tr(r, at(Go));
          return pr(e, M, d, r, t);
        }), hc = ae(function(e, r) {
          var t = Tr(r, at(hc));
          return pr(e, se, d, r, t);
        }), ey = Sr(function(e, r) {
          return pr(e, Ee, d, d, d, r);
        });
        function ry(e, r) {
          if (typeof e != "function")
            throw new er($);
          return r = r === d ? r : ne(r), ae(e, r);
        }
        function ty(e, r) {
          if (typeof e != "function")
            throw new er($);
          return r = r == null ? 0 : Oe(ne(r), 0), ae(function(t) {
            var n = t[r], f = Pr(t, 0, r);
            return n && jr(f, n), ze(e, this, f);
          });
        }
        function ny(e, r, t) {
          var n = !0, f = !0;
          if (typeof e != "function")
            throw new er($);
          return Ae(t) && (n = "leading" in t ? !!t.leading : n, f = "trailing" in t ? !!t.trailing : f), vc(e, r, {
            leading: n,
            maxWait: r,
            trailing: f
          });
        }
        function oy(e) {
          return lc(e, 1);
        }
        function iy(e, r) {
          return Go(Oo(r), e);
        }
        function ay() {
          if (!arguments.length)
            return [];
          var e = arguments[0];
          return ee(e) ? e : [e];
        }
        function cy(e) {
          return tr(e, ie);
        }
        function fy(e, r) {
          return r = typeof r == "function" ? r : d, tr(e, ie, r);
        }
        function sy(e) {
          return tr(e, K | ie);
        }
        function ly(e, r) {
          return r = typeof r == "function" ? r : d, tr(e, K | ie, r);
        }
        function dy(e, r) {
          return r == null || na(e, r, Re(r));
        }
        function dr(e, r) {
          return e === r || e !== e && r !== r;
        }
        var uy = _n(go), yy = _n(function(e, r) {
          return e >= r;
        }), Kr = sa(/* @__PURE__ */ function() {
          return arguments;
        }()) ? sa : function(e) {
          return we(e) && ge.call(e, "callee") && !Yi.call(e, "callee");
        }, ee = C.isArray, gy = Ii ? Ke(Ii) : xl;
        function Ue(e) {
          return e != null && On(e.length) && !Rr(e);
        }
        function xe(e) {
          return we(e) && Ue(e);
        }
        function vy(e) {
          return e === !0 || e === !1 || we(e) && Me(e) == Ar;
        }
        var Dr = Ls || Qo, hy = ji ? Ke(ji) : Cl;
        function _y(e) {
          return we(e) && e.nodeType === 1 && !Lt(e);
        }
        function my(e) {
          if (e == null)
            return !0;
          if (Ue(e) && (ee(e) || typeof e == "string" || typeof e.splice == "function" || Dr(e) || ct(e) || Kr(e)))
            return !e.length;
          var r = Fe(e);
          if (r == cr || r == fr)
            return !e.size;
          if (Rt(e))
            return !_o(e).length;
          for (var t in e)
            if (ge.call(e, t))
              return !1;
          return !0;
        }
        function Ay(e, r) {
          return pt(e, r);
        }
        function by(e, r, t) {
          t = typeof t == "function" ? t : d;
          var n = t ? t(e, r) : d;
          return n === d ? pt(e, r, d, t) : !!n;
        }
        function qo(e) {
          if (!we(e))
            return !1;
          var r = Me(e);
          return r == Pt || r == Gc || typeof e.message == "string" && typeof e.name == "string" && !Lt(e);
        }
        function wy(e) {
          return typeof e == "number" && Xi(e);
        }
        function Rr(e) {
          if (!Ae(e))
            return !1;
          var r = Me(e);
          return r == Dt || r == oi || r == le || r == kc;
        }
        function _c(e) {
          return typeof e == "number" && e == ne(e);
        }
        function On(e) {
          return typeof e == "number" && e > -1 && e % 1 == 0 && e <= x;
        }
        function Ae(e) {
          var r = typeof e;
          return e != null && (r == "object" || r == "function");
        }
        function we(e) {
          return e != null && typeof e == "object";
        }
        var mc = Ti ? Ke(Ti) : Sl;
        function xy(e, r) {
          return e === r || ho(e, r, Wo(r));
        }
        function Cy(e, r, t) {
          return t = typeof t == "function" ? t : d, ho(e, r, Wo(r), t);
        }
        function py(e) {
          return Ac(e) && e != +e;
        }
        function Sy(e) {
          if (fd(e))
            throw new V(D);
          return la(e);
        }
        function Oy(e) {
          return e === null;
        }
        function Ry(e) {
          return e == null;
        }
        function Ac(e) {
          return typeof e == "number" || we(e) && Me(e) == lt;
        }
        function Lt(e) {
          if (!we(e) || Me(e) != br)
            return !1;
          var r = Vt(e);
          if (r === null)
            return !0;
          var t = ge.call(r, "constructor") && r.constructor;
          return typeof t == "function" && t instanceof t && Zt.call(t) == Cs;
        }
        var ko = Wi ? Ke(Wi) : Ol;
        function Ey(e) {
          return _c(e) && e >= -9007199254740991 && e <= x;
        }
        var bc = Fi ? Ke(Fi) : Rl;
        function Rn(e) {
          return typeof e == "string" || !ee(e) && we(e) && Me(e) == ut;
        }
        function Ye(e) {
          return typeof e == "symbol" || we(e) && Me(e) == $t;
        }
        var ct = Bi ? Ke(Bi) : El;
        function Ly(e) {
          return e === d;
        }
        function Iy(e) {
          return we(e) && Fe(e) == yt;
        }
        function jy(e) {
          return we(e) && Me(e) == zc;
        }
        var Ty = _n(mo), Wy = _n(function(e, r) {
          return e <= r;
        });
        function wc(e) {
          if (!e)
            return [];
          if (Ue(e))
            return Rn(e) ? sr(e) : $e(e);
          if (ht && e[ht])
            return ds(e[ht]());
          var r = Fe(e), t = r == cr ? oo : r == fr ? Ht : ft;
          return t(e);
        }
        function Er(e) {
          if (!e)
            return e === 0 ? e : 0;
          if (e = ir(e), e === T || e === -1 / 0) {
            var r = e < 0 ? -1 : 1;
            return r * c;
          }
          return e === e ? e : 0;
        }
        function ne(e) {
          var r = Er(e), t = r % 1;
          return r === r ? t ? r - t : r : 0;
        }
        function xc(e) {
          return e ? qr(ne(e), 0, y) : 0;
        }
        function ir(e) {
          if (typeof e == "number")
            return e;
          if (Ye(e))
            return a;
          if (Ae(e)) {
            var r = typeof e.valueOf == "function" ? e.valueOf() : e;
            e = Ae(r) ? r + "" : r;
          }
          if (typeof e != "string")
            return e === 0 ? e : +e;
          e = Ni(e);
          var t = gf.test(e);
          return t || hf.test(e) ? Zf(e.slice(2), t ? 2 : 8) : yf.test(e) ? a : +e;
        }
        function Cc(e) {
          return _r(e, Ne(e));
        }
        function Fy(e) {
          return e ? qr(ne(e), -9007199254740991, x) : e === 0 ? e : 0;
        }
        function ye(e) {
          return e == null ? "" : Ze(e);
        }
        var By = ot(function(e, r) {
          if (Rt(r) || Ue(r)) {
            _r(r, Re(r), e);
            return;
          }
          for (var t in r)
            ge.call(r, t) && wt(e, t, r[t]);
        }), pc = ot(function(e, r) {
          _r(r, Ne(r), e);
        }), En = ot(function(e, r, t, n) {
          _r(r, Ne(r), e, n);
        }), My = ot(function(e, r, t, n) {
          _r(r, Re(r), e, n);
        }), Py = Sr(lo);
        function Dy(e, r) {
          var t = nt(e);
          return r == null ? t : ta(t, r);
        }
        var $y = ae(function(e, r) {
          e = ve(e);
          var t = -1, n = r.length, f = n > 2 ? r[2] : d;
          for (f && Pe(r[0], r[1], f) && (n = 1); ++t < n; )
            for (var l = r[t], v = Ne(l), h = -1, b = v.length; ++h < b; ) {
              var O = v[h], R = e[O];
              (R === d || dr(R, et[O]) && !ge.call(e, O)) && (e[O] = l[O]);
            }
          return e;
        }), Uy = ae(function(e) {
          return e.push(d, Na), ze(Sc, d, e);
        });
        function Ny(e, r) {
          return Pi(e, z(r, 3), hr);
        }
        function Gy(e, r) {
          return Pi(e, z(r, 3), yo);
        }
        function qy(e, r) {
          return e == null ? e : uo(e, z(r, 3), Ne);
        }
        function ky(e, r) {
          return e == null ? e : ca(e, z(r, 3), Ne);
        }
        function Hy(e, r) {
          return e && hr(e, z(r, 3));
        }
        function zy(e, r) {
          return e && yo(e, z(r, 3));
        }
        function Ky(e) {
          return e == null ? [] : sn(e, Re(e));
        }
        function Zy(e) {
          return e == null ? [] : sn(e, Ne(e));
        }
        function Ho(e, r, t) {
          var n = e == null ? d : kr(e, r);
          return n === d ? t : n;
        }
        function Yy(e, r) {
          return e != null && ka(e, r, ml);
        }
        function zo(e, r) {
          return e != null && ka(e, r, Al);
        }
        var Jy = Ma(function(e, r, t) {
          r != null && typeof r.toString != "function" && (r = Yt.call(r)), e[r] = t;
        }, Zo(Ge)), Xy = Ma(function(e, r, t) {
          r != null && typeof r.toString != "function" && (r = Yt.call(r)), ge.call(e, r) ? e[r].push(t) : e[r] = [t];
        }, z), Vy = ae(Ct);
        function Re(e) {
          return Ue(e) ? ea(e) : _o(e);
        }
        function Ne(e) {
          return Ue(e) ? ea(e, !0) : Ll(e);
        }
        function Qy(e, r) {
          var t = {};
          return r = z(r, 3), hr(e, function(n, f, l) {
            Cr(t, r(n, f, l), n);
          }), t;
        }
        function eg(e, r) {
          var t = {};
          return r = z(r, 3), hr(e, function(n, f, l) {
            Cr(t, f, r(n, f, l));
          }), t;
        }
        var rg = ot(function(e, r, t) {
          ln(e, r, t);
        }), Sc = ot(function(e, r, t, n) {
          ln(e, r, t, n);
        }), tg = Sr(function(e, r) {
          var t = {};
          if (e == null)
            return t;
          var n = !1;
          r = me(r, function(l) {
            return l = Mr(l, e), n || (n = l.length > 1), l;
          }), _r(e, jo(e), t), n && (t = tr(t, K | te | ie, Jl));
          for (var f = r.length; f--; )
            Co(t, r[f]);
          return t;
        });
        function ng(e, r) {
          return Oc(e, Sn(z(r)));
        }
        var og = Sr(function(e, r) {
          return e == null ? {} : jl(e, r);
        });
        function Oc(e, r) {
          if (e == null)
            return {};
          var t = me(jo(e), function(n) {
            return [n];
          });
          return r = z(r), _a(e, t, function(n, f) {
            return r(n, f[0]);
          });
        }
        function ig(e, r, t) {
          r = Mr(r, e);
          var n = -1, f = r.length;
          for (f || (f = 1, e = d); ++n < f; ) {
            var l = e == null ? d : e[mr(r[n])];
            l === d && (n = f, l = t), e = Rr(l) ? l.call(e) : l;
          }
          return e;
        }
        function ag(e, r, t) {
          return e == null ? e : St(e, r, t);
        }
        function cg(e, r, t, n) {
          return n = typeof n == "function" ? n : d, e == null ? e : St(e, r, t, n);
        }
        var Rc = $a(Re), Ec = $a(Ne);
        function fg(e, r, t) {
          var n = ee(e), f = n || Dr(e) || ct(e);
          if (r = z(r, 4), t == null) {
            var l = e && e.constructor;
            f ? t = n ? new l() : [] : Ae(e) ? t = Rr(l) ? nt(Vt(e)) : {} : t = {};
          }
          return (f ? Qe : hr)(e, function(v, h, b) {
            return r(t, v, h, b);
          }), t;
        }
        function sg(e, r) {
          return e == null ? !0 : Co(e, r);
        }
        function lg(e, r, t) {
          return e == null ? e : xa(e, r, Oo(t));
        }
        function dg(e, r, t, n) {
          return n = typeof n == "function" ? n : d, e == null ? e : xa(e, r, Oo(t), n);
        }
        function ft(e) {
          return e == null ? [] : no(e, Re(e));
        }
        function ug(e) {
          return e == null ? [] : no(e, Ne(e));
        }
        function yg(e, r, t) {
          return t === d && (t = r, r = d), t !== d && (t = ir(t), t = t === t ? t : 0), r !== d && (r = ir(r), r = r === r ? r : 0), qr(ir(e), r, t);
        }
        function gg(e, r, t) {
          return r = Er(r), t === d ? (t = r, r = 0) : t = Er(t), e = ir(e), bl(e, r, t);
        }
        function vg(e, r, t) {
          if (t && typeof t != "boolean" && Pe(e, r, t) && (r = t = d), t === d && (typeof r == "boolean" ? (t = r, r = d) : typeof e == "boolean" && (t = e, e = d)), e === d && r === d ? (e = 0, r = 1) : (e = Er(e), r === d ? (r = e, e = 0) : r = Er(r)), e > r) {
            var n = e;
            e = r, r = n;
          }
          if (t || e % 1 || r % 1) {
            var f = Vi();
            return We(e + f * (r - e + Kf("1e-" + ((f + "").length - 1))), r);
          }
          return bo(e, r);
        }
        var hg = it(function(e, r, t) {
          return r = r.toLowerCase(), e + (t ? Lc(r) : r);
        });
        function Lc(e) {
          return Ko(ye(e).toLowerCase());
        }
        function Ic(e) {
          return e = ye(e), e && e.replace(mf, as).replace(Pf, "");
        }
        function _g(e, r, t) {
          e = ye(e), r = Ze(r);
          var n = e.length;
          t = t === d ? n : qr(ne(t), 0, n);
          var f = t;
          return t -= r.length, t >= 0 && e.slice(t, f) == r;
        }
        function mg(e) {
          return e = ye(e), e && Xc.test(e) ? e.replace(ci, cs) : e;
        }
        function Ag(e) {
          return e = ye(e), e && nf.test(e) ? e.replace(Nn, "\\$&") : e;
        }
        var bg = it(function(e, r, t) {
          return e + (t ? "-" : "") + r.toLowerCase();
        }), wg = it(function(e, r, t) {
          return e + (t ? " " : "") + r.toLowerCase();
        }), xg = Wa("toLowerCase");
        function Cg(e, r, t) {
          e = ye(e), r = ne(r);
          var n = r ? Vr(e) : 0;
          if (!r || n >= r)
            return e;
          var f = (r - n) / 2;
          return hn(tn(f), t) + e + hn(rn(f), t);
        }
        function pg(e, r, t) {
          e = ye(e), r = ne(r);
          var n = r ? Vr(e) : 0;
          return r && n < r ? e + hn(r - n, t) : e;
        }
        function Sg(e, r, t) {
          e = ye(e), r = ne(r);
          var n = r ? Vr(e) : 0;
          return r && n < r ? hn(r - n, t) + e : e;
        }
        function Og(e, r, t) {
          return t || r == null ? r = 0 : r && (r = +r), Ws(ye(e).replace(Gn, ""), r || 0);
        }
        function Rg(e, r, t) {
          return (t ? Pe(e, r, t) : r === d) ? r = 1 : r = ne(r), wo(ye(e), r);
        }
        function Eg() {
          var e = arguments, r = ye(e[0]);
          return e.length < 3 ? r : r.replace(e[1], e[2]);
        }
        var Lg = it(function(e, r, t) {
          return e + (t ? "_" : "") + r.toLowerCase();
        });
        function Ig(e, r, t) {
          return t && typeof t != "number" && Pe(e, r, t) && (r = t = d), t = t === d ? y : t >>> 0, t ? (e = ye(e), e && (typeof r == "string" || r != null && !ko(r)) && (r = Ze(r), !r && Xr(e)) ? Pr(sr(e), 0, t) : e.split(r, t)) : [];
        }
        var jg = it(function(e, r, t) {
          return e + (t ? " " : "") + Ko(r);
        });
        function Tg(e, r, t) {
          return e = ye(e), t = t == null ? 0 : qr(ne(t), 0, e.length), r = Ze(r), e.slice(t, t + r.length) == r;
        }
        function Wg(e, r, t) {
          var n = s.templateSettings;
          t && Pe(e, r, t) && (r = d), e = ye(e), r = En({}, r, n, Ua);
          var f = En({}, r.imports, n.imports, Ua), l = Re(f), v = no(f, l), h, b, O = 0, R = r.interpolate || Ut, E = "__p += '", B = io(
            (r.escape || Ut).source + "|" + R.source + "|" + (R === fi ? uf : Ut).source + "|" + (r.evaluate || Ut).source + "|$",
            "g"
          ), G = "//# sourceURL=" + (ge.call(r, "sourceURL") ? (r.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Gf + "]") + `
`;
          e.replace(B, function(Y, ce, de, Je, De, Xe) {
            return de || (de = Je), E += e.slice(O, Xe).replace(Af, fs), ce && (h = !0, E += `' +
__e(` + ce + `) +
'`), De && (b = !0, E += `';
` + De + `;
__p += '`), de && (E += `' +
((__t = (` + de + `)) == null ? '' : __t) +
'`), O = Xe + Y.length, Y;
          }), E += `';
`;
          var Z = ge.call(r, "variable") && r.variable;
          if (!Z)
            E = `with (obj) {
` + E + `
}
`;
          else if (lf.test(Z))
            throw new V(J);
          E = (b ? E.replace(Kc, "") : E).replace(Zc, "$1").replace(Yc, "$1;"), E = "function(" + (Z || "obj") + `) {
` + (Z ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (h ? ", __e = _.escape" : "") + (b ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + E + `return __p
}`;
          var oe = Tc(function() {
            return ue(l, G + "return " + E).apply(d, v);
          });
          if (oe.source = E, qo(oe))
            throw oe;
          return oe;
        }
        function Fg(e) {
          return ye(e).toLowerCase();
        }
        function Bg(e) {
          return ye(e).toUpperCase();
        }
        function Mg(e, r, t) {
          if (e = ye(e), e && (t || r === d))
            return Ni(e);
          if (!e || !(r = Ze(r)))
            return e;
          var n = sr(e), f = sr(r), l = Gi(n, f), v = qi(n, f) + 1;
          return Pr(n, l, v).join("");
        }
        function Pg(e, r, t) {
          if (e = ye(e), e && (t || r === d))
            return e.slice(0, Hi(e) + 1);
          if (!e || !(r = Ze(r)))
            return e;
          var n = sr(e), f = qi(n, sr(r)) + 1;
          return Pr(n, 0, f).join("");
        }
        function Dg(e, r, t) {
          if (e = ye(e), e && (t || r === d))
            return e.replace(Gn, "");
          if (!e || !(r = Ze(r)))
            return e;
          var n = sr(e), f = Gi(n, sr(r));
          return Pr(n, f).join("");
        }
        function $g(e, r) {
          var t = ke, n = je;
          if (Ae(r)) {
            var f = "separator" in r ? r.separator : f;
            t = "length" in r ? ne(r.length) : t, n = "omission" in r ? Ze(r.omission) : n;
          }
          e = ye(e);
          var l = e.length;
          if (Xr(e)) {
            var v = sr(e);
            l = v.length;
          }
          if (t >= l)
            return e;
          var h = t - Vr(n);
          if (h < 1)
            return n;
          var b = v ? Pr(v, 0, h).join("") : e.slice(0, h);
          if (f === d)
            return b + n;
          if (v && (h += b.length - h), ko(f)) {
            if (e.slice(h).search(f)) {
              var O, R = b;
              for (f.global || (f = io(f.source, ye(si.exec(f)) + "g")), f.lastIndex = 0; O = f.exec(R); )
                var E = O.index;
              b = b.slice(0, E === d ? h : E);
            }
          } else if (e.indexOf(Ze(f), h) != h) {
            var B = b.lastIndexOf(f);
            B > -1 && (b = b.slice(0, B));
          }
          return b + n;
        }
        function Ug(e) {
          return e = ye(e), e && Jc.test(e) ? e.replace(ai, vs) : e;
        }
        var Ng = it(function(e, r, t) {
          return e + (t ? " " : "") + r.toUpperCase();
        }), Ko = Wa("toUpperCase");
        function jc(e, r, t) {
          return e = ye(e), r = t ? d : r, r === d ? ls(e) ? ms(e) : rs(e) : e.match(r) || [];
        }
        var Tc = ae(function(e, r) {
          try {
            return ze(e, d, r);
          } catch (t) {
            return qo(t) ? t : new V(t);
          }
        }), Gg = Sr(function(e, r) {
          return Qe(r, function(t) {
            t = mr(t), Cr(e, t, No(e[t], e));
          }), e;
        });
        function qg(e) {
          var r = e == null ? 0 : e.length, t = z();
          return e = r ? me(e, function(n) {
            if (typeof n[1] != "function")
              throw new er($);
            return [t(n[0]), n[1]];
          }) : [], ae(function(n) {
            for (var f = -1; ++f < r; ) {
              var l = e[f];
              if (ze(l[0], this, n))
                return ze(l[1], this, n);
            }
          });
        }
        function kg(e) {
          return vl(tr(e, K));
        }
        function Zo(e) {
          return function() {
            return e;
          };
        }
        function Hg(e, r) {
          return e == null || e !== e ? r : e;
        }
        var zg = Ba(), Kg = Ba(!0);
        function Ge(e) {
          return e;
        }
        function Yo(e) {
          return da(typeof e == "function" ? e : tr(e, K));
        }
        function Zg(e) {
          return ya(tr(e, K));
        }
        function Yg(e, r) {
          return ga(e, tr(r, K));
        }
        var Jg = ae(function(e, r) {
          return function(t) {
            return Ct(t, e, r);
          };
        }), Xg = ae(function(e, r) {
          return function(t) {
            return Ct(e, t, r);
          };
        });
        function Jo(e, r, t) {
          var n = Re(r), f = sn(r, n);
          t == null && !(Ae(r) && (f.length || !n.length)) && (t = r, r = e, e = this, f = sn(r, Re(r)));
          var l = !(Ae(t) && "chain" in t) || !!t.chain, v = Rr(e);
          return Qe(f, function(h) {
            var b = r[h];
            e[h] = b, v && (e.prototype[h] = function() {
              var O = this.__chain__;
              if (l || O) {
                var R = e(this.__wrapped__), E = R.__actions__ = $e(this.__actions__);
                return E.push({ func: b, args: arguments, thisArg: e }), R.__chain__ = O, R;
              }
              return b.apply(e, jr([this.value()], arguments));
            });
          }), e;
        }
        function Vg() {
          return Le._ === this && (Le._ = ps), this;
        }
        function Xo() {
        }
        function Qg(e) {
          return e = ne(e), ae(function(r) {
            return va(r, e);
          });
        }
        var ev = Eo(me), rv = Eo(Mi), tv = Eo(Vn);
        function Wc(e) {
          return Bo(e) ? Qn(mr(e)) : Tl(e);
        }
        function nv(e) {
          return function(r) {
            return e == null ? d : kr(e, r);
          };
        }
        var ov = Pa(), iv = Pa(!0);
        function Vo() {
          return [];
        }
        function Qo() {
          return !1;
        }
        function av() {
          return {};
        }
        function cv() {
          return "";
        }
        function fv() {
          return !0;
        }
        function sv(e, r) {
          if (e = ne(e), e < 1 || e > x)
            return [];
          var t = y, n = We(e, y);
          r = z(r), e -= y;
          for (var f = to(n, r); ++t < e; )
            r(t);
          return f;
        }
        function lv(e) {
          return ee(e) ? me(e, mr) : Ye(e) ? [e] : $e(Qa(ye(e)));
        }
        function dv(e) {
          var r = ++xs;
          return ye(e) + r;
        }
        var uv = vn(function(e, r) {
          return e + r;
        }, 0), yv = Lo("ceil"), gv = vn(function(e, r) {
          return e / r;
        }, 1), vv = Lo("floor");
        function hv(e) {
          return e && e.length ? fn(e, Ge, go) : d;
        }
        function _v(e, r) {
          return e && e.length ? fn(e, z(r, 2), go) : d;
        }
        function mv(e) {
          return $i(e, Ge);
        }
        function Av(e, r) {
          return $i(e, z(r, 2));
        }
        function bv(e) {
          return e && e.length ? fn(e, Ge, mo) : d;
        }
        function wv(e, r) {
          return e && e.length ? fn(e, z(r, 2), mo) : d;
        }
        var xv = vn(function(e, r) {
          return e * r;
        }, 1), Cv = Lo("round"), pv = vn(function(e, r) {
          return e - r;
        }, 0);
        function Sv(e) {
          return e && e.length ? ro(e, Ge) : 0;
        }
        function Ov(e, r) {
          return e && e.length ? ro(e, z(r, 2)) : 0;
        }
        return s.after = Zu, s.ary = lc, s.assign = By, s.assignIn = pc, s.assignInWith = En, s.assignWith = My, s.at = Py, s.before = dc, s.bind = No, s.bindAll = Gg, s.bindKey = uc, s.castArray = ay, s.chain = cc, s.chunk = vd, s.compact = hd, s.concat = _d, s.cond = qg, s.conforms = kg, s.constant = Zo, s.countBy = Su, s.create = Dy, s.curry = yc, s.curryRight = gc, s.debounce = vc, s.defaults = $y, s.defaultsDeep = Uy, s.defer = Yu, s.delay = Ju, s.difference = md, s.differenceBy = Ad, s.differenceWith = bd, s.drop = wd, s.dropRight = xd, s.dropRightWhile = Cd, s.dropWhile = pd, s.fill = Sd, s.filter = Ru, s.flatMap = Iu, s.flatMapDeep = ju, s.flatMapDepth = Tu, s.flatten = nc, s.flattenDeep = Od, s.flattenDepth = Rd, s.flip = Xu, s.flow = zg, s.flowRight = Kg, s.fromPairs = Ed, s.functions = Ky, s.functionsIn = Zy, s.groupBy = Wu, s.initial = Id, s.intersection = jd, s.intersectionBy = Td, s.intersectionWith = Wd, s.invert = Jy, s.invertBy = Xy, s.invokeMap = Bu, s.iteratee = Yo, s.keyBy = Mu, s.keys = Re, s.keysIn = Ne, s.map = xn, s.mapKeys = Qy, s.mapValues = eg, s.matches = Zg, s.matchesProperty = Yg, s.memoize = pn, s.merge = rg, s.mergeWith = Sc, s.method = Jg, s.methodOf = Xg, s.mixin = Jo, s.negate = Sn, s.nthArg = Qg, s.omit = tg, s.omitBy = ng, s.once = Vu, s.orderBy = Pu, s.over = ev, s.overArgs = Qu, s.overEvery = rv, s.overSome = tv, s.partial = Go, s.partialRight = hc, s.partition = Du, s.pick = og, s.pickBy = Oc, s.property = Wc, s.propertyOf = nv, s.pull = Pd, s.pullAll = ic, s.pullAllBy = Dd, s.pullAllWith = $d, s.pullAt = Ud, s.range = ov, s.rangeRight = iv, s.rearg = ey, s.reject = Nu, s.remove = Nd, s.rest = ry, s.reverse = $o, s.sampleSize = qu, s.set = ag, s.setWith = cg, s.shuffle = ku, s.slice = Gd, s.sortBy = Ku, s.sortedUniq = Yd, s.sortedUniqBy = Jd, s.split = Ig, s.spread = ty, s.tail = Xd, s.take = Vd, s.takeRight = Qd, s.takeRightWhile = eu, s.takeWhile = ru, s.tap = hu, s.throttle = ny, s.thru = wn, s.toArray = wc, s.toPairs = Rc, s.toPairsIn = Ec, s.toPath = lv, s.toPlainObject = Cc, s.transform = fg, s.unary = oy, s.union = tu, s.unionBy = nu, s.unionWith = ou, s.uniq = iu, s.uniqBy = au, s.uniqWith = cu, s.unset = sg, s.unzip = Uo, s.unzipWith = ac, s.update = lg, s.updateWith = dg, s.values = ft, s.valuesIn = ug, s.without = fu, s.words = jc, s.wrap = iy, s.xor = su, s.xorBy = lu, s.xorWith = du, s.zip = uu, s.zipObject = yu, s.zipObjectDeep = gu, s.zipWith = vu, s.entries = Rc, s.entriesIn = Ec, s.extend = pc, s.extendWith = En, Jo(s, s), s.add = uv, s.attempt = Tc, s.camelCase = hg, s.capitalize = Lc, s.ceil = yv, s.clamp = yg, s.clone = cy, s.cloneDeep = sy, s.cloneDeepWith = ly, s.cloneWith = fy, s.conformsTo = dy, s.deburr = Ic, s.defaultTo = Hg, s.divide = gv, s.endsWith = _g, s.eq = dr, s.escape = mg, s.escapeRegExp = Ag, s.every = Ou, s.find = Eu, s.findIndex = rc, s.findKey = Ny, s.findLast = Lu, s.findLastIndex = tc, s.findLastKey = Gy, s.floor = vv, s.forEach = fc, s.forEachRight = sc, s.forIn = qy, s.forInRight = ky, s.forOwn = Hy, s.forOwnRight = zy, s.get = Ho, s.gt = uy, s.gte = yy, s.has = Yy, s.hasIn = zo, s.head = oc, s.identity = Ge, s.includes = Fu, s.indexOf = Ld, s.inRange = gg, s.invoke = Vy, s.isArguments = Kr, s.isArray = ee, s.isArrayBuffer = gy, s.isArrayLike = Ue, s.isArrayLikeObject = xe, s.isBoolean = vy, s.isBuffer = Dr, s.isDate = hy, s.isElement = _y, s.isEmpty = my, s.isEqual = Ay, s.isEqualWith = by, s.isError = qo, s.isFinite = wy, s.isFunction = Rr, s.isInteger = _c, s.isLength = On, s.isMap = mc, s.isMatch = xy, s.isMatchWith = Cy, s.isNaN = py, s.isNative = Sy, s.isNil = Ry, s.isNull = Oy, s.isNumber = Ac, s.isObject = Ae, s.isObjectLike = we, s.isPlainObject = Lt, s.isRegExp = ko, s.isSafeInteger = Ey, s.isSet = bc, s.isString = Rn, s.isSymbol = Ye, s.isTypedArray = ct, s.isUndefined = Ly, s.isWeakMap = Iy, s.isWeakSet = jy, s.join = Fd, s.kebabCase = bg, s.last = or, s.lastIndexOf = Bd, s.lowerCase = wg, s.lowerFirst = xg, s.lt = Ty, s.lte = Wy, s.max = hv, s.maxBy = _v, s.mean = mv, s.meanBy = Av, s.min = bv, s.minBy = wv, s.stubArray = Vo, s.stubFalse = Qo, s.stubObject = av, s.stubString = cv, s.stubTrue = fv, s.multiply = xv, s.nth = Md, s.noConflict = Vg, s.noop = Xo, s.now = Cn, s.pad = Cg, s.padEnd = pg, s.padStart = Sg, s.parseInt = Og, s.random = vg, s.reduce = $u, s.reduceRight = Uu, s.repeat = Rg, s.replace = Eg, s.result = ig, s.round = Cv, s.runInContext = A, s.sample = Gu, s.size = Hu, s.snakeCase = Lg, s.some = zu, s.sortedIndex = qd, s.sortedIndexBy = kd, s.sortedIndexOf = Hd, s.sortedLastIndex = zd, s.sortedLastIndexBy = Kd, s.sortedLastIndexOf = Zd, s.startCase = jg, s.startsWith = Tg, s.subtract = pv, s.sum = Sv, s.sumBy = Ov, s.template = Wg, s.times = sv, s.toFinite = Er, s.toInteger = ne, s.toLength = xc, s.toLower = Fg, s.toNumber = ir, s.toSafeInteger = Fy, s.toString = ye, s.toUpper = Bg, s.trim = Mg, s.trimEnd = Pg, s.trimStart = Dg, s.truncate = $g, s.unescape = Ug, s.uniqueId = dv, s.upperCase = Ng, s.upperFirst = Ko, s.each = fc, s.eachRight = sc, s.first = oc, Jo(s, function() {
          var e = {};
          return hr(s, function(r, t) {
            ge.call(s.prototype, t) || (e[t] = r);
          }), e;
        }(), { chain: !1 }), s.VERSION = N, Qe(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
          s[e].placeholder = s;
        }), Qe(["drop", "take"], function(e, r) {
          fe.prototype[e] = function(t) {
            t = t === d ? 1 : Oe(ne(t), 0);
            var n = this.__filtered__ && !r ? new fe(this) : this.clone();
            return n.__filtered__ ? n.__takeCount__ = We(t, n.__takeCount__) : n.__views__.push({
              size: We(t, y),
              type: e + (n.__dir__ < 0 ? "Right" : "")
            }), n;
          }, fe.prototype[e + "Right"] = function(t) {
            return this.reverse()[e](t).reverse();
          };
        }), Qe(["filter", "map", "takeWhile"], function(e, r) {
          var t = r + 1, n = t == Te || t == m;
          fe.prototype[e] = function(f) {
            var l = this.clone();
            return l.__iteratees__.push({
              iteratee: z(f, 3),
              type: t
            }), l.__filtered__ = l.__filtered__ || n, l;
          };
        }), Qe(["head", "last"], function(e, r) {
          var t = "take" + (r ? "Right" : "");
          fe.prototype[e] = function() {
            return this[t](1).value()[0];
          };
        }), Qe(["initial", "tail"], function(e, r) {
          var t = "drop" + (r ? "" : "Right");
          fe.prototype[e] = function() {
            return this.__filtered__ ? new fe(this) : this[t](1);
          };
        }), fe.prototype.compact = function() {
          return this.filter(Ge);
        }, fe.prototype.find = function(e) {
          return this.filter(e).head();
        }, fe.prototype.findLast = function(e) {
          return this.reverse().find(e);
        }, fe.prototype.invokeMap = ae(function(e, r) {
          return typeof e == "function" ? new fe(this) : this.map(function(t) {
            return Ct(t, e, r);
          });
        }), fe.prototype.reject = function(e) {
          return this.filter(Sn(z(e)));
        }, fe.prototype.slice = function(e, r) {
          e = ne(e);
          var t = this;
          return t.__filtered__ && (e > 0 || r < 0) ? new fe(t) : (e < 0 ? t = t.takeRight(-e) : e && (t = t.drop(e)), r !== d && (r = ne(r), t = r < 0 ? t.dropRight(-r) : t.take(r - e)), t);
        }, fe.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, fe.prototype.toArray = function() {
          return this.take(y);
        }, hr(fe.prototype, function(e, r) {
          var t = /^(?:filter|find|map|reject)|While$/.test(r), n = /^(?:head|last)$/.test(r), f = s[n ? "take" + (r == "last" ? "Right" : "") : r], l = n || /^find/.test(r);
          f && (s.prototype[r] = function() {
            var v = this.__wrapped__, h = n ? [1] : arguments, b = v instanceof fe, O = h[0], R = b || ee(v), E = function(ce) {
              var de = f.apply(s, jr([ce], h));
              return n && B ? de[0] : de;
            };
            R && t && typeof O == "function" && O.length != 1 && (b = R = !1);
            var B = this.__chain__, G = !!this.__actions__.length, Z = l && !B, oe = b && !G;
            if (!l && R) {
              v = oe ? v : new fe(this);
              var Y = e.apply(v, h);
              return Y.__actions__.push({ func: wn, args: [E], thisArg: d }), new rr(Y, B);
            }
            return Z && oe ? e.apply(this, h) : (Y = this.thru(E), Z ? n ? Y.value()[0] : Y.value() : Y);
          });
        }), Qe(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
          var r = zt[e], t = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", n = /^(?:pop|shift)$/.test(e);
          s.prototype[e] = function() {
            var f = arguments;
            if (n && !this.__chain__) {
              var l = this.value();
              return r.apply(ee(l) ? l : [], f);
            }
            return this[t](function(v) {
              return r.apply(ee(v) ? v : [], f);
            });
          };
        }), hr(fe.prototype, function(e, r) {
          var t = s[r];
          if (t) {
            var n = t.name + "";
            ge.call(tt, n) || (tt[n] = []), tt[n].push({ name: r, func: t });
          }
        }), tt[gn(d, g).name] = [{
          name: "wrapper",
          func: d
        }], fe.prototype.clone = Us, fe.prototype.reverse = Ns, fe.prototype.value = Gs, s.prototype.at = _u, s.prototype.chain = mu, s.prototype.commit = Au, s.prototype.next = bu, s.prototype.plant = xu, s.prototype.reverse = Cu, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = pu, s.prototype.first = s.prototype.head, ht && (s.prototype[ht] = wu), s;
      }, Qr = As();
      $r ? (($r.exports = Qr)._ = Qr, Zn._ = Qr) : Le._ = Qr;
    }).call(Tv);
  }(Tt, Tt.exports)), Tt.exports;
}
var Mt = Wv();
function vr(j) {
  return j != null;
}
function $c(j, F) {
  if (Array.isArray(j) || Array.isArray(F)) {
    const d = Mt.castArray(j).filter(vr), N = Mt.castArray(F).filter(vr);
    return d.concat(N);
  }
}
const ri = {
  anchors: [
    { "actions-info": {
      tap_action: { action: "more-info" },
      icon_tap_action: { action: "more-info" },
      hold_action: { action: "more-info" }
    } },
    { "actions-toggle": {
      tap_action: { action: "toggle" },
      icon_tap_action: { action: "toggle" },
      hold_action: { action: "more-info" }
    } },
    { tile: {
      type: "tile",
      entity: "$entity",
      hide_state: !0,
      vertical: !1,
      features_position: "bottom"
    } }
  ],
  global: {
    minCardWidth: 200,
    filter: { exclude: [
      {
        type: "disabled_by",
        comparator: "match",
        value: ".*"
      },
      {
        type: "hidden_by",
        comparator: "match",
        value: ".*"
      },
      {
        type: "label",
        config: { label: "hidden" },
        value: "hidden"
      }
    ] },
    sort: [
      {
        type: "label",
        config: { label: "^sort_\\d+$" }
      },
      { type: "integration" },
      { type: "entity" }
    ]
  },
  grids: [
    {
      id: "control_alarm",
      title: "Alarm",
      filter: { include: [{
        type: "domain",
        value: "alarm_control_panel"
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" },
        features: [{
          type: "alarm-modes",
          modes: [
            "armed_home",
            "armed_away",
            "armed_night",
            "armed_vacation",
            "armed_custom_bypass",
            "disarmed"
          ]
        }]
      }
    },
    {
      id: "control_media",
      title: "Media",
      filter: { include: [{
        type: "domain",
        value: "media_player"
      }] },
      card: {
        tap_action: { action: "toggle" },
        icon_tap_action: { action: "toggle" },
        hold_action: { action: "more-info" },
        type: "custom:mushroom-media-player-card",
        entity: "$entity",
        use_media_artwork: !0,
        show_volume_level: !0,
        use_media_info: !1,
        collapsible_controls: !0,
        volume_controls: ["volume_set"],
        media_controls: ["play_pause_stop"]
      }
    },
    {
      id: "control_light",
      title: "Light",
      filter: { include: [{
        type: "domain",
        value: "light"
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "toggle" },
        icon_tap_action: { action: "toggle" },
        hold_action: { action: "more-info" },
        features: [
          { type: "light-brightness" },
          { type: "light-color-temp" }
        ]
      }
    },
    {
      id: "control_fan",
      title: "Fan",
      filter: { include: [{
        type: "domain",
        value: "fan"
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "toggle" },
        icon_tap_action: { action: "toggle" },
        hold_action: { action: "more-info" },
        features: [
          { type: "fan-speed" },
          {
            type: "fan-preset-modes",
            style: "icons"
          }
        ]
      }
    },
    {
      id: "control_humidifier",
      title: "Humidifier",
      filter: { include: [{
        type: "domain",
        value: "humidifier"
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "toggle" },
        icon_tap_action: { action: "toggle" },
        hold_action: { action: "more-info" },
        features: [
          { type: "target-humidity" },
          { type: "humidifier-toggle" }
        ]
      }
    },
    {
      id: "control_cover",
      title: "Cover",
      filter: { include: [{
        type: "domain",
        value: "cover"
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" },
        features: [{ type: "cover-open-close" }]
      }
    },
    {
      id: "control_vacuum",
      title: "Vacuum",
      filter: { include: [{
        type: "domain",
        value: "vacuum"
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" },
        features: [{
          type: "vacuum-commands",
          commands: [
            "start_pause",
            "return_home"
          ]
        }]
      }
    },
    {
      id: "control_switch",
      title: "Switch",
      filter: { include: [{
        type: "domain",
        comparator: "in",
        value: [
          "switch",
          "input_boolean"
        ]
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "toggle" },
        icon_tap_action: { action: "toggle" },
        hold_action: { action: "more-info" }
      }
    },
    {
      id: "control_select",
      title: "Select",
      filter: { include: [{
        type: "domain",
        comparator: "in",
        value: [
          "select",
          "input_select"
        ]
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" },
        features: [{ type: "select-options" }]
      }
    },
    {
      id: "control_button",
      title: "Button",
      filter: { include: [{
        type: "domain",
        comparator: "in",
        value: [
          "button",
          "scene"
        ]
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "toggle" },
        icon_tap_action: { action: "toggle" },
        hold_action: { action: "more-info" }
      }
    },
    {
      id: "control_number",
      title: "Number",
      filter: { include: [{
        type: "domain",
        value: "number"
      }] },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" },
        features: [{
          type: "numeric-input",
          style: "slider"
        }]
      }
    },
    {
      id: "stats_alert",
      title: "Alert",
      filter: {
        include: [{
          type: "domain",
          value: "binary_sensor"
        }],
        exclude: [{
          type: "attribute",
          config: { key: "device_class" },
          comparator: "in",
          value: [
            "motion",
            "occupancy"
          ]
        }]
      },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !0,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" }
      }
    },
    {
      id: "stats_sensor",
      title: "Sensor",
      filter: {
        include: [{
          type: "domain",
          value: "sensor"
        }],
        exclude: [
          {
            type: "attribute",
            config: { key: "device_class" },
            value: "battery"
          },
          {
            type: "state",
            comparator: "is_numeric"
          }
        ]
      },
      card: {
        type: "tile",
        entity: "$entity",
        hide_state: !1,
        vertical: !1,
        features_position: "bottom",
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" }
      }
    },
    {
      id: "stats_graphs",
      title: "Graphs",
      filter: {
        include: [
          {
            type: "domain",
            value: "sensor"
          },
          {
            type: "state",
            comparator: "is_numeric"
          }
        ],
        exclude: [{
          type: "attribute",
          config: { key: "device_class" },
          value: "battery"
        }]
      },
      card: {
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" },
        type: "custom:mini-graph-card",
        entities: ["$entity"],
        align_header: "left",
        align_icon: "left",
        align_state: "center",
        font_size: 50,
        font_size_header: 12,
        card_mod: { style: `.header {
  max-width: 80%;
}
.line--rect,
.fill--rect,
.line--points {
  {% set COLOR = 'grey' %}
  {% if state_attr(config.entities[0],'device_class') in ['date', 'timestamp', 'irradiance', 'distance', 'duration', 'illuminance', 'enum', 'monetary'] %} 
    {% set COLOR = 'grey' %}
  {% elif state_attr(config.entities[0],'device_class') in ['apparent_power', 'battery', 'current', 'energy', 'energy_storage', 'power_factor', 'power', 'voltage'] %} 
    {% set COLOR = 'yellow' %}
  {% elif state_attr(config.entities[0],'device_class') in ['aqi', 'sulphur_dioxide', 'volatile_organic_compounds', 'volatile_organic_compounds_parts', 'atmospheric_pressure', 'carbon_dioxide', 'carbon_monoxide', 'nitrogen_dioxide', 'gas', 'nitrogen_monoxide', 'nitrous_oxide', 'ozone', 'pm1', 'pm10', 'pm25'] %} 
    {% set COLOR = 'green' %}
  {% elif state_attr(config.entities[0],'device_class') in ['pressure', 'reactive_power', 'speed', 'temperature', 'weight', 'wind_speed'] %} 
    {% set COLOR = 'orangered' %}
  {% elif state_attr(config.entities[0],'device_class') in ['moisture', 'ph', 'precipitation', 'precipitation_intensity', 'humidity', 'water', 'volume', 'volume_storage'] %} 
    {% set COLOR = 'royalblue' %}
  {% elif state_attr(config.entities[0],'device_class') in ['data_rate', 'data_size', 'signal_strength', 'frequency', 'sound_pressure'] %}
    {% set COLOR = 'orange' %}
  {% endif %}
  fill: {{COLOR}};
  stroke: {{COLOR}};
}` }
      }
    },
    {
      id: "camera_camera",
      filter: { include: [{
        type: "domain",
        value: "camera"
      }] },
      card: {
        tap_action: { action: "more-info" },
        icon_tap_action: { action: "more-info" },
        hold_action: { action: "more-info" },
        type: "picture-entity",
        entity: "$entity"
      }
    }
  ],
  gridMergeStrategy: "add",
  navigation: {
    id: "area",
    minCardWidth: 300,
    card: {
      type: "area",
      area: "$area",
      navigation_path: "$area#main",
      aspect_ratio: "35:15",
      alert_classes: ["occupancy"],
      card_mod: { style: `{% set colors = [
  "rgba(42,72,100,0.3)",
  "rgba(234,162,33,0.3)",
  "rgba(214,64,92,0.3)",
  "rgba(190,70,178,0.3)",
  "rgba(145,142,80,0.3)",
  "rgba(12,162,121,0.3)",
  "rgba(76,159,171,0.3)",
  "rgba(147,72,26,0.3)",
] %} 
{% set color = colors[$index%(colors|length)] %}

{% if '$area' != '$currArea' %}
hui-image {
  opacity: 0.3;
}
div.navigate {
    background-color: {{color}};
}
{% endif %}
` }
    },
    filter: { exclude: [{
      type: "label",
      config: { label: "hidden" },
      value: "hidden"
    }] },
    sort: [
      {
        type: "label",
        config: { label: "^sort_\\d+$" }
      },
      { type: "floor" },
      { type: "area" }
    ]
  },
  main: [
    {
      title: "Control",
      icon: "mdi:button-pointer",
      match: "^control_.*$"
    },
    {
      title: "Stats",
      icon: "mdi:chart-line",
      match: "^stats_.*$"
    },
    {
      title: "Camera",
      icon: "mdi:camera",
      match: "^camera_.*$"
    }
  ]
}, Uc = (...j) => {
  const F = j == null ? void 0 : j.filter(vr), d = F.filter(vr).reduce((D, $) => ({ ...D, ...$ }));
  if (d.global = F.map((D) => D.global).filter(vr).reduce((D, $) => ({ ...D, ...$ })), !(/* @__PURE__ */ (() => {
    const D = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), $ = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), J = (g) => (g.global === void 0 || typeof g.global == "object" && g.global !== null && Array.isArray(g.global) === !1 && W(g.global)) && (g.gridMergeStrategy === "add" || g.gridMergeStrategy === "reset"), W = (g) => (g.id === void 0 || typeof g.id == "string") && (g.title === void 0 || typeof g.title == "string") && (g.position === void 0 || typeof g.position == "number") && (g.minCardWidth === void 0 || typeof g.minCardWidth == "number") && (g.replace === void 0 || typeof g.replace == "object" && g.replace !== null && Array.isArray(g.replace) === !1 && U(g.replace)) && (g.filter === void 0 || typeof g.filter == "object" && g.filter !== null && Array.isArray(g.filter) === !1 && te(g.filter)) && (g.sort === void 0 || Array.isArray(g.sort) && g.sort.every((i) => typeof i == "object" && i !== null && Q(i))) && (g.card === void 0 || typeof g.card == "object" && g.card !== null && Array.isArray(g.card) === !1 && X(g.card)), U = (g) => Object.keys(g).every((i) => {
      const w = g[i];
      return w === void 0 ? !0 : typeof w == "object" && w !== null && H(w);
    }), H = (g) => typeof g.card == "object" && g.card !== null && K(g.card), K = (g) => (g.index === void 0 || typeof g.index == "number") && (g.view_index === void 0 || typeof g.view_index == "number") && typeof g.type == "string" && Object.keys(g).every((i) => (["index", "view_index", "type"].some((I) => i === I) || g[i] === void 0, !0)), te = (g) => (g.exclude === void 0 || Array.isArray(g.exclude) && g.exclude.every((i) => typeof i == "object" && i !== null && ie(i))) && (g.include === void 0 || Array.isArray(g.include) && g.include.every((i) => typeof i == "object" && i !== null && ie(i))), ie = (g) => (g.comparator === void 0 || g.comparator === "equal" || g.comparator === "match" || g.comparator === "in" || g.comparator === "greater_than" || g.comparator === "lower_than" || g.comparator === "is_null" || g.comparator === "is_numeric") && !0 && D.has(g.type) === !0 && (g.config === void 0 || typeof g.config == "object" && g.config !== null && Array.isArray(g.config) === !1 && re(g.config)), re = (g) => (g.key === void 0 || typeof g.key == "string") && (g.label === void 0 || typeof g.label == "string"), Q = (g) => (g.comparator === void 0 || g.comparator === "ascending" || g.comparator === "descending") && $.has(g.type) === !0 && (g.config === void 0 || typeof g.config == "object" && g.config !== null && Array.isArray(g.config) === !1 && re(g.config)), X = (g) => (g.index === void 0 || typeof g.index == "number") && (g.view_index === void 0 || typeof g.view_index == "number") && (g.type === void 0 || typeof g.type == "string") && Object.keys(g).every((i) => (["index", "view_index", "type"].some((I) => i === I) || g[i] === void 0, !0));
    return (g) => typeof g == "object" && g !== null && J(g);
  })())(d)) {
    const D = (/* @__PURE__ */ (() => {
      const $ = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), J = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), W = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), U = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), H = (o) => (o.global === void 0 || typeof o.global == "object" && o.global !== null && Array.isArray(o.global) === !1 && K(o.global)) && Array.isArray(o.grids) && o.grids.every((_) => typeof _ == "object" && _ !== null && se(_)) && (o.gridMergeStrategy === "add" || o.gridMergeStrategy === "reset"), K = (o) => (o.id === void 0 || typeof o.id == "string") && (o.title === void 0 || typeof o.title == "string") && (o.position === void 0 || typeof o.position == "number") && (o.minCardWidth === void 0 || typeof o.minCardWidth == "number") && (o.replace === void 0 || typeof o.replace == "object" && o.replace !== null && Array.isArray(o.replace) === !1 && te(o.replace)) && (o.filter === void 0 || typeof o.filter == "object" && o.filter !== null && Array.isArray(o.filter) === !1 && Q(o.filter)) && (o.sort === void 0 || Array.isArray(o.sort) && o.sort.every((_) => typeof _ == "object" && _ !== null && i(_))) && (o.card === void 0 || typeof o.card == "object" && o.card !== null && Array.isArray(o.card) === !1 && w(o.card)), te = (o) => Object.keys(o).every((_) => {
        const p = o[_];
        return p === void 0 ? !0 : typeof p == "object" && p !== null && ie(p);
      }), ie = (o) => typeof o.card == "object" && o.card !== null && re(o.card), re = (o) => (o.index === void 0 || typeof o.index == "number") && (o.view_index === void 0 || typeof o.view_index == "number") && typeof o.type == "string" && Object.keys(o).every((_) => (["index", "view_index", "type"].some((L) => _ === L) || o[_] === void 0, !0)), Q = (o) => (o.exclude === void 0 || Array.isArray(o.exclude) && o.exclude.every((_) => typeof _ == "object" && _ !== null && X(_))) && (o.include === void 0 || Array.isArray(o.include) && o.include.every((_) => typeof _ == "object" && _ !== null && X(_))), X = (o) => (o.comparator === void 0 || o.comparator === "equal" || o.comparator === "match" || o.comparator === "in" || o.comparator === "greater_than" || o.comparator === "lower_than" || o.comparator === "is_null" || o.comparator === "is_numeric") && !0 && $.has(o.type) === !0 && (o.config === void 0 || typeof o.config == "object" && o.config !== null && Array.isArray(o.config) === !1 && g(o.config)), g = (o) => (o.key === void 0 || typeof o.key == "string") && (o.label === void 0 || typeof o.label == "string"), i = (o) => (o.comparator === void 0 || o.comparator === "ascending" || o.comparator === "descending") && J.has(o.type) === !0 && (o.config === void 0 || typeof o.config == "object" && o.config !== null && Array.isArray(o.config) === !1 && g(o.config)), w = (o) => (o.index === void 0 || typeof o.index == "number") && (o.view_index === void 0 || typeof o.view_index == "number") && (o.type === void 0 || typeof o.type == "string") && Object.keys(o).every((_) => (["index", "view_index", "type"].some((L) => _ === L) || o[_] === void 0, !0)), I = (o) => typeof o.id == "string" && (o.title === void 0 || typeof o.title == "string") && (o.position === void 0 || typeof o.position == "number") && typeof o.minCardWidth == "number" && (o.replace === void 0 || typeof o.replace == "object" && o.replace !== null && Array.isArray(o.replace) === !1 && te(o.replace)) && (o.filter === void 0 || typeof o.filter == "object" && o.filter !== null && Array.isArray(o.filter) === !1 && Q(o.filter)) && (o.sort === void 0 || Array.isArray(o.sort) && o.sort.every((_) => typeof _ == "object" && _ !== null && i(_))) && typeof o.card == "object" && o.card !== null && re(o.card), M = (o) => typeof o.gridId == "string" && (o.id === void 0 || typeof o.id == "string") && (o.title === void 0 || typeof o.title == "string") && (o.position === void 0 || typeof o.position == "number") && (o.minCardWidth === void 0 || typeof o.minCardWidth == "number") && (o.replace === void 0 || typeof o.replace == "object" && o.replace !== null && Array.isArray(o.replace) === !1 && te(o.replace)) && (o.filter === void 0 || typeof o.filter == "object" && o.filter !== null && Array.isArray(o.filter) === !1 && Q(o.filter)) && (o.sort === void 0 || Array.isArray(o.sort) && o.sort.every((_) => typeof _ == "object" && _ !== null && i(_))) && (o.card === void 0 || typeof o.card == "object" && o.card !== null && Array.isArray(o.card) === !1 && w(o.card)), se = (o) => o.gridId !== void 0 ? M(o) : I(o), pe = (o, _, p = !0) => [o.global === void 0 || (typeof o.global == "object" && o.global !== null && Array.isArray(o.global) === !1 || u(p, {
        path: _ + ".global",
        expected: "(DeepPartial<BaseRowOptions> | undefined)",
        value: o.global
      })) && Ee(o.global, _ + ".global", p) || u(p, {
        path: _ + ".global",
        expected: "(DeepPartial<BaseRowOptions> | undefined)",
        value: o.global
      }), (Array.isArray(o.grids) || u(p, {
        path: _ + ".grids",
        expected: "Array<BaseRowOptions | BaseRowRefOptions>",
        value: o.grids
      })) && o.grids.map((L, le) => (typeof L == "object" && L !== null || u(p, {
        path: _ + ".grids[" + le + "]",
        expected: "(BaseRowOptions | BaseRowRefOptions)",
        value: L
      })) && c(L, _ + ".grids[" + le + "]", p) || u(p, {
        path: _ + ".grids[" + le + "]",
        expected: "(BaseRowOptions | BaseRowRefOptions)",
        value: L
      })).every((L) => L) || u(p, {
        path: _ + ".grids",
        expected: "Array<BaseRowOptions | BaseRowRefOptions>",
        value: o.grids
      }), o.gridMergeStrategy === "add" || o.gridMergeStrategy === "reset" || u(p, {
        path: _ + ".gridMergeStrategy",
        expected: '("add" | "reset")',
        value: o.gridMergeStrategy
      })].every((L) => L), Ee = (o, _, p = !0) => [o.id === void 0 || typeof o.id == "string" || u(p, {
        path: _ + ".id",
        expected: "(string | undefined)",
        value: o.id
      }), o.title === void 0 || typeof o.title == "string" || u(p, {
        path: _ + ".title",
        expected: "(string | undefined)",
        value: o.title
      }), o.position === void 0 || typeof o.position == "number" || u(p, {
        path: _ + ".position",
        expected: "(number | undefined)",
        value: o.position
      }), o.minCardWidth === void 0 || typeof o.minCardWidth == "number" || u(p, {
        path: _ + ".minCardWidth",
        expected: "(number | undefined)",
        value: o.minCardWidth
      }), o.replace === void 0 || (typeof o.replace == "object" && o.replace !== null && Array.isArray(o.replace) === !1 || u(p, {
        path: _ + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: o.replace
      })) && be(o.replace, _ + ".replace", p) || u(p, {
        path: _ + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: o.replace
      }), o.filter === void 0 || (typeof o.filter == "object" && o.filter !== null && Array.isArray(o.filter) === !1 || u(p, {
        path: _ + ".filter",
        expected: "(FilterObject | undefined)",
        value: o.filter
      })) && Be(o.filter, _ + ".filter", p) || u(p, {
        path: _ + ".filter",
        expected: "(FilterObject | undefined)",
        value: o.filter
      }), o.sort === void 0 || (Array.isArray(o.sort) || u(p, {
        path: _ + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: o.sort
      })) && o.sort.map((L, le) => (typeof L == "object" && L !== null || u(p, {
        path: _ + ".sort[" + le + "]",
        expected: "SortConfig",
        value: L
      })) && k(L, _ + ".sort[" + le + "]", p) || u(p, {
        path: _ + ".sort[" + le + "]",
        expected: "SortConfig",
        value: L
      })).every((L) => L) || u(p, {
        path: _ + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: o.sort
      }), o.card === void 0 || (typeof o.card == "object" && o.card !== null && Array.isArray(o.card) === !1 || u(p, {
        path: _ + ".card",
        expected: "(DeepPartial<LovelaceCardConfig> | undefined)",
        value: o.card
      })) && m(o.card, _ + ".card", p) || u(p, {
        path: _ + ".card",
        expected: "(DeepPartial<LovelaceCardConfig> | undefined)",
        value: o.card
      })].every((L) => L), be = (o, _, p = !0) => [p === !1 || Object.keys(o).map((L) => {
        const le = o[L];
        return le === void 0 ? !0 : (typeof le == "object" && le !== null || u(p, {
          path: _ + ar._accessExpressionAsString(L),
          expected: "GridStrategyCardConfig",
          value: le
        })) && ke(le, _ + ar._accessExpressionAsString(L), p) || u(p, {
          path: _ + ar._accessExpressionAsString(L),
          expected: "GridStrategyCardConfig",
          value: le
        });
      }).every((L) => L)].every((L) => L), ke = (o, _, p = !0) => [(typeof o.card == "object" && o.card !== null || u(p, {
        path: _ + ".card",
        expected: "LovelaceCardConfig",
        value: o.card
      })) && je(o.card, _ + ".card", p) || u(p, {
        path: _ + ".card",
        expected: "LovelaceCardConfig",
        value: o.card
      })].every((L) => L), je = (o, _, p = !0) => [o.index === void 0 || typeof o.index == "number" || u(p, {
        path: _ + ".index",
        expected: "(number | undefined)",
        value: o.index
      }), o.view_index === void 0 || typeof o.view_index == "number" || u(p, {
        path: _ + ".view_index",
        expected: "(number | undefined)",
        value: o.view_index
      }), typeof o.type == "string" || u(p, {
        path: _ + ".type",
        expected: "string",
        value: o.type
      }), p === !1 || Object.keys(o).map((L) => (["index", "view_index", "type"].some((Ar) => L === Ar) || o[L] === void 0, !0)).every((L) => L)].every((L) => L), Be = (o, _, p = !0) => [o.exclude === void 0 || (Array.isArray(o.exclude) || u(p, {
        path: _ + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: o.exclude
      })) && o.exclude.map((L, le) => (typeof L == "object" && L !== null || u(p, {
        path: _ + ".exclude[" + le + "]",
        expected: "FilterConfig",
        value: L
      })) && He(L, _ + ".exclude[" + le + "]", p) || u(p, {
        path: _ + ".exclude[" + le + "]",
        expected: "FilterConfig",
        value: L
      })).every((L) => L) || u(p, {
        path: _ + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: o.exclude
      }), o.include === void 0 || (Array.isArray(o.include) || u(p, {
        path: _ + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: o.include
      })) && o.include.map((L, le) => (typeof L == "object" && L !== null || u(p, {
        path: _ + ".include[" + le + "]",
        expected: "FilterConfig",
        value: L
      })) && He(L, _ + ".include[" + le + "]", p) || u(p, {
        path: _ + ".include[" + le + "]",
        expected: "FilterConfig",
        value: L
      })).every((L) => L) || u(p, {
        path: _ + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: o.include
      })].every((L) => L), He = (o, _, p = !0) => [o.comparator === void 0 || o.comparator === "equal" || o.comparator === "match" || o.comparator === "in" || o.comparator === "greater_than" || o.comparator === "lower_than" || o.comparator === "is_null" || o.comparator === "is_numeric" || u(p, {
        path: _ + ".comparator",
        expected: '("equal" | "greater_than" | "in" | "is_null" | "is_numeric" | "lower_than" | "match" | undefined)',
        value: o.comparator
      }), !0, W.has(o.type) === !0 || u(p, {
        path: _ + ".type",
        expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
        value: o.type
      }), o.config === void 0 || (typeof o.config == "object" && o.config !== null && Array.isArray(o.config) === !1 || u(p, {
        path: _ + ".config",
        expected: "(TypeConfig | undefined)",
        value: o.config
      })) && Te(o.config, _ + ".config", p) || u(p, {
        path: _ + ".config",
        expected: "(TypeConfig | undefined)",
        value: o.config
      })].every((L) => L), Te = (o, _, p = !0) => [o.key === void 0 || typeof o.key == "string" || u(p, {
        path: _ + ".key",
        expected: "(string | undefined)",
        value: o.key
      }), o.label === void 0 || typeof o.label == "string" || u(p, {
        path: _ + ".label",
        expected: "(string | undefined)",
        value: o.label
      })].every((L) => L), k = (o, _, p = !0) => [o.comparator === void 0 || o.comparator === "ascending" || o.comparator === "descending" || u(p, {
        path: _ + ".comparator",
        expected: '("ascending" | "descending" | undefined)',
        value: o.comparator
      }), U.has(o.type) === !0 || u(p, {
        path: _ + ".type",
        expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
        value: o.type
      }), o.config === void 0 || (typeof o.config == "object" && o.config !== null && Array.isArray(o.config) === !1 || u(p, {
        path: _ + ".config",
        expected: "(TypeConfig | undefined)",
        value: o.config
      })) && Te(o.config, _ + ".config", p) || u(p, {
        path: _ + ".config",
        expected: "(TypeConfig | undefined)",
        value: o.config
      })].every((L) => L), m = (o, _, p = !0) => [o.index === void 0 || typeof o.index == "number" || u(p, {
        path: _ + ".index",
        expected: "(number | undefined)",
        value: o.index
      }), o.view_index === void 0 || typeof o.view_index == "number" || u(p, {
        path: _ + ".view_index",
        expected: "(number | undefined)",
        value: o.view_index
      }), o.type === void 0 || typeof o.type == "string" || u(p, {
        path: _ + ".type",
        expected: "(string | undefined)",
        value: o.type
      }), p === !1 || Object.keys(o).map((L) => (["index", "view_index", "type"].some((Ar) => L === Ar) || o[L] === void 0, !0)).every((L) => L)].every((L) => L), T = (o, _, p = !0) => [typeof o.id == "string" || u(p, {
        path: _ + ".id",
        expected: "string",
        value: o.id
      }), o.title === void 0 || typeof o.title == "string" || u(p, {
        path: _ + ".title",
        expected: "(string | undefined)",
        value: o.title
      }), o.position === void 0 || typeof o.position == "number" || u(p, {
        path: _ + ".position",
        expected: "(number | undefined)",
        value: o.position
      }), typeof o.minCardWidth == "number" || u(p, {
        path: _ + ".minCardWidth",
        expected: "number",
        value: o.minCardWidth
      }), o.replace === void 0 || (typeof o.replace == "object" && o.replace !== null && Array.isArray(o.replace) === !1 || u(p, {
        path: _ + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: o.replace
      })) && be(o.replace, _ + ".replace", p) || u(p, {
        path: _ + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: o.replace
      }), o.filter === void 0 || (typeof o.filter == "object" && o.filter !== null && Array.isArray(o.filter) === !1 || u(p, {
        path: _ + ".filter",
        expected: "(FilterObject | undefined)",
        value: o.filter
      })) && Be(o.filter, _ + ".filter", p) || u(p, {
        path: _ + ".filter",
        expected: "(FilterObject | undefined)",
        value: o.filter
      }), o.sort === void 0 || (Array.isArray(o.sort) || u(p, {
        path: _ + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: o.sort
      })) && o.sort.map((L, le) => (typeof L == "object" && L !== null || u(p, {
        path: _ + ".sort[" + le + "]",
        expected: "SortConfig",
        value: L
      })) && k(L, _ + ".sort[" + le + "]", p) || u(p, {
        path: _ + ".sort[" + le + "]",
        expected: "SortConfig",
        value: L
      })).every((L) => L) || u(p, {
        path: _ + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: o.sort
      }), (typeof o.card == "object" && o.card !== null || u(p, {
        path: _ + ".card",
        expected: "LovelaceCardConfig",
        value: o.card
      })) && je(o.card, _ + ".card", p) || u(p, {
        path: _ + ".card",
        expected: "LovelaceCardConfig",
        value: o.card
      })].every((L) => L), x = (o, _, p = !0) => [typeof o.gridId == "string" || u(p, {
        path: _ + ".gridId",
        expected: "string",
        value: o.gridId
      }), o.id === void 0 || typeof o.id == "string" || u(p, {
        path: _ + ".id",
        expected: "(string | undefined)",
        value: o.id
      }), o.title === void 0 || typeof o.title == "string" || u(p, {
        path: _ + ".title",
        expected: "(string | undefined)",
        value: o.title
      }), o.position === void 0 || typeof o.position == "number" || u(p, {
        path: _ + ".position",
        expected: "(number | undefined)",
        value: o.position
      }), o.minCardWidth === void 0 || typeof o.minCardWidth == "number" || u(p, {
        path: _ + ".minCardWidth",
        expected: "(number | undefined)",
        value: o.minCardWidth
      }), o.replace === void 0 || (typeof o.replace == "object" && o.replace !== null && Array.isArray(o.replace) === !1 || u(p, {
        path: _ + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: o.replace
      })) && be(o.replace, _ + ".replace", p) || u(p, {
        path: _ + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: o.replace
      }), o.filter === void 0 || (typeof o.filter == "object" && o.filter !== null && Array.isArray(o.filter) === !1 || u(p, {
        path: _ + ".filter",
        expected: "(FilterObject | undefined)",
        value: o.filter
      })) && Be(o.filter, _ + ".filter", p) || u(p, {
        path: _ + ".filter",
        expected: "(FilterObject | undefined)",
        value: o.filter
      }), o.sort === void 0 || (Array.isArray(o.sort) || u(p, {
        path: _ + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: o.sort
      })) && o.sort.map((L, le) => (typeof L == "object" && L !== null || u(p, {
        path: _ + ".sort[" + le + "]",
        expected: "SortConfig",
        value: L
      })) && k(L, _ + ".sort[" + le + "]", p) || u(p, {
        path: _ + ".sort[" + le + "]",
        expected: "SortConfig",
        value: L
      })).every((L) => L) || u(p, {
        path: _ + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: o.sort
      }), o.card === void 0 || (typeof o.card == "object" && o.card !== null && Array.isArray(o.card) === !1 || u(p, {
        path: _ + ".card",
        expected: "(DeepPartial<LovelaceCardConfig> | undefined)",
        value: o.card
      })) && m(o.card, _ + ".card", p) || u(p, {
        path: _ + ".card",
        expected: "(DeepPartial<LovelaceCardConfig> | undefined)",
        value: o.card
      })].every((L) => L), c = (o, _, p = !0) => o.gridId !== void 0 ? x(o, _, p) : T(o, _, p), a = (o) => typeof o == "object" && o !== null && H(o);
      let y, u;
      return (o) => {
        if (a(o) === !1) {
          y = [], u = Wt._validateReport(y), ((p, L, le = !0) => (typeof p == "object" && p !== null || u(!0, {
            path: L + "",
            expected: "BaseGridOptions<BaseRowOptions | BaseRowRefOptions>",
            value: p
          })) && pe(p, L + "", !0) || u(!0, {
            path: L + "",
            expected: "BaseGridOptions<BaseRowOptions | BaseRowRefOptions>",
            value: p
          }))(o, "$input", !0);
          const _ = y.length === 0;
          return _ ? {
            success: _,
            data: o
          } : {
            success: _,
            errors: y,
            data: o
          };
        }
        return {
          success: !0,
          data: o
        };
      };
    })())(d);
    throw Error(D.success ? "Something went wrong. Check config." : JSON.stringify(D.errors));
  }
  const q = (d.gridMergeStrategy == Dc.reset ? F.map((D) => D.grids).filter(vr).slice(-1)[0] : F.flatMap((D) => D.grids).filter(vr)).reduce((D, $) => {
    if ((/* @__PURE__ */ (() => {
      const J = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), W = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), U = (i) => typeof i.gridId == "string" && (i.id === void 0 || typeof i.id == "string") && (i.title === void 0 || typeof i.title == "string") && (i.position === void 0 || typeof i.position == "number") && (i.minCardWidth === void 0 || typeof i.minCardWidth == "number") && (i.replace === void 0 || typeof i.replace == "object" && i.replace !== null && Array.isArray(i.replace) === !1 && H(i.replace)) && (i.filter === void 0 || typeof i.filter == "object" && i.filter !== null && Array.isArray(i.filter) === !1 && ie(i.filter)) && (i.sort === void 0 || Array.isArray(i.sort) && i.sort.every((w) => typeof w == "object" && w !== null && X(w))) && (i.card === void 0 || typeof i.card == "object" && i.card !== null && Array.isArray(i.card) === !1 && g(i.card)), H = (i) => Object.keys(i).every((w) => {
        const I = i[w];
        return I === void 0 ? !0 : typeof I == "object" && I !== null && K(I);
      }), K = (i) => typeof i.card == "object" && i.card !== null && te(i.card), te = (i) => (i.index === void 0 || typeof i.index == "number") && (i.view_index === void 0 || typeof i.view_index == "number") && typeof i.type == "string" && Object.keys(i).every((w) => (["index", "view_index", "type"].some((M) => w === M) || i[w] === void 0, !0)), ie = (i) => (i.exclude === void 0 || Array.isArray(i.exclude) && i.exclude.every((w) => typeof w == "object" && w !== null && re(w))) && (i.include === void 0 || Array.isArray(i.include) && i.include.every((w) => typeof w == "object" && w !== null && re(w))), re = (i) => (i.comparator === void 0 || i.comparator === "equal" || i.comparator === "match" || i.comparator === "in" || i.comparator === "greater_than" || i.comparator === "lower_than" || i.comparator === "is_null" || i.comparator === "is_numeric") && !0 && J.has(i.type) === !0 && (i.config === void 0 || typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 && Q(i.config)), Q = (i) => (i.key === void 0 || typeof i.key == "string") && (i.label === void 0 || typeof i.label == "string"), X = (i) => (i.comparator === void 0 || i.comparator === "ascending" || i.comparator === "descending") && W.has(i.type) === !0 && (i.config === void 0 || typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 && Q(i.config)), g = (i) => (i.index === void 0 || typeof i.index == "number") && (i.view_index === void 0 || typeof i.view_index == "number") && (i.type === void 0 || typeof i.type == "string") && Object.keys(i).every((w) => (["index", "view_index", "type"].some((M) => w === M) || i[w] === void 0, !0));
      return (i) => typeof i == "object" && i !== null && U(i);
    })())($))
      if (D[$.gridId])
        D[$.gridId] = {
          ...D[$.gridId],
          ...$
        };
      else
        throw Error(`gridId '${$.gridId}' not defined`);
    else {
      const J = Mt.mergeWith({}, d.global, $, $c);
      if (!(/* @__PURE__ */ (() => {
        const W = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), U = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), H = (i) => typeof i.id == "string" && (i.title === void 0 || typeof i.title == "string") && (i.position === void 0 || typeof i.position == "number") && typeof i.minCardWidth == "number" && (i.replace === void 0 || typeof i.replace == "object" && i.replace !== null && Array.isArray(i.replace) === !1 && K(i.replace)) && (i.filter === void 0 || typeof i.filter == "object" && i.filter !== null && Array.isArray(i.filter) === !1 && re(i.filter)) && (i.sort === void 0 || Array.isArray(i.sort) && i.sort.every((w) => typeof w == "object" && w !== null && g(w))) && typeof i.card == "object" && i.card !== null && ie(i.card), K = (i) => Object.keys(i).every((w) => {
          const I = i[w];
          return I === void 0 ? !0 : typeof I == "object" && I !== null && te(I);
        }), te = (i) => typeof i.card == "object" && i.card !== null && ie(i.card), ie = (i) => (i.index === void 0 || typeof i.index == "number") && (i.view_index === void 0 || typeof i.view_index == "number") && typeof i.type == "string" && Object.keys(i).every((w) => (["index", "view_index", "type"].some((M) => w === M) || i[w] === void 0, !0)), re = (i) => (i.exclude === void 0 || Array.isArray(i.exclude) && i.exclude.every((w) => typeof w == "object" && w !== null && Q(w))) && (i.include === void 0 || Array.isArray(i.include) && i.include.every((w) => typeof w == "object" && w !== null && Q(w))), Q = (i) => (i.comparator === void 0 || i.comparator === "equal" || i.comparator === "match" || i.comparator === "in" || i.comparator === "greater_than" || i.comparator === "lower_than" || i.comparator === "is_null" || i.comparator === "is_numeric") && !0 && W.has(i.type) === !0 && (i.config === void 0 || typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 && X(i.config)), X = (i) => (i.key === void 0 || typeof i.key == "string") && (i.label === void 0 || typeof i.label == "string"), g = (i) => (i.comparator === void 0 || i.comparator === "ascending" || i.comparator === "descending") && U.has(i.type) === !0 && (i.config === void 0 || typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 && X(i.config));
        return (i) => typeof i == "object" && i !== null && H(i);
      })())(J)) {
        const W = (/* @__PURE__ */ (() => {
          const U = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), H = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), K = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), te = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), ie = (m) => typeof m.id == "string" && (m.title === void 0 || typeof m.title == "string") && (m.position === void 0 || typeof m.position == "number") && typeof m.minCardWidth == "number" && (m.replace === void 0 || typeof m.replace == "object" && m.replace !== null && Array.isArray(m.replace) === !1 && re(m.replace)) && (m.filter === void 0 || typeof m.filter == "object" && m.filter !== null && Array.isArray(m.filter) === !1 && g(m.filter)) && (m.sort === void 0 || Array.isArray(m.sort) && m.sort.every((T) => typeof T == "object" && T !== null && I(T))) && typeof m.card == "object" && m.card !== null && X(m.card), re = (m) => Object.keys(m).every((T) => {
            const x = m[T];
            return x === void 0 ? !0 : typeof x == "object" && x !== null && Q(x);
          }), Q = (m) => typeof m.card == "object" && m.card !== null && X(m.card), X = (m) => (m.index === void 0 || typeof m.index == "number") && (m.view_index === void 0 || typeof m.view_index == "number") && typeof m.type == "string" && Object.keys(m).every((T) => (["index", "view_index", "type"].some((c) => T === c) || m[T] === void 0, !0)), g = (m) => (m.exclude === void 0 || Array.isArray(m.exclude) && m.exclude.every((T) => typeof T == "object" && T !== null && i(T))) && (m.include === void 0 || Array.isArray(m.include) && m.include.every((T) => typeof T == "object" && T !== null && i(T))), i = (m) => (m.comparator === void 0 || m.comparator === "equal" || m.comparator === "match" || m.comparator === "in" || m.comparator === "greater_than" || m.comparator === "lower_than" || m.comparator === "is_null" || m.comparator === "is_numeric") && !0 && U.has(m.type) === !0 && (m.config === void 0 || typeof m.config == "object" && m.config !== null && Array.isArray(m.config) === !1 && w(m.config)), w = (m) => (m.key === void 0 || typeof m.key == "string") && (m.label === void 0 || typeof m.label == "string"), I = (m) => (m.comparator === void 0 || m.comparator === "ascending" || m.comparator === "descending") && H.has(m.type) === !0 && (m.config === void 0 || typeof m.config == "object" && m.config !== null && Array.isArray(m.config) === !1 && w(m.config)), M = (m, T, x = !0) => [typeof m.id == "string" || k(x, {
            path: T + ".id",
            expected: "string",
            value: m.id
          }), m.title === void 0 || typeof m.title == "string" || k(x, {
            path: T + ".title",
            expected: "(string | undefined)",
            value: m.title
          }), m.position === void 0 || typeof m.position == "number" || k(x, {
            path: T + ".position",
            expected: "(number | undefined)",
            value: m.position
          }), typeof m.minCardWidth == "number" || k(x, {
            path: T + ".minCardWidth",
            expected: "number",
            value: m.minCardWidth
          }), m.replace === void 0 || (typeof m.replace == "object" && m.replace !== null && Array.isArray(m.replace) === !1 || k(x, {
            path: T + ".replace",
            expected: "(Record<string, GridStrategyCardConfig> | undefined)",
            value: m.replace
          })) && se(m.replace, T + ".replace", x) || k(x, {
            path: T + ".replace",
            expected: "(Record<string, GridStrategyCardConfig> | undefined)",
            value: m.replace
          }), m.filter === void 0 || (typeof m.filter == "object" && m.filter !== null && Array.isArray(m.filter) === !1 || k(x, {
            path: T + ".filter",
            expected: "(FilterObject | undefined)",
            value: m.filter
          })) && be(m.filter, T + ".filter", x) || k(x, {
            path: T + ".filter",
            expected: "(FilterObject | undefined)",
            value: m.filter
          }), m.sort === void 0 || (Array.isArray(m.sort) || k(x, {
            path: T + ".sort",
            expected: "(Array<SortConfig> | undefined)",
            value: m.sort
          })) && m.sort.map((c, a) => (typeof c == "object" && c !== null || k(x, {
            path: T + ".sort[" + a + "]",
            expected: "SortConfig",
            value: c
          })) && Be(c, T + ".sort[" + a + "]", x) || k(x, {
            path: T + ".sort[" + a + "]",
            expected: "SortConfig",
            value: c
          })).every((c) => c) || k(x, {
            path: T + ".sort",
            expected: "(Array<SortConfig> | undefined)",
            value: m.sort
          }), (typeof m.card == "object" && m.card !== null || k(x, {
            path: T + ".card",
            expected: "LovelaceCardConfig",
            value: m.card
          })) && Ee(m.card, T + ".card", x) || k(x, {
            path: T + ".card",
            expected: "LovelaceCardConfig",
            value: m.card
          })].every((c) => c), se = (m, T, x = !0) => [x === !1 || Object.keys(m).map((c) => {
            const a = m[c];
            return a === void 0 ? !0 : (typeof a == "object" && a !== null || k(x, {
              path: T + ar._accessExpressionAsString(c),
              expected: "GridStrategyCardConfig",
              value: a
            })) && pe(a, T + ar._accessExpressionAsString(c), x) || k(x, {
              path: T + ar._accessExpressionAsString(c),
              expected: "GridStrategyCardConfig",
              value: a
            });
          }).every((c) => c)].every((c) => c), pe = (m, T, x = !0) => [(typeof m.card == "object" && m.card !== null || k(x, {
            path: T + ".card",
            expected: "LovelaceCardConfig",
            value: m.card
          })) && Ee(m.card, T + ".card", x) || k(x, {
            path: T + ".card",
            expected: "LovelaceCardConfig",
            value: m.card
          })].every((c) => c), Ee = (m, T, x = !0) => [m.index === void 0 || typeof m.index == "number" || k(x, {
            path: T + ".index",
            expected: "(number | undefined)",
            value: m.index
          }), m.view_index === void 0 || typeof m.view_index == "number" || k(x, {
            path: T + ".view_index",
            expected: "(number | undefined)",
            value: m.view_index
          }), typeof m.type == "string" || k(x, {
            path: T + ".type",
            expected: "string",
            value: m.type
          }), x === !1 || Object.keys(m).map((c) => (["index", "view_index", "type"].some((y) => c === y) || m[c] === void 0, !0)).every((c) => c)].every((c) => c), be = (m, T, x = !0) => [m.exclude === void 0 || (Array.isArray(m.exclude) || k(x, {
            path: T + ".exclude",
            expected: "(Array<FilterConfig> | undefined)",
            value: m.exclude
          })) && m.exclude.map((c, a) => (typeof c == "object" && c !== null || k(x, {
            path: T + ".exclude[" + a + "]",
            expected: "FilterConfig",
            value: c
          })) && ke(c, T + ".exclude[" + a + "]", x) || k(x, {
            path: T + ".exclude[" + a + "]",
            expected: "FilterConfig",
            value: c
          })).every((c) => c) || k(x, {
            path: T + ".exclude",
            expected: "(Array<FilterConfig> | undefined)",
            value: m.exclude
          }), m.include === void 0 || (Array.isArray(m.include) || k(x, {
            path: T + ".include",
            expected: "(Array<FilterConfig> | undefined)",
            value: m.include
          })) && m.include.map((c, a) => (typeof c == "object" && c !== null || k(x, {
            path: T + ".include[" + a + "]",
            expected: "FilterConfig",
            value: c
          })) && ke(c, T + ".include[" + a + "]", x) || k(x, {
            path: T + ".include[" + a + "]",
            expected: "FilterConfig",
            value: c
          })).every((c) => c) || k(x, {
            path: T + ".include",
            expected: "(Array<FilterConfig> | undefined)",
            value: m.include
          })].every((c) => c), ke = (m, T, x = !0) => [m.comparator === void 0 || m.comparator === "equal" || m.comparator === "match" || m.comparator === "in" || m.comparator === "greater_than" || m.comparator === "lower_than" || m.comparator === "is_null" || m.comparator === "is_numeric" || k(x, {
            path: T + ".comparator",
            expected: '("equal" | "greater_than" | "in" | "is_null" | "is_numeric" | "lower_than" | "match" | undefined)',
            value: m.comparator
          }), !0, K.has(m.type) === !0 || k(x, {
            path: T + ".type",
            expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
            value: m.type
          }), m.config === void 0 || (typeof m.config == "object" && m.config !== null && Array.isArray(m.config) === !1 || k(x, {
            path: T + ".config",
            expected: "(TypeConfig | undefined)",
            value: m.config
          })) && je(m.config, T + ".config", x) || k(x, {
            path: T + ".config",
            expected: "(TypeConfig | undefined)",
            value: m.config
          })].every((c) => c), je = (m, T, x = !0) => [m.key === void 0 || typeof m.key == "string" || k(x, {
            path: T + ".key",
            expected: "(string | undefined)",
            value: m.key
          }), m.label === void 0 || typeof m.label == "string" || k(x, {
            path: T + ".label",
            expected: "(string | undefined)",
            value: m.label
          })].every((c) => c), Be = (m, T, x = !0) => [m.comparator === void 0 || m.comparator === "ascending" || m.comparator === "descending" || k(x, {
            path: T + ".comparator",
            expected: '("ascending" | "descending" | undefined)',
            value: m.comparator
          }), te.has(m.type) === !0 || k(x, {
            path: T + ".type",
            expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
            value: m.type
          }), m.config === void 0 || (typeof m.config == "object" && m.config !== null && Array.isArray(m.config) === !1 || k(x, {
            path: T + ".config",
            expected: "(TypeConfig | undefined)",
            value: m.config
          })) && je(m.config, T + ".config", x) || k(x, {
            path: T + ".config",
            expected: "(TypeConfig | undefined)",
            value: m.config
          })].every((c) => c), He = (m) => typeof m == "object" && m !== null && ie(m);
          let Te, k;
          return (m) => {
            if (He(m) === !1) {
              Te = [], k = Wt._validateReport(Te), ((x, c, a = !0) => (typeof x == "object" && x !== null || k(!0, {
                path: c + "",
                expected: "BaseRowOptions",
                value: x
              })) && M(x, c + "", !0) || k(!0, {
                path: c + "",
                expected: "BaseRowOptions",
                value: x
              }))(m, "$input", !0);
              const T = Te.length === 0;
              return T ? {
                success: T,
                data: m
              } : {
                success: T,
                errors: Te,
                data: m
              };
            }
            return {
              success: !0,
              data: m
            };
          };
        })())(J);
        throw Error(W.success ? "Something went wrong. Check config." : JSON.stringify(W.errors));
      }
      D[J.id] = J;
    }
    return D;
  }, {});
  if (d.grids = Object.values(q).sort((D, $) => (D.position || 0) - ($.position || 0)), !(/* @__PURE__ */ (() => {
    const D = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), $ = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), J = (i) => (i.global === void 0 || typeof i.global == "object" && i.global !== null && Array.isArray(i.global) === !1 && W(i.global)) && Array.isArray(i.grids) && i.grids.every((w) => typeof w == "object" && w !== null && g(w)) && (i.gridMergeStrategy === "add" || i.gridMergeStrategy === "reset"), W = (i) => (i.id === void 0 || typeof i.id == "string") && (i.title === void 0 || typeof i.title == "string") && (i.position === void 0 || typeof i.position == "number") && (i.minCardWidth === void 0 || typeof i.minCardWidth == "number") && (i.replace === void 0 || typeof i.replace == "object" && i.replace !== null && Array.isArray(i.replace) === !1 && U(i.replace)) && (i.filter === void 0 || typeof i.filter == "object" && i.filter !== null && Array.isArray(i.filter) === !1 && te(i.filter)) && (i.sort === void 0 || Array.isArray(i.sort) && i.sort.every((w) => typeof w == "object" && w !== null && Q(w))) && (i.card === void 0 || typeof i.card == "object" && i.card !== null && Array.isArray(i.card) === !1 && X(i.card)), U = (i) => Object.keys(i).every((w) => {
      const I = i[w];
      return I === void 0 ? !0 : typeof I == "object" && I !== null && H(I);
    }), H = (i) => typeof i.card == "object" && i.card !== null && K(i.card), K = (i) => (i.index === void 0 || typeof i.index == "number") && (i.view_index === void 0 || typeof i.view_index == "number") && typeof i.type == "string" && Object.keys(i).every((w) => (["index", "view_index", "type"].some((M) => w === M) || i[w] === void 0, !0)), te = (i) => (i.exclude === void 0 || Array.isArray(i.exclude) && i.exclude.every((w) => typeof w == "object" && w !== null && ie(w))) && (i.include === void 0 || Array.isArray(i.include) && i.include.every((w) => typeof w == "object" && w !== null && ie(w))), ie = (i) => (i.comparator === void 0 || i.comparator === "equal" || i.comparator === "match" || i.comparator === "in" || i.comparator === "greater_than" || i.comparator === "lower_than" || i.comparator === "is_null" || i.comparator === "is_numeric") && !0 && D.has(i.type) === !0 && (i.config === void 0 || typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 && re(i.config)), re = (i) => (i.key === void 0 || typeof i.key == "string") && (i.label === void 0 || typeof i.label == "string"), Q = (i) => (i.comparator === void 0 || i.comparator === "ascending" || i.comparator === "descending") && $.has(i.type) === !0 && (i.config === void 0 || typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 && re(i.config)), X = (i) => (i.index === void 0 || typeof i.index == "number") && (i.view_index === void 0 || typeof i.view_index == "number") && (i.type === void 0 || typeof i.type == "string") && Object.keys(i).every((w) => (["index", "view_index", "type"].some((M) => w === M) || i[w] === void 0, !0)), g = (i) => typeof i.id == "string" && (i.title === void 0 || typeof i.title == "string") && (i.position === void 0 || typeof i.position == "number") && typeof i.minCardWidth == "number" && (i.replace === void 0 || typeof i.replace == "object" && i.replace !== null && Array.isArray(i.replace) === !1 && U(i.replace)) && (i.filter === void 0 || typeof i.filter == "object" && i.filter !== null && Array.isArray(i.filter) === !1 && te(i.filter)) && (i.sort === void 0 || Array.isArray(i.sort) && i.sort.every((w) => typeof w == "object" && w !== null && Q(w))) && typeof i.card == "object" && i.card !== null && K(i.card);
    return (i) => typeof i == "object" && i !== null && J(i);
  })())(d)) {
    const D = (/* @__PURE__ */ (() => {
      const $ = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), J = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), W = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), U = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), H = (c) => (c.global === void 0 || typeof c.global == "object" && c.global !== null && Array.isArray(c.global) === !1 && K(c.global)) && Array.isArray(c.grids) && c.grids.every((a) => typeof a == "object" && a !== null && I(a)) && (c.gridMergeStrategy === "add" || c.gridMergeStrategy === "reset"), K = (c) => (c.id === void 0 || typeof c.id == "string") && (c.title === void 0 || typeof c.title == "string") && (c.position === void 0 || typeof c.position == "number") && (c.minCardWidth === void 0 || typeof c.minCardWidth == "number") && (c.replace === void 0 || typeof c.replace == "object" && c.replace !== null && Array.isArray(c.replace) === !1 && te(c.replace)) && (c.filter === void 0 || typeof c.filter == "object" && c.filter !== null && Array.isArray(c.filter) === !1 && Q(c.filter)) && (c.sort === void 0 || Array.isArray(c.sort) && c.sort.every((a) => typeof a == "object" && a !== null && i(a))) && (c.card === void 0 || typeof c.card == "object" && c.card !== null && Array.isArray(c.card) === !1 && w(c.card)), te = (c) => Object.keys(c).every((a) => {
        const y = c[a];
        return y === void 0 ? !0 : typeof y == "object" && y !== null && ie(y);
      }), ie = (c) => typeof c.card == "object" && c.card !== null && re(c.card), re = (c) => (c.index === void 0 || typeof c.index == "number") && (c.view_index === void 0 || typeof c.view_index == "number") && typeof c.type == "string" && Object.keys(c).every((a) => (["index", "view_index", "type"].some((u) => a === u) || c[a] === void 0, !0)), Q = (c) => (c.exclude === void 0 || Array.isArray(c.exclude) && c.exclude.every((a) => typeof a == "object" && a !== null && X(a))) && (c.include === void 0 || Array.isArray(c.include) && c.include.every((a) => typeof a == "object" && a !== null && X(a))), X = (c) => (c.comparator === void 0 || c.comparator === "equal" || c.comparator === "match" || c.comparator === "in" || c.comparator === "greater_than" || c.comparator === "lower_than" || c.comparator === "is_null" || c.comparator === "is_numeric") && !0 && $.has(c.type) === !0 && (c.config === void 0 || typeof c.config == "object" && c.config !== null && Array.isArray(c.config) === !1 && g(c.config)), g = (c) => (c.key === void 0 || typeof c.key == "string") && (c.label === void 0 || typeof c.label == "string"), i = (c) => (c.comparator === void 0 || c.comparator === "ascending" || c.comparator === "descending") && J.has(c.type) === !0 && (c.config === void 0 || typeof c.config == "object" && c.config !== null && Array.isArray(c.config) === !1 && g(c.config)), w = (c) => (c.index === void 0 || typeof c.index == "number") && (c.view_index === void 0 || typeof c.view_index == "number") && (c.type === void 0 || typeof c.type == "string") && Object.keys(c).every((a) => (["index", "view_index", "type"].some((u) => a === u) || c[a] === void 0, !0)), I = (c) => typeof c.id == "string" && (c.title === void 0 || typeof c.title == "string") && (c.position === void 0 || typeof c.position == "number") && typeof c.minCardWidth == "number" && (c.replace === void 0 || typeof c.replace == "object" && c.replace !== null && Array.isArray(c.replace) === !1 && te(c.replace)) && (c.filter === void 0 || typeof c.filter == "object" && c.filter !== null && Array.isArray(c.filter) === !1 && Q(c.filter)) && (c.sort === void 0 || Array.isArray(c.sort) && c.sort.every((a) => typeof a == "object" && a !== null && i(a))) && typeof c.card == "object" && c.card !== null && re(c.card), M = (c, a, y = !0) => [c.global === void 0 || (typeof c.global == "object" && c.global !== null && Array.isArray(c.global) === !1 || x(y, {
        path: a + ".global",
        expected: "(DeepPartial<BaseRowOptions> | undefined)",
        value: c.global
      })) && se(c.global, a + ".global", y) || x(y, {
        path: a + ".global",
        expected: "(DeepPartial<BaseRowOptions> | undefined)",
        value: c.global
      }), (Array.isArray(c.grids) || x(y, {
        path: a + ".grids",
        expected: "Array<BaseRowOptions>",
        value: c.grids
      })) && c.grids.map((u, o) => (typeof u == "object" && u !== null || x(y, {
        path: a + ".grids[" + o + "]",
        expected: "BaseRowOptions",
        value: u
      })) && k(u, a + ".grids[" + o + "]", y) || x(y, {
        path: a + ".grids[" + o + "]",
        expected: "BaseRowOptions",
        value: u
      })).every((u) => u) || x(y, {
        path: a + ".grids",
        expected: "Array<BaseRowOptions>",
        value: c.grids
      }), c.gridMergeStrategy === "add" || c.gridMergeStrategy === "reset" || x(y, {
        path: a + ".gridMergeStrategy",
        expected: '("add" | "reset")',
        value: c.gridMergeStrategy
      })].every((u) => u), se = (c, a, y = !0) => [c.id === void 0 || typeof c.id == "string" || x(y, {
        path: a + ".id",
        expected: "(string | undefined)",
        value: c.id
      }), c.title === void 0 || typeof c.title == "string" || x(y, {
        path: a + ".title",
        expected: "(string | undefined)",
        value: c.title
      }), c.position === void 0 || typeof c.position == "number" || x(y, {
        path: a + ".position",
        expected: "(number | undefined)",
        value: c.position
      }), c.minCardWidth === void 0 || typeof c.minCardWidth == "number" || x(y, {
        path: a + ".minCardWidth",
        expected: "(number | undefined)",
        value: c.minCardWidth
      }), c.replace === void 0 || (typeof c.replace == "object" && c.replace !== null && Array.isArray(c.replace) === !1 || x(y, {
        path: a + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: c.replace
      })) && pe(c.replace, a + ".replace", y) || x(y, {
        path: a + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: c.replace
      }), c.filter === void 0 || (typeof c.filter == "object" && c.filter !== null && Array.isArray(c.filter) === !1 || x(y, {
        path: a + ".filter",
        expected: "(FilterObject | undefined)",
        value: c.filter
      })) && ke(c.filter, a + ".filter", y) || x(y, {
        path: a + ".filter",
        expected: "(FilterObject | undefined)",
        value: c.filter
      }), c.sort === void 0 || (Array.isArray(c.sort) || x(y, {
        path: a + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: c.sort
      })) && c.sort.map((u, o) => (typeof u == "object" && u !== null || x(y, {
        path: a + ".sort[" + o + "]",
        expected: "SortConfig",
        value: u
      })) && He(u, a + ".sort[" + o + "]", y) || x(y, {
        path: a + ".sort[" + o + "]",
        expected: "SortConfig",
        value: u
      })).every((u) => u) || x(y, {
        path: a + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: c.sort
      }), c.card === void 0 || (typeof c.card == "object" && c.card !== null && Array.isArray(c.card) === !1 || x(y, {
        path: a + ".card",
        expected: "(DeepPartial<LovelaceCardConfig> | undefined)",
        value: c.card
      })) && Te(c.card, a + ".card", y) || x(y, {
        path: a + ".card",
        expected: "(DeepPartial<LovelaceCardConfig> | undefined)",
        value: c.card
      })].every((u) => u), pe = (c, a, y = !0) => [y === !1 || Object.keys(c).map((u) => {
        const o = c[u];
        return o === void 0 ? !0 : (typeof o == "object" && o !== null || x(y, {
          path: a + ar._accessExpressionAsString(u),
          expected: "GridStrategyCardConfig",
          value: o
        })) && Ee(o, a + ar._accessExpressionAsString(u), y) || x(y, {
          path: a + ar._accessExpressionAsString(u),
          expected: "GridStrategyCardConfig",
          value: o
        });
      }).every((u) => u)].every((u) => u), Ee = (c, a, y = !0) => [(typeof c.card == "object" && c.card !== null || x(y, {
        path: a + ".card",
        expected: "LovelaceCardConfig",
        value: c.card
      })) && be(c.card, a + ".card", y) || x(y, {
        path: a + ".card",
        expected: "LovelaceCardConfig",
        value: c.card
      })].every((u) => u), be = (c, a, y = !0) => [c.index === void 0 || typeof c.index == "number" || x(y, {
        path: a + ".index",
        expected: "(number | undefined)",
        value: c.index
      }), c.view_index === void 0 || typeof c.view_index == "number" || x(y, {
        path: a + ".view_index",
        expected: "(number | undefined)",
        value: c.view_index
      }), typeof c.type == "string" || x(y, {
        path: a + ".type",
        expected: "string",
        value: c.type
      }), y === !1 || Object.keys(c).map((u) => (["index", "view_index", "type"].some((_) => u === _) || c[u] === void 0, !0)).every((u) => u)].every((u) => u), ke = (c, a, y = !0) => [c.exclude === void 0 || (Array.isArray(c.exclude) || x(y, {
        path: a + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: c.exclude
      })) && c.exclude.map((u, o) => (typeof u == "object" && u !== null || x(y, {
        path: a + ".exclude[" + o + "]",
        expected: "FilterConfig",
        value: u
      })) && je(u, a + ".exclude[" + o + "]", y) || x(y, {
        path: a + ".exclude[" + o + "]",
        expected: "FilterConfig",
        value: u
      })).every((u) => u) || x(y, {
        path: a + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: c.exclude
      }), c.include === void 0 || (Array.isArray(c.include) || x(y, {
        path: a + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: c.include
      })) && c.include.map((u, o) => (typeof u == "object" && u !== null || x(y, {
        path: a + ".include[" + o + "]",
        expected: "FilterConfig",
        value: u
      })) && je(u, a + ".include[" + o + "]", y) || x(y, {
        path: a + ".include[" + o + "]",
        expected: "FilterConfig",
        value: u
      })).every((u) => u) || x(y, {
        path: a + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: c.include
      })].every((u) => u), je = (c, a, y = !0) => [c.comparator === void 0 || c.comparator === "equal" || c.comparator === "match" || c.comparator === "in" || c.comparator === "greater_than" || c.comparator === "lower_than" || c.comparator === "is_null" || c.comparator === "is_numeric" || x(y, {
        path: a + ".comparator",
        expected: '("equal" | "greater_than" | "in" | "is_null" | "is_numeric" | "lower_than" | "match" | undefined)',
        value: c.comparator
      }), !0, W.has(c.type) === !0 || x(y, {
        path: a + ".type",
        expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
        value: c.type
      }), c.config === void 0 || (typeof c.config == "object" && c.config !== null && Array.isArray(c.config) === !1 || x(y, {
        path: a + ".config",
        expected: "(TypeConfig | undefined)",
        value: c.config
      })) && Be(c.config, a + ".config", y) || x(y, {
        path: a + ".config",
        expected: "(TypeConfig | undefined)",
        value: c.config
      })].every((u) => u), Be = (c, a, y = !0) => [c.key === void 0 || typeof c.key == "string" || x(y, {
        path: a + ".key",
        expected: "(string | undefined)",
        value: c.key
      }), c.label === void 0 || typeof c.label == "string" || x(y, {
        path: a + ".label",
        expected: "(string | undefined)",
        value: c.label
      })].every((u) => u), He = (c, a, y = !0) => [c.comparator === void 0 || c.comparator === "ascending" || c.comparator === "descending" || x(y, {
        path: a + ".comparator",
        expected: '("ascending" | "descending" | undefined)',
        value: c.comparator
      }), U.has(c.type) === !0 || x(y, {
        path: a + ".type",
        expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
        value: c.type
      }), c.config === void 0 || (typeof c.config == "object" && c.config !== null && Array.isArray(c.config) === !1 || x(y, {
        path: a + ".config",
        expected: "(TypeConfig | undefined)",
        value: c.config
      })) && Be(c.config, a + ".config", y) || x(y, {
        path: a + ".config",
        expected: "(TypeConfig | undefined)",
        value: c.config
      })].every((u) => u), Te = (c, a, y = !0) => [c.index === void 0 || typeof c.index == "number" || x(y, {
        path: a + ".index",
        expected: "(number | undefined)",
        value: c.index
      }), c.view_index === void 0 || typeof c.view_index == "number" || x(y, {
        path: a + ".view_index",
        expected: "(number | undefined)",
        value: c.view_index
      }), c.type === void 0 || typeof c.type == "string" || x(y, {
        path: a + ".type",
        expected: "(string | undefined)",
        value: c.type
      }), y === !1 || Object.keys(c).map((u) => (["index", "view_index", "type"].some((_) => u === _) || c[u] === void 0, !0)).every((u) => u)].every((u) => u), k = (c, a, y = !0) => [typeof c.id == "string" || x(y, {
        path: a + ".id",
        expected: "string",
        value: c.id
      }), c.title === void 0 || typeof c.title == "string" || x(y, {
        path: a + ".title",
        expected: "(string | undefined)",
        value: c.title
      }), c.position === void 0 || typeof c.position == "number" || x(y, {
        path: a + ".position",
        expected: "(number | undefined)",
        value: c.position
      }), typeof c.minCardWidth == "number" || x(y, {
        path: a + ".minCardWidth",
        expected: "number",
        value: c.minCardWidth
      }), c.replace === void 0 || (typeof c.replace == "object" && c.replace !== null && Array.isArray(c.replace) === !1 || x(y, {
        path: a + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: c.replace
      })) && pe(c.replace, a + ".replace", y) || x(y, {
        path: a + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: c.replace
      }), c.filter === void 0 || (typeof c.filter == "object" && c.filter !== null && Array.isArray(c.filter) === !1 || x(y, {
        path: a + ".filter",
        expected: "(FilterObject | undefined)",
        value: c.filter
      })) && ke(c.filter, a + ".filter", y) || x(y, {
        path: a + ".filter",
        expected: "(FilterObject | undefined)",
        value: c.filter
      }), c.sort === void 0 || (Array.isArray(c.sort) || x(y, {
        path: a + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: c.sort
      })) && c.sort.map((u, o) => (typeof u == "object" && u !== null || x(y, {
        path: a + ".sort[" + o + "]",
        expected: "SortConfig",
        value: u
      })) && He(u, a + ".sort[" + o + "]", y) || x(y, {
        path: a + ".sort[" + o + "]",
        expected: "SortConfig",
        value: u
      })).every((u) => u) || x(y, {
        path: a + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: c.sort
      }), (typeof c.card == "object" && c.card !== null || x(y, {
        path: a + ".card",
        expected: "LovelaceCardConfig",
        value: c.card
      })) && be(c.card, a + ".card", y) || x(y, {
        path: a + ".card",
        expected: "LovelaceCardConfig",
        value: c.card
      })].every((u) => u), m = (c) => typeof c == "object" && c !== null && H(c);
      let T, x;
      return (c) => {
        if (m(c) === !1) {
          T = [], x = Wt._validateReport(T), ((y, u, o = !0) => (typeof y == "object" && y !== null || x(!0, {
            path: u + "",
            expected: "BaseGridOptions<BaseRowOptions>",
            value: y
          })) && M(y, u + "", !0) || x(!0, {
            path: u + "",
            expected: "BaseGridOptions<BaseRowOptions>",
            value: y
          }))(c, "$input", !0);
          const a = T.length === 0;
          return a ? {
            success: a,
            data: c
          } : {
            success: a,
            errors: T,
            data: c
          };
        }
        return {
          success: !0,
          data: c
        };
      };
    })())(d);
    throw Error(D.success ? "Something went wrong. Check config." : JSON.stringify(D.errors));
  }
  return d;
}, ti = (j, F, d = { placeholder: "$entity", key: "entity_id" }) => {
  const N = [], q = [];
  return F.forEach((D, $) => {
    var H;
    const J = ((H = (j.replace || {})[D[d.key]]) == null ? void 0 : H.card) || j.card, W = Object.fromEntries([
      ...d.replaces || [],
      ["$index", $.toString()],
      [d.placeholder, D[d.key]]
    ]), U = Object.entries(J).filter(([K, te]) => {
      const ie = JSON.stringify(te);
      return Object.keys(W).some((re) => ie.includes(re));
    }).map(([K, te]) => {
      const ie = JSON.stringify(te), re = Object.entries(W).reduce((Q, X) => Q.replaceAll(X[0], X[1]), ie);
      return [K, JSON.parse(re)];
    });
    q.push({
      type: "vertical-stack",
      cards: [
        {
          ...J,
          ...Object.fromEntries(U)
        }
      ]
    });
  }), q.length > 0 && (j.title && N.push({
    type: "markdown",
    text_only: !0,
    content: "## " + j.title
  }), N.push({
    type: "custom:layout-card",
    layout_type: "custom:grid-layout",
    layout: {
      "grid-template-rows": "auto",
      "grid-template-columns": `repeat(auto-fit, minmax(${j.minCardWidth}px, 1fr))`
    },
    cards: q
  })), N;
}, Nc = (...j) => {
  const F = j.filter(vr).reduce((d, N) => ({ ...d, ...N }));
  if (F.navigation = j.map((d) => d == null ? void 0 : d.navigation).filter(vr).reduce((d, N) => ({ ...d, ...N })), !(/* @__PURE__ */ (() => {
    const d = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), N = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), q = (g) => Array.isArray(g.main) && g.main.every((i) => typeof i == "object" && i !== null && D(i)) && typeof g.navigation == "object" && g.navigation !== null && $(g.navigation) && (g.topCards === void 0 || Array.isArray(g.topCards) && g.topCards.every((i) => typeof i == "object" && i !== null && U(i))) && (g.extraViews === void 0 || Array.isArray(g.extraViews) && g.extraViews.every((i) => typeof i == "object" && i !== null && Array.isArray(i) === !1 && re(i))), D = (g) => typeof g.title == "string" && typeof g.icon == "string" && typeof g.match == "string", $ = (g) => typeof g.id == "string" && (g.title === void 0 || typeof g.title == "string") && (g.position === void 0 || typeof g.position == "number") && typeof g.minCardWidth == "number" && (g.replace === void 0 || typeof g.replace == "object" && g.replace !== null && Array.isArray(g.replace) === !1 && J(g.replace)) && (g.filter === void 0 || typeof g.filter == "object" && g.filter !== null && Array.isArray(g.filter) === !1 && H(g.filter)) && (g.sort === void 0 || Array.isArray(g.sort) && g.sort.every((i) => typeof i == "object" && i !== null && ie(i))) && typeof g.card == "object" && g.card !== null && U(g.card), J = (g) => Object.keys(g).every((i) => {
      const w = g[i];
      return w === void 0 ? !0 : typeof w == "object" && w !== null && W(w);
    }), W = (g) => typeof g.card == "object" && g.card !== null && U(g.card), U = (g) => (g.index === void 0 || typeof g.index == "number") && (g.view_index === void 0 || typeof g.view_index == "number") && typeof g.type == "string" && Object.keys(g).every((i) => (["index", "view_index", "type"].some((I) => i === I) || g[i] === void 0, !0)), H = (g) => (g.exclude === void 0 || Array.isArray(g.exclude) && g.exclude.every((i) => typeof i == "object" && i !== null && K(i))) && (g.include === void 0 || Array.isArray(g.include) && g.include.every((i) => typeof i == "object" && i !== null && K(i))), K = (g) => (g.comparator === void 0 || g.comparator === "equal" || g.comparator === "match" || g.comparator === "in" || g.comparator === "greater_than" || g.comparator === "lower_than" || g.comparator === "is_null" || g.comparator === "is_numeric") && !0 && d.has(g.type) === !0 && (g.config === void 0 || typeof g.config == "object" && g.config !== null && Array.isArray(g.config) === !1 && te(g.config)), te = (g) => (g.key === void 0 || typeof g.key == "string") && (g.label === void 0 || typeof g.label == "string"), ie = (g) => (g.comparator === void 0 || g.comparator === "ascending" || g.comparator === "descending") && N.has(g.type) === !0 && (g.config === void 0 || typeof g.config == "object" && g.config !== null && Array.isArray(g.config) === !1 && te(g.config)), re = (g) => (g.index === void 0 || typeof g.index == "number") && (g.title === void 0 || typeof g.title == "string") && (g.badges === void 0 || Array.isArray(g.badges) && g.badges.every((i) => i != null && (typeof i == "string" || typeof i == "object" && i !== null && Array.isArray(i) === !1 && Q(i)))) && (g.cards === void 0 || Array.isArray(g.cards) && g.cards.every((i) => typeof i == "object" && i !== null && U(i))) && (g.path === void 0 || typeof g.path == "string") && (g.icon === void 0 || typeof g.icon == "string") && (g.theme === void 0 || typeof g.theme == "string") && (g.panel === void 0 || typeof g.panel == "boolean") && (g.background === void 0 || typeof g.background == "string") && g.visible !== null && (g.visible === void 0 || typeof g.visible == "boolean" || Array.isArray(g.visible) && g.visible.every((i) => typeof i == "object" && i !== null && Array.isArray(i) === !1 && X(i))), Q = (g) => (g.type === void 0 || typeof g.type == "string") && Object.keys(g).every((i) => (["type"].some((I) => i === I) || g[i] === void 0, !0)), X = (g) => g.user === void 0 || typeof g.user == "string";
    return (g) => typeof g == "object" && g !== null && q(g);
  })())(F)) {
    const d = (/* @__PURE__ */ (() => {
      const N = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), q = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), D = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), $ = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), J = (a) => Array.isArray(a.main) && a.main.every((y) => typeof y == "object" && y !== null && W(y)) && typeof a.navigation == "object" && a.navigation !== null && U(a.navigation) && (a.topCards === void 0 || Array.isArray(a.topCards) && a.topCards.every((y) => typeof y == "object" && y !== null && te(y))) && (a.extraViews === void 0 || Array.isArray(a.extraViews) && a.extraViews.every((y) => typeof y == "object" && y !== null && Array.isArray(y) === !1 && g(y))), W = (a) => typeof a.title == "string" && typeof a.icon == "string" && typeof a.match == "string", U = (a) => typeof a.id == "string" && (a.title === void 0 || typeof a.title == "string") && (a.position === void 0 || typeof a.position == "number") && typeof a.minCardWidth == "number" && (a.replace === void 0 || typeof a.replace == "object" && a.replace !== null && Array.isArray(a.replace) === !1 && H(a.replace)) && (a.filter === void 0 || typeof a.filter == "object" && a.filter !== null && Array.isArray(a.filter) === !1 && ie(a.filter)) && (a.sort === void 0 || Array.isArray(a.sort) && a.sort.every((y) => typeof y == "object" && y !== null && X(y))) && typeof a.card == "object" && a.card !== null && te(a.card), H = (a) => Object.keys(a).every((y) => {
        const u = a[y];
        return u === void 0 ? !0 : typeof u == "object" && u !== null && K(u);
      }), K = (a) => typeof a.card == "object" && a.card !== null && te(a.card), te = (a) => (a.index === void 0 || typeof a.index == "number") && (a.view_index === void 0 || typeof a.view_index == "number") && typeof a.type == "string" && Object.keys(a).every((y) => (["index", "view_index", "type"].some((o) => y === o) || a[y] === void 0, !0)), ie = (a) => (a.exclude === void 0 || Array.isArray(a.exclude) && a.exclude.every((y) => typeof y == "object" && y !== null && re(y))) && (a.include === void 0 || Array.isArray(a.include) && a.include.every((y) => typeof y == "object" && y !== null && re(y))), re = (a) => (a.comparator === void 0 || a.comparator === "equal" || a.comparator === "match" || a.comparator === "in" || a.comparator === "greater_than" || a.comparator === "lower_than" || a.comparator === "is_null" || a.comparator === "is_numeric") && !0 && N.has(a.type) === !0 && (a.config === void 0 || typeof a.config == "object" && a.config !== null && Array.isArray(a.config) === !1 && Q(a.config)), Q = (a) => (a.key === void 0 || typeof a.key == "string") && (a.label === void 0 || typeof a.label == "string"), X = (a) => (a.comparator === void 0 || a.comparator === "ascending" || a.comparator === "descending") && q.has(a.type) === !0 && (a.config === void 0 || typeof a.config == "object" && a.config !== null && Array.isArray(a.config) === !1 && Q(a.config)), g = (a) => (a.index === void 0 || typeof a.index == "number") && (a.title === void 0 || typeof a.title == "string") && (a.badges === void 0 || Array.isArray(a.badges) && a.badges.every((y) => y != null && (typeof y == "string" || typeof y == "object" && y !== null && Array.isArray(y) === !1 && i(y)))) && (a.cards === void 0 || Array.isArray(a.cards) && a.cards.every((y) => typeof y == "object" && y !== null && te(y))) && (a.path === void 0 || typeof a.path == "string") && (a.icon === void 0 || typeof a.icon == "string") && (a.theme === void 0 || typeof a.theme == "string") && (a.panel === void 0 || typeof a.panel == "boolean") && (a.background === void 0 || typeof a.background == "string") && a.visible !== null && (a.visible === void 0 || typeof a.visible == "boolean" || Array.isArray(a.visible) && a.visible.every((y) => typeof y == "object" && y !== null && Array.isArray(y) === !1 && w(y))), i = (a) => (a.type === void 0 || typeof a.type == "string") && Object.keys(a).every((y) => (["type"].some((o) => y === o) || a[y] === void 0, !0)), w = (a) => a.user === void 0 || typeof a.user == "string", I = (a, y, u = !0) => [(Array.isArray(a.main) || c(u, {
        path: y + ".main",
        expected: "Array<TabConfig>",
        value: a.main
      })) && a.main.map((o, _) => (typeof o == "object" && o !== null || c(u, {
        path: y + ".main[" + _ + "]",
        expected: "TabConfig",
        value: o
      })) && M(o, y + ".main[" + _ + "]", u) || c(u, {
        path: y + ".main[" + _ + "]",
        expected: "TabConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".main",
        expected: "Array<TabConfig>",
        value: a.main
      }), (typeof a.navigation == "object" && a.navigation !== null || c(u, {
        path: y + ".navigation",
        expected: "BaseRowOptions",
        value: a.navigation
      })) && se(a.navigation, y + ".navigation", u) || c(u, {
        path: y + ".navigation",
        expected: "BaseRowOptions",
        value: a.navigation
      }), a.topCards === void 0 || (Array.isArray(a.topCards) || c(u, {
        path: y + ".topCards",
        expected: "(Array<LovelaceCardConfig> | undefined)",
        value: a.topCards
      })) && a.topCards.map((o, _) => (typeof o == "object" && o !== null || c(u, {
        path: y + ".topCards[" + _ + "]",
        expected: "LovelaceCardConfig",
        value: o
      })) && be(o, y + ".topCards[" + _ + "]", u) || c(u, {
        path: y + ".topCards[" + _ + "]",
        expected: "LovelaceCardConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".topCards",
        expected: "(Array<LovelaceCardConfig> | undefined)",
        value: a.topCards
      }), a.extraViews === void 0 || (Array.isArray(a.extraViews) || c(u, {
        path: y + ".extraViews",
        expected: "(Array<LovelaceViewConfig> | undefined)",
        value: a.extraViews
      })) && a.extraViews.map((o, _) => (typeof o == "object" && o !== null && Array.isArray(o) === !1 || c(u, {
        path: y + ".extraViews[" + _ + "]",
        expected: "LovelaceViewConfig",
        value: o
      })) && Te(o, y + ".extraViews[" + _ + "]", u) || c(u, {
        path: y + ".extraViews[" + _ + "]",
        expected: "LovelaceViewConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".extraViews",
        expected: "(Array<LovelaceViewConfig> | undefined)",
        value: a.extraViews
      })].every((o) => o), M = (a, y, u = !0) => [typeof a.title == "string" || c(u, {
        path: y + ".title",
        expected: "string",
        value: a.title
      }), typeof a.icon == "string" || c(u, {
        path: y + ".icon",
        expected: "string",
        value: a.icon
      }), typeof a.match == "string" || c(u, {
        path: y + ".match",
        expected: "string",
        value: a.match
      })].every((o) => o), se = (a, y, u = !0) => [typeof a.id == "string" || c(u, {
        path: y + ".id",
        expected: "string",
        value: a.id
      }), a.title === void 0 || typeof a.title == "string" || c(u, {
        path: y + ".title",
        expected: "(string | undefined)",
        value: a.title
      }), a.position === void 0 || typeof a.position == "number" || c(u, {
        path: y + ".position",
        expected: "(number | undefined)",
        value: a.position
      }), typeof a.minCardWidth == "number" || c(u, {
        path: y + ".minCardWidth",
        expected: "number",
        value: a.minCardWidth
      }), a.replace === void 0 || (typeof a.replace == "object" && a.replace !== null && Array.isArray(a.replace) === !1 || c(u, {
        path: y + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: a.replace
      })) && pe(a.replace, y + ".replace", u) || c(u, {
        path: y + ".replace",
        expected: "(Record<string, GridStrategyCardConfig> | undefined)",
        value: a.replace
      }), a.filter === void 0 || (typeof a.filter == "object" && a.filter !== null && Array.isArray(a.filter) === !1 || c(u, {
        path: y + ".filter",
        expected: "(FilterObject | undefined)",
        value: a.filter
      })) && ke(a.filter, y + ".filter", u) || c(u, {
        path: y + ".filter",
        expected: "(FilterObject | undefined)",
        value: a.filter
      }), a.sort === void 0 || (Array.isArray(a.sort) || c(u, {
        path: y + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: a.sort
      })) && a.sort.map((o, _) => (typeof o == "object" && o !== null || c(u, {
        path: y + ".sort[" + _ + "]",
        expected: "SortConfig",
        value: o
      })) && He(o, y + ".sort[" + _ + "]", u) || c(u, {
        path: y + ".sort[" + _ + "]",
        expected: "SortConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".sort",
        expected: "(Array<SortConfig> | undefined)",
        value: a.sort
      }), (typeof a.card == "object" && a.card !== null || c(u, {
        path: y + ".card",
        expected: "LovelaceCardConfig",
        value: a.card
      })) && be(a.card, y + ".card", u) || c(u, {
        path: y + ".card",
        expected: "LovelaceCardConfig",
        value: a.card
      })].every((o) => o), pe = (a, y, u = !0) => [u === !1 || Object.keys(a).map((o) => {
        const _ = a[o];
        return _ === void 0 ? !0 : (typeof _ == "object" && _ !== null || c(u, {
          path: y + ar._accessExpressionAsString(o),
          expected: "GridStrategyCardConfig",
          value: _
        })) && Ee(_, y + ar._accessExpressionAsString(o), u) || c(u, {
          path: y + ar._accessExpressionAsString(o),
          expected: "GridStrategyCardConfig",
          value: _
        });
      }).every((o) => o)].every((o) => o), Ee = (a, y, u = !0) => [(typeof a.card == "object" && a.card !== null || c(u, {
        path: y + ".card",
        expected: "LovelaceCardConfig",
        value: a.card
      })) && be(a.card, y + ".card", u) || c(u, {
        path: y + ".card",
        expected: "LovelaceCardConfig",
        value: a.card
      })].every((o) => o), be = (a, y, u = !0) => [a.index === void 0 || typeof a.index == "number" || c(u, {
        path: y + ".index",
        expected: "(number | undefined)",
        value: a.index
      }), a.view_index === void 0 || typeof a.view_index == "number" || c(u, {
        path: y + ".view_index",
        expected: "(number | undefined)",
        value: a.view_index
      }), typeof a.type == "string" || c(u, {
        path: y + ".type",
        expected: "string",
        value: a.type
      }), u === !1 || Object.keys(a).map((o) => (["index", "view_index", "type"].some((p) => o === p) || a[o] === void 0, !0)).every((o) => o)].every((o) => o), ke = (a, y, u = !0) => [a.exclude === void 0 || (Array.isArray(a.exclude) || c(u, {
        path: y + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: a.exclude
      })) && a.exclude.map((o, _) => (typeof o == "object" && o !== null || c(u, {
        path: y + ".exclude[" + _ + "]",
        expected: "FilterConfig",
        value: o
      })) && je(o, y + ".exclude[" + _ + "]", u) || c(u, {
        path: y + ".exclude[" + _ + "]",
        expected: "FilterConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: a.exclude
      }), a.include === void 0 || (Array.isArray(a.include) || c(u, {
        path: y + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: a.include
      })) && a.include.map((o, _) => (typeof o == "object" && o !== null || c(u, {
        path: y + ".include[" + _ + "]",
        expected: "FilterConfig",
        value: o
      })) && je(o, y + ".include[" + _ + "]", u) || c(u, {
        path: y + ".include[" + _ + "]",
        expected: "FilterConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: a.include
      })].every((o) => o), je = (a, y, u = !0) => [a.comparator === void 0 || a.comparator === "equal" || a.comparator === "match" || a.comparator === "in" || a.comparator === "greater_than" || a.comparator === "lower_than" || a.comparator === "is_null" || a.comparator === "is_numeric" || c(u, {
        path: y + ".comparator",
        expected: '("equal" | "greater_than" | "in" | "is_null" | "is_numeric" | "lower_than" | "match" | undefined)',
        value: a.comparator
      }), !0, D.has(a.type) === !0 || c(u, {
        path: y + ".type",
        expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
        value: a.type
      }), a.config === void 0 || (typeof a.config == "object" && a.config !== null && Array.isArray(a.config) === !1 || c(u, {
        path: y + ".config",
        expected: "(TypeConfig | undefined)",
        value: a.config
      })) && Be(a.config, y + ".config", u) || c(u, {
        path: y + ".config",
        expected: "(TypeConfig | undefined)",
        value: a.config
      })].every((o) => o), Be = (a, y, u = !0) => [a.key === void 0 || typeof a.key == "string" || c(u, {
        path: y + ".key",
        expected: "(string | undefined)",
        value: a.key
      }), a.label === void 0 || typeof a.label == "string" || c(u, {
        path: y + ".label",
        expected: "(string | undefined)",
        value: a.label
      })].every((o) => o), He = (a, y, u = !0) => [a.comparator === void 0 || a.comparator === "ascending" || a.comparator === "descending" || c(u, {
        path: y + ".comparator",
        expected: '("ascending" | "descending" | undefined)',
        value: a.comparator
      }), $.has(a.type) === !0 || c(u, {
        path: y + ".type",
        expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
        value: a.type
      }), a.config === void 0 || (typeof a.config == "object" && a.config !== null && Array.isArray(a.config) === !1 || c(u, {
        path: y + ".config",
        expected: "(TypeConfig | undefined)",
        value: a.config
      })) && Be(a.config, y + ".config", u) || c(u, {
        path: y + ".config",
        expected: "(TypeConfig | undefined)",
        value: a.config
      })].every((o) => o), Te = (a, y, u = !0) => [a.index === void 0 || typeof a.index == "number" || c(u, {
        path: y + ".index",
        expected: "(number | undefined)",
        value: a.index
      }), a.title === void 0 || typeof a.title == "string" || c(u, {
        path: y + ".title",
        expected: "(string | undefined)",
        value: a.title
      }), a.badges === void 0 || (Array.isArray(a.badges) || c(u, {
        path: y + ".badges",
        expected: "(Array<string | LovelaceBadgeConfig> | undefined)",
        value: a.badges
      })) && a.badges.map((o, _) => (o !== null || c(u, {
        path: y + ".badges[" + _ + "]",
        expected: "(LovelaceBadgeConfig | string)",
        value: o
      })) && (o !== void 0 || c(u, {
        path: y + ".badges[" + _ + "]",
        expected: "(LovelaceBadgeConfig | string)",
        value: o
      })) && (typeof o == "string" || (typeof o == "object" && o !== null && Array.isArray(o) === !1 || c(u, {
        path: y + ".badges[" + _ + "]",
        expected: "(LovelaceBadgeConfig | string)",
        value: o
      })) && k(o, y + ".badges[" + _ + "]", u) || c(u, {
        path: y + ".badges[" + _ + "]",
        expected: "(LovelaceBadgeConfig | string)",
        value: o
      }))).every((o) => o) || c(u, {
        path: y + ".badges",
        expected: "(Array<string | LovelaceBadgeConfig> | undefined)",
        value: a.badges
      }), a.cards === void 0 || (Array.isArray(a.cards) || c(u, {
        path: y + ".cards",
        expected: "(Array<LovelaceCardConfig> | undefined)",
        value: a.cards
      })) && a.cards.map((o, _) => (typeof o == "object" && o !== null || c(u, {
        path: y + ".cards[" + _ + "]",
        expected: "LovelaceCardConfig",
        value: o
      })) && be(o, y + ".cards[" + _ + "]", u) || c(u, {
        path: y + ".cards[" + _ + "]",
        expected: "LovelaceCardConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".cards",
        expected: "(Array<LovelaceCardConfig> | undefined)",
        value: a.cards
      }), a.path === void 0 || typeof a.path == "string" || c(u, {
        path: y + ".path",
        expected: "(string | undefined)",
        value: a.path
      }), a.icon === void 0 || typeof a.icon == "string" || c(u, {
        path: y + ".icon",
        expected: "(string | undefined)",
        value: a.icon
      }), a.theme === void 0 || typeof a.theme == "string" || c(u, {
        path: y + ".theme",
        expected: "(string | undefined)",
        value: a.theme
      }), a.panel === void 0 || typeof a.panel == "boolean" || c(u, {
        path: y + ".panel",
        expected: "(boolean | undefined)",
        value: a.panel
      }), a.background === void 0 || typeof a.background == "string" || c(u, {
        path: y + ".background",
        expected: "(string | undefined)",
        value: a.background
      }), (a.visible !== null || c(u, {
        path: y + ".visible",
        expected: "(Array<ShowViewConfig> | boolean | undefined)",
        value: a.visible
      })) && (a.visible === void 0 || typeof a.visible == "boolean" || (Array.isArray(a.visible) || c(u, {
        path: y + ".visible",
        expected: "(Array<ShowViewConfig> | boolean | undefined)",
        value: a.visible
      })) && a.visible.map((o, _) => (typeof o == "object" && o !== null && Array.isArray(o) === !1 || c(u, {
        path: y + ".visible[" + _ + "]",
        expected: "ShowViewConfig",
        value: o
      })) && m(o, y + ".visible[" + _ + "]", u) || c(u, {
        path: y + ".visible[" + _ + "]",
        expected: "ShowViewConfig",
        value: o
      })).every((o) => o) || c(u, {
        path: y + ".visible",
        expected: "(Array<ShowViewConfig> | boolean | undefined)",
        value: a.visible
      }))].every((o) => o), k = (a, y, u = !0) => [a.type === void 0 || typeof a.type == "string" || c(u, {
        path: y + ".type",
        expected: "(string | undefined)",
        value: a.type
      }), u === !1 || Object.keys(a).map((o) => (["type"].some((p) => o === p) || a[o] === void 0, !0)).every((o) => o)].every((o) => o), m = (a, y, u = !0) => [a.user === void 0 || typeof a.user == "string" || c(u, {
        path: y + ".user",
        expected: "(string | undefined)",
        value: a.user
      })].every((o) => o), T = (a) => typeof a == "object" && a !== null && J(a);
      let x, c;
      return (a) => {
        if (T(a) === !1) {
          x = [], c = Wt._validateReport(x), ((u, o, _ = !0) => (typeof u == "object" && u !== null || c(!0, {
            path: o + "",
            expected: "Omit<AreaStrategyOptions, keyof BaseGridOptions<BaseRowOptions | BaseRowRefOptions>>",
            value: u
          })) && I(u, o + "", !0) || c(!0, {
            path: o + "",
            expected: "Omit<AreaStrategyOptions, keyof BaseGridOptions<BaseRowOptions | BaseRowRefOptions>>",
            value: u
          }))(a, "$input", !0);
          const y = x.length === 0;
          return y ? {
            success: y,
            data: a
          } : {
            success: y,
            errors: x,
            data: a
          };
        }
        return {
          success: !0,
          data: a
        };
      };
    })())(F);
    throw Error(d.success ? "Something went wrong. Check config." : JSON.stringify(d.errors));
  }
  return F;
};
class Fv extends HTMLTemplateElement {
  static async generate(F, d) {
    var H;
    const [N, q] = await Promise.all([
      d.callWS({ type: "config/entity_registry/list" }),
      d.callWS({ type: "config/area_registry/list" })
    ]), D = Nc(ri, F == null ? void 0 : F.config), $ = Bt(D.navigation, d), J = In(D.navigation, d);
    return {
      views: [...q.filter($).sort(J).map((K, te) => ({
        strategy: {
          type: "custom:area-view-strategy",
          meta: {
            entities: N,
            areas: q
          },
          config: { ...F.config, area: K.area_id }
        },
        title: K.name,
        path: K.area_id,
        icon: "mdi:home",
        type: "panel",
        subview: !1,
        visible: te == 0
      })), ...((H = F.config) == null ? void 0 : H.extraViews) || []]
    };
  }
}
class Bv extends HTMLTemplateElement {
  static async generate(F, d) {
    var M;
    const { meta: N } = F, q = (M = F.config) == null ? void 0 : M.area, D = Nc(ri, F.config), { main: $, navigation: J, topCards: W } = D, { grids: U } = Uc(ri, F.config);
    let H = Array(), K = Array();
    if (N)
      H = N.entities, K = N.areas;
    else {
      const se = await Promise.all([
        d.callWS({ type: "config/entity_registry/list" }),
        d.callWS({ type: "config/area_registry/list" })
      ]);
      H = se[0], K = se[1];
    }
    const te = Bt(J, d), ie = In(J, d), re = K.filter(te).sort(ie), Q = re.find((se) => se.area_id == q);
    if (!Q)
      throw Error("No area defined");
    const X = ti(J, re, { placeholder: "$area", key: "area_id", replaces: [["$currArea", Q.area_id]] }), g = {
      type: "vertical-stack",
      cards: [
        ...W || [],
        ...X,
        {
          type: "custom:gap-card",
          height: 60
        }
      ]
    }, i = $.map((se) => {
      const Ee = U.filter((be) => new RegExp(se.match).test(be.id)).flatMap((be) => {
        const ke = {
          filter: {
            include: [
              {
                type: qe.area,
                value: Q.area_id
              }
            ]
          }
        }, je = Mt.mergeWith({}, ke, Mt.cloneDeep(be), $c), Be = Bt(je, d), He = In(je, d), Te = H.filter(Be).sort(He);
        return ti(be, Te);
      });
      return Ee.length > 0 ? {
        attributes: {
          label: se.title,
          icon: se.icon,
          stacked: !0
        },
        card: {
          type: "vertical-stack",
          cards: [
            {
              type: "custom:gap-card",
              height: 20
            },
            ...Ee
          ]
        }
      } : null;
    }).filter(vr), w = {
      type: "custom:tabbed-card",
      styles: {
        "--mdc-tab-text-label-color-default": "var(--primary-text-color)",
        "--mdc-tab-color-default": "var(--primary-text-color)"
      },
      tabs: i
    };
    return {
      panel: !0,
      cards: [{
        type: "vertical-stack",
        cards: [
          {
            type: "conditional",
            conditions: [
              {
                condition: "screen",
                media_query: "(max-width: 1000px)"
              }
            ],
            card: {
              type: "custom:state-switch",
              entity: "hash",
              default: "default",
              states: {
                "": g,
                default: {
                  type: "vertical-stack",
                  cards: [
                    w,
                    {
                      type: "custom:mushroom-chips-card",
                      card_mod: {
                        style: `
                        ha-card { --chip-background: none; }
                        :host {
                          --chip-icon-size: 1em !important;
                          z-index: 2;
                          width: 100%;
                          position: fixed;
                          bottom: 0;
                          margin: 0 !important;
                          padding: 20px;
                          background: var(--app-header-background-color);
                          left: 50%;
                          transform: translateX(-50%);
                        }
                        @media (min-width: 1001px) {
                          :host {
                            display: none;
                          }
                        }`
                      },
                      chips: [
                        { type: "spacer" },
                        {
                          type: "template",
                          icon: "mdi:home",
                          icon_height: "40px",
                          tap_action: {
                            action: "navigate",
                            navigation_path: window.location.pathname
                          }
                        },
                        { type: "spacer" }
                      ]
                    },
                    {
                      type: "custom:gap-card",
                      height: 60
                    }
                  ]
                }
              }
            }
          },
          {
            type: "conditional",
            conditions: [
              {
                condition: "screen",
                media_query: "(min-width: 1001px)"
              }
            ],
            card: {
              type: "custom:layout-card",
              layout_type: "custom:grid-layout",
              layout: {
                "grid-template-columns": "2fr 3fr",
                "grid-template-areas": "navigation main"
              },
              cards: [g, w]
            }
          }
        ]
      }]
    };
  }
}
customElements.define(`${Lv}area-dashboard-strategy`, Fv);
customElements.define(`${ni}area-view-strategy`, Bv);
const Mv = (...j) => {
  const F = j.filter(vr).reduce((d, N) => ({ ...d, ...N }));
  if (!(/* @__PURE__ */ (() => {
    const d = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), N = (W) => Array.isArray(W.presets) && W.presets.every((U) => typeof U == "object" && U !== null && q(U)), q = (W) => typeof W.title == "string" && typeof W.icon == "string" && (W.filter === void 0 || typeof W.filter == "object" && W.filter !== null && Array.isArray(W.filter) === !1 && D(W.filter)), D = (W) => (W.exclude === void 0 || Array.isArray(W.exclude) && W.exclude.every((U) => typeof U == "object" && U !== null && $(U))) && (W.include === void 0 || Array.isArray(W.include) && W.include.every((U) => typeof U == "object" && U !== null && $(U))), $ = (W) => (W.comparator === void 0 || W.comparator === "equal" || W.comparator === "match" || W.comparator === "in" || W.comparator === "greater_than" || W.comparator === "lower_than" || W.comparator === "is_null" || W.comparator === "is_numeric") && !0 && d.has(W.type) === !0 && (W.config === void 0 || typeof W.config == "object" && W.config !== null && Array.isArray(W.config) === !1 && J(W.config)), J = (W) => (W.key === void 0 || typeof W.key == "string") && (W.label === void 0 || typeof W.label == "string");
    return (W) => typeof W == "object" && W !== null && N(W);
  })())(F)) {
    const d = (/* @__PURE__ */ (() => {
      const N = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), q = /* @__PURE__ */ new Set(["entity", "domain", "device", "area", "floor", "integration", "label", "state", "attribute", "disabled_by", "hidden_by", "entity_category"]), D = (i) => Array.isArray(i.presets) && i.presets.every((w) => typeof w == "object" && w !== null && $(w)), $ = (i) => typeof i.title == "string" && typeof i.icon == "string" && (i.filter === void 0 || typeof i.filter == "object" && i.filter !== null && Array.isArray(i.filter) === !1 && J(i.filter)), J = (i) => (i.exclude === void 0 || Array.isArray(i.exclude) && i.exclude.every((w) => typeof w == "object" && w !== null && W(w))) && (i.include === void 0 || Array.isArray(i.include) && i.include.every((w) => typeof w == "object" && w !== null && W(w))), W = (i) => (i.comparator === void 0 || i.comparator === "equal" || i.comparator === "match" || i.comparator === "in" || i.comparator === "greater_than" || i.comparator === "lower_than" || i.comparator === "is_null" || i.comparator === "is_numeric") && !0 && N.has(i.type) === !0 && (i.config === void 0 || typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 && U(i.config)), U = (i) => (i.key === void 0 || typeof i.key == "string") && (i.label === void 0 || typeof i.label == "string"), H = (i, w, I = !0) => [(Array.isArray(i.presets) || g(I, {
        path: w + ".presets",
        expected: "Array<LogPreset>",
        value: i.presets
      })) && i.presets.map((M, se) => (typeof M == "object" && M !== null || g(I, {
        path: w + ".presets[" + se + "]",
        expected: "LogPreset",
        value: M
      })) && K(M, w + ".presets[" + se + "]", I) || g(I, {
        path: w + ".presets[" + se + "]",
        expected: "LogPreset",
        value: M
      })).every((M) => M) || g(I, {
        path: w + ".presets",
        expected: "Array<LogPreset>",
        value: i.presets
      })].every((M) => M), K = (i, w, I = !0) => [typeof i.title == "string" || g(I, {
        path: w + ".title",
        expected: "string",
        value: i.title
      }), typeof i.icon == "string" || g(I, {
        path: w + ".icon",
        expected: "string",
        value: i.icon
      }), i.filter === void 0 || (typeof i.filter == "object" && i.filter !== null && Array.isArray(i.filter) === !1 || g(I, {
        path: w + ".filter",
        expected: "(FilterObject | undefined)",
        value: i.filter
      })) && te(i.filter, w + ".filter", I) || g(I, {
        path: w + ".filter",
        expected: "(FilterObject | undefined)",
        value: i.filter
      })].every((M) => M), te = (i, w, I = !0) => [i.exclude === void 0 || (Array.isArray(i.exclude) || g(I, {
        path: w + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: i.exclude
      })) && i.exclude.map((M, se) => (typeof M == "object" && M !== null || g(I, {
        path: w + ".exclude[" + se + "]",
        expected: "FilterConfig",
        value: M
      })) && ie(M, w + ".exclude[" + se + "]", I) || g(I, {
        path: w + ".exclude[" + se + "]",
        expected: "FilterConfig",
        value: M
      })).every((M) => M) || g(I, {
        path: w + ".exclude",
        expected: "(Array<FilterConfig> | undefined)",
        value: i.exclude
      }), i.include === void 0 || (Array.isArray(i.include) || g(I, {
        path: w + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: i.include
      })) && i.include.map((M, se) => (typeof M == "object" && M !== null || g(I, {
        path: w + ".include[" + se + "]",
        expected: "FilterConfig",
        value: M
      })) && ie(M, w + ".include[" + se + "]", I) || g(I, {
        path: w + ".include[" + se + "]",
        expected: "FilterConfig",
        value: M
      })).every((M) => M) || g(I, {
        path: w + ".include",
        expected: "(Array<FilterConfig> | undefined)",
        value: i.include
      })].every((M) => M), ie = (i, w, I = !0) => [i.comparator === void 0 || i.comparator === "equal" || i.comparator === "match" || i.comparator === "in" || i.comparator === "greater_than" || i.comparator === "lower_than" || i.comparator === "is_null" || i.comparator === "is_numeric" || g(I, {
        path: w + ".comparator",
        expected: '("equal" | "greater_than" | "in" | "is_null" | "is_numeric" | "lower_than" | "match" | undefined)',
        value: i.comparator
      }), !0, q.has(i.type) === !0 || g(I, {
        path: w + ".type",
        expected: '("area" | "attribute" | "device" | "disabled_by" | "domain" | "entity" | "entity_category" | "floor" | "hidden_by" | "integration" | "label" | "state")',
        value: i.type
      }), i.config === void 0 || (typeof i.config == "object" && i.config !== null && Array.isArray(i.config) === !1 || g(I, {
        path: w + ".config",
        expected: "(TypeConfig | undefined)",
        value: i.config
      })) && re(i.config, w + ".config", I) || g(I, {
        path: w + ".config",
        expected: "(TypeConfig | undefined)",
        value: i.config
      })].every((M) => M), re = (i, w, I = !0) => [i.key === void 0 || typeof i.key == "string" || g(I, {
        path: w + ".key",
        expected: "(string | undefined)",
        value: i.key
      }), i.label === void 0 || typeof i.label == "string" || g(I, {
        path: w + ".label",
        expected: "(string | undefined)",
        value: i.label
      })].every((M) => M), Q = (i) => typeof i == "object" && i !== null && D(i);
      let X, g;
      return (i) => {
        if (Q(i) === !1) {
          X = [], g = Wt._validateReport(X), ((I, M, se = !0) => (typeof I == "object" && I !== null || g(!0, {
            path: M + "",
            expected: "LogViewOptions",
            value: I
          })) && H(I, M + "", !0) || g(!0, {
            path: M + "",
            expected: "LogViewOptions",
            value: I
          }))(i, "$input", !0);
          const w = X.length === 0;
          return w ? {
            success: w,
            data: i
          } : {
            success: w,
            errors: X,
            data: i
          };
        }
        return {
          success: !0,
          data: i
        };
      };
    })())(F);
    throw Error(d.success ? "Something went wrong. Check config." : JSON.stringify(d.errors));
  }
  return F;
};
class Pv extends HTMLTemplateElement {
  static async generate(F, d) {
    const { config: N } = F, q = {
      ...N
    }, { presets: D } = Mv(q);
    if (!D)
      throw Error("presets not defined!");
    const [$] = await Promise.all([d.callWS({ type: "config/entity_registry/list" })]), J = {
      type: "vertical-stack",
      cards: [],
      view_layout: {
        position: "sidebar"
      }
    }, W = D.reduce((H, K) => (H.cards.push({
      type: "button",
      name: K.title,
      icon: K.icon,
      tap_action: {
        action: "navigate",
        navigation_path: window.location.pathname + "#" + encodeURI(K.title)
      }
    }), H), J), U = D.reduce((H, K) => {
      const te = $.filter(Bt(K, d)), re = {
        type: "vertical-stack",
        cards: [{
          type: "logbook",
          title: K.title,
          entities: te.map((Q) => Q.entity_id)
        }]
      };
      return H.set(encodeURI(K.title), re), H;
    }, /* @__PURE__ */ new Map());
    return {
      type: "sidebar",
      cards: [
        {
          type: "custom:state-switch",
          entity: "hash",
          default: U.keys().next().value,
          states: Object.fromEntries(U.entries())
        },
        W
      ]
    };
  }
}
customElements.define(`${ni}log-view-strategy`, Pv);
const Dv = {
  global: {
    minCardWidth: 300,
    filter: { exclude: [
      {
        type: "disabled_by",
        comparator: "match",
        value: ".*"
      },
      {
        type: "hidden_by",
        comparator: "match",
        value: ".*"
      },
      {
        type: "label",
        config: { label: "hidden" },
        value: "hidden"
      }
    ] },
    sort: [
      {
        type: "label",
        config: { label: "^sort_\\d+$" }
      },
      { type: "area" },
      { type: "integration" },
      { type: "entity" }
    ]
  },
  gridMergeStrategy: "reset"
};
class $v extends HTMLTemplateElement {
  static async generate(F, d) {
    const { config: N } = F, q = Uc(Dv, N), { grids: D } = q, [$] = await Promise.all([d.callWS({ type: "config/entity_registry/list" })]);
    return {
      panel: !0,
      cards: [
        {
          type: "vertical-stack",
          cards: D.reduce((W, U) => {
            const H = $.filter(Bt(U, d)).sort(In(U, d));
            return W.push(...ti(U, H)), W;
          }, new Array())
        }
      ]
    };
  }
}
customElements.define(`${ni}grid-view-strategy`, $v);
