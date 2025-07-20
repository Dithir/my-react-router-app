import type { Route } from "./+types/home";
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
          <h1 className="p-10 text-3xl">Welcome to my Pokemon React Project, this is my first project to expand my knowledge and practice. Mostly
            because on how accesible is the pokeAPI and how useful it is to start learning extracting data from an API. I'll be adding more features as
            the time goes and I learn to use new things to add here. Some may be limited to limited by the limitations the API has on some parts with
            incomplete information, but I will try to make the best of it.
          </h1>
      </div>
    </div>
  );
}
