import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ROUTES_CONFIG from './constants'
import { MainView } from "./selectedView"
const BASE_URL = import.meta.env.BASE_URL
export const BASE_PATH =
  BASE_URL && BASE_URL.startsWith("http") ? new URL(BASE_URL).pathname : ""


const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename={BASE_PATH}>
        <Switch>
          <Route
            exact
            path={ROUTES_CONFIG.main}
            render={() => (
              <>
                <div>Home</div>
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
              const view = query.has("mainView")
                ? (query.get("mainView"))
                : MainView.main

              return (
                <>
                  <TearOutRouteWrapper>
                    <TornOutTile symbol={symbol} view={view} />
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
                    <MainView />
                  </>
                )
              }}
            />
            <Route
              path={ROUTES_CONFIG.bottom}
              render={() => {
                return (
                  <>
                    <MainView />
                  </>
                )
              }}
            />
          </TearOutContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
