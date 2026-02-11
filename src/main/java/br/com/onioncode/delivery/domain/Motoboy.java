package br.com.onioncode.delivery.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Motoboy {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer price_km;
    private Integer min_taxa;
    @OneToMany(mappedBy = "motoboy", cascade = CascadeType.ALL)
    private List<Diaria> listaDeDiarias = new ArrayList<>();

    public Motoboy(Long id, String name, Integer price_km, Integer min_taxa) {
        this.id = id;
        this.name = name;
        this.price_km = price_km;
        this.min_taxa = min_taxa;
    }

    public Motoboy(String name, Integer price_km, Integer min_taxa) {
        this.name = name;
        this.price_km = price_km;
        this.min_taxa = min_taxa;
    }

}
