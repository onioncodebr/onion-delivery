package br.com.onioncode.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotoboyResponseDTO {
    private Long id;
    private String name;
    private Integer priceKM;
    private Integer minTaxa;
}
