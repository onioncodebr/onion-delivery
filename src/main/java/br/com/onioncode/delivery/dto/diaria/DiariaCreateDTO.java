package br.com.onioncode.delivery.dto.diaria;

import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.motoboy.MotoboyResponseDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
public class DiariaCreateDTO {
    @NotNull
    private MotoboyResponseDTO motoboy;
}
