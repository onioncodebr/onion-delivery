package br.com.onioncode.delivery.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class ListaDeEntregas {

    private Long id;
    private LocalDate date;
    private List<Entrega> lista;
    private Motoboy motoboyID;

    public ListaDeEntregas(Long id, LocalDate date, Motoboy motoboyID) {
        this.date = date;
        this.lista = new ArrayList<>();
    }

}
