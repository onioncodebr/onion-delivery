package br.com.onioncode.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EntregaResponseDTO {
    private Long id;
    private String clientName;
    private String rua;
    private String bairro;
    private Integer num;
    private Integer kms;
}
