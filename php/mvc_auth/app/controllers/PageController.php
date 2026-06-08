<?php
class PageController extends Controller {
    public function login():     void { $this->view('login'); }
    public function signup():    void { $this->view('signup'); }
    public function dashboard(): void { $this->view('dashboard'); }
    public function notFound():  void { http_response_code(404); $this->view('404'); }
}
