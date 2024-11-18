import { ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ChartBody from "./components/ChartList";
import ChartFilter from "./components/ChartFilter";
import Product from "./domains/product";
import stylesheet from "./App.module.less";

const ChartSelector = "div.main#mark > div.chart";
const ChartSubHeaderSelector = `${ChartSelector} > div.chart_subheader`;
const ChartBodySelector = `${ChartSelector} > div.chart_body`;
const ChartFilterId = "pmtk-chart-filter";
const ChartListEnhancedId = "pmtk-chart-list";
const ChartListOriginSelector = `${ChartBodySelector} > ul.chartlist:not(#${ChartListEnhancedId})`;
const ChartListEnhancedSelector = `${ChartBodySelector} > ul.chartlist#${ChartListEnhancedId}`;

const App = () => {
  const [filterPortal, setFilterPortal] = useState<ReactPortal>();
  const [listPortal, setListPortal] = useState<ReactPortal>();
  const [products, setProducts] = useState<Product[]>([]);
  const [showOrigin, setShowOrigin] = useState(false);

  useEffect(() => {
    toggleList();
  }, [showOrigin]);

  function toggleList() {
    const chartListOrigin = document.querySelector(ChartListOriginSelector);
    if (chartListOrigin === null) {
      console.warn("找不到原图表");
      return;
    }

    const chartListEnhanced = document.querySelector(ChartListEnhancedSelector);
    if (chartListEnhanced === null) {
      console.warn("找不到增强图表");
      return;
    }

    if (showOrigin) {
      chartListOrigin.removeAttribute("style");
      chartListEnhanced.setAttribute("style", "display: none");
    } else {
      chartListOrigin.setAttribute("style", "display: none");
      chartListEnhanced.removeAttribute("style");
    }
  }

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

  function createFilter() {
    const chart = document.querySelector(ChartSelector);
    if (chart === null) {
      console.warn("找不到", ChartSelector);
      return;
    }

    const subHeader = document.querySelector(ChartSubHeaderSelector);
    if (subHeader === null) {
      console.warn("找不到", ChartSubHeaderSelector);
      return;
    }

    const container = document.createElement("div");
    container.id = ChartFilterId;
    chart.insertBefore(container, subHeader);

    const portal = createPortal(<ChartFilter />, container);
    setFilterPortal(portal);
  }

  function createList() {
    const chartListOrigin = document.querySelector<HTMLUListElement>(
      ChartListOriginSelector
    );
    if (chartListOrigin === null) {
      console.warn(`找不到`, ChartListEnhancedSelector);
      return;
    }
    parseProducts(chartListOrigin);

    const chartBody = document.querySelector(ChartBodySelector);
    if (chartBody === null) {
      console.warn(`找不到`, ChartBodySelector);
      return;
    }

    const portal = createPortal(<ChartBody products={products} />, chartBody);
    setListPortal(portal);
  }

  useEffect(() => {
    createFilter();
    createList();
  }, []);

  return (
    <>
      {filterPortal}
      {listPortal}
    </>
  );
};

export default App;
