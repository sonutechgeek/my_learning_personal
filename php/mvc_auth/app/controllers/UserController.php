<?php
class UserController extends Controller {

    private UserModel $model;
    public function __construct() { $this->model = new UserModel(); }

    // GET /api/users
    public function index(): void {
        $this->requireAuth();
        $this->jsonResponse(200, $this->model->all());
    }

    // GET /api/users/{id}
    public function show(string $id): void {
        $this->requireAuth();
        $user = $this->model->find((int)$id);
        $user ? $this->jsonResponse(200, $user)
              : $this->jsonResponse(404, ['error' => "User $id not found"]);
    }

    // POST /api/users
    public function store(): void {
        $this->requireAuth();
        $body = $this->body();
        if (empty($body['name']) || empty($body['email']))
            $this->jsonResponse(400, ['error' => 'name and email are required']);

        $id = $this->model->create($body);
        $this->jsonResponse(201, ['message' => 'User created', 'id' => $id]);
    }

    // PUT /api/users/{id}
    public function update(string $id): void {
        $this->requireAuth();
        if (!$this->model->find((int)$id))
            $this->jsonResponse(404, ['error' => "User $id not found"]);

        $this->model->update((int)$id, $this->body());
        $this->jsonResponse(200, ['message' => "User $id updated"]);
    }

    // DELETE /api/users/{id}
    public function destroy(string $id): void {
        $this->requireAuth();
        if (!$this->model->find((int)$id))
            $this->jsonResponse(404, ['error' => "User $id not found"]);

        $this->model->delete((int)$id);
        $this->jsonResponse(200, ['message' => "User $id deleted"]);
    }
}
