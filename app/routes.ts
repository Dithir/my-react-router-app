import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("pokemon-visualizer", "routes/pokemon-visualizer.tsx"),
    route("pokedex/:pokemon?/:section?", "routes/pokedex.tsx"),

] satisfies RouteConfig;
