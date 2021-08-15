import { About } from "../pages/About";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Post } from "../pages/Post";
import Posts from "../pages/Posts";

export const privateRoutes = [
  {path: "/about", component: About, exact: true},
  {path: "/posts/:id", component: Post, exact: true},
  {path: "/posts", component: Posts, exact: true},
];

export const publicRoutes = [
  {path: "/login", component: Login, exact: true},
  {path: "/not-found", component: NotFound, exact: true},
];