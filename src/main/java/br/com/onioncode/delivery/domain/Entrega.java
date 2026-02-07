package br.com.onioncode.delivery.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Entrega {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    private String rua;
    private String bairro;
    private Integer num;
    private Integer kms;
    @ManyToOne
    @JoinColumn(name = "lista_entrega_id")
    private ListaDeEntregas listaDeEntregas;

    public Entrega(Long  id, String clientName, String rua, String bairro, Integer num, Integer kms) {
        this.id = id;
        this.clientName = clientName;
        this.rua = rua;
        this.bairro = bairro;
        this.num = num;
        this.kms = kms;
    }
}
