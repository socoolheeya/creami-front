import { jsx as t, jsxs as i, Fragment as Y } from "react/jsx-runtime";
import { XCircle as ge, AlertTriangle as xe, CheckCircle2 as ye, Info as ve, Search as De, ChevronDown as we, List as Oe, LayoutGrid as Le, Calendar as Ne, X as ne, ChevronLeft as ee, ChevronRight as te, Clock as Ie, Save as Re, Sun as We, Moon as je, Languages as Ae, Bell as Fe, Settings as Be, ReceiptText as He, Tag as Ye, BarChart3 as Pe, LayoutDashboard as re, Home as _e, PanelLeftOpen as Ve, PanelLeftClose as Xe, User as ie, LogOut as Ke } from "lucide-react";
import { useState as T, useRef as F, useMemo as _, useEffect as D, useLayoutEffect as se, useTransition as qe, createContext as ke, useCallback as K, useContext as Ce } from "react";
import { createPortal as $e } from "react-dom";
import { useTranslations as Q } from "next-intl";
function S({
  variant: e = "primary",
  size: r = "medium",
  iconOnly: o = !1,
  fullWidth: n = !1,
  className: s = "",
  children: u,
  disabled: l,
  ...b
}) {
  const d = r === "lg" ? "large" : r === "normal" || r === "md" ? "medium" : r === "sm" ? "small" : r, m = "inline-flex shrink-0 items-center justify-center gap-sm rounded transition-colors box-border m-none border-none text-base leading-none font-medium", h = {
    large: o ? "h-control-lg w-control-lg p-none" : "h-control-lg px-control-px-lg py-none",
    medium: o ? "h-control-md w-control-md p-none" : "h-control-md px-control-px-md py-none",
    small: o ? "h-control-sm w-control-sm p-none" : "h-control-sm px-control-px-sm py-none",
    mini: o ? "h-control-mini w-control-mini p-none" : "h-control-mini px-control-px-mini py-none"
  }, p = {
    primary: l ? "cursor-not-allowed bg-primary text-white opacity-50" : "cursor-pointer bg-primary text-white hover:opacity-90",
    secondary: l ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
    tertiary: l ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-tertiary text-text-primary hover:bg-bg-secondary",
    ghost: l ? "cursor-not-allowed bg-transparent text-text-tertiary" : "cursor-pointer bg-transparent text-text-primary hover:bg-bg-tertiary"
  }[e], g = n ? "w-full" : "";
  return /* @__PURE__ */ t(
    "button",
    {
      className: `${m} ${h[d]} ${p} ${g} ${s}`,
      disabled: l,
      ...b,
      children: u
    }
  );
}
const Ge = {
  info: ve,
  success: ye,
  warning: xe,
  error: ge
}, le = {
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
  children: o,
  className: n = ""
}) {
  const s = Ge[e];
  return /* @__PURE__ */ i(
    "div",
    {
      className: `flex items-start gap-sm rounded p-md text-base ${n}`,
      style: {
        backgroundColor: Qe[e],
        border: `1px solid ${le[e]}`,
        borderRadius: "var(--radius)",
        color: "var(--text-primary)"
      },
      children: [
        /* @__PURE__ */ t(
          s,
          {
            className: "h-icon-md w-icon-md shrink-0",
            style: { color: le[e] }
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-xs", children: [
          r && /* @__PURE__ */ t("div", { style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)" }, children: r }),
          /* @__PURE__ */ t("div", { style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" }, children: o })
        ] })
      ]
    }
  );
}
function Je({
  size: e = "medium",
  showSearchIcon: r = !1,
  className: o = "",
  ...n
}) {
  const u = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[e]} rounded border border-border bg-bg-primary text-text-primary box-border font-medium`;
  return r ? /* @__PURE__ */ i("div", { className: "relative w-full", children: [
    /* @__PURE__ */ t(
      "input",
      {
        className: `${u} pr-control-search ${o}`,
        ...n
      }
    ),
    /* @__PURE__ */ t(De, { className: "absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" })
  ] }) : /* @__PURE__ */ t(
    "input",
    {
      className: `${u} ${o}`,
      ...n
    }
  );
}
function Dt({
  size: e = "medium",
  className: r = "",
  children: o,
  ...n
}) {
  const u = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[e]} rounded border border-border bg-bg-secondary text-text-primary box-border font-medium`;
  return /* @__PURE__ */ t(
    "select",
    {
      className: `${u} ${r}`,
      ...n,
      children: o
    }
  );
}
function Ot({
  value: e,
  options: r,
  onChange: o,
  placeholder: n = "선택하세요",
  searchPlaceholder: s = "검색어를 입력하세요",
  emptyText: u = "검색 결과가 없습니다",
  disabled: l = !1,
  className: b = ""
}) {
  const [d, m] = T(!1), [h, p] = T(""), g = F(null), w = r.find((c) => c.value === e), a = _(() => {
    const c = h.trim().toLowerCase();
    return c ? r.filter((f) => `${f.label} ${f.description ?? ""} ${f.searchText ?? ""}`.toLowerCase().includes(c)) : r;
  }, [r, h]);
  D(() => {
    const c = (f) => {
      var k;
      (k = g.current) != null && k.contains(f.target) || m(!1);
    };
    return document.addEventListener("pointerdown", c), () => document.removeEventListener("pointerdown", c);
  }, []);
  const x = (c) => {
    o(c), p(""), m(!1);
  };
  return /* @__PURE__ */ i("div", { ref: g, className: `relative w-full ${b}`, children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        disabled: l,
        onClick: () => {
          l || m((c) => !c);
        },
        className: "flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium",
        children: [
          /* @__PURE__ */ t("span", { className: w ? "text-text-primary" : "text-text-tertiary", children: (w == null ? void 0 : w.label) ?? n }),
          /* @__PURE__ */ t(we, { className: "h-md w-md shrink-0 text-text-secondary" })
        ]
      }
    ),
    d && /* @__PURE__ */ i(
      "div",
      {
        className: "absolute z-50 mt-xs flex w-full flex-col gap-sm rounded border border-border bg-bg-primary p-sm shadow-lg",
        style: { maxHeight: "20rem" },
        children: [
          /* @__PURE__ */ t(
            Je,
            {
              value: h,
              onChange: (c) => p(c.target.value),
              placeholder: s,
              showSearchIcon: !0,
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ t("div", { className: "overflow-y-auto", style: { maxHeight: "14rem" }, children: a.length > 0 ? a.map((c) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: () => x(c.value),
              className: "flex w-full flex-col gap-xs rounded px-sm py-sm text-left transition-colors hover:bg-bg-secondary",
              style: {
                backgroundColor: c.value === e ? "var(--primary-bg)" : void 0
              },
              children: [
                /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: c.label }),
                c.description && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: c.description })
              ]
            },
            c.value
          )) : /* @__PURE__ */ t("div", { className: "rounded py-sm text-center text-base font-light text-text-tertiary", children: u }) })
        ]
      }
    )
  ] });
}
function Lt({ view: e, onViewChange: r }) {
  return /* @__PURE__ */ i(
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
function ce({
  value: e,
  onChange: r,
  label: o,
  placeholder: n = "날짜 선택",
  align: s = "left",
  size: u = "medium",
  clearable: l = !1
}) {
  const [b, d] = T(!1), [m, h] = T(/* @__PURE__ */ new Date()), [p, g] = T("date"), [w, a] = T(() => {
    const v = (/* @__PURE__ */ new Date()).getFullYear();
    return v - v % 12;
  }), x = F(null), c = e ? new Date(e) : null;
  D(() => {
    if (b) {
      const v = c ?? /* @__PURE__ */ new Date();
      h(v), g("date"), a(v.getFullYear() - v.getFullYear() % 12);
    }
  }, [b]), D(() => {
    const v = (C) => {
      x.current && !x.current.contains(C.target) && d(!1);
    };
    return b && document.addEventListener("mousedown", v), () => {
      document.removeEventListener("mousedown", v);
    };
  }, [b]);
  const f = (v) => v.toISOString().split("T")[0], k = (v) => new Date(v).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }), W = (v) => {
    const C = new Date(m.getFullYear(), m.getMonth(), v);
    r(f(C)), d(!1);
  }, R = () => {
    const v = /* @__PURE__ */ new Date();
    h(v), r(f(v)), d(!1);
  }, L = (v) => {
    h(new Date(m.getFullYear(), v, 1)), g("date");
  }, N = (v) => {
    h(new Date(v, m.getMonth(), 1)), g("month");
  }, E = new Date(
    m.getFullYear(),
    m.getMonth() + 1,
    0
  ).getDate(), O = new Date(
    m.getFullYear(),
    m.getMonth(),
    1
  ).getDay(), B = /* @__PURE__ */ new Date();
  B.setHours(0, 0, 0, 0);
  const V = c == null ? void 0 : c.getFullYear(), U = c == null ? void 0 : c.getMonth();
  return /* @__PURE__ */ i("div", { ref: x, className: "relative", children: [
    o && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: o }),
    /* @__PURE__ */ i("div", { className: "relative", children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d((v) => !v),
          className: `flex w-full items-center justify-between rounded border border-border bg-bg-secondary text-base font-medium leading-none text-text-primary ${{
            large: "h-control-lg px-control-px-lg",
            medium: "h-control-md px-control-px-md",
            small: "h-control-sm px-control-px-sm",
            mini: "h-control-mini px-control-px-mini"
          }[u]} ${l && e ? "pr-control-search" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: e ? "text-text-primary" : "text-text-tertiary", children: e ? k(e) : n }),
            /* @__PURE__ */ t(Ne, { className: "h-md w-md text-text-tertiary" })
          ]
        }
      ),
      l && e && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "날짜 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: (v) => {
            v.stopPropagation(), r(""), d(!1);
          },
          children: /* @__PURE__ */ t(ne, { className: "h-md w-md" })
        }
      )
    ] }),
    b && /* @__PURE__ */ i("div", { className: `absolute z-50 mt-sm w-datepicker overflow-hidden rounded border border-border bg-bg-primary shadow-md ${s === "right" ? "right-none" : "left-none"}`, children: [
      /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-border p-md", children: [
        /* @__PURE__ */ t(
          S,
          {
            type: "button",
            onClick: () => {
              if (p === "year") {
                a(w - 12);
                return;
              }
              if (p === "month") {
                h(new Date(m.getFullYear() - 1, m.getMonth(), 1));
                return;
              }
              h(new Date(m.getFullYear(), m.getMonth() - 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "이전",
            children: /* @__PURE__ */ t(ee, { className: "h-md w-md" })
          }
        ),
        p === "date" && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => g("month"),
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              m.getFullYear(),
              "년 ",
              m.getMonth() + 1,
              "월"
            ]
          }
        ),
        p === "month" && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => {
              a(m.getFullYear() - m.getFullYear() % 12), g("year");
            },
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              m.getFullYear(),
              "년"
            ]
          }
        ),
        p === "year" && /* @__PURE__ */ i("div", { className: "flex h-control-md items-center text-lg font-bold text-text-primary", children: [
          w,
          "년 - ",
          w + 11,
          "년"
        ] }),
        /* @__PURE__ */ t(
          S,
          {
            type: "button",
            onClick: () => {
              if (p === "year") {
                a(w + 12);
                return;
              }
              if (p === "month") {
                h(new Date(m.getFullYear() + 1, m.getMonth(), 1));
                return;
              }
              h(new Date(m.getFullYear(), m.getMonth() + 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "다음",
            children: /* @__PURE__ */ t(te, { className: "h-md w-md" })
          }
        )
      ] }),
      p === "date" && /* @__PURE__ */ i(Y, { children: [
        /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-xs p-md pb-sm", children: ["일", "월", "화", "수", "목", "금", "토"].map((v, C) => /* @__PURE__ */ t(
          "div",
          {
            className: `p-sm text-center text-base font-bold ${C === 0 ? "text-error" : C === 6 ? "text-primary" : "text-text-secondary"}`,
            children: v
          },
          v
        )) }),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-7 gap-xs p-md pt-0", children: [
          Array.from({ length: O }).map((v, C) => /* @__PURE__ */ t("div", { className: "h-control-md" }, `empty-${C}`)),
          Array.from({ length: E }).map((v, C) => {
            const y = C + 1, $ = new Date(m.getFullYear(), m.getMonth(), y);
            $.setHours(0, 0, 0, 0);
            const M = c && $.getTime() === c.getTime(), z = $.getTime() === B.getTime();
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => W(y),
                className: `h-control-md rounded text-center text-base font-medium transition-colors ${M ? "bg-primary text-white" : z ? "bg-bg-tertiary text-text-primary" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
                children: y
              },
              y
            );
          })
        ] })
      ] }),
      p === "month" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((v, C) => {
        const y = V === m.getFullYear() && U === C;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => L(C),
            className: `h-control-lg rounded text-base font-medium transition-colors ${y ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: [
              C + 1,
              "월"
            ]
          },
          C
        );
      }) }),
      p === "year" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((v, C) => {
        const y = w + C;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => N(y),
            className: `h-control-lg rounded text-base font-medium transition-colors ${V === y ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: y
          },
          y
        );
      }) }),
      /* @__PURE__ */ t("div", { className: "flex justify-end border-t border-border p-md", children: p === "date" ? /* @__PURE__ */ t(S, { type: "button", onClick: R, children: "오늘" }) : /* @__PURE__ */ t(S, { type: "button", variant: "secondary", onClick: () => g("date"), children: "달력으로 돌아가기" }) })
    ] })
  ] });
}
const G = (e) => String(e).padStart(2, "0"), de = (e) => !e || e < 1 ? 1 : Math.min(e, 60), me = (e, r) => {
  const [o = "00", n = "00", s = "00"] = e.split(":"), u = Number(o), l = Number(n), b = Number(s);
  return {
    hour: Number.isInteger(u) ? Math.min(Math.max(u, 0), 23) : 0,
    minute: Number.isInteger(l) ? Math.min(Math.max(l, 0), 59) : 0,
    second: r && Number.isInteger(b) ? Math.min(Math.max(b, 0), 59) : 0
  };
}, J = (e, r) => {
  const o = `${G(e.hour)}:${G(e.minute)}`;
  return r ? `${o}:${G(e.second)}` : o;
}, Z = (e, r) => {
  const o = [];
  for (let n = 0; n <= e; n += r)
    o.push(n);
  return o;
}, ue = (e, r) => {
  const o = getComputedStyle(document.documentElement), n = o.getPropertyValue(e).trim(), s = Number.parseFloat(n);
  return !Number.isFinite(s) || s <= 0 ? r : n.endsWith("rem") ? s * Number.parseFloat(o.fontSize) : s;
};
function he({
  value: e,
  onChange: r,
  label: o,
  placeholder: n = "시간 선택",
  align: s = "left",
  size: u = "medium",
  disabled: l = !1,
  clearable: b = !1,
  includeSeconds: d = !0,
  minuteStep: m = 1,
  secondStep: h = 1
}) {
  const [p, g] = T(!1), [w, a] = T(() => me(e, d)), [x, c] = T(e), [f, k] = T({ top: 0, left: 0 }), W = F(null), R = F(null), L = de(m), N = de(h), E = _(
    () => Z(59, L),
    [L]
  ), O = _(
    () => Z(59, N),
    [N]
  );
  se(() => {
    p && a(me(e, d));
  }, [d, p, e]), D(() => {
    p || c(e);
  }, [p, e]), D(() => {
    const y = ($) => {
      var X, P;
      const M = $.target, z = (X = W.current) == null ? void 0 : X.contains(M), j = (P = R.current) == null ? void 0 : P.contains(M);
      !z && !j && g(!1);
    };
    return p && document.addEventListener("mousedown", y), () => {
      document.removeEventListener("mousedown", y);
    };
  }, [p]), D(() => {
    if (!p)
      return;
    const y = () => {
      var P;
      const $ = (P = W.current) == null ? void 0 : P.getBoundingClientRect();
      if (!$)
        return;
      const M = ue("--timepicker-width", 288), z = ue("--spacing-sm", 8), j = s === "right" ? $.right - M : $.left, X = window.innerWidth - M - z;
      k({
        top: $.bottom + z,
        left: Math.max(z, Math.min(j, X))
      });
    };
    return y(), window.addEventListener("resize", y), window.addEventListener("scroll", y, !0), () => {
      window.removeEventListener("resize", y), window.removeEventListener("scroll", y, !0);
    };
  }, [s, p]), se(() => {
    if (!p)
      return;
    const y = window.requestAnimationFrame(() => {
      var $;
      ($ = R.current) == null || $.querySelectorAll('[data-time-selected="true"]').forEach((M) => {
        const z = M.closest('[data-time-options="true"]');
        z && (z.scrollTop = M.offsetTop - z.clientHeight / 2 + M.clientHeight / 2);
      });
    });
    return () => {
      window.cancelAnimationFrame(y);
    };
  }, [w.hour, w.minute, w.second, p]);
  const B = {
    large: "h-control-lg px-control-px-lg",
    medium: "h-control-md px-control-px-md",
    small: "h-control-sm px-control-px-sm",
    mini: "h-control-mini px-control-px-mini"
  }, V = (y, $) => {
    const M = {
      ...w,
      [y]: $
    };
    a(M);
    const z = J(M, d);
    c(z), r(z);
  }, U = () => {
    const y = /* @__PURE__ */ new Date(), $ = {
      hour: y.getHours(),
      minute: y.getMinutes(),
      second: d ? y.getSeconds() : 0
    };
    a($);
    const M = J($, d);
    c(M), r(M), g(!1);
  }, ae = () => {
    const y = J(w, d);
    c(y), r(y), g(!1);
  }, v = () => {
    c(""), r(""), g(!1);
  }, C = (y, $, M) => /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
    /* @__PURE__ */ t("div", { className: "px-xs pb-xs text-center text-base font-bold text-text-tertiary", children: y }),
    /* @__PURE__ */ t(
      "div",
      {
        "data-time-options": "true",
        className: "overflow-y-auto",
        style: { maxHeight: "var(--timepicker-options-max-height, 12rem)" },
        children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-xs", children: M.map((z) => {
          const j = w[$] === z;
          return /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-time-selected": j ? "true" : void 0,
              "aria-current": j ? "time" : void 0,
              onClick: () => V($, z),
              className: `h-control-md rounded text-center text-base font-medium transition-colors ${j ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
              children: G(z)
            },
            z
          );
        }) })
      }
    )
  ] });
  return /* @__PURE__ */ i("div", { ref: W, children: [
    o && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: o }),
    /* @__PURE__ */ i("div", { className: "relative", children: [
      /* @__PURE__ */ i(
        "div",
        {
          className: "relative",
          children: [
            /* @__PURE__ */ t(
              "input",
              {
                readOnly: !0,
                tabIndex: -1,
                value: x || "",
                placeholder: n,
                className: `pointer-events-none w-full rounded border border-border bg-bg-secondary pl-control-search pr-control-px-md text-base font-medium leading-none text-text-primary placeholder:text-text-tertiary ${B[u]}`
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
            l || g((y) => !y);
          },
          className: `absolute inset-0 rounded bg-transparent text-left ${l ? "cursor-not-allowed text-text-tertiary" : "cursor-pointer"}`,
          "aria-expanded": p,
          "aria-haspopup": "dialog",
          "aria-label": x || n,
          children: /* @__PURE__ */ t("span", { className: "sr-only", children: x || n })
        }
      ),
      b && e && !l && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "시간 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: v,
          children: /* @__PURE__ */ t(ne, { className: "h-md w-md" })
        }
      ),
      p && $e(
        /* @__PURE__ */ i(
          "div",
          {
            ref: R,
            className: "fixed overflow-hidden rounded border border-border bg-bg-primary shadow-lg",
            style: {
              top: f.top,
              left: f.left,
              width: "var(--timepicker-width, 18rem)",
              zIndex: "var(--layer-popover, 1000)"
            },
            onMouseDown: (y) => y.stopPropagation(),
            children: [
              /* @__PURE__ */ i("div", { className: "flex gap-sm p-sm", children: [
                C("시", "hour", Z(23, 1)),
                C("분", "minute", E),
                d && C("초", "second", O)
              ] }),
              /* @__PURE__ */ i("div", { className: "flex justify-end gap-sm border-t border-border p-sm", children: [
                b && /* @__PURE__ */ t(S, { type: "button", variant: "secondary", size: "small", onClick: v, children: "초기화" }),
                /* @__PURE__ */ t(S, { type: "button", variant: "secondary", size: "small", onClick: U, children: "현재" }),
                /* @__PURE__ */ t(S, { type: "button", size: "small", onClick: ae, children: "확인" })
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
  onStartChange: o,
  onEndChange: n,
  label: s,
  startPlaceholder: u = "시작 시간",
  endPlaceholder: l = "종료 시간",
  separator: b = "To",
  align: d = "left",
  size: m = "medium",
  disabled: h = !1,
  clearable: p = !1,
  includeSeconds: g = !0,
  minuteStep: w = 1,
  secondStep: a = 1
}) {
  return /* @__PURE__ */ i("div", { children: [
    s && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: s }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-md", children: [
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        he,
        {
          value: e,
          onChange: o,
          placeholder: u,
          align: d,
          size: m,
          disabled: h,
          clearable: p,
          includeSeconds: g,
          minuteStep: w,
          secondStep: a
        }
      ) }),
      /* @__PURE__ */ t("span", { className: "shrink-0 text-base font-medium text-text-secondary", children: b }),
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        he,
        {
          value: r,
          onChange: n,
          placeholder: l,
          align: "right",
          size: m,
          disabled: h,
          clearable: p,
          includeSeconds: g,
          minuteStep: w,
          secondStep: a
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
function Rt({
  checked: e,
  onCheckedChange: r,
  label: o,
  description: n,
  disabled: s = !1,
  variant: u = "primary",
  size: l = "medium",
  labelPosition: b = "right",
  className: d = "",
  id: m,
  name: h,
  ariaLabel: p
}) {
  const g = Ze[l], a = /* @__PURE__ */ t(
    "button",
    {
      id: m,
      name: h,
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": p,
      disabled: s,
      onClick: () => {
        s || r(!e);
      },
      className: `inline-flex shrink-0 items-center border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${e ? et[u] : "bg-bg-tertiary"} ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
      style: g.track,
      children: /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "block bg-white shadow-sm transition-transform duration-200 ease-in-out",
          style: {
            ...g.thumb,
            transform: e ? g.checkedTransform : "translateX(0)"
          }
        }
      )
    }
  );
  return !o && !n ? /* @__PURE__ */ t("span", { className: `inline-flex items-center ${d}`, children: a }) : /* @__PURE__ */ i(
    "label",
    {
      className: `inline-flex items-center gap-sm text-base font-medium text-text-primary ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${d}`,
      children: [
        b === "left" && /* @__PURE__ */ i("span", { className: "flex min-w-0 flex-col", children: [
          o && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: o }),
          n && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: n })
        ] }),
        a,
        b === "right" && /* @__PURE__ */ i("span", { className: "flex min-w-0 flex-col", children: [
          o && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: o }),
          n && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: n })
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
function Wt({
  isOpen: e,
  title: r = "요일별 요금 일괄 수정",
  startDate: o,
  endDate: n,
  values: s,
  targetLabel: u,
  rateTypeLabel: l,
  commissionLabel: b,
  previewRows: d = [],
  targetOptions: m = [],
  selectedTargetIds: h = [],
  activeWeekdays: p = [0, 1, 2, 3, 4, 5, 6],
  warningMessage: g,
  disabled: w = !1,
  onTargetToggle: a,
  onWeekdayToggle: x,
  onStartDateChange: c,
  onEndDateChange: f,
  onValueChange: k,
  onSubmit: W,
  onClose: R
}) {
  if (!e) return null;
  const L = (N) => new Intl.NumberFormat("ko-KR").format(N);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-lg",
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      onClick: R,
      children: /* @__PURE__ */ i(
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
          onClick: (N) => N.stopPropagation(),
          children: [
            /* @__PURE__ */ i("div", { className: "mb-lg flex items-center justify-between gap-md", children: [
              /* @__PURE__ */ t(
                "h3",
                {
                  className: "m-none text-2xl",
                  style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)" },
                  children: r
                }
              ),
              /* @__PURE__ */ i("div", { className: "flex shrink-0 gap-md", children: [
                /* @__PURE__ */ i(
                  S,
                  {
                    type: "button",
                    disabled: w,
                    onClick: W,
                    className: "w-modal-action",
                    children: [
                      /* @__PURE__ */ t(Re, { className: "h-icon-md w-icon-md" }),
                      "적용"
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  S,
                  {
                    type: "button",
                    variant: "secondary",
                    onClick: R,
                    className: "w-modal-action",
                    children: "취소"
                  }
                )
              ] })
            ] }),
            g && /* @__PURE__ */ t(Ue, { variant: "warning", title: "확인 필요", className: "mb-lg", children: g }),
            m.length > 0 && /* @__PURE__ */ i("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "일괄 수정 대상"
                }
              ),
              /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-sm", children: m.map((N) => {
                const E = h.includes(N.id);
                return /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    onClick: () => a == null ? void 0 : a(N.id),
                    className: "flex h-control-md items-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors",
                    style: {
                      backgroundColor: E ? "var(--primary)" : "var(--bg-secondary)",
                      borderRadius: "var(--radius)",
                      color: E ? "#ffffff" : "var(--text-primary)",
                      fontWeight: "var(--font-medium)"
                    },
                    children: [
                      N.id,
                      " / ",
                      N.name
                    ]
                  },
                  N.id
                );
              }) })
            ] }),
            /* @__PURE__ */ i("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "기간 선택"
                }
              ),
              /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-md", children: [
                /* @__PURE__ */ t(
                  ce,
                  {
                    label: "시작일",
                    value: o,
                    onChange: c,
                    placeholder: "시작일 선택"
                  }
                ),
                /* @__PURE__ */ t(
                  ce,
                  {
                    label: "종료일",
                    value: n,
                    onChange: f,
                    placeholder: "종료일 선택",
                    align: "right"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "요일별 요금"
                }
              ),
              /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-sm", children: tt.map(({ day: N, label: E }) => {
                const O = p.includes(N);
                return /* @__PURE__ */ i("label", { className: "block", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => x == null ? void 0 : x(N),
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
                      value: s[N] ?? "",
                      onChange: (B) => k(N, B.target.value),
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
                ] }, N);
              }) })
            ] }),
            /* @__PURE__ */ i("div", { className: "mb-lg", children: [
              /* @__PURE__ */ i("div", { className: "mb-sm flex items-center justify-between gap-md", children: [
                /* @__PURE__ */ t(
                  "label",
                  {
                    className: "block text-base",
                    style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                    children: "적용 미리보기"
                  }
                ),
                (l || b) && /* @__PURE__ */ i(
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
                  children: /* @__PURE__ */ i("table", { className: "w-full border-separate border-spacing-0", children: [
                    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { style: { backgroundColor: "var(--bg-secondary)" }, children: [
                      /* @__PURE__ */ t(
                        "th",
                        {
                          className: "px-md py-sm text-left text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: u
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
                    /* @__PURE__ */ t("tbody", { children: d.length === 0 ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t(
                      "td",
                      {
                        colSpan: 6,
                        className: "px-md py-lg text-center text-base",
                        style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                        children: "요일별 금액을 입력하면 계산 결과가 표시됩니다."
                      }
                    ) }) : d.flatMap(
                      (N) => N.cells.map((E, O) => /* @__PURE__ */ i("tr", { children: [
                        /* @__PURE__ */ t(
                          "td",
                          {
                            className: "px-md py-sm text-base",
                            style: {
                              color: "var(--text-primary)",
                              fontWeight: "var(--font-medium)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: O === 0 ? `${N.id} / ${N.name}` : ""
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
                      ] }, `${N.id}-${E.day}`))
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
const H = "CREAMI_THEME", rt = 3600 * 24 * 365, oe = `path=/; max-age=${rt}; SameSite=Lax`;
function pe(e) {
  return e === "dark" || e === "light";
}
function ot() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${H}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function nt() {
  const e = window.location.hostname;
  if (e === "localhost" || e.endsWith(".localhost") || /^\d{1,3}(\.\d{1,3}){3}$/.test(e))
    return;
  const r = e.split(".");
  return r.length > 2 ? `.${r.slice(-2).join(".")}` : void 0;
}
function Se(e) {
  document.cookie = `${H}=${e}; ${oe}`;
  const r = nt();
  r && (document.cookie = `${H}=${e}; ${oe}; domain=${r}`), document.documentElement.setAttribute("data-theme", e), window.dispatchEvent(new CustomEvent("creami-theme-change", { detail: e }));
}
function at() {
  return D(() => {
    const e = ot(), r = pe(e) ? e : "dark";
    pe(e) ? document.documentElement.setAttribute("data-theme", r) : Se(r);
  }, []), null;
}
function jt({ children: e }) {
  const r = `
    (function () {
      try {
        var cookieOptions = '${oe}';
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
  return /* @__PURE__ */ i(Y, { children: [
    /* @__PURE__ */ t("script", { dangerouslySetInnerHTML: { __html: r } }),
    /* @__PURE__ */ t(at, {}),
    e
  ] });
}
function it() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function At() {
  const [e, r] = T("dark"), [o, n] = T(!1);
  if (D(() => {
    r(it()), n(!0);
    const l = (b) => {
      const d = b.detail;
      r(d === "light" ? "light" : "dark");
    };
    return window.addEventListener("creami-theme-change", l), () => {
      window.removeEventListener("creami-theme-change", l);
    };
  }, []), !o)
    return /* @__PURE__ */ t("div", { className: "h-control-md w-control-md" });
  const s = e === "dark", u = s ? "light" : "dark";
  return /* @__PURE__ */ t(
    S,
    {
      type: "button",
      variant: "tertiary",
      size: "normal",
      iconOnly: !0,
      onClick: () => {
        Se(u);
      },
      "aria-label": s ? "라이트 모드로 전환" : "다크 모드로 전환",
      title: s ? "라이트 모드로 전환" : "다크 모드로 전환",
      children: s ? /* @__PURE__ */ t(We, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(je, { className: "h-lg w-lg" })
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
  const [o, n] = T(!1), [s, u] = qe(), l = Q(), b = (d) => {
    n(!1), u(() => {
      document.cookie = `NEXT_LOCALE=${d}; path=/; max-age=31536000; SameSite=Lax`, r == null || r(d);
    });
  };
  return /* @__PURE__ */ i("div", { className: "relative", children: [
    /* @__PURE__ */ t(
      S,
      {
        type: "button",
        variant: "tertiary",
        size: "normal",
        iconOnly: !0,
        onClick: () => n(!o),
        "aria-label": l("language.select"),
        title: l("language.select"),
        disabled: s,
        children: /* @__PURE__ */ t(Ae, { className: "h-lg w-lg" })
      }
    ),
    o && /* @__PURE__ */ i(Y, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => n(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ t("div", { className: "absolute right-0 top-full z-50 mt-xs min-w-[120px] rounded bg-bg-secondary border border-border shadow-lg", children: st.map((d) => /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => b(d),
          disabled: s,
          className: `flex w-full items-center gap-sm px-md py-sm text-left text-base font-medium text-text-primary hover:bg-bg-tertiary transition-colors first:rounded-t last:rounded-b disabled:opacity-50 disabled:cursor-not-allowed ${e === d ? "bg-bg-tertiary" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": "true", children: ct[d] }),
            /* @__PURE__ */ t("span", { children: lt[d] })
          ]
        },
        d
      )) })
    ] })
  ] });
}
function mt() {
  const [e, r] = T(!1), [o] = T(!0), n = Q();
  return /* @__PURE__ */ i("div", { className: "relative", children: [
    /* @__PURE__ */ i(
      S,
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
          /* @__PURE__ */ t(Fe, { className: "h-lg w-lg" }),
          o && /* @__PURE__ */ t("span", { className: "absolute right-[6px] top-[6px] h-[8px] w-[8px] rounded-full bg-primary" })
        ]
      }
    ),
    e && /* @__PURE__ */ i(Y, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => r(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ i("div", { className: "absolute right-0 top-full z-50 mt-xs w-[320px] rounded bg-bg-secondary border border-border shadow-lg", children: [
        /* @__PURE__ */ t("div", { className: "px-md py-sm border-b border-border", children: /* @__PURE__ */ t("h3", { className: "font-bold text-text-primary", children: n("notification.title") }) }),
        /* @__PURE__ */ t("div", { className: "max-h-[400px] overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "px-md py-md text-center text-text-secondary", children: n("notification.empty") }) })
      ] })
    ] })
  ] });
}
const Te = ke(null);
let I = null, be = 0;
const ut = {
  success: ye,
  warning: xe,
  info: ve,
  error: ge
}, ht = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--primary)",
  error: "var(--error)"
};
function pt() {
  return be += 1, `notification-${Date.now()}-${be}`;
}
function bt(e) {
  return e.endsWith("left") ? "left" : "right";
}
function ft(e) {
  const r = e.startsWith("top") ? "top-lg" : "bottom-lg", o = e.endsWith("left") ? "left-lg" : "right-lg";
  return `${r} ${o}`;
}
function gt(e) {
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
  const [o, n] = T(!1), s = ut[e.type], u = e.direction ?? bt(e.placement);
  return D(() => {
    const l = window.setTimeout(() => n(!0), 0);
    return () => window.clearTimeout(l);
  }, []), D(() => {
    if (e.duration <= 0)
      return;
    const l = window.setTimeout(() => r(e.id), e.duration);
    return () => window.clearTimeout(l);
  }, [e.duration, e.id, r]), /* @__PURE__ */ i(
    "div",
    {
      className: `pointer-events-auto flex w-app-switcher items-start gap-md rounded border border-border bg-bg-primary p-md shadow-lg transition-all ${o && !e.isClosing ? "translate-x-0 translate-y-0 opacity-100" : `${gt(u)} opacity-0`}`,
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
        /* @__PURE__ */ i("div", { className: "min-w-none flex-1", children: [
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
            children: /* @__PURE__ */ t(ne, { className: "h-icon-md w-icon-md", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
}
function q({
  placement: e,
  items: r,
  onClose: o
}) {
  if (r.length === 0)
    return null;
  const s = e.startsWith("bottom") ? [...r].reverse() : r;
  return /* @__PURE__ */ t(
    "div",
    {
      className: `pointer-events-none fixed z-[var(--layer-popover)] flex flex-col gap-md ${ft(e)}`,
      children: s.map((u) => /* @__PURE__ */ t(xt, { item: u, onClose: o }, u.id))
    }
  );
}
function A(e) {
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
  const [n, s] = T([]), u = F(/* @__PURE__ */ new Map()), [l, b] = T(!1);
  D(() => {
    b(!0);
  }, []);
  const d = K((a) => {
    s((x) => {
      var f;
      const c = x.find((k) => k.id === a);
      return c && ((f = c.onClose) == null || f.call(c)), x.filter((k) => k.id !== a);
    });
  }, []), m = K((a) => {
    const x = u.current.get(a);
    x && window.clearTimeout(x), s((f) => f.map((k) => k.id === a ? { ...k, isClosing: !0 } : k));
    const c = window.setTimeout(() => {
      d(a), u.current.delete(a);
    }, 200);
    u.current.set(a, c);
  }, [d]), h = K((a) => {
    const x = a.id ?? pt(), c = {
      id: x,
      type: a.type ?? "info",
      title: a.title,
      message: a.message,
      duration: a.duration ?? r,
      placement: a.placement ?? o,
      direction: a.direction,
      showClose: a.showClose ?? !0,
      onClose: a.onClose
    };
    return s((f) => f.some((k) => k.id === x) ? f.map((k) => k.id === x ? c : k) : [...f, c]), x;
  }, [r, o]), p = K(() => {
    s((a) => (a.forEach((x) => {
      var c;
      return (c = x.onClose) == null ? void 0 : c.call(x);
    }), []));
  }, []), g = _(() => ({
    open: h,
    success: (a) => h({ ...a, type: "success" }),
    warning: (a) => h({ ...a, type: "warning" }),
    info: (a) => h({ ...a, type: "info" }),
    error: (a) => h({ ...a, type: "error" }),
    close: m,
    closeAll: p
  }), [m, p, h]);
  D(() => (I = { open: h, close: m, closeAll: p }, () => {
    I = null, u.current.forEach((a) => window.clearTimeout(a)), u.current.clear();
  }), [m, p, h]);
  const w = _(() => ({
    "top-left": n.filter((a) => a.placement === "top-left"),
    "top-right": n.filter((a) => a.placement === "top-right"),
    "bottom-left": n.filter((a) => a.placement === "bottom-left"),
    "bottom-right": n.filter((a) => a.placement === "bottom-right")
  }), [n]);
  return /* @__PURE__ */ i(Te.Provider, { value: g, children: [
    e,
    l && $e(
      /* @__PURE__ */ i(Y, { children: [
        /* @__PURE__ */ t(q, { placement: "top-left", items: w["top-left"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "top-right", items: w["top-right"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "bottom-left", items: w["bottom-left"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "bottom-right", items: w["bottom-right"], onClose: m })
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
  open: (e) => A(I).open(e),
  success: (e) => A(I).success(e),
  warning: (e) => A(I).warning(e),
  info: (e) => A(I).info(e),
  error: (e) => A(I).error(e),
  close: (e) => A(I).close(e),
  closeAll: () => A(I).closeAll()
};
function Yt({
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
function Pt({ children: e, className: r = "", overflow: o = "auto" }) {
  return /* @__PURE__ */ t("div", { className: o === "visible" ? "overflow-visible" : "overflow-x-auto", children: /* @__PURE__ */ t("table", { className: `w-full border-separate border-spacing-0 ${r}`, children: e }) });
}
function _t({
  children: e,
  filterRow: r,
  filtersEnabled: o = !0,
  className: n = ""
}) {
  return /* @__PURE__ */ i("thead", { className: `bg-bg-tertiary border-b-2 border-border ${n}`, children: [
    e,
    o && r
  ] });
}
function Vt({ children: e, className: r = "" }) {
  return /* @__PURE__ */ t("tbody", { className: r, children: e });
}
function Xt({
  children: e,
  onClick: r,
  className: o = "",
  isSelected: n = !1
}) {
  return /* @__PURE__ */ t("tr", { className: `${`transition-all ${n ? "bg-primary-bg border-l border-l-primary" : "bg-bg-primary border-l border-l-transparent"} ${r ? "cursor-pointer hover:bg-bg-secondary" : "cursor-default"}`} ${o}`, onClick: r, children: e });
}
function Kt({
  children: e,
  className: r = "",
  align: o = "left",
  truncate: n = !1,
  titleText: s,
  ...u
}) {
  const l = o === "center" ? "text-center" : o === "right" ? "text-right" : "text-left", b = n ? "max-w-none truncate" : "", d = s ?? (n && typeof e == "string" ? e : void 0);
  return /* @__PURE__ */ t(
    "td",
    {
      className: `px-md py-xs text-base text-text-primary border-b border-border ${l} ${b} ${r}`,
      title: d,
      ...u,
      children: e
    }
  );
}
function qt({
  children: e,
  className: r = "",
  align: o = "left",
  truncate: n = !1,
  titleText: s,
  ...u
}) {
  const l = o === "center" ? "text-center" : o === "right" ? "text-right" : "text-left", b = n ? "max-w-none truncate" : "", d = s ?? (n && typeof e == "string" ? e : void 0);
  return /* @__PURE__ */ t(
    "th",
    {
      className: `px-md py-xs text-base font-bold text-text-primary ${l} ${b} ${r}`,
      title: d,
      ...u,
      children: e
    }
  );
}
function Gt({
  children: e,
  className: r = ""
}) {
  return /* @__PURE__ */ t("tr", { className: `bg-bg-primary ${r}`, children: e });
}
function Qt({
  children: e,
  className: r = "",
  align: o = "left",
  truncate: n = !1,
  titleText: s,
  ...u
}) {
  const l = o === "center" ? "text-center" : o === "right" ? "text-right" : "text-left", b = n ? "max-w-none truncate" : "", d = s ?? (n && typeof e == "string" ? e : void 0);
  return /* @__PURE__ */ t(
    "th",
    {
      className: `px-md py-xs text-base font-medium text-text-primary ${l} ${b} ${r}`,
      title: d,
      ...u,
      children: e
    }
  );
}
function Ut({
  currentPage: e,
  totalPages: r,
  totalElements: o,
  pageSize: n,
  onPageChange: s,
  onPageSizeChange: u,
  pageSizeOptions: l = [10, 25, 50, 100],
  variant: b = "default",
  className: d = ""
}) {
  const m = o === 0 ? 0 : (e - 1) * n + 1, h = Math.min(e * n, o), p = e > 1, g = e < r, w = () => {
    const a = [], c = Math.floor(3.5);
    if (r <= 7)
      for (let f = 1; f <= r; f++)
        a.push(f);
    else if (e <= c + 1) {
      for (let f = 1; f <= 5; f++)
        a.push(f);
      a.push("..."), a.push(r);
    } else if (e >= r - c) {
      a.push(1), a.push("...");
      for (let f = r - 4; f <= r; f++)
        a.push(f);
    } else {
      a.push(1), a.push("...");
      for (let f = e - 1; f <= e + 1; f++)
        a.push(f);
      a.push("..."), a.push(r);
    }
    return a;
  };
  return b === "simple" ? /* @__PURE__ */ t(
    "nav",
    {
      className: `flex w-full justify-center ${d}`,
      "aria-label": "페이지 이동",
      children: /* @__PURE__ */ i("div", { className: "inline-flex max-w-full flex-wrap items-center justify-center gap-xs rounded border border-border bg-bg-primary p-sm shadow-sm", children: [
        /* @__PURE__ */ i(
          S,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => s(e - 1),
            disabled: !p,
            "aria-label": "이전 페이지",
            className: "border border-border bg-bg-primary px-control-px-sm hover:border-primary hover:text-primary disabled:hover:border-border disabled:hover:text-text-tertiary",
            children: [
              /* @__PURE__ */ t(ee, { className: "h-icon-md w-icon-md" }),
              "이전"
            ]
          }
        ),
        w().map((a, x) => {
          if (a === "...")
            return /* @__PURE__ */ t(
              "span",
              {
                className: "flex h-control-sm min-w-control-sm items-center justify-center px-xs text-base text-text-tertiary",
                "aria-hidden": "true",
                children: "..."
              },
              `ellipsis-${x}`
            );
          const c = a, f = c === e;
          return /* @__PURE__ */ t(
            S,
            {
              variant: f ? "primary" : "secondary",
              size: "sm",
              onClick: () => s(c),
              "aria-current": f ? "page" : void 0,
              className: `min-w-control-sm border border-border px-control-px-sm ${f ? "border-primary bg-primary text-white hover:bg-primary-hover" : "bg-bg-primary hover:border-primary hover:text-primary"}`,
              children: c
            },
            c
          );
        }),
        /* @__PURE__ */ i(
          S,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => s(e + 1),
            disabled: !g,
            "aria-label": "다음 페이지",
            className: "border border-border bg-bg-primary px-control-px-sm hover:border-primary hover:text-primary disabled:hover:border-border disabled:hover:text-text-tertiary",
            children: [
              "다음",
              /* @__PURE__ */ t(te, { className: "h-icon-md w-icon-md" })
            ]
          }
        )
      ] })
    }
  ) : /* @__PURE__ */ i("div", { className: `flex items-center justify-between gap-spacing-md ${d}`, children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-spacing-sm text-text-size-sm", children: [
      /* @__PURE__ */ i("span", { className: "text-var-text-secondary", children: [
        o.toLocaleString(),
        "개 중 ",
        m.toLocaleString(),
        "-",
        h.toLocaleString(),
        "번째 표시 중"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-spacing-xs", children: [
        /* @__PURE__ */ t("label", { htmlFor: "page-size", className: "text-var-text-secondary", children: "페이지당:" }),
        /* @__PURE__ */ t(
          "select",
          {
            id: "page-size",
            value: n,
            onChange: (a) => u(Number(a.target.value)),
            className: "bg-var-background border border-var-border rounded-var-radius-md px-spacing-sm py-spacing-xs text-text-size-sm focus:outline-none focus:ring-2 focus:ring-var-primary",
            children: l.map((a) => /* @__PURE__ */ i("option", { value: a, children: [
              a,
              "개"
            ] }, a))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-spacing-xs", children: [
      /* @__PURE__ */ i(
        S,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(e - 1),
          disabled: !p,
          "aria-label": "이전 페이지",
          className: "px-spacing-xs",
          children: [
            /* @__PURE__ */ t(ee, { className: "h-4 w-4" }),
            "이전"
          ]
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-spacing-xs", children: w().map((a, x) => {
        if (a === "...")
          return /* @__PURE__ */ t(
            "span",
            {
              className: "px-spacing-xs text-var-text-secondary",
              children: "..."
            },
            `ellipsis-${x}`
          );
        const c = a, f = c === e;
        return /* @__PURE__ */ t(
          S,
          {
            variant: f ? "primary" : "secondary",
            size: "sm",
            onClick: () => s(c),
            className: `min-w-[2.5rem] ${f ? "bg-var-primary text-white hover:bg-var-primary-hover" : ""}`,
            children: c
          },
          c
        );
      }) }),
      /* @__PURE__ */ i(
        S,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(e + 1),
          disabled: !g,
          "aria-label": "다음 페이지",
          className: "px-spacing-xs",
          children: [
            "다음",
            /* @__PURE__ */ t(te, { className: "h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
}
function Jt({
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
function Zt({ children: e }) {
  return /* @__PURE__ */ t("nav", { className: "h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ t("ul", { className: "flex w-full flex-col gap-xs list-none m-0 p-0", children: e }) });
}
function er({
  icon: e,
  label: r,
  href: o,
  onClick: n,
  isActive: s = !1,
  isCollapsed: u = !1,
  depth: l = 0
}) {
  const b = (p) => {
    n && (p.preventDefault(), n());
  }, d = /* @__PURE__ */ i(Y, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: `absolute left-0 top-0 h-full rounded transition-[width,background-color] duration-300 ${u ? "w-[calc(var(--sidebar-collapsed)-var(--spacing-lg))]" : "w-full"} ${s ? "bg-primary" : "bg-transparent group-hover:bg-bg-tertiary"}`
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: `absolute top-1/2 z-10 flex h-lg w-lg -translate-y-1/2 items-center justify-center ${l === 1 && !u ? "left-lg" : "left-md"}`,
        children: /* @__PURE__ */ t(e, { className: "w-lg h-lg shrink-0" })
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: `pointer-events-none absolute right-md top-1/2 z-10 min-w-0 -translate-y-1/2 truncate whitespace-nowrap ${l === 1 && !u ? "left-[calc(var(--sidebar-collapsed)+var(--spacing-sm))]" : "left-[calc(var(--sidebar-collapsed)-var(--spacing-md))]"}`,
        children: r
      }
    )
  ] }), m = "group w-full rounded", h = `relative flex min-h-2xl w-full items-center bg-transparent text-lg font-medium no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${s ? "text-white" : "text-text-secondary group-hover:text-text-primary"}`;
  return /* @__PURE__ */ t("li", { className: m, children: o ? /* @__PURE__ */ t(
    "a",
    {
      href: o,
      className: h,
      title: r,
      "aria-current": s ? "page" : void 0,
      onClick: b,
      children: d
    }
  ) : /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: `${h} border-0 text-left cursor-pointer w-full`,
      title: r,
      "aria-pressed": s,
      onClick: n,
      children: d
    }
  ) });
}
const Me = ke(void 0), ze = "CREAMI_SIDEBAR_COLLAPSED", yt = 3600 * 24 * 365;
function vt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${ze}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function wt(e) {
  document.cookie = `${ze}=${String(e)}; path=/; max-age=${yt}; SameSite=Lax`;
}
function Nt({ children: e }) {
  const [r, o] = T(!1), [n, s] = T(!1);
  D(() => {
    const l = vt();
    l !== null && o(l === "true"), s(!0);
  }, []), D(() => {
    n && wt(r);
  }, [r, n]);
  const u = () => {
    o((l) => !l);
  };
  return /* @__PURE__ */ t(Me.Provider, { value: { isCollapsed: r, toggleSidebar: u, setIsCollapsed: o }, children: e });
}
function Ee() {
  const e = Ce(Me);
  if (e === void 0)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return e;
}
const fe = {
  Home: _e,
  LayoutDashboard: re,
  BarChart3: Pe,
  Tag: Ye,
  Calendar: Ne,
  ReceiptText: He,
  Settings: Be
};
function kt({ apps: e, currentAppId: r }) {
  const [o, n] = T(!1), s = F(null), u = Q(), l = e.find((h) => h.id === r) ?? e[0], b = fe[l == null ? void 0 : l.icon] ?? re, d = (h) => u(`apps.${h.id}`);
  D(() => {
    const h = (p) => {
      s.current && !s.current.contains(p.target) && n(!1);
    };
    return o && document.addEventListener("mousedown", h), () => {
      document.removeEventListener("mousedown", h);
    };
  }, [o]);
  const m = (h) => {
    window.location.href = h;
  };
  return /* @__PURE__ */ i("div", { className: "relative flex h-full shrink-0 items-center", ref: s, children: [
    /* @__PURE__ */ i(
      S,
      {
        type: "button",
        variant: o ? "tertiary" : "ghost",
        size: "normal",
        onClick: () => n((h) => !h),
        className: "justify-start !text-lg font-medium",
        "aria-expanded": o,
        "aria-haspopup": "menu",
        children: [
          /* @__PURE__ */ t(b, { className: "h-lg w-lg text-primary" }),
          /* @__PURE__ */ t("span", { className: "whitespace-nowrap !text-lg font-medium", children: l ? d(l) : "" }),
          /* @__PURE__ */ t(
            we,
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
        children: /* @__PURE__ */ t("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ i(
          "div",
          {
            className: `max-h-[var(--app-switcher-dropdown-height)] overflow-y-auto rounded border border-border bg-bg-primary p-md shadow-md transition-transform duration-300 ease-in-out ${o ? "translate-y-none" : "-translate-y-sm"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "px-md py-sm text-base font-bold uppercase text-text-tertiary", children: u("appSwitcher.title") }),
              /* @__PURE__ */ t("div", { className: "flex flex-col gap-sm", children: e.map((h) => {
                const p = fe[h.icon] ?? re, g = h.id === (l == null ? void 0 : l.id);
                return /* @__PURE__ */ i(
                  S,
                  {
                    type: "button",
                    variant: g ? "primary" : "ghost",
                    size: "large",
                    fullWidth: !0,
                    onClick: () => m(h.url),
                    className: "h-auto justify-start gap-lg text-left !text-lg font-medium leading-normal",
                    style: {
                      height: "auto",
                      minHeight: "calc(var(--control-height-lg) + var(--spacing-sm))",
                      padding: "var(--spacing-sm) var(--spacing-md)"
                    },
                    role: "menuitem",
                    tabIndex: o ? 0 : -1,
                    children: [
                      /* @__PURE__ */ t("span", { className: "flex h-lg w-lg shrink-0 items-center justify-center", children: /* @__PURE__ */ t(p, { className: "h-lg w-lg" }) }),
                      /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 leading-normal", children: [
                        /* @__PURE__ */ t("span", { className: "block truncate !text-lg font-medium", children: d(h) }),
                        /* @__PURE__ */ t(
                          "span",
                          {
                            className: "block truncate !text-xs font-light text-text-tertiary",
                            children: h.url.replace("http://", "")
                          }
                        )
                      ] }),
                      g && /* @__PURE__ */ t("span", { className: "shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium", children: u("appSwitcher.current") })
                    ]
                  },
                  h.id
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
  currentLocale: o,
  rightSlot: n,
  profileHref: s,
  onLocaleChange: u
}) {
  const { isCollapsed: l, setIsCollapsed: b } = Ee(), [d, m] = T(!1), h = F(null), p = Q(), g = e.find((x) => x.id === "setting"), w = s ?? (g ? `${g.url}/profile` : "/profile"), a = g ? `${g.url}/login` : "/login";
  return D(() => {
    const x = (c) => {
      h.current && !h.current.contains(c.target) && m(!1);
    };
    return d && document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [d]), /* @__PURE__ */ i("header", { className: "fixed left-0 right-0 top-0 z-40 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-primary", children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex h-full shrink-0 items-center gap-sm px-md",
        style: { minWidth: "var(--sidebar-width)" },
        children: [
          /* @__PURE__ */ t(kt, { apps: e, currentAppId: r }),
          /* @__PURE__ */ t(
            S,
            {
              type: "button",
              variant: "tertiary",
              size: "normal",
              iconOnly: !0,
              onClick: () => b(!l),
              "aria-label": p(l ? "sidebar.expand" : "sidebar.collapse"),
              title: p(l ? "sidebar.expand" : "sidebar.collapse"),
              children: l ? /* @__PURE__ */ t(Ve, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Xe, { className: "h-lg w-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex h-full flex-1 items-center justify-end gap-sm px-md", children: [
      /* @__PURE__ */ t(dt, { currentLocale: o, onLocaleChange: u }),
      /* @__PURE__ */ t(mt, {}),
      n ?? /* @__PURE__ */ i("div", { ref: h, className: "relative", children: [
        /* @__PURE__ */ t(
          S,
          {
            type: "button",
            variant: "tertiary",
            size: "normal",
            iconOnly: !0,
            onClick: () => m((x) => !x),
            "aria-label": p("common.profile"),
            "aria-expanded": d,
            "aria-haspopup": "menu",
            title: p("common.profile"),
            children: /* @__PURE__ */ t(ie, { className: "h-lg w-lg" })
          }
        ),
        d && /* @__PURE__ */ i(
          "div",
          {
            className: "absolute right-0 top-full z-50 mt-sm w-[160px] overflow-hidden rounded border border-border bg-bg-primary p-sm shadow-md",
            role: "menu",
            children: [
              /* @__PURE__ */ i(
                "a",
                {
                  href: w,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => m(!1),
                  children: [
                    /* @__PURE__ */ t(ie, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    p("common.profile")
                  ]
                }
              ),
              /* @__PURE__ */ i(
                "a",
                {
                  href: a,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => m(!1),
                  children: [
                    /* @__PURE__ */ t(Ke, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    p("common.logout")
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
  apps: o,
  currentAppId: n,
  currentLocale: s,
  rightSlot: u,
  profileHref: l,
  onLocaleChange: b
}) {
  const { isCollapsed: d } = Ee();
  return /* @__PURE__ */ i("div", { className: "min-h-screen bg-bg-secondary", children: [
    /* @__PURE__ */ t(
      Ct,
      {
        apps: o,
        currentAppId: n,
        currentLocale: s,
        rightSlot: u,
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
          marginLeft: d ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
          padding: "var(--content-padding)"
        },
        children: e
      }
    )
  ] });
}
function tr(e) {
  return /* @__PURE__ */ t(Nt, { children: /* @__PURE__ */ t($t, { ...e }) });
}
export {
  Ue as Alert,
  kt as AppSwitcher,
  S as Button,
  Yt as Card,
  jt as CreamiThemeProvider,
  ce as DatePicker,
  Ct as Header,
  Je as Input,
  dt as LanguageSelector,
  tr as MainLayout,
  mt as NotificationButton,
  Ft as NotificationProvider,
  Ut as Pagination,
  Ot as SearchableSelect,
  Dt as Select,
  Jt as Sidebar,
  Zt as SidebarMenu,
  er as SidebarMenuItem,
  Nt as SidebarProvider,
  Rt as Switch,
  Pt as Table,
  Vt as TableBody,
  Kt as TableCell,
  Qt as TableFilterCell,
  Gt as TableFilterRow,
  qt as TableHead,
  _t as TableHeader,
  Xt as TableRow,
  At as ThemeToggle,
  he as TimePicker,
  It as TimeRangePicker,
  Lt as ViewToggle,
  Wt as WeekdayRateBulkModal,
  Ht as notification,
  Bt as useNotification,
  Ee as useSidebar,
  Se as writeThemeCookie
};
