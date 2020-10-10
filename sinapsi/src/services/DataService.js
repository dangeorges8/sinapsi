import http from '../http-common';

class DataService {
  getAll() {
    return http.get("/subestacoes");
  }

  get(id) {
    return http.get(`/subestacoes/${id}`);
  }

  getEditar(id) {
    return http.get(`/editar/${id}`);
  }

  create(data) {
    return http.post("/subestacoes", data);
  }

  update(id, data) {
    return http.put(`/subestacoes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/subestacoes/${id}`);
  }
}

export default new DataService();