import http from '../http-common';

class DataService {
  getAll() {
    return http.get("/subestacoes");
  }

  get(id) {
    return http.get(`/subestacoes/${id}`);
  }

  getRedesBySubestacao(id) {
    return http.get(`/subestacoes/${id}/rede`);
  }

  getEditar(id) {
    return http.get(`/editar/${id}`);
  }

  getByCodigo(codigo) {
    return http.get(`/subestacao?codigo=${codigo}`);
  }

  getByCodigoRede(codigo) {
    return http.get(`/subestacoes/rede?codigoRede=${codigo}`);
  }

  create(data) {
    return http.post("/subestacoes", data);
  }

  createListaRedes(id, data) {
    return http.post(`/subestacoes/${id}/rede`, data);
  }

  createRede(id, data) {
    return http.post(`/editar/${id}/rede`, data);
  }

  update(id, data) {
    return http.put(`/subestacoes/${id}`, data);
  }

  updateRede(id, data) {
    return http.put(`/editar/${id}/rede`, data);
  }

  delete(id) {
    return http.delete(`/subestacoes/${id}`);
  }

  deleteRedeById(idRede) {
    return http.delete(`/subestacoes/rede/${idRede}`);
  }
}

export default new DataService();