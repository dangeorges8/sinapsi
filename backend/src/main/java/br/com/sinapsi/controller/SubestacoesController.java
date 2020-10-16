package br.com.sinapsi.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.sinapsi.models.Subestacao;
import br.com.sinapsi.repository.SubestacaoRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class SubestacoesController {

	@Autowired
	private SubestacaoRepository subestacaoRepository;

	@GetMapping("/subestacoes")
	public ResponseEntity<List<Subestacao>> getAllSubestacoes() {
		try {
			List<Subestacao> subestacoes = subestacaoRepository.findAll();
			if (subestacoes.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(subestacoes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = { "/subestacoes/{id}", "/editar/{id}" })
	public ResponseEntity<Subestacao> getSubestacaoById(@PathVariable("id") Long id) {
		Optional<Subestacao> subestacaoData = subestacaoRepository.findById(id);

		if (subestacaoData.isPresent()) {
			return new ResponseEntity<>(subestacaoData.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/subestacao")
	public ResponseEntity<Subestacao> getSubestacaoByCodigo(@RequestParam(required = false) String codigo) {
		try {
			Subestacao subestacao = subestacaoRepository.findByCodigo(codigo);
			if(subestacao.getCodigo().contentEquals(codigo)) {
				return new ResponseEntity<>(subestacao, HttpStatus.OK);
			}return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/subestacoes")
	public ResponseEntity<Subestacao> createEstacao(@RequestBody Subestacao subestacao) {
		Subestacao subestacaoRecebida = new Subestacao(subestacao.getCodigo(), subestacao.getNome(),
				subestacao.getLatitude(), subestacao.getLongitude());
		try {
			Subestacao novaSubestacao = subestacaoRepository.save(subestacaoRecebida);
			return new ResponseEntity<>(novaSubestacao, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/subestacoes/{id}")
	public ResponseEntity<Subestacao> updateSubestacao(@PathVariable("id") Long id,
			@RequestBody Subestacao subestacao) {
		Optional<Subestacao> subestacaoData = subestacaoRepository.findById(id);

		if (subestacaoData.isPresent()) {
			Subestacao subestacaoAlterada = subestacaoData.get();
			subestacaoAlterada.setCodigo(subestacao.getCodigo());
			subestacaoAlterada.setNome(subestacao.getNome());
			subestacaoAlterada.setLatitude(subestacao.getLatitude());
			subestacaoAlterada.setLongitude(subestacao.getLongitude());
			return new ResponseEntity<>(subestacaoRepository.save(subestacaoAlterada), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/subestacoes/{id}")
	public ResponseEntity<HttpStatus> deleteSubestacao(@PathVariable("id") Long id) {
		if (id != null) {
			try {
				subestacaoRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
