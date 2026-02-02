package br.com.onioncode.delivery.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrega {
    private Long id;
    private String clientName;
    private String rua;
    private String bairro;
    private Integer num;
    private Integer kms;
    private ListaDeEntregas listaDeEntregasID;

    public Entrega(Long id, String clientName, String rua, String bairro, Integer num, Integer kms) {
        this.id = id;
        this.clientName = clientName;
        this.rua = rua;
        this.bairro = bairro;
        this.num = num;
        this.kms = kms;
    }
}
