import { AnalyticsCoreDeferred } from "@/App/Analytics"
import { LiveRatesCoreDeferred } from "@/App/LiveRates"
import { TradesCoreDeferred } from "@/App/Trades"
import { register } from "@/Web/serviceWorkerRegistration"
import { showCacheUpdateModal } from "@/Web/cacheUpdateModal"
import { WebApp } from "@/Web"

export const gaDimension = 'browser';

export const getMainApp: () => React.FC = () => {
  return WebApp
}
