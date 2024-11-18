import { createPortal } from "react-dom";
import stylesheet from "./index.module.less";

type Props = {
  container: Element | DocumentFragment;
};

const ChartFilter: React.FC<Props> = (props) => {
  const { container } = props;
  const children = (
    <div
      className={stylesheet["chart-filter"]}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 16,
      }}
    >
      <input
        type="text"
        placeholder="过滤器（正则表达式）"
        style={{ flex: 1 }}
      />
      <label
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          userSelect: "none",
          marginTop: 4,
        }}
      >
        <input type="checkbox" />
        <span>原版图表</span>
      </label>
      <label
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          userSelect: "none",
          marginTop: 4,
        }}
      >
        <input type="checkbox" />
        <span>厂商颜色</span>
      </label>
      <label
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          userSelect: "none",
          marginTop: 4,
        }}
      >
        <input type="checkbox" />
        <span>中文名称</span>
      </label>
    </div>
  );
  return <>{createPortal(children, container)}</>;
};

export default ChartFilter;
