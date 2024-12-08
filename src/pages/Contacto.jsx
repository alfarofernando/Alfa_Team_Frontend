import Footer from "../components/Footer";
import Form from "../components/Form";

export default function Contacto() {
  return (
    <>
      <div className="relative overflow-hidden z-10 py-4 my-4 mx-8 bg-gray-100 text-black">
        <div className="relative grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <h1 className="text-xl font-bold mb-4">Contáctanos</h1>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              optio magni quas voluptatum nobis vitae at fugit officia itaque
              id. Repellat earum quidem optio aliquam consequatur officia
              delectus, nam rem?
            </p>
            <p className="mb-2">+59 (011) 52606455</p>
            <p>banana@bananota.bana.com</p>
          </div>
          <div className="col-span-2">
            <Form />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
