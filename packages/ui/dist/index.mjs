import { jsx as e, jsxs as n, Fragment as P } from "react/jsx-runtime";
import { XCircle as U, AlertTriangle as q, CheckCircle2 as X, Info as J, Search as Z, ChevronDown as T, LayoutGrid as ee, List as te, Calendar as V, ChevronLeft as re, ChevronRight as ae, Save as oe, Sun as ne, Moon as le, Settings as se, ReceiptText as ie, Tag as de, BarChart3 as ce, LayoutDashboard as I, Home as me, PanelLeftOpen as be, PanelLeftClose as he, User as ue } from "lucide-react";
import { useState as $, useRef as B, useMemo as ge, useEffect as z, createContext as pe, useContext as xe } from "react";
import { useTheme as fe } from "next-themes";
function k({
  variant: t = "primary",
  size: r = "medium",
  iconOnly: a = !1,
  fullWidth: l = !1,
  className: s = "",
  children: i,
  disabled: c,
  ...p
}) {
  const o = r === "lg" ? "large" : r === "normal" || r === "md" ? "medium" : r === "sm" ? "small" : r, b = "inline-flex shrink-0 cursor-pointer items-center justify-center gap-sm rounded transition-colors box-border m-none border-none text-base leading-none font-medium", h = {
    large: a ? "h-control-lg w-control-lg p-none" : "h-control-lg px-control-px-lg py-none",
    medium: a ? "h-control-md w-control-md p-none" : "h-control-md px-control-px-md py-none",
    small: a ? "h-control-sm w-control-sm p-none" : "h-control-sm px-control-px-sm py-none",
    mini: a ? "h-control-mini w-control-mini p-none" : "h-control-mini px-control-px-mini py-none"
  }, y = c ? "bg-bg-tertiary text-text-tertiary cursor-not-allowed" : {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
    tertiary: "bg-bg-tertiary text-text-primary hover:bg-bg-secondary",
    ghost: "bg-transparent text-text-primary hover:bg-bg-tertiary"
  }[t], v = l ? "w-full" : "";
  return /* @__PURE__ */ e(
    "button",
    {
      className: `${b} ${h[o]} ${y} ${v} ${s}`,
      disabled: c,
      ...p,
      children: i
    }
  );
}
const ye = {
  info: J,
  success: X,
  warning: q,
  error: U
}, L = {
  info: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)"
}, ve = {
  info: "var(--primary-bg)",
  success: "var(--success-bg)",
  warning: "var(--warning-bg)",
  error: "var(--error-bg)"
};
function we({
  variant: t = "info",
  title: r,
  children: a,
  className: l = ""
}) {
  const s = ye[t];
  return /* @__PURE__ */ n(
    "div",
    {
      className: `flex items-start gap-sm rounded p-md text-base ${l}`,
      style: {
        backgroundColor: ve[t],
        border: `1px solid ${L[t]}`,
        borderRadius: "var(--radius)",
        color: "var(--text-primary)"
      },
      children: [
        /* @__PURE__ */ e(
          s,
          {
            className: "h-icon-md w-icon-md shrink-0",
            style: { color: L[t] }
          }
        ),
        /* @__PURE__ */ n("div", { className: "flex flex-col gap-xs", children: [
          r && /* @__PURE__ */ e("div", { style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)" }, children: r }),
          /* @__PURE__ */ e("div", { style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" }, children: a })
        ] })
      ]
    }
  );
}
function Ne({
  size: t = "medium",
  showSearchIcon: r = !1,
  className: a = "",
  ...l
}) {
  const i = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[t]} rounded border border-border bg-bg-primary text-text-primary box-border font-medium`;
  return r ? /* @__PURE__ */ n("div", { className: "relative w-full", children: [
    /* @__PURE__ */ e(
      "input",
      {
        className: `${i} pr-control-search ${a}`,
        ...l
      }
    ),
    /* @__PURE__ */ e(Z, { className: "absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" })
  ] }) : /* @__PURE__ */ e(
    "input",
    {
      className: `${i} ${a}`,
      ...l
    }
  );
}
function Re({
  size: t = "medium",
  className: r = "",
  children: a,
  ...l
}) {
  const i = `w-full ${{
    large: "h-control-lg px-control-px-lg text-base leading-none",
    medium: "h-control-md px-control-px-md text-base leading-none",
    small: "h-control-sm px-control-px-sm text-base leading-none",
    mini: "h-control-mini px-control-px-mini text-base leading-none"
  }[t]} rounded border border-border bg-bg-secondary text-text-primary box-border font-medium`;
  return /* @__PURE__ */ e(
    "select",
    {
      className: `${i} ${r}`,
      ...l,
      children: a
    }
  );
}
function je({
  value: t,
  options: r,
  onChange: a,
  placeholder: l = "선택하세요",
  searchPlaceholder: s = "검색어를 입력하세요",
  emptyText: i = "검색 결과가 없습니다",
  disabled: c = !1,
  className: p = ""
}) {
  const [o, b] = $(!1), [h, y] = $(""), v = B(null), N = r.find((m) => m.value === t), S = ge(() => {
    const m = h.trim().toLowerCase();
    return m ? r.filter((D) => `${D.label} ${D.description ?? ""} ${D.searchText ?? ""}`.toLowerCase().includes(m)) : r;
  }, [r, h]);
  z(() => {
    const m = (D) => {
      var M;
      (M = v.current) != null && M.contains(D.target) || b(!1);
    };
    return document.addEventListener("pointerdown", m), () => document.removeEventListener("pointerdown", m);
  }, []);
  const x = (m) => {
    a(m), y(""), b(!1);
  };
  return /* @__PURE__ */ n("div", { ref: v, className: `relative w-full ${p}`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        disabled: c,
        onClick: () => {
          c || b((m) => !m);
        },
        className: "flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium",
        children: [
          /* @__PURE__ */ e("span", { className: N ? "text-text-primary" : "text-text-tertiary", children: (N == null ? void 0 : N.label) ?? l }),
          /* @__PURE__ */ e(T, { className: "h-md w-md shrink-0 text-text-secondary" })
        ]
      }
    ),
    o && /* @__PURE__ */ n(
      "div",
      {
        className: "absolute z-50 mt-xs flex w-full flex-col gap-sm rounded border border-border bg-bg-primary p-sm shadow-lg",
        style: { maxHeight: "20rem" },
        children: [
          /* @__PURE__ */ e(
            Ne,
            {
              value: h,
              onChange: (m) => y(m.target.value),
              placeholder: s,
              showSearchIcon: !0,
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ e("div", { className: "overflow-y-auto", style: { maxHeight: "14rem" }, children: S.length > 0 ? S.map((m) => /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: () => x(m.value),
              className: "flex w-full flex-col gap-xs rounded px-sm py-sm text-left transition-colors hover:bg-bg-secondary",
              style: {
                backgroundColor: m.value === t ? "var(--primary-bg)" : void 0
              },
              children: [
                /* @__PURE__ */ e("span", { className: "text-base font-medium text-text-primary", children: m.label }),
                m.description && /* @__PURE__ */ e("span", { className: "text-base font-light text-text-tertiary", children: m.description })
              ]
            },
            m.value
          )) : /* @__PURE__ */ e("div", { className: "rounded py-sm text-center text-base font-light text-text-tertiary", children: i }) })
        ]
      }
    )
  ] });
}
function Ie({ view: t, onViewChange: r }) {
  return /* @__PURE__ */ n(
    "button",
    {
      onClick: () => {
        r(t === "grid" ? "table" : "grid");
      },
      className: "relative inline-flex h-control-md w-view-toggle shrink-0 cursor-pointer items-center overflow-hidden rounded border border-border bg-bg-tertiary box-border",
      title: t === "grid" ? "테이블 뷰로 전환" : "카드 뷰로 전환",
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: `absolute top-0 h-full w-1/2 transition-all duration-200 pointer-events-none bg-primary z-0 ${t === "grid" ? "left-0" : "left-1/2"}`
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${t === "grid" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ e(ee, { className: "w-md h-md" })
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: `relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${t === "table" ? "text-white" : "text-text-secondary"}`,
            children: /* @__PURE__ */ e(te, { className: "w-md h-md" })
          }
        )
      ]
    }
  );
}
function H({
  value: t,
  onChange: r,
  label: a,
  placeholder: l = "날짜 선택",
  align: s = "left",
  size: i = "medium"
}) {
  const [c, p] = $(!1), [o, b] = $(/* @__PURE__ */ new Date()), [h, y] = $("date"), [v, N] = $(() => {
    const d = (/* @__PURE__ */ new Date()).getFullYear();
    return d - d % 12;
  }), S = B(null), x = t ? new Date(t) : null;
  z(() => {
    if (c) {
      const d = x ?? /* @__PURE__ */ new Date();
      b(d), y("date"), N(d.getFullYear() - d.getFullYear() % 12);
    }
  }, [c]), z(() => {
    const d = (g) => {
      S.current && !S.current.contains(g.target) && p(!1);
    };
    return c && document.addEventListener("mousedown", d), () => {
      document.removeEventListener("mousedown", d);
    };
  }, [c]);
  const m = (d) => d.toISOString().split("T")[0], D = (d) => new Date(d).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }), M = (d) => {
    const g = new Date(o.getFullYear(), o.getMonth(), d);
    r(m(g)), p(!1);
  }, j = () => {
    const d = /* @__PURE__ */ new Date();
    b(d), r(m(d)), p(!1);
  }, F = (d) => {
    b(new Date(o.getFullYear(), d, 1)), y("date");
  }, W = (d) => {
    b(new Date(d, o.getMonth(), 1)), y("month");
  }, u = new Date(
    o.getFullYear(),
    o.getMonth() + 1,
    0
  ).getDate(), f = new Date(
    o.getFullYear(),
    o.getMonth(),
    1
  ).getDay(), w = /* @__PURE__ */ new Date();
  w.setHours(0, 0, 0, 0);
  const Y = x == null ? void 0 : x.getFullYear(), K = x == null ? void 0 : x.getMonth();
  return /* @__PURE__ */ n("div", { ref: S, className: "relative", children: [
    a && /* @__PURE__ */ e("label", { className: "mb-xs block text-base font-light text-text-tertiary", children: a }),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: () => p((d) => !d),
        className: `flex w-full items-center justify-between rounded border border-border bg-bg-secondary text-base font-medium leading-none text-text-primary ${{
          large: "h-control-lg px-control-px-lg",
          medium: "h-control-md px-control-px-md",
          small: "h-control-sm px-control-px-sm",
          mini: "h-control-mini px-control-px-mini"
        }[i]}`,
        children: [
          /* @__PURE__ */ e("span", { className: t ? "text-text-primary" : "text-text-tertiary", children: t ? D(t) : l }),
          /* @__PURE__ */ e(V, { className: "h-md w-md text-text-tertiary" })
        ]
      }
    ),
    c && /* @__PURE__ */ n("div", { className: `absolute z-50 mt-sm w-datepicker overflow-hidden rounded border border-border bg-bg-primary shadow-md ${s === "right" ? "right-none" : "left-none"}`, children: [
      /* @__PURE__ */ n("div", { className: "flex items-center justify-between border-b border-border p-md", children: [
        /* @__PURE__ */ e(
          k,
          {
            type: "button",
            onClick: () => {
              if (h === "year") {
                N(v - 12);
                return;
              }
              if (h === "month") {
                b(new Date(o.getFullYear() - 1, o.getMonth(), 1));
                return;
              }
              b(new Date(o.getFullYear(), o.getMonth() - 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "이전",
            children: /* @__PURE__ */ e(re, { className: "h-md w-md" })
          }
        ),
        h === "date" && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => y("month"),
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              o.getFullYear(),
              "년 ",
              o.getMonth() + 1,
              "월"
            ]
          }
        ),
        h === "month" && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => {
              N(o.getFullYear() - o.getFullYear() % 12), y("year");
            },
            className: "h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary",
            children: [
              o.getFullYear(),
              "년"
            ]
          }
        ),
        h === "year" && /* @__PURE__ */ n("div", { className: "flex h-control-md items-center text-lg font-bold text-text-primary", children: [
          v,
          "년 - ",
          v + 11,
          "년"
        ] }),
        /* @__PURE__ */ e(
          k,
          {
            type: "button",
            onClick: () => {
              if (h === "year") {
                N(v + 12);
                return;
              }
              if (h === "month") {
                b(new Date(o.getFullYear() + 1, o.getMonth(), 1));
                return;
              }
              b(new Date(o.getFullYear(), o.getMonth() + 1));
            },
            variant: "secondary",
            size: "medium",
            iconOnly: !0,
            "aria-label": "다음",
            children: /* @__PURE__ */ e(ae, { className: "h-md w-md" })
          }
        )
      ] }),
      h === "date" && /* @__PURE__ */ n(P, { children: [
        /* @__PURE__ */ e("div", { className: "grid grid-cols-7 gap-xs p-md pb-sm", children: ["일", "월", "화", "수", "목", "금", "토"].map((d, g) => /* @__PURE__ */ e(
          "div",
          {
            className: `p-sm text-center text-base font-bold ${g === 0 ? "text-error" : g === 6 ? "text-primary" : "text-text-secondary"}`,
            children: d
          },
          d
        )) }),
        /* @__PURE__ */ n("div", { className: "grid grid-cols-7 gap-xs p-md pt-0", children: [
          Array.from({ length: f }).map((d, g) => /* @__PURE__ */ e("div", { className: "h-control-md" }, `empty-${g}`)),
          Array.from({ length: u }).map((d, g) => {
            const C = g + 1, R = new Date(o.getFullYear(), o.getMonth(), C);
            R.setHours(0, 0, 0, 0);
            const G = x && R.getTime() === x.getTime(), Q = R.getTime() === w.getTime();
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => M(C),
                className: `h-control-md rounded text-center text-base font-medium transition-colors ${G ? "bg-primary text-white" : Q ? "bg-bg-tertiary text-text-primary" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
                children: C
              },
              C
            );
          })
        ] })
      ] }),
      h === "month" && /* @__PURE__ */ e("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((d, g) => {
        const C = Y === o.getFullYear() && K === g;
        return /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => F(g),
            className: `h-control-lg rounded text-base font-medium transition-colors ${C ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: [
              g + 1,
              "월"
            ]
          },
          g
        );
      }) }),
      h === "year" && /* @__PURE__ */ e("div", { className: "grid grid-cols-4 gap-sm p-md", children: Array.from({ length: 12 }).map((d, g) => {
        const C = v + g;
        return /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => W(C),
            className: `h-control-lg rounded text-base font-medium transition-colors ${Y === C ? "bg-primary text-white" : "bg-transparent text-text-primary hover:bg-bg-secondary"}`,
            children: C
          },
          C
        );
      }) }),
      /* @__PURE__ */ e("div", { className: "flex justify-end border-t border-border p-md", children: h === "date" ? /* @__PURE__ */ e(k, { type: "button", onClick: j, children: "오늘" }) : /* @__PURE__ */ e(k, { type: "button", variant: "secondary", onClick: () => y("date"), children: "달력으로 돌아가기" }) })
    ] })
  ] });
}
const Ce = [
  { day: 1, label: "월" },
  { day: 2, label: "화" },
  { day: 3, label: "수" },
  { day: 4, label: "목" },
  { day: 5, label: "금" },
  { day: 6, label: "토" },
  { day: 0, label: "일" }
];
function Be({
  isOpen: t,
  title: r = "요일별 요금 일괄 수정",
  startDate: a,
  endDate: l,
  values: s,
  targetLabel: i,
  rateTypeLabel: c,
  commissionLabel: p,
  previewRows: o = [],
  targetOptions: b = [],
  selectedTargetIds: h = [],
  activeWeekdays: y = [0, 1, 2, 3, 4, 5, 6],
  warningMessage: v,
  disabled: N = !1,
  onTargetToggle: S,
  onWeekdayToggle: x,
  onStartDateChange: m,
  onEndDateChange: D,
  onValueChange: M,
  onSubmit: j,
  onClose: F
}) {
  if (!t) return null;
  const W = (u) => new Intl.NumberFormat("ko-KR").format(u);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-lg",
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      onClick: F,
      children: /* @__PURE__ */ n(
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
          onClick: (u) => u.stopPropagation(),
          children: [
            /* @__PURE__ */ n("div", { className: "mb-lg flex items-center justify-between gap-md", children: [
              /* @__PURE__ */ e(
                "h3",
                {
                  className: "m-none text-2xl",
                  style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)" },
                  children: r
                }
              ),
              /* @__PURE__ */ n("div", { className: "flex shrink-0 gap-md", children: [
                /* @__PURE__ */ n(
                  k,
                  {
                    type: "button",
                    disabled: N,
                    onClick: j,
                    className: "w-modal-action",
                    children: [
                      /* @__PURE__ */ e(oe, { className: "h-icon-md w-icon-md" }),
                      "적용"
                    ]
                  }
                ),
                /* @__PURE__ */ e(
                  k,
                  {
                    type: "button",
                    variant: "secondary",
                    onClick: F,
                    className: "w-modal-action",
                    children: "취소"
                  }
                )
              ] })
            ] }),
            v && /* @__PURE__ */ e(we, { variant: "warning", title: "확인 필요", className: "mb-lg", children: v }),
            b.length > 0 && /* @__PURE__ */ n("div", { className: "mb-lg", children: [
              /* @__PURE__ */ e(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "일괄 수정 대상"
                }
              ),
              /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-sm", children: b.map((u) => {
                const f = h.includes(u.id);
                return /* @__PURE__ */ n(
                  "button",
                  {
                    type: "button",
                    onClick: () => S == null ? void 0 : S(u.id),
                    className: "flex h-control-md items-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors",
                    style: {
                      backgroundColor: f ? "var(--primary)" : "var(--bg-secondary)",
                      borderRadius: "var(--radius)",
                      color: f ? "#ffffff" : "var(--text-primary)",
                      fontWeight: "var(--font-medium)"
                    },
                    children: [
                      u.id,
                      " / ",
                      u.name
                    ]
                  },
                  u.id
                );
              }) })
            ] }),
            /* @__PURE__ */ n("div", { className: "mb-lg", children: [
              /* @__PURE__ */ e(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "기간 선택"
                }
              ),
              /* @__PURE__ */ n("div", { className: "grid grid-cols-2 gap-md", children: [
                /* @__PURE__ */ e(
                  H,
                  {
                    label: "시작일",
                    value: a,
                    onChange: m,
                    placeholder: "시작일 선택"
                  }
                ),
                /* @__PURE__ */ e(
                  H,
                  {
                    label: "종료일",
                    value: l,
                    onChange: D,
                    placeholder: "종료일 선택",
                    align: "right"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ n("div", { className: "mb-lg", children: [
              /* @__PURE__ */ e(
                "label",
                {
                  className: "mb-sm block text-base",
                  style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                  children: "요일별 요금"
                }
              ),
              /* @__PURE__ */ e("div", { className: "grid grid-cols-7 gap-sm", children: Ce.map(({ day: u, label: f }) => {
                const w = y.includes(u);
                return /* @__PURE__ */ n("label", { className: "block", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => x == null ? void 0 : x(u),
                      className: "mb-xs flex h-control-md w-full items-center justify-center rounded border-none text-base leading-none transition-colors",
                      style: {
                        backgroundColor: w ? "var(--primary)" : "var(--bg-secondary)",
                        borderRadius: "var(--radius)",
                        color: w ? "#ffffff" : "var(--text-tertiary)",
                        fontWeight: "var(--font-bold)"
                      },
                      children: f
                    }
                  ),
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "number",
                      disabled: !w,
                      value: s[u] ?? "",
                      onChange: (Y) => M(u, Y.target.value),
                      placeholder: "0",
                      className: "h-control-md w-full rounded px-control-px-sm py-none text-center text-base leading-none",
                      style: {
                        backgroundColor: w ? "var(--bg-secondary)" : "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius)",
                        color: w ? "var(--text-primary)" : "var(--text-tertiary)",
                        cursor: w ? "text" : "not-allowed",
                        fontWeight: "var(--font-medium)",
                        opacity: w ? 1 : 0.6
                      }
                    }
                  )
                ] }, u);
              }) })
            ] }),
            /* @__PURE__ */ n("div", { className: "mb-lg", children: [
              /* @__PURE__ */ n("div", { className: "mb-sm flex items-center justify-between gap-md", children: [
                /* @__PURE__ */ e(
                  "label",
                  {
                    className: "block text-base",
                    style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)" },
                    children: "적용 미리보기"
                  }
                ),
                (c || p) && /* @__PURE__ */ n(
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
              /* @__PURE__ */ e(
                "div",
                {
                  className: "overflow-x-auto rounded",
                  style: {
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius)"
                  },
                  children: /* @__PURE__ */ n("table", { className: "w-full border-separate border-spacing-0", children: [
                    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ n("tr", { style: { backgroundColor: "var(--bg-secondary)" }, children: [
                      /* @__PURE__ */ e(
                        "th",
                        {
                          className: "px-md py-sm text-left text-base",
                          style: {
                            color: "var(--text-primary)",
                            fontWeight: "var(--font-bold)",
                            borderBottom: "1px solid var(--border-color)"
                          },
                          children: i
                        }
                      ),
                      /* @__PURE__ */ e(
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
                      /* @__PURE__ */ e(
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
                      /* @__PURE__ */ e(
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
                      /* @__PURE__ */ e(
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
                      /* @__PURE__ */ e(
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
                    /* @__PURE__ */ e("tbody", { children: o.length === 0 ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e(
                      "td",
                      {
                        colSpan: 6,
                        className: "px-md py-lg text-center text-base",
                        style: { color: "var(--text-tertiary)", fontWeight: "var(--font-light)" },
                        children: "요일별 금액을 입력하면 계산 결과가 표시됩니다."
                      }
                    ) }) : o.flatMap(
                      (u) => u.cells.map((f, w) => /* @__PURE__ */ n("tr", { children: [
                        /* @__PURE__ */ e(
                          "td",
                          {
                            className: "px-md py-sm text-base",
                            style: {
                              color: "var(--text-primary)",
                              fontWeight: "var(--font-medium)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: w === 0 ? `${u.id} / ${u.name}` : ""
                          }
                        ),
                        /* @__PURE__ */ e(
                          "td",
                          {
                            className: "px-md py-sm text-base",
                            style: {
                              color: f.day === 0 ? "var(--error)" : f.day === 6 ? "var(--primary)" : "var(--text-secondary)",
                              fontWeight: "var(--font-bold)",
                              borderBottom: "1px solid var(--border-color)"
                            },
                            children: f.label
                          }
                        ),
                        /* @__PURE__ */ e("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: W(f.inputAmount) }),
                        /* @__PURE__ */ e("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: W(f.sellRate) }),
                        /* @__PURE__ */ e("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-secondary)", fontWeight: "var(--font-medium)", borderBottom: "1px solid var(--border-color)" }, children: W(f.commissionAmount) }),
                        /* @__PURE__ */ e("td", { className: "px-md py-sm text-right text-base", style: { color: "var(--text-primary)", fontWeight: "var(--font-bold)", borderBottom: "1px solid var(--border-color)" }, children: W(f.netRate) })
                      ] }, `${u.id}-${f.day}`))
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
function Le() {
  const { theme: t, setTheme: r } = fe(), [a, l] = $(!1);
  if (z(() => {
    l(!0);
  }, []), !a)
    return /* @__PURE__ */ e("div", { className: "h-control-md w-control-md" });
  const s = t === "dark";
  return /* @__PURE__ */ e(
    k,
    {
      type: "button",
      variant: "tertiary",
      size: "normal",
      iconOnly: !0,
      onClick: () => r(s ? "light" : "dark"),
      "aria-label": s ? "라이트 모드로 전환" : "다크 모드로 전환",
      title: s ? "라이트 모드로 전환" : "다크 모드로 전환",
      children: s ? /* @__PURE__ */ e(ne, { className: "h-lg w-lg" }) : /* @__PURE__ */ e(le, { className: "h-lg w-lg" })
    }
  );
}
function He({
  children: t,
  className: r = "",
  onClick: a,
  hover: l = !0
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: `bg-bg-primary rounded border border-border shadow overflow-hidden ${l ? "transition-all hover:shadow-lg cursor-pointer" : ""} ${r}`,
      onClick: a,
      children: t
    }
  );
}
function Oe({ children: t, className: r = "", overflow: a = "auto" }) {
  return /* @__PURE__ */ e("div", { className: a === "visible" ? "overflow-visible" : "overflow-x-auto", children: /* @__PURE__ */ e("table", { className: `w-full border-separate border-spacing-0 ${r}`, children: t }) });
}
function Ee({ children: t, className: r = "" }) {
  return /* @__PURE__ */ e("thead", { className: `bg-bg-tertiary border-b-2 border-border ${r}`, children: t });
}
function Pe({ children: t, className: r = "" }) {
  return /* @__PURE__ */ e("tbody", { className: r, children: t });
}
function Te({
  children: t,
  onClick: r,
  className: a = "",
  isSelected: l = !1
}) {
  return /* @__PURE__ */ e("tr", { className: `${`transition-all ${l ? "bg-primary-bg border-l border-l-primary" : "bg-bg-primary border-l border-l-transparent"} ${r ? "cursor-pointer hover:bg-bg-secondary" : "cursor-default"}`} ${a}`, onClick: r, children: t });
}
function Ve({
  children: t,
  className: r = "",
  align: a = "left",
  ...l
}) {
  return /* @__PURE__ */ e("td", { className: `px-md py-md text-base text-text-primary border-b border-border ${a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left"} ${r}`, ...l, children: t });
}
function _e({
  children: t,
  className: r = "",
  align: a = "left",
  ...l
}) {
  return /* @__PURE__ */ e("th", { className: `px-md py-md text-base font-bold text-text-primary ${a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left"} ${r}`, ...l, children: t });
}
function Ae({
  children: t,
  isCollapsed: r = !1,
  className: a = ""
}) {
  return /* @__PURE__ */ e(
    "aside",
    {
      className: `fixed left-0 bottom-0 z-30 top-[var(--header-height)] overflow-hidden bg-bg-primary border-r border-border transition-[width] duration-300 ease-in-out ${r ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]"} ${a}`,
      children: t
    }
  );
}
function Ke({ children: t }) {
  return /* @__PURE__ */ e("nav", { className: "h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ e("ul", { className: "flex w-full flex-col gap-xs list-none m-0 p-0", children: t }) });
}
function Ge({
  icon: t,
  label: r,
  href: a,
  onClick: l,
  isActive: s = !1,
  isCollapsed: i = !1
}) {
  const c = (h) => {
    l && (h.preventDefault(), l());
  }, p = /* @__PURE__ */ n(P, { children: [
    /* @__PURE__ */ e(
      "span",
      {
        "aria-hidden": "true",
        className: `absolute left-0 top-0 h-full rounded transition-[width,background-color] duration-300 ${i ? "w-[calc(var(--sidebar-collapsed)-var(--spacing-lg))]" : "w-full"} ${s ? "bg-primary" : "bg-transparent group-hover:bg-bg-tertiary"}`
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: "absolute left-md top-1/2 z-10 -translate-y-1/2 w-lg h-lg flex items-center justify-center",
        children: /* @__PURE__ */ e(t, { className: "w-lg h-lg shrink-0" })
      }
    ),
    /* @__PURE__ */ e(
      "span",
      {
        className: "pointer-events-none absolute left-[calc(var(--sidebar-collapsed)-var(--spacing-md))] top-1/2 z-10 -translate-y-1/2 whitespace-nowrap",
        children: r
      }
    )
  ] }), o = "group w-full rounded", b = `relative flex min-h-2xl w-full items-center bg-transparent text-base font-medium no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${s ? "text-white" : "text-text-secondary group-hover:text-text-primary"}`;
  return /* @__PURE__ */ e("li", { className: o, children: a ? /* @__PURE__ */ e(
    "a",
    {
      href: a,
      className: b,
      title: i ? r : void 0,
      "aria-current": s ? "page" : void 0,
      onClick: c,
      children: p
    }
  ) : /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      className: `${b} border-0 text-left cursor-pointer w-full`,
      title: i ? r : void 0,
      "aria-pressed": s,
      onClick: l,
      children: p
    }
  ) });
}
const _ = pe(void 0), O = "sidebar-collapsed";
function ke({ children: t }) {
  const [r, a] = $(!1), [l, s] = $(!1);
  z(() => {
    const c = localStorage.getItem(O);
    c !== null && a(c === "true"), s(!0);
  }, []), z(() => {
    l && localStorage.setItem(O, String(r));
  }, [r, l]);
  const i = () => {
    a((c) => !c);
  };
  return /* @__PURE__ */ e(_.Provider, { value: { isCollapsed: r, toggleSidebar: i, setIsCollapsed: a }, children: t });
}
function A() {
  const t = xe(_);
  if (t === void 0)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return t;
}
const E = {
  Home: me,
  LayoutDashboard: I,
  BarChart3: ce,
  Tag: de,
  Calendar: V,
  ReceiptText: ie,
  Settings: se
};
function Se({ apps: t, currentAppId: r }) {
  const [a, l] = $(!1), s = B(null), i = t.find((o) => o.id === r) ?? t[0], c = E[i == null ? void 0 : i.icon] ?? I;
  z(() => {
    const o = (b) => {
      s.current && !s.current.contains(b.target) && l(!1);
    };
    return a && document.addEventListener("mousedown", o), () => {
      document.removeEventListener("mousedown", o);
    };
  }, [a]);
  const p = (o) => {
    window.location.href = o;
  };
  return /* @__PURE__ */ n("div", { className: "relative shrink-0", ref: s, children: [
    /* @__PURE__ */ n(
      k,
      {
        type: "button",
        variant: a ? "tertiary" : "ghost",
        size: "normal",
        onClick: () => l((o) => !o),
        className: "justify-start !text-base font-medium",
        "aria-expanded": a,
        "aria-haspopup": "menu",
        children: [
          /* @__PURE__ */ e(c, { className: "h-lg w-lg text-primary" }),
          /* @__PURE__ */ e("span", { className: "whitespace-nowrap !text-base font-medium", children: i == null ? void 0 : i.name }),
          /* @__PURE__ */ e(
            T,
            {
              className: `h-md w-md shrink-0 transition-transform ${a ? "rotate-180" : "rotate-0"}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: `absolute left-0 top-full z-50 mt-sm w-app-switcher rounded border border-border bg-bg-primary shadow-md transition-[max-height,opacity,transform] duration-300 ease-out ${a ? "max-h-[var(--app-switcher-dropdown-height)] translate-y-none opacity-100" : "pointer-events-none max-h-none -translate-y-sm opacity-0"}`,
        "aria-hidden": !a,
        children: /* @__PURE__ */ n("div", { className: "max-h-[var(--app-switcher-dropdown-height)] overflow-y-auto p-md", children: [
          /* @__PURE__ */ e("div", { className: "px-md py-sm text-base font-bold uppercase text-text-tertiary", children: "앱 전환" }),
          /* @__PURE__ */ e("div", { className: "flex flex-col gap-sm", children: t.map((o) => {
            const b = E[o.icon] ?? I, h = o.id === (i == null ? void 0 : i.id);
            return /* @__PURE__ */ n(
              k,
              {
                type: "button",
                variant: h ? "primary" : "ghost",
                size: "large",
                fullWidth: !0,
                onClick: () => p(o.url),
                className: "h-auto justify-start gap-lg text-left !text-base font-medium leading-normal",
                style: {
                  height: "auto",
                  minHeight: "calc(var(--control-height-lg) + var(--spacing-sm))",
                  padding: "var(--spacing-sm) var(--spacing-md)"
                },
                role: "menuitem",
                tabIndex: a ? 0 : -1,
                children: [
                  /* @__PURE__ */ e("span", { className: "flex h-lg w-lg shrink-0 items-center justify-center", children: /* @__PURE__ */ e(b, { className: "h-lg w-lg" }) }),
                  /* @__PURE__ */ n("span", { className: "min-w-0 flex-1 leading-normal", children: [
                    /* @__PURE__ */ e("span", { className: "block truncate !text-base font-medium", children: o.name }),
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: "block truncate !text-xs font-light text-text-tertiary",
                        children: o.url.replace("http://", "")
                      }
                    )
                  ] }),
                  h && /* @__PURE__ */ e("span", { className: "shrink-0 rounded bg-primary-bg px-sm py-xs text-base font-medium", children: "현재" })
                ]
              },
              o.id
            );
          }) })
        ] })
      }
    )
  ] });
}
function $e({ apps: t, currentAppId: r, themeToggle: a, rightSlot: l }) {
  const { isCollapsed: s, toggleSidebar: i } = A();
  return /* @__PURE__ */ n("header", { className: "fixed left-0 right-0 top-0 z-40 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-primary", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: "flex h-full shrink-0 items-center gap-sm px-md",
        style: { minWidth: "var(--sidebar-width)" },
        children: [
          /* @__PURE__ */ e(Se, { apps: t, currentAppId: r }),
          /* @__PURE__ */ e(
            k,
            {
              type: "button",
              variant: "tertiary",
              size: "normal",
              iconOnly: !0,
              onClick: i,
              "aria-label": s ? "사이드바 펼치기" : "사이드바 접기",
              title: s ? "사이드바 펼치기" : "사이드바 접기",
              children: s ? /* @__PURE__ */ e(be, { className: "h-lg w-lg" }) : /* @__PURE__ */ e(he, { className: "h-lg w-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n("div", { className: "flex h-full flex-1 items-center justify-end gap-sm px-md", children: [
      a,
      l ?? /* @__PURE__ */ e(
        k,
        {
          type: "button",
          variant: "tertiary",
          size: "normal",
          iconOnly: !0,
          "aria-label": "User menu",
          children: /* @__PURE__ */ e(ue, { className: "h-lg w-lg" })
        }
      )
    ] })
  ] });
}
function De({
  children: t,
  sidebar: r,
  apps: a,
  currentAppId: l,
  themeToggle: s,
  rightSlot: i
}) {
  const { isCollapsed: c } = A();
  return /* @__PURE__ */ n("div", { className: "min-h-screen bg-bg-secondary", children: [
    /* @__PURE__ */ e(
      $e,
      {
        apps: a,
        currentAppId: l,
        themeToggle: s,
        rightSlot: i
      }
    ),
    r,
    /* @__PURE__ */ e(
      "main",
      {
        className: "mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] transition-[margin-left] duration-300 ease-in-out",
        style: {
          marginLeft: c ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
          padding: "var(--content-padding)"
        },
        children: t
      }
    )
  ] });
}
function Qe(t) {
  return /* @__PURE__ */ e(ke, { children: /* @__PURE__ */ e(De, { ...t }) });
}
export {
  we as Alert,
  Se as AppSwitcher,
  k as Button,
  He as Card,
  H as DatePicker,
  $e as Header,
  Ne as Input,
  Qe as MainLayout,
  je as SearchableSelect,
  Re as Select,
  Ae as Sidebar,
  Ke as SidebarMenu,
  Ge as SidebarMenuItem,
  ke as SidebarProvider,
  Oe as Table,
  Pe as TableBody,
  Ve as TableCell,
  _e as TableHead,
  Ee as TableHeader,
  Te as TableRow,
  Le as ThemeToggle,
  Ie as ViewToggle,
  Be as WeekdayRateBulkModal,
  A as useSidebar
};
