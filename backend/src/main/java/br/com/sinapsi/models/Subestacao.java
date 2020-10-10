package br.com.sinapsi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.Transient;

@Entity
@Table(name = "tb_subestacao")
public class Subestacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_subestacao")
	private Long id_subestacao;

	@Column(name = "codigo")
	private String codigo;

	@Column(name = "nome")
	private String nome;

	@Column(name = "latitude")
	private Double latitude;

	@Column(name = "longitude")
	private Double longitude;

	public Subestacao() {
	}

	public Subestacao(String codigo, String nome, Double latitude, Double longitude) {
		super();
		this.codigo = codigo;
		this.nome = nome;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public Long getId_subestacao() {
		return id_subestacao;
	}
	
	public void setId_subestacao(Long id_subestacao) {
		this.id_subestacao = id_subestacao;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	@Override
	public String toString() {
		return "Subestacao [id_subestacao=" + id_subestacao + ", codigo=" + codigo + ", nome=" + nome + ", latitude="
				+ latitude + ", longitude=" + longitude + "]";
	}

}
