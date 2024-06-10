import CategoryPreview from "../CategoryPreview"
import ProductComponent from "../products/products"
import Carousel from '../Carousel';


export default function Home() {

return (
    <div className="bg-white z-9">
    
    
    <div className="container mx-auto" >
       <Carousel />
    </div>

    <div className="flex items-center">
      <div className="mr-4 font-semibold text-xl ml-6">
        <h1>PROMOS !</h1>
      </div>
      <div >
        <ProductComponent promo={true} />
      </div>
    </div>
    
    
    <div className="container mx-auto">
          <ProductComponent />
    </div>

    
    </div>

    
);


}