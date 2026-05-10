import { jsx as t, jsxs as a, Fragment as Y } from "react/jsx-runtime";
import { XCircle as be, AlertTriangle as fe, CheckCircle2 as ge, Info as xe, Search as ze, ChevronDown as ye, List as Ee, LayoutGrid as De, Calendar as ve, X as te, ChevronLeft as Le, ChevronRight as Oe, Clock as Ie, Save as Pe, Sun as We, Moon as Re, Languages as Fe, Bell as Ae, Settings as je, ReceiptText as Be, Tag as He, BarChart3 as Ye, LayoutDashboard as Z, Home as _e, PanelLeftOpen as Ve, PanelLeftClose as Xe, User as ne, LogOut as Ke } from "lucide-react";
import { useState as S, useRef as A, useMemo as H, useEffect as E, useLayoutEffect as ae, useTransition as qe, createContext as we, useCallback as X, useContext as Ne } from "react";
import { createPortal as Ce } from "react-dom";
import { ThemeProvider as Ge, useTheme as ke } from "next-themes";
import { useTranslations as G } from "next-intl";
function D({
  variant: e = "primary",
  size: r = "medium",
  iconOnly: o = !1,
  fullWidth: n = !1,
  className: i = "",
  children: h,
  disabled: l,
  ...g
}) {
  const p = r === "lg" ? "large" : r === "normal" || r === "md" ? "medium" : r === "sm" ? "small" : r, c = "inline-flex shrink-0 items-center justify-center gap-sm rounded transition-colors box-border m-none border-none text-base leading-none font-medium", d = {
    large: o ? "h-control-lg w-control-lg p-none" : "h-control-lg px-control-px-lg py-none",
    medium: o ? "h-control-md w-control-md p-none" : "h-control-md px-control-px-md py-none",
    small: o ? "h-control-sm w-control-sm p-none" : "h-control-sm px-control-px-sm py-none",
    mini: o ? "h-control-mini w-control-mini p-none" : "h-control-mini px-control-px-mini py-none"
  }, m = {
    primary: l ? "cursor-not-allowed bg-primary text-white opacity-50" : "cursor-pointer bg-primary text-white hover:opacity-90",
    secondary: l ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
    tertiary: l ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-tertiary text-text-primary hover:bg-bg-secondary",
    ghost: l ? "cursor-not-allowed bg-transparent text-text-tertiary" : "cursor-pointer bg-transparent text-text-primary hover:bg-bg-tertiary"
  }[e], b = n ? "w-full" : "";
  return /* @__PURE__ */ t(
    "button",
    {
      className: `${c} ${d[p]} ${m} ${b} ${i}`,
      disabled: l,
      ...g,
      children: h
    }
  );
}
const Qe = {
  info: xe,
  success: ge,
  warning: fe,
  error: be
}, ie = {
  info: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)"
}, Ue = {
  info: "var(--primary-bg)",
  success: "var(--success-bg)",
  warning: "var(--warning-bg)",
  error: "var(--error-bg)"
};
function Je({
  variant: e = "info",
  title: r,
  children: o,
  className: n = ""
}) {
  const i = Qe[e];
  return /* @__PURE__ */ a(
    "div",
    {
      className: `flex items-start gap-sm rounded p-md text-base ${n}`,
      style: {
        backgroundColor: Ue[e],
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
          /* @__PURE__ */ t("div", { style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" }, children: o })
        ] })
      ]
    }
  );
}
function Ze({
  size: e = "medium",
  showSearchIcon: r = !1,
  className: o = "",
  ...n
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
        className: `${h} pr-control-search ${o}`,
        ...n
      }
    ),
    /* @__PURE__ */ t(ze, { className: "absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" })
  ] }) : /* @__PURE__ */ t(
    "input",
    {
      className: `${h} ${o}`,
      ...n
    }
  );
}
function Et({
  size: e = "medium",
  className: r = "",
  children: o,
  ...n
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
      ...n,
      children: o
    }
  );
}
function Dt({
  value: e,
  options: r,
  onChange: o,
  placeholder: n = "선택하세요",
  searchPlaceholder: i = "검색어를 입력하세요",
  emptyText: h = "검색 결과가 없습니다",
  disabled: l = !1,
  className: g = ""
}) {
  const [p, c] = S(!1), [d, m] = S(""), b = A(null), v = r.find((u) => u.value === e), s = H(() => {
    const u = d.trim().toLowerCase();
    return u ? r.filter((N) => `${N.label} ${N.description ?? ""} ${N.searchText ?? ""}`.toLowerCase().includes(u)) : r;
  }, [r, d]);
  E(() => {
    const u = (N) => {
      var C;
      (C = b.current) != null && C.contains(N.target) || c(!1);
    };
    return document.addEventListener("pointerdown", u), () => document.removeEventListener("pointerdown", u);
  }, []);
  const y = (u) => {
    o(u), m(""), c(!1);
  };
  return /* @__PURE__ */ a("div", { ref: b, className: `relative w-full ${g}`, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        disabled: l,
        onClick: () => {
          l || c((u) => !u);
        },
        className: "flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium",
        children: [
          /* @__PURE__ */ t("span", { className: v ? "text-text-primary" : "text-text-tertiary", children: (v == null ? void 0 : v.label) ?? n }),
          /* @__PURE__ */ t(ye, { className: "h-md w-md shrink-0 text-text-secondary" })
        ]
      }
    ),
    p && /* @__PURE__ */ a(
      "div",
      {
        className: "absolute z-50 mt-xs flex w-full flex-col gap-sm rounded border border-border bg-bg-primary p-sm shadow-lg",
        style: { maxHeight: "20rem" },
        children: [
          /* @__PURE__ */ t(
            Ze,
            {
              value: d,
              onChange: (u) => m(u.target.value),
              placeholder: i,
              showSearchIcon: !0,
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ t("div", { className: "overflow-y-auto", style: { maxHeight: "14rem" }, children: s.length > 0 ? s.map((u) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: () => y(u.value),
              className: "flex w-full flex-col gap-xs rounded px-sm py-sm text-left transition-colors hover:bg-bg-secondary",
              style: {
                backgroundColor: u.value === e ? "var(--primary-bg)" : void 0
              },
              children: [
                /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: u.label }),
                u.description && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: u.description })
              ]
            },
            u.value
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
            children: /* @__PURE__ */ t(Ee, { className: "w-md h-md" })
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${e === "grid" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ t(De, { className: "w-md h-md" })
          }
        )
      ]
    }
  );
}
function se({
  value: e,
  onChange: r,
  label: o,
  placeholder: n = "날짜 선택",
  align: i = "left",
  size: h = "medium",
  clearable: l = !1
}) {
  const [g, p] = S(!1), [c, d] = S(/* @__PURE__ */ new Date()), [m, b] = S("date"), [v, s] = S(() => {
    const x = (/* @__PURE__ */ new Date()).getFullYear();
    return x - x % 12;
  }), y = A(null), u = e ? new Date(e) : null;
  E(() => {
    if (g) {
      const x = u ?? /* @__PURE__ */ new Date();
      d(x), b("date"), s(x.getFullYear() - x.getFullYear() % 12);
    }
  }, [g]), E(() => {
    const x = (k) => {
      y.current && !y.current.contains(k.target) && p(!1);
    };
    return g && document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [g]);
  const N = (x) => x.toISOString().split("T")[0], C = (x) => new Date(x).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }), W = (x) => {
    const k = new Date(c.getFullYear(), c.getMonth(), x);
    r(N(k)), p(!1);
  }, P = () => {
    const x = /* @__PURE__ */ new Date();
    d(x), r(N(x)), p(!1);
  }, O = (x) => {
    d(new Date(c.getFullYear(), x, 1)), b("date");
  }, w = (x) => {
    d(new Date(x, c.getMonth(), 1)), b("month");
  }, z = new Date(
    c.getFullYear(),
    c.getMonth() + 1,
    0
  ).getDate(), L = new Date(
    c.getFullYear(),
    c.getMonth(),
    1
  ).getDay(), j = /* @__PURE__ */ new Date();
  j.setHours(0, 0, 0, 0);
  const _ = u == null ? void 0 : u.getFullYear(), Q = u == null ? void 0 : u.getMonth();
  return /* @__PURE__ */ a("div", { ref: y, className: "relative", children: [
    o && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: o }),
    /* @__PURE__ */ a("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => p((x) => !x),
          className: `flex w-full items-center justify-between rounded border border-border bg-bg-secondary text-base font-medium leading-none text-text-primary ${{
            large: "h-control-lg px-control-px-lg",
            medium: "h-control-md px-control-px-md",
            small: "h-control-sm px-control-px-sm",
            mini: "h-control-mini px-control-px-mini"
          }[h]} ${l && e ? "pr-control-search" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: e ? "text-text-primary" : "text-text-tertiary", children: e ? C(e) : n }),
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
          onClick: (x) => {
            x.stopPropagation(), r(""), p(!1);
          },
          children: /* @__PURE__ */ t(te, { className: "h-md w-md" })
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
                s(v - 12);
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
            children: /* @__PURE__ */ t(Le, { className: "h-md w-md" })
          }
        ),
        m === "date" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => b("month"),
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
              s(c.getFullYear() - c.getFullYear() % 12), b("year");
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
                s(v + 12);
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
            children: /* @__PURE__ */ t(Oe, { className: "h-md w-md" })
          }
        )
      ] }),
      m === "date" && /* @__PURE__ */ a(Y, { children: [
        /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-xs p-md pb-sm", children: ["일", "월", "화", "수", "목", "금", "토"].map((x, k) => /* @__PURE__ */ t(
          "div",
          {
            className: `p-sm text-center text-base font-bold ${k === 0 ? "text-error" : k === 6 ? "text-primary" : "text-text-secondary"}`,
            children: x
          },
          x
        )) }),
        /* @__PURE__ */ a("div", { className: "grid grid-cols-7 gap-xs p-md pt-0", children: [
          Array.from({ length: L }).map((x, k) => /* @__PURE__ */ t("div", { className: "h-control-md" }, `empty-${k}`)),
          Array.from({ length: z }).map((x, k) => {
            const f = k + 1, $ = new Date(c.getFullYear(), c.getMonth(), f);
            $.setHours(0, 0, 0, 0);
            const T = u && $.getTime() === u.getTime(), M = $.getTime() === j.getTime();
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => W(f),
                className: `h-control-md rounded text-center text-base font-medium transition-colors ${T ? "bg-primary text-white" : M ? "bg-bg-tertiary text-text-primary" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
                children: f
              },
              f
            );
          })
        ] })
      ] }),
      m === "month" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((x, k) => {
        const f = _ === c.getFullYear() && Q === k;
        return /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => O(k),
            className: `h-control-lg rounded text-base font-medium transition-colors ${f ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: [
              k + 1,
              "월"
            ]
          },
          k
        );
      }) }),
      m === "year" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((x, k) => {
        const f = v + k;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => w(f),
            className: `h-control-lg rounded text-base font-medium transition-colors ${_ === f ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: f
          },
          f
        );
      }) }),
      /* @__PURE__ */ t("div", { className: "flex justify-end border-t border-border p-md", children: m === "date" ? /* @__PURE__ */ t(D, { type: "button", onClick: P, children: "오늘" }) : /* @__PURE__ */ t(D, { type: "button", variant: "secondary", onClick: () => b("date"), children: "달력으로 돌아가기" }) })
    ] })
  ] });
}
const q = (e) => String(e).padStart(2, "0"), le = (e) => !e || e < 1 ? 1 : Math.min(e, 60), ce = (e, r) => {
  const [o = "00", n = "00", i = "00"] = e.split(":"), h = Number(o), l = Number(n), g = Number(i);
  return {
    hour: Number.isInteger(h) ? Math.min(Math.max(h, 0), 23) : 0,
    minute: Number.isInteger(l) ? Math.min(Math.max(l, 0), 59) : 0,
    second: r && Number.isInteger(g) ? Math.min(Math.max(g, 0), 59) : 0
  };
}, U = (e, r) => {
  const o = `${q(e.hour)}:${q(e.minute)}`;
  return r ? `${o}:${q(e.second)}` : o;
}, J = (e, r) => {
  const o = [];
  for (let n = 0; n <= e; n += r)
    o.push(n);
  return o;
}, de = (e, r) => {
  const o = getComputedStyle(document.documentElement), n = o.getPropertyValue(e).trim(), i = Number.parseFloat(n);
  return !Number.isFinite(i) || i <= 0 ? r : n.endsWith("rem") ? i * Number.parseFloat(o.fontSize) : i;
};
function me({
  value: e,
  onChange: r,
  label: o,
  placeholder: n = "시간 선택",
  align: i = "left",
  size: h = "medium",
  disabled: l = !1,
  clearable: g = !1,
  includeSeconds: p = !0,
  minuteStep: c = 1,
  secondStep: d = 1
}) {
  const [m, b] = S(!1), [v, s] = S(() => ce(e, p)), [y, u] = S(e), [N, C] = S({ top: 0, left: 0 }), W = A(null), P = A(null), O = le(c), w = le(d), z = H(
    () => J(59, O),
    [O]
  ), L = H(
    () => J(59, w),
    [w]
  );
  ae(() => {
    m && s(ce(e, p));
  }, [p, m, e]), E(() => {
    m || u(e);
  }, [m, e]), E(() => {
    const f = ($) => {
      var V, B;
      const T = $.target, M = (V = W.current) == null ? void 0 : V.contains(T), R = (B = P.current) == null ? void 0 : B.contains(T);
      !M && !R && b(!1);
    };
    return m && document.addEventListener("mousedown", f), () => {
      document.removeEventListener("mousedown", f);
    };
  }, [m]), E(() => {
    if (!m)
      return;
    const f = () => {
      var B;
      const $ = (B = W.current) == null ? void 0 : B.getBoundingClientRect();
      if (!$)
        return;
      const T = de("--timepicker-width", 288), M = de("--spacing-sm", 8), R = i === "right" ? $.right - T : $.left, V = window.innerWidth - T - M;
      C({
        top: $.bottom + M,
        left: Math.max(M, Math.min(R, V))
      });
    };
    return f(), window.addEventListener("resize", f), window.addEventListener("scroll", f, !0), () => {
      window.removeEventListener("resize", f), window.removeEventListener("scroll", f, !0);
    };
  }, [i, m]), ae(() => {
    if (!m)
      return;
    const f = window.requestAnimationFrame(() => {
      var $;
      ($ = P.current) == null || $.querySelectorAll('[data-time-selected="true"]').forEach((T) => {
        const M = T.closest('[data-time-options="true"]');
        M && (M.scrollTop = T.offsetTop - M.clientHeight / 2 + T.clientHeight / 2);
      });
    });
    return () => {
      window.cancelAnimationFrame(f);
    };
  }, [v.hour, v.minute, v.second, m]);
  const j = {
    large: "h-control-lg px-control-px-lg",
    medium: "h-control-md px-control-px-md",
    small: "h-control-sm px-control-px-sm",
    mini: "h-control-mini px-control-px-mini"
  }, _ = (f, $) => {
    const T = {
      ...v,
      [f]: $
    };
    s(T);
    const M = U(T, p);
    u(M), r(M);
  }, Q = () => {
    const f = /* @__PURE__ */ new Date(), $ = {
      hour: f.getHours(),
      minute: f.getMinutes(),
      second: p ? f.getSeconds() : 0
    };
    s($);
    const T = U($, p);
    u(T), r(T), b(!1);
  }, oe = () => {
    const f = U(v, p);
    u(f), r(f), b(!1);
  }, x = () => {
    u(""), r(""), b(!1);
  }, k = (f, $, T) => /* @__PURE__ */ a("div", { className: "min-w-0 flex-1", children: [
    /* @__PURE__ */ t("div", { className: "px-xs pb-xs text-center text-base font-bold text-text-tertiary", children: f }),
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
              onClick: () => _($, M),
              className: `h-control-md rounded text-center text-base font-medium transition-colors ${R ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
              children: q(M)
            },
            M
          );
        }) })
      }
    )
  ] });
  return /* @__PURE__ */ a("div", { ref: W, children: [
    o && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: o }),
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
                placeholder: n,
                className: `pointer-events-none w-full rounded border border-border bg-bg-secondary pl-control-search pr-control-px-md text-base font-medium leading-none text-text-primary placeholder:text-text-tertiary ${j[h]}`
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
            l || b((f) => !f);
          },
          className: `absolute inset-0 rounded bg-transparent text-left ${l ? "cursor-not-allowed text-text-tertiary" : "cursor-pointer"}`,
          "aria-expanded": m,
          "aria-haspopup": "dialog",
          "aria-label": y || n,
          children: /* @__PURE__ */ t("span", { className: "sr-only", children: y || n })
        }
      ),
      g && e && !l && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "시간 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: x,
          children: /* @__PURE__ */ t(te, { className: "h-md w-md" })
        }
      ),
      m && Ce(
        /* @__PURE__ */ a(
          "div",
          {
            ref: P,
            className: "fixed overflow-hidden rounded border border-border bg-bg-primary shadow-lg",
            style: {
              top: N.top,
              left: N.left,
              width: "var(--timepicker-width, 18rem)",
              zIndex: "var(--layer-popover, 1000)"
            },
            onMouseDown: (f) => f.stopPropagation(),
            children: [
              /* @__PURE__ */ a("div", { className: "flex gap-sm p-sm", children: [
                k("시", "hour", J(23, 1)),
                k("분", "minute", z),
                p && k("초", "second", L)
              ] }),
              /* @__PURE__ */ a("div", { className: "flex justify-end gap-sm border-t border-border p-sm", children: [
                g && /* @__PURE__ */ t(D, { type: "button", variant: "secondary", size: "small", onClick: x, children: "초기화" }),
                /* @__PURE__ */ t(D, { type: "button", variant: "secondary", size: "small", onClick: Q, children: "현재" }),
                /* @__PURE__ */ t(D, { type: "button", size: "small", onClick: oe, children: "확인" })
              ] })
            ]
          }
        ),
        document.body
      )
    ] })
  ] });
}
function Ot({
  startValue: e,
  endValue: r,
  onStartChange: o,
  onEndChange: n,
  label: i,
  startPlaceholder: h = "시작 시간",
  endPlaceholder: l = "종료 시간",
  separator: g = "To",
  align: p = "left",
  size: c = "medium",
  disabled: d = !1,
  clearable: m = !1,
  includeSeconds: b = !0,
  minuteStep: v = 1,
  secondStep: s = 1
}) {
  return /* @__PURE__ */ a("div", { children: [
    i && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: i }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-md", children: [
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        me,
        {
          value: e,
          onChange: o,
          placeholder: h,
          align: p,
          size: c,
          disabled: d,
          clearable: m,
          includeSeconds: b,
          minuteStep: v,
          secondStep: s
        }
      ) }),
      /* @__PURE__ */ t("span", { className: "shrink-0 text-base font-medium text-text-secondary", children: g }),
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        me,
        {
          value: r,
          onChange: n,
          placeholder: l,
          align: "right",
          size: c,
          disabled: d,
          clearable: m,
          includeSeconds: b,
          minuteStep: v,
          secondStep: s
        }
      ) })
    ] })
  ] });
}
const et = {
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
}, tt = {
  primary: "bg-primary",
  success: "bg-success"
};
function It({
  checked: e,
  onCheckedChange: r,
  label: o,
  description: n,
  disabled: i = !1,
  variant: h = "primary",
  size: l = "medium",
  labelPosition: g = "right",
  className: p = "",
  id: c,
  name: d,
  ariaLabel: m
}) {
  const b = et[l], s = /* @__PURE__ */ t(
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
      className: `inline-flex shrink-0 items-center border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${e ? tt[h] : "bg-bg-tertiary"} ${i ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
      style: b.track,
      children: /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "block bg-white shadow-sm transition-transform duration-200 ease-in-out",
          style: {
            ...b.thumb,
            transform: e ? b.checkedTransform : "translateX(0)"
          }
        }
      )
    }
  );
  return !o && !n ? /* @__PURE__ */ t("span", { className: `inline-flex items-center ${p}`, children: s }) : /* @__PURE__ */ a(
    "label",
    {
      className: `inline-flex items-center gap-sm text-base font-medium text-text-primary ${i ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${p}`,
      children: [
        g === "left" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
          o && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: o }),
          n && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: n })
        ] }),
        s,
        g === "right" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
          o && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: o }),
          n && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: n })
        ] })
      ]
    }
  );
}
const rt = [
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
  startDate: o,
  endDate: n,
  values: i,
  targetLabel: h,
  rateTypeLabel: l,
  commissionLabel: g,
  previewRows: p = [],
  targetOptions: c = [],
  selectedTargetIds: d = [],
  activeWeekdays: m = [0, 1, 2, 3, 4, 5, 6],
  warningMessage: b,
  disabled: v = !1,
  onTargetToggle: s,
  onWeekdayToggle: y,
  onStartDateChange: u,
  onEndDateChange: N,
  onValueChange: C,
  onSubmit: W,
  onClose: P
}) {
  if (!e) return null;
  const O = (w) => new Intl.NumberFormat("ko-KR").format(w);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-lg",
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      onClick: P,
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
                    onClick: W,
                    className: "w-modal-action",
                    children: [
                      /* @__PURE__ */ t(Pe, { className: "h-icon-md w-icon-md" }),
                      "적용"
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  D,
                  {
                    type: "button",
                    variant: "secondary",
                    onClick: P,
                    className: "w-modal-action",
                    children: "취소"
                  }
                )
              ] })
            ] }),
            b && /* @__PURE__ */ t(Je, { variant: "warning", title: "확인 필요", className: "mb-lg", children: b }),
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
                const z = d.includes(w.id);
                return /* @__PURE__ */ a(
                  "button",
                  {
                    type: "button",
                    onClick: () => s == null ? void 0 : s(w.id),
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
                    value: o,
                    onChange: u,
                    placeholder: "시작일 선택"
                  }
                ),
                /* @__PURE__ */ t(
                  se,
                  {
                    label: "종료일",
                    value: n,
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
              /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-sm", children: rt.map(({ day: w, label: z }) => {
                const L = m.includes(w);
                return /* @__PURE__ */ a("label", { className: "block", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => y == null ? void 0 : y(w),
                      className: "mb-xs flex h-control-md w-full items-center justify-center rounded border-none text-base leading-none transition-colors",
                      style: {
                        backgroundColor: L ? "var(--primary)" : "var(--bg-secondary)",
                        borderRadius: "var(--radius)",
                        color: L ? "#ffffff" : "var(--text-tertiary)",
                        fontWeight: "var(--font-bold)"
                      },
                      children: z
                    }
                  ),
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "number",
                      disabled: !L,
                      value: i[w] ?? "",
                      onChange: (j) => C(w, j.target.value),
                      placeholder: "0",
                      className: "h-control-md w-full rounded px-control-px-sm py-none text-center text-base leading-none",
                      style: {
                        backgroundColor: L ? "var(--bg-secondary)" : "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius)",
                        color: L ? "var(--text-primary)" : "var(--text-tertiary)",
                        cursor: L ? "text" : "not-allowed",
                        fontWeight: "var(--font-medium)",
                        opacity: L ? 1 : 0.6
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
                (l || g) && /* @__PURE__ */ a(
                  "div",
                  {
                    className: "text-base",
                    style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                    children: [
                      l,
                      l && g ? " · " : "",
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
                    /* @__PURE__ */ t("tbody", { children: p.length === 0 ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t(
                      "td",
                      {
                        colSpan: 6,
                        className: "px-md py-lg text-center text-base",
                        style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                        children: "요일별 금액을 입력하면 계산 결과가 표시됩니다."
                      }
                    ) }) : p.flatMap(
                      (w) => w.cells.map((z, L) => /* @__PURE__ */ a("tr", { children: [
                        /* @__PURE__ */ t(
                          "td",
                          {
                            className: "px-md py-sm text-base",
                            style: {
                              color: "var(--text-primary)",
                              fontWeight: "var(--font-medium)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: L === 0 ? `${w.id} / ${w.name}` : ""
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
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: O(z.inputAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: O(z.sellRate) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: O(z.commissionAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: O(z.netRate) })
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
const re = "CREAMI_THEME", ot = 3600 * 24 * 365;
function ue(e) {
  return e === "dark" || e === "light";
}
function nt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${re}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function ee(e) {
  document.cookie = `${re}=${e}; path=/; max-age=${ot}; SameSite=Lax`;
}
function at() {
  const { theme: e, setTheme: r } = ke();
  return E(() => {
    const o = nt();
    if (ue(o)) {
      r(o);
      return;
    }
    ee("dark");
  }, [r]), E(() => {
    ue(e) && ee(e);
  }, [e]), null;
}
function Wt({ children: e }) {
  return /* @__PURE__ */ a(
    Ge,
    {
      attribute: "data-theme",
      defaultTheme: "dark",
      enableSystem: !1,
      storageKey: re,
      children: [
        /* @__PURE__ */ t(at, {}),
        e
      ]
    }
  );
}
function Rt() {
  const { theme: e, setTheme: r } = ke(), [o, n] = S(!1);
  if (E(() => {
    n(!0);
  }, []), !o)
    return /* @__PURE__ */ t("div", { className: "h-control-md w-control-md" });
  const i = e === "dark", h = i ? "light" : "dark";
  return /* @__PURE__ */ t(
    D,
    {
      type: "button",
      variant: "tertiary",
      size: "normal",
      iconOnly: !0,
      onClick: () => {
        ee(h), r(h);
      },
      "aria-label": i ? "라이트 모드로 전환" : "다크 모드로 전환",
      title: i ? "라이트 모드로 전환" : "다크 모드로 전환",
      children: i ? /* @__PURE__ */ t(We, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Re, { className: "h-lg w-lg" })
    }
  );
}
const it = ["ko", "en", "ja"], st = {
  ko: "한국어",
  en: "English",
  ja: "日本語"
};
function lt({ currentLocale: e, onLocaleChange: r }) {
  const [o, n] = S(!1), [i, h] = qe(), l = G(), g = (p) => {
    n(!1), h(() => {
      document.cookie = `NEXT_LOCALE=${p}; path=/; max-age=31536000; SameSite=Lax`, r == null || r(p);
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
        onClick: () => n(!o),
        "aria-label": l("language.select"),
        title: l("language.select"),
        disabled: i,
        children: /* @__PURE__ */ t(Fe, { className: "h-lg w-lg" })
      }
    ),
    o && /* @__PURE__ */ a(Y, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => n(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ t("div", { className: "absolute right-0 top-full z-50 mt-xs min-w-[120px] rounded bg-bg-secondary border border-border shadow-lg", children: it.map((p) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => g(p),
          disabled: i,
          className: `w-full px-md py-sm text-left text-text-primary hover:bg-bg-tertiary transition-colors first:rounded-t last:rounded-b disabled:opacity-50 disabled:cursor-not-allowed ${e === p ? "bg-bg-tertiary" : ""}`,
          children: st[p]
        },
        p
      )) })
    ] })
  ] });
}
function ct() {
  const [e, r] = S(!1), [o] = S(!0), n = G();
  return /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ a(
      D,
      {
        type: "button",
        variant: "tertiary",
        size: "normal",
        iconOnly: !0,
        onClick: () => r(!e),
        "aria-label": n("common.notification"),
        title: n("common.notification"),
        className: "relative",
        children: [
          /* @__PURE__ */ t(Ae, { className: "h-lg w-lg" }),
          o && /* @__PURE__ */ t("span", { className: "absolute right-[6px] top-[6px] h-[8px] w-[8px] rounded-full bg-primary" })
        ]
      }
    ),
    e && /* @__PURE__ */ a(Y, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => r(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ a("div", { className: "absolute right-0 top-full z-50 mt-xs w-[320px] rounded bg-bg-secondary border border-border shadow-lg", children: [
        /* @__PURE__ */ t("div", { className: "px-md py-sm border-b border-border", children: /* @__PURE__ */ t("h3", { className: "font-bold text-text-primary", children: n("notification.title") }) }),
        /* @__PURE__ */ t("div", { className: "max-h-[400px] overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "px-md py-md text-center text-text-secondary", children: n("notification.empty") }) })
      ] })
    ] })
  ] });
}
const $e = we(null);
let I = null, he = 0;
const dt = {
  success: ge,
  warning: fe,
  info: xe,
  error: be
}, mt = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--primary)",
  error: "var(--error)"
};
function ut() {
  return he += 1, `notification-${Date.now()}-${he}`;
}
function ht(e) {
  return e.endsWith("left") ? "left" : "right";
}
function pt(e) {
  const r = e.startsWith("top") ? "top-lg" : "bottom-lg", o = e.endsWith("left") ? "left-lg" : "right-lg";
  return `${r} ${o}`;
}
function bt(e) {
  return {
    left: "-translate-x-full",
    right: "translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full"
  }[e];
}
function ft({
  item: e,
  onClose: r
}) {
  const [o, n] = S(!1), i = dt[e.type], h = e.direction ?? ht(e.placement);
  return E(() => {
    const l = window.setTimeout(() => n(!0), 0);
    return () => window.clearTimeout(l);
  }, []), E(() => {
    if (e.duration <= 0)
      return;
    const l = window.setTimeout(() => r(e.id), e.duration);
    return () => window.clearTimeout(l);
  }, [e.duration, e.id, r]), /* @__PURE__ */ a(
    "div",
    {
      className: `pointer-events-auto flex w-app-switcher items-start gap-md rounded border border-border bg-bg-primary p-md shadow-lg transition-all ${o && !e.isClosing ? "translate-x-0 translate-y-0 opacity-100" : `${bt(h)} opacity-0`}`,
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
            style: { color: mt[e.type] },
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
            children: /* @__PURE__ */ t(te, { className: "h-icon-md w-icon-md", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
}
function K({
  placement: e,
  items: r,
  onClose: o
}) {
  if (r.length === 0)
    return null;
  const i = e.startsWith("bottom") ? [...r].reverse() : r;
  return /* @__PURE__ */ t(
    "div",
    {
      className: `pointer-events-none fixed z-[var(--layer-popover)] flex flex-col gap-md ${pt(e)}`,
      children: i.map((h) => /* @__PURE__ */ t(ft, { item: h, onClose: o }, h.id))
    }
  );
}
function F(e) {
  const r = () => {
    throw new Error("NotificationProvider is required before using notification.");
  };
  return {
    open: (o) => (e == null ? void 0 : e.open(o)) ?? r(),
    success: (o) => (e == null ? void 0 : e.open({ ...o, type: "success" })) ?? r(),
    warning: (o) => (e == null ? void 0 : e.open({ ...o, type: "warning" })) ?? r(),
    info: (o) => (e == null ? void 0 : e.open({ ...o, type: "info" })) ?? r(),
    error: (o) => (e == null ? void 0 : e.open({ ...o, type: "error" })) ?? r(),
    close: (o) => {
      if (!e) {
        r();
        return;
      }
      e.close(o);
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
  defaultPlacement: o = "top-right"
}) {
  const [n, i] = S([]), h = A(/* @__PURE__ */ new Map()), [l, g] = S(!1);
  E(() => {
    g(!0);
  }, []);
  const p = X((s) => {
    i((y) => {
      var N;
      const u = y.find((C) => C.id === s);
      return u && ((N = u.onClose) == null || N.call(u)), y.filter((C) => C.id !== s);
    });
  }, []), c = X((s) => {
    const y = h.current.get(s);
    y && window.clearTimeout(y), i((N) => N.map((C) => C.id === s ? { ...C, isClosing: !0 } : C));
    const u = window.setTimeout(() => {
      p(s), h.current.delete(s);
    }, 200);
    h.current.set(s, u);
  }, [p]), d = X((s) => {
    const y = s.id ?? ut(), u = {
      id: y,
      type: s.type ?? "info",
      title: s.title,
      message: s.message,
      duration: s.duration ?? r,
      placement: s.placement ?? o,
      direction: s.direction,
      showClose: s.showClose ?? !0,
      onClose: s.onClose
    };
    return i((N) => N.some((C) => C.id === y) ? N.map((C) => C.id === y ? u : C) : [...N, u]), y;
  }, [r, o]), m = X(() => {
    i((s) => (s.forEach((y) => {
      var u;
      return (u = y.onClose) == null ? void 0 : u.call(y);
    }), []));
  }, []), b = H(() => ({
    open: d,
    success: (s) => d({ ...s, type: "success" }),
    warning: (s) => d({ ...s, type: "warning" }),
    info: (s) => d({ ...s, type: "info" }),
    error: (s) => d({ ...s, type: "error" }),
    close: c,
    closeAll: m
  }), [c, m, d]);
  E(() => (I = { open: d, close: c, closeAll: m }, () => {
    I = null, h.current.forEach((s) => window.clearTimeout(s)), h.current.clear();
  }), [c, m, d]);
  const v = H(() => ({
    "top-left": n.filter((s) => s.placement === "top-left"),
    "top-right": n.filter((s) => s.placement === "top-right"),
    "bottom-left": n.filter((s) => s.placement === "bottom-left"),
    "bottom-right": n.filter((s) => s.placement === "bottom-right")
  }), [n]);
  return /* @__PURE__ */ a($e.Provider, { value: b, children: [
    e,
    l && Ce(
      /* @__PURE__ */ a(Y, { children: [
        /* @__PURE__ */ t(K, { placement: "top-left", items: v["top-left"], onClose: c }),
        /* @__PURE__ */ t(K, { placement: "top-right", items: v["top-right"], onClose: c }),
        /* @__PURE__ */ t(K, { placement: "bottom-left", items: v["bottom-left"], onClose: c }),
        /* @__PURE__ */ t(K, { placement: "bottom-right", items: v["bottom-right"], onClose: c })
      ] }),
      document.body
    )
  ] });
}
function At() {
  const e = Ne($e);
  if (!e)
    throw new Error("useNotification must be used within NotificationProvider.");
  return e;
}
const jt = {
  open: (e) => F(I).open(e),
  success: (e) => F(I).success(e),
  warning: (e) => F(I).warning(e),
  info: (e) => F(I).info(e),
  error: (e) => F(I).error(e),
  close: (e) => F(I).close(e),
  closeAll: () => F(I).closeAll()
};
function Bt({
  children: e,
  className: r = "",
  onClick: o,
  hover: n = !0
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: `bg-bg-primary rounded border border-border shadow overflow-hidden ${n ? "transition-all hover:shadow-lg cursor-pointer" : ""} ${r}`,
      onClick: o,
      children: e
    }
  );
}
function Ht({ children: e, className: r = "", overflow: o = "auto" }) {
  return /* @__PURE__ */ t("div", { className: o === "visible" ? "overflow-visible" : "overflow-x-auto", children: /* @__PURE__ */ t("table", { className: `w-full border-separate border-spacing-0 ${r}`, children: e }) });
}
function Yt({ children: e, className: r = "" }) {
  return /* @__PURE__ */ t("thead", { className: `bg-bg-tertiary border-b-2 border-border ${r}`, children: e });
}
function _t({ children: e, className: r = "" }) {
  return /* @__PURE__ */ t("tbody", { className: r, children: e });
}
function Vt({
  children: e,
  onClick: r,
  className: o = "",
  isSelected: n = !1
}) {
  return /* @__PURE__ */ t("tr", { className: `${`transition-all ${n ? "bg-primary-bg border-l border-l-primary" : "bg-bg-primary border-l border-l-transparent"} ${r ? "cursor-pointer hover:bg-bg-secondary" : "cursor-default"}`} ${o}`, onClick: r, children: e });
}
function Xt({
  children: e,
  className: r = "",
  align: o = "left",
  ...n
}) {
  return /* @__PURE__ */ t("td", { className: `px-md py-md text-base text-text-primary border-b border-border ${o === "center" ? "text-center" : o === "right" ? "text-right" : "text-left"} ${r}`, ...n, children: e });
}
function Kt({
  children: e,
  className: r = "",
  align: o = "left",
  ...n
}) {
  return /* @__PURE__ */ t("th", { className: `px-md py-md text-base font-bold text-text-primary ${o === "center" ? "text-center" : o === "right" ? "text-right" : "text-left"} ${r}`, ...n, children: e });
}
function qt({
  children: e,
  isCollapsed: r = !1,
  className: o = ""
}) {
  return /* @__PURE__ */ t(
    "aside",
    {
      className: `fixed left-0 bottom-0 z-30 top-[var(--header-height)] overflow-hidden bg-bg-primary border-r border-border transition-[width] duration-300 ease-in-out ${r ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]"} ${o}`,
      children: e
    }
  );
}
function Gt({ children: e }) {
  return /* @__PURE__ */ t("nav", { className: "h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ t("ul", { className: "flex w-full flex-col gap-xs list-none m-0 p-0", children: e }) });
}
function Qt({
  icon: e,
  label: r,
  href: o,
  onClick: n,
  isActive: i = !1,
  isCollapsed: h = !1,
  depth: l = 0
}) {
  const g = (m) => {
    n && (m.preventDefault(), n());
  }, p = /* @__PURE__ */ a(Y, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: `absolute left-0 top-0 h-full rounded transition-[width,background-color] duration-300 ${h ? "w-[calc(var(--sidebar-collapsed)-var(--spacing-lg))]" : "w-full"} ${i ? "bg-primary" : "bg-transparent group-hover:bg-bg-tertiary"}`
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
  ] }), c = "group w-full rounded", d = `relative flex min-h-2xl w-full items-center bg-transparent text-base font-medium no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${i ? "text-white" : "text-text-secondary group-hover:text-text-primary"}`;
  return /* @__PURE__ */ t("li", { className: c, children: o ? /* @__PURE__ */ t(
    "a",
    {
      href: o,
      className: d,
      title: r,
      "aria-current": i ? "page" : void 0,
      onClick: g,
      children: p
    }
  ) : /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: `${d} border-0 text-left cursor-pointer w-full`,
      title: r,
      "aria-pressed": i,
      onClick: n,
      children: p
    }
  ) });
}
const Se = we(void 0), Te = "CREAMI_SIDEBAR_COLLAPSED", gt = 3600 * 24 * 365;
function xt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${Te}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function yt(e) {
  document.cookie = `${Te}=${String(e)}; path=/; max-age=${gt}; SameSite=Lax`;
}
function vt({ children: e }) {
  const [r, o] = S(!1), [n, i] = S(!1);
  E(() => {
    const l = xt();
    l !== null && o(l === "true"), i(!0);
  }, []), E(() => {
    n && yt(r);
  }, [r, n]);
  const h = () => {
    o((l) => !l);
  };
  return /* @__PURE__ */ t(Se.Provider, { value: { isCollapsed: r, toggleSidebar: h, setIsCollapsed: o }, children: e });
}
function Me() {
  const e = Ne(Se);
  if (e === void 0)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return e;
}
const pe = {
  Home: _e,
  LayoutDashboard: Z,
  BarChart3: Ye,
  Tag: He,
  Calendar: ve,
  ReceiptText: Be,
  Settings: je
};
function wt({ apps: e, currentAppId: r }) {
  const [o, n] = S(!1), i = A(null), h = G(), l = e.find((d) => d.id === r) ?? e[0], g = pe[l == null ? void 0 : l.icon] ?? Z, p = (d) => h(`apps.${d.id}`);
  E(() => {
    const d = (m) => {
      i.current && !i.current.contains(m.target) && n(!1);
    };
    return o && document.addEventListener("mousedown", d), () => {
      document.removeEventListener("mousedown", d);
    };
  }, [o]);
  const c = (d) => {
    window.location.href = d;
  };
  return /* @__PURE__ */ a("div", { className: "relative flex h-full shrink-0 items-center", ref: i, children: [
    /* @__PURE__ */ a(
      D,
      {
        type: "button",
        variant: o ? "tertiary" : "ghost",
        size: "normal",
        onClick: () => n((d) => !d),
        className: "justify-start !text-base font-medium",
        "aria-expanded": o,
        "aria-haspopup": "menu",
        children: [
          /* @__PURE__ */ t(g, { className: "h-lg w-lg text-primary" }),
          /* @__PURE__ */ t("span", { className: "whitespace-nowrap !text-base font-medium", children: l ? p(l) : "" }),
          /* @__PURE__ */ t(
            ye,
            {
              className: `h-md w-md shrink-0 transition-transform ${o ? "rotate-180" : "rotate-0"}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: `absolute left-0 top-full z-50 grid w-app-switcher overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${o ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"}`,
        "aria-hidden": !o,
        children: /* @__PURE__ */ t("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ a(
          "div",
          {
            className: `max-h-[var(--app-switcher-dropdown-height)] overflow-y-auto rounded border border-border bg-bg-primary p-md shadow-md transition-transform duration-300 ease-in-out ${o ? "translate-y-none" : "-translate-y-sm"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "px-md py-sm text-base font-bold uppercase text-text-tertiary", children: h("appSwitcher.title") }),
              /* @__PURE__ */ t("div", { className: "flex flex-col gap-sm", children: e.map((d) => {
                const m = pe[d.icon] ?? Z, b = d.id === (l == null ? void 0 : l.id);
                return /* @__PURE__ */ a(
                  D,
                  {
                    type: "button",
                    variant: b ? "primary" : "ghost",
                    size: "large",
                    fullWidth: !0,
                    onClick: () => c(d.url),
                    className: "h-auto justify-start gap-lg text-left !text-base font-medium leading-normal",
                    style: {
                      height: "auto",
                      minHeight: "calc(var(--control-height-lg) + var(--spacing-sm))",
                      padding: "var(--spacing-sm) var(--spacing-md)"
                    },
                    role: "menuitem",
                    tabIndex: o ? 0 : -1,
                    children: [
                      /* @__PURE__ */ t("span", { className: "flex h-lg w-lg shrink-0 items-center justify-center", children: /* @__PURE__ */ t(m, { className: "h-lg w-lg" }) }),
                      /* @__PURE__ */ a("span", { className: "min-w-0 flex-1 leading-normal", children: [
                        /* @__PURE__ */ t("span", { className: "block truncate !text-base font-medium", children: p(d) }),
                        /* @__PURE__ */ t(
                          "span",
                          {
                            className: "block truncate !text-xs font-light text-text-tertiary",
                            children: d.url.replace("http://", "")
                          }
                        )
                      ] }),
                      b && /* @__PURE__ */ t("span", { className: "shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium", children: h("appSwitcher.current") })
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
function Nt({
  apps: e,
  currentAppId: r,
  currentLocale: o,
  rightSlot: n,
  profileHref: i,
  onLocaleChange: h
}) {
  const { isCollapsed: l, setIsCollapsed: g } = Me(), [p, c] = S(!1), d = A(null), m = G(), b = e.find((y) => y.id === "setting"), v = i ?? (b ? `${b.url}/profile` : "/profile"), s = b ? `${b.url}/login` : "/login";
  return E(() => {
    const y = (u) => {
      d.current && !d.current.contains(u.target) && c(!1);
    };
    return p && document.addEventListener("mousedown", y), () => {
      document.removeEventListener("mousedown", y);
    };
  }, [p]), /* @__PURE__ */ a("header", { className: "fixed left-0 right-0 top-0 z-40 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-primary", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex h-full shrink-0 items-center gap-sm px-md",
        style: { minWidth: "var(--sidebar-width)" },
        children: [
          /* @__PURE__ */ t(wt, { apps: e, currentAppId: r }),
          /* @__PURE__ */ t(
            D,
            {
              type: "button",
              variant: "tertiary",
              size: "normal",
              iconOnly: !0,
              onClick: () => g(!l),
              "aria-label": m(l ? "sidebar.expand" : "sidebar.collapse"),
              title: m(l ? "sidebar.expand" : "sidebar.collapse"),
              children: l ? /* @__PURE__ */ t(Ve, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Xe, { className: "h-lg w-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "flex h-full flex-1 items-center justify-end gap-sm px-md", children: [
      /* @__PURE__ */ t(lt, { currentLocale: o, onLocaleChange: h }),
      /* @__PURE__ */ t(ct, {}),
      n ?? /* @__PURE__ */ a("div", { ref: d, className: "relative", children: [
        /* @__PURE__ */ t(
          D,
          {
            type: "button",
            variant: "tertiary",
            size: "normal",
            iconOnly: !0,
            onClick: () => c((y) => !y),
            "aria-label": m("common.profile"),
            "aria-expanded": p,
            "aria-haspopup": "menu",
            title: m("common.profile"),
            children: /* @__PURE__ */ t(ne, { className: "h-lg w-lg" })
          }
        ),
        p && /* @__PURE__ */ a(
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
                    /* @__PURE__ */ t(ne, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    m("common.profile")
                  ]
                }
              ),
              /* @__PURE__ */ a(
                "a",
                {
                  href: s,
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
function Ct({
  children: e,
  sidebar: r,
  apps: o,
  currentAppId: n,
  currentLocale: i,
  rightSlot: h,
  profileHref: l,
  onLocaleChange: g
}) {
  const { isCollapsed: p } = Me();
  return /* @__PURE__ */ a("div", { className: "min-h-screen bg-bg-secondary", children: [
    /* @__PURE__ */ t(
      Nt,
      {
        apps: o,
        currentAppId: n,
        currentLocale: i,
        rightSlot: h,
        profileHref: l,
        onLocaleChange: g
      }
    ),
    r,
    /* @__PURE__ */ t(
      "main",
      {
        className: "mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] transition-[margin-left] duration-300 ease-in-out",
        style: {
          marginLeft: p ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
          padding: "var(--content-padding)"
        },
        children: e
      }
    )
  ] });
}
function Ut(e) {
  return /* @__PURE__ */ t(vt, { children: /* @__PURE__ */ t(Ct, { ...e }) });
}
export {
  Je as Alert,
  wt as AppSwitcher,
  D as Button,
  Bt as Card,
  Wt as CreamiThemeProvider,
  se as DatePicker,
  Nt as Header,
  Ze as Input,
  lt as LanguageSelector,
  Ut as MainLayout,
  ct as NotificationButton,
  Ft as NotificationProvider,
  Dt as SearchableSelect,
  Et as Select,
  qt as Sidebar,
  Gt as SidebarMenu,
  Qt as SidebarMenuItem,
  vt as SidebarProvider,
  It as Switch,
  Ht as Table,
  _t as TableBody,
  Xt as TableCell,
  Kt as TableHead,
  Yt as TableHeader,
  Vt as TableRow,
  Rt as ThemeToggle,
  me as TimePicker,
  Ot as TimeRangePicker,
  Lt as ViewToggle,
  Pt as WeekdayRateBulkModal,
  jt as notification,
  At as useNotification,
  Me as useSidebar,
  ee as writeThemeCookie
};
