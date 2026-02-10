package br.com.onioncode.delivery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
public class EntregaCreateDTO {
    @NotBlank
    private String clientName;
    @NotBlank
    private String rua;
    @NotBlank
    private String bairro;
    @NotNull
    private Integer num;
    @NotNull
    @Positive
    private Integer kms;
}
