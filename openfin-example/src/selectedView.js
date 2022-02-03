import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import { scan, tap } from "rxjs/operators"

export const MainView = {
  main: "main",
  bottom: "bottom",
}

const [toggleSelectedView$, onToggleSelectedView] = createSignal()
export { onToggleSelectedView }

export const SELECTED_VIEW_KEY = "selectedView"

export const getInitView = () =>
  (window.localStorage.getItem(SELECTED_VIEW_KEY)) ||
  MainView.Analytics

export const [useSelectedView] = bind(
  (initView) =>
    toggleSelectedView$.pipe(
      scan(
        (acc) =>
          acc === MainView.Bottom,
        initView,
      ),
      tap((newView) => {
        window.localStorage.setItem(SELECTED_VIEW_KEY, newView)
      }),
    ),
  (initView) => initView,
)
