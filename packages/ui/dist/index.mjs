import { jsx as t, jsxs as i, Fragment as P } from "react/jsx-runtime";
import { XCircle as ye, AlertTriangle as ve, CheckCircle2 as we, Info as Ne, Search as We, ChevronDown as ke, List as je, LayoutGrid as Fe, Calendar as Ce, X as oe, ChevronLeft as ee, ChevronRight as te, Clock as Ae, Save as Be, Sun as He, Moon as Ye, Languages as Pe, Bell as _e, Settings as Ve, ReceiptText as Xe, Tag as Ke, BarChart3 as qe, LayoutDashboard as re, Home as Ge, PanelLeftOpen as Qe, PanelLeftClose as Je, User as ie, LogOut as Ze } from "lucide-react";
import $e, { useState as S, useRef as B, useMemo as V, useEffect as D, useLayoutEffect as se, useTransition as Ue, createContext as Se, useCallback as K, useContext as Te } from "react";
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
  }[e], g = o ? "w-full" : "";
  return /* @__PURE__ */ t(
    "button",
    {
      className: `${m} ${u[h]} ${b} ${g} ${s}`,
      disabled: c,
      ...p,
      children: l
    }
  );
}
const et = {
  info: Ne,
  success: we,
  warning: ve,
  error: ye
}, le = {
  info: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)"
}, tt = {
  info: "var(--primary-bg)",
  success: "var(--success-bg)",
  warning: "var(--warning-bg)",
  error: "var(--error-bg)"
};
function rt({
  variant: e = "info",
  title: r,
  children: n,
  className: o = ""
}) {
  const s = et[e];
  return /* @__PURE__ */ i(
    "div",
    {
      className: `flex items-start gap-sm rounded p-md text-base ${o}`,
      style: {
        backgroundColor: tt[e],
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
          /* @__PURE__ */ t("div", { style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" }, children: n })
        ] })
      ]
    }
  );
}
const nt = $e.forwardRef(function({
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
  return n ? /* @__PURE__ */ i("div", { className: "relative w-full", children: [
    /* @__PURE__ */ t(
      "input",
      {
        ref: l,
        className: `${p} pr-control-search ${o}`,
        ...s
      }
    ),
    /* @__PURE__ */ t(We, { className: "absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" })
  ] }) : /* @__PURE__ */ t(
    "input",
    {
      ref: l,
      className: `${p} ${o}`,
      ...s
    }
  );
}), Wt = $e.forwardRef(function({
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
function jt({
  value: e,
  options: r,
  onChange: n,
  placeholder: o = "선택하세요",
  searchPlaceholder: s = "검색어를 입력하세요",
  emptyText: l = "검색 결과가 없습니다",
  disabled: c = !1,
  className: p = ""
}) {
  const [h, m] = S(!1), [u, b] = S(""), g = B(null), x = r.find((d) => d.value === e), a = V(() => {
    const d = u.trim().toLowerCase();
    return d ? r.filter((f) => `${f.label} ${f.description ?? ""} ${f.searchText ?? ""}`.toLowerCase().includes(d)) : r;
  }, [r, u]);
  D(() => {
    const d = (f) => {
      var k;
      (k = g.current) != null && k.contains(f.target) || m(!1);
    };
    return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
  }, []);
  const y = (d) => {
    n(d), b(""), m(!1);
  };
  return /* @__PURE__ */ i("div", { ref: g, className: `relative w-full ${p}`, children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        disabled: c,
        onClick: () => {
          c || m((d) => !d);
        },
        className: "flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium",
        children: [
          /* @__PURE__ */ t("span", { className: x ? "text-text-primary" : "text-text-tertiary", children: (x == null ? void 0 : x.label) ?? o }),
          /* @__PURE__ */ t(ke, { className: "h-md w-md shrink-0 text-text-secondary" })
        ]
      }
    ),
    h && /* @__PURE__ */ i(
      "div",
      {
        className: "absolute z-50 mt-xs flex w-full flex-col gap-sm rounded border border-border bg-bg-primary p-sm shadow-lg",
        style: { maxHeight: "20rem" },
        children: [
          /* @__PURE__ */ t(
            nt,
            {
              value: u,
              onChange: (d) => b(d.target.value),
              placeholder: s,
              showSearchIcon: !0,
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ t("div", { className: "overflow-y-auto", style: { maxHeight: "14rem" }, children: a.length > 0 ? a.map((d) => /* @__PURE__ */ i(
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
function Ft({ view: e, onViewChange: r }) {
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
            children: /* @__PURE__ */ t(je, { className: "w-md h-md" })
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${e === "grid" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ t(Fe, { className: "w-md h-md" })
          }
        )
      ]
    }
  );
}
function ce(e) {
  const [r, n, o] = e.split("-").map(Number);
  return !r || !n || !o ? null : new Date(r, n - 1, o);
}
function de(e) {
  const r = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${r}-${n}-${o}`;
}
function me({
  value: e,
  onChange: r,
  label: n,
  placeholder: o = "날짜 선택",
  align: s = "left",
  size: l = "medium",
  clearable: c = !1
}) {
  const [p, h] = S(!1), [m, u] = S(/* @__PURE__ */ new Date()), [b, g] = S("date"), [x, a] = S(() => {
    const v = (/* @__PURE__ */ new Date()).getFullYear();
    return v - v % 12;
  }), y = B(null), d = e ? ce(e) : null;
  D(() => {
    if (p) {
      const v = d ?? /* @__PURE__ */ new Date();
      u(v), g("date"), a(v.getFullYear() - v.getFullYear() % 12);
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
    const C = ce(v);
    return C ? C.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) : v;
  }, k = (v) => {
    const C = new Date(m.getFullYear(), m.getMonth(), v);
    r(de(C)), h(!1);
  }, j = () => {
    const v = /* @__PURE__ */ new Date();
    u(v), r(de(v)), h(!1);
  }, W = (v) => {
    u(new Date(m.getFullYear(), v, 1)), g("date");
  }, I = (v) => {
    u(new Date(v, m.getMonth(), 1)), g("month");
  }, N = new Date(
    m.getFullYear(),
    m.getMonth() + 1,
    0
  ).getDate(), E = new Date(
    m.getFullYear(),
    m.getMonth(),
    1
  ).getDay(), L = /* @__PURE__ */ new Date();
  L.setHours(0, 0, 0, 0);
  const H = d == null ? void 0 : d.getFullYear(), J = d == null ? void 0 : d.getMonth();
  return /* @__PURE__ */ i("div", { ref: y, className: "relative", children: [
    n && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: n }),
    /* @__PURE__ */ i("div", { className: "relative", children: [
      /* @__PURE__ */ i(
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
          children: /* @__PURE__ */ t(oe, { className: "h-md w-md" })
        }
      )
    ] }),
    p && /* @__PURE__ */ i("div", { className: `absolute z-50 mt-sm w-datepicker overflow-hidden rounded border border-border bg-bg-primary shadow-md ${s === "right" ? "right-none" : "left-none"}`, children: [
      /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-border p-md", children: [
        /* @__PURE__ */ t(
          $,
          {
            type: "button",
            onClick: () => {
              if (b === "year") {
                a(x - 12);
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
        b === "date" && /* @__PURE__ */ i(
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
        b === "month" && /* @__PURE__ */ i(
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
        b === "year" && /* @__PURE__ */ i("div", { className: "flex h-control-md items-center text-lg font-bold text-text-primary", children: [
          x,
          "년 - ",
          x + 11,
          "년"
        ] }),
        /* @__PURE__ */ t(
          $,
          {
            type: "button",
            onClick: () => {
              if (b === "year") {
                a(x + 12);
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
      b === "date" && /* @__PURE__ */ i(P, { children: [
        /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-xs p-md pb-sm", children: ["일", "월", "화", "수", "목", "금", "토"].map((v, C) => /* @__PURE__ */ t(
          "div",
          {
            className: `p-sm text-center text-base font-bold ${C === 0 ? "text-error" : C === 6 ? "text-primary" : "text-text-secondary"}`,
            children: v
          },
          v
        )) }),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-7 gap-xs p-md pt-0", children: [
          Array.from({ length: E }).map((v, C) => /* @__PURE__ */ t("div", { className: "h-control-md" }, `empty-${C}`)),
          Array.from({ length: N }).map((v, C) => {
            const O = C + 1, w = new Date(m.getFullYear(), m.getMonth(), O);
            w.setHours(0, 0, 0, 0);
            const T = d && w.getTime() === d.getTime(), M = w.getTime() === L.getTime();
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => k(O),
                className: `h-control-md rounded text-center text-base font-medium transition-colors ${T ? "bg-primary text-white" : M ? "bg-bg-tertiary text-text-primary" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
                children: O
              },
              O
            );
          })
        ] })
      ] }),
      b === "month" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((v, C) => {
        const O = H === m.getFullYear() && J === C;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => W(C),
            className: `h-control-lg rounded text-base font-medium transition-colors ${O ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: [
              C + 1,
              "월"
            ]
          },
          C
        );
      }) }),
      b === "year" && /* @__PURE__ */ t("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((v, C) => {
        const O = x + C;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => I(O),
            className: `h-control-lg rounded text-base font-medium transition-colors ${H === O ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: O
          },
          O
        );
      }) }),
      /* @__PURE__ */ t("div", { className: "flex justify-end border-t border-border p-md", children: b === "date" ? /* @__PURE__ */ t($, { type: "button", onClick: j, children: "오늘" }) : /* @__PURE__ */ t($, { type: "button", variant: "secondary", onClick: () => g("date"), children: "달력으로 돌아가기" }) })
    ] })
  ] });
}
const G = (e) => String(e).padStart(2, "0"), ue = (e) => !e || e < 1 ? 1 : Math.min(e, 60), he = (e, r) => {
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
}, pe = (e, r) => {
  const n = getComputedStyle(document.documentElement), o = n.getPropertyValue(e).trim(), s = Number.parseFloat(o);
  return !Number.isFinite(s) || s <= 0 ? r : o.endsWith("rem") ? s * Number.parseFloat(n.fontSize) : s;
};
function be({
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
  const [b, g] = S(!1), [x, a] = S(() => he(e, h)), [y, d] = S(e), [f, k] = S({ top: 0, left: 0 }), j = B(null), W = B(null), I = ue(m), N = ue(u), E = V(
    () => U(59, I),
    [I]
  ), L = V(
    () => U(59, N),
    [N]
  );
  se(() => {
    b && a(he(e, h));
  }, [h, b, e]), D(() => {
    b || d(e);
  }, [b, e]), D(() => {
    const w = (T) => {
      var X, _;
      const M = T.target, z = (X = j.current) == null ? void 0 : X.contains(M), F = (_ = W.current) == null ? void 0 : _.contains(M);
      !z && !F && g(!1);
    };
    return b && document.addEventListener("mousedown", w), () => {
      document.removeEventListener("mousedown", w);
    };
  }, [b]), D(() => {
    if (!b)
      return;
    const w = () => {
      var _;
      const T = (_ = j.current) == null ? void 0 : _.getBoundingClientRect();
      if (!T)
        return;
      const M = pe("--timepicker-width", 288), z = pe("--spacing-sm", 8), F = s === "right" ? T.right - M : T.left, X = window.innerWidth - M - z;
      k({
        top: T.bottom + z,
        left: Math.max(z, Math.min(F, X))
      });
    };
    return w(), window.addEventListener("resize", w), window.addEventListener("scroll", w, !0), () => {
      window.removeEventListener("resize", w), window.removeEventListener("scroll", w, !0);
    };
  }, [s, b]), se(() => {
    if (!b)
      return;
    const w = window.requestAnimationFrame(() => {
      var T;
      (T = W.current) == null || T.querySelectorAll('[data-time-selected="true"]').forEach((M) => {
        const z = M.closest('[data-time-options="true"]');
        z && (z.scrollTop = M.offsetTop - z.clientHeight / 2 + M.clientHeight / 2);
      });
    });
    return () => {
      window.cancelAnimationFrame(w);
    };
  }, [x.hour, x.minute, x.second, b]);
  const H = {
    large: "h-control-lg px-control-px-lg",
    medium: "h-control-md px-control-px-md",
    small: "h-control-sm px-control-px-sm",
    mini: "h-control-mini px-control-px-mini"
  }, J = (w, T) => {
    const M = {
      ...x,
      [w]: T
    };
    a(M);
    const z = Z(M, h);
    d(z), r(z);
  }, ae = () => {
    const w = /* @__PURE__ */ new Date(), T = {
      hour: w.getHours(),
      minute: w.getMinutes(),
      second: h ? w.getSeconds() : 0
    };
    a(T);
    const M = Z(T, h);
    d(M), r(M), g(!1);
  }, v = () => {
    const w = Z(x, h);
    d(w), r(w), g(!1);
  }, C = () => {
    d(""), r(""), g(!1);
  }, O = (w, T, M) => /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
    /* @__PURE__ */ t("div", { className: "px-xs pb-xs text-center text-base font-bold text-text-tertiary", children: w }),
    /* @__PURE__ */ t(
      "div",
      {
        "data-time-options": "true",
        className: "overflow-y-auto",
        style: { maxHeight: "var(--timepicker-options-max-height, 12rem)" },
        children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-xs", children: M.map((z) => {
          const F = x[T] === z;
          return /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-time-selected": F ? "true" : void 0,
              "aria-current": F ? "time" : void 0,
              onClick: () => J(T, z),
              className: `h-control-md rounded text-center text-base font-medium transition-colors ${F ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
              children: G(z)
            },
            z
          );
        }) })
      }
    )
  ] });
  return /* @__PURE__ */ i("div", { ref: j, children: [
    n && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: n }),
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
                value: y || "",
                placeholder: o,
                className: `pointer-events-none w-full rounded border border-border bg-bg-secondary pl-control-search pr-control-px-md text-base font-medium leading-none text-text-primary placeholder:text-text-tertiary ${H[l]}`
              }
            ),
            /* @__PURE__ */ t(Ae, { className: "pointer-events-none absolute left-md top-1/2 h-md w-md -translate-y-1/2 text-text-tertiary" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          disabled: c,
          onClick: () => {
            c || g((w) => !w);
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
          children: /* @__PURE__ */ t(oe, { className: "h-md w-md" })
        }
      ),
      b && Me(
        /* @__PURE__ */ i(
          "div",
          {
            ref: W,
            className: "fixed overflow-hidden rounded border border-border bg-bg-primary shadow-lg",
            style: {
              top: f.top,
              left: f.left,
              width: "var(--timepicker-width, 18rem)",
              zIndex: "var(--layer-popover, 1000)"
            },
            onMouseDown: (w) => w.stopPropagation(),
            children: [
              /* @__PURE__ */ i("div", { className: "flex gap-sm p-sm", children: [
                O("시", "hour", U(23, 1)),
                O("분", "minute", E),
                h && O("초", "second", L)
              ] }),
              /* @__PURE__ */ i("div", { className: "flex justify-end gap-sm border-t border-border p-sm", children: [
                p && /* @__PURE__ */ t($, { type: "button", variant: "secondary", size: "small", onClick: C, children: "초기화" }),
                /* @__PURE__ */ t($, { type: "button", variant: "secondary", size: "small", onClick: ae, children: "현재" }),
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
function At({
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
  includeSeconds: g = !0,
  minuteStep: x = 1,
  secondStep: a = 1
}) {
  return /* @__PURE__ */ i("div", { children: [
    s && /* @__PURE__ */ t("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: s }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-md", children: [
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        be,
        {
          value: e,
          onChange: n,
          placeholder: l,
          align: h,
          size: m,
          disabled: u,
          clearable: b,
          includeSeconds: g,
          minuteStep: x,
          secondStep: a
        }
      ) }),
      /* @__PURE__ */ t("span", { className: "shrink-0 text-base font-medium text-text-secondary", children: p }),
      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t(
        be,
        {
          value: r,
          onChange: o,
          placeholder: c,
          align: "right",
          size: m,
          disabled: u,
          clearable: b,
          includeSeconds: g,
          minuteStep: x,
          secondStep: a
        }
      ) })
    ] })
  ] });
}
const ot = {
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
}, at = {
  primary: "bg-primary",
  success: "bg-success"
};
function Bt({
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
  const g = ot[c], a = /* @__PURE__ */ t(
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
      className: `inline-flex shrink-0 items-center border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${e ? at[l] : "bg-bg-tertiary"} ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
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
  return !n && !o ? /* @__PURE__ */ t("span", { className: `inline-flex items-center ${h}`, children: a }) : /* @__PURE__ */ i(
    "label",
    {
      className: `inline-flex items-center gap-sm text-base font-medium text-text-primary ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${h}`,
      children: [
        p === "left" && /* @__PURE__ */ i("span", { className: "flex min-w-0 flex-col", children: [
          n && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: n }),
          o && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: o })
        ] }),
        a,
        p === "right" && /* @__PURE__ */ i("span", { className: "flex min-w-0 flex-col", children: [
          n && /* @__PURE__ */ t("span", { className: "text-base font-medium text-text-primary", children: n }),
          o && /* @__PURE__ */ t("span", { className: "text-base font-light text-text-tertiary", children: o })
        ] })
      ]
    }
  );
}
const it = [
  { day: 1, label: "월" },
  { day: 2, label: "화" },
  { day: 3, label: "수" },
  { day: 4, label: "목" },
  { day: 5, label: "금" },
  { day: 6, label: "토" },
  { day: 0, label: "일" }
];
function Ht({
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
  warningMessage: g,
  disabled: x = !1,
  onTargetToggle: a,
  onWeekdayToggle: y,
  onStartDateChange: d,
  onEndDateChange: f,
  onValueChange: k,
  onSubmit: j,
  onClose: W
}) {
  if (!e) return null;
  const I = (N) => new Intl.NumberFormat("ko-KR").format(N);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-lg",
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      onClick: W,
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
                  $,
                  {
                    type: "button",
                    disabled: x,
                    onClick: j,
                    className: "w-modal-action",
                    children: [
                      /* @__PURE__ */ t(Be, { className: "h-icon-md w-icon-md" }),
                      "적용"
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  $,
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
            g && /* @__PURE__ */ t(rt, { variant: "warning", title: "확인 필요", className: "mb-lg", children: g }),
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
                const E = u.includes(N.id);
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
                  me,
                  {
                    label: "시작일",
                    value: n,
                    onChange: d,
                    placeholder: "시작일 선택"
                  }
                ),
                /* @__PURE__ */ t(
                  me,
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
            /* @__PURE__ */ i("div", { className: "mb-lg", children: [
              /* @__PURE__ */ t(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "요일별 요금"
                }
              ),
              /* @__PURE__ */ t("div", { className: "grid grid-cols-7 gap-sm", children: it.map(({ day: N, label: E }) => {
                const L = b.includes(N);
                return /* @__PURE__ */ i("label", { className: "block", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => y == null ? void 0 : y(N),
                      className: "mb-xs flex h-control-md w-full items-center justify-center rounded border-none text-base leading-none transition-colors",
                      style: {
                        backgroundColor: L ? "var(--primary)" : "var(--bg-secondary)",
                        borderRadius: "var(--radius)",
                        color: L ? "#ffffff" : "var(--text-tertiary)",
                        fontWeight: "var(--font-bold)"
                      },
                      children: E
                    }
                  ),
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "number",
                      disabled: !L,
                      value: s[N] ?? "",
                      onChange: (H) => k(N, H.target.value),
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
                (c || p) && /* @__PURE__ */ i(
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
                      (N) => N.cells.map((E, L) => /* @__PURE__ */ i("tr", { children: [
                        /* @__PURE__ */ t(
                          "td",
                          {
                            className: "px-md py-sm text-base",
                            style: {
                              color: "var(--text-primary)",
                              fontWeight: "var(--font-medium)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: L === 0 ? `${N.id} / ${N.name}` : ""
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
const Y = "CREAMI_THEME", st = 3600 * 24 * 365, ne = `path=/; max-age=${st}; SameSite=Lax`;
function fe(e) {
  return e === "dark" || e === "light";
}
function lt() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${Y}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function ct() {
  const e = window.location.hostname;
  if (e === "localhost" || e.endsWith(".localhost") || /^\d{1,3}(\.\d{1,3}){3}$/.test(e))
    return;
  const r = e.split(".");
  return r.length > 2 ? `.${r.slice(-2).join(".")}` : void 0;
}
function Ee(e) {
  document.cookie = `${Y}=${e}; ${ne}`;
  const r = ct();
  r && (document.cookie = `${Y}=${e}; ${ne}; domain=${r}`), document.documentElement.setAttribute("data-theme", e), window.dispatchEvent(new CustomEvent("creami-theme-change", { detail: e }));
}
function dt() {
  return D(() => {
    const e = lt(), r = fe(e) ? e : "dark";
    fe(e) ? document.documentElement.setAttribute("data-theme", r) : Ee(r);
  }, []), null;
}
function Yt({ children: e }) {
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
          .find(function (cookie) { return cookie.indexOf('${Y}=') === 0; });
        var theme = themeCookie ? themeCookie.split('=')[1] : null;
        if (theme !== 'dark' && theme !== 'light') {
          theme = 'dark';
        }
        document.cookie = '${Y}=' + theme + '; ' + cookieOptions;
        var sharedDomain = getSharedCookieDomain();
        if (sharedDomain) {
          document.cookie = '${Y}=' + theme + '; ' + cookieOptions + '; domain=' + sharedDomain;
        }
        document.documentElement.setAttribute('data-theme', theme);
      } catch (error) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;
  return /* @__PURE__ */ i(P, { children: [
    /* @__PURE__ */ t("script", { dangerouslySetInnerHTML: { __html: r } }),
    /* @__PURE__ */ t(dt, {}),
    e
  ] });
}
function mt() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function Pt() {
  const [e, r] = S("dark"), [n, o] = S(!1);
  if (D(() => {
    r(mt()), o(!0);
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
      children: s ? /* @__PURE__ */ t(He, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Ye, { className: "h-lg w-lg" })
    }
  );
}
const ut = ["ko", "en", "ja"], ht = {
  ko: "한국어",
  en: "English",
  ja: "日本語"
}, pt = {
  ko: "🇰🇷",
  en: "🇺🇸",
  ja: "🇯🇵"
};
function bt({ currentLocale: e, onLocaleChange: r }) {
  const [n, o] = S(!1), [s, l] = Ue(), c = Q(), p = (h) => {
    o(!1), l(() => {
      document.cookie = `NEXT_LOCALE=${h}; path=/; max-age=31536000; SameSite=Lax`, r == null || r(h);
    });
  };
  return /* @__PURE__ */ i("div", { className: "relative", children: [
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
        children: /* @__PURE__ */ t(Pe, { className: "h-lg w-lg" })
      }
    ),
    n && /* @__PURE__ */ i(P, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => o(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ t("div", { className: "absolute right-0 top-full z-50 mt-xs min-w-[120px] rounded bg-bg-secondary border border-border shadow-lg", children: ut.map((h) => /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => p(h),
          disabled: s,
          className: `flex w-full items-center gap-sm px-md py-sm text-left text-base font-medium text-text-primary hover:bg-bg-tertiary transition-colors first:rounded-t last:rounded-b disabled:opacity-50 disabled:cursor-not-allowed ${e === h ? "bg-bg-tertiary" : ""}`,
          children: [
            /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": "true", children: pt[h] }),
            /* @__PURE__ */ t("span", { children: ht[h] })
          ]
        },
        h
      )) })
    ] })
  ] });
}
function ft() {
  const [e, r] = S(!1), [n] = S(!0), o = Q();
  return /* @__PURE__ */ i("div", { className: "relative", children: [
    /* @__PURE__ */ i(
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
          /* @__PURE__ */ t(_e, { className: "h-lg w-lg" }),
          n && /* @__PURE__ */ t("span", { className: "absolute right-[6px] top-[6px] h-[8px] w-[8px] rounded-full bg-primary" })
        ]
      }
    ),
    e && /* @__PURE__ */ i(P, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => r(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ i("div", { className: "absolute right-0 top-full z-50 mt-xs w-[320px] rounded bg-bg-secondary border border-border shadow-lg", children: [
        /* @__PURE__ */ t("div", { className: "px-md py-sm border-b border-border", children: /* @__PURE__ */ t("h3", { className: "font-bold text-text-primary", children: o("notification.title") }) }),
        /* @__PURE__ */ t("div", { className: "max-h-[400px] overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "px-md py-md text-center text-text-secondary", children: o("notification.empty") }) })
      ] })
    ] })
  ] });
}
const ze = Se(null);
let R = null, ge = 0;
const gt = {
  success: we,
  warning: ve,
  info: Ne,
  error: ye
}, xt = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--primary)",
  error: "var(--error)"
};
function yt() {
  return ge += 1, `notification-${Date.now()}-${ge}`;
}
function vt(e) {
  return e.endsWith("left") ? "left" : "right";
}
function wt(e) {
  const r = e.startsWith("top") ? "top-lg" : "bottom-lg", n = e.endsWith("left") ? "left-lg" : "right-lg";
  return `${r} ${n}`;
}
function Nt(e) {
  return {
    left: "-translate-x-full",
    right: "translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full"
  }[e];
}
function kt({
  item: e,
  onClose: r
}) {
  const [n, o] = S(!1), s = gt[e.type], l = e.direction ?? vt(e.placement);
  return D(() => {
    const c = window.setTimeout(() => o(!0), 0);
    return () => window.clearTimeout(c);
  }, []), D(() => {
    if (e.duration <= 0)
      return;
    const c = window.setTimeout(() => r(e.id), e.duration);
    return () => window.clearTimeout(c);
  }, [e.duration, e.id, r]), /* @__PURE__ */ i(
    "div",
    {
      className: `pointer-events-auto flex w-app-switcher items-start gap-md rounded border border-border bg-bg-primary p-md shadow-lg transition-all ${n && !e.isClosing ? "translate-x-0 translate-y-0 opacity-100" : `${Nt(l)} opacity-0`}`,
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
            style: { color: xt[e.type] },
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
            children: /* @__PURE__ */ t(oe, { className: "h-icon-md w-icon-md", "aria-hidden": "true" })
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
      className: `pointer-events-none fixed z-[var(--layer-popover)] flex flex-col gap-md ${wt(e)}`,
      children: s.map((l) => /* @__PURE__ */ t(kt, { item: l, onClose: n }, l.id))
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
function _t({
  children: e,
  defaultDuration: r = 4500,
  defaultPlacement: n = "top-right"
}) {
  const [o, s] = S([]), l = B(/* @__PURE__ */ new Map()), [c, p] = S(!1);
  D(() => {
    p(!0);
  }, []);
  const h = K((a) => {
    s((y) => {
      var f;
      const d = y.find((k) => k.id === a);
      return d && ((f = d.onClose) == null || f.call(d)), y.filter((k) => k.id !== a);
    });
  }, []), m = K((a) => {
    const y = l.current.get(a);
    y && window.clearTimeout(y), s((f) => f.map((k) => k.id === a ? { ...k, isClosing: !0 } : k));
    const d = window.setTimeout(() => {
      h(a), l.current.delete(a);
    }, 200);
    l.current.set(a, d);
  }, [h]), u = K((a) => {
    const y = a.id ?? yt(), d = {
      id: y,
      type: a.type ?? "info",
      title: a.title,
      message: a.message,
      duration: a.duration ?? r,
      placement: a.placement ?? n,
      direction: a.direction,
      showClose: a.showClose ?? !0,
      onClose: a.onClose
    };
    return s((f) => f.some((k) => k.id === y) ? f.map((k) => k.id === y ? d : k) : [...f, d]), y;
  }, [r, n]), b = K(() => {
    s((a) => (a.forEach((y) => {
      var d;
      return (d = y.onClose) == null ? void 0 : d.call(y);
    }), []));
  }, []), g = V(() => ({
    open: u,
    success: (a) => u({ ...a, type: "success" }),
    warning: (a) => u({ ...a, type: "warning" }),
    info: (a) => u({ ...a, type: "info" }),
    error: (a) => u({ ...a, type: "error" }),
    close: m,
    closeAll: b
  }), [m, b, u]);
  D(() => (R = { open: u, close: m, closeAll: b }, () => {
    R = null, l.current.forEach((a) => window.clearTimeout(a)), l.current.clear();
  }), [m, b, u]);
  const x = V(() => ({
    "top-left": o.filter((a) => a.placement === "top-left"),
    "top-right": o.filter((a) => a.placement === "top-right"),
    "bottom-left": o.filter((a) => a.placement === "bottom-left"),
    "bottom-right": o.filter((a) => a.placement === "bottom-right")
  }), [o]);
  return /* @__PURE__ */ i(ze.Provider, { value: g, children: [
    e,
    c && Me(
      /* @__PURE__ */ i(P, { children: [
        /* @__PURE__ */ t(q, { placement: "top-left", items: x["top-left"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "top-right", items: x["top-right"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "bottom-left", items: x["bottom-left"], onClose: m }),
        /* @__PURE__ */ t(q, { placement: "bottom-right", items: x["bottom-right"], onClose: m })
      ] }),
      document.body
    )
  ] });
}
function Vt() {
  const e = Te(ze);
  if (!e)
    throw new Error("useNotification must be used within NotificationProvider.");
  return e;
}
const De = {
  open: (e) => A(R).open(e),
  success: (e) => A(R).success(e),
  warning: (e) => A(R).warning(e),
  info: (e) => A(R).info(e),
  error: (e) => A(R).error(e),
  close: (e) => A(R).close(e),
  closeAll: () => A(R).closeAll()
}, Oe = {
  placement: "top-right",
  direction: "right"
};
function Xt(e, r = {}) {
  return De.success({
    ...Oe,
    ...r,
    message: e
  });
}
function Kt(e, r = {}) {
  return De.error({
    ...Oe,
    ...r,
    message: e
  });
}
function qt({
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
function Gt({ children: e, className: r = "", overflow: n = "auto" }) {
  return /* @__PURE__ */ t("div", { className: n === "visible" ? "overflow-visible" : "overflow-x-auto", children: /* @__PURE__ */ t("table", { className: `w-full border-separate border-spacing-0 ${r}`, children: e }) });
}
function Qt({
  children: e,
  filterRow: r,
  filtersEnabled: n = !0,
  className: o = ""
}) {
  return /* @__PURE__ */ i("thead", { className: `bg-bg-tertiary border-b-2 border-border ${o}`, children: [
    e,
    n && r
  ] });
}
function Jt({ children: e, className: r = "" }) {
  return /* @__PURE__ */ t("tbody", { className: r, children: e });
}
function Zt({
  children: e,
  onClick: r,
  className: n = "",
  isSelected: o = !1,
  ...s
}) {
  return /* @__PURE__ */ t("tr", { className: `${`transition-all ${o ? "bg-primary-bg border-l border-l-primary" : "border-l border-l-transparent"} ${r ? "cursor-pointer hover:bg-bg-secondary" : "cursor-default"}`} ${n}`, onClick: r, ...s, children: e });
}
function Ut({
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
function er({
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
function tr({
  children: e,
  className: r = ""
}) {
  return /* @__PURE__ */ t("tr", { className: `bg-bg-primary ${r}`, children: e });
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
function nr({
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
function or({
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
  const m = n === 0 ? 0 : (e - 1) * o + 1, u = Math.min(e * o, n), b = e > 1, g = e < r, x = () => {
    const a = [], d = Math.floor(3.5);
    if (r <= 7)
      for (let f = 1; f <= r; f++)
        a.push(f);
    else if (e <= d + 1) {
      for (let f = 1; f <= 5; f++)
        a.push(f);
      a.push("..."), a.push(r);
    } else if (e >= r - d) {
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
  return p === "simple" ? /* @__PURE__ */ t(
    "nav",
    {
      className: `flex w-full justify-center ${h}`,
      "aria-label": "페이지 이동",
      children: /* @__PURE__ */ i("div", { className: "inline-flex max-w-full flex-wrap items-center justify-center gap-xs rounded border border-border bg-bg-primary p-sm shadow-sm", children: [
        /* @__PURE__ */ i(
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
        x().map((a, y) => {
          if (a === "...")
            return /* @__PURE__ */ t(
              "span",
              {
                className: "flex h-control-sm min-w-control-sm items-center justify-center px-xs text-base text-text-tertiary",
                "aria-hidden": "true",
                children: "..."
              },
              `ellipsis-${y}`
            );
          const d = a, f = d === e;
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
        /* @__PURE__ */ i(
          $,
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
  ) : /* @__PURE__ */ i("div", { className: `flex items-center justify-between gap-spacing-md ${h}`, children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-spacing-sm text-text-size-sm", children: [
      /* @__PURE__ */ i("span", { className: "text-var-text-secondary", children: [
        n.toLocaleString(),
        "개 중 ",
        m.toLocaleString(),
        "-",
        u.toLocaleString(),
        "번째 표시 중"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-spacing-xs", children: [
        /* @__PURE__ */ t("label", { htmlFor: "page-size", className: "text-var-text-secondary", children: "페이지당:" }),
        /* @__PURE__ */ t(
          "select",
          {
            id: "page-size",
            value: o,
            onChange: (a) => l(Number(a.target.value)),
            className: "bg-var-background border border-var-border rounded-var-radius-md px-spacing-sm py-spacing-xs text-text-size-sm focus:outline-none focus:ring-2 focus:ring-var-primary",
            children: c.map((a) => /* @__PURE__ */ i("option", { value: a, children: [
              a,
              "개"
            ] }, a))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-spacing-xs", children: [
      /* @__PURE__ */ i(
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
      /* @__PURE__ */ t("div", { className: "flex items-center gap-spacing-xs", children: x().map((a, y) => {
        if (a === "...")
          return /* @__PURE__ */ t(
            "span",
            {
              className: "px-spacing-xs text-var-text-secondary",
              children: "..."
            },
            `ellipsis-${y}`
          );
        const d = a, f = d === e;
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
      /* @__PURE__ */ i(
        $,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(e + 1),
          disabled: !g,
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
function ar({
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
function ir({ children: e }) {
  return /* @__PURE__ */ t("nav", { className: "h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ t("ul", { className: "flex w-full flex-col gap-xs list-none m-0 p-0", children: e }) });
}
function sr({
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
  }, h = /* @__PURE__ */ i(P, { children: [
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
const Le = Se(void 0), Ie = "CREAMI_SIDEBAR_COLLAPSED", Ct = 3600 * 24 * 365;
function $t() {
  var e;
  return ((e = document.cookie.split("; ").find((r) => r.startsWith(`${Ie}=`))) == null ? void 0 : e.split("=")[1]) ?? null;
}
function St(e) {
  document.cookie = `${Ie}=${String(e)}; path=/; max-age=${Ct}; SameSite=Lax`;
}
function Tt({ children: e }) {
  const [r, n] = S(!1), [o, s] = S(!1);
  D(() => {
    const c = $t();
    c !== null && n(c === "true"), s(!0);
  }, []), D(() => {
    o && St(r);
  }, [r, o]);
  const l = () => {
    n((c) => !c);
  };
  return /* @__PURE__ */ t(Le.Provider, { value: { isCollapsed: r, toggleSidebar: l, setIsCollapsed: n }, children: e });
}
function Re() {
  const e = Te(Le);
  if (e === void 0)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return e;
}
const xe = {
  Home: Ge,
  LayoutDashboard: re,
  BarChart3: qe,
  Tag: Ke,
  Calendar: Ce,
  ReceiptText: Xe,
  Settings: Ve
};
function Mt({ apps: e, currentAppId: r }) {
  const [n, o] = S(!1), s = B(null), l = Q(), c = e.find((u) => u.id === r) ?? e[0], p = xe[c == null ? void 0 : c.icon] ?? re, h = (u) => l(`apps.${u.id}`);
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
  return /* @__PURE__ */ i("div", { className: "relative flex h-full shrink-0 items-center", ref: s, children: [
    /* @__PURE__ */ i(
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
        children: /* @__PURE__ */ t("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ i(
          "div",
          {
            className: `max-h-[var(--app-switcher-dropdown-height)] overflow-y-auto rounded border border-border bg-bg-primary p-md shadow-md transition-transform duration-300 ease-in-out ${n ? "translate-y-none" : "-translate-y-sm"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "px-md py-sm text-base font-bold uppercase text-text-tertiary", children: l("appSwitcher.title") }),
              /* @__PURE__ */ t("div", { className: "flex flex-col gap-sm", children: e.map((u) => {
                const b = xe[u.icon] ?? re, g = u.id === (c == null ? void 0 : c.id);
                return /* @__PURE__ */ i(
                  $,
                  {
                    type: "button",
                    variant: g ? "primary" : "ghost",
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
                      /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 leading-normal", children: [
                        /* @__PURE__ */ t("span", { className: "block truncate !text-lg font-medium", children: h(u) }),
                        /* @__PURE__ */ t(
                          "span",
                          {
                            className: "block truncate !text-xs font-light text-text-tertiary",
                            children: u.url.replace("http://", "")
                          }
                        )
                      ] }),
                      g && /* @__PURE__ */ t("span", { className: "shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium", children: l("appSwitcher.current") })
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
function Et({
  apps: e,
  currentAppId: r,
  currentLocale: n,
  rightSlot: o,
  profileHref: s,
  profileUser: l,
  onLocaleChange: c
}) {
  const { isCollapsed: p, setIsCollapsed: h } = Re(), [m, u] = S(!1), b = B(null), g = Q(), x = e.find((f) => f.id === "setting"), a = s ?? (x ? `${x.url}/profile` : "/profile"), y = x ? `${x.url}/logout` : "/logout", d = l ? (l.name.trim() || l.email.trim()).slice(0, 1).toUpperCase() : "";
  return D(() => {
    const f = (k) => {
      b.current && !b.current.contains(k.target) && u(!1);
    };
    return m && document.addEventListener("mousedown", f), () => {
      document.removeEventListener("mousedown", f);
    };
  }, [m]), /* @__PURE__ */ i("header", { className: "fixed left-0 right-0 top-0 z-40 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-primary", children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex h-full shrink-0 items-center gap-sm px-md",
        style: { minWidth: "var(--sidebar-width)" },
        children: [
          /* @__PURE__ */ t(Mt, { apps: e, currentAppId: r }),
          /* @__PURE__ */ t(
            $,
            {
              type: "button",
              variant: "tertiary",
              size: "normal",
              iconOnly: !0,
              onClick: () => h(!p),
              "aria-label": g(p ? "sidebar.expand" : "sidebar.collapse"),
              title: g(p ? "sidebar.expand" : "sidebar.collapse"),
              children: p ? /* @__PURE__ */ t(Qe, { className: "h-lg w-lg" }) : /* @__PURE__ */ t(Je, { className: "h-lg w-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex h-full flex-1 items-center justify-end gap-sm px-md", children: [
      /* @__PURE__ */ t(bt, { currentLocale: n, onLocaleChange: c }),
      /* @__PURE__ */ t(ft, {}),
      o ?? /* @__PURE__ */ i("div", { ref: b, className: "relative", children: [
        /* @__PURE__ */ t(
          $,
          {
            type: "button",
            variant: "tertiary",
            size: "normal",
            iconOnly: !0,
            onClick: () => u((f) => !f),
            "aria-label": g("common.profile"),
            "aria-expanded": m,
            "aria-haspopup": "menu",
            title: g("common.profile"),
            children: /* @__PURE__ */ t(ie, { className: "h-lg w-lg" })
          }
        ),
        m && /* @__PURE__ */ i(
          "div",
          {
            className: "absolute right-0 top-full z-50 mt-sm w-[280px] overflow-hidden rounded border border-border bg-bg-primary p-sm shadow-md",
            role: "menu",
            children: [
              l && /* @__PURE__ */ t("div", { className: "mb-sm border-b border-border px-control-px-md pb-sm", children: /* @__PURE__ */ i("div", { className: "flex items-start gap-sm", children: [
                /* @__PURE__ */ t("span", { className: "flex h-control-md w-control-md shrink-0 items-center justify-center rounded bg-primary text-base font-bold text-white", children: d }),
                /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ t("p", { className: "truncate text-base font-bold text-text-primary", title: l.name, children: l.name }),
                  /* @__PURE__ */ t("p", { className: "truncate text-base font-light text-text-tertiary", title: l.email, children: l.email }),
                  l.status && /* @__PURE__ */ t("span", { className: "mt-xs inline-flex h-control-sm items-center rounded bg-primary-bg px-sm text-xs font-medium text-primary", children: l.status })
                ] })
              ] }) }),
              /* @__PURE__ */ i(
                "a",
                {
                  href: a,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => u(!1),
                  children: [
                    /* @__PURE__ */ t(ie, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    g("common.profile")
                  ]
                }
              ),
              /* @__PURE__ */ i(
                "a",
                {
                  href: y,
                  className: "flex h-control-md items-center gap-sm rounded px-control-px-md text-base font-medium text-text-primary no-underline transition-colors hover:bg-bg-secondary",
                  role: "menuitem",
                  onClick: () => u(!1),
                  children: [
                    /* @__PURE__ */ t(Ze, { className: "h-icon-md w-icon-md text-text-tertiary" }),
                    g("common.logout")
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
function zt({
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
  return /* @__PURE__ */ i("div", { className: "min-h-screen bg-bg-secondary", children: [
    /* @__PURE__ */ t(
      Et,
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
function lr(e) {
  return /* @__PURE__ */ t(Tt, { children: /* @__PURE__ */ t(zt, { ...e }) });
}
export {
  rt as Alert,
  Mt as AppSwitcher,
  $ as Button,
  qt as Card,
  Yt as CreamiThemeProvider,
  me as DatePicker,
  Et as Header,
  nt as Input,
  bt as LanguageSelector,
  lr as MainLayout,
  ft as NotificationButton,
  _t as NotificationProvider,
  or as Pagination,
  jt as SearchableSelect,
  Wt as Select,
  ar as Sidebar,
  ir as SidebarMenu,
  sr as SidebarMenuItem,
  Tt as SidebarProvider,
  Bt as Switch,
  Gt as Table,
  Jt as TableBody,
  Ut as TableCell,
  rr as TableFilterCell,
  tr as TableFilterRow,
  er as TableHead,
  Qt as TableHeader,
  Zt as TableRow,
  nr as TableStateRow,
  Pt as ThemeToggle,
  be as TimePicker,
  At as TimeRangePicker,
  Ft as ViewToggle,
  Ht as WeekdayRateBulkModal,
  De as notification,
  Kt as notifySaveError,
  Xt as notifySaveSuccess,
  Vt as useNotification,
  Re as useSidebar,
  Ee as writeThemeCookie
};
