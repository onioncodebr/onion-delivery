package br.com.onioncode.delivery.domain;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Motoboy {
    @Getter
    @Setter
    private Long id;
    private String name;
    private Integer priceKM;
    private Integer minTaxa;
    private List<ListaDeEntregas> listaDeEntregas;

    public Motoboy(Long id, String name, Integer priceKM, Integer minTaxa) {
        this.id = id;
        this.name = name;
        this.priceKM = priceKM;
        this.minTaxa = minTaxa;
    }

    public Motoboy(String name, Integer priceKM, Integer minTaxa) {
        this.name = name;
        this.priceKM = priceKM;
        this.minTaxa = minTaxa;
    }

}
