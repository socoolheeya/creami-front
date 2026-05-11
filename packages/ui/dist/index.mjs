import { jsx as t, jsxs as a, Fragment as H } from "react/jsx-runtime";
import { XCircle as ge, AlertTriangle as fe, CheckCircle2 as be, Info as xe, Search as Ee, ChevronDown as ye, List as De, LayoutGrid as ze, Calendar as ve, X as re, ChevronLeft as Oe, ChevronRight as Le, Clock as Ie, Save as We, Sun as Pe, Moon as Re, Languages as Ae, Bell as Fe, Settings as je, ReceiptText as Be, Tag as He, BarChart3 as Ye, LayoutDashboard as ee, Home as _e, PanelLeftOpen as Ve, PanelLeftClose as Xe, User as oe, LogOut as Ke } from "lucide-react";
import { useState as S, useRef as F, useMemo as _, useEffect as z, useLayoutEffect as ae, useTransition as qe, createContext as we, useCallback as K, useContext as Ne } from "react";
import { createPortal as ke } from "react-dom";
import { useTranslations as Q } from "next-intl";
function D({
  variant: e = "primary",
  size: r = "medium",
  iconOnly: n = !1,
  fullWidth: o = !1,
  className: i = "",
  children: p,
  disabled: s,
  ...g
}) {
  const u = r === "lg" ? "large" : r === "normal" || r === "md" ? "medium" : r === "sm" ? "small" : r, c = "inline-flex shrink-0 items-center justify-center gap-sm rounded transition-colors box-border m-none border-none text-base leading-none font-medium", d = {
    large: n ? "h-control-lg w-control-lg p-none" : "h-control-lg px-control-px-lg py-none",
    medium: n ? "h-control-md w-control-md p-none" : "h-control-md px-control-px-md py-none",
    small: n ? "h-control-sm w-control-sm p-none" : "h-control-sm px-control-px-sm py-none",
    mini: n ? "h-control-mini w-control-mini p-none" : "h-control-mini px-control-px-mini py-none"
  }, m = {
    primary: s ? "cursor-not-allowed bg-primary text-white opacity-50" : "cursor-pointer bg-primary text-white hover:opacity-90",
    secondary: s ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
    tertiary: s ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-tertiary text-text-primary hover:bg-bg-secondary",
    ghost: s ? "cursor-not-allowed bg-transparent text-text-tertiary" : "cursor-pointer bg-transparent text-text-primary hover:bg-bg-tertiary"
  }[e], f = o ? "w-full" : "";
  return /* @__PURE__ */ t(
    "button",
    {
      className: `${c} ${d[u]} ${m} ${f} ${i}`,
      disabled: s,
      ...g,
      children: p
    }
  );
}
const Ge = {
  info: xe,
  success: be,
  warning: fe,
  error: ge
}, ie = {
  info: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)"
}, Qe = {
  info: "var(--primary-bg)",
  success: "var(--success-bg)",
  warning: "var(--warning-bg)",
  error: "var(--error-bg)"
};
function Ue({
  variant: e = "info",
  title: r,
  children: n,
  className: o = ""
}) {
  const i = Ge[e];
  return /* @__PURE__ */ a(
    "div",
    {
      className: `flex items-start gap-sm rounded p-md text-base ${o}`,
      style: {
        backgroundColor: Qe[e],
        border: `1px solid ${ie[e]}`,
        borderRadius: "var(--radius)",
        color: "var(--text-primary)"
      },
      children: [
        /* @__PURE__ */ t(
          i,
          {
            className: "h-icon-md w-icon-md shrink-0",
            style: { color: ie[e] }
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-xs", children: [
          r && /* @__PURE__ */ t("div", { style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)" }, children: r }),
          /* @__PURE__ */ t("div", { style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" }, children: n })
        ] })
      ]
    }
  );
}
function Je({
  size: e = "medium",
  showSearchIcon: r = !1,
  className: n = "",
  ...o
}) {
  const p = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[e]} rounded border border-border bg-bg-primary text-text-primary box-border font-medium`;
  return r ? /* @__PURE__ */ a("div", { className: "relative w-full", children: [
    /* @__PURE__ */ t(
      "input",
      {
        className: `${p} pr-control-search ${n}`,
        ...o
      }
    ),
    /* @__PURE__ */ t(Ee, { className: "absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" })
  ] }) : /* @__PURE__ */ t(
    "input",
    {
      className: `${p} ${n}`,
      ...o
    }
  );
}
function zt({
  size: e = "medium",
  className: r = "",
  children: n,
  ...o
}) {
  const p = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[e]} rounded border border-border bg-bg-secondary text-text-primary box-border font-medium`;
  return /* @__PURE__ */ t(
    "select",
    {
      className: `${p} ${r}`,
      ...o,
      children: n
    }
  );
}
function Ot({
  value: e,
  options: r,
  onChange: n,
  placeholder: o = "선택하세요",
  searchPlaceholder: i = "검색어를 입력하세요",
  emptyText: p = "검색 결과가 없습니다",
  disabled: s = !1,
  className: g = ""
}) {
  const [u, c] = S(!1), [d, m] = S(""), f = F(null), v = r.find((h) => h.value === e), l = _(() => {
    const h = d.trim().toLowerCase();
    return h ? r.filter((N) => `${N.label} ${N.description ?? ""} ${N.searchText ?? ""}`.toLowerCase().includes(h)) : r;
  }, [r, d]);
  z(() => {
    const h = (N) => {
      var k;
      (k = f.current) != null && k.contains(N.target) || c(!1);
    };
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, []);
  const y = (h) => {
    n(h), m(""), c(!1);
  };
  return /* @__PURE__ */ a("div", { ref: f, className: `relative w-full ${g}`, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        disabled: s,
        onClick: () => {
          s || c((h) => !h);
        },
        className: "flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium",
        children: [
          /* @__PURE__ */ t("span", { className: v ? "text-text-primary" : "text-text-tertiary", children: (v == null ? void 0 : v.label) ?? o }),
          /* @__PURE__ */ t(ye, { className: "h-md w-md shrink-0 text-text-secondary" })
        ]
      }
    ),
    u && /* @__PURE__ */ a(
      "div",
      {
        className: "absolute z-50 mt-xs flex w-full flex-col gap-sm rounded border border-border bg-bg-primary p-sm shadow-lg",
        style: { maxHeight: "20rem" },
        children: [
          /* @__PURE__ */ t(
            Je,
            {
              value: d,
              onChange: (h) => m(h.target.value),
              placeholder: i,
              showSearchIcon: !0,
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ t("div", { className: "overflow-y-auto", style: { maxHeight: "14rem" }, children: l.length > 0 ? l.map((h) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: () => y(h.value),
              className: "flex w-full flex-col gap-xs rounded px-sm py-sm text-left transition-colors hover:bg-bg-secondary",
              style: {
                backgroundColor: h.value === e ? "var(--primary-bg)" : void 0
              },
              children: [
                /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: h.label }),
                h.description && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: h.description })
              ]
            },
            h.value
          )) : /* @__PURE__ */ t("div", { className: "rounded py-sm text-center text-base font-light text-text-tertiary", children: p }) })
        ]
      }
    )
  ] });
}
function Lt({ view: e, onViewChange: r }) {
  return /* @__PURE__ */ a(
    "button",
    {
      onClick: () => {
        r(e === "grid" ? "table" : "grid");
      },
      className: "relative inline-flex h-control-md w-view-toggle shrink-0 cursor-pointer items-center overflow-hidden rounded border border-border bg-bg-tertiary box-border",
      title: e === "grid" ? "테이블 뷰로 전환" : "카드 뷰로 전환",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: `absolute top-0 h-full w-1/2 transition-all duration-200 pointer-events-none bg-primary z-0 ${e === "table" ? "left-0" : "left-1/2"}`
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${e === "table" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ t(De, { className: "w-md h-md" })
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${e === "grid" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ t(ze, { className: "w-md h-md" })
          }
        )
      ]
    }
  );
}
function se({
  value: e,
  onChange: r,
  label: n,
  placeholder: o = "날짜 선택",
  align: i = "left",
  size: p = "medium",
  clearable: s = !1
}) {
  const [g, u] = S(!1), [c, d] = S(/* @__PURE__ */ new Date()), [m, f] = S("date"), [v, l] = S(() => {
    const x = (/* @__PURE__ */ new Date()).getFullYear();
    return x - x % 12;
  }), y = F(null), h = e ? new Date(e) : null;
  z(() => {
    if (g) {
      const x = h ?? /* @__PURE__ */ new Date();
      d(x), f("date"), l(x.getFullYear() - x.getFullYear() % 12);
    }
  }, [g]), z(() => {
    const x = (C) => {
      y.current && !y.current.contains(C.target) && u(!1);
    };
    return g && document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [g]);
  const N = (x) => x.toISOString().split("T")[0], k = (x) => new Date(x).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }), P = (x) => {
    const C = new Date(c.getFullYear(), c.getMonth(), x);
    r(N(C)), u(!1);
  }, W = () => {
    const x = /* @__PURE__ */ new Date();
    d(x), r(N(x)), u(!1);
  }, L = (x) => {
    d(new Date(c.getFullYear(), x, 1)), f("date");
  }, w = (x) => {
    d(new Date(x, c.getMonth(), 1)), f("month");
  }, E = new Date(
    c.getFullYear(),
    c.getMonth() + 1,
    0
  ).getDate(), O = new Date(
    c.getFullYear(),
    c.getMonth(),
    1
  ).getDay(), j = /* @__PURE__ */ new Date();
  j.setHours(0, 0, 0, 0);
  const V = h == null ? void 0 : h.getFullYear(), U = h == null ? void 0 : h.getMonth();
  return /* @__PURE__ */ a("div", { ref: y, className: "relative", children: [
    n && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: n }),
    /* @__PURE__ */ a("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => u((x) => !x),
          className: `flex w-full items-center justify-between rounded border border-border bg-bg-secondary text-base font-medium leading-none text-text-primary ${{
            large: "h-control-lg px-control-px-lg",
            medium: "h-control-md px-control-px-md",
            small: "h-control-sm px-control-px-sm",
            mini: "h-control-mini px-control-px-mini"
          }[p]} ${s && e ? "pr-control-search" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: e ? "text-text-primary" : "text-text-tertiary", children: e ? k(e) : o }),
            /* @__PURE__ */ t(ve, { className: "h-md w-md text-text-tertiary" })
          ]
        }
      ),
      s && e && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "날짜 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: (x) => {
            x.stopPropagation(), r(""), u(!1);
          },
          children: /* @__PURE__ */ t(re, { className: "h-md w-md" })
        }
      )
    ] }),
    g && /* @__PURE__ */ a("div", { className: `absolute z-50 mt-sm w-datepicker overflow-hidden rounded border border-border bg-bg-primary shadow-md ${i === "right" ? "right-none" : "left-none"}`, children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between border-b border-border p-md", children: [
        /* @__PURE__ */ t(
          D,
          {
            type: "button",
            onClick: () => {
              if (m === "year") {
                l(v - 12);
                return;
              }
              if (m === "month") {
                d(new Date(c.getFullYear() - 1, c.getMonth(), 1));
                return;
              }
              d(new Date(c.getFullYear(), c.getMonth() - 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "이전",
            children: /* @__PURE__ */ t(Oe, { className: "h-md w-md" })
          }
        ),
        m === "date" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => f("month"),
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              c.getFullYear(),
              "년 ",
              c.getMonth() + 1,
              "월"
            ]
          }
        ),
        m === "month" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => {
              l(c.getFullYear() - c.getFullYear() % 12), f("year");
            },
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              c.getFullYear(),
              "년"
            ]
          }
        ),
        m === "year" && /* @__PURE__ */ a("div", { className: "flex h-control-md items-center text-lg font-bold text-text-primary", children: [
          v,
          "년 - ",
          v + 11,
          "년"
        ] }),
        /* @__PURE__ */ t(
          D,
          {
            type: "button",
            onClick: () => {
              if (m === "year") {
                l(v + 12);
                return;
              }
              if (m === "month") {
                d(new Date(c.getFullYear() + 1, c.getMonth(), 1));
                return;
              }
              d(new Date(c.getFullYear(), c.getMonth() + 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "다음",
            children: /* @__PURE__ */ t(Le, { className: "h-md w-md" })
          }
        )
      ] }),
      m === "date" && /* @__PURE__ */ a(H, { children: [
        /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-xs p-md pb-sm", children: ["일", "월", "화", "수", "목", "금", "토"].map((x, C) => /* @__PURE__ */ t(
          "div",
          {
            className: `p-sm text-center text-base font-bold ${C === 0 ? "text-error" : C === 6 ? "text-primary" : "text-text-secondary"}`,
            children: x
          },
          x
        )) }),
        /* @__PURE__ */ a("div", { className: "grid grid-cols-7 gap-xs p-md pt-0", children: [
          Array.from({ length: O }).map((x, C) => /* @__PURE__ */ t("div", { className: "h-control-md" }, `empty-${C}`)),
          Array.from({ length: E }).map((x, C) => {
            const b = C + 1, $ = new Date(c.getFullYear(), c.getMonth(), b);
            $.setHours(0, 0, 0, 0);
            const T = h && $.getTime() === h.getTime(), M = $.getTime() === j.getTime();
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => P(b),
                className: `h-control-md rounded text-center text-base font-medium transition-colors ${T ? "bg-primary text-white" : M ? "bg-bg-tertiary text-text-primary" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
                children: b
              },
              b
            );
          })
        ] })
      ] }),
      m === "month" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((x, C) => {
        const b = V === c.getFullYear() && U === C;
        return /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => L(C),
            className: `h-control-lg rounded text-base font-medium transition-colors ${b ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: [
              C + 1,
              "월"
            ]
          },
          C
        );
      }) }),
      m === "year" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((x, C) => {
        const b = v + C;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => w(b),
            className: `h-control-lg rounded text-base font-medium transition-colors ${V === b ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: b
          },
          b
        );
      }) }),
      /* @__PURE__ */ t("div", { className: "flex justify-end border-t border-border p-md", children: m === "date" ? /* @__PURE__ */ t(D, { type: "button", onClick: W, children: "오늘" }) : /* @__PURE__ */ t(D, { type: "button", variant: "secondary", onClick: () => f("date"), children: "달력으로 돌아가기" }) })
    ] })
  ] });
}
const G = (e) => String(e).padStart(2, "0"), le = (e) => !e || e < 1 ? 1 : Math.min(e, 60), ce = (e, r) => {
  const [n = "00", o = "00", i = "00"] = e.split(":"), p = Number(n), s = Number(o), g = Number(i);
  return {
    hour: Number.isInteger(p) ? Math.min(Math.max(p, 0), 23) : 0,
    minute: Number.isInteger(s) ? Math.min(Math.max(s, 0), 59) : 0,
    second: r && Number.isInteger(g) ? Math.min(Math.max(g, 0), 59) : 0
  };
}, J = (e, r) => {
  const n = `${G(e.hour)}:${G(e.minute)}`;
  return r ? `${n}:${G(e.second)}` : n;
}, Z = (e, r) => {
  const n = [];
  for (let o = 0; o <= e; o += r)
    n.push(o);
  return n;
}, de = (e, r) => {
  const n = getComputedStyle(document.documentElement), o = n.getPropertyValue(e).trim(), i = Number.parseFloat(o);
  return !Number.isFinite(i) || i <= 0 ? r : o.endsWith("rem") ? i * Number.parseFloat(n.fontSize) : i;
};
function me({
  value: e,
  onChange: r,
  label: n,
  placeholder: o = "시간 선택",
  align: i = "left",
  size: p = "medium",
  disabled: s = !1,
  clearable: g = !1,
  includeSeconds: u = !0,
  minuteStep: c = 1,
  secondStep: d = 1
}) {
  const [m, f] = S(!1), [v, l] = S(() => ce(e, u)), [y, h] = S(e), [N, k] = S({ top: 0, left: 0 }), P = F(null), W = F(null), L = le(c), w = le(d), E = _(
    () => Z(59, L),
    [L]
  ), O = _(
    () => Z(59, w),
    [w]
  );
  ae(() => {
    m && l(ce(e, u));
  }, [u, m, e]), z(() => {
    m || h(e);
  }, [m, e]), z(() => {
    const b = ($) => {
      var X, Y;
      const T = $.target, M = (X = P.current) == null ? void 0 : X.contains(T), R = (Y = W.current) == null ? void 0 : Y.contains(T);
      !M && !R && f(!1);
    };
    return m && document.addEventListener("mousedown", b), () => {
      document.removeEventListener("mousedown", b);
    };
  }, [m]), z(() => {
    if (!m)
      return;
    const b = () => {
      var Y;
      const $ = (Y = P.current) == null ? void 0 : Y.getBoundingClientRect();
      if (!$)
        return;
      const T = de("--timepicker-width", 288), M = de("--spacing-sm", 8), R = i === "right" ? $.right - T : $.left, X = window.innerWidth - T - M;
      k({
        top: $.bottom + M,
        left: Math.max(M, Math.min(R, X))
      });
    };
    return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
    };
  }, [i, m]), ae(() => {
    if (!m)
      return;
    const b = window.requestAnimationFrame(() => {
      var $;
      ($ = W.current) == null || $.querySelectorAll('[data-time-selected="true"]').forEach((T) => {
        const M = T.closest('[data-time-options="true"]');
        M && (M.scrollTop = T.offsetTop - M.clientHeight / 2 + T.clientHeight / 2);
      });
    });
    return () => {
      window.cancelAnimationFrame(b);
    };
  }, [v.hour, v.minute, v.second, m]);
  const j = {
    large: "h-control-lg px-control-px-lg",
    medium: "h-control-md px-control-px-md",
    small: "h-control-sm px-control-px-sm",
    mini: "h-control-mini px-control-px-mini"
  }, V = (b, $) => {
    const T = {
      ...v,
      [b]: $
    };
    l(T);
    const M = J(T, u);
    h(M), r(M);
  }, U = () => {
    const b = /* @__PURE__ */ new Date(), $ = {
      hour: b.getHours(),
      minute: b.getMinutes(),
      second: u ? b.getSeconds() : 0
    };
    l($);
    const T = J($, u);
    h(T), r(T), f(!1);
  }, ne = () => {
    const b = J(v, u);
    h(b), r(b), f(!1);
  }, x = () => {
    h(""), r(""), f(!1);
  }, C = (b, $, T) => /* @__PURE__ */ a("div", { className: "min-w-0 flex-1", children: [
    /* @__PURE__ */ t("div", { className: "px-xs pb-xs text-center text-base font-bold text-text-tertiary", children: b }),
    /* @__PURE__ */ t(
      "div",
      {
        "data-time-options": "true",
        className: "overflow-y-auto",
        style: { maxHeight: "var(--timepicker-options-max-height, 12rem)" },
        children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-xs", children: T.map((M) => {
          const R = v[$] === M;
          return /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-time-selected": R ? "true" : void 0,
              "aria-current": R ? "time" : void 0,
              onClick: () => V($, M),
              className: `h-control-md rounded text-center text-base font-medium transition-colors ${R ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
              children: G(M)
            },
            M
          );
        }) })
      }
    )
  ] });
  return /* @__PURE__ */ a("div", { ref: P, children: [
    n && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: n }),
    /* @__PURE__ */ a("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        "div",
        {
          className: "relative",
          children: [
            /* @__PURE__ */ t(
              "input",
              {
                readOnly: !0,
                tabIndex: -1,
                value: y || "",
                placeholder: o,
                className: `pointer-events-none w-full rounded border border-border bg-bg-secondary pl-control-search pr-control-px-md text-base font-medium leading-none text-text-primary placeholder:text-text-tertiary ${j[p]}`
              }
            ),
            /* @__PURE__ */ t(Ie, { className: "pointer-events-none absolute left-md top-1/2 h-md w-md -translate-y-1/2 text-text-tertiary" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          disabled: s,
          onClick: () => {
            s || f((b) => !b);
          },
          className: `absolute inset-0 rounded bg-transparent text-left ${s ? "cursor-not-allowed text-text-tertiary" : "cursor-pointer"}`,
          "aria-expanded": m,
          "aria-haspopup": "dialog",
          "aria-label": y || o,
          children: /* @__PURE__ */ t("span", { className: "sr-only", children: y || o })
        }
      ),
      g && e && !s && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "시간 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: x,
          children: /* @__PURE__ */ t(re, { className: "h-md w-md" })
        }
      ),
      m && ke(
        /* @__PURE__ */ a(
          "div",
          {
            ref: W,
            className: "fixed overflow-hidden rounded border border-border bg-bg-primary shadow-lg",
            style: {
              top: N.top,
              left: N.left,
              width: "var(--timepicker-width, 18rem)",
              zIndex: "var(--layer-popover, 1000)"
            },
            onMouseDown: (b) => b.stopPropagation(),
            children: [
              /* @__PURE__ */ a("div", { className: "flex gap-sm p-sm", children: [
                C("시", "hour", Z(23, 1)),
                C("분", "minute", E),
                u && C("초", "second", O)
              ] }),
              /* @__PURE__ */ a("div", { className: "flex justify-end gap-sm border-t border-border p-sm", children: [
                g && /* @__PURE__ */ t(D, { type: "button", variant: "secondary", size: "small", onClick: x, children: "초기화" }),
                /* @__PURE__ */ t(D, { type: "button", variant: "secondary", size: "small", onClick: U, children: "현재" }),
                /* @__PURE__ */ t(D, { type: "button", size: "small", onClick: ne, children: "확인" })
              ] })
            ]
          }
        ),
        document.body
      )
    ] })
  ] });
}
function It({
  startValue: e,
  endValue: r,
  onStartChange: n,
  onEndChange: o,
  label: i,
  startPlaceholder: p = "시작 시간",
  endPlaceholder: s = "종료 시간",
  separator: g = "To",
  align: u = "left",
  size: c = "medium",
  disabled: d = !1,
  clearable: m = !1,
  includeSeconds: f = !0,
  minuteStep: v = 1,
  secondStep: l = 1
}) {
  return /* @__PURE__ */ a("div", { children: [
    i && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: i }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-md", children: [
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        me,
        {
          value: e,
          onChange: n,
          placeholder: p,
          align: u,
          size: c,
          disabled: d,
          clearable: m,
          includeSeconds: f,
          minuteStep: v,
          secondStep: l
        }
      ) }),
      /* @__PURE__ */ t("span", { className: "shrink-0 text-base font-medium text-text-secondary", children: g }),
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        me,
        {
          value: r,
          onChange: o,
          placeholder: s,
          align: "right",
          size: c,
          disabled: d,
          clearable: m,
          includeSeconds: f,
          minuteStep: v,
          secondStep: l
        }
      ) })
    ] })
  ] });
}
const Ze = {
  medium: {
    track: {
      width: "calc(var(--control-height-lg) + var(--spacing-lg))",
      height: "var(--control-height-sm)",
      padding: "var(--spacing-xs)",
      borderRadius: "calc(var(--control-height-sm) * 2)"
    },
    thumb: {
      width: "calc(var(--control-height-sm) - var(--spacing-xs) - var(--spacing-xs))",
      height: "calc(var(--control-height-sm) - var(--spacing-xs) - var(--spacing-xs))",
      borderRadius: "calc(var(--control-height-sm) * 2)"
    },
    checkedTransform: "translateX(calc(var(--control-height-lg) + var(--spacing-lg) - var(--control-height-sm)))"
  },
  small: {
    track: {
      width: "calc(var(--control-height-md) + var(--spacing-md))",
      height: "var(--control-height-mini)",
      padding: "var(--spacing-xs)",
      borderRadius: "calc(var(--control-height-mini) * 2)"
    },
    thumb: {
      width: "calc(var(--control-height-mini) - var(--spacing-xs) - var(--spacing-xs))",
      height: "calc(var(--control-height-mini) - var(--spacing-xs) - var(--spacing-xs))",
      borderRadius: "calc(var(--control-height-mini) * 2)"
    },
    checkedTransform: "translateX(calc(var(--control-height-md) + var(--spacing-md) - var(--control-height-mini)))"
  }
}, et = {
  primary: "bg-primary",
  success: "bg-success"
};
function Wt({
  checked: e,
  onCheckedChange: r,
  label: n,
  description: o,
  disabled: i = !1,
  variant: p = "primary",
  size: s = "medium",
  labelPosition: g = "right",
  className: u = "",
  id: c,
  name: d,
  ariaLabel: m
}) {
  const f = Ze[s], l = /* @__PURE__ */ t(
    "button",
    {
      id: c,
      name: d,
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": m,
      disabled: i,
      onClick: () => {
        i || r(!e);
      },
      className: `inline-flex shrink-0 items-center border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${e ? et[p] : "bg-bg-tertiary"} ${i ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
      style: f.track,
      children: /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "block bg-white shadow-sm transition-transform duration-200 ease-in-out",
          style: {
            ...f.thumb,
            transform: e ? f.checkedTransform : "translateX(0)"
          }
        }
      )
    }
  );
  return !n && !o ? /* @__PURE__ */ t("span", { className: `inline-flex items-center ${u}`, children: l }) : /* @__PURE__ */ a(
    "label",
    {
      className: `inline-flex items-center gap-sm text-base font-medium text-text-primary ${i ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${u}`,
      children: [
        g === "left" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
          n && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: n }),
          o && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: o })
        ] }),
        l,
        g === "right" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
          n && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: n }),
          o && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: o })
        ] })
      ]
    }
  );
}
const tt = [
  { day: 1, label: "월" },
  { day: 2, label: "화" },
  { day: 3, label: "수" },
  { day: 4, label: "목" },
  { day: 5, label: "금" },
  { day: 6, label: "토" },
  { day: 0, label: "일" }
];
function Pt({
  isOpen: e,
  title: r = "요일별 요금 일괄 수정",
  startDate: n,
  endDate: o,
  values: i,
  targetLabel: p,
  rateTypeLabel: s,
  commissionLabel: g,
  previewRows: u = [],
  targetOptions: c = [],
  selectedTargetIds: d = [],
  activeWeekdays: m = [0, 1, 2, 3, 4, 5, 6],
  warningMessage: f,
  disabled: v = !1,
  onTargetToggle: l,
  onWeekdayToggle: y,
  onStartDateChange: h,
  onEndDateChange: N,
  onValueChange: k,
  onSubmit: P,
  onClose: W
}) {
  if (!e) return null;
  const L = (w) => new Intl.NumberFormat("ko-KR").format(w);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-lg",
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      onClick: W,
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "w-full overflow-y-auto rounded p-lg",
          style: {
            width: "var(--modal-width-lg)",
            maxWidth: "100%",
            maxHeight: "var(--modal-max-height)",
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-md)"
          },
          onClick: (w) => w.stopPropagation(),
          children: [
            /* @__PURE__ */ a("div", { className: "mb-lg flex items-center justify-between gap-md", children: [
              /* @__PURE__ */ t(
                "h3",
                {
                  className: "m-none text-2xl",
                  style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)" },
                  children: r
                }
              ),
              /* @__PURE__ */ a("div", { className: "flex shrink-0 gap-md", children: [
                /* @__PURE__ */ a(
                  D,
                  {
                    type: "button",
                    disabled: v,
                    onClick: P,
                    className: "w-modal-action",
                    children: [
                      /* @__PURE__ */ t(We, { className: "h-icon-md w-icon-md" }),
                      "적용"
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  D,
                  {
                    type: "button",
                    variant: "secondary",
                    onClick: W,
                    className: "w-modal-action",
                    children: "취소"
                  }
                )
              ] })
            ] }),
            f && /* @__PURE__ */ t(Ue, { variant: "warning", title: "확인 필요", className: "mb-lg", children: f }),
            c.length > 0 && /* @__PURE__ */ a("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "일괄 수정 대상"
                }
              ),
              /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-sm", children: c.map((w) => {
                const E = d.includes(w.id);
                return /* @__PURE__ */ a(
                  "button",
                  {
                    type: "button",
                    onClick: () => l == null ? void 0 : l(w.id),
                    className: "flex h-control-md items-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors",
                    style: {
                      backgroundColor: E ? "var(--primary)" : "var(--bg-secondary)",
                      borderRadius: "var(--radius)",
                      color: E ? "#ffffff" : "var(--text-primary)",
                      fontWeight: "var(--font-medium)"
                    },
                    children: [
                      w.id,
                      " / ",
                      w.name
                    ]
                  },
                  w.id
                );
              }) })
            ] }),
            /* @__PURE__ */ a("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "기간 선택"
                }
              ),
              /* @__PURE__ */ a("div", { className: "grid grid-cols-2 gap-md", children: [
                /* @__PURE__ */ t(
                  se,
                  {
                    label: "시작일",
                    value: n,
                    onChange: h,
                    placeholder: "시작일 선택"
                  }
                ),
                /* @__PURE__ */ t(
                  se,
                  {
                    label: "종료일",
                    value: o,
                    onChange: N,
                    placeholder: "종료일 선택",
                    align: "right"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ a("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "요일별 요금"
                }
              ),
              /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-sm", children: tt.map(({ day: w, label: E }) => {
                const O = m.includes(w);
                return /* @__PURE__ */ a("label", { className: "block", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => y == null ? void 0 : y(w),
                      className: "mb-xs flex h-control-md w-full items-center justify-center rounded border-none text-base leading-none transition-colors",
                      style: {
                        backgroundColor: O ? "var(--primary)" : "var(--bg-secondary)",
                        borderRadius: "var(--radius)",
                        color: O ? "#ffffff" : "var(--text-tertiary)",
                        fontWeight: "var(--font-bold)"
                      },
                      children: E
                    }
                  ),
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "number",
                      disabled: !O,
                      value: i[w] ?? "",
                      onChange: (j) => k(w, j.target.value),
                      placeholder: "0",
                      className: "h-control-md w-full rounded px-control-px-sm py-none text-center text-base leading-none",
                      style: {
                        backgroundColor: O ? "var(--bg-secondary)" : "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius)",
                        color: O ? "var(--text-primary)" : "var(--text-tertiary)",
                        cursor: O ? "text" : "not-allowed",
                        fontWeight: "var(--font-medium)",
                        opacity: O ? 1 : 0.6
                      }
                    }
                  )
                ] }, w);
              }) })
            ] }),
            /* @__PURE__ */ a("div", { className: "mb-lg", children: [
              /* @__PURE__ */ a("div", { className: "mb-sm flex items-center justify-between gap-md", children: [
                /* @__PURE__ */ t(
                  "label",
                  {
                    className: "block text-base",
                    style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                    children: "적용 미리보기"
                  }
                ),
                (s || g) && /* @__PURE__ */ a(
                  "div",
                  {
                    className: "text-base",
                    style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                    children: [
                      s,
                      s && g ? " · " : "",
                      g
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ t(
                "div",
                {
                  className: "overflow-x-auto rounded",
                  style: {
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius)"
                  },
                  children: /* @__PURE__ */ a("table", { className: "w-full border-separate border-spacing-0", children: [
                    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ a("tr", { style: { backgroundColor: "var(--bg-secondary)" }, children: [
                      /* @__PURE__ */ t(
                        "th",
                        {
                          className: "px-md py-sm text-left text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: p
                        }
                      ),
                      /* @__PURE__ */ t(
                        "th",
                        {
                          className: "px-md py-sm text-left text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: "요일"
                        }
                      ),
                      /* @__PURE__ */ t(
                        "th",
                        {
                          className: "px-md py-sm text-right text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: "입력금액"
                        }
                      ),
                      /* @__PURE__ */ t(
                        "th",
                        {
                          className: "px-md py-sm text-right text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: "판매가"
                        }
                      ),
                      /* @__PURE__ */ t(
                        "th",
                        {
                          className: "px-md py-sm text-right text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: "커미션"
                        }
                      ),
                      /* @__PURE__ */ t(
                        "th",
                        {
                          className: "px-md py-sm text-right text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: "입금가"
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ t("tbody", { children: u.length === 0 ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t(
                      "td",
                      {
                        colSpan: 6,
                        className: "px-md py-lg text-center text-base",
                        style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                        children: "요일별 금액을 입력하면 계산 결과가 표시됩니다."
                      }
                    ) }) : u.flatMap(
                      (w) => w.cells.map((E, O) => /* @__PURE__ */ a("tr", { children: [
                        /* @__PURE__ */ t(
                          "td",
                          {
                            className: "px-md py-sm text-base",
                            style: {
                              color: "var(--text-primary)",
                              fontWeight: "var(--font-medium)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: O === 0 ? `${w.id} / ${w.name}` : ""
                          }
                        ),
                        /* @__PURE__ */ t(
                          "td",
                          {
                            className: "px-md py-sm text-base",
                            style: {
                              color: E.day === 0 ? "var(--error)" : E.day === 6 ? "var(--primary)" : "var(--text-secondary)",
                              fontWeight: "var(--font-bold)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: E.label
                          }
                        ),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: L(E.inputAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: L(E.sellRate) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: L(E.commissionAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: L(E.netRate) })
                      ] }, `${w.id}-${E.day}`))
                    ) })
                  ] })
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const B = "CREAMI_THEME", rt = 3600 * 24 * 365, te = `path=/; max-age=${rt}; SameSite=Lax`;
function ue(e) {
  return e === "dark" || e === "light";
}
function nt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${B}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function ot() {
  const e = window.location.hostname;
  if (e === "localhost" || e.endsWith(".localhost") || /^\d{1,3}(\.\d{1,3}){3}$/.test(e))
    return;
  const r = e.split(".");
  return r.length > 2 ? `.${r.slice(-2).join(".")}` : void 0;
}
function Ce(e) {
  document.cookie = `${B}=${e}; ${te}`;
  const r = ot();
  r && (document.cookie = `${B}=${e}; ${te}; domain=${r}`), document.documentElement.setAttribute("data-theme", e), window.dispatchEvent(new CustomEvent("creami-theme-change", { detail: e }));
}
function at() {
  return z(() => {
    const e = nt(), r = ue(e) ? e : "dark";
    ue(e) ? document.documentElement.setAttribute("data-theme", r) : Ce(r);
  }, []), null;
}
function Rt({ children: e }) {
  const r = `
    (function () {
      try {
        var cookieOptions = '${te}';
        function getSharedCookieDomain() {
          var hostname = window.location.hostname;
          if (
            hostname === 'localhost' ||
            hostname.slice(-10) === '.localhost' ||
            /^\\d{1,3}(\\.\\d{1,3}){3}$/.test(hostname)
          ) {
            return null;
          }
          var parts = hostname.split('.');
          return parts.length > 2 ? '.' + parts.slice(-2).join('.') : null;
        }
        var themeCookie = document.cookie
          .split('; ')
          .find(function (cookie) { return cookie.indexOf('${B}=') === 0; });
        var theme = themeCookie ? themeCookie.split('=')[1] : null;
        if (theme !== 'dark' && theme !== 'light') {
          theme = 'dark';
        }
        document.cookie = '${B}=' + theme + '; ' + cookieOptions;
        var sharedDomain = getSharedCookieDomain();
        if (sharedDomain) {
          document.cookie = '${B}=' + theme + '; ' + cookieOptions + '; domain=' + sharedDomain;
        }
        document.documentElement.setAttribute('data-theme', theme);
      } catch (error) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;
  return /* @__PURE__ */ a(H, { children: [
    /* @__PURE__ */ t("script", { dangerouslySetInnerHTML: { __html: r } }),
    /* @__PURE__ */ t(at, {}),
    e
  ] });
}
function it() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function At() {
  const [e, r] = S("dark"), [n, o] = S(!1);
  if (z(() => {
    r(it()), o(!0);
    const s = (g) => {
      const u = g.detail;
      r(u === "light" ? "light" : "dark");
    };
    return window.addEventListener("creami-theme-change", s), () => {
      window.removeEventListener("creami-theme-change", s);
    };
  }, []), !n)
    return /* @__PURE__ */ t("div", { className: "h-control-md w-control-md" });
  const i = e === "dark", p = i ? "light" : "dark";
  return /* @__PURE__ */ t(
    D,
    {
      type: "button",
      variant: "tertiary",
      size: "normal",
      iconOnly: !0,
      onClick: () => {
        Ce(p);
      },
      "aria-label": i ? "라이트 모드로 전환" : "다크 모드로 전환",
      title: i ? "라이트 모드로 전환" : "다크 모드로 전환",
      children: i ? /* @__PURE__ */ t(Pe, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Re, { className: "h-lg w-lg" })
    }
  );
}
const st = ["ko", "en", "ja"], lt = {
  ko: "한국어",
  en: "English",
  ja: "日本語"
}, ct = {
  ko: "🇰🇷",
  en: "🇺🇸",
  ja: "🇯🇵"
};
function dt({ currentLocale: e, onLocaleChange: r }) {
  const [n, o] = S(!1), [i, p] = qe(), s = Q(), g = (u) => {
    o(!1), p(() => {
      document.cookie = `NEXT_LOCALE=${u}; path=/; max-age=31536000; SameSite=Lax`, r == null || r(u);
    });
  };
  return /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ t(
      D,
      {
        type: "button",
        variant: "tertiary",
        size: "normal",
        iconOnly: !0,
        onClick: () => o(!n),
        "aria-label": s("language.select"),
        title: s("language.select"),
        disabled: i,
        children: /* @__PURE__ */ t(Ae, { className: "h-lg w-lg" })
      }
    ),
    n && /* @__PURE__ */ a(H, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => o(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ t("div", { className: "absolute right-0 top-full z-50 mt-xs min-w-[120px] rounded bg-bg-secondary border border-border shadow-lg", children: st.map((u) => /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => g(u),
          disabled: i,
          className: `flex w-full items-center gap-sm px-md py-sm text-left text-base font-medium text-text-primary hover:bg-bg-tertiary transition-colors first:rounded-t last:rounded-b disabled:opacity-50 disabled:cursor-not-allowed ${e === u ? "bg-bg-tertiary" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": "true", children: ct[u] }),
            /* @__PURE__ */ t("span", { children: lt[u] })
          ]
        },
        u
      )) })
    ] })
  ] });
}
function mt() {
  const [e, r] = S(!1), [n] = S(!0), o = Q();
  return /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ a(
      D,
      {
        type: "button",
        variant: "tertiary",
        size: "normal",
        iconOnly: !0,
        onClick: () => r(!e),
        "aria-label": o("common.notification"),
        title: o("common.notification"),
        className: "relative",
        children: [
          /* @__PURE__ */ t(Fe, { className: "h-lg w-lg" }),
          n && /* @__PURE__ */ t("span", { className: "absolute right-[6px] top-[6px] h-[8px] w-[8px] rounded-full bg-primary" })
        ]
      }
    ),
    e && /* @__PURE__ */ a(H, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => r(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ a("div", { className: "absolute right-0 top-full z-50 mt-xs w-[320px] rounded bg-bg-secondary border border-border shadow-lg", children: [
        /* @__PURE__ */ t("div", { className: "px-md py-sm border-b border-border", children: /* @__PURE__ */ t("h3", { className: "font-bold text-text-primary", children: o("notification.title") }) }),
        /* @__PURE__ */ t("div", { className: "max-h-[400px] overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "px-md py-md text-center text-text-secondary", children: o("notification.empty") }) })
      ] })
    ] })
  ] });
}
const $e = we(null);
let I = null, he = 0;
const ut = {
  success: be,
  warning: fe,
  info: xe,
  error: ge
}, ht = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--primary)",
  error: "var(--error)"
};
function pt() {
  return he += 1, `notification-${Date.now()}-${he}`;
}
function gt(e) {
  return e.endsWith("left") ? "left" : "right";
}
function ft(e) {
  const r = e.startsWith("top") ? "top-lg" : "bottom-lg", n = e.endsWith("left") ? "left-lg" : "right-lg";
  return `${r} ${n}`;
}
function bt(e) {
  return {
    left: "-translate-x-full",
    right: "translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full"
  }[e];
}
function xt({
  item: e,
  onClose: r
}) {
  const [n, o] = S(!1), i = ut[e.type], p = e.direction ?? gt(e.placement);
  return z(() => {
    const s = window.setTimeout(() => o(!0), 0);
    return () => window.clearTimeout(s);
  }, []), z(() => {
    if (e.duration <= 0)
      return;
    const s = window.setTimeout(() => r(e.id), e.duration);
    return () => window.clearTimeout(s);
  }, [e.duration, e.id, r]), /* @__PURE__ */ a(
    "div",
    {
      className: `pointer-events-auto flex w-app-switcher items-start gap-md rounded border border-border bg-bg-primary p-md shadow-lg transition-all ${n && !e.isClosing ? "translate-x-0 translate-y-0 opacity-100" : `${bt(p)} opacity-0`}`,
      role: "alert",
      style: {
        borderRadius: "var(--radius)",
        maxWidth: "calc(100vw - var(--spacing-xl))"
      },
      children: [
        /* @__PURE__ */ t(
          i,
          {
            className: "mt-xs h-icon-md w-icon-md shrink-0",
            style: { color: ht[e.type] },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ a("div", { className: "min-w-none flex-1", children: [
          e.title && /* @__PURE__ */ t("div", { className: "mb-xs font-bold text-text-primary", children: e.title }),
          /* @__PURE__ */ t("div", { className: "text-base font-medium text-text-secondary", children: e.message })
        ] }),
        e.showClose && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "flex h-icon-md w-icon-md shrink-0 cursor-pointer items-center justify-center rounded border-none bg-transparent p-none text-text-tertiary transition-colors hover:text-text-primary",
            "aria-label": "Close notification",
            onClick: () => r(e.id),
            children: /* @__PURE__ */ t(re, { className: "h-icon-md w-icon-md", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
}
function q({
  placement: e,
  items: r,
  onClose: n
}) {
  if (r.length === 0)
    return null;
  const i = e.startsWith("bottom") ? [...r].reverse() : r;
  return /* @__PURE__ */ t(
    "div",
    {
      className: `pointer-events-none fixed z-[var(--layer-popover)] flex flex-col gap-md ${ft(e)}`,
      children: i.map((p) => /* @__PURE__ */ t(xt, { item: p, onClose: n }, p.id))
    }
  );
}
function A(e) {
  const r = () => {
    throw new Error("NotificationProvider is required before using notification.");
  };
  return {
    open: (n) => (e == null ? void 0 : e.open(n)) ?? r(),
    success: (n) => (e == null ? void 0 : e.open({ ...n, type: "success" })) ?? r(),
    warning: (n) => (e == null ? void 0 : e.open({ ...n, type: "warning" })) ?? r(),
    info: (n) => (e == null ? void 0 : e.open({ ...n, type: "info" })) ?? r(),
    error: (n) => (e == null ? void 0 : e.open({ ...n, type: "error" })) ?? r(),
    close: (n) => {
      if (!e) {
        r();
        return;
      }
      e.close(n);
    },
    closeAll: () => {
      if (!e) {
        r();
        return;
      }
      e.closeAll();
    }
  };
}
function Ft({
  children: e,
  defaultDuration: r = 4500,
  defaultPlacement: n = "top-right"
}) {
  const [o, i] = S([]), p = F(/* @__PURE__ */ new Map()), [s, g] = S(!1);
  z(() => {
    g(!0);
  }, []);
  const u = K((l) => {
    i((y) => {
      var N;
      const h = y.find((k) => k.id === l);
      return h && ((N = h.onClose) == null || N.call(h)), y.filter((k) => k.id !== l);
    });
  }, []), c = K((l) => {
    const y = p.current.get(l);
    y && window.clearTimeout(y), i((N) => N.map((k) => k.id === l ? { ...k, isClosing: !0 } : k));
    const h = window.setTimeout(() => {
      u(l), p.current.delete(l);
    }, 200);
    p.current.set(l, h);
  }, [u]), d = K((l) => {
    const y = l.id ?? pt(), h = {
      id: y,
      type: l.type ?? "info",
      title: l.title,
      message: l.message,
      duration: l.duration ?? r,
      placement: l.placement ?? n,
      direction: l.direction,
      showClose: l.showClose ?? !0,
      onClose: l.onClose
    };
    return i((N) => N.some((k) => k.id === y) ? N.map((k) => k.id === y ? h : k) : [...N, h]), y;
  }, [r, n]), m = K(() => {
    i((l) => (l.forEach((y) => {
      var h;
      return (h = y.onClose) == null ? void 0 : h.call(y);
    }), []));
  }, []), f = _(() => ({
    open: d,
    success: (l) => d({ ...l, type: "success" }),
    warning: (l) => d({ ...l, type: "warning" }),
    info: (l) => d({ ...l, type: "info" }),
    error: (l) => d({ ...l, type: "error" }),
    close: c,
    closeAll: m
  }), [c, m, d]);
  z(() => (I = { open: d, close: c, closeAll: m }, () => {
    I = null, p.current.forEach((l) => window.clearTimeout(l)), p.current.clear();
  }), [c, m, d]);
  const v = _(() => ({
    "top-left": o.filter((l) => l.placement === "top-left"),
    "top-right": o.filter((l) => l.placement === "top-right"),
    "bottom-left": o.filter((l) => l.placement === "bottom-left"),
    "bottom-right": o.filter((l) => l.placement === "bottom-right")
  }), [o]);
  return /* @__PURE__ */ a($e.Provider, { value: f, children: [
    e,
    s && ke(
      /* @__PURE__ */ a(H, { children: [
        /* @__PURE__ */ t(q, { placement: "top-left", items: v["top-left"], onClose: c }),
        /* @__PURE__ */ t(q, { placement: "top-right", items: v["top-right"], onClose: c }),
        /* @__PURE__ */ t(q, { placement: "bottom-left", items: v["bottom-left"], onClose: c }),
        /* @__PURE__ */ t(q, { placement: "bottom-right", items: v["bottom-right"], onClose: c })
      ] }),
      document.body
    )
  ] });
}
function jt() {
  const e = Ne($e);
  if (!e)
    throw new Error("useNotification must be used within NotificationProvider.");
  return e;
}
const Bt = {
  open: (e) => A(I).open(e),
  success: (e) => A(I).success(e),
  warning: (e) => A(I).warning(e),
  info: (e) => A(I).info(e),
  error: (e) => A(I).error(e),
  close: (e) => A(I).close(e),
  closeAll: () => A(I).closeAll()
};
function Ht({
  children: e,
  className: r = "",
  onClick: n,
  hover: o = !0
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: `bg-bg-primary rounded border border-border shadow overflow-hidden ${o ? "transition-all hover:shadow-lg cursor-pointer" : ""} ${r}`,
      onClick: n,
      children: e
    }
  );
}
function Yt({ children: e, className: r = "", overflow: n = "auto" }) {
  return /* @__PURE__ */ t("div", { className: n === "visible" ? "overflow-visible" : "overflow-x-auto", children: /* @__PURE__ */ t("table", { className: `w-full border-separate border-spacing-0 ${r}`, children: e }) });
}
function _t({ children: e, className: r = "" }) {
  return /* @__PURE__ */ t("thead", { className: `bg-bg-tertiary border-b-2 border-border ${r}`, children: e });
}
function Vt({ children: e, className: r = "" }) {
  return /* @__PURE__ */ t("tbody", { className: r, children: e });
}
function Xt({
  children: e,
  onClick: r,
  className: n = "",
  isSelected: o = !1
}) {
  return /* @__PURE__ */ t("tr", { className: `${`transition-all ${o ? "bg-primary-bg border-l border-l-primary" : "bg-bg-primary border-l border-l-transparent"} ${r ? "cursor-pointer hover:bg-bg-secondary" : "cursor-default"}`} ${n}`, onClick: r, children: e });
}
function Kt({
  children: e,
  className: r = "",
  align: n = "left",
  ...o
}) {
  return /* @__PURE__ */ t("td", { className: `px-md py-xs text-base text-text-primary border-b border-border ${n === "center" ? "text-center" : n === "right" ? "text-right" : "text-left"} ${r}`, ...o, children: e });
}
function qt({
  children: e,
  className: r = "",
  align: n = "left",
  ...o
}) {
  return /* @__PURE__ */ t("th", { className: `px-md py-xs text-base font-bold text-text-primary ${n === "center" ? "text-center" : n === "right" ? "text-right" : "text-left"} ${r}`, ...o, children: e });
}
function Gt({
  children: e,
  isCollapsed: r = !1,
  className: n = ""
}) {
  return /* @__PURE__ */ t(
    "aside",
    {
      className: `fixed left-0 bottom-0 z-30 top-[var(--header-height)] overflow-hidden bg-bg-primary border-r border-border transition-[width] duration-300 ease-in-out ${r ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]"} ${n}`,
      children: e
    }
  );
}
function Qt({ children: e }) {
  return /* @__PURE__ */ t("nav", { className: "h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ t("ul", { className: "flex w-full flex-col gap-xs list-none m-0 p-0", children: e }) });
}
function Ut({
  icon: e,
  label: r,
  href: n,
  onClick: o,
  isActive: i = !1,
  isCollapsed: p = !1,
  depth: s = 0
}) {
  const g = (m) => {
    o && (m.preventDefault(), o());
  }, u = /* @__PURE__ */ a(H, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: `absolute left-0 top-0 h-full rounded transition-[width,background-color] duration-300 ${p ? "w-[calc(var(--sidebar-collapsed)-var(--spacing-lg))]" : "w-full"} ${i ? "bg-primary" : "bg-transparent group-hover:bg-bg-tertiary"}`
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: `absolute top-1/2 z-10 flex h-lg w-lg -translate-y-1/2 items-center justify-center ${s === 1 && !p ? "left-lg" : "left-md"}`,
        children: /* @__PURE__ */ t(e, { className: "w-lg h-lg shrink-0" })
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: `pointer-events-none absolute right-md top-1/2 z-10 min-w-0 -translate-y-1/2 truncate whitespace-nowrap ${s === 1 && !p ? "left-[calc(var(--sidebar-collapsed)+var(--spacing-sm))]" : "left-[calc(var(--sidebar-collapsed)-var(--spacing-md))]"}`,
        children: r
      }
    )
  ] }), c = "group w-full rounded", d = `relative flex min-h-2xl w-full items-center bg-transparent text-lg font-medium no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${i ? "text-white" : "text-text-secondary group-hover:text-text-primary"}`;
  return /* @__PURE__ */ t("li", { className: c, children: n ? /* @__PURE__ */ t(
    "a",
    {
      href: n,
      className: d,
      title: r,
      "aria-current": i ? "page" : void 0,
      onClick: g,
      children: u
    }
  ) : /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: `${d} border-0 text-left cursor-pointer w-full`,
      title: r,
      "aria-pressed": i,
      onClick: o,
      children: u
    }
  ) });
}
const Se = we(void 0), Te = "CREAMI_SIDEBAR_COLLAPSED", yt = 3600 * 24 * 365;
function vt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${Te}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function wt(e) {
  document.cookie = `${Te}=${String(e)}; path=/; max-age=${yt}; SameSite=Lax`;
}
function Nt({ children: e }) {
  const [r, n] = S(!1), [o, i] = S(!1);
  z(() => {
    const s = vt();
    s !== null && n(s === "true"), i(!0);
  }, []), z(() => {
    o && wt(r);
  }, [r, o]);
  const p = () => {
    n((s) => !s);
  };
  return /* @__PURE__ */ t(Se.Provider, { value: { isCollapsed: r, toggleSidebar: p, setIsCollapsed: n }, children: e });
}
function Me() {
  const e = Ne(Se);
  if (e === void 0)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return e;
}
const pe = {
  Home: _e,
  LayoutDashboard: ee,
  BarChart3: Ye,
  Tag: He,
  Calendar: ve,
  ReceiptText: Be,
  Settings: je
};
function kt({ apps: e, currentAppId: r }) {
  const [n, o] = S(!1), i = F(null), p = Q(), s = e.find((d) => d.id === r) ?? e[0], g = pe[s == null ? void 0 : s.icon] ?? ee, u = (d) => p(`apps.${d.id}`);
  z(() => {
    const d = (m) => {
      i.current && !i.current.contains(m.target) && o(!1);
    };
    return n && document.addEventListener("mousedown", d), () => {
      document.removeEventListener("mousedown", d);
    };
  }, [n]);
  const c = (d) => {
    window.location.href = d;
  };
  return /* @__PURE__ */ a("div", { className: "relative flex h-full shrink-0 items-center", ref: i, children: [
    /* @__PURE__ */ a(
      D,
      {
        type: "button",
        variant: n ? "tertiary" : "ghost",
        size: "normal",
        onClick: () => o((d) => !d),
        className: "justify-start !text-lg font-medium",
        "aria-expanded": n,
        "aria-haspopup": "menu",
        children: [
          /* @__PURE__ */ t(g, { className: "h-lg w-lg text-primary" }),
          /* @__PURE__ */ t("span", { className: "whitespace-nowrap !text-lg font-medium", children: s ? u(s) : "" }),
          /* @__PURE__ */ t(
            ye,
            {
              className: `h-md w-md shrink-0 transition-transform ${n ? "rotate-180" : "rotate-0"}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: `absolute left-0 top-full z-50 grid w-app-switcher overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${n ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"}`,
        "aria-hidden": !n,
        children: /* @__PURE__ */ t("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ a(
          "div",
          {
            className: `max-h-[var(--app-switcher-dropdown-height)] overflow-y-auto rounded border border-border bg-bg-primary p-md shadow-md transition-transform duration-300 ease-in-out ${n ? "translate-y-none" : "-translate-y-sm"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "px-md py-sm text-base font-bold uppercase text-text-tertiary", children: p("appSwitcher.title") }),
              /* @__PURE__ */ t("div", { className: "flex flex-col gap-sm", children: e.map((d) => {
                const m = pe[d.icon] ?? ee, f = d.id === (s == null ? void 0 : s.id);
                return /* @__PURE__ */ a(
                  D,
                  {
                    type: "button",
                    variant: f ? "primary" : "ghost",
                    size: "large",
                    fullWidth: !0,
                    onClick: () => c(d.url),
                    className: "h-auto justify-start gap-lg text-left !text-lg font-medium leading-normal",
                    style: {
                      height: "auto",
                      minHeight: "calc(var(--control-height-lg) + var(--spacing-sm))",
                      padding: "var(--spacing-sm) var(--spacing-md)"
                    },
                    role: "menuitem",
                    tabIndex: n ? 0 : -1,
                    children: [
                      /* @__PURE__ */ t("span", { className: "flex h-lg w-lg shrink-0 items-center justify-center", children: /* @__PURE__ */ t(m, { className: "h-lg w-lg" }) }),
                      /* @__PURE__ */ a("span", { className: "min-w-0 flex-1 leading-normal", children: [
                        /* @__PURE__ */ t("span", { className: "block truncate !text-lg font-medium", children: u(d) }),
                        /* @__PURE__ */ t(
                          "span",
                          {
                            className: "block truncate !text-xs font-light text-text-tertiary",
                            children: d.url.replace("http://", "")
                          }
                        )
                      ] }),
                      f && /* @__PURE__ */ t("span", { className: "shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium", children: p("appSwitcher.current") })
                    ]
                  },
                  d.id
                );
              }) })
            ]
          }
        ) })
      }
    )
  ] });
}
function Ct({
  apps: e,
  currentAppId: r,
  currentLocale: n,
  rightSlot: o,
  profileHref: i,
  onLocaleChange: p
}) {
  const { isCollapsed: s, setIsCollapsed: g } = Me(), [u, c] = S(!1), d = F(null), m = Q(), f = e.find((y) => y.id === "setting"), v = i ?? (f ? `${f.url}/profile` : "/profile"), l = f ? `${f.url}/login` : "/login";
  return z(() => {
    const y = (h) => {
      d.current && !d.current.contains(h.target) && c(!1);
    };
    return u && document.addEventListener("mousedown", y), () => {
      document.removeEventListener("mousedown", y);
    };
  }, [u]), /* @__PURE__ */ a("header", { className: "fixed left-0 right-0 top-0 z-40 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-primary", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex h-full shrink-0 items-center gap-sm px-md",
        style: { minWidth: "var(--sidebar-width)" },
        children: [
          /* @__PURE__ */ t(kt, { apps: e, currentAppId: r }),
          /* @__PURE__ */ t(
            D,
            {
              type: "button",
              variant: "tertiary",
              size: "normal",
              iconOnly: !0,
              onClick: () => g(!s),
              "aria-label": m(s ? "sidebar.expand" : "sidebar.collapse"),
              title: m(s ? "sidebar.expand" : "sidebar.collapse"),
              children: s ? /* @__PURE__ */ t(Ve, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Xe, { className: "h-lg w-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "flex h-full flex-1 items-center justify-end gap-sm px-md", children: [
      /* @__PURE__ */ t(dt, { currentLocale: n, onLocaleChange: p }),
      /* @__PURE__ */ t(mt, {}),
      o ?? /* @__PURE__ */ a("div", { ref: d, className: "relative", children: [
        /* @__PURE__ */ t(
          D,
          {
            type: "button",
            variant: "tertiary",
            size: "normal",
            iconOnly: !0,
            onClick: () => c((y) => !y),
            "aria-label": m("common.profile"),
            "aria-expanded": u,
            "aria-haspopup": "menu",
            title: m("common.profile"),
            children: /* @__PURE__ */ t(oe, { className: "h-lg w-lg" })
          }
        ),
        u && /* @__PURE__ */ a(
          "div",
          {
            className: "absolute right-0 top-full z-50 mt-sm w-[160px] overflow-hidden rounded border border-border bg-bg-primary p-sm shadow-md",
            role: "menu",
            children: [
              /* @__PURE__ */ a(
                "a",
                {
                  href: v,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => c(!1),
                  children: [
                    /* @__PURE__ */ t(oe, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    m("common.profile")
                  ]
                }
              ),
              /* @__PURE__ */ a(
                "a",
                {
                  href: l,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => c(!1),
                  children: [
                    /* @__PURE__ */ t(Ke, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    m("common.logout")
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
function $t({
  children: e,
  sidebar: r,
  apps: n,
  currentAppId: o,
  currentLocale: i,
  rightSlot: p,
  profileHref: s,
  onLocaleChange: g
}) {
  const { isCollapsed: u } = Me();
  return /* @__PURE__ */ a("div", { className: "min-h-screen bg-bg-secondary", children: [
    /* @__PURE__ */ t(
      Ct,
      {
        apps: n,
        currentAppId: o,
        currentLocale: i,
        rightSlot: p,
        profileHref: s,
        onLocaleChange: g
      }
    ),
    r,
    /* @__PURE__ */ t(
      "main",
      {
        className: "mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] transition-[margin-left] duration-300 ease-in-out",
        style: {
          marginLeft: u ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
          padding: "var(--content-padding)"
        },
        children: e
      }
    )
  ] });
}
function Jt(e) {
  return /* @__PURE__ */ t(Nt, { children: /* @__PURE__ */ t($t, { ...e }) });
}
export {
  Ue as Alert,
  kt as AppSwitcher,
  D as Button,
  Ht as Card,
  Rt as CreamiThemeProvider,
  se as DatePicker,
  Ct as Header,
  Je as Input,
  dt as LanguageSelector,
  Jt as MainLayout,
  mt as NotificationButton,
  Ft as NotificationProvider,
  Ot as SearchableSelect,
  zt as Select,
  Gt as Sidebar,
  Qt as SidebarMenu,
  Ut as SidebarMenuItem,
  Nt as SidebarProvider,
  Wt as Switch,
  Yt as Table,
  Vt as TableBody,
  Kt as TableCell,
  qt as TableHead,
  _t as TableHeader,
  Xt as TableRow,
  At as ThemeToggle,
  me as TimePicker,
  It as TimeRangePicker,
  Lt as ViewToggle,
  Pt as WeekdayRateBulkModal,
  Bt as notification,
  jt as useNotification,
  Me as useSidebar,
  Ce as writeThemeCookie
};
