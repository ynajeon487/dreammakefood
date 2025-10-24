import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Recipes from "@/pages/Recipes";
import RecipeDetail from "@/pages/RecipeDetail";
import Menu from "@/pages/Menu";
import MenuByDay from "@/pages/MenuByDay";
import MenuByMeal from "@/pages/MenuByMeal";
import Shopping from "@/pages/Shopping";
import Knowledge from "@/pages/Knowledge";
import NotFound from "@/pages/not-found";
import AIChatbot from "@/components/AIChatbot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/recipes/:id" component={RecipeDetail} />
      <Route path="/menu" component={Menu} />
      <Route path="/menu/by-day" component={MenuByDay} />
      <Route path="/menu/by-meal" component={MenuByMeal} />
      <Route path="/shopping" component={Shopping} />
      <Route path="/knowledge" component={Knowledge} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <AIChatbot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
