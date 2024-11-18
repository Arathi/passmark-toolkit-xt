import type Product from "../../../domains/product";

export type Props = Product & {
  index: number;
  progress: string;
  color: string;
};

const ListItem: React.FC<Props> = (props) => {
  const { id, href, name, progress, mark, price, details, index, color } =
    props;

  const className = index % 2 === 0 ? "" : "alt";

  function onDetailsClick() {
    eval(details);
  }

  return (
    <li id={id} className={className}>
      <span className="more_details" onClick={onDetailsClick} />
      <a href={href}>
        <span className="prdname">{name}</span>
        <div>
          <span className={`index ${color}`} style={{ width: progress }}>
            ({progress})
          </span>
        </div>
        <span className="count">{mark}</span>
        <span className="price-neww">{price}</span>
      </a>
    </li>
  );
};

export default ListItem;
