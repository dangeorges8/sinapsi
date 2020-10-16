package br.com.sinapsi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.Transient;

@Entity
@Table(name = "tb_rede_mt")
public class Rede {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_rede_mt")
	private Long id_rede_mt;

	@Column(name = "codigo")
	private String codigoRede;

	@Column(name = "nome")
	private String nomeRede;

	@Column(name = "tensao_nominal")
	private Double tensaoNominal;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_subestacao", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Subestacao subestacao;

	public Rede() {
	}

	public Rede(String codigoRede, String nomeRede, Double tensaoNominal, Subestacao subestacao) {
		super();
		this.codigoRede = codigoRede;
		this.nomeRede = nomeRede;
		this.tensaoNominal = tensaoNominal;
		this.subestacao = subestacao;
	}

	public Subestacao getSubestacao() {
		return subestacao;
	}

	public void setSubestacao(Subestacao subestacao) {
		this.subestacao = subestacao;
	}

	public Long getId_rede_mt() {
		return id_rede_mt;
	}

	public void setId_rede_mt(Long id_rede_mt) {
		this.id_rede_mt = id_rede_mt;
	}

	public String getCodigoRede() {
		return codigoRede;
	}

	public void setCodigoRede(String codigoRede) {
		this.codigoRede = codigoRede;
	}

	public String getNomeRede() {
		return nomeRede;
	}

	public void setNomeRede(String nomeRede) {
		this.nomeRede = nomeRede;
	}

	public Double getTensaoNominal() {
		return tensaoNominal;
	}

	public void setTensaoNominal(Double tensaoNominal) {
		this.tensaoNominal = tensaoNominal;
	}

	@Override
	public String toString() {
		return "Rede [id_rede_mt=" + id_rede_mt + ", codigoRede=" + codigoRede + ", nomeRede=" + nomeRede
				+ ", tensaoNominal=" + tensaoNominal + ", subestacao=" + subestacao + "]";
	}

}
