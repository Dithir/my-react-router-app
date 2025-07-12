import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const react = "data:image/svg+xml,%3csvg%20height='2500'%20viewBox='175.7%2078%20490.6%20436.9'%20width='2194'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%2361dafb'%3e%3cpath%20d='m666.3%20296.5c0-32.5-40.7-63.3-103.1-82.4%2014.4-63.6%208-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6%200%208.3.9%2011.4%202.6%2013.6%207.8%2019.5%2037.5%2014.9%2075.7-1.1%209.4-2.9%2019.3-5.1%2029.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50%2032.6-30.3%2063.2-46.9%2084-46.9v-22.3c-27.5%200-63.5%2019.6-99.9%2053.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7%200%2051.4%2016.5%2084%2046.6-14%2014.7-28%2031.4-41.3%2049.9-22.6%202.4-44%206.1-63.6%2011-2.3-10-4-19.7-5.2-29-4.7-38.2%201.1-67.9%2014.6-75.8%203-1.8%206.9-2.6%2011.5-2.6v-22.3c-8.4%200-16%201.8-22.6%205.6-28.1%2016.2-34.4%2066.7-19.9%20130.1-62.2%2019.2-102.7%2049.9-102.7%2082.3%200%2032.5%2040.7%2063.3%20103.1%2082.4-14.4%2063.6-8%20114.2%2020.2%20130.4%206.5%203.8%2014.1%205.6%2022.5%205.6%2027.5%200%2063.5-19.6%2099.9-53.6%2036.4%2033.8%2072.4%2053.2%2099.9%2053.2%208.4%200%2016-1.8%2022.6-5.6%2028.1-16.2%2034.4-66.7%2019.9-130.1%2062-19.1%20102.5-49.9%20102.5-82.3zm-130.2-66.7c-3.7%2012.9-8.3%2026.2-13.5%2039.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4%2014.2%202.1%2027.9%204.7%2041%207.9zm-45.8%20106.5c-7.8%2013.5-15.8%2026.3-24.1%2038.2-14.9%201.3-30%202-45.2%202-15.1%200-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8%206.2-13.4%2013.2-26.8%2020.7-39.9%207.8-13.5%2015.8-26.3%2024.1-38.2%2014.9-1.3%2030-2%2045.2-2%2015.1%200%2030.2.7%2045%201.9%208.3%2011.9%2016.4%2024.6%2024.2%2038%207.6%2013.1%2014.5%2026.4%2020.8%2039.8-6.3%2013.4-13.2%2026.8-20.7%2039.9zm32.3-13c5.4%2013.4%2010%2026.8%2013.8%2039.8-13.1%203.2-26.9%205.9-41.2%208%204.9-7.7%209.8-15.6%2014.4-23.7%204.6-8%208.9-16.1%2013-24.1zm-101.4%20106.7c-9.3-9.6-18.6-20.3-27.8-32%209%20.4%2018.2.7%2027.5.7%209.4%200%2018.7-.2%2027.8-.7-9%2011.7-18.3%2022.4-27.5%2032zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9%203.7-12.9%208.3-26.2%2013.5-39.5%204.1%208%208.4%2016%2013.1%2024s9.5%2015.8%2014.4%2023.4zm73.9-208.1c9.3%209.6%2018.6%2020.3%2027.8%2032-9-.4-18.2-.7-27.5-.7-9.4%200-18.7.2-27.8.7%209-11.7%2018.3-22.4%2027.5-32zm-74%2058.9c-4.9%207.7-9.8%2015.6-14.4%2023.7-4.6%208-8.9%2016-13%2024-5.4-13.4-10-26.8-13.8-39.8%2013.1-3.1%2026.9-5.8%2041.2-7.9zm-90.5%20125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6%2058.3-50.6c8.6-3.7%2018-7%2027.7-10.1%205.7%2019.6%2013.2%2040%2022.5%2060.9-9.2%2020.8-16.6%2041.1-22.2%2060.6-9.9-3.1-19.3-6.5-28-10.2zm53.8%20142.9c-13.6-7.8-19.5-37.5-14.9-75.7%201.1-9.4%202.9-19.3%205.1-29.4%2019.6%204.8%2041%208.5%2063.5%2010.9%2013.5%2018.5%2027.5%2035.3%2041.6%2050-32.6%2030.3-63.2%2046.9-84%2046.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7%2038.2-1.1%2067.9-14.6%2075.8-3%201.8-6.9%202.6-11.5%202.6-20.7%200-51.4-16.5-84-46.6%2014-14.7%2028-31.4%2041.3-49.9%2022.6-2.4%2044-6.1%2063.6-11%202.3%2010.1%204.1%2019.8%205.2%2029.1zm38.5-66.7c-8.6%203.7-18%207-27.7%2010.1-5.7-19.6-13.2-40-22.5-60.9%209.2-20.8%2016.6-41.1%2022.2-60.6%209.9%203.1%2019.3%206.5%2028.1%2010.2%2035.4%2015.1%2058.3%2034.9%2058.3%2050.6-.1%2015.7-23%2035.6-58.4%2050.6z'/%3e%3ccircle%20cx='420.9'%20cy='296.5'%20r='45.7'/%3e%3c/g%3e%3c/svg%3e";
function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pokedex", path: "/pokedex" },
    { name: "Visualizer", path: "/pokemon-visualizer" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "h-40 w-100% ", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-linear-45 from-red-900 to-black h-26 w-100% flex justify-center items-center [&>*]:p-2 [&>*]:text-[35px]", children: [
      /* @__PURE__ */ jsx("span", { className: "text-yellow-400", children: "Pokemon " }),
      /* @__PURE__ */ jsx("span", { className: "text-sky-300", children: "React " }),
      /* @__PURE__ */ jsx("img", { className: "max-h-[70px]", src: react, alt: "react Logo" }),
      /* @__PURE__ */ jsx("span", { className: "text-emerald-500", children: "Project" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: " h-14 bg-linear-120 from-blue-400 via-green-900 to-red-500 flex justify-center", children: /* @__PURE__ */ jsx("ul", { className: `navBar bg-position-[center_top_-39rem] flex flex-row justify-center w-[600px] `, children: navLinks.map((element) => /* @__PURE__ */ jsx("li", { className: "border border-gray-600 w-[150px] h-14 flex justify-center items-center backdrop-blur-[2px]", children: /* @__PURE__ */ jsx(Link, { to: element.path, children: element.name }) }, element.name)) }) })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Pokemon App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("div", {
    className: "w-screen h-screen flex items justify-center ",
    children: /* @__PURE__ */ jsx("div", {
      className: "w-200 h-150 bg-blue-500 rounded-3xl mt-10",
      children: /* @__PURE__ */ jsx("h1", {
        className: "p-10 text-3xl",
        children: "Welcome, my name is Alan, alias Dithir, this is the website im building as first project to expand my knowledge and practice, at the moment im working on a pokemon related project since the PokeAPI is accesible and nice for learning to extract data"
      })
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx("span", {
      className: "text-3xl font-bold underline text-blue-600",
      children: "About Placeholder"
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const contact = UNSAFE_withComponentProps(function Contact() {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx("span", {
      className: "text-3xl font-bold underline text-blue-600",
      children: "Contact Placeholder"
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
function ProgressBar(props) {
  const value = props.value;
  const [progress, setProgress] = useState("");
  useEffect(() => {
    switch (true) {
      case (value > 0 && value < 26):
        setProgress("bar one");
        break;
      case (value > 25 && value < 51):
        setProgress("bar two");
        break;
      case (value > 50 && value < 76):
        setProgress("bar three");
        break;
      case (value > 75 && value < 101):
        setProgress("bar four");
        break;
      case (value > 100 && value < 126):
        setProgress("bar five");
        break;
      case (value > 125 && value < 151):
        setProgress("bar six");
        break;
      case (value > 150 && value < 176):
        setProgress("bar seven");
        break;
      case (value > 175 && value < 201):
        setProgress("bar eight");
        break;
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("progress", { className: progress, max: 200, value }) });
}
function Cards({ name, id, close }) {
  const [data, setData] = useState();
  const [toggle, setToggle] = useState(true);
  const statNames = ["Hp:", "Atk:", "Def:", "SpAtk:", "SpDef:", "Spd:"];
  const [abilities, setAbilities] = useState(["", "", ""]);
  const fetchData = async (name2) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name2}`);
      if (!response.ok) {
        throw new Error("Could not get data from API");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(name);
  }, []);
  useEffect(() => {
    if (data) {
      getAbilities(data);
    }
  }, [data]);
  function normalize(val) {
    return String(String(val).charAt(0).toUpperCase() + String(val).slice(1)).replace("-", " ");
  }
  function getAbilities(pokemon) {
    const newAbilities = [...abilities];
    pokemon.abilities.forEach((current) => {
      newAbilities[current.slot - 1] = normalize(current.ability.name);
      setAbilities((a) => newAbilities);
    });
  }
  function handleClose() {
    console.log("card close clicked");
    close(id);
  }
  function toggleBtn(event, button) {
    console.log(event);
    if (button === "stats") {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return data ? /* @__PURE__ */ jsxs("div", { className: "w-82 h-50 bg-linear-120 from-blue-900 to-red-800 rounded-xl m-3 p-4 flex", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-xl h-25 w-25 bg-emerald-200", children: /* @__PURE__ */ jsx("img", { src: data ? data.sprites.front_default : null, alt: "" }) }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl w-25 h-15 flex flex-col items-center", children: [
        data ? /* @__PURE__ */ jsx("img", { src: `app/Components/Visualizer/TypeSprites/${data.types[0].type.name}.png`, alt: "", className: "h-[50%]" }) : /* @__PURE__ */ jsx(Fragment, {}),
        data ? data.types.length === 2 ? /* @__PURE__ */ jsx("img", { src: `app/Components/Visualizer/TypeSprites/${data.types[1].type.name}.png`, alt: "", className: "h-[50%]" }) : "" : /* @__PURE__ */ jsx(Fragment, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center h-full w-full bg-blue-900/25 ml-3 rounded-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex mt-2 mb-[3px] justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white text-[13px] rounded-xl w-[70%] justify-between text-black text-center font-bold", children: data ? normalize(data.name) : "" }),
        /* @__PURE__ */ jsx("button", { onClick: handleClose, className: "border border-gray-600 ml-2 px-1.5 rounded-xl text-xs bg-red-500", children: "X" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " w-[85%] [&>*]: [&>*]:w-[50%] [&>*]:border-gray-400 [&>*]:border [&>*]:text-black", children: [
        /* @__PURE__ */ jsx("button", { onClick: (event) => toggleBtn(event, "stats"), className: `rounded-l-xl justify-center h-5 text-[13px]  ${toggle ? "bg-gray-500" : "bg-gray-200"}`, children: "Base Stats" }),
        /* @__PURE__ */ jsx("button", { onClick: (event) => toggleBtn(event, "abilities"), className: `rounded-r-xl h-5 text-[13px] ${!toggle ? "bg-gray-500" : "bg-gray-200"}`, children: "Abilities" })
      ] }),
      toggle ? /* @__PURE__ */ jsx("div", { className: "bg-gray-300/80 w-[85%] rounded-xl h-[62%] m-1 mt-1.5 pt-0.5", children: /* @__PURE__ */ jsx("div", { className: "[&>*]:text-black flex flex-col", children: data ? data.stats.map((stat, index) => {
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center [&>*]:text-black [&>*]:m-[0px] ml-2 ", children: [
          /* @__PURE__ */ jsx("span", { className: "flex-3 text-xs font-bold", children: statNames[index] }),
          /* @__PURE__ */ jsx("span", { className: "flex-2 text-xs font-bold", children: stat.base_stat }),
          /* @__PURE__ */ jsx("span", { className: "flex-5 text-xs font-bold", children: /* @__PURE__ */ jsx(ProgressBar, { value: 50 }) })
        ] }, index);
      }) : /* @__PURE__ */ jsx(Fragment, {}) }) }) : /* @__PURE__ */ jsxs("div", { className: "w-[85%] rounded-xl h-[58%] m-1 mt-1.5 [&>*]:text-black [&>*]:text-[13px] [&>*]:pl-1 [&>*]:font-bold", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gray-500 rounded-t-[10px]", children: "Abilities: " }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-300 border-b border-gray-400", children: [
          "1: ",
          data ? abilities[0] : "",
          " "
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-300", children: [
          "2: ",
          data ? abilities[1] : ""
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-500", children: " Hidden Ability:" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-300 rounded-b-[10px]", children: [
          "H: ",
          data ? abilities[2] : ""
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", {})
  ] }) : /* @__PURE__ */ jsx(Fragment, {});
}
function Visualizer() {
  const [pokemonCards, setPokemonCards] = useState([{ name: "weedle", id: 100 }]);
  const [newPokemon, setNewPokemon] = useState("wurmple");
  const [id, setId] = useState(0);
  function handleInputChange(event) {
    setNewPokemon(event.target.value);
  }
  function keyboardEventHandler(event) {
    if (event.key === "Enter") {
      addPokemon();
    }
  }
  function clearAll() {
    setPokemonCards([]);
  }
  function addPokemon() {
    if (newPokemon.trim() !== "") {
      setPokemonCards((c) => [...c, { name: newPokemon, id }]);
      setNewPokemon("");
      setId((i) => i = i + 1);
    }
  }
  function deletePokemon(id2) {
    console.log("click");
    const updatedCards = pokemonCards.filter((element) => element.id !== id2);
    setPokemonCards((t) => updatedCards);
    console.log(pokemonCards);
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center ", children: [
    /* @__PURE__ */ jsx("div", { className: "w-200 h-20 m-10 bg-linear-145 from-red-800 to-gray-900 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-around items-center w-100 md:w-130 text-xl", children: [
      /* @__PURE__ */ jsx("input", { onChange: handleInputChange, onKeyDown: keyboardEventHandler, className: "rounded-xl pl-2 bg-gray-300 w-60 h-10 text-xl outline-hidden text-black", type: "text", value: newPokemon }),
      /* @__PURE__ */ jsx("button", { onClick: addPokemon, className: "bg-blue-500 p-2 w-20 rounded-xl", children: "Add" }),
      /* @__PURE__ */ jsx("button", { onClick: clearAll, className: "bg-red-500 rounded-xl p-1.5", children: "Clear" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-92 md:w-270 sm:w-182 flex-wrap bg-blue-400 rounded-xl p-3 flex", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap", children: pokemonCards.map((element, index) => {
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Cards, { name: element.name, id: element.id, close: deletePokemon }, element.id) }, index);
    }) }) })
  ] }) });
}
function meta({}) {
  return [{
    title: "Visualizer"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const pokemonVisualizer = UNSAFE_withComponentProps(function PokeVisualizer() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Visualizer, {})
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pokemonVisualizer,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/my-react-router-appassets/entry.client-aSV7y2kI.js", "imports": ["/my-react-router-appassets/chunk-NL6KNZEE-DhELS8VL.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/my-react-router-appassets/root-BZehWL6d.js", "imports": ["/my-react-router-appassets/chunk-NL6KNZEE-DhELS8VL.js"], "css": ["/my-react-router-appassets/root-Pgj3ajWT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/my-react-router-appassets/home-Db6RzgyU.js", "imports": ["/my-react-router-appassets/chunk-NL6KNZEE-DhELS8VL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/my-react-router-appassets/about-CZOBIs8_.js", "imports": ["/my-react-router-appassets/chunk-NL6KNZEE-DhELS8VL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/my-react-router-appassets/contact-Butvhexj.js", "imports": ["/my-react-router-appassets/chunk-NL6KNZEE-DhELS8VL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/pokemon-visualizer": { "id": "routes/pokemon-visualizer", "parentId": "root", "path": "pokemon-visualizer", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/my-react-router-appassets/pokemon-visualizer-DkiX25Jf.js", "imports": ["/my-react-router-appassets/chunk-NL6KNZEE-DhELS8VL.js"], "css": ["/my-react-router-appassets/pokemon-visualizer-COY1t0Qk.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/pokedex": { "id": "routes/pokedex", "parentId": "root", "path": "pokedex", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/my-react-router-appassets/pokedex-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/my-react-router-appassets/manifest-e6ec779c.js", "version": "e6ec779c", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/my-react-router-app";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/pokemon-visualizer": {
    id: "routes/pokemon-visualizer",
    parentId: "root",
    path: "pokemon-visualizer",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/pokedex": {
    id: "routes/pokedex",
    parentId: "root",
    path: "pokedex",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
