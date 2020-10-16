package br.com.sinapsi.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

import br.com.sinapsi.models.Rede;
import br.com.sinapsi.models.Subestacao;
import br.com.sinapsi.repository.RedeRepository;
import br.com.sinapsi.repository.SubestacaoRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
@Transactional
public class RedesController {

	@Autowired
	private RedeRepository redeRepository;

	@Autowired
	private SubestacaoRepository subestacaoRepository;

	@GetMapping("/subestacoes/{subestacaoId}/rede")
	public ResponseEntity<List<Rede>> getAllRedesBySubestacaoId(
			@PathVariable(value = "subestacaoId") Long subestacaoId) {
		List<Rede> redes = new ArrayList<>();
		Iterable<Rede> redesData = redeRepository.findBySubestacaoId(subestacaoId);

		Iterator<Rede> iterator = redesData.iterator();
		while (iterator.hasNext()) {
			redes.add(iterator.next());
		}

		return new ResponseEntity<>(redes, HttpStatus.OK);
	}

	@PostMapping(value = {"/subestacoes/{subestacaoId}/rede", "/editar/{subestacaoId}/rede"})
	public ResponseEntity<List<Rede>> createRedes(@PathVariable(value = "subestacaoId") Long subestacaoId,
			@RequestBody List<Rede> redesRecebidas) {

		Optional<Subestacao> subestacaoData = subestacaoRepository.findById(subestacaoId);
		Subestacao subestacao = new Subestacao();
		if (subestacaoData.isPresent()) {
			subestacao = subestacaoData.get();
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		List<Rede> listaRedes = new ArrayList<>();
		for (Rede rede : redesRecebidas) {
			Rede novaRede = new Rede(rede.getCodigoRede(), rede.getNomeRede(), rede.getTensaoNominal(), subestacao);
			Rede redeSalva = redeRepository.save(novaRede);
			listaRedes.add(redeSalva);
		}
		return new ResponseEntity<>(listaRedes, HttpStatus.CREATED);
	}

	@PutMapping(value = {"/subestacoes/{subestacaoId}/rede", "/editar/{subestacaoId}/rede"})
	public ResponseEntity<List<Rede>> updateRedes(@PathVariable(value = "subestacaoId") Long subestacaoId,
			@RequestBody List<Rede> redesRecebidas) {

		Optional<Subestacao> subestacaoData = subestacaoRepository.findById(subestacaoId);
		Subestacao subestacao = new Subestacao();
		if (subestacaoData.isPresent()) {
			subestacao = subestacaoData.get();
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		List<Rede> listaRedes = new ArrayList<>();
		for (Rede rede : redesRecebidas) {
			Long idRedeRecebida = rede.getId_rede_mt();
			Optional<Rede> redeData = redeRepository.findById(idRedeRecebida);
			if (redeData.isPresent()) {
				Rede novaRede = redeData.get();
				novaRede.setCodigoRede(rede.getCodigoRede());
				novaRede.setNomeRede(rede.getNomeRede());
				novaRede.setTensaoNominal(rede.getTensaoNominal());
				Rede novaRedeSalva = redeRepository.save(novaRede);
				listaRedes.add(novaRedeSalva);
			}
		}
		return new ResponseEntity<>(listaRedes, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/subestacoes/rede/{idRede}")
	public ResponseEntity<HttpStatus> deleteRedes(@PathVariable(value = "idRede") Long idRede) {
		
		Optional<Rede> redeData = redeRepository.findById(idRede);
		if(redeData.isPresent()) {
			redeRepository.deleteById(idRede);			
		}
		
//		for (Rede rede : redesRecebidas) {
//			Long idRedeRecebida = rede.getId_rede_mt();
//			Optional<Rede> redeData = redeRepository.findById(idRedeRecebida);
//			if (redeData.isPresent()) {
//				Rede novaRede = redeData.get();
//				redeRepository.delete(novaRede);
//			}
//		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/subestacoes/rede")
	public ResponseEntity<Rede> getRedeByCodigo(
			@RequestParam(required = false) String codigoRede) {
		try {
			Rede rede = redeRepository.findByCodigoRede(codigoRede);
			if(rede.getCodigoRede().contentEquals(codigoRede)) {
				return new ResponseEntity<>(rede, HttpStatus.OK);
			}return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
