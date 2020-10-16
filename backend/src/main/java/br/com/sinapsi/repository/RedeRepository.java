package br.com.sinapsi.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.sinapsi.models.Rede;
import br.com.sinapsi.models.Subestacao;

public interface RedeRepository extends JpaRepository<Rede, Long> {
	Iterable<Rede> findBySubestacaoId(Long subestacaoId);
	Rede findByCodigoRede(String codigoRede);
}
