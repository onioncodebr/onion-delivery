package br.com.onioncode.delivery.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Entrega {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    private String rua;
    private String bairro;
    private Integer num;
    private Integer price;
    @ManyToOne
    @JoinColumn(name = "diaria_id")
    private Diaria diaria;


    public Entrega(@NotBlank String clientName, @NotBlank String bairro, @NotBlank String rua, @NotNull Integer num, @NotNull @Positive Integer price) {
        this.clientName = clientName;
        this.bairro = bairro;
        this.rua = rua;
        this.num = num;
        this.price = price;

    }
}
