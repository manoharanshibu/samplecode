import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Analytics } from "@/App/Analytics"
import { LiveRates } from "@/App/LiveRates"
import { TileView } from "@/App/LiveRates/selectedView"
import { Trades } from "@/App/Trades"
import { DocTitle } from "@/components/DocTitle"
import { BASE_PATH, ROUTES_CONFIG } from "@/constants"
import { TornOutTile } from "@/App/LiveRates/Tile/TearOut/TornOutTile"

export const FinsembleApp: React.FC = () => (
  <BrowserRouter basename={BASE_PATH}>
    <Switch>
      <Route
        path={ROUTES_CONFIG.side}
        render={() => (
          <DocTitle title="Side">
            <Analytics hideIfMatches={null} />
          </DocTitle>
        )}
      />
      <Route
        path={ROUTES_CONFIG.main}
        render={() => (
          <DocTitle title="Live Rates">
            <LiveRates />
          </DocTitle>
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
              <TornOutTile
                symbol={symbol!}
                view={view}
                supportsTearOut={false}
              />
            </>
          )
        }}
      />
    </Switch>
  </BrowserRouter>
)
