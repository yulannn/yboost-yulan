import "../../App.css"

type DrinkProps = {
  img: string,
  title: string
}

const DrinkType: React.FC<DrinkProps> = ({ img, title }) => {
  return (
    <div className="flex gap-6 items-center custom-shadow w-auto p-2 rounded-lg">
      <img className="w-12" src={img} alt="" />
      <h2 className="md:text-4xl text-xl text-black">{title}</h2>
    </div>
  );
}

export default DrinkType;