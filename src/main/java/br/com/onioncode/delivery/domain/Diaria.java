package br.com.onioncode.delivery.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Diaria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    @OneToMany(mappedBy = "diaria",  cascade = CascadeType.ALL)
    private List<Entrega> lista = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "motoboy_id")
    private Motoboy motoboy;

    public Diaria(LocalDate date, Motoboy motoboy) {
        this.date = date;
        this.motoboy = motoboy;
    }

}
