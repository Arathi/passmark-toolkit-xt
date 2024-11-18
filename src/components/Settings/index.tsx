import { useMemo } from "react";
import { createPortal } from "react-dom";

type Settings = {
  original: boolean;
  variegation: boolean;
  localization: boolean;
};

type Props = {
  value: Settings;
  container?: Element | DocumentFragment | string;
  onChange: (key: string, value: boolean) => void;
};

const DefaultContainerSelector = ".navbar-nav:not(#search_form)";

const SettingsMenu: React.FC<Props> = ({
  value,
  container: propsContainer = DefaultContainerSelector,
  onChange,
}) => {
  const { original, variegation, localization } = value;
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

  const children = (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle">设置</a>
      <div className="dropdown-menu one-column-drop-menu ddmenu_left_114">
        <div className="one_big_submenu_item">
          <label>
            <input
              type="checkbox"
              checked={original}
              onChange={(e) => {
                const value = e.currentTarget.checked;
                onChange("original", value);
              }}
            />
            &nbsp;&nbsp;
            <span>原版图表</span>
          </label>
        </div>
        <div className="one_big_submenu_item">
          <label>
            <input
              type="checkbox"
              checked={variegation}
              onChange={(e) => {
                const value = e.currentTarget.checked;
                onChange("variegation", value);
              }}
            />
            &nbsp;&nbsp;
            <span>厂商颜色</span>
          </label>
        </div>
        <div className="one_big_submenu_item">
          <label>
            <input
              type="checkbox"
              checked={localization}
              onChange={(e) => {
                const value = e.currentTarget.checked;
                onChange("localization", value);
              }}
            />
            &nbsp;&nbsp;
            <span>显示中文</span>
          </label>
        </div>
      </div>
    </li>
  );
  return <>{createPortal(children, container)}</>;
};

export default SettingsMenu;
