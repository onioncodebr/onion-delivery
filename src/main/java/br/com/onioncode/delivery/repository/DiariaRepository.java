package br.com.onioncode.delivery.repository;

import br.com.onioncode.delivery.domain.Diaria;
import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.diaria.DiariaResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiariaRepository extends JpaRepository<Diaria, Long> {
    Diaria findById(long id);

    List<Diaria> getDiariasByMotoboy(Motoboy referenceById);
}
