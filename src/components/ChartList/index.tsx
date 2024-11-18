import Product from "@/domains/product";
import ListItem from "./ListItem";

interface Props {
  products: Product[];
}

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

const ChartList: React.FC<Props> = (props) => {
  const { products } = props;
  const top = products[0];
  const items = products.map((product, index) => {
    const percent = Math.floor((product.mark * 86) / top.mark);
    const progress = `${percent}%`;
    const color = Colors[index % Colors.length];
    return (
      <ListItem
        key={product.id}
        index={index}
        progress={progress}
        color={color}
        {...product}
      />
    );
  });

  return (
    <ul id="pmtk-chart-list" className="chartlist">
      {items}
    </ul>
  );
};

export default ChartList;
