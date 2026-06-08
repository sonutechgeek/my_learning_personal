<?php
class Router {
    private array $routes = [];

    public function add(string $method, string $path, string $controller, string $action): void {
        $this->routes[] = compact('method', 'path', 'controller', 'action');
    }

    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri    = '/' . trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) continue;

            $pattern = preg_replace('/\{[^}]+\}/', '([^/]+)', $route['path']);
            if (!preg_match('#^' . $pattern . '$#', $uri, $matches)) continue;

            array_shift($matches);
            $ctrl = new $route['controller']();
            $ctrl->{$route['action']}(...$matches);
            return;
        }

        $isApi = str_starts_with($uri, '/api');
        $isApi ? (new Controller())->jsonResponse(404, ['error' => 'Route not found'])
               : (new PageController())->notFound();
    }
}
