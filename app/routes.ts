import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default 
[
    index("routes/home.tsx"),
    route("search", "routes/search.tsx"),
] satisfies RouteConfig;
