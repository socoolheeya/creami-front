import { jsx as t, jsxs as a, Fragment as P } from "react/jsx-runtime";
import { XCircle as ve, AlertTriangle as oe, CheckCircle2 as we, Info as Ne, RefreshCw as je, ArrowLeft as We, Search as Ae, ChevronDown as ke, List as Fe, LayoutGrid as Be, Calendar as Ce, X as ae, ChevronLeft as ee, ChevronRight as te, Clock as Ye, Save as He, Sun as Pe, Moon as _e, Languages as Ve, Bell as Xe, Settings as Ke, ReceiptText as qe, Tag as Ge, BarChart3 as Qe, LayoutDashboard as re, Home as Je, PanelLeftOpen as Ze, PanelLeftClose as Ue, User as se, LogOut as et } from "lucide-react";
import $e, { useState as S, useRef as B, useMemo as V, useEffect as D, useLayoutEffect as le, useTransition as tt, createContext as Se, useCallback as K, useContext as Te } from "react";
import { createPortal as Me } from "react-dom";
import { useTranslations as Q } from "next-intl";
function $({
  variant: e = "primary",
  size: r = "medium",
  iconOnly: n = !1,
  fullWidth: o = !1,
  className: s = "",
  children: l,
  disabled: c,
  ...p
}) {
  const h = r === "lg" ? "large" : r === "normal" || r === "md" ? "medium" : r === "sm" ? "small" : r, m = "inline-flex shrink-0 items-center justify-center gap-sm rounded transition-colors box-border m-none border-none text-base leading-none font-medium", u = {
    large: n ? "h-control-lg w-control-lg p-none" : "h-control-lg px-control-px-lg py-none",
    medium: n ? "h-control-md w-control-md p-none" : "h-control-md px-control-px-md py-none",
    small: n ? "h-control-sm w-control-sm p-none" : "h-control-sm px-control-px-sm py-none",
    mini: n ? "h-control-mini w-control-mini p-none" : "h-control-mini px-control-px-mini py-none"
  }, b = {
    primary: c ? "cursor-not-allowed bg-primary text-white opacity-50" : "cursor-pointer bg-primary text-white hover:opacity-90",
    secondary: c ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
    tertiary: c ? "cursor-not-allowed bg-bg-tertiary text-text-tertiary" : "cursor-pointer bg-bg-tertiary text-text-primary hover:bg-bg-secondary",
    ghost: c ? "cursor-not-allowed bg-transparent text-text-tertiary" : "cursor-pointer bg-transparent text-text-primary hover:bg-bg-tertiary"
  }[e], x = o ? "w-full" : "";
  return /* @__PURE__ */ t(
    "button",
    {
      className: `${m} ${u[h]} ${b} ${x} ${s}`,
      disabled: c,
      ...p,
      children: l
    }
  );
}
const rt = {
  info: Ne,
  success: we,
  warning: oe,
  error: ve
}, ce = {
  info: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)"
}, nt = {
  info: "var(--primary-bg)",
  success: "var(--success-bg)",
  warning: "var(--warning-bg)",
  error: "var(--error-bg)"
};
function ot({
  variant: e = "info",
  title: r,
  children: n,
  className: o = ""
}) {
  const s = rt[e];
  return /* @__PURE__ */ a(
    "div",
    {
      className: `flex items-start gap-sm rounded p-md text-base ${o}`,
      style: {
        backgroundColor: nt[e],
        border: `1px solid ${ce[e]}`,
        borderRadius: "var(--radius)",
        color: "var(--text-primary)"
      },
      children: [
        /* @__PURE__ */ t(
          s,
          {
            className: "h-icon-md w-icon-md shrink-0",
            style: { color: ce[e] }
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
function at({
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
function Ft({
  title: e,
  description: r,
  retryLabel: n,
  backLabel: o,
  onRetry: s,
  backHref: l,
  className: c = ""
}) {
  return /* @__PURE__ */ a(
    at,
    {
      className: `flex flex-col items-center justify-center border-error p-2xl text-center ${c}`,
      hover: !1,
      children: [
        /* @__PURE__ */ t("div", { className: "mb-md flex h-control-lg w-control-lg items-center justify-center rounded bg-error-bg text-error", children: /* @__PURE__ */ t(oe, { className: "h-icon-lg w-icon-lg", "aria-hidden": "true" }) }),
        /* @__PURE__ */ t("h2", { className: "mb-xs text-lg font-bold text-text-primary", children: e }),
        r && /* @__PURE__ */ t("p", { className: "mb-lg text-base font-light text-text-secondary", children: r }),
        (s || l) && /* @__PURE__ */ a("div", { className: "flex flex-wrap justify-center gap-sm", children: [
          s && /* @__PURE__ */ a($, { type: "button", onClick: s, children: [
            /* @__PURE__ */ t(je, { className: "h-icon-md w-icon-md", "aria-hidden": "true" }),
            n
          ] }),
          l && /* @__PURE__ */ a(
            "a",
            {
              href: l,
              className: "inline-flex h-control-md shrink-0 items-center justify-center gap-sm rounded bg-bg-secondary px-control-px-md text-base font-medium leading-none text-text-primary no-underline transition-colors hover:bg-bg-tertiary",
              children: [
                /* @__PURE__ */ t(We, { className: "h-icon-md w-icon-md", "aria-hidden": "true" }),
                o
              ]
            }
          )
        ] })
      ]
    }
  );
}
const it = $e.forwardRef(function({
  size: r = "medium",
  showSearchIcon: n = !1,
  className: o = "",
  ...s
}, l) {
  const p = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[r]} rounded border border-border bg-bg-primary text-text-primary box-border font-medium`;
  return n ? /* @__PURE__ */ a("div", { className: "relative w-full", children: [
    /* @__PURE__ */ t(
      "input",
      {
        ref: l,
        className: `${p} pr-control-search ${o}`,
        ...s
      }
    ),
    /* @__PURE__ */ t(Ae, { className: "absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" })
  ] }) : /* @__PURE__ */ t(
    "input",
    {
      ref: l,
      className: `${p} ${o}`,
      ...s
    }
  );
}), Bt = $e.forwardRef(function({
  size: r = "medium",
  className: n = "",
  children: o,
  ...s
}, l) {
  const p = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[r]} rounded border border-border bg-bg-secondary text-text-primary box-border font-medium`;
  return /* @__PURE__ */ t(
    "select",
    {
      ref: l,
      className: `${p} ${n}`,
      ...s,
      children: o
    }
  );
});
function Yt({
  value: e,
  options: r,
  onChange: n,
  placeholder: o = "선택하세요",
  searchPlaceholder: s = "검색어를 입력하세요",
  emptyText: l = "검색 결과가 없습니다",
  disabled: c = !1,
  className: p = ""
}) {
  const [h, m] = S(!1), [u, b] = S(""), x = B(null), g = r.find((d) => d.value === e), i = V(() => {
    const d = u.trim().toLowerCase();
    return d ? r.filter((f) => `${f.label} ${f.description ?? ""} ${f.searchText ?? ""}`.toLowerCase().includes(d)) : r;
  }, [r, u]);
  D(() => {
    const d = (f) => {
      var k;
      (k = x.current) != null && k.contains(f.target) || m(!1);
    };
    return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
  }, []);
  const y = (d) => {
    n(d), b(""), m(!1);
  };
  return /* @__PURE__ */ a("div", { ref: x, className: `relative w-full ${p}`, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        disabled: c,
        onClick: () => {
          c || m((d) => !d);
        },
        className: "flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium",
        children: [
          /* @__PURE__ */ t("span", { className: g ? "text-text-primary" : "text-text-tertiary", children: (g == null ? void 0 : g.label) ?? o }),
          /* @__PURE__ */ t(ke, { className: "h-md w-md shrink-0 text-text-secondary" })
        ]
      }
    ),
    h && /* @__PURE__ */ a(
      "div",
      {
        className: "absolute z-50 mt-xs flex w-full flex-col gap-sm rounded border border-border bg-bg-primary p-sm shadow-lg",
        style: { maxHeight: "20rem" },
        children: [
          /* @__PURE__ */ t(
            it,
            {
              value: u,
              onChange: (d) => b(d.target.value),
              placeholder: s,
              showSearchIcon: !0,
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ t("div", { className: "overflow-y-auto", style: { maxHeight: "14rem" }, children: i.length > 0 ? i.map((d) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: () => y(d.value),
              className: "flex w-full flex-col gap-xs rounded px-sm py-sm text-left transition-colors hover:bg-bg-secondary",
              style: {
                backgroundColor: d.value === e ? "var(--primary-bg)" : void 0
              },
              children: [
                /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: d.label }),
                d.description && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: d.description })
              ]
            },
            d.value
          )) : /* @__PURE__ */ t("div", { className: "rounded py-sm text-center text-base font-light text-text-tertiary", children: l }) })
        ]
      }
    )
  ] });
}
function Ht({ view: e, onViewChange: r }) {
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
            children: /* @__PURE__ */ t(Fe, { className: "w-md h-md" })
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${e === "grid" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ t(Be, { className: "w-md h-md" })
          }
        )
      ]
    }
  );
}
function de(e) {
  const [r, n, o] = e.split("-").map(Number);
  return !r || !n || !o ? null : new Date(r, n - 1, o);
}
function me(e) {
  const r = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${r}-${n}-${o}`;
}
function ue({
  value: e,
  onChange: r,
  label: n,
  placeholder: o = "날짜 선택",
  align: s = "left",
  size: l = "medium",
  clearable: c = !1
}) {
  const [p, h] = S(!1), [m, u] = S(/* @__PURE__ */ new Date()), [b, x] = S("date"), [g, i] = S(() => {
    const v = (/* @__PURE__ */ new Date()).getFullYear();
    return v - v % 12;
  }), y = B(null), d = e ? de(e) : null;
  D(() => {
    if (p) {
      const v = d ?? /* @__PURE__ */ new Date();
      u(v), x("date"), i(v.getFullYear() - v.getFullYear() % 12);
    }
  }, [p]), D(() => {
    const v = (C) => {
      y.current && !y.current.contains(C.target) && h(!1);
    };
    return p && document.addEventListener("mousedown", v), () => {
      document.removeEventListener("mousedown", v);
    };
  }, [p]);
  const f = (v) => {
    const C = de(v);
    return C ? C.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) : v;
  }, k = (v) => {
    const C = new Date(m.getFullYear(), m.getMonth(), v);
    r(me(C)), h(!1);
  }, W = () => {
    const v = /* @__PURE__ */ new Date();
    u(v), r(me(v)), h(!1);
  }, j = (v) => {
    u(new Date(m.getFullYear(), v, 1)), x("date");
  }, I = (v) => {
    u(new Date(v, m.getMonth(), 1)), x("month");
  }, N = new Date(
    m.getFullYear(),
    m.getMonth() + 1,
    0
  ).getDate(), E = new Date(
    m.getFullYear(),
    m.getMonth(),
    1
  ).getDay(), O = /* @__PURE__ */ new Date();
  O.setHours(0, 0, 0, 0);
  const Y = d == null ? void 0 : d.getFullYear(), J = d == null ? void 0 : d.getMonth();
  return /* @__PURE__ */ a("div", { ref: y, className: "relative", children: [
    n && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: n }),
    /* @__PURE__ */ a("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => h((v) => !v),
          className: `flex w-full items-center justify-between rounded border border-border bg-bg-secondary text-base font-medium leading-none text-text-primary ${{
            large: "h-control-lg px-control-px-lg",
            medium: "h-control-md px-control-px-md",
            small: "h-control-sm px-control-px-sm",
            mini: "h-control-mini px-control-px-mini"
          }[l]} ${c && e ? "pr-control-search" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: e ? "text-text-primary" : "text-text-tertiary", children: e ? f(e) : o }),
            /* @__PURE__ */ t(Ce, { className: "h-md w-md text-text-tertiary" })
          ]
        }
      ),
      c && e && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "날짜 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: (v) => {
            v.stopPropagation(), r(""), h(!1);
          },
          children: /* @__PURE__ */ t(ae, { className: "h-md w-md" })
        }
      )
    ] }),
    p && /* @__PURE__ */ a("div", { className: `absolute z-50 mt-sm w-datepicker overflow-hidden rounded border border-border bg-bg-primary shadow-md ${s === "right" ? "right-none" : "left-none"}`, children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between border-b border-border p-md", children: [
        /* @__PURE__ */ t(
          $,
          {
            type: "button",
            onClick: () => {
              if (b === "year") {
                i(g - 12);
                return;
              }
              if (b === "month") {
                u(new Date(m.getFullYear() - 1, m.getMonth(), 1));
                return;
              }
              u(new Date(m.getFullYear(), m.getMonth() - 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "이전",
            children: /* @__PURE__ */ t(ee, { className: "h-md w-md" })
          }
        ),
        b === "date" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => x("month"),
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              m.getFullYear(),
              "년 ",
              m.getMonth() + 1,
              "월"
            ]
          }
        ),
        b === "month" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => {
              i(m.getFullYear() - m.getFullYear() % 12), x("year");
            },
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              m.getFullYear(),
              "년"
            ]
          }
        ),
        b === "year" && /* @__PURE__ */ a("div", { className: "flex h-control-md items-center text-lg font-bold text-text-primary", children: [
          g,
          "년 - ",
          g + 11,
          "년"
        ] }),
        /* @__PURE__ */ t(
          $,
          {
            type: "button",
            onClick: () => {
              if (b === "year") {
                i(g + 12);
                return;
              }
              if (b === "month") {
                u(new Date(m.getFullYear() + 1, m.getMonth(), 1));
                return;
              }
              u(new Date(m.getFullYear(), m.getMonth() + 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "다음",
            children: /* @__PURE__ */ t(te, { className: "h-md w-md" })
          }
        )
      ] }),
      b === "date" && /* @__PURE__ */ a(P, { children: [
        /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-xs p-md pb-sm", children: ["일", "월", "화", "수", "목", "금", "토"].map((v, C) => /* @__PURE__ */ t(
          "div",
          {
            className: `p-sm text-center text-base font-bold ${C === 0 ? "text-error" : C === 6 ? "text-primary" : "text-text-secondary"}`,
            children: v
          },
          v
        )) }),
        /* @__PURE__ */ a("div", { className: "grid grid-cols-7 gap-xs p-md pt-0", children: [
          Array.from({ length: E }).map((v, C) => /* @__PURE__ */ t("div", { className: "h-control-md" }, `empty-${C}`)),
          Array.from({ length: N }).map((v, C) => {
            const L = C + 1, w = new Date(m.getFullYear(), m.getMonth(), L);
            w.setHours(0, 0, 0, 0);
            const T = d && w.getTime() === d.getTime(), M = w.getTime() === O.getTime();
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => k(L),
                className: `h-control-md rounded text-center text-base font-medium transition-colors ${T ? "bg-primary text-white" : M ? "bg-bg-tertiary text-text-primary" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
                children: L
              },
              L
            );
          })
        ] })
      ] }),
      b === "month" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((v, C) => {
        const L = Y === m.getFullYear() && J === C;
        return /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => j(C),
            className: `h-control-lg rounded text-base font-medium transition-colors ${L ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: [
              C + 1,
              "월"
            ]
          },
          C
        );
      }) }),
      b === "year" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((v, C) => {
        const L = g + C;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => I(L),
            className: `h-control-lg rounded text-base font-medium transition-colors ${Y === L ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: L
          },
          L
        );
      }) }),
      /* @__PURE__ */ t("div", { className: "flex justify-end border-t border-border p-md", children: b === "date" ? /* @__PURE__ */ t($, { type: "button", onClick: W, children: "오늘" }) : /* @__PURE__ */ t($, { type: "button", variant: "secondary", onClick: () => x("date"), children: "달력으로 돌아가기" }) })
    ] })
  ] });
}
const G = (e) => String(e).padStart(2, "0"), he = (e) => !e || e < 1 ? 1 : Math.min(e, 60), pe = (e, r) => {
  const [n = "00", o = "00", s = "00"] = e.split(":"), l = Number(n), c = Number(o), p = Number(s);
  return {
    hour: Number.isInteger(l) ? Math.min(Math.max(l, 0), 23) : 0,
    minute: Number.isInteger(c) ? Math.min(Math.max(c, 0), 59) : 0,
    second: r && Number.isInteger(p) ? Math.min(Math.max(p, 0), 59) : 0
  };
}, Z = (e, r) => {
  const n = `${G(e.hour)}:${G(e.minute)}`;
  return r ? `${n}:${G(e.second)}` : n;
}, U = (e, r) => {
  const n = [];
  for (let o = 0; o <= e; o += r)
    n.push(o);
  return n;
}, be = (e, r) => {
  const n = getComputedStyle(document.documentElement), o = n.getPropertyValue(e).trim(), s = Number.parseFloat(o);
  return !Number.isFinite(s) || s <= 0 ? r : o.endsWith("rem") ? s * Number.parseFloat(n.fontSize) : s;
};
function fe({
  value: e,
  onChange: r,
  label: n,
  placeholder: o = "시간 선택",
  align: s = "left",
  size: l = "medium",
  disabled: c = !1,
  clearable: p = !1,
  includeSeconds: h = !0,
  minuteStep: m = 1,
  secondStep: u = 1
}) {
  const [b, x] = S(!1), [g, i] = S(() => pe(e, h)), [y, d] = S(e), [f, k] = S({ top: 0, left: 0 }), W = B(null), j = B(null), I = he(m), N = he(u), E = V(
    () => U(59, I),
    [I]
  ), O = V(
    () => U(59, N),
    [N]
  );
  le(() => {
    b && i(pe(e, h));
  }, [h, b, e]), D(() => {
    b || d(e);
  }, [b, e]), D(() => {
    const w = (T) => {
      var X, _;
      const M = T.target, z = (X = W.current) == null ? void 0 : X.contains(M), A = (_ = j.current) == null ? void 0 : _.contains(M);
      !z && !A && x(!1);
    };
    return b && document.addEventListener("mousedown", w), () => {
      document.removeEventListener("mousedown", w);
    };
  }, [b]), D(() => {
    if (!b)
      return;
    const w = () => {
      var _;
      const T = (_ = W.current) == null ? void 0 : _.getBoundingClientRect();
      if (!T)
        return;
      const M = be("--timepicker-width", 288), z = be("--spacing-sm", 8), A = s === "right" ? T.right - M : T.left, X = window.innerWidth - M - z;
      k({
        top: T.bottom + z,
        left: Math.max(z, Math.min(A, X))
      });
    };
    return w(), window.addEventListener("resize", w), window.addEventListener("scroll", w, !0), () => {
      window.removeEventListener("resize", w), window.removeEventListener("scroll", w, !0);
    };
  }, [s, b]), le(() => {
    if (!b)
      return;
    const w = window.requestAnimationFrame(() => {
      var T;
      (T = j.current) == null || T.querySelectorAll('[data-time-selected="true"]').forEach((M) => {
        const z = M.closest('[data-time-options="true"]');
        z && (z.scrollTop = M.offsetTop - z.clientHeight / 2 + M.clientHeight / 2);
      });
    });
    return () => {
      window.cancelAnimationFrame(w);
    };
  }, [g.hour, g.minute, g.second, b]);
  const Y = {
    large: "h-control-lg px-control-px-lg",
    medium: "h-control-md px-control-px-md",
    small: "h-control-sm px-control-px-sm",
    mini: "h-control-mini px-control-px-mini"
  }, J = (w, T) => {
    const M = {
      ...g,
      [w]: T
    };
    i(M);
    const z = Z(M, h);
    d(z), r(z);
  }, ie = () => {
    const w = /* @__PURE__ */ new Date(), T = {
      hour: w.getHours(),
      minute: w.getMinutes(),
      second: h ? w.getSeconds() : 0
    };
    i(T);
    const M = Z(T, h);
    d(M), r(M), x(!1);
  }, v = () => {
    const w = Z(g, h);
    d(w), r(w), x(!1);
  }, C = () => {
    d(""), r(""), x(!1);
  }, L = (w, T, M) => /* @__PURE__ */ a("div", { className: "min-w-0 flex-1", children: [
    /* @__PURE__ */ t("div", { className: "px-xs pb-xs text-center text-base font-bold text-text-tertiary", children: w }),
    /* @__PURE__ */ t(
      "div",
      {
        "data-time-options": "true",
        className: "overflow-y-auto",
        style: { maxHeight: "var(--timepicker-options-max-height, 12rem)" },
        children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-xs", children: M.map((z) => {
          const A = g[T] === z;
          return /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-time-selected": A ? "true" : void 0,
              "aria-current": A ? "time" : void 0,
              onClick: () => J(T, z),
              className: `h-control-md rounded text-center text-base font-medium transition-colors ${A ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
              children: G(z)
            },
            z
          );
        }) })
      }
    )
  ] });
  return /* @__PURE__ */ a("div", { ref: W, children: [
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
                className: `pointer-events-none w-full rounded border border-border bg-bg-secondary pl-control-search pr-control-px-md text-base font-medium leading-none text-text-primary placeholder:text-text-tertiary ${Y[l]}`
              }
            ),
            /* @__PURE__ */ t(Ye, { className: "pointer-events-none absolute left-md top-1/2 h-md w-md -translate-y-1/2 text-text-tertiary" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          disabled: c,
          onClick: () => {
            c || x((w) => !w);
          },
          className: `absolute inset-0 rounded bg-transparent text-left ${c ? "cursor-not-allowed text-text-tertiary" : "cursor-pointer"}`,
          "aria-expanded": b,
          "aria-haspopup": "dialog",
          "aria-label": y || o,
          children: /* @__PURE__ */ t("span", { className: "sr-only", children: y || o })
        }
      ),
      p && e && !c && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "시간 초기화",
          className: "absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
          onClick: C,
          children: /* @__PURE__ */ t(ae, { className: "h-md w-md" })
        }
      ),
      b && Me(
        /* @__PURE__ */ a(
          "div",
          {
            ref: j,
            className: "fixed overflow-hidden rounded border border-border bg-bg-primary shadow-lg",
            style: {
              top: f.top,
              left: f.left,
              width: "var(--timepicker-width, 18rem)",
              zIndex: "var(--layer-popover, 1000)"
            },
            onMouseDown: (w) => w.stopPropagation(),
            children: [
              /* @__PURE__ */ a("div", { className: "flex gap-sm p-sm", children: [
                L("시", "hour", U(23, 1)),
                L("분", "minute", E),
                h && L("초", "second", O)
              ] }),
              /* @__PURE__ */ a("div", { className: "flex justify-end gap-sm border-t border-border p-sm", children: [
                p && /* @__PURE__ */ t($, { type: "button", variant: "secondary", size: "small", onClick: C, children: "초기화" }),
                /* @__PURE__ */ t($, { type: "button", variant: "secondary", size: "small", onClick: ie, children: "현재" }),
                /* @__PURE__ */ t($, { type: "button", size: "small", onClick: v, children: "확인" })
              ] })
            ]
          }
        ),
        document.body
      )
    ] })
  ] });
}
function Pt({
  startValue: e,
  endValue: r,
  onStartChange: n,
  onEndChange: o,
  label: s,
  startPlaceholder: l = "시작 시간",
  endPlaceholder: c = "종료 시간",
  separator: p = "To",
  align: h = "left",
  size: m = "medium",
  disabled: u = !1,
  clearable: b = !1,
  includeSeconds: x = !0,
  minuteStep: g = 1,
  secondStep: i = 1
}) {
  return /* @__PURE__ */ a("div", { children: [
    s && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: s }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-md", children: [
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        fe,
        {
          value: e,
          onChange: n,
          placeholder: l,
          align: h,
          size: m,
          disabled: u,
          clearable: b,
          includeSeconds: x,
          minuteStep: g,
          secondStep: i
        }
      ) }),
      /* @__PURE__ */ t("span", { className: "shrink-0 text-base font-medium text-text-secondary", children: p }),
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        fe,
        {
          value: r,
          onChange: o,
          placeholder: c,
          align: "right",
          size: m,
          disabled: u,
          clearable: b,
          includeSeconds: x,
          minuteStep: g,
          secondStep: i
        }
      ) })
    ] })
  ] });
}
const st = {
  medium: {
    track: {
      width: "calc(var(--control-height-md) + var(--spacing-lg))",
      height: "var(--control-height-mini)",
      padding: "calc(var(--spacing-xs) / 2)",
      borderRadius: "calc(var(--control-height-mini) * 2)"
    },
    thumb: {
      width: "calc(var(--control-height-mini) - var(--spacing-xs))",
      height: "calc(var(--control-height-mini) - var(--spacing-xs))",
      borderRadius: "calc(var(--control-height-mini) * 2)"
    },
    checkedTransform: "translateX(calc(var(--control-height-md) + var(--spacing-lg) - var(--control-height-mini)))"
  },
  small: {
    track: {
      width: "calc(var(--control-height-sm) + var(--spacing-md))",
      height: "calc(var(--control-height-mini) - var(--spacing-xs))",
      padding: "calc(var(--spacing-xs) / 2)",
      borderRadius: "var(--control-height-mini)"
    },
    thumb: {
      width: "calc(var(--control-height-mini) - var(--spacing-md))",
      height: "calc(var(--control-height-mini) - var(--spacing-md))",
      borderRadius: "var(--control-height-mini)"
    },
    checkedTransform: "translateX(calc(var(--control-height-sm) + var(--spacing-md) - var(--control-height-mini) + var(--spacing-xs)))"
  }
}, lt = {
  primary: "bg-primary",
  success: "bg-success"
};
function _t({
  checked: e,
  onCheckedChange: r,
  label: n,
  description: o,
  disabled: s = !1,
  variant: l = "primary",
  size: c = "medium",
  labelPosition: p = "right",
  className: h = "",
  id: m,
  name: u,
  ariaLabel: b
}) {
  const x = st[c], i = /* @__PURE__ */ t(
    "button",
    {
      id: m,
      name: u,
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": b,
      disabled: s,
      onClick: () => {
        s || r(!e);
      },
      className: `inline-flex shrink-0 items-center border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${e ? lt[l] : "bg-bg-tertiary"} ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
      style: x.track,
      children: /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "block bg-white shadow-sm transition-transform duration-200 ease-in-out",
          style: {
            ...x.thumb,
            transform: e ? x.checkedTransform : "translateX(0)"
          }
        }
      )
    }
  );
  return !n && !o ? /* @__PURE__ */ t("span", { className: `inline-flex items-center ${h}`, children: i }) : /* @__PURE__ */ a(
    "label",
    {
      className: `inline-flex items-center gap-sm text-base font-medium text-text-primary ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${h}`,
      children: [
        p === "left" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
          n && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: n }),
          o && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: o })
        ] }),
        i,
        p === "right" && /* @__PURE__ */ a("span", { className: "flex min-w-0 flex-col", children: [
          n && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: n }),
          o && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: o })
        ] })
      ]
    }
  );
}
const ct = [
  { day: 1, label: "월" },
  { day: 2, label: "화" },
  { day: 3, label: "수" },
  { day: 4, label: "목" },
  { day: 5, label: "금" },
  { day: 6, label: "토" },
  { day: 0, label: "일" }
];
function Vt({
  isOpen: e,
  title: r = "요일별 요금 일괄 수정",
  startDate: n,
  endDate: o,
  values: s,
  targetLabel: l,
  rateTypeLabel: c,
  commissionLabel: p,
  previewRows: h = [],
  targetOptions: m = [],
  selectedTargetIds: u = [],
  activeWeekdays: b = [0, 1, 2, 3, 4, 5, 6],
  warningMessage: x,
  disabled: g = !1,
  onTargetToggle: i,
  onWeekdayToggle: y,
  onStartDateChange: d,
  onEndDateChange: f,
  onValueChange: k,
  onSubmit: W,
  onClose: j
}) {
  if (!e) return null;
  const I = (N) => new Intl.NumberFormat("ko-KR").format(N);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-lg",
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      onClick: j,
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
          onClick: (N) => N.stopPropagation(),
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
                  $,
                  {
                    type: "button",
                    disabled: g,
                    onClick: W,
                    className: "w-modal-action",
                    children: [
                      /* @__PURE__ */ t(He, { className: "h-icon-md w-icon-md" }),
                      "적용"
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  $,
                  {
                    type: "button",
                    variant: "secondary",
                    onClick: j,
                    className: "w-modal-action",
                    children: "취소"
                  }
                )
              ] })
            ] }),
            x && /* @__PURE__ */ t(ot, { variant: "warning", title: "확인 필요", className: "mb-lg", children: x }),
            m.length > 0 && /* @__PURE__ */ a("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "일괄 수정 대상"
                }
              ),
              /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-sm", children: m.map((N) => {
                const E = u.includes(N.id);
                return /* @__PURE__ */ a(
                  "button",
                  {
                    type: "button",
                    onClick: () => i == null ? void 0 : i(N.id),
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
                  ue,
                  {
                    label: "시작일",
                    value: n,
                    onChange: d,
                    placeholder: "시작일 선택"
                  }
                ),
                /* @__PURE__ */ t(
                  ue,
                  {
                    label: "종료일",
                    value: o,
                    onChange: f,
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
              /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-sm", children: ct.map(({ day: N, label: E }) => {
                const O = b.includes(N);
                return /* @__PURE__ */ a("label", { className: "block", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => y == null ? void 0 : y(N),
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
                      onChange: (Y) => k(N, Y.target.value),
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
                (c || p) && /* @__PURE__ */ a(
                  "div",
                  {
                    className: "text-base",
                    style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                    children: [
                      c,
                      c && p ? " · " : "",
                      p
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
                          children: l
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
                    /* @__PURE__ */ t("tbody", { children: h.length === 0 ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t(
                      "td",
                      {
                        colSpan: 6,
                        className: "px-md py-lg text-center text-base",
                        style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                        children: "요일별 금액을 입력하면 계산 결과가 표시됩니다."
                      }
                    ) }) : h.flatMap(
                      (N) => N.cells.map((E, O) => /* @__PURE__ */ a("tr", { children: [
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
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: I(E.inputAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: I(E.sellRate) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: I(E.commissionAmount) }),
                        /* @__PURE__ */ t("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: I(E.netRate) })
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
const H = "CREAMI_THEME", dt = 3600 * 24 * 365, ne = `path=/; max-age=${dt}; SameSite=Lax`;
function xe(e) {
  return e === "dark" || e === "light";
}
function mt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${H}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function ut() {
  const e = window.location.hostname;
  if (e === "localhost" || e.endsWith(".localhost") || /^\d{1,3}(\.\d{1,3}){3}$/.test(e))
    return;
  const r = e.split(".");
  return r.length > 2 ? `.${r.slice(-2).join(".")}` : void 0;
}
function Ee(e) {
  document.cookie = `${H}=${e}; ${ne}`;
  const r = ut();
  r && (document.cookie = `${H}=${e}; ${ne}; domain=${r}`), document.documentElement.setAttribute("data-theme", e), window.dispatchEvent(new CustomEvent("creami-theme-change", { detail: e }));
}
function ht() {
  return D(() => {
    const e = mt(), r = xe(e) ? e : "dark";
    xe(e) ? document.documentElement.setAttribute("data-theme", r) : Ee(r);
  }, []), null;
}
function Xt({ children: e }) {
  const r = `
    (function () {
      try {
        var cookieOptions = '${ne}';
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
    /* @__PURE__ */ t(ht, {}),
    e
  ] });
}
function pt() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function Kt() {
  const [e, r] = S("dark"), [n, o] = S(!1);
  if (D(() => {
    r(pt()), o(!0);
    const c = (p) => {
      const h = p.detail;
      r(h === "light" ? "light" : "dark");
    };
    return window.addEventListener("creami-theme-change", c), () => {
      window.removeEventListener("creami-theme-change", c);
    };
  }, []), !n)
    return /* @__PURE__ */ t("div", { className: "h-control-md w-control-md" });
  const s = e === "dark", l = s ? "light" : "dark";
  return /* @__PURE__ */ t(
    $,
    {
      type: "button",
      variant: "tertiary",
      size: "normal",
      iconOnly: !0,
      onClick: () => {
        Ee(l);
      },
      "aria-label": s ? "라이트 모드로 전환" : "다크 모드로 전환",
      title: s ? "라이트 모드로 전환" : "다크 모드로 전환",
      children: s ? /* @__PURE__ */ t(Pe, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(_e, { className: "h-lg w-lg" })
    }
  );
}
const bt = ["ko", "en", "ja"], ft = {
  ko: "한국어",
  en: "English",
  ja: "日本語"
}, xt = {
  ko: "🇰🇷",
  en: "🇺🇸",
  ja: "🇯🇵"
};
function gt({ currentLocale: e, onLocaleChange: r }) {
  const [n, o] = S(!1), [s, l] = tt(), c = Q(), p = (h) => {
    o(!1), l(() => {
      document.cookie = `NEXT_LOCALE=${h}; path=/; max-age=31536000; SameSite=Lax`, r == null || r(h);
    });
  };
  return /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ t(
      $,
      {
        type: "button",
        variant: "tertiary",
        size: "normal",
        iconOnly: !0,
        onClick: () => o(!n),
        "aria-label": c("language.select"),
        title: c("language.select"),
        disabled: s,
        children: /* @__PURE__ */ t(Ve, { className: "h-lg w-lg" })
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
      /* @__PURE__ */ t("div", { className: "absolute right-0 top-full z-50 mt-xs min-w-[120px] rounded bg-bg-secondary border border-border shadow-lg", children: bt.map((h) => /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => p(h),
          disabled: s,
          className: `flex w-full items-center gap-sm px-md py-sm text-left text-base font-medium text-text-primary hover:bg-bg-tertiary transition-colors first:rounded-t last:rounded-b disabled:opacity-50 disabled:cursor-not-allowed ${e === h ? "bg-bg-tertiary" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": "true", children: xt[h] }),
            /* @__PURE__ */ t("span", { children: ft[h] })
          ]
        },
        h
      )) })
    ] })
  ] });
}
function yt() {
  const [e, r] = S(!1), [n] = S(!0), o = Q();
  return /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ a(
      $,
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
          /* @__PURE__ */ t(Xe, { className: "h-lg w-lg" }),
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
const ze = Se(null);
let R = null, ge = 0;
const vt = {
  success: we,
  warning: oe,
  info: Ne,
  error: ve
}, wt = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--primary)",
  error: "var(--error)"
};
function Nt() {
  return ge += 1, `notification-${Date.now()}-${ge}`;
}
function kt(e) {
  return e.endsWith("left") ? "left" : "right";
}
function Ct(e) {
  const r = e.startsWith("top") ? "top-lg" : "bottom-lg", n = e.endsWith("left") ? "left-lg" : "right-lg";
  return `${r} ${n}`;
}
function $t(e) {
  return {
    left: "-translate-x-full",
    right: "translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full"
  }[e];
}
function St({
  item: e,
  onClose: r
}) {
  const [n, o] = S(!1), s = vt[e.type], l = e.direction ?? kt(e.placement);
  return D(() => {
    const c = window.setTimeout(() => o(!0), 0);
    return () => window.clearTimeout(c);
  }, []), D(() => {
    if (e.duration <= 0)
      return;
    const c = window.setTimeout(() => r(e.id), e.duration);
    return () => window.clearTimeout(c);
  }, [e.duration, e.id, r]), /* @__PURE__ */ a(
    "div",
    {
      className: `pointer-events-auto flex w-app-switcher items-start gap-md rounded border border-border bg-bg-primary p-md shadow-lg transition-all ${n && !e.isClosing ? "translate-x-0 translate-y-0 opacity-100" : `${$t(l)} opacity-0`}`,
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
            style: { color: wt[e.type] },
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
            children: /* @__PURE__ */ t(ae, { className: "h-icon-md w-icon-md", "aria-hidden": "true" })
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
      className: `pointer-events-none fixed z-[var(--layer-popover)] flex flex-col gap-md ${Ct(e)}`,
      children: s.map((l) => /* @__PURE__ */ t(St, { item: l, onClose: n }, l.id))
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
function qt({
  children: e,
  defaultDuration: r = 4500,
  defaultPlacement: n = "top-right"
}) {
  const [o, s] = S([]), l = B(/* @__PURE__ */ new Map()), [c, p] = S(!1);
  D(() => {
    p(!0);
  }, []);
  const h = K((i) => {
    s((y) => {
      var f;
      const d = y.find((k) => k.id === i);
      return d && ((f = d.onClose) == null || f.call(d)), y.filter((k) => k.id !== i);
    });
  }, []), m = K((i) => {
    const y = l.current.get(i);
    y && window.clearTimeout(y), s((f) => f.map((k) => k.id === i ? { ...k, isClosing: !0 } : k));
    const d = window.setTimeout(() => {
      h(i), l.current.delete(i);
    }, 200);
    l.current.set(i, d);
  }, [h]), u = K((i) => {
    const y = i.id ?? Nt(), d = {
      id: y,
      type: i.type ?? "info",
      title: i.title,
      message: i.message,
      duration: i.duration ?? r,
      placement: i.placement ?? n,
      direction: i.direction,
      showClose: i.showClose ?? !0,
      onClose: i.onClose
    };
    return s((f) => f.some((k) => k.id === y) ? f.map((k) => k.id === y ? d : k) : [...f, d]), y;
  }, [r, n]), b = K(() => {
    s((i) => (i.forEach((y) => {
      var d;
      return (d = y.onClose) == null ? void 0 : d.call(y);
    }), []));
  }, []), x = V(() => ({
    open: u,
    success: (i) => u({ ...i, type: "success" }),
    warning: (i) => u({ ...i, type: "warning" }),
    info: (i) => u({ ...i, type: "info" }),
    error: (i) => u({ ...i, type: "error" }),
    close: m,
    closeAll: b
  }), [m, b, u]);
  D(() => (R = { open: u, close: m, closeAll: b }, () => {
    R = null, l.current.forEach((i) => window.clearTimeout(i)), l.current.clear();
  }), [m, b, u]);
  const g = V(() => ({
    "top-left": o.filter((i) => i.placement === "top-left"),
    "top-right": o.filter((i) => i.placement === "top-right"),
    "bottom-left": o.filter((i) => i.placement === "bottom-left"),
    "bottom-right": o.filter((i) => i.placement === "bottom-right")
  }), [o]);
  return /* @__PURE__ */ a(ze.Provider, { value: x, children: [
    e,
    c && Me(
      /* @__PURE__ */ a(P, { children: [
        /* @__PURE__ */ t(q, { placement: "top-left", items: g["top-left"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "top-right", items: g["top-right"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "bottom-left", items: g["bottom-left"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "bottom-right", items: g["bottom-right"], onClose: m })
      ] }),
      document.body
    )
  ] });
}
function Gt() {
  const e = Te(ze);
  if (!e)
    throw new Error("useNotification must be used within NotificationProvider.");
  return e;
}
const De = {
  open: (e) => F(R).open(e),
  success: (e) => F(R).success(e),
  warning: (e) => F(R).warning(e),
  info: (e) => F(R).info(e),
  error: (e) => F(R).error(e),
  close: (e) => F(R).close(e),
  closeAll: () => F(R).closeAll()
}, Le = {
  placement: "top-right",
  direction: "right"
};
function Qt(e, r = {}) {
  return De.success({
    ...Le,
    ...r,
    message: e
  });
}
function Jt(e, r = {}) {
  return De.error({
    ...Le,
    ...r,
    message: e
  });
}
function Zt({ children: e, className: r = "", overflow: n = "auto" }) {
  return /* @__PURE__ */ t("div", { className: n === "visible" ? "overflow-visible" : "overflow-x-auto", children: /* @__PURE__ */ t("table", { className: `w-full border-separate border-spacing-0 ${r}`, children: e }) });
}
function Ut({
  children: e,
  filterRow: r,
  filtersEnabled: n = !0,
  className: o = ""
}) {
  return /* @__PURE__ */ a("thead", { className: `bg-bg-tertiary border-b-2 border-border ${o}`, children: [
    e,
    n && r
  ] });
}
function er({ children: e, className: r = "" }) {
  return /* @__PURE__ */ t("tbody", { className: r, children: e });
}
function tr({
  children: e,
  onClick: r,
  className: n = "",
  isSelected: o = !1,
  ...s
}) {
  return /* @__PURE__ */ t("tr", { className: `${`transition-all ${o ? "bg-primary-bg border-l border-l-primary" : "border-l border-l-transparent"} ${r ? "cursor-pointer hover:bg-bg-secondary" : "cursor-default"}`} ${n}`, onClick: r, ...s, children: e });
}
function rr({
  children: e,
  className: r = "",
  align: n = "left",
  truncate: o = !1,
  titleText: s,
  ...l
}) {
  const c = n === "center" ? "text-center" : n === "right" ? "text-right" : "text-left", p = o ? "max-w-none truncate" : "", h = s ?? (o && typeof e == "string" ? e : void 0);
  return /* @__PURE__ */ t(
    "td",
    {
      className: `px-md py-xs text-base text-text-primary border-b border-border ${c} ${p} ${r}`,
      title: h,
      ...l,
      children: e
    }
  );
}
function nr({
  children: e,
  className: r = "",
  align: n = "left",
  truncate: o = !1,
  titleText: s,
  ...l
}) {
  const c = n === "center" ? "text-center" : n === "right" ? "text-right" : "text-left", p = o ? "max-w-none truncate" : "", h = s ?? (o && typeof e == "string" ? e : void 0);
  return /* @__PURE__ */ t(
    "th",
    {
      className: `bg-bg-tertiary px-md py-xs text-base font-bold text-text-primary ${c} ${p} ${r}`,
      title: h,
      ...l,
      style: { ...l.style, backgroundColor: "var(--bg-tertiary)" },
      children: e
    }
  );
}
function or({
  children: e,
  className: r = ""
}) {
  return /* @__PURE__ */ t("tr", { className: `bg-bg-primary ${r}`, children: e });
}
function ar({
  children: e,
  className: r = "",
  align: n = "left",
  truncate: o = !1,
  titleText: s,
  ...l
}) {
  const c = n === "center" ? "text-center" : n === "right" ? "text-right" : "text-left", p = o ? "max-w-none truncate" : "", h = s ?? (o && typeof e == "string" ? e : void 0);
  return /* @__PURE__ */ t(
    "th",
    {
      className: `px-md py-xs text-base font-medium text-text-primary ${c} ${p} ${r}`,
      title: h,
      ...l,
      style: { ...l.style, backgroundColor: "var(--bg-primary)" },
      children: e
    }
  );
}
function ir({
  colSpan: e,
  children: r,
  variant: n = "empty",
  className: o = "",
  ...s
}) {
  const l = n === "error" ? "text-error" : "text-text-secondary";
  return /* @__PURE__ */ t("tr", { className: `bg-bg-primary ${o}`, ...s, children: /* @__PURE__ */ t(
    "td",
    {
      colSpan: e,
      className: `border-b border-border px-md py-xl text-center text-base font-medium ${l}`,
      children: r
    }
  ) });
}
function sr({
  currentPage: e,
  totalPages: r,
  totalElements: n,
  pageSize: o,
  onPageChange: s,
  onPageSizeChange: l,
  pageSizeOptions: c = [10, 25, 50, 100],
  variant: p = "default",
  className: h = ""
}) {
  const m = n === 0 ? 0 : (e - 1) * o + 1, u = Math.min(e * o, n), b = e > 1, x = e < r, g = () => {
    const i = [], d = Math.floor(3.5);
    if (r <= 7)
      for (let f = 1; f <= r; f++)
        i.push(f);
    else if (e <= d + 1) {
      for (let f = 1; f <= 5; f++)
        i.push(f);
      i.push("..."), i.push(r);
    } else if (e >= r - d) {
      i.push(1), i.push("...");
      for (let f = r - 4; f <= r; f++)
        i.push(f);
    } else {
      i.push(1), i.push("...");
      for (let f = e - 1; f <= e + 1; f++)
        i.push(f);
      i.push("..."), i.push(r);
    }
    return i;
  };
  return p === "simple" ? /* @__PURE__ */ t(
    "nav",
    {
      className: `flex w-full justify-center ${h}`,
      "aria-label": "페이지 이동",
      children: /* @__PURE__ */ a("div", { className: "inline-flex max-w-full flex-wrap items-center justify-center gap-xs rounded border border-border bg-bg-primary p-sm shadow-sm", children: [
        /* @__PURE__ */ a(
          $,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => s(e - 1),
            disabled: !b,
            "aria-label": "이전 페이지",
            className: "border border-border bg-bg-primary px-control-px-sm hover:border-primary hover:text-primary disabled:hover:border-border disabled:hover:text-text-tertiary",
            children: [
              /* @__PURE__ */ t(ee, { className: "h-icon-md w-icon-md" }),
              "이전"
            ]
          }
        ),
        g().map((i, y) => {
          if (i === "...")
            return /* @__PURE__ */ t(
              "span",
              {
                className: "flex h-control-sm min-w-control-sm items-center justify-center px-xs text-base text-text-tertiary",
                "aria-hidden": "true",
                children: "..."
              },
              `ellipsis-${y}`
            );
          const d = i, f = d === e;
          return /* @__PURE__ */ t(
            $,
            {
              variant: f ? "primary" : "secondary",
              size: "sm",
              onClick: () => s(d),
              "aria-current": f ? "page" : void 0,
              className: `min-w-control-sm border border-border px-control-px-sm ${f ? "border-primary bg-primary text-white hover:bg-primary-hover" : "bg-bg-primary hover:border-primary hover:text-primary"}`,
              children: d
            },
            d
          );
        }),
        /* @__PURE__ */ a(
          $,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => s(e + 1),
            disabled: !x,
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
  ) : /* @__PURE__ */ a("div", { className: `flex items-center justify-between gap-spacing-md ${h}`, children: [
    /* @__PURE__ */ a("div", { className: "flex items-center gap-spacing-sm text-text-size-sm", children: [
      /* @__PURE__ */ a("span", { className: "text-var-text-secondary", children: [
        n.toLocaleString(),
        "개 중 ",
        m.toLocaleString(),
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
            onChange: (i) => l(Number(i.target.value)),
            className: "bg-var-background border border-var-border rounded-var-radius-md px-spacing-sm py-spacing-xs text-text-size-sm focus:outline-none focus:ring-2 focus:ring-var-primary",
            children: c.map((i) => /* @__PURE__ */ a("option", { value: i, children: [
              i,
              "개"
            ] }, i))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-spacing-xs", children: [
      /* @__PURE__ */ a(
        $,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(e - 1),
          disabled: !b,
          "aria-label": "이전 페이지",
          className: "px-spacing-xs",
          children: [
            /* @__PURE__ */ t(ee, { className: "h-icon-md w-icon-md" }),
            "이전"
          ]
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-spacing-xs", children: g().map((i, y) => {
        if (i === "...")
          return /* @__PURE__ */ t(
            "span",
            {
              className: "px-spacing-xs text-var-text-secondary",
              children: "..."
            },
            `ellipsis-${y}`
          );
        const d = i, f = d === e;
        return /* @__PURE__ */ t(
          $,
          {
            variant: f ? "primary" : "secondary",
            size: "sm",
            onClick: () => s(d),
            className: `min-w-control-sm ${f ? "bg-var-primary text-white hover:bg-var-primary-hover" : ""}`,
            children: d
          },
          d
        );
      }) }),
      /* @__PURE__ */ a(
        $,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(e + 1),
          disabled: !x,
          "aria-label": "다음 페이지",
          className: "px-spacing-xs",
          children: [
            "다음",
            /* @__PURE__ */ t(te, { className: "h-icon-md w-icon-md" })
          ]
        }
      )
    ] })
  ] });
}
function lr({
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
function cr({ children: e }) {
  return /* @__PURE__ */ t("nav", { className: "h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ t("ul", { className: "flex w-full flex-col gap-xs list-none m-0 p-0", children: e }) });
}
function dr({
  icon: e,
  label: r,
  href: n,
  onClick: o,
  isActive: s = !1,
  isCollapsed: l = !1,
  depth: c = 0
}) {
  const p = (b) => {
    o && (b.preventDefault(), o());
  }, h = /* @__PURE__ */ a(P, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: `absolute left-0 top-0 h-full rounded transition-[width,background-color] duration-300 ${l ? "w-[calc(var(--sidebar-collapsed)-var(--spacing-lg))]" : "w-full"} ${s ? "bg-primary" : "bg-transparent group-hover:bg-bg-tertiary"}`
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: `absolute top-1/2 z-10 flex h-lg w-lg -translate-y-1/2 items-center justify-center ${c === 1 && !l ? "left-lg" : "left-md"}`,
        children: /* @__PURE__ */ t(e, { className: "w-lg h-lg shrink-0" })
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: `pointer-events-none absolute right-md top-1/2 z-10 min-w-0 -translate-y-1/2 truncate whitespace-nowrap ${c === 1 && !l ? "left-[calc(var(--sidebar-collapsed)+var(--spacing-sm))]" : "left-[calc(var(--sidebar-collapsed)-var(--spacing-md))]"}`,
        children: r
      }
    )
  ] }), m = "group w-full rounded", u = `relative flex min-h-2xl w-full items-center bg-transparent text-lg font-medium no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${s ? "text-white" : "text-text-secondary group-hover:text-text-primary"}`;
  return /* @__PURE__ */ t("li", { className: m, children: n ? /* @__PURE__ */ t(
    "a",
    {
      href: n,
      className: u,
      title: r,
      "aria-current": s ? "page" : void 0,
      onClick: p,
      children: h
    }
  ) : /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: `${u} border-0 text-left cursor-pointer w-full`,
      title: r,
      "aria-pressed": s,
      onClick: o,
      children: h
    }
  ) });
}
const Oe = Se(void 0), Ie = "CREAMI_SIDEBAR_COLLAPSED", Tt = 3600 * 24 * 365;
function Mt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${Ie}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function Et(e) {
  document.cookie = `${Ie}=${String(e)}; path=/; max-age=${Tt}; SameSite=Lax`;
}
function zt({ children: e }) {
  const [r, n] = S(!1), [o, s] = S(!1);
  D(() => {
    const c = Mt();
    c !== null && n(c === "true"), s(!0);
  }, []), D(() => {
    o && Et(r);
  }, [r, o]);
  const l = () => {
    n((c) => !c);
  };
  return /* @__PURE__ */ t(Oe.Provider, { value: { isCollapsed: r, toggleSidebar: l, setIsCollapsed: n }, children: e });
}
function Re() {
  const e = Te(Oe);
  if (e === void 0)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return e;
}
const ye = {
  Home: Je,
  LayoutDashboard: re,
  BarChart3: Qe,
  Tag: Ge,
  Calendar: Ce,
  ReceiptText: qe,
  Settings: Ke
};
function Dt({ apps: e, currentAppId: r }) {
  const [n, o] = S(!1), s = B(null), l = Q(), c = e.find((u) => u.id === r) ?? e[0], p = ye[c == null ? void 0 : c.icon] ?? re, h = (u) => l(`apps.${u.id}`);
  D(() => {
    const u = (b) => {
      s.current && !s.current.contains(b.target) && o(!1);
    };
    return n && document.addEventListener("mousedown", u), () => {
      document.removeEventListener("mousedown", u);
    };
  }, [n]);
  const m = (u) => {
    window.location.href = u;
  };
  return /* @__PURE__ */ a("div", { className: "relative flex h-full shrink-0 items-center", ref: s, children: [
    /* @__PURE__ */ a(
      $,
      {
        type: "button",
        variant: n ? "tertiary" : "ghost",
        size: "normal",
        onClick: () => o((u) => !u),
        className: "justify-start !text-lg font-medium",
        "aria-expanded": n,
        "aria-haspopup": "menu",
        children: [
          /* @__PURE__ */ t(p, { className: "h-lg w-lg text-primary" }),
          /* @__PURE__ */ t("span", { className: "whitespace-nowrap !text-lg font-medium", children: c ? h(c) : "" }),
          /* @__PURE__ */ t(
            ke,
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
              /* @__PURE__ */ t("div", { className: "px-md py-sm text-base font-bold uppercase text-text-tertiary", children: l("appSwitcher.title") }),
              /* @__PURE__ */ t("div", { className: "flex flex-col gap-sm", children: e.map((u) => {
                const b = ye[u.icon] ?? re, x = u.id === (c == null ? void 0 : c.id);
                return /* @__PURE__ */ a(
                  $,
                  {
                    type: "button",
                    variant: x ? "primary" : "ghost",
                    size: "large",
                    fullWidth: !0,
                    onClick: () => m(u.url),
                    className: "h-auto justify-start gap-lg text-left !text-lg font-medium leading-normal",
                    style: {
                      height: "auto",
                      minHeight: "calc(var(--control-height-lg) + var(--spacing-sm))",
                      padding: "var(--spacing-sm) var(--spacing-md)"
                    },
                    role: "menuitem",
                    tabIndex: n ? 0 : -1,
                    children: [
                      /* @__PURE__ */ t("span", { className: "flex h-lg w-lg shrink-0 items-center justify-center", children: /* @__PURE__ */ t(b, { className: "h-lg w-lg" }) }),
                      /* @__PURE__ */ a("span", { className: "min-w-0 flex-1 leading-normal", children: [
                        /* @__PURE__ */ t("span", { className: "block truncate !text-lg font-medium", children: h(u) }),
                        /* @__PURE__ */ t(
                          "span",
                          {
                            className: "block truncate !text-xs font-light text-text-tertiary",
                            children: u.url.replace("http://", "")
                          }
                        )
                      ] }),
                      x && /* @__PURE__ */ t("span", { className: "shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium", children: l("appSwitcher.current") })
                    ]
                  },
                  u.id
                );
              }) })
            ]
          }
        ) })
      }
    )
  ] });
}
function Lt({
  apps: e,
  currentAppId: r,
  currentLocale: n,
  rightSlot: o,
  profileHref: s,
  profileUser: l,
  onLocaleChange: c
}) {
  const { isCollapsed: p, setIsCollapsed: h } = Re(), [m, u] = S(!1), b = B(null), x = Q(), g = e.find((f) => f.id === "setting"), i = s ?? (g ? `${g.url}/profile` : "/profile"), y = g ? `${g.url}/logout` : "/logout", d = l ? (l.name.trim() || l.email.trim()).slice(0, 1).toUpperCase() : "";
  return D(() => {
    const f = (k) => {
      b.current && !b.current.contains(k.target) && u(!1);
    };
    return m && document.addEventListener("mousedown", f), () => {
      document.removeEventListener("mousedown", f);
    };
  }, [m]), /* @__PURE__ */ a("header", { className: "fixed left-0 right-0 top-0 z-40 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-primary", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex h-full shrink-0 items-center gap-sm px-md",
        style: { minWidth: "var(--sidebar-width)" },
        children: [
          /* @__PURE__ */ t(Dt, { apps: e, currentAppId: r }),
          /* @__PURE__ */ t(
            $,
            {
              type: "button",
              variant: "tertiary",
              size: "normal",
              iconOnly: !0,
              onClick: () => h(!p),
              "aria-label": x(p ? "sidebar.expand" : "sidebar.collapse"),
              title: x(p ? "sidebar.expand" : "sidebar.collapse"),
              children: p ? /* @__PURE__ */ t(Ze, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Ue, { className: "h-lg w-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "flex h-full flex-1 items-center justify-end gap-sm px-md", children: [
      /* @__PURE__ */ t(gt, { currentLocale: n, onLocaleChange: c }),
      /* @__PURE__ */ t(yt, {}),
      o ?? /* @__PURE__ */ a("div", { ref: b, className: "relative", children: [
        /* @__PURE__ */ t(
          $,
          {
            type: "button",
            variant: "tertiary",
            size: "normal",
            iconOnly: !0,
            onClick: () => u((f) => !f),
            "aria-label": x("common.profile"),
            "aria-expanded": m,
            "aria-haspopup": "menu",
            title: x("common.profile"),
            children: /* @__PURE__ */ t(se, { className: "h-lg w-lg" })
          }
        ),
        m && /* @__PURE__ */ a(
          "div",
          {
            className: "absolute right-0 top-full z-50 mt-sm w-[280px] overflow-hidden rounded border border-border bg-bg-primary p-sm shadow-md",
            role: "menu",
            children: [
              l && /* @__PURE__ */ t("div", { className: "mb-sm border-b border-border px-control-px-md pb-sm", children: /* @__PURE__ */ a("div", { className: "flex items-start gap-sm", children: [
                /* @__PURE__ */ t("span", { className: "flex h-control-md w-control-md shrink-0 items-center justify-center rounded bg-primary text-base font-bold text-white", children: d }),
                /* @__PURE__ */ a("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ t("p", { className: "truncate text-base font-bold text-text-primary", title: l.name, children: l.name }),
                  /* @__PURE__ */ t("p", { className: "truncate text-base font-light text-text-tertiary", title: l.email, children: l.email }),
                  l.status && /* @__PURE__ */ t("span", { className: "mt-xs inline-flex h-control-sm items-center rounded bg-primary-bg px-sm text-xs font-medium text-primary", children: l.status })
                ] })
              ] }) }),
              /* @__PURE__ */ a(
                "a",
                {
                  href: i,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => u(!1),
                  children: [
                    /* @__PURE__ */ t(se, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    x("common.profile")
                  ]
                }
              ),
              /* @__PURE__ */ a(
                "a",
                {
                  href: y,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => u(!1),
                  children: [
                    /* @__PURE__ */ t(et, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    x("common.logout")
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
function Ot({
  children: e,
  sidebar: r,
  apps: n,
  currentAppId: o,
  currentLocale: s,
  rightSlot: l,
  profileHref: c,
  profileUser: p,
  onLocaleChange: h
}) {
  const { isCollapsed: m } = Re();
  return /* @__PURE__ */ a("div", { className: "min-h-screen bg-bg-secondary", children: [
    /* @__PURE__ */ t(
      Lt,
      {
        apps: n,
        currentAppId: o,
        currentLocale: s,
        rightSlot: l,
        profileHref: c,
        profileUser: p,
        onLocaleChange: h
      }
    ),
    r,
    /* @__PURE__ */ t(
      "main",
      {
        className: "mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] transition-[margin-left] duration-300 ease-in-out",
        style: {
          marginLeft: m ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
          padding: "var(--content-padding)"
        },
        children: e
      }
    )
  ] });
}
function mr(e) {
  return /* @__PURE__ */ t(zt, { children: /* @__PURE__ */ t(Ot, { ...e }) });
}
export {
  ot as Alert,
  Dt as AppSwitcher,
  $ as Button,
  at as Card,
  Xt as CreamiThemeProvider,
  ue as DatePicker,
  Ft as ErrorTemplate,
  Lt as Header,
  it as Input,
  gt as LanguageSelector,
  mr as MainLayout,
  yt as NotificationButton,
  qt as NotificationProvider,
  sr as Pagination,
  Yt as SearchableSelect,
  Bt as Select,
  lr as Sidebar,
  cr as SidebarMenu,
  dr as SidebarMenuItem,
  zt as SidebarProvider,
  _t as Switch,
  Zt as Table,
  er as TableBody,
  rr as TableCell,
  ar as TableFilterCell,
  or as TableFilterRow,
  nr as TableHead,
  Ut as TableHeader,
  tr as TableRow,
  ir as TableStateRow,
  Kt as ThemeToggle,
  fe as TimePicker,
  Pt as TimeRangePicker,
  Ht as ViewToggle,
  Vt as WeekdayRateBulkModal,
  De as notification,
  Jt as notifySaveError,
  Qt as notifySaveSuccess,
  Gt as useNotification,
  Re as useSidebar,
  Ee as writeThemeCookie
};
