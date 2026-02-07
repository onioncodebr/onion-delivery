package br.com.onioncode.delivery.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ListaDeEntregas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    @OneToMany(mappedBy = "listaDeEntregas",  cascade = CascadeType.ALL)
    private List<Entrega> lista = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "motoboy_id")
    private Motoboy motoboy;
    public ListaDeEntregas(Long id, LocalDate date, Motoboy motoboy) {
        this.date = date;
    }

}
