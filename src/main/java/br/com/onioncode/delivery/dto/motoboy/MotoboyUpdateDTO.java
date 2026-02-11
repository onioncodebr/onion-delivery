package br.com.onioncode.delivery.dto.motoboy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotoboyUpdateDTO {
    private String name;
    private Integer priceKM;
    private Integer minTaxa;
}
