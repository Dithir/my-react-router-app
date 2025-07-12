import type { Route } from "./+types/home";
import { Welcome } from "../Components/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokemon App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="w-screen h-screen flex items justify-center ">
      <div className="w-200 h-150 bg-blue-500 rounded-3xl mt-10">
          <h1 className="p-10 text-3xl">Welcome, my name is Alan, alias Dithir, this is the website im building as first project to expand my knowledge and practice, at the moment im working on a pokemon related project since the PokeAPI is accesible and nice for learning to extract data</h1>
      </div>
    </div>
  );
}
