package br.com.onioncode.delivery.dto.entrega;

import br.com.onioncode.delivery.domain.Motoboy;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EntregaResponseDTO {
    private Long id;
    private String clientName;
    private String rua;
    private String bairro;
    private Integer num;
    private Integer price;

}
