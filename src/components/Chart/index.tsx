import Product from "@/domains/product";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const Colors: string[] = [
  "pink",
  "yellow",
  "green",
  "light-purple",
  "red",
  "turquoise",
  "orange",
  "brown",
  "purple",
  "blue",
];

type Props = {
  container?: Element | DocumentFragment | string;
  title: string;
  subtitle: string;
  updateTime?: string;
  subheaders: string[];
  products: Product[];
  colors?: string[];
  idPrefix?: string;
};

const Chart: React.FC<Props> = ({
  container: propsContainer = "#mark",
  title,
  subtitle,
  updateTime,
  subheaders,
  products,
  colors = Colors,
  idPrefix = "rk",
}) => {
  const [pattern, setPattern] = useState("");
  const [patternStatus, setPatternStatus] = useState<string | undefined>();
  const [regex, setRegex] = useState<RegExp | null>(null);

  useEffect(() => {
    try {
      console.debug("正则表达式发生变化：", pattern);
      const regex = new RegExp(pattern);
      console.info("正则表达式编译成功：", regex);
      setRegex(regex);
      setPatternStatus(undefined);
    } catch (ex) {
      console.error("无效的正则表达式：", pattern);
      setPatternStatus("pink");
    }
  }, [pattern]);

  const container = useMemo(() => {
    if (typeof propsContainer === "string") {
      const node = document.querySelector(propsContainer);
      if (node !== null) {
        return node;
      }
      return document.body;
    }
    return propsContainer;
  }, [propsContainer]);

  const updateTimeNode = useMemo(() => {
    if (updateTime === undefined) {
      return null;
    }
    return <div className="chart_subtitle">{updateTime}</div>;
  }, [updateTime]);

  const subheaderNodes = useMemo(() => {
    const nodes: React.ReactNode[] = subheaders.map((tableTitle, index) => (
      <div className={`chart_tabletitle${index + 1}`}>{tableTitle}</div>
    ));
    return nodes;
  }, [subheaders]);

  function onMoreDetailsClick(callback: string) {
    eval(callback);
  }

  const listItems = useMemo(() => {
    const filtered = products.filter((product) => {
      if (regex === null) {
        return true;
      }
      const matches = regex.exec(product.name);
      return matches !== null;
    });

    const first = filtered[0];
    const nodes: React.ReactNode[] = filtered.map((product, index) => {
      const id = `${idPrefix}${product.id}`;
      const className = index % 2 === 1 ? "alt" : undefined;
      const color = colors[index % colors.length];
      const progress = Math.floor((product.mark * 86) / first.mark);
      const width = `${progress}%`;
      const mark = product.mark.toLocaleString();
      return (
        <li id={id} className={className}>
          <span
            className="more_details"
            onClick={() => onMoreDetailsClick(product.details)}
          />
          <a href={product.href}>
            <span className="prdname">{product.name}</span>
            <div>
              <span className={`index ${color}`} style={{ width }}>
                ({width})
              </span>
            </div>
            <span className="count">{mark}</span>
            <span className="price-neww">{product.price}</span>
          </a>
        </li>
      );
    });
    return nodes;
  }, [products, regex]);

  const chart = (
    <div id="pmtk-chart" className="chart">
      <div className="chart_header">
        <div className="chart_title">{title}</div>
        <div className="chart_subtitle">{subtitle}</div>
        {updateTimeNode}
      </div>
      <div
        className="chart_filter"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <input
          type="text"
          placeholder="产品名称过滤器（正则表达式）"
          value={pattern}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setPattern(value);
          }}
          style={{
            flex: 1,
            backgroundColor: patternStatus,
          }}
        />
        <button>添加</button>
        <select>
          <option>请选择</option>
        </select>
      </div>
      <div className="chart_subheader">{subheaderNodes}</div>
      <div className="chart_body">
        <ul className="chartlist">{listItems}</ul>
      </div>
    </div>
  );

  return <>{createPortal(chart, container)}</>;
};

export default Chart;
