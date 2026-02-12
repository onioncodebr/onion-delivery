package br.com.onioncode.delivery.dto.entrega;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EntregaUpdateDTO {
    private String clientName;
    private String rua;
    private String bairro;
    private Integer num;
    private Integer price;
}
