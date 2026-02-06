package br.com.onioncode.delivery.repository;

import br.com.onioncode.delivery.domain.Motoboy;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TemporaryRepository {
    private Motoboy motoboy;
    private static Motoboy m = new Motoboy(1L, "Junior", 3, 18);
    @Getter
    private static List<Motoboy> motoboyDataBase = new ArrayList<>(List.of(m));

}


