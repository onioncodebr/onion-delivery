package br.com.onioncode.delivery.dto.diaria;

import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.domain.Motoboy;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class DiariaUpdateDTO {
    private LocalDate date;
    private Motoboy motoboy;
}
