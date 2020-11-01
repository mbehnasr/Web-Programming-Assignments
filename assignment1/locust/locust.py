from locust import HttpUser, constant, task


class WebsiteUser(HttpUser):
    wait_time = constant(1)
    host = "http://185.110.189.127"
    
    @task
    def test_node_sha256(self):
        self.client.get("/node/sha256")
        
    @task
    def test_node_write(self):
        self.client.get("/node/write")

    @task
    def test_go_sha256(self):
        self.client.get("/go/sha256")

    @task
    def test_go_write(self):
        self.client.get("/go/write")
