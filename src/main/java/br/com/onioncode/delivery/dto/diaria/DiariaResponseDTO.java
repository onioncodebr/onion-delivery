package br.com.onioncode.delivery.dto.diaria;

import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.domain.Motoboy;
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
public class DiariaResponseDTO {
    private Long id;
    private LocalDate date;
    private List<Entrega> lista = new ArrayList<>();
    private String motoboyName;
}
