import { TileView } from "@/App/LiveRates/selectedView"
import { BASE_PATH, ROUTES_CONFIG } from "@/constants"
import { TornOutTile } from "@/App/LiveRates/Tile/TearOut/TornOutTile"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { MainRoute } from "./MainRoute"
import { TearOutRouteWrapper } from "./Web.styles"
import { Trades } from "@/App/Trades"
import { Analytics } from "@/App/Analytics"
import { LiveRates } from "@/App/LiveRates"
import { TearOutContext } from "../App/TearOutSection/tearOutContext"
import { DisconnectionOverlay } from "@/components/DisconnectionOverlay"
import { lazy, Suspense } from "react"

const StyleguideRoute = lazy(() => import("@/styleguide"))

export const WebApp: React.FC = () => (
  <Suspense fallback={<div />}>
    <BrowserRouter basename={BASE_PATH}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <MainRoute />
            </>
          )}
        />
        <Route
          path={ROUTES_CONFIG.main}
          render={({
            location: { search },
            match: {
              params: { symbol },
            },
          }) => {
            const query = new URLSearchParams(search)
            const view = query.has("tileView")
              ? (query.get("tileView") as TileView)
              : TileView.Analytics

            return (
              <>
                <TearOutRouteWrapper>
                  <TornOutTile symbol={symbol!} view={view} />
                </TearOutRouteWrapper>
              </>
            )
          }}
        />
        <TearOutContext.Provider value={{ isTornOut: true }}>
          <Route
            path={ROUTES_CONFIG.main}
            render={() => {
              return (
                <>
                  <LiveRates />
                </>
              )
            }}
          />
          <Route
            path={ROUTES_CONFIG.side}
            render={() => {
              return (
                <>
                  <Analytics hideIfMatches={""} />
                </>
              )
            }}
          />
        </TearOutContext.Provider>
      </Switch>
    </BrowserRouter>
  </Suspense>
)
