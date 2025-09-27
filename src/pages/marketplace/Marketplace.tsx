import { Card } from "@/components/ui/card";
import { categories } from "@/lib/constants";
import Grading from "@/components/Grading";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pt-20 pb-8 px-10 space-y-5">
      <h1 className="text-3xl font-bold mb-2">Agricultural Marketplace</h1>
      <h1 className="text-lg font-bold">Explore by Category</h1>

      <div className="grid grid-cols-2 lg:flex gap-4 items-center">
        {categories.map((category) => (
          <Card
            key={category.key}
            onClick={() => {
              navigate(`/marketplace/${category.key}`);
            }}
            className="rounded-2xl hover:shadow-lg p-6 font-semibold text-center flex items-center gap-2 cursor-pointer"
          >
            <category.icon size={30} />
            {category.value}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
