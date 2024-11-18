import { useEffect, useState } from "react";
import ChartFilter from "./components/ChartFilter";
import ChartList from "./components/ChartList";
import Product from "./domains/product";
import SettingsMenu from "./components/Settings";
import Chart from "./components/Chart";

const ChartSelector = "div.main#mark > div.chart";
const ChartSubHeaderSelector = `${ChartSelector} > div.chart_subheader`;
const ChartBodySelector = `${ChartSelector} > div.chart_body`;
const ChartFilterId = "pmtk-chart-filter";
const ChartListEnhancedId = "pmtk-chart-list";
const ChartListOriginSelector = `${ChartBodySelector} > ul.chartlist:not(#${ChartListEnhancedId})`;
const ChartListEnhancedSelector = `${ChartBodySelector} > ul.chartlist#${ChartListEnhancedId}`;

const App = () => {
  const [settings, setSettings] = useState({
    original: false,
    variegation: false,
    localization: false,
  });
  const [updateTime, setUpdateTime] = useState(new Date().valueOf());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // 从原图表获取产品信息
    const chartListOrigin = document.querySelector<HTMLUListElement>(
      ChartListOriginSelector
    );
    if (chartListOrigin === null) {
      console.warn("找不到原图表");
      return;
    }
    parseProducts(chartListOrigin);
  }, []);

  useEffect(() => {
    console.info("显示图表：", settings.original ? "原版" : "增强");
    const origin = document.querySelector("#mark > .chart:not(#pmtk-chart)");
    const enhanced = document.querySelector("#mark > .chart#pmtk-chart");
    if (settings.original) {
      origin?.removeAttribute("style");
      enhanced?.setAttribute("style", "display: none;");
    } else {
      origin?.setAttribute("style", "display: none;");
      enhanced?.removeAttribute("style");
    }
  }, [settings.original]);

  function parseProducts(list: HTMLUListElement) {
    const items = Array.from(list.children) as HTMLLIElement[];
    const products: Product[] = [];
    items.forEach((item) => {
      const id = item.id;

      const spanMoreDetails =
        item.querySelector<HTMLSpanElement>("span.more_details");
      if (spanMoreDetails === null) {
        return;
      }

      const anchor = item.querySelector("a");
      if (anchor === null) {
        return;
      }

      const spanProductName =
        anchor.querySelector<HTMLSpanElement>("span.prdname");
      if (spanProductName === null) {
        return;
      }

      const spanCount = anchor.querySelector<HTMLSpanElement>("span.count");
      if (spanCount === null) {
        return;
      }

      const spanPrice =
        anchor.querySelector<HTMLSpanElement>("span.price-neww");
      if (spanPrice === null) {
        return;
      }

      const mark = parseInt(spanCount.innerText.replaceAll(",", ""));
      products.push({
        id,
        details: spanMoreDetails.getAttribute("onclick") ?? "",
        href: anchor.href,
        name: spanProductName.innerText,
        mark,
        price: spanPrice.innerText,
      });
    });

    console.info("从原图表获取产品信息如下：", products);
    setProducts(products);
  }

  return (
    <>
      <SettingsMenu
        value={settings}
        onChange={(key, value) => {
          console.info(`设置项发生变化：${key} = ${value}`);
          setSettings({
            ...settings,
            [key]: value,
          });
        }}
      />

      <Chart
        container="#mark"
        title="PassMark - CPU 跑分"
        subtitle="高端 CPU"
        updateTime="2024-11-17"
        subheaders={["CPU", "CPU 跑分", "价格（USD）"]}
        products={products}
      />
    </>
  );
};

export default App;
