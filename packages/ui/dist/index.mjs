import { jsx as t, jsxs as a, Fragment as P } from "react/jsx-runtime";
import { XCircle as ge, AlertTriangle as fe, CheckCircle2 as be, Info as xe, Search as De, ChevronDown as ye, List as Oe, LayoutGrid as Le, Calendar as ve, X as re, ChevronLeft as we, ChevronRight as Ne, Clock as Ie, Save as We, Sun as Re, Moon as Ae, Languages as Fe, Bell as je, Settings as Be, ReceiptText as He, Tag as Pe, BarChart3 as Ye, LayoutDashboard as ee, Home as _e, PanelLeftOpen as Ve, PanelLeftClose as Xe, User as oe, LogOut as Ke } from "lucide-react";
import { useState as S, useRef as j, useMemo as _, useEffect as D, useLayoutEffect as ae, useTransition as qe, createContext as ke, useCallback as K, useContext as Ce } from "react";
import { createPortal as $e } from "react-dom";
import { useTranslations as Q } from "next-intl";
function E({
  variant: e = "primary",
  size: r = "medium",
  iconOnly: n = !1,
  fullWidth: o = !1,
  className: s = "",
  children: h,
  disabled: l,
  ...b
}) {
  const u = r === "lg" ? "large" : r === "normal" || r === "md" ? "medium" : r === "sm" ? "small" : r, d = "inline-flex shrink-0 items-center justify-center gap-sm rounded transition-colors box-border m-none border-none text-base leading-none font-medium", i = {
    large: n ? "h-control-lg w-control-lg p-none" : "h-control-lg px-control-px-lg py-none",
    medium: n ? "h-control-md w-control-md p-none" : "h-control-md px-control-px-md py-none",
    small: n ? "h-control-sm w-control-sm p-none" : "h-control-sm px-control-px-sm py-none",
    mini: n ? "h-control-mini w-control-mini p-none" : "h-control-mini px-control-px-mini py-none"
  }, m = {
    primary: l ? "cursor-not-allowed bg-primary text-white opacity-50" : "cursor-pointer bg-primary text-white hover:opacity-90",
    secondary: l ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
    tertiary: l ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-tertiary text-text-primary hover:bg-bg-secondary",
    ghost: l ? "cursor-not-allowed bg-transparent text-text-tertiary" : "cursor-pointer bg-transparent text-text-primary hover:bg-bg-tertiary"
  }[e], f = o ? "w-full" : "";
  return /* @__PURE__ */ t(
    "button",
    {
      className: `${d} ${i[u]} ${m} ${f} ${s}`,
      disabled: l,
      ...b,
      children: h
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
  const s = Ge[e];
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
          s,
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
  const h = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[e]} rounded border border-border bg-bg-primary text-text-primary box-border font-medium`;
  return r ? /* @__PURE__ */ a("div", { className: "relative w-full", children: [
    /* @__PURE__ */ t(
      "input",
      {
        className: `${h} pr-control-search ${n}`,
        ...o
      }
    ),
    /* @__PURE__ */ t(De, { className: "absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" })
  ] }) : /* @__PURE__ */ t(
    "input",
    {
      className: `${h} ${n}`,
      ...o
    }
  );
}
function Dt({
  size: e = "medium",
  className: r = "",
  children: n,
  ...o
}) {
  const h = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[e]} rounded border border-border bg-bg-secondary text-text-primary box-border font-medium`;
  return /* @__PURE__ */ t(
    "select",
    {
      className: `${h} ${r}`,
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
  searchPlaceholder: s = "검색어를 입력하세요",
  emptyText: h = "검색 결과가 없습니다",
  disabled: l = !1,
  className: b = ""
}) {
  const [u, d] = S(!1), [i, m] = S(""), f = j(null), g = r.find((p) => p.value === e), c = _(() => {
    const p = i.trim().toLowerCase();
    return p ? r.filter((N) => `${N.label} ${N.description ?? ""} ${N.searchText ?? ""}`.toLowerCase().includes(p)) : r;
  }, [r, i]);
  D(() => {
    const p = (N) => {
      var k;
      (k = f.current) != null && k.contains(N.target) || d(!1);
    };
    return document.addEventListener("pointerdown", p), () => document.removeEventListener("pointerdown", p);
  }, []);
  const v = (p) => {
    n(p), m(""), d(!1);
  };
  return /* @__PURE__ */ a("div", { ref: f, className: `relative w-full ${b}`, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        disabled: l,
        onClick: () => {
          l || d((p) => !p);
        },
        className: "flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium",
        children: [
          /* @__PURE__ */ t("span", { className: g ? "text-text-primary" : "text-text-tertiary", children: (g == null ? void 0 : g.label) ?? o }),
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
              value: i,
              onChange: (p) => m(p.target.value),
              placeholder: s,
              showSearchIcon: !0,
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ t("div", { className: "overflow-y-auto", style: { maxHeight: "14rem" }, children: c.length > 0 ? c.map((p) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: () => v(p.value),
              className: "flex w-full flex-col gap-xs rounded px-sm py-sm text-left transition-colors hover:bg-bg-secondary",
              style: {
                backgroundColor: p.value === e ? "var(--primary-bg)" : void 0
              },
              children: [
                /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: p.label }),
                p.description && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: p.description })
              ]
            },
            p.value
          )) : /* @__PURE__ */ t("div", { className: "rounded py-sm text-center text-base font-light text-text-tertiary", children: h }) })
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
            children: /* @__PURE__ */ t(Oe, { className: "w-md h-md" })
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${e === "grid" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ t(Le, { className: "w-md h-md" })
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
  align: s = "left",
  size: h = "medium",
  clearable: l = !1
}) {
  const [b, u] = S(!1), [d, i] = S(/* @__PURE__ */ new Date()), [m, f] = S("date"), [g, c] = S(() => {
    const y = (/* @__PURE__ */ new Date()).getFullYear();
    return y - y % 12;
  }), v = j(null), p = e ? new Date(e) : null;
  D(() => {
    if (b) {
      const y = p ?? /* @__PURE__ */ new Date();
      i(y), f("date"), c(y.getFullYear() - y.getFullYear() % 12);
    }
  }, [b]), D(() => {
    const y = (C) => {
      v.current && !v.current.contains(C.target) && u(!1);
    };
    return b && document.addEventListener("mousedown", y), () => {
      document.removeEventListener("mousedown", y);
    };
  }, [b]);
  const N = (y) => y.toISOString().split("T")[0], k = (y) => new Date(y).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }), R = (y) => {
    const C = new Date(d.getFullYear(), d.getMonth(), y);
    r(N(C)), u(!1);
  }, W = () => {
    const y = /* @__PURE__ */ new Date();
    i(y), r(N(y)), u(!1);
  }, L = (y) => {
    i(new Date(d.getFullYear(), y, 1)), f("date");
  }, w = (y) => {
    i(new Date(y, d.getMonth(), 1)), f("month");
  }, z = new Date(
    d.getFullYear(),
    d.getMonth() + 1,
    0
  ).getDate(), O = new Date(
    d.getFullYear(),
    d.getMonth(),
    1
  ).getDay(), B = /* @__PURE__ */ new Date();
  B.setHours(0, 0, 0, 0);
  const V = p == null ? void 0 : p.getFullYear(), U = p == null ? void 0 : p.getMonth();
  return /* @__PURE__ */ a("div", { ref: v, className: "relative", children: [
    n && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: n }),
    /* @__PURE__ */ a("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => u((y) => !y),
          className: `flex w-full items-center justify-between rounded border border-border bg-bg-secondary text-base font-medium leading-none text-text-primary ${{
            large: "h-control-lg px-control-px-lg",
            medium: "h-control-md px-control-px-md",
            small: "h-control-sm px-control-px-sm",
            mini: "h-control-mini px-control-px-mini"
          }[h]} ${l && e ? "pr-control-search" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: e ? "text-text-primary" : "text-text-tertiary", children: e ? k(e) : o }),
            /* @__PURE__ */ t(ve, { className: "h-md w-md text-text-tertiary" })
          ]
        }
      ),
      l && e && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "날짜 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: (y) => {
            y.stopPropagation(), r(""), u(!1);
          },
          children: /* @__PURE__ */ t(re, { className: "h-md w-md" })
        }
      )
    ] }),
    b && /* @__PURE__ */ a("div", { className: `absolute z-50 mt-sm w-datepicker overflow-hidden rounded border border-border bg-bg-primary shadow-md ${s === "right" ? "right-none" : "left-none"}`, children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between border-b border-border p-md", children: [
        /* @__PURE__ */ t(
          E,
          {
            type: "button",
            onClick: () => {
              if (m === "year") {
                c(g - 12);
                return;
              }
              if (m === "month") {
                i(new Date(d.getFullYear() - 1, d.getMonth(), 1));
                return;
              }
              i(new Date(d.getFullYear(), d.getMonth() - 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "이전",
            children: /* @__PURE__ */ t(we, { className: "h-md w-md" })
          }
        ),
        m === "date" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => f("month"),
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              d.getFullYear(),
              "년 ",
              d.getMonth() + 1,
              "월"
            ]
          }
        ),
        m === "month" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => {
              c(d.getFullYear() - d.getFullYear() % 12), f("year");
            },
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              d.getFullYear(),
              "년"
            ]
          }
        ),
        m === "year" && /* @__PURE__ */ a("div", { className: "flex h-control-md items-center text-lg font-bold text-text-primary", children: [
          g,
          "년 - ",
          g + 11,
          "년"
        ] }),
        /* @__PURE__ */ t(
          E,
          {
            type: "button",
            onClick: () => {
              if (m === "year") {
                c(g + 12);
                return;
              }
              if (m === "month") {
                i(new Date(d.getFullYear() + 1, d.getMonth(), 1));
                return;
              }
              i(new Date(d.getFullYear(), d.getMonth() + 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "다음",
            children: /* @__PURE__ */ t(Ne, { className: "h-md w-md" })
          }
        )
      ] }),
      m === "date" && /* @__PURE__ */ a(P, { children: [
        /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-xs p-md pb-sm", children: ["일", "월", "화", "수", "목", "금", "토"].map((y, C) => /* @__PURE__ */ t(
          "div",
          {
            className: `p-sm text-center text-base font-bold ${C === 0 ? "text-error" : C === 6 ? "text-primary" : "text-text-secondary"}`,
            children: y
          },
          y
        )) }),
        /* @__PURE__ */ a("div", { className: "grid grid-cols-7 gap-xs p-md pt-0", children: [
          Array.from({ length: O }).map((y, C) => /* @__PURE__ */ t("div", { className: "h-control-md" }, `empty-${C}`)),
          Array.from({ length: z }).map((y, C) => {
            const x = C + 1, $ = new Date(d.getFullYear(), d.getMonth(), x);
            $.setHours(0, 0, 0, 0);
            const T = p && $.getTime() === p.getTime(), M = $.getTime() === B.getTime();
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => R(x),
                className: `h-control-md rounded text-center text-base font-medium transition-colors ${T ? "bg-primary text-white" : M ? "bg-bg-tertiary text-text-primary" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
                children: x
              },
              x
            );
          })
        ] })
      ] }),
      m === "month" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((y, C) => {
        const x = V === d.getFullYear() && U === C;
        return /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => L(C),
            className: `h-control-lg rounded text-base font-medium transition-colors ${x ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: [
              C + 1,
              "월"
            ]
          },
          C
        );
      }) }),
      m === "year" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((y, C) => {
        const x = g + C;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => w(x),
            className: `h-control-lg rounded text-base font-medium transition-colors ${V === x ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: x
          },
          x
        );
      }) }),
      /* @__PURE__ */ t("div", { className: "flex justify-end border-t border-border p-md", children: m === "date" ? /* @__PURE__ */ t(E, { type: "button", onClick: W, children: "오늘" }) : /* @__PURE__ */ t(E, { type: "button", variant: "secondary", onClick: () => f("date"), children: "달력으로 돌아가기" }) })
    ] })
  ] });
}
const G = (e) => String(e).padStart(2, "0"), le = (e) => !e || e < 1 ? 1 : Math.min(e, 60), ce = (e, r) => {
  const [n = "00", o = "00", s = "00"] = e.split(":"), h = Number(n), l = Number(o), b = Number(s);
  return {
    hour: Number.isInteger(h) ? Math.min(Math.max(h, 0), 23) : 0,
    minute: Number.isInteger(l) ? Math.min(Math.max(l, 0), 59) : 0,
    second: r && Number.isInteger(b) ? Math.min(Math.max(b, 0), 59) : 0
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
  const n = getComputedStyle(document.documentElement), o = n.getPropertyValue(e).trim(), s = Number.parseFloat(o);
  return !Number.isFinite(s) || s <= 0 ? r : o.endsWith("rem") ? s * Number.parseFloat(n.fontSize) : s;
};
function me({
  value: e,
  onChange: r,
  label: n,
  placeholder: o = "시간 선택",
  align: s = "left",
  size: h = "medium",
  disabled: l = !1,
  clearable: b = !1,
  includeSeconds: u = !0,
  minuteStep: d = 1,
  secondStep: i = 1
}) {
  const [m, f] = S(!1), [g, c] = S(() => ce(e, u)), [v, p] = S(e), [N, k] = S({ top: 0, left: 0 }), R = j(null), W = j(null), L = le(d), w = le(i), z = _(
    () => Z(59, L),
    [L]
  ), O = _(
    () => Z(59, w),
    [w]
  );
  ae(() => {
    m && c(ce(e, u));
  }, [u, m, e]), D(() => {
    m || p(e);
  }, [m, e]), D(() => {
    const x = ($) => {
      var X, Y;
      const T = $.target, M = (X = R.current) == null ? void 0 : X.contains(T), A = (Y = W.current) == null ? void 0 : Y.contains(T);
      !M && !A && f(!1);
    };
    return m && document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [m]), D(() => {
    if (!m)
      return;
    const x = () => {
      var Y;
      const $ = (Y = R.current) == null ? void 0 : Y.getBoundingClientRect();
      if (!$)
        return;
      const T = de("--timepicker-width", 288), M = de("--spacing-sm", 8), A = s === "right" ? $.right - T : $.left, X = window.innerWidth - T - M;
      k({
        top: $.bottom + M,
        left: Math.max(M, Math.min(A, X))
      });
    };
    return x(), window.addEventListener("resize", x), window.addEventListener("scroll", x, !0), () => {
      window.removeEventListener("resize", x), window.removeEventListener("scroll", x, !0);
    };
  }, [s, m]), ae(() => {
    if (!m)
      return;
    const x = window.requestAnimationFrame(() => {
      var $;
      ($ = W.current) == null || $.querySelectorAll('[data-time-selected="true"]').forEach((T) => {
        const M = T.closest('[data-time-options="true"]');
        M && (M.scrollTop = T.offsetTop - M.clientHeight / 2 + T.clientHeight / 2);
      });
    });
    return () => {
      window.cancelAnimationFrame(x);
    };
  }, [g.hour, g.minute, g.second, m]);
  const B = {
    large: "h-control-lg px-control-px-lg",
    medium: "h-control-md px-control-px-md",
    small: "h-control-sm px-control-px-sm",
    mini: "h-control-mini px-control-px-mini"
  }, V = (x, $) => {
    const T = {
      ...g,
      [x]: $
    };
    c(T);
    const M = J(T, u);
    p(M), r(M);
  }, U = () => {
    const x = /* @__PURE__ */ new Date(), $ = {
      hour: x.getHours(),
      minute: x.getMinutes(),
      second: u ? x.getSeconds() : 0
    };
    c($);
    const T = J($, u);
    p(T), r(T), f(!1);
  }, ne = () => {
    const x = J(g, u);
    p(x), r(x), f(!1);
  }, y = () => {
    p(""), r(""), f(!1);
  }, C = (x, $, T) => /* @__PURE__ */ a("div", { className: "min-w-0 flex-1", children: [
    /* @__PURE__ */ t("div", { className: "px-xs pb-xs text-center text-base font-bold text-text-tertiary", children: x }),
    /* @__PURE__ */ t(
      "div",
      {
        "data-time-options": "true",
        className: "overflow-y-auto",
        style: { maxHeight: "var(--timepicker-options-max-height, 12rem)" },
        children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-xs", children: T.map((M) => {
          const A = g[$] === M;
          return /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-time-selected": A ? "true" : void 0,
              "aria-current": A ? "time" : void 0,
              onClick: () => V($, M),
              className: `h-control-md rounded text-center text-base font-medium transition-colors ${A ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
              children: G(M)
            },
            M
          );
        }) })
      }
    )
  ] });
  return /* @__PURE__ */ a("div", { ref: R, children: [
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
                value: v || "",
                placeholder: o,
                className: `pointer-events-none w-full rounded border border-border bg-bg-secondary pl-control-search pr-control-px-md text-base font-medium leading-none text-text-primary placeholder:text-text-tertiary ${B[h]}`
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
          disabled: l,
          onClick: () => {
            l || f((x) => !x);
          },
          className: `absolute inset-0 rounded bg-transparent text-left ${l ? "cursor-not-allowed text-text-tertiary" : "cursor-pointer"}`,
          "aria-expanded": m,
          "aria-haspopup": "dialog",
          "aria-label": v || o,
          children: /* @__PURE__ */ t("span", { className: "sr-only", children: v || o })
        }
      ),
      b && e && !l && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "시간 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: y,
          children: /* @__PURE__ */ t(re, { className: "h-md w-md" })
        }
      ),
      m && $e(
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
            onMouseDown: (x) => x.stopPropagation(),
            children: [
              /* @__PURE__ */ a("div", { className: "flex gap-sm p-sm", children: [
                C("시", "hour", Z(23, 1)),
                C("분", "minute", z),
                u && C("초", "second", O)
              ] }),
              /* @__PURE__ */ a("div", { className: "flex justify-end gap-sm border-t border-border p-sm", children: [
                b && /* @__PURE__ */ t(E, { type: "button", variant: "secondary", size: "small", onClick: y, children: "초기화" }),
                /* @__PURE__ */ t(E, { type: "button", variant: "secondary", size: "small", onClick: U, children: "현재" }),
                /* @__PURE__ */ t(E, { type: "button", size: "small", onClick: ne, children: "확인" })
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
  label: s,
  startPlaceholder: h = "시작 시간",
  endPlaceholder: l = "종료 시간",
  separator: b = "To",
  align: u = "left",
  size: d = "medium",
  disabled: i = !1,
  clearable: m = !1,
  includeSeconds: f = !0,
  minuteStep: g = 1,
  secondStep: c = 1
}) {
  return /* @__PURE__ */ a("div", { children: [
    s && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: s }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-md", children: [
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        me,
        {
          value: e,
          onChange: n,
          placeholder: h,
          align: u,
          size: d,
          disabled: i,
          clearable: m,
          includeSeconds: f,
          minuteStep: g,
          secondStep: c
        }
      ) }),
      /* @__PURE__ */ t("span", { className: "shrink-0 text-base font-medium text-text-secondary", children: b }),
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        me,
        {
          value: r,
          onChange: o,
          placeholder: l,
          align: "right",
          size: d,
          disabled: i,
          clearable: m,
          includeSeconds: f,
          minuteStep: g,
          secondStep: c
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
  disabled: s = !1,
  variant: h = "primary",
  size: l = "medium",
  labelPosition: b = "right",
  className: u = "",
  id: d,
  name: i,
  ariaLabel: m
}) {
  const f = Ze[l], c = /* @__PURE__ */ t(
    "button",
    {
      id: d,
      name: i,
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": m,
      disabled: s,
      onClick: () => {
        s || r(!e);
      },
      className: `inline-flex shrink-0 items-center border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${e ? et[h] : "bg-bg-tertiary"} ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
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
  return !n && !o ? /* @__PURE__ */ t("span", { className: `inline-flex items-center ${u}`, children: c }) : /* @__PURE__ */ a(
    "label",
    {
      className: `inline-flex items-center gap-sm text-base font-medium text-text-primary ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${u}`,
      children: [
        b === "left" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
          n && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: n }),
          o && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: o })
        ] }),
        c,
        b === "right" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
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
function Rt({
  isOpen: e,
  title: r = "요일별 요금 일괄 수정",
  startDate: n,
  endDate: o,
  values: s,
  targetLabel: h,
  rateTypeLabel: l,
  commissionLabel: b,
  previewRows: u = [],
  targetOptions: d = [],
  selectedTargetIds: i = [],
  activeWeekdays: m = [0, 1, 2, 3, 4, 5, 6],
  warningMessage: f,
  disabled: g = !1,
  onTargetToggle: c,
  onWeekdayToggle: v,
  onStartDateChange: p,
  onEndDateChange: N,
  onValueChange: k,
  onSubmit: R,
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
                  E,
                  {
                    type: "button",
                    disabled: g,
                    onClick: R,
                    className: "w-modal-action",
                    children: [
                      /* @__PURE__ */ t(We, { className: "h-icon-md w-icon-md" }),
                      "적용"
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  E,
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
            d.length > 0 && /* @__PURE__ */ a("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "일괄 수정 대상"
                }
              ),
              /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-sm", children: d.map((w) => {
                const z = i.includes(w.id);
                return /* @__PURE__ */ a(
                  "button",
                  {
                    type: "button",
                    onClick: () => c == null ? void 0 : c(w.id),
                    className: "flex h-control-md items-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors",
                    style: {
                      backgroundColor: z ? "var(--primary)" : "var(--bg-secondary)",
                      borderRadius: "var(--radius)",
                      color: z ? "#ffffff" : "var(--text-primary)",
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
                    onChange: p,
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
              /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-sm", children: tt.map(({ day: w, label: z }) => {
                const O = m.includes(w);
                return /* @__PURE__ */ a("label", { className: "block", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => v == null ? void 0 : v(w),
                      className: "mb-xs flex h-control-md w-full items-center justify-center rounded border-none text-base leading-none transition-colors",
                      style: {
                        backgroundColor: O ? "var(--primary)" : "var(--bg-secondary)",
                        borderRadius: "var(--radius)",
                        color: O ? "#ffffff" : "var(--text-tertiary)",
                        fontWeight: "var(--font-bold)"
                      },
                      children: z
                    }
                  ),
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "number",
                      disabled: !O,
                      value: s[w] ?? "",
                      onChange: (B) => k(w, B.target.value),
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
                (l || b) && /* @__PURE__ */ a(
                  "div",
                  {
                    className: "text-base",
                    style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                    children: [
                      l,
                      l && b ? " · " : "",
                      b
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
                          children: h
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
                      (w) => w.cells.map((z, O) => /* @__PURE__ */ a("tr", { children: [
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
                              color: z.day === 0 ? "var(--error)" : z.day === 6 ? "var(--primary)" : "var(--text-secondary)",
                              fontWeight: "var(--font-bold)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: z.label
                          }
                        ),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: L(z.inputAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: L(z.sellRate) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: L(z.commissionAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: L(z.netRate) })
                      ] }, `${w.id}-${z.day}`))
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
const H = "CREAMI_THEME", rt = 3600 * 24 * 365, te = `path=/; max-age=${rt}; SameSite=Lax`;
function ue(e) {
  return e === "dark" || e === "light";
}
function nt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${H}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function ot() {
  const e = window.location.hostname;
  if (e === "localhost" || e.endsWith(".localhost") || /^\d{1,3}(\.\d{1,3}){3}$/.test(e))
    return;
  const r = e.split(".");
  return r.length > 2 ? `.${r.slice(-2).join(".")}` : void 0;
}
function Se(e) {
  document.cookie = `${H}=${e}; ${te}`;
  const r = ot();
  r && (document.cookie = `${H}=${e}; ${te}; domain=${r}`), document.documentElement.setAttribute("data-theme", e), window.dispatchEvent(new CustomEvent("creami-theme-change", { detail: e }));
}
function at() {
  return D(() => {
    const e = nt(), r = ue(e) ? e : "dark";
    ue(e) ? document.documentElement.setAttribute("data-theme", r) : Se(r);
  }, []), null;
}
function At({ children: e }) {
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
          .find(function (cookie) { return cookie.indexOf('${H}=') === 0; });
        var theme = themeCookie ? themeCookie.split('=')[1] : null;
        if (theme !== 'dark' && theme !== 'light') {
          theme = 'dark';
        }
        document.cookie = '${H}=' + theme + '; ' + cookieOptions;
        var sharedDomain = getSharedCookieDomain();
        if (sharedDomain) {
          document.cookie = '${H}=' + theme + '; ' + cookieOptions + '; domain=' + sharedDomain;
        }
        document.documentElement.setAttribute('data-theme', theme);
      } catch (error) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;
  return /* @__PURE__ */ a(P, { children: [
    /* @__PURE__ */ t("script", { dangerouslySetInnerHTML: { __html: r } }),
    /* @__PURE__ */ t(at, {}),
    e
  ] });
}
function it() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function Ft() {
  const [e, r] = S("dark"), [n, o] = S(!1);
  if (D(() => {
    r(it()), o(!0);
    const l = (b) => {
      const u = b.detail;
      r(u === "light" ? "light" : "dark");
    };
    return window.addEventListener("creami-theme-change", l), () => {
      window.removeEventListener("creami-theme-change", l);
    };
  }, []), !n)
    return /* @__PURE__ */ t("div", { className: "h-control-md w-control-md" });
  const s = e === "dark", h = s ? "light" : "dark";
  return /* @__PURE__ */ t(
    E,
    {
      type: "button",
      variant: "tertiary",
      size: "normal",
      iconOnly: !0,
      onClick: () => {
        Se(h);
      },
      "aria-label": s ? "라이트 모드로 전환" : "다크 모드로 전환",
      title: s ? "라이트 모드로 전환" : "다크 모드로 전환",
      children: s ? /* @__PURE__ */ t(Re, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Ae, { className: "h-lg w-lg" })
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
  const [n, o] = S(!1), [s, h] = qe(), l = Q(), b = (u) => {
    o(!1), h(() => {
      document.cookie = `NEXT_LOCALE=${u}; path=/; max-age=31536000; SameSite=Lax`, r == null || r(u);
    });
  };
  return /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ t(
      E,
      {
        type: "button",
        variant: "tertiary",
        size: "normal",
        iconOnly: !0,
        onClick: () => o(!n),
        "aria-label": l("language.select"),
        title: l("language.select"),
        disabled: s,
        children: /* @__PURE__ */ t(Fe, { className: "h-lg w-lg" })
      }
    ),
    n && /* @__PURE__ */ a(P, { children: [
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
          onClick: () => b(u),
          disabled: s,
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
      E,
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
          /* @__PURE__ */ t(je, { className: "h-lg w-lg" }),
          n && /* @__PURE__ */ t("span", { className: "absolute right-[6px] top-[6px] h-[8px] w-[8px] rounded-full bg-primary" })
        ]
      }
    ),
    e && /* @__PURE__ */ a(P, { children: [
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
const Te = ke(null);
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
  const [n, o] = S(!1), s = ut[e.type], h = e.direction ?? gt(e.placement);
  return D(() => {
    const l = window.setTimeout(() => o(!0), 0);
    return () => window.clearTimeout(l);
  }, []), D(() => {
    if (e.duration <= 0)
      return;
    const l = window.setTimeout(() => r(e.id), e.duration);
    return () => window.clearTimeout(l);
  }, [e.duration, e.id, r]), /* @__PURE__ */ a(
    "div",
    {
      className: `pointer-events-auto flex w-app-switcher items-start gap-md rounded border border-border bg-bg-primary p-md shadow-lg transition-all ${n && !e.isClosing ? "translate-x-0 translate-y-0 opacity-100" : `${bt(h)} opacity-0`}`,
      role: "alert",
      style: {
        borderRadius: "var(--radius)",
        maxWidth: "calc(100vw - var(--spacing-xl))"
      },
      children: [
        /* @__PURE__ */ t(
          s,
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
  const s = e.startsWith("bottom") ? [...r].reverse() : r;
  return /* @__PURE__ */ t(
    "div",
    {
      className: `pointer-events-none fixed z-[var(--layer-popover)] flex flex-col gap-md ${ft(e)}`,
      children: s.map((h) => /* @__PURE__ */ t(xt, { item: h, onClose: n }, h.id))
    }
  );
}
function F(e) {
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
function jt({
  children: e,
  defaultDuration: r = 4500,
  defaultPlacement: n = "top-right"
}) {
  const [o, s] = S([]), h = j(/* @__PURE__ */ new Map()), [l, b] = S(!1);
  D(() => {
    b(!0);
  }, []);
  const u = K((c) => {
    s((v) => {
      var N;
      const p = v.find((k) => k.id === c);
      return p && ((N = p.onClose) == null || N.call(p)), v.filter((k) => k.id !== c);
    });
  }, []), d = K((c) => {
    const v = h.current.get(c);
    v && window.clearTimeout(v), s((N) => N.map((k) => k.id === c ? { ...k, isClosing: !0 } : k));
    const p = window.setTimeout(() => {
      u(c), h.current.delete(c);
    }, 200);
    h.current.set(c, p);
  }, [u]), i = K((c) => {
    const v = c.id ?? pt(), p = {
      id: v,
      type: c.type ?? "info",
      title: c.title,
      message: c.message,
      duration: c.duration ?? r,
      placement: c.placement ?? n,
      direction: c.direction,
      showClose: c.showClose ?? !0,
      onClose: c.onClose
    };
    return s((N) => N.some((k) => k.id === v) ? N.map((k) => k.id === v ? p : k) : [...N, p]), v;
  }, [r, n]), m = K(() => {
    s((c) => (c.forEach((v) => {
      var p;
      return (p = v.onClose) == null ? void 0 : p.call(v);
    }), []));
  }, []), f = _(() => ({
    open: i,
    success: (c) => i({ ...c, type: "success" }),
    warning: (c) => i({ ...c, type: "warning" }),
    info: (c) => i({ ...c, type: "info" }),
    error: (c) => i({ ...c, type: "error" }),
    close: d,
    closeAll: m
  }), [d, m, i]);
  D(() => (I = { open: i, close: d, closeAll: m }, () => {
    I = null, h.current.forEach((c) => window.clearTimeout(c)), h.current.clear();
  }), [d, m, i]);
  const g = _(() => ({
    "top-left": o.filter((c) => c.placement === "top-left"),
    "top-right": o.filter((c) => c.placement === "top-right"),
    "bottom-left": o.filter((c) => c.placement === "bottom-left"),
    "bottom-right": o.filter((c) => c.placement === "bottom-right")
  }), [o]);
  return /* @__PURE__ */ a(Te.Provider, { value: f, children: [
    e,
    l && $e(
      /* @__PURE__ */ a(P, { children: [
        /* @__PURE__ */ t(q, { placement: "top-left", items: g["top-left"], onClose: d }),
        /* @__PURE__ */ t(q, { placement: "top-right", items: g["top-right"], onClose: d }),
        /* @__PURE__ */ t(q, { placement: "bottom-left", items: g["bottom-left"], onClose: d }),
        /* @__PURE__ */ t(q, { placement: "bottom-right", items: g["bottom-right"], onClose: d })
      ] }),
      document.body
    )
  ] });
}
function Bt() {
  const e = Ce(Te);
  if (!e)
    throw new Error("useNotification must be used within NotificationProvider.");
  return e;
}
const Ht = {
  open: (e) => F(I).open(e),
  success: (e) => F(I).success(e),
  warning: (e) => F(I).warning(e),
  info: (e) => F(I).info(e),
  error: (e) => F(I).error(e),
  close: (e) => F(I).close(e),
  closeAll: () => F(I).closeAll()
};
function Pt({
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
  currentPage: e,
  totalPages: r,
  totalElements: n,
  pageSize: o,
  onPageChange: s,
  onPageSizeChange: h,
  pageSizeOptions: l = [10, 25, 50, 100]
}) {
  const b = n === 0 ? 0 : (e - 1) * o + 1, u = Math.min(e * o, n), d = () => {
    const i = [], f = Math.floor(3.5);
    if (r <= 7)
      for (let g = 1; g <= r; g++)
        i.push(g);
    else if (e <= f + 1) {
      for (let g = 1; g <= 5; g++)
        i.push(g);
      i.push("..."), i.push(r);
    } else if (e >= r - f) {
      i.push(1), i.push("...");
      for (let g = r - 4; g <= r; g++)
        i.push(g);
    } else {
      i.push(1), i.push("...");
      for (let g = e - 1; g <= e + 1; g++)
        i.push(g);
      i.push("..."), i.push(r);
    }
    return i;
  };
  return /* @__PURE__ */ a("div", { className: "flex items-center justify-between gap-spacing-md", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center gap-spacing-sm text-text-size-sm", children: [
      /* @__PURE__ */ a("span", { className: "text-var-text-secondary", children: [
        n.toLocaleString(),
        "개 중 ",
        b.toLocaleString(),
        "-",
        u.toLocaleString(),
        "번째 표시 중"
      ] }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-spacing-xs", children: [
        /* @__PURE__ */ t("label", { htmlFor: "page-size", className: "text-var-text-secondary", children: "페이지당:" }),
        /* @__PURE__ */ t(
          "select",
          {
            id: "page-size",
            value: o,
            onChange: (i) => h(Number(i.target.value)),
            className: "bg-var-background border border-var-border rounded-var-radius-md px-spacing-sm py-spacing-xs text-text-size-sm focus:outline-none focus:ring-2 focus:ring-var-primary",
            children: l.map((i) => /* @__PURE__ */ a("option", { value: i, children: [
              i,
              "개"
            ] }, i))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-spacing-xs", children: [
      /* @__PURE__ */ a(
        E,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(e - 1),
          disabled: e === 1,
          "aria-label": "이전 페이지",
          className: "px-spacing-xs",
          children: [
            /* @__PURE__ */ t(we, { className: "h-4 w-4" }),
            "이전"
          ]
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-spacing-xs", children: d().map((i, m) => {
        if (i === "...")
          return /* @__PURE__ */ t(
            "span",
            {
              className: "px-spacing-xs text-var-text-secondary",
              children: "..."
            },
            `ellipsis-${m}`
          );
        const f = i, g = f === e;
        return /* @__PURE__ */ t(
          E,
          {
            variant: g ? "primary" : "secondary",
            size: "sm",
            onClick: () => s(f),
            className: `min-w-[2.5rem] ${g ? "bg-var-primary text-white hover:bg-var-primary-hover" : ""}`,
            children: f
          },
          f
        );
      }) }),
      /* @__PURE__ */ a(
        E,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(e + 1),
          disabled: e === r,
          "aria-label": "다음 페이지",
          className: "px-spacing-xs",
          children: [
            "다음",
            /* @__PURE__ */ t(Ne, { className: "h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
}
function Qt({
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
function Ut({ children: e }) {
  return /* @__PURE__ */ t("nav", { className: "h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ t("ul", { className: "flex w-full flex-col gap-xs list-none m-0 p-0", children: e }) });
}
function Jt({
  icon: e,
  label: r,
  href: n,
  onClick: o,
  isActive: s = !1,
  isCollapsed: h = !1,
  depth: l = 0
}) {
  const b = (m) => {
    o && (m.preventDefault(), o());
  }, u = /* @__PURE__ */ a(P, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: `absolute left-0 top-0 h-full rounded transition-[width,background-color] duration-300 ${h ? "w-[calc(var(--sidebar-collapsed)-var(--spacing-lg))]" : "w-full"} ${s ? "bg-primary" : "bg-transparent group-hover:bg-bg-tertiary"}`
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: `absolute top-1/2 z-10 flex h-lg w-lg -translate-y-1/2 items-center justify-center ${l === 1 && !h ? "left-lg" : "left-md"}`,
        children: /* @__PURE__ */ t(e, { className: "w-lg h-lg shrink-0" })
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: `pointer-events-none absolute right-md top-1/2 z-10 min-w-0 -translate-y-1/2 truncate whitespace-nowrap ${l === 1 && !h ? "left-[calc(var(--sidebar-collapsed)+var(--spacing-sm))]" : "left-[calc(var(--sidebar-collapsed)-var(--spacing-md))]"}`,
        children: r
      }
    )
  ] }), d = "group w-full rounded", i = `relative flex min-h-2xl w-full items-center bg-transparent text-lg font-medium no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${s ? "text-white" : "text-text-secondary group-hover:text-text-primary"}`;
  return /* @__PURE__ */ t("li", { className: d, children: n ? /* @__PURE__ */ t(
    "a",
    {
      href: n,
      className: i,
      title: r,
      "aria-current": s ? "page" : void 0,
      onClick: b,
      children: u
    }
  ) : /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: `${i} border-0 text-left cursor-pointer w-full`,
      title: r,
      "aria-pressed": s,
      onClick: o,
      children: u
    }
  ) });
}
const Me = ke(void 0), Ee = "CREAMI_SIDEBAR_COLLAPSED", yt = 3600 * 24 * 365;
function vt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${Ee}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function wt(e) {
  document.cookie = `${Ee}=${String(e)}; path=/; max-age=${yt}; SameSite=Lax`;
}
function Nt({ children: e }) {
  const [r, n] = S(!1), [o, s] = S(!1);
  D(() => {
    const l = vt();
    l !== null && n(l === "true"), s(!0);
  }, []), D(() => {
    o && wt(r);
  }, [r, o]);
  const h = () => {
    n((l) => !l);
  };
  return /* @__PURE__ */ t(Me.Provider, { value: { isCollapsed: r, toggleSidebar: h, setIsCollapsed: n }, children: e });
}
function ze() {
  const e = Ce(Me);
  if (e === void 0)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return e;
}
const pe = {
  Home: _e,
  LayoutDashboard: ee,
  BarChart3: Ye,
  Tag: Pe,
  Calendar: ve,
  ReceiptText: He,
  Settings: Be
};
function kt({ apps: e, currentAppId: r }) {
  const [n, o] = S(!1), s = j(null), h = Q(), l = e.find((i) => i.id === r) ?? e[0], b = pe[l == null ? void 0 : l.icon] ?? ee, u = (i) => h(`apps.${i.id}`);
  D(() => {
    const i = (m) => {
      s.current && !s.current.contains(m.target) && o(!1);
    };
    return n && document.addEventListener("mousedown", i), () => {
      document.removeEventListener("mousedown", i);
    };
  }, [n]);
  const d = (i) => {
    window.location.href = i;
  };
  return /* @__PURE__ */ a("div", { className: "relative flex h-full shrink-0 items-center", ref: s, children: [
    /* @__PURE__ */ a(
      E,
      {
        type: "button",
        variant: n ? "tertiary" : "ghost",
        size: "normal",
        onClick: () => o((i) => !i),
        className: "justify-start !text-lg font-medium",
        "aria-expanded": n,
        "aria-haspopup": "menu",
        children: [
          /* @__PURE__ */ t(b, { className: "h-lg w-lg text-primary" }),
          /* @__PURE__ */ t("span", { className: "whitespace-nowrap !text-lg font-medium", children: l ? u(l) : "" }),
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
              /* @__PURE__ */ t("div", { className: "px-md py-sm text-base font-bold uppercase text-text-tertiary", children: h("appSwitcher.title") }),
              /* @__PURE__ */ t("div", { className: "flex flex-col gap-sm", children: e.map((i) => {
                const m = pe[i.icon] ?? ee, f = i.id === (l == null ? void 0 : l.id);
                return /* @__PURE__ */ a(
                  E,
                  {
                    type: "button",
                    variant: f ? "primary" : "ghost",
                    size: "large",
                    fullWidth: !0,
                    onClick: () => d(i.url),
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
                        /* @__PURE__ */ t("span", { className: "block truncate !text-lg font-medium", children: u(i) }),
                        /* @__PURE__ */ t(
                          "span",
                          {
                            className: "block truncate !text-xs font-light text-text-tertiary",
                            children: i.url.replace("http://", "")
                          }
                        )
                      ] }),
                      f && /* @__PURE__ */ t("span", { className: "shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium", children: h("appSwitcher.current") })
                    ]
                  },
                  i.id
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
  profileHref: s,
  onLocaleChange: h
}) {
  const { isCollapsed: l, setIsCollapsed: b } = ze(), [u, d] = S(!1), i = j(null), m = Q(), f = e.find((v) => v.id === "setting"), g = s ?? (f ? `${f.url}/profile` : "/profile"), c = f ? `${f.url}/login` : "/login";
  return D(() => {
    const v = (p) => {
      i.current && !i.current.contains(p.target) && d(!1);
    };
    return u && document.addEventListener("mousedown", v), () => {
      document.removeEventListener("mousedown", v);
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
            E,
            {
              type: "button",
              variant: "tertiary",
              size: "normal",
              iconOnly: !0,
              onClick: () => b(!l),
              "aria-label": m(l ? "sidebar.expand" : "sidebar.collapse"),
              title: m(l ? "sidebar.expand" : "sidebar.collapse"),
              children: l ? /* @__PURE__ */ t(Ve, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Xe, { className: "h-lg w-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "flex h-full flex-1 items-center justify-end gap-sm px-md", children: [
      /* @__PURE__ */ t(dt, { currentLocale: n, onLocaleChange: h }),
      /* @__PURE__ */ t(mt, {}),
      o ?? /* @__PURE__ */ a("div", { ref: i, className: "relative", children: [
        /* @__PURE__ */ t(
          E,
          {
            type: "button",
            variant: "tertiary",
            size: "normal",
            iconOnly: !0,
            onClick: () => d((v) => !v),
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
                  href: g,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => d(!1),
                  children: [
                    /* @__PURE__ */ t(oe, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    m("common.profile")
                  ]
                }
              ),
              /* @__PURE__ */ a(
                "a",
                {
                  href: c,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => d(!1),
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
  currentLocale: s,
  rightSlot: h,
  profileHref: l,
  onLocaleChange: b
}) {
  const { isCollapsed: u } = ze();
  return /* @__PURE__ */ a("div", { className: "min-h-screen bg-bg-secondary", children: [
    /* @__PURE__ */ t(
      Ct,
      {
        apps: n,
        currentAppId: o,
        currentLocale: s,
        rightSlot: h,
        profileHref: l,
        onLocaleChange: b
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
function Zt(e) {
  return /* @__PURE__ */ t(Nt, { children: /* @__PURE__ */ t($t, { ...e }) });
}
export {
  Ue as Alert,
  kt as AppSwitcher,
  E as Button,
  Pt as Card,
  At as CreamiThemeProvider,
  se as DatePicker,
  Ct as Header,
  Je as Input,
  dt as LanguageSelector,
  Zt as MainLayout,
  mt as NotificationButton,
  jt as NotificationProvider,
  Gt as Pagination,
  Ot as SearchableSelect,
  Dt as Select,
  Qt as Sidebar,
  Ut as SidebarMenu,
  Jt as SidebarMenuItem,
  Nt as SidebarProvider,
  Wt as Switch,
  Yt as Table,
  Vt as TableBody,
  Kt as TableCell,
  qt as TableHead,
  _t as TableHeader,
  Xt as TableRow,
  Ft as ThemeToggle,
  me as TimePicker,
  It as TimeRangePicker,
  Lt as ViewToggle,
  Rt as WeekdayRateBulkModal,
  Ht as notification,
  Bt as useNotification,
  ze as useSidebar,
  Se as writeThemeCookie
};
